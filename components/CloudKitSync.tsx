"use client";

import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";

interface CloudKitConfig {
  containerIdentifier: string;
  apiToken: string;
  environment: string;
}

/**
 * CloudKitSync — Task #4
 * Client-side CloudKit JS SDK integration.
 * Fetches config from /api/photos/icloud, initializes CloudKit,
 * queries Photos, POSTs results back to /api/photos/icloud.
 */
export default function CloudKitSync({ onSyncComplete }: { onSyncComplete?: () => void }) {
  const [syncing, setSyncing] = useState(false);
  const [status, setStatus] = useState<"idle" | "syncing" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  const syncICloudPhotos = async () => {
    setSyncing(true);
    setStatus("syncing");
    setMessage("Connecting to iCloud…");

    try {
      // Step 1: Get CloudKit config from our API
      const configRes = await fetch("/api/photos/icloud");
      if (!configRes.ok) throw new Error("Failed to get CloudKit config");
      const { cloudkitConfig } = await configRes.json() as { cloudkitConfig: CloudKitConfig };

      if (!cloudkitConfig.containerIdentifier || !cloudkitConfig.apiToken) {
        throw new Error("CloudKit not configured");
      }

      // Step 2: Check if CloudKit JS is loaded
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const CloudKit = (window as any).CloudKit;
      if (!CloudKit) {
        throw new Error("CloudKit JS SDK not loaded. Add the CloudKit JS script to your page.");
      }

      // Step 3: Configure CloudKit
      CloudKit.configure({
        containers: [{
          containerIdentifier: cloudkitConfig.containerIdentifier,
          apiTokenAuth: {
            apiToken: cloudkitConfig.apiToken,
            persist: true,
          },
          environment: cloudkitConfig.environment,
        }],
      });

      const container = CloudKit.getDefaultContainer();
      const database = container.publicCloudDatabase;

      // Step 4: Authenticate user
      setMessage("Authenticating with iCloud…");
      const userIdentity = await container.setUpAuth();
      if (!userIdentity) {
        throw new Error("iCloud authentication required");
      }

      // Step 5: Query photos
      setMessage("Fetching photos from iCloud…");
      const query = { recordType: "Photos.Photo" };
      const response = await database.performQuery(query);

      if (!response.records || response.records.length === 0) {
        setMessage("No photos found in iCloud");
        setStatus("done");
        return;
      }

      // Step 6: Map records to our photo format
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const photos = response.records.map((record: any) => ({
        remoteId: record.recordName,
        filename: record.fields?.filename?.value || record.recordName,
        mimeType: record.fields?.mimeType?.value || null,
        width: record.fields?.width?.value || null,
        height: record.fields?.height?.value || null,
        takenAt: record.fields?.dateTaken?.value || null,
        thumbnailUrl: record.fields?.thumbnailURL?.value || null,
        baseUrl: record.fields?.assetURL?.value || null,
      }));

      // Step 7: POST to our API
      setMessage(`Syncing ${photos.length} photos…`);
      const syncRes = await fetch("/api/photos/icloud", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ photos }),
      });

      if (!syncRes.ok) throw new Error("Failed to sync photos to database");

      const result = await syncRes.json();
      setMessage(`Synced ${result.synced} photos from iCloud`);
      setStatus("done");
      onSyncComplete?.();
    } catch (err) {
      console.error("CloudKit sync error:", err);
      setMessage(err instanceof Error ? err.message : "Sync failed");
      setStatus("error");
    } finally {
      setSyncing(false);
    }
  };

  return (
    <button
      onClick={syncICloudPhotos}
      disabled={syncing}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
      style={{
        background: status === "error" ? "rgba(181,51,51,0.10)" : "var(--color-warm-sand)",
        color: status === "error" ? "var(--color-error)" : "var(--color-charcoal-warm)",
        border: `1px solid ${status === "error" ? "rgba(181,51,51,0.25)" : "var(--color-border-warm)"}`,
      }}
    >
      <RefreshCw className={`w-4 h-4 ${syncing ? "animate-spin-slow" : ""}`} />
      {syncing ? message : status === "done" ? message : "Sync iCloud"}
    </button>
  );
}
