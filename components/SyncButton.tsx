"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";

/**
 * SyncButton — Task #5
 * "Sync Now" button that calls all provider sync endpoints
 * and refreshes the photo grid.
 */
export default function SyncButton({ connectedProviders }: { connectedProviders: string[] }) {
  const [syncing, setSyncing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const router = useRouter();

  const handleSync = async () => {
    if (syncing) return;
    setSyncing(true);
    setResult(null);

    try {
      const syncCalls: Promise<Response>[] = [];

      if (connectedProviders.includes("google")) {
        syncCalls.push(fetch("/api/photos/google"));
      }
      if (connectedProviders.includes("amazon")) {
        syncCalls.push(fetch("/api/photos/amazon"));
      }
      // iCloud uses client-side sync via CloudKit JS, skip here

      const results = await Promise.allSettled(syncCalls);
      const succeeded = results.filter((r) => r.status === "fulfilled").length;
      const failed = results.filter((r) => r.status === "rejected").length;

      if (failed > 0) {
        setResult(`Synced ${succeeded} provider(s), ${failed} failed`);
      } else {
        setResult(`Synced ${succeeded} provider(s)`);
      }

      // Refresh the page data
      router.refresh();
    } catch {
      setResult("Sync failed");
    } finally {
      setSyncing(false);
      setTimeout(() => setResult(null), 4000);
    }
  };

  if (connectedProviders.length === 0) return null;

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleSync}
        disabled={syncing}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-60"
        style={{
          background: "var(--color-terracotta)",
          color: "var(--color-ivory)",
          borderRadius: "10px",
        }}
      >
        <RefreshCw className={`w-3.5 h-3.5 ${syncing ? "animate-spin-slow" : ""}`} />
        {syncing ? "Syncing…" : "Sync Now"}
      </button>
      {result && (
        <span className="text-sm animate-fade-in" style={{ color: "var(--color-stone-gray)" }}>
          {result}
        </span>
      )}
    </div>
  );
}
