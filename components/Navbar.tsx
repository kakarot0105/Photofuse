"use client";

import Link from "next/link";
import { Camera, Grid, Link2, LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

interface NavbarProps {
  user: { name?: string | null; email?: string | null; image?: string | null };
}

export default function Navbar({ user }: NavbarProps) {
  const router = useRouter();
  const initials = user.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : user.email?.[0].toUpperCase() ?? "?";

  return (
    <nav className="sticky top-0 z-40 glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-sm">
            <Camera className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-base tracking-tight" style={{ color: "#222222" }}>PhotoFuse</span>
        </Link>

        <div className="hidden sm:flex items-center gap-1">
          {[
            { href: "/dashboard", icon: <Grid className="w-3.5 h-3.5" />, label: "Gallery" },
            { href: "/connect",   icon: <Link2 className="w-3.5 h-3.5" />, label: "Connect" },
          ].map((item) => (
            <Link key={item.href} href={item.href}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors hover:bg-gray-100"
              style={{ color: "#6a6a6a" }}>
              {item.icon}{item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center text-white text-xs font-bold"
            style={{ background: "linear-gradient(135deg, #8b5cf6, #6366f1)" }}>
            {user.image
              // eslint-disable-next-line @next/next/no-img-element
              ? <img src={user.image} alt="" className="w-8 h-8 object-cover" />
              : initials}
          </div>
          <button onClick={async () => { await authClient.signOut(); router.push("/"); }}
            className="p-1.5 rounded-full transition-colors hover:bg-gray-100" style={{ color: "#91918c" }} title="Sign out">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </nav>
  );
}
