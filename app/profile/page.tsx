import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import { User, Mail, Calendar, Shield } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: headers() });
  if (!session?.user) redirect("/sign-in");

  const accounts = await prisma.account.findMany({
    where: { userId: session.user.id },
    select: { providerId: true, createdAt: true },
  });

  const photoCount = await prisma.photo.count({
    where: { userId: session.user.id },
  });

  const user = session.user;

  return (
    <div className="min-h-screen" style={{ background: "#f5f4ed" }}>
      <Navbar user={user} />
      <main className="max-w-2xl mx-auto px-4 sm:px-6" style={{ paddingTop: "64px", paddingBottom: "80px" }}>
        <h1
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "36px",
            fontWeight: 500,
            color: "#141413",
            lineHeight: 1.25,
            marginBottom: "32px",
          }}
        >
          Profile
        </h1>

        {/* User info card */}
        <div
          className="p-7 mb-6"
          style={{
            background: "#faf9f5",
            border: "1px solid #f0eee6",
            borderRadius: "16px",
            boxShadow: "rgba(0,0,0,0.05) 0px 4px 24px",
          }}
        >
          {/* Avatar */}
          <div className="flex items-center gap-5 mb-6">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-bold flex-shrink-0"
              style={{ background: "#c96442" }}
            >
              {user.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.image} alt="" className="w-16 h-16 rounded-2xl object-cover" />
              ) : (
                user.name
                  ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
                  : user.email?.[0].toUpperCase() ?? "?"
              )}
            </div>
            <div>
              <h2
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: "22px",
                  fontWeight: 500,
                  color: "#141413",
                }}
              >
                {user.name || "PhotoFuse User"}
              </h2>
              <p style={{ fontSize: "14px", color: "#5e5d59", fontFamily: "system-ui" }}>
                {user.email}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-3 gap-4 pt-6"
            style={{ borderTop: "1px solid #f0eee6" }}
          >
            <div className="text-center">
              <div
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "24px",
                  fontWeight: 500,
                  color: "#141413",
                }}
              >
                {photoCount.toLocaleString()}
              </div>
              <div style={{ fontSize: "13px", color: "#87867f", fontFamily: "system-ui" }}>
                Photos
              </div>
            </div>
            <div className="text-center">
              <div
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "24px",
                  fontWeight: 500,
                  color: "#141413",
                }}
              >
                {accounts.length}
              </div>
              <div style={{ fontSize: "13px", color: "#87867f", fontFamily: "system-ui" }}>
                Providers
              </div>
            </div>
            <div className="text-center">
              <div
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "24px",
                  fontWeight: 500,
                  color: "#c96442",
                }}
              >
                Free
              </div>
              <div style={{ fontSize: "13px", color: "#87867f", fontFamily: "system-ui" }}>
                Plan
              </div>
            </div>
          </div>
        </div>

        {/* Account details */}
        <div
          className="p-7"
          style={{
            background: "#faf9f5",
            border: "1px solid #f0eee6",
            borderRadius: "16px",
            boxShadow: "rgba(0,0,0,0.05) 0px 4px 24px",
          }}
        >
          <h3
            className="mb-5"
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "18px",
              fontWeight: 500,
              color: "#141413",
            }}
          >
            Account details
          </h3>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 flex-shrink-0" style={{ color: "#87867f" }} />
              <div>
                <div style={{ fontSize: "12px", color: "#87867f", fontFamily: "system-ui", fontWeight: 500 }}>
                  Name
                </div>
                <div style={{ fontSize: "15px", color: "#141413", fontFamily: "system-ui" }}>
                  {user.name || "Not set"}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 flex-shrink-0" style={{ color: "#87867f" }} />
              <div>
                <div style={{ fontSize: "12px", color: "#87867f", fontFamily: "system-ui", fontWeight: 500 }}>
                  Email
                </div>
                <div style={{ fontSize: "15px", color: "#141413", fontFamily: "system-ui" }}>
                  {user.email}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="w-4 h-4 flex-shrink-0" style={{ color: "#87867f" }} />
              <div>
                <div style={{ fontSize: "12px", color: "#87867f", fontFamily: "system-ui", fontWeight: 500 }}>
                  Connected Providers
                </div>
                <div style={{ fontSize: "15px", color: "#141413", fontFamily: "system-ui" }}>
                  {accounts.map((a) => a.providerId).join(", ") || "None"}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-5" style={{ borderTop: "1px solid #f0eee6" }}>
            <Link
              href="/connect"
              className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
              style={{ color: "#c96442" }}
            >
              Manage connected providers →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
