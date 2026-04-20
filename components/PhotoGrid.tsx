"use client";

import { useState } from "react";
import Image from "next/image";
import type { Photo } from "@prisma/client";
import { formatDate } from "@/lib/utils";
import { X, ChevronLeft, ChevronRight, Copy } from "lucide-react";

interface PhotoGridProps {
  photos: Photo[];
  loading?: boolean;
}

const PROVIDER_BADGE: Record<string, { label: string; color: string }> = {
  google: { label: "Google", color: "#ea4335" },
  icloud: { label: "iCloud", color: "#5a7a5a" },
  amazon: { label: "Amazon", color: "#f97316" },
};

const FILTERS = [
  { id: "all", label: "All photos" },
  { id: "google", label: "Google" },
  { id: "icloud", label: "iCloud" },
  { id: "amazon", label: "Amazon" },
];

/* Skeleton loader grid — Task #9 */
function SkeletonGrid() {
  const heights = [192, 256, 160, 224, 176, 288, 192, 160, 240, 208, 144, 256];
  return (
    <div className="masonry">
      {heights.map((h, i) => (
        <div
          key={i}
          className="masonry-item skeleton"
          style={{ height: `${h}px`, borderRadius: "12px" }}
        />
      ))}
    </div>
  );
}

export default function PhotoGrid({ photos, loading }: PhotoGridProps) {
  const [selected, setSelected] = useState<Photo | null>(null);
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? photos : photos.filter((p) => p.provider === filter);

  const currentIndex = selected ? filtered.findIndex((p) => p.id === selected.id) : -1;
  const goNext = () => {
    if (currentIndex < filtered.length - 1) setSelected(filtered[currentIndex + 1]);
  };
  const goPrev = () => {
    if (currentIndex > 0) setSelected(filtered[currentIndex - 1]);
  };

  if (loading) return <SkeletonGrid />;

  return (
    <>
      {/* Filter pills — warm sand per DESIGN.md */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm transition-all whitespace-nowrap"
            style={
              filter === f.id
                ? {
                    background: "#141413",
                    color: "#faf9f5",
                    fontWeight: 500,
                    fontFamily: "system-ui, -apple-system, sans-serif",
                  }
                : {
                    background: "#e8e6dc",
                    color: "#4d4c48",
                    fontWeight: 400,
                    fontFamily: "system-ui, -apple-system, sans-serif",
                  }
            }
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Masonry photo grid — DESIGN.md spec */}
      <div className="masonry">
        {filtered.map((photo) => {
          const badge = PROVIDER_BADGE[photo.provider];
          return (
            <button
              key={photo.id}
              onClick={() => setSelected(photo)}
              className="masonry-item group relative w-full overflow-hidden block text-left"
              style={{
                borderRadius: "12px",
                boxShadow: "0px 0px 0px 1px rgba(0,0,0,0.08)",
              }}
            >
              {photo.thumbnailUrl ? (
                <Image
                  src={photo.thumbnailUrl}
                  alt={photo.filename}
                  width={400}
                  height={300}
                  sizes="(max-width: 640px) 50vw, 20vw"
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                  unoptimized
                />
              ) : (
                <div
                  className="w-full h-40 flex items-center justify-center text-3xl"
                  style={{ background: "#e8e6dc" }}
                >
                  🖼️
                </div>
              )}

              {/* Hover overlay — Near Black at 55% per DESIGN.md */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-3"
                style={{
                  background: "rgba(20, 20, 19, 0.55)",
                  borderRadius: "12px",
                }}
              >
                <p
                  className="text-sm truncate"
                  style={{
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    fontWeight: 500,
                    fontSize: "15px",
                    color: "#faf9f5",
                  }}
                >
                  {photo.filename}
                </p>
                {photo.takenAt && (
                  <span
                    className="text-xs mt-0.5"
                    style={{
                      fontFamily: "system-ui",
                      fontSize: "12px",
                      color: "#b0aea5",
                    }}
                  >
                    {formatDate(photo.takenAt)}
                  </span>
                )}
              </div>

              {/* Provider badge */}
              <div className="absolute top-2 left-2">
                <span
                  className="font-medium px-2 py-0.5"
                  style={{
                    fontSize: "10px",
                    color: "#faf9f5",
                    background: badge?.color ?? "#87867f",
                    borderRadius: "6px",
                    fontFamily: "system-ui",
                    letterSpacing: "0.1px",
                  }}
                >
                  {badge?.label ?? photo.provider}
                </span>
              </div>

              {/* Duplicate badge */}
              {photo.isDuplicate && (
                <div
                  className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{
                    background: "rgba(201, 100, 66, 0.9)",
                    color: "#faf9f5",
                    fontSize: "9px",
                    fontWeight: 700,
                  }}
                  title="Possible duplicate"
                >
                  <Copy className="w-2.5 h-2.5" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Lightbox — DESIGN.md spec */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            background: "rgba(20, 20, 19, 0.92)",
          }}
          onClick={() => setSelected(null)}
        >
          <div
            className="relative max-w-2xl w-full overflow-hidden"
            style={{ borderRadius: "8px" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Photo area */}
            {selected.thumbnailUrl && (
              <div className="relative" style={{ aspectRatio: "4/3", background: "#30302e" }}>
                <Image
                  src={selected.thumbnailUrl}
                  alt={selected.filename}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            )}

            {/* Controls bar — dark surface per DESIGN.md */}
            <div
              className="flex items-center justify-between px-5 gap-3"
              style={{
                background: "#30302e",
                height: "60px",
              }}
            >
              <div className="flex-1 min-w-0">
                <p
                  className="truncate"
                  style={{
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    fontSize: "14px",
                    fontWeight: 400,
                    color: "#87867f",
                  }}
                >
                  {selected.filename}
                </p>
                <div className="flex items-center gap-3 mt-0.5">
                  <span
                    className="font-medium px-2 py-0.5"
                    style={{
                      fontSize: "10px",
                      color: "#faf9f5",
                      background: PROVIDER_BADGE[selected.provider]?.color ?? "#87867f",
                      borderRadius: "6px",
                    }}
                  >
                    {PROVIDER_BADGE[selected.provider]?.label ?? selected.provider}
                  </span>
                  {selected.takenAt && (
                    <span style={{ fontSize: "12px", color: "#b0aea5" }}>
                      {formatDate(selected.takenAt)}
                    </span>
                  )}
                  {selected.width && selected.height && (
                    <span style={{ fontSize: "12px", color: "#87867f" }}>
                      {selected.width} × {selected.height}
                    </span>
                  )}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-2">
                <button
                  onClick={goPrev}
                  disabled={currentIndex <= 0}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors disabled:opacity-30"
                  style={{ color: "#b0aea5" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#faf9f5")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#b0aea5")}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={goNext}
                  disabled={currentIndex >= filtered.length - 1}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors disabled:opacity-30"
                  style={{ color: "#b0aea5" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#faf9f5")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#b0aea5")}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Close button — top-right per DESIGN.md */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              style={{ color: "#b0aea5", background: "rgba(48,48,46,0.6)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#faf9f5")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#b0aea5")}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
