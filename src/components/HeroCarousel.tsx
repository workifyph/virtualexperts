"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import type { HeroSlide } from "@/config/types";

export default function HeroCarousel({
  slides,
  interval = 8000,
  children,
}: {
  slides: HeroSlide[];
  interval?: number;
  children?: ReactNode;
}) {
  const [active, setActive] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  function scheduleNext(duration?: number) {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, duration ?? interval);
  }

  useEffect(() => {
    const slide = slides[active];

    if (slide.type === "video") {
      const video = videoRefs.current[active];
      if (video) {
        video.currentTime = 0;
        video.muted = isMuted;
        video.play().catch(() => {});
        const onEnded = () => setActive((prev) => (prev + 1) % slides.length);
        video.addEventListener("ended", onEnded);
        scheduleNext(60000);
        return () => {
          video.removeEventListener("ended", onEnded);
          clearTimeout(timerRef.current);
        };
      }
    }

    scheduleNext();
    return () => clearTimeout(timerRef.current);
  }, [active, slides.length, interval, isMuted]);

  // Sync muted state to active video
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (v) {
        if (i === active) {
          v.muted = isMuted;
        } else {
          v.pause();
        }
      }
    });
  }, [active, isMuted]);

  function toggleMute() {
    setIsMuted((prev) => !prev);
  }

  const activeIsVideo = slides[active]?.type === "video";

  return (
    <section className="section-full" aria-label="Showcase carousel">
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className="section-media"
          style={{
            opacity: i === active ? 1 : 0,
            transition: "opacity 1.2s ease-in-out",
            zIndex: i === active ? 0 : -1,
          }}
        >
          {slide.type === "image" ? (
            <img
              src={slide.src}
              alt={slide.alt || ""}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <video
              ref={(el) => { videoRefs.current[i] = el; }}
              muted
              playsInline
              poster={slide.poster || undefined}
              preload="auto"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            >
              <source src={slide.src} type="video/mp4" />
            </video>
          )}
        </div>
      ))}

      {/* Overlay gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.08) 40%, rgba(0,0,0,0.5) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Content overlay */}
      <div className="section-content section-content--center" style={{ zIndex: 2 }}>
        {children}
      </div>

      {/* Bottom controls */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        {/* Indicator dots */}
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width: i === active ? "2rem" : "0.5rem",
                height: "0.5rem",
                borderRadius: "999px",
                border: "none",
                background: i === active ? "var(--gold)" : "rgba(255,255,255,0.4)",
                cursor: "pointer",
                transition: "all 0.4s ease",
              }}
            />
          ))}
        </div>

        {/* Mute/Unmute toggle */}
        {activeIsVideo && (
          <button
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "2.4rem",
              height: "2.4rem",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.25)",
              background: "rgba(0,0,0,0.35)",
              backdropFilter: "blur(8px)",
              cursor: "pointer",
              color: "#fff",
              fontSize: "1rem",
              transition: "all 0.3s ease",
            }}
          >
            {isMuted ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            )}
          </button>
        )}
      </div>
    </section>
  );
}
