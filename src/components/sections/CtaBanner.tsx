import Link from "next/link";
import { siteConfig } from "@/config";

export default function CtaBanner({
  heading = "Ready to get started?",
  description,
  primaryLabel = "Send an Inquiry",
  primaryHref = "/contact",
  secondaryLabel,
  secondaryHref,
  image,
  video,
}: {
  heading?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  image?: string;
  video?: string;
}) {
  return (
    <section className="section-full section-full--half" aria-label="Call to action">
      <div className="section-media">
        {video ? (
          <video autoPlay muted loop playsInline preload="metadata">
            <source src={video} type="video/mp4" />
          </video>
        ) : image ? (
          <img src={image} alt="" loading="lazy" />
        ) : (
          <div style={{ width: "100%", height: "100%", background: "var(--charcoal)" }} />
        )}
      </div>
      <div className="section-content section-content--center">
        <h2 className="text-section-video mb-4">{heading}</h2>
        {description && (
          <p className="text-lg text-white/70 max-w-xl mb-8 leading-relaxed">
            {description}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href={primaryHref} className="btn btn-overlay-primary">
            {primaryLabel}
          </Link>
          {secondaryLabel && secondaryHref && (
            <a
              href={secondaryHref}
              target={secondaryHref.startsWith("http") ? "_blank" : undefined}
              rel={secondaryHref.startsWith("http") ? "noopener noreferrer" : undefined}
              className="btn btn-overlay-secondary"
            >
              {secondaryLabel}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
