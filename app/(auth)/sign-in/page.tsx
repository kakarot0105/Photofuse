"use client";

import { Camera } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const providers = [
  {
    id: "google" as const,
    label: "Continue with Google",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    ),
    style: { background: "#ffffff", border: "1px solid #e5e5e0", color: "#222222" },
  },
  {
    id: "apple" as const,
    label: "Continue with Apple",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z"/>
      </svg>
    ),
    style: { background: "#000000", color: "#ffffff" },
  },
];

export default function SignInPage() {
  const handleOAuth = async (provider: "google" | "apple") => {
    try {
      await authClient.signIn.social({ provider, callbackURL: "/dashboard" });
    } catch {
      window.location.href = `/api/auth/sign-in/social?provider=${provider}&callbackURL=/dashboard`;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "linear-gradient(135deg, #f5f3ff 0%, #ffffff 50%, #ede9fe 100%)" }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-2xl tracking-tight">PhotoFuse</span>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight mb-1.5" style={{ letterSpacing: "-0.02em" }}>Welcome back</h1>
          <p className="text-sm" style={{ color: "#6a6a6a" }}>Sign in to your unified gallery</p>
        </div>

        <div className="space-y-3">
          {providers.map((p) => (
            <button
              key={p.id}
              onClick={() => handleOAuth(p.id)}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-2xl font-medium text-sm transition-all active:scale-[0.98] hover:opacity-90"
              style={{ ...p.style, boxShadow: "rgba(0,0,0,0.02) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 6px, rgba(0,0,0,0.08) 0px 4px 8px" }}
            >
              {p.icon}
              {p.label}
            </button>
          ))}
        </div>

        <p className="text-center text-xs mt-6 leading-relaxed" style={{ color: "#91918c" }}>
          By continuing, you agree to our{" "}
          <a href="#" className="underline">Terms</a> and{" "}
          <a href="#" className="underline">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}
