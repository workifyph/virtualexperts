import Link from "next/link";
import ScrollReveal from "../ScrollReveal";
import SectionHeader from "./SectionHeader";
import type { ServiceItem } from "@/config/types";

export default function ServiceGrid({
  eyebrow = "What We Do",
  heading = "Structured support,<br/>tailored to your business.",
  description,
  services,
  ctaLabel = "View All Services",
  ctaHref = "/services",
  columns = 3,
}: {
  eyebrow?: string;
  heading?: string;
  description?: string;
  services: ServiceItem[];
  ctaLabel?: string;
  ctaHref?: string;
  columns?: 2 | 3 | 4;
}) {
  return (
    <section className="vex-section" aria-label={eyebrow}>
      <div className="vex-container">
        <SectionHeader
          eyebrow={eyebrow}
          heading={heading}
          description={description}
        />

        <div className={`vex-grid vex-grid--${columns}`}>
          {services.map((svc, i) => (
            <ScrollReveal key={svc.slug} delay={i * 100}>
              <div className="service-panel">
                {svc.image && (
                  <img
                    src={svc.image}
                    alt={svc.title}
                    className="service-panel__image"
                    loading="lazy"
                  />
                )}
                <p className="service-panel__label">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="service-panel__title">{svc.title}</h3>
                <p className="service-panel__body">{svc.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {ctaLabel && (
          <ScrollReveal>
            <div className="mt-8 text-center">
              <Link href={ctaHref} className="btn btn-tertiary">
                {ctaLabel}
              </Link>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
