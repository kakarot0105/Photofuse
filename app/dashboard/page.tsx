import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import PhotoGrid from "@/components/PhotoGrid";
import ProviderStatus from "@/components/ProviderStatus";
import SyncButton from "@/components/SyncButton";
import { Camera, Link2 } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: headers() });
  if (!session?.user) redirect("/sign-in");

  const accounts = await prisma.account.findMany({
    where: { userId: session.user.id },
    select: { providerId: true },
  });
  const connectedProviders = accounts.map((a) => a.providerId);

  const photos = await prisma.photo.findMany({
    where: { userId: session.user.id },
    orderBy: { takenAt: "desc" },
    take: 500,
  });

  return (
    <div className="min-h-screen" style={{ background: "#f5f4ed" }}>
      <Navbar user={session.user} />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-16">
        {/* Connected sources */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "22px",
                fontWeight: 500,
                color: "#141413",
              }}
            >
              Connected sources
            </h2>
            <Link
              href="/connect"
              className="text-sm font-medium transition-colors"
              style={{ color: "#c96442" }}
              onMouseEnter={() => {}}
            >
              Manage →
            </Link>
          </div>
          <ProviderStatus connected={connectedProviders} />
        </div>

        {photos.length === 0 ? (
          /* Empty state — Task #10, DESIGN.md spec */
          <div
            className="text-center"
            style={{
              maxWidth: "400px",
              margin: "0 auto",
              padding: "80px 0",
            }}
          >
            {/* Terracotta-toned camera illustration */}
            <div
              className="w-20 h-20 mx-auto rounded-3xl flex items-center justify-center mb-6"
              style={{ background: "rgba(201, 100, 66, 0.10)" }}
            >
              <Camera className="w-10 h-10" style={{ color: "#c96442" }} />
            </div>
            <h3
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "28px",
                fontWeight: 500,
                color: "#141413",
                marginBottom: "8px",
              }}
            >
              Your gallery is empty
            </h3>
            <p
              className="mb-8"
              style={{
                fontSize: "16px",
                color: "#5e5d59",
                fontFamily: "system-ui",
                lineHeight: 1.6,
              }}
            >
              {connectedProviders.length === 0
                ? "Connect a photo provider to get started"
                : "Your photos are syncing — check back in a moment."}
            </p>
            {connectedProviders.length === 0 ? (
              <Link
                href="/connect"
                className="inline-flex items-center gap-2 font-medium transition-colors"
                style={{
                  background: "#c96442",
                  color: "#faf9f5",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  fontSize: "15px",
                  fontWeight: 500,
                  fontFamily: "system-ui",
                }}
              >
                <Link2 className="w-4 h-4" />
                Connect a service
              </Link>
            ) : (
              <SyncButton connectedProviders={connectedProviders} />
            )}
          </div>
        ) : (
          <>
            {/* Photo count + Sync button */}
            <div className="flex items-center justify-between mb-4">
              <h2
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: "22px",
                  fontWeight: 500,
                  color: "#141413",
                }}
              >
                {photos.length.toLocaleString()} photos
              </h2>
              <SyncButton connectedProviders={connectedProviders} />
            </div>
            <PhotoGrid photos={photos} />
          </>
        )}
      </main>
    </div>
  );
}
