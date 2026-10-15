import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

/**
 * Provider Disconnect — Task #6
 * DELETE route that removes an Account record from Prisma.
 * OAuth providerId "apple" maps to photo provider "icloud".
 */
const PHOTO_PROVIDER_BY_ACCOUNT: Record<string, string> = {
  google: "google",
  apple: "icloud",
  amazon: "amazon",
};

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth.api.getSession({ headers: headers() });
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const providerId = params.id;
  const photoProvider = PHOTO_PROVIDER_BY_ACCOUNT[providerId];

  if (!photoProvider) {
    return NextResponse.json({ error: "Invalid provider" }, { status: 400 });
  }

  try {
    const deleted = await prisma.account.deleteMany({
      where: {
        userId: session.user.id,
        providerId,
      },
    });

    if (deleted.count === 0) {
      return NextResponse.json({ error: "Provider not connected" }, { status: 404 });
    }

    await prisma.photo.deleteMany({
      where: {
        userId: session.user.id,
        provider: photoProvider,
      },
    });

    return NextResponse.json({
      disconnected: providerId,
      photosRemoved: true,
      photoProvider,
    });
  } catch (err) {
    console.error("Provider disconnect failed:", err);
    return NextResponse.json({ error: "Disconnect failed" }, { status: 500 });
  }
}
