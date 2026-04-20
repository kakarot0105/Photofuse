"use client";

import Link from "next/link";
import { Camera, Grid, Link2, LogOut, User, Settings, Menu, X } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface NavbarProps {
  user: { name?: string | null; email?: string | null; image?: string | null };
}

export default function Navbar({ user }: NavbarProps) {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const initials = user.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : user.email?.[0].toUpperCase() ?? "?";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/dashboard", icon: <Grid className="w-3.5 h-3.5" />, label: "Gallery" },
    { href: "/connect", icon: <Link2 className="w-3.5 h-3.5" />, label: "Connect" },
    { href: "/profile", icon: <User className="w-3.5 h-3.5" />, label: "Profile" },
    { href: "/settings", icon: <Settings className="w-3.5 h-3.5" />, label: "Settings" },
  ];

  return (
    <>
      <nav
        className={`sticky top-0 z-40 transition-all duration-200 ${scrolled ? "glass-nav-scrolled" : ""}`}
        style={{
          background: scrolled ? "rgba(255,255,255,0.95)" : "rgba(245, 244, 237, 0.85)",
          backdropFilter: "saturate(180%) blur(12px)",
          WebkitBackdropFilter: "saturate(180%) blur(12px)",
          borderBottom: "1px solid #f0eee6",
          height: "64px",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo — Georgia wordmark per DESIGN.md */}
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: "#c96442" }}
            >
              <Camera className="w-4 h-4 text-white" />
            </div>
            <span
              className="font-medium text-lg"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: "#141413", fontWeight: 500 }}
            >
              PhotoFuse
            </span>
          </Link>

          {/* Desktop nav links — Olive Gray, hover → Near Black */}
          <div className="hidden sm:flex items-center gap-1">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors"
                style={{
                  color: "#5e5d59",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  fontWeight: 400,
                  fontSize: "15px",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#141413")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#5e5d59")}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right side: avatar + sign out */}
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center text-white text-xs font-bold"
              style={{ background: "#c96442" }}
            >
              {user.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.image} alt="" className="w-8 h-8 object-cover" />
              ) : (
                initials
              )}
            </div>
            <button
              onClick={async () => {
                await authClient.signOut();
                router.push("/");
              }}
              className="p-1.5 rounded-lg transition-colors"
              style={{ color: "#87867f" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#141413")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#87867f")}
              title="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>

            {/* Mobile hamburger */}
            <button
              className="sm:hidden p-1.5 rounded-lg"
              style={{ color: "#5e5d59" }}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="sm:hidden fixed inset-x-0 top-16 z-30 p-4 animate-fade-in"
          style={{
            background: "#faf9f5",
            borderBottom: "1px solid #f0eee6",
            boxShadow: "rgba(0,0,0,0.05) 0px 4px 24px",
          }}
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm transition-colors"
                style={{ color: "#5e5d59" }}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
