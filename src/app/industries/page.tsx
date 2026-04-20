import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { servedIndustries } from "@/content/siteData";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "VEX provides managed remote support across 13+ industries including real estate, healthcare, e-commerce, legal services, and more.",
};

export default function IndustriesPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-full section-full--half" aria-label="Industries hero">
        <div className="section-media">
          <img src="/industries-hero.png" alt="Philippine cityscape at sunset" />
        </div>
        <div className="section-content section-content--center">
          <p className="vex-eyebrow" style={{ color: "rgba(255,231,189,0.82)" }}>Industries</p>
          <h1 className="text-hero-video">
            Industry-specific<br />support teams.
          </h1>
        </div>
      </section>

      {/* Industry grid */}
      <section className="vex-section" aria-label="Industry list">
        <div className="vex-container">
          <ScrollReveal>
            <div style={{ textAlign: "center", marginBottom: "var(--s-8)" }}>
              <p className="vex-eyebrow">Industries We Serve</p>
              <h2 className="vex-heading" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", maxWidth: "36ch", marginInline: "auto" }}>
                Support built for your industry.
              </h2>
              <p className="vex-description" style={{ maxWidth: "56ch", marginInline: "auto" }}>
                Different businesses need different workflows. Our teams are trained
                to operate within your industry&apos;s specific communication patterns,
                tools, and expectations.
              </p>
            </div>
          </ScrollReveal>

          <div className="vex-grid vex-grid--3">
            {servedIndustries.map((ind, i) => (
              <ScrollReveal key={ind.name} delay={i * 60}>
                <div className="premium-card" style={{ textAlign: "center" }}>
                  <span style={{ fontSize: "2.5rem", display: "block", marginBottom: "var(--s-3)" }} role="img" aria-label={ind.name}>
                    {ind.icon}
                  </span>
                  <h3 className="vex-card__title">{ind.name}</h3>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="vex-section vex-section--cta" style={{ textAlign: "center" }} aria-label="Get in touch">
        <div className="vex-container" style={{ maxWidth: "720px" }}>
          <ScrollReveal>
            <p className="vex-description" style={{ marginBottom: "var(--s-4)" }}>
              Don&apos;t see your industry? We build custom support models for any
              service-led business.
            </p>
            <Link href="/contact" className="btn btn-primary">Talk to Us</Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
