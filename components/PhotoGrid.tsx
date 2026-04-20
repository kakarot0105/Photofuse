"use client";

import { useState } from "react";
import Image from "next/image";
import type { Photo } from "@prisma/client";
import { formatDate } from "@/lib/utils";
import { X } from "lucide-react";

interface PhotoGridProps {
  photos: Photo[];
}

const PROVIDER_BADGE: Record<string, { label: string; color: string }> = {
  google:  { label: "Google",  color: "#ea4335" },
  icloud:  { label: "iCloud",  color: "#3b82f6" },
  amazon:  { label: "Amazon",  color: "#f97316" },
};

const FILTERS = [
  { id: "all",    label: "All photos" },
  { id: "google", label: "Google" },
  { id: "icloud", label: "iCloud" },
  { id: "amazon", label: "Amazon" },
];

export default function PhotoGrid({ photos }: PhotoGridProps) {
  const [selected, setSelected] = useState<Photo | null>(null);
  const [filter, setFilter]     = useState("all");

  const filtered = filter === "all" ? photos : photos.filter((p) => p.provider === filter);

  return (
    <>
      {/* Filter pills */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {FILTERS.map((f) => (
          <button key={f.id} onClick={() => setFilter(f.id)}
            className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap"
            style={filter === f.id
              ? { background: "#222222", color: "#ffffff" }
              : { background: "#e5e5e0", color: "#222222" }}>
            {f.label}
          </button>
        ))}
      </div>

      {/* Pinterest masonry */}
      <div className="masonry">
        {filtered.map((photo) => {
          const badge = PROVIDER_BADGE[photo.provider];
          return (
            <button key={photo.id} onClick={() => setSelected(photo)}
              className="masonry-item group relative w-full overflow-hidden rounded-2xl bg-gray-100 block text-left">
              {photo.thumbnailUrl
                ? <Image src={photo.thumbnailUrl} alt={photo.filename} width={400} height={300}
                    sizes="(max-width: 640px) 50vw, 20vw"
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                    unoptimized />
                : <div className="w-full h-40 flex items-center justify-center text-3xl bg-gray-100">🖼️</div>
              }
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-2xl" />
              <div className="absolute top-2 left-2">
                <span className="text-[10px] font-bold text-white px-1.5 py-0.5 rounded-lg"
                  style={{ background: badge?.color ?? "#666" }}>
                  {badge?.label ?? photo.provider}
                </span>
              </div>
              {photo.isDuplicate && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] font-bold"
                  style={{ background: "#f59e0b" }} title="Possible duplicate">D</div>
              )}
            </button>
          );
        })}
      </div>

      {/* Lightbox */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
          onClick={() => setSelected(null)}>
          <div className="bg-white rounded-3xl overflow-hidden max-w-lg w-full relative"
            style={{ boxShadow: "rgba(0,0,0,0.22) 0px 20px 60px" }}
            onClick={(e) => e.stopPropagation()}>
            {selected.thumbnailUrl && (
              <div className="relative bg-gray-100" style={{ aspectRatio: "4/3" }}>
                <Image src={selected.thumbnailUrl} alt={selected.filename} fill className="object-contain" unoptimized />
              </div>
            )}
            <div className="p-4">
              <p className="font-semibold truncate" style={{ color: "#222222" }}>{selected.filename}</p>
              <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                <span className="text-[10px] font-bold text-white px-2 py-0.5 rounded-lg"
                  style={{ background: PROVIDER_BADGE[selected.provider]?.color ?? "#666" }}>
                  {PROVIDER_BADGE[selected.provider]?.label ?? selected.provider}
                </span>
                {selected.takenAt && <span className="text-sm" style={{ color: "#6a6a6a" }}>{formatDate(selected.takenAt)}</span>}
                {selected.width && selected.height && (
                  <span className="text-sm" style={{ color: "#91918c" }}>{selected.width} × {selected.height}</span>
                )}
              </div>
            </div>
            <button onClick={() => setSelected(null)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md"
              style={{ color: "#222222" }}>
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
