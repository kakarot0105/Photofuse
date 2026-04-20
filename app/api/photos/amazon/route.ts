import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { checkRateLimit } from "@/lib/rate-limit";

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: headers() });
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!checkRateLimit(session.user.id, "/api/photos/amazon")) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  const account = await prisma.account.findFirst({
    where: { userId: session.user.id, providerId: "amazon" },
    select: { accessToken: true },
  });
  if (!account?.accessToken) return NextResponse.json({ error: "Amazon Photos not connected" }, { status: 403 });

  const startToken = req.nextUrl.searchParams.get("startToken") || undefined;
  const params = new URLSearchParams({
    kind: "FILE",
    filters: "contentProperties.contentType:(image*)",
    limit: "200",
    ...(startToken ? { startToken } : {}),
  });

  const res = await fetch(`https://drive.amazonaws.com/drive/v1/nodes?${params}`, {
    headers: { Authorization: `Bearer ${account.accessToken}`, "x-amzn-file-md5": "false" },
  });

  if (!res.ok) return NextResponse.json({ error: "Failed to fetch Amazon Photos" }, { status: res.status });

  const data = await res.json();
  const items = data.data || [];

  if (items.length) {
    try {
      await prisma.$transaction(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        items.map((item: any) =>
          prisma.photo.upsert({
            where: { userId_provider_remoteId: { userId: session.user.id, provider: "amazon", remoteId: item.id } },
            update: {
              thumbnailUrl: item.tempLink || null,
              baseUrl: item.tempLink || null,
            },
            create: {
              userId: session.user.id, provider: "amazon", remoteId: item.id,
              filename: item.name, mimeType: item.contentProperties?.contentType,
              width: item.contentProperties?.image?.width ?? null,
              height: item.contentProperties?.image?.height ?? null,
              takenAt: item.contentProperties?.creationDate ? new Date(item.contentProperties.creationDate) : null,
              thumbnailUrl: item.tempLink || null,
              baseUrl: item.tempLink || null,
            },
          })
        )
      );
    } catch (err) {
      console.error("Amazon Photos sync transaction failed:", err);
      return NextResponse.json({ error: "Sync failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ photos: items, nextToken: data.nextToken });
}
