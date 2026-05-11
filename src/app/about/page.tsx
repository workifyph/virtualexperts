import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import { VideoSection } from "@/components/sections";
import { siteConfig } from "@/config";
import { teamMembers, corePrinciples, whyFilipino } from "@/content/siteData";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about our founder-led outsourcing company delivering managed remote teams since 2017.",
};

export default function AboutPage() {
  const { brand } = siteConfig;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `About ${brand.name}`,
    description: metadata.description,
    mainEntity: {
      "@type": "Organization",
      name: brand.name,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="section-full section-full--half" aria-label="About hero">
        <div className="section-media">
          <img src="/about-hero.png" alt="Team in office meeting" style={{ filter: "brightness(0.7) blur(1px)" }} />
        </div>
        <div className="section-content section-content--center">
          <p className="vex-eyebrow">About {brand.shortName}</p>
          <h1 className="text-hero-video">
            Built on trust.<br />Driven by results.
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="vex-section" aria-label="Our story">
        <div className="vex-container">
          <ScrollReveal>
            <p className="vex-eyebrow">Since 2017</p>
            <h2 className="vex-heading" style={{ maxWidth: "28ch" }}>
              A founder-led company with a long-term view.
            </h2>
            <p className="vex-description" style={{ maxWidth: "64ch", marginBottom: "var(--s-4)" }}>
              Virtual Experts Philippines was founded with a simple premise: service-led businesses deserve
              remote support that&apos;s structured, supervised, and built to last.
            </p>
            <p className="vex-description" style={{ maxWidth: "64ch" }}>
              Today we operate a 400-person talent pool combining onsite and remote delivery
              to support teams across 13+ industries — from dental clinics to real estate,
              property management to e-commerce.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Team */}
      <section className="vex-section" style={{ background: "var(--bg)" }} aria-label="Leadership">
        <div className="vex-container" style={{ textAlign: "center" }}>
          <ScrollReveal>
            <p className="vex-eyebrow">Leadership</p>
            <h2 className="vex-heading" style={{ maxWidth: "32ch", marginInline: "auto" }}>
              Meet the people behind the company.
            </h2>
          </ScrollReveal>

          <div className="vex-grid vex-grid--2" style={{ marginTop: "var(--s-8)" }}>
            {teamMembers.map((f, i) => (
              <ScrollReveal key={f.name} delay={i * 150}>
                <div className="founder-card">
                  <div className="founder-card__portrait">
                    <img src={f.image} alt={f.name} loading="lazy" />
                  </div>
                  <h3 className="founder-card__name">{f.name}</h3>
                  <p className="founder-card__role">{f.role}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="vex-section" aria-label="Core principles">
        <div className="vex-container">
          <ScrollReveal>
            <p className="vex-eyebrow">Our Principles</p>
            <h2 className="vex-heading">What guides us every day.</h2>
          </ScrollReveal>

          <div className="vex-grid vex-grid--4">
            {corePrinciples.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 100}>
                <div className="vex-card">
                  <h3 className="vex-card__title">{p.title}</h3>
                  <p className="vex-card__body">{p.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Filipino */}
      <VideoSection src="/video-02.mp4" poster="/video-02-poster.jpg">
        <p className="vex-eyebrow">
          Why the Philippines
        </p>
        <h2 className="text-section-video mb-10">
          World-class talent.<br />Philippine-made.
        </h2>
        <div className="vex-grid vex-grid--2" style={{ maxWidth: "48rem", width: "100%" }}>
          {whyFilipino.map((w) => (
            <div key={w.title} className="service-panel">
              <h3 className="service-panel__title">{w.title}</h3>
              <p className="service-panel__body">{w.body}</p>
            </div>
          ))}
        </div>
      </VideoSection>

      {/* CTA */}
      <section className="vex-section vex-section--cta" style={{ textAlign: "center" }} aria-label="Get started">
        <div className="vex-container" style={{ maxWidth: "720px" }}>
          <ScrollReveal>
            <h2 className="vex-heading">Let&apos;s work together.</h2>
            <p className="vex-description" style={{ marginBottom: "var(--s-6)" }}>
              Tell us about your business and we&apos;ll design the support model that fits.
            </p>
            <Link href="/contact" className="btn btn-primary">Get Started</Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
