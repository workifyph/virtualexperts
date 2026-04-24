import type { ReactNode } from "react";

export default function VideoSection({
  src,
  poster,
  image,
  halfHeight = false,
  children,
}: {
  src?: string;
  poster?: string;
  image?: string;
  halfHeight?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      className={`section-full ${halfHeight ? "section-full--half" : ""}`}
      aria-label="Featured section"
    >
      <div className="section-media">
        {src ? (
          <video autoPlay muted loop playsInline poster={poster} preload="metadata">
            <source src={src} type="video/mp4" />
          </video>
        ) : image ? (
          <img src={image} alt="" loading="lazy" />
        ) : null}
      </div>
      <div className="section-content section-content--center">
        {children}
      </div>
    </section>
  );
}
