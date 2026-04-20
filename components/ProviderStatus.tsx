import { CheckCircle, XCircle } from "lucide-react";

const PROVIDERS = [
  { id: "google", label: "Google Photos", icon: "📷" },
  { id: "apple", label: "iCloud Photos", icon: "☁️" },
  { id: "amazon", label: "Amazon Photos", icon: "🖼️" },
];

/**
 * ProviderStatus — DESIGN.md ProviderStatus badge spec
 * Pill badges: connected = sage tint, disconnected = faint parchment
 */
export default function ProviderStatus({ connected }: { connected: string[] }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {PROVIDERS.map((p) => {
        const ok = connected.includes(p.id);
        return (
          <div
            key={p.id}
            className="flex items-center gap-2.5 p-3"
            style={{
              background: ok ? "rgba(90, 122, 90, 0.06)" : "#faf9f5",
              border: ok ? "1px solid rgba(90,122,90,0.20)" : "1px solid #f0eee6",
              borderRadius: "12px",
              boxShadow: "0px 0px 0px 1px rgba(0,0,0,0.04)",
            }}
          >
            <span className="text-xl">{p.icon}</span>
            <div className="min-w-0 flex-1">
              <div
                className="text-sm font-medium truncate"
                style={{ color: "#141413", fontFamily: "system-ui" }}
              >
                {p.label}
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                {ok ? (
                  <span
                    className="flex items-center gap-1"
                    style={{
                      fontSize: "12px",
                      fontWeight: 500,
                      color: "#5a7a5a",
                      fontFamily: "system-ui",
                      letterSpacing: "0.1px",
                    }}
                  >
                    <CheckCircle className="w-3 h-3" />
                    Connected
                  </span>
                ) : (
                  <span
                    className="flex items-center gap-1"
                    style={{
                      fontSize: "12px",
                      fontWeight: 400,
                      color: "#87867f",
                      fontFamily: "system-ui",
                    }}
                  >
                    <XCircle className="w-3 h-3" />
                    Not connected
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
