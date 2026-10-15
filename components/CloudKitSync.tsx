"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";

interface CloudKitConfig {
  containerIdentifier: string;
  apiToken: string;
  environment: string;
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    CloudKit?: any;
  }
}

const CLOUDKIT_CDN =
  "https://cdn.apple-cloudkit.com/ck/2/cloudkit.js";

function loadCloudKitScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.reject(new Error("SSR"));
  if (window.CloudKit) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${CLOUDKIT_CDN}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () =>
        reject(new Error("Failed to load CloudKit JS"))
      );
      // Already loaded
      if (window.CloudKit) resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = CLOUDKIT_CDN;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load CloudKit JS"));
    document.head.appendChild(script);
  });
}

/**
 * CloudKitSync — Task #4
 * Client-side CloudKit JS SDK integration.
 */
export default function CloudKitSync({
  onSyncComplete,
}: {
  onSyncComplete?: () => void;
}) {
  const [syncing, setSyncing] = useState(false);
  const [status, setStatus] = useState<"idle" | "syncing" | "done" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  const syncICloudPhotos = async () => {
    setSyncing(true);
    setStatus("syncing");
    setMessage("Connecting to iCloud…");

    try {
      const configRes = await fetch("/api/photos/icloud");
      if (!configRes.ok) throw new Error("Failed to get CloudKit config");
      const { cloudkitConfig } = (await configRes.json()) as {
        cloudkitConfig: CloudKitConfig;
      };

      if (!cloudkitConfig.containerIdentifier || !cloudkitConfig.apiToken) {
        throw new Error("CloudKit not configured. Set CLOUDKIT_CONTAINER_ID and CLOUDKIT_API_TOKEN.");
      }

      await loadCloudKitScript();
      const CloudKit = window.CloudKit;
      if (!CloudKit) {
        throw new Error("CloudKit JS SDK failed to initialize");
      }

      CloudKit.configure({
        containers: [
          {
            containerIdentifier: cloudkitConfig.containerIdentifier,
            apiTokenAuth: {
              apiToken: cloudkitConfig.apiToken,
              persist: true,
            },
            environment: cloudkitConfig.environment,
          },
        ],
      });

      const container = CloudKit.getDefaultContainer();
      // Photos live in the user's private database
      const database = container.privateCloudDatabase;

      setMessage("Authenticating with iCloud…");
      const userIdentity = await container.setUpAuth();
      if (!userIdentity) {
        // Prompt sign-in UI if available
        await container.whenUserSignsIn();
      }

      setMessage("Fetching photos from iCloud…");
      const query = { recordType: "Photos.Photo" };
      const response = await database.performQuery(query);

      if (!response.records || response.records.length === 0) {
        setMessage("No photos found in iCloud");
        setStatus("done");
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const photos = response.records.map((record: any) => {
        const takenRaw = record.fields?.dateTaken?.value;
        let takenAt: string | null = null;
        if (typeof takenRaw === "number") {
          takenAt = new Date(takenRaw).toISOString();
        } else if (typeof takenRaw === "string") {
          takenAt = new Date(takenRaw).toISOString();
        }

        return {
          remoteId: record.recordName,
          filename: record.fields?.filename?.value || record.recordName,
          mimeType: record.fields?.mimeType?.value || null,
          width: record.fields?.width?.value || null,
          height: record.fields?.height?.value || null,
          takenAt,
          thumbnailUrl: record.fields?.thumbnailURL?.value || null,
          baseUrl: record.fields?.assetURL?.value || null,
        };
      });

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
      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors disabled:opacity-50"
      style={{
        background: status === "error" ? "rgba(181,51,51,0.10)" : "#f5f4ed",
        color: status === "error" ? "#b53333" : "#4d4c48",
        border:
          status === "error"
            ? "1px solid rgba(181,51,51,0.25)"
            : "1px solid #e8e6dc",
      }}
    >
      <RefreshCw className={`w-4 h-4 ${syncing ? "animate-spin-slow" : ""}`} />
      {syncing
        ? message
        : status === "done"
          ? message
          : status === "error"
            ? message
            : "Sync iCloud Photos"}
    </button>
  );
}
