"use client";

import { authClient } from "@/lib/auth-client";
import { CheckCircle } from "lucide-react";

const PROVIDERS = [
  { id: "google" as const, label: "Google Photos", icon: "📷",
    desc: "Access your Google Photos library with read-only access.",
    connectLabel: "Connect Google Photos",
    connectedBg: "#fef2f2", connectedBorder: "#fecaca", badgeColor: "#ea4335" },
  { id: "apple" as const, label: "iCloud Photos", icon: "☁️",
    desc: "Sign in with Apple to access your iCloud Photos via CloudKit.",
    connectLabel: "Connect with Apple",
    connectedBg: "#eff6ff", connectedBorder: "#bfdbfe", badgeColor: "#3b82f6" },
  { id: "amazon" as const, label: "Amazon Photos", icon: "🖼️",
    desc: "Connect your Amazon Photos account (Login with Amazon OAuth).",
    connectLabel: "Connect Amazon Photos",
    connectedBg: "#fff7ed", connectedBorder: "#fed7aa", badgeColor: "#f97316" },
];

export default function ConnectProviders({ connected }: { connected: string[] }) {
  const handleConnect = async (provider: "google" | "apple" | "amazon") => {
    try {
      await authClient.signIn.social({ provider: provider as "google" | "apple", callbackURL: "/dashboard" });
    } catch {
      window.location.href = `/api/auth/sign-in/social?provider=${provider}&callbackURL=/dashboard`;
    }
  };

  return (
    <div className="space-y-3">
      {PROVIDERS.map((p) => {
        const ok = connected.includes(p.id);
        return (
          <div key={p.id} className="p-5 rounded-3xl border flex items-start gap-4"
            style={{ background: ok ? p.connectedBg : "#ffffff", borderColor: ok ? p.connectedBorder : "#e5e5e0",
              boxShadow: "rgba(0,0,0,0.02) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 6px, rgba(0,0,0,0.08) 0px 4px 8px" }}>
            <span className="text-3xl mt-0.5">{p.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold" style={{ color: "#222222" }}>{p.label}</h3>
                {ok && <CheckCircle className="w-4 h-4 text-green-500" />}
              </div>
              <p className="text-sm mb-3" style={{ color: "#6a6a6a" }}>{p.desc}</p>
              {ok
                ? <span className="text-sm font-medium text-green-600 flex items-center gap-1.5"><CheckCircle className="w-4 h-4" />Connected</span>
                : <button onClick={() => handleConnect(p.id)}
                    className="text-sm font-medium text-white px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
                    style={{ background: "#222222" }}>{p.connectLabel}</button>
              }
            </div>
          </div>
        );
      })}

      <div className="p-4 rounded-2xl text-sm" style={{ background: "#ede9fe", color: "#6d28d9" }}>
        <strong>Privacy:</strong> PhotoFuse never uploads your photos. We request read-only access and display photos directly from each provider.
      </div>
    </div>
  );
}
