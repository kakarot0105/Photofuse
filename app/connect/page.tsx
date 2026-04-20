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
    <div className="min-h-screen" style={{ background: "#f6f6f3" }}>
      <Navbar user={session.user} />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight mb-1.5" style={{ letterSpacing: "-0.02em" }}>Manage connections</h1>
          <p style={{ color: "#6a6a6a" }}>Connect your photo services to build your unified gallery.</p>
        </div>
        <ConnectProviders connected={accounts.map((a) => a.providerId)} />
      </main>
    </div>
  );
}
