import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { checkRateLimit } from "@/lib/rate-limit";
import { markDuplicatesForUser, simpleFingerprint } from "@/lib/dedup";

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: headers() });
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!checkRateLimit(session.user.id, "/api/photos/google")) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  const account = await prisma.account.findFirst({
    where: { userId: session.user.id, providerId: "google" },
    select: { accessToken: true },
  });
  if (!account?.accessToken) {
    return NextResponse.json({ error: "Google account not connected" }, { status: 403 });
  }

  const pageToken = req.nextUrl.searchParams.get("pageToken") || undefined;
  const pageSize = Math.min(parseInt(req.nextUrl.searchParams.get("pageSize") || "50"), 100);

  const params = new URLSearchParams({
    pageSize: String(pageSize),
    ...(pageToken ? { pageToken } : {}),
  });
  const res = await fetch(`https://photoslibrary.googleapis.com/v1/mediaItems?${params}`, {
    headers: { Authorization: `Bearer ${account.accessToken}` },
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch Google Photos" }, { status: res.status });
  }

  const data = await res.json();
  const hashes: string[] = [];

  if (data.mediaItems?.length) {
    try {
      await prisma.$transaction(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data.mediaItems.map((item: any) => {
          const width = item.mediaMetadata?.width ? parseInt(item.mediaMetadata.width) : null;
          const height = item.mediaMetadata?.height ? parseInt(item.mediaMetadata.height) : null;
          const hash = simpleFingerprint(item.filename || item.id, width, height);
          hashes.push(hash);
          return prisma.photo.upsert({
            where: {
              userId_provider_remoteId: {
                userId: session.user.id,
                provider: "google",
                remoteId: item.id,
              },
            },
            update: {
              thumbnailUrl: item.baseUrl ? `${item.baseUrl}=w400-h400` : null,
              baseUrl: item.baseUrl || null,
              hash,
            },
            create: {
              userId: session.user.id,
              provider: "google",
              remoteId: item.id,
              filename: item.filename,
              mimeType: item.mimeType,
              width,
              height,
              takenAt: item.mediaMetadata?.creationTime
                ? new Date(item.mediaMetadata.creationTime)
                : null,
              thumbnailUrl: item.baseUrl ? `${item.baseUrl}=w400-h400` : null,
              baseUrl: item.baseUrl || null,
              hash,
            },
          });
        })
      );

      await markDuplicatesForUser(prisma, session.user.id, hashes);
    } catch (err) {
      console.error("Google Photos sync transaction failed:", err);
      return NextResponse.json({ error: "Sync failed" }, { status: 500 });
    }
  }

  return NextResponse.json({
    photos: data.mediaItems || [],
    nextPageToken: data.nextPageToken,
  });
}
