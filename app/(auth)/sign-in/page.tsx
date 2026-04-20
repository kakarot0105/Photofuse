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
    style: { background: "#ffffff", border: "1px solid #e8e6dc", color: "#141413" },
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
  {
    id: "amazon" as const,
    label: "Continue with Amazon",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595.394-.15.654-.174.78-.066.126.11.091.294-.104.558l-.104.158c-1.727 2.336-4.844 3.502-9.344 3.502-4.2 0-7.896-1.252-11.087-3.752-.266-.207-.337-.4-.215-.586l.409.637zm22.05-2.076c-.178-.248-.58-.376-1.163-.385-.82-.014-1.88.094-3.127.32-1.257.228-1.766.58-1.526 1.065.13.265.413.323.847.18.18-.06.395-.106.645-.135.445-.052 1.065-.072 1.857-.06.8.013 1.26.108 1.37.292.09.15-.034.478-.373.988l-.106.178c-.112.187-.098.33.045.425.144.097.315.097.518 0 .503-.24.88-.58 1.13-1.018.37-.644.312-1.102-.117-1.377v-.473z" fill="#FF9900"/>
        <path d="M13.848 10.362c0-1.09.03-2 .087-2.73.06-.73.21-1.37.45-1.915.24-.55.58-.97 1.015-1.27.44-.3 1.06-.45 1.86-.45.53 0 .98.06 1.36.18.37.12.66.31.86.57.2.26.35.59.44.99.09.4.13.88.13 1.44v1.85h-4.5v1.16c0 .78.13 1.33.39 1.64.26.31.7.47 1.32.47.42 0 .78-.1 1.06-.3.28-.2.5-.51.66-.92l1.04.6c-.34.7-.77 1.22-1.3 1.54-.53.33-1.15.49-1.87.49-1.2 0-2.08-.37-2.63-1.1-.56-.73-.84-1.83-.84-3.3v-1.16l1.5.23zm4.5-2.18v-.87c0-.59-.1-1.02-.31-1.28-.21-.27-.55-.4-1.02-.4s-.81.15-1.02.44c-.21.3-.33.8-.36 1.5v.61h2.71z" fill="#141413"/>
      </svg>
    ),
    style: { background: "#232F3E", color: "#ffffff" },
  },
];

export default function SignInPage() {
  const handleOAuth = async (provider: "google" | "apple" | "amazon") => {
    try {
      await authClient.signIn.social({
        provider: provider as "google" | "apple",
        callbackURL: "/dashboard",
      });
    } catch {
      window.location.href = `/api/auth/sign-in/social?provider=${provider}&callbackURL=/dashboard`;
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "#f5f4ed" }}
    >
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-6">
            <div
              className="w-10 h-10 flex items-center justify-center"
              style={{ background: "#c96442", borderRadius: "16px" }}
            >
              <Camera className="w-5 h-5 text-white" />
            </div>
            <span
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontWeight: 500,
                fontSize: "24px",
                color: "#141413",
              }}
            >
              PhotoFuse
            </span>
          </Link>
          <h1
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "28px",
              fontWeight: 500,
              color: "#141413",
              marginBottom: "6px",
            }}
          >
            Welcome back
          </h1>
          <p style={{ fontSize: "14px", color: "#5e5d59", fontFamily: "system-ui" }}>
            Sign in to your unified gallery
          </p>
        </div>

        <div className="space-y-3">
          {providers.map((p) => (
            <button
              key={p.id}
              onClick={() => handleOAuth(p.id)}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 font-medium text-sm transition-all active:scale-[0.98]"
              style={{
                ...p.style,
                borderRadius: "12px",
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontWeight: 500,
                boxShadow: "0px 0px 0px 1px rgba(0,0,0,0.08)",
              }}
            >
              {p.icon}
              {p.label}
            </button>
          ))}
        </div>

        {/* Task #12: Fixed dead links */}
        <p
          className="text-center mt-6 leading-relaxed"
          style={{ fontSize: "12px", color: "#87867f", fontFamily: "system-ui" }}
        >
          By continuing, you agree to our{" "}
          <Link href="/terms" className="underline" style={{ color: "#5e5d59" }}>
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline" style={{ color: "#5e5d59" }}>
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
