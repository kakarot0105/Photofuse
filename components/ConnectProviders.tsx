"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { CheckCircle, LinkIcon, Loader2, Unlink } from "lucide-react";
import { useRouter } from "next/navigation";

const PROVIDERS = [
  {
    id: "google" as const,
    label: "Google Photos",
    icon: "📷",
    desc: "Access your Google Photos library with read-only access.",
    connectLabel: "Connect Google Photos",
  },
  {
    id: "apple" as const,
    label: "iCloud Photos",
    icon: "☁️",
    desc: "Sign in with Apple to access your iCloud Photos via CloudKit.",
    connectLabel: "Connect with Apple",
  },
  {
    id: "amazon" as const,
    label: "Amazon Photos",
    icon: "🖼️",
    desc: "Connect your Amazon Photos account (Login with Amazon OAuth).",
    connectLabel: "Connect Amazon Photos",
  },
];

export default function ConnectProviders({ connected }: { connected: string[] }) {
  const [connecting, setConnecting] = useState<string | null>(null);
  const [disconnecting, setDisconnecting] = useState<string | null>(null);
  const router = useRouter();

  // Task #2: Fixed type cast to include "amazon"
  const handleConnect = async (provider: "google" | "apple" | "amazon") => {
    setConnecting(provider);
    try {
      await authClient.signIn.social({
        provider: provider as "google" | "apple",
        callbackURL: "/dashboard",
      });
    } catch {
      window.location.href = `/api/auth/sign-in/social?provider=${provider}&callbackURL=/dashboard`;
    }
  };

  // Task #6: Disconnect functionality
  const handleDisconnect = async (providerId: string) => {
    if (!confirm(`Disconnect ${providerId}? This will also remove synced photos from this provider.`)) return;
    setDisconnecting(providerId);
    try {
      const res = await fetch(`/api/providers/${providerId}/disconnect`, { method: "DELETE" });
      if (res.ok) {
        router.refresh();
      }
    } catch (err) {
      console.error("Disconnect failed:", err);
    } finally {
      setDisconnecting(null);
    }
  };

  return (
    <div className="space-y-4">
      {PROVIDERS.map((p) => {
        const ok = connected.includes(p.id);
        const isConnecting = connecting === p.id;
        const isDisconnecting = disconnecting === p.id;

        return (
          <div
            key={p.id}
            className="p-7 flex flex-col gap-4"
            style={{
              background: "#faf9f5",
              border: ok ? "1px solid rgba(90,122,90,0.3)" : "1px solid #f0eee6",
              borderRadius: "16px",
              boxShadow: "rgba(0,0,0,0.05) 0px 4px 24px",
            }}
          >
            {/* Provider logo + info */}
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 flex items-center justify-center text-2xl flex-shrink-0"
                style={{ borderRadius: "10px", background: "#f5f4ed" }}
              >
                {p.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3
                  style={{
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    fontSize: "20px",
                    fontWeight: 500,
                    color: "#141413",
                    marginBottom: "4px",
                  }}
                >
                  {p.label}
                </h3>
                <p
                  style={{
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    fontSize: "14px",
                    color: "#5e5d59",
                    lineHeight: 1.6,
                  }}
                >
                  {p.desc}
                </p>
              </div>

              {/* Status badge — per DESIGN.md ProviderStatus spec */}
              {ok && (
                <span
                  className="flex items-center gap-1.5 flex-shrink-0 mt-1"
                  style={{
                    background: "rgba(90, 122, 90, 0.12)",
                    color: "#5a7a5a",
                    border: "1px solid rgba(90, 122, 90, 0.25)",
                    padding: "4px 10px",
                    borderRadius: "9999px",
                    fontSize: "12px",
                    fontFamily: "system-ui",
                    fontWeight: 500,
                    letterSpacing: "0.1px",
                  }}
                >
                  <CheckCircle className="w-3 h-3" />
                  Connected
                </span>
              )}
            </div>

            {/* Action button — full-width per DESIGN.md */}
            {ok ? (
              <button
                onClick={() => handleDisconnect(p.id)}
                disabled={isDisconnecting}
                className="w-full flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                style={{
                  background: "#e8e6dc",
                  color: "#4d4c48",
                  borderRadius: "12px",
                  padding: "12px 20px",
                  fontSize: "15px",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  fontWeight: 500,
                  boxShadow: "0px 0px 0px 1px #d1cfc5",
                }}
              >
                {isDisconnecting ? (
                  <Loader2 className="w-4 h-4 animate-spin-slow" />
                ) : (
                  <Unlink className="w-4 h-4" />
                )}
                {isDisconnecting ? "Disconnecting…" : "Disconnect"}
              </button>
            ) : (
              <button
                onClick={() => handleConnect(p.id)}
                disabled={isConnecting}
                className="w-full flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                style={{
                  background: "#c96442",
                  color: "#faf9f5",
                  borderRadius: "12px",
                  padding: "12px 20px",
                  fontSize: "15px",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  fontWeight: 500,
                  boxShadow: "0px 0px 0px 1px #c96442",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#b85a3a")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#c96442")}
              >
                {isConnecting ? (
                  <Loader2 className="w-4 h-4 animate-spin-slow" />
                ) : (
                  <LinkIcon className="w-4 h-4" />
                )}
                {isConnecting ? "Connecting…" : p.connectLabel}
              </button>
            )}
          </div>
        );
      })}

      {/* Privacy notice — warm sage tint */}
      <div
        className="p-4 text-sm"
        style={{
          background: "rgba(90, 122, 90, 0.08)",
          color: "#5a7a5a",
          borderRadius: "12px",
          border: "1px solid rgba(90, 122, 90, 0.15)",
        }}
      >
        <strong>Privacy:</strong> PhotoFuse never uploads your photos. We request read-only access
        and display photos directly from each provider.
      </div>
    </div>
  );
}
