import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { VideoSection } from "@/components/sections";
import { siteConfig } from "@/config";
import { services } from "@/content/siteData";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore our managed remote support services — customer support, virtual assistance, back-office operations, on-call VA support, and recruitment.",
};

export default function ServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    provider: { "@type": "Organization", name: siteConfig.brand.name },
    serviceType: services.map((s) => s.title),
    areaServed: "Worldwide",
    description: metadata.description,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <VideoSection src="/welcome-video.mp4" poster="/welcome-video-poster.jpg" halfHeight>
        <p className="vex-eyebrow" style={{ color: "rgba(255,231,189,0.82)" }}>Our Services</p>
        <h1 className="text-hero-video">
          Every role.<br />Every workflow.
        </h1>
      </VideoSection>

      {/* Services grid */}
      <section className="vex-section" aria-label="Service details">
        <div className="vex-container">
          <ScrollReveal>
            <div className="mb-8">
              <p className="vex-eyebrow">What We Offer</p>
              <h2 className="vex-heading">
                Managed support across<br />every business function.
              </h2>
              <p className="vex-description" style={{ maxWidth: "56ch" }}>
                From front-line customer calls to back-office coordination,
                our teams are structured, supervised, and built to scale with you.
              </p>
            </div>
          </ScrollReveal>

          <div className="vex-grid vex-grid--3">
            {services.map((svc, i) => (
              <ScrollReveal key={svc.slug} delay={i * 100}>
                <div className="vex-card" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                  <p className="vex-card__label">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="vex-card__title">{svc.title}</h3>
                  <p className="vex-card__body" style={{ flex: 1 }}>{svc.description}</p>
                  <div style={{ marginTop: "var(--s-4)" }}>
                    <Link href="/contact" className="btn btn-tertiary" style={{ fontSize: "0.85rem" }}>
                      Inquire
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Video break */}
      <VideoSection src="/video-02.mp4" poster="/video-02-poster.jpg">
        <p className="vex-eyebrow" style={{ color: "rgba(255,231,189,0.82)" }}>Our Approach</p>
        <h2 className="text-section-video mb-4">
          Structured teams.<br />Not solo freelancers.
        </h2>
        <p className="text-lg text-white/65 max-w-xl leading-relaxed">
          Every role comes with supervision, quality monitoring, and a backup
          system — so your business never depends on a single person.
        </p>
      </VideoSection>

      {/* CTA */}
      <section className="vex-section vex-section--cta" style={{ textAlign: "center" }} aria-label="Get started">
        <div className="vex-container" style={{ maxWidth: "720px" }}>
          <ScrollReveal>
            <h2 className="vex-heading">Need something specific?</h2>
            <p className="vex-description" style={{ marginBottom: "var(--s-6)" }}>
              Every engagement starts with a conversation. We&apos;ll design
              support around what your business actually needs.
            </p>
            <Link href="/contact" className="btn btn-primary">Start a Conversation</Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
