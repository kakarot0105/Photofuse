import { CheckCircle, XCircle } from "lucide-react";

const PROVIDERS = [
  { id: "google", label: "Google Photos", icon: "📷" },
  { id: "apple",  label: "iCloud Photos", icon: "☁️" },
  { id: "amazon", label: "Amazon Photos", icon: "🖼️" },
];

export default function ProviderStatus({ connected }: { connected: string[] }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {PROVIDERS.map((p) => {
        const ok = connected.includes(p.id);
        return (
          <div key={p.id} className="flex items-center gap-2.5 p-3 rounded-2xl"
            style={{ background: ok ? "#f0fdf4" : "#ffffff", border: `1px solid ${ok ? "#bbf7d0" : "#e5e5e0"}`,
              boxShadow: "rgba(0,0,0,0.02) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 6px" }}>
            <span className="text-xl">{p.icon}</span>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium truncate" style={{ color: "#222222" }}>{p.label}</div>
              <div className={`flex items-center gap-1 text-xs ${ok ? "text-green-600" : ""}`} style={ok ? {} : { color: "#91918c" }}>
                {ok ? <><CheckCircle className="w-3 h-3" />Connected</> : <><XCircle className="w-3 h-3" />Not connected</>}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
