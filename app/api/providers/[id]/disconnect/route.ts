import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

/**
 * Provider Disconnect — Task #6
 * DELETE route that removes an Account record from Prisma.
 */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth.api.getSession({ headers: headers() });
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const providerId = params.id;
  const validProviders = ["google", "apple", "amazon"];

  if (!validProviders.includes(providerId)) {
    return NextResponse.json({ error: "Invalid provider" }, { status: 400 });
  }

  try {
    // Delete the account record for this provider
    const deleted = await prisma.account.deleteMany({
      where: {
        userId: session.user.id,
        providerId: providerId,
      },
    });

    if (deleted.count === 0) {
      return NextResponse.json({ error: "Provider not connected" }, { status: 404 });
    }

    // Optionally remove synced photos from this provider
    await prisma.photo.deleteMany({
      where: {
        userId: session.user.id,
        provider: providerId,
      },
    });

    return NextResponse.json({ disconnected: providerId, photosRemoved: true });
  } catch (err) {
    console.error("Provider disconnect failed:", err);
    return NextResponse.json({ error: "Disconnect failed" }, { status: 500 });
  }
}
