import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { z } from "zod";
import { checkRateLimit } from "@/lib/rate-limit";
import { markDuplicatesForUser, simpleFingerprint } from "@/lib/dedup";

const iCloudPhotoSchema = z.object({
  remoteId: z.string().min(1),
  filename: z.string().min(1),
  mimeType: z.string().optional().nullable(),
  width: z.number().int().positive().optional().nullable(),
  height: z.number().int().positive().optional().nullable(),
  takenAt: z.string().datetime().optional().nullable(),
  thumbnailUrl: z.string().url().optional().nullable(),
  baseUrl: z.string().url().optional().nullable(),
});

const iCloudPhotosArraySchema = z.array(iCloudPhotoSchema).min(1).max(1000);

// CloudKit JS must run client-side. This route provides config + caches metadata.
export async function GET(_req: NextRequest) {
  const session = await auth.api.getSession({ headers: headers() });
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  return NextResponse.json({
    cloudkitConfig: {
      containerIdentifier: process.env.CLOUDKIT_CONTAINER_ID,
      apiToken: process.env.CLOUDKIT_API_TOKEN,
      environment: process.env.NODE_ENV === "production" ? "production" : "development",
    },
  });
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: headers() });
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!checkRateLimit(session.user.id, "/api/photos/icloud")) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  const body = await req.json();

  const result = iCloudPhotosArraySchema.safeParse(body.photos);
  if (!result.success) {
    return NextResponse.json(
      { error: "Invalid photo data", details: result.error.flatten() },
      { status: 400 }
    );
  }

  const photos = result.data;
  const { default: prisma } = await import("@/lib/prisma");
  const hashes: string[] = [];

  try {
    await prisma.$transaction(
      photos.map((photo) => {
        const hash = simpleFingerprint(photo.filename, photo.width, photo.height);
        hashes.push(hash);
        return prisma.photo.upsert({
          where: {
            userId_provider_remoteId: {
              userId: session.user.id,
              provider: "icloud",
              remoteId: photo.remoteId,
            },
          },
          update: {
            thumbnailUrl: photo.thumbnailUrl ?? undefined,
            baseUrl: photo.baseUrl ?? undefined,
            hash,
          },
          create: {
            userId: session.user.id,
            provider: "icloud",
            remoteId: photo.remoteId,
            filename: photo.filename,
            mimeType: photo.mimeType ?? null,
            width: photo.width ?? null,
            height: photo.height ?? null,
            takenAt: photo.takenAt ? new Date(photo.takenAt) : null,
            thumbnailUrl: photo.thumbnailUrl ?? null,
            baseUrl: photo.baseUrl ?? null,
            hash,
          },
        });
      })
    );

    await markDuplicatesForUser(prisma, session.user.id, hashes);
  } catch (err) {
    console.error("iCloud sync transaction failed:", err);
    return NextResponse.json({ error: "Sync failed" }, { status: 500 });
  }

  return NextResponse.json({ synced: photos.length });
}
