"use client";

import { useState, useRef, useCallback, useEffect } from "react";

const AUTOPLAY_MS = 5000;
import type { GalleryAlbum } from "@/config/types";

function PlaceholderTile({ label }: { label: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.75rem",
        background:
          "linear-gradient(135deg, var(--paper) 0%, var(--gold-soft, rgba(197,160,89,0.15)) 100%)",
        color: "var(--muted)",
      }}
    >
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
      <span style={{ fontSize: "0.8rem", letterSpacing: "0.05em" }}>{label}</span>
    </div>
  );
}

function ArrowButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous photo" : "Next photo"}
      style={{
        position: "absolute",
        top: "50%",
        [direction === "prev" ? "left" : "right"]: "1rem",
        transform: "translateY(-50%)",
        zIndex: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "2.6rem",
        height: "2.6rem",
        borderRadius: "999px",
        border: "1px solid rgba(255,255,255,0.25)",
        background: "rgba(0,0,0,0.35)",
        backdropFilter: "blur(8px)",
        cursor: "pointer",
        color: "#fff",
        transition: "all 0.3s ease",
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {direction === "prev" ? (
          <polyline points="15 18 9 12 15 6" />
        ) : (
          <polyline points="9 18 15 12 9 6" />
        )}
      </svg>
    </button>
  );
}

export default function GalleryCarousel({ albums }: { albums: GalleryAlbum[] }) {
  const [activeAlbum, setActiveAlbum] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const album = albums[activeAlbum];
  const count = album?.images.length ?? 0;

  // Auto-advance; restarts whenever the image changes so manual navigation
  // gets a full interval before the next auto-step.
  useEffect(() => {
    if (count < 2 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % count);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [count, paused, activeAlbum, activeImage]);

  const goTo = useCallback(
    (delta: number) => {
      setActiveImage((prev) => (prev + delta + count) % count);
    },
    [count],
  );

  function selectAlbum(index: number) {
    setActiveAlbum(index);
    setActiveImage(0);
  }

  if (!album) return null;

  return (
    <div>
      {/* Album tabs */}
      {albums.length > 1 && (
        <div
          role="tablist"
          aria-label="Photo albums"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0.5rem",
            marginBottom: "var(--s-6, 1.5rem)",
          }}
        >
          {albums.map((a, i) => (
            <button
              key={a.slug}
              role="tab"
              aria-selected={i === activeAlbum}
              onClick={() => selectAlbum(i)}
              style={{
                padding: "0.5rem 1.1rem",
                borderRadius: "999px",
                fontSize: "0.85rem",
                fontWeight: 500,
                letterSpacing: "0.02em",
                cursor: "pointer",
                transition: "all 0.3s ease",
                border:
                  i === activeAlbum
                    ? "1px solid var(--gold, #c5a059)"
                    : "1px solid var(--line)",
                background: i === activeAlbum ? "var(--gold, #c5a059)" : "transparent",
                color: i === activeAlbum ? "#fff" : "var(--ink-soft)",
              }}
            >
              {a.title}
              {a.date ? ` · ${a.date}` : ""}
            </button>
          ))}
        </div>
      )}

      {/* Main frame */}
      <div
        style={{
          position: "relative",
          aspectRatio: "16 / 9",
          borderRadius: "var(--radius-card, 1rem)",
          overflow: "hidden",
          border: "var(--card-border, 1px solid rgba(221,210,196,0.9))",
          background: "var(--paper)",
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={(e) => {
          setPaused(true);
          touchStartX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          setPaused(false);
          if (touchStartX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchStartX.current;
          touchStartX.current = null;
          if (Math.abs(dx) > 50) goTo(dx < 0 ? 1 : -1);
        }}
      >
        {album.images.map((image, i) => (
          <div
            key={`${album.slug}-${i}`}
            style={{
              position: "absolute",
              inset: 0,
              opacity: i === activeImage ? 1 : 0,
              transition: "opacity 0.6s ease-in-out",
              zIndex: i === activeImage ? 1 : 0,
            }}
            aria-hidden={i !== activeImage}
          >
            {image.src ? (
              <img
                src={image.src}
                alt={image.alt || album.title}
                loading={i === 0 ? "eager" : "lazy"}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <PlaceholderTile label="Photo coming soon" />
            )}
          </div>
        ))}

        {count > 1 && (
          <>
            <ArrowButton direction="prev" onClick={() => goTo(-1)} />
            <ArrowButton direction="next" onClick={() => goTo(1)} />
          </>
        )}

        {/* Counter badge */}
        <div
          style={{
            position: "absolute",
            bottom: "0.9rem",
            right: "1rem",
            zIndex: 2,
            padding: "0.25rem 0.7rem",
            borderRadius: "999px",
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(8px)",
            color: "#fff",
            fontSize: "0.75rem",
            letterSpacing: "0.05em",
          }}
        >
          {activeImage + 1} / {count}
        </div>
      </div>

      {/* Caption + dots */}
      {album.images[activeImage]?.caption && (
        <p
          className="vex-description"
          style={{ textAlign: "center", marginTop: "var(--s-4, 1rem)" }}
        >
          {album.images[activeImage].caption}
        </p>
      )}

      {count > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "0.5rem",
            marginTop: "var(--s-6, 1.5rem)",
          }}
        >
          {album.images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              aria-label={`Go to photo ${i + 1}`}
              style={{
                width: i === activeImage ? "2rem" : "0.5rem",
                height: "0.5rem",
                borderRadius: "999px",
                border: "none",
                background: i === activeImage ? "var(--gold, #c5a059)" : "var(--line)",
                cursor: "pointer",
                transition: "all 0.4s ease",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
