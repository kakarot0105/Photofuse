import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

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

  const { photos } = await req.json();
  if (!Array.isArray(photos)) return NextResponse.json({ error: "photos must be an array" }, { status: 400 });

  const { default: prisma } = await import("@/lib/prisma");
  await prisma.$transaction(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    photos.map((photo: any) =>
      prisma.photo.upsert({
        where: { userId_provider_remoteId: { userId: session.user.id, provider: "icloud", remoteId: photo.remoteId } },
        update: { thumbnailUrl: photo.thumbnailUrl },
        create: {
          userId: session.user.id, provider: "icloud", remoteId: photo.remoteId,
          filename: photo.filename, mimeType: photo.mimeType,
          width: photo.width, height: photo.height,
          takenAt: photo.takenAt ? new Date(photo.takenAt) : null,
          thumbnailUrl: photo.thumbnailUrl,
        },
      })
    )
  );

  return NextResponse.json({ synced: photos.length });
}
