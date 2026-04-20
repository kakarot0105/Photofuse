import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import PhotoGrid from "@/components/PhotoGrid";
import ProviderStatus from "@/components/ProviderStatus";

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
    <div className="min-h-screen" style={{ background: "#f6f6f3" }}>
      <Navbar user={session.user} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-16">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold" style={{ color: "#222222" }}>Connected sources</h2>
            <a href="/connect" className="text-sm font-medium" style={{ color: "#7c3aed" }}>Manage →</a>
          </div>
          <ProviderStatus connected={connectedProviders} />
        </div>

        {photos.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">📷</div>
            <h3 className="text-xl font-semibold mb-2">No photos yet</h3>
            <p className="mb-6" style={{ color: "#6a6a6a" }}>
              {connectedProviders.length === 0
                ? "Connect a photo service to get started."
                : "Your photos are loading — check back in a moment."}
            </p>
            {connectedProviders.length === 0 && (
              <a href="/connect" className="inline-flex items-center gap-2 text-white px-6 py-2.5 rounded-full font-medium" style={{ background: "#7c3aed" }}>
                Connect a service
              </a>
            )}
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold" style={{ color: "#222222" }}>{photos.length.toLocaleString()} photos</h2>
            </div>
            <PhotoGrid photos={photos} />
          </>
        )}
      </main>
    </div>
  );
}
