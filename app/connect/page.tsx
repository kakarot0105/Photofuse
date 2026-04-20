import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import ConnectProviders from "@/components/ConnectProviders";

export const dynamic = "force-dynamic";

export default async function ConnectPage() {
  const session = await auth.api.getSession({ headers: headers() });
  if (!session?.user) redirect("/sign-in");

  const accounts = await prisma.account.findMany({
    where: { userId: session.user.id },
    select: { providerId: true },
  });

  return (
    <div className="min-h-screen" style={{ background: "#f5f4ed" }}>
      <Navbar user={session.user} />
      <main className="max-w-2xl mx-auto px-4 sm:px-6" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
        <div className="mb-10">
          <h1
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "36px",
              fontWeight: 500,
              color: "#141413",
              lineHeight: 1.25,
              marginBottom: "8px",
            }}
          >
            Manage connections
          </h1>
          <p
            style={{
              fontSize: "16px",
              color: "#5e5d59",
              fontFamily: "system-ui, -apple-system, sans-serif",
              lineHeight: 1.6,
            }}
          >
            Connect your photo services to build your unified gallery.
          </p>
        </div>
        <ConnectProviders connected={accounts.map((a) => a.providerId)} />
      </main>
    </div>
  );
}
