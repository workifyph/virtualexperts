import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { VideoSection } from "@/components/sections";
import { siteConfig } from "@/config";
import { howModelWorks } from "@/content/siteData";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Learn our process — from consultation and talent matching to structured onboarding and ongoing managed support.",
};

export default function HowItWorksPage() {
  const { contact } = siteConfig;

  return (
    <>
      {/* Hero */}
      <VideoSection src="/video-02.mp4" poster="/video-02-poster.jpg" halfHeight>
        <p className="vex-eyebrow" style={{ color: "rgba(255,231,189,0.82)" }}>How It Works</p>
        <h1 className="text-hero-video">
          Simple process.<br />Reliable results.
        </h1>
      </VideoSection>

      {/* Steps */}
      <section className="vex-section" aria-label="Process steps">
        <div className="vex-container">
          <div className="vex-grid vex-grid--4">
            {howModelWorks.map((step, i) => (
              <ScrollReveal key={step.step} delay={i * 120}>
                <div className="step-card">
                  <div className="step-badge">{step.step}</div>
                  <h2 className="step-card__title">{step.title}</h2>
                  <p className="step-card__body">{step.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="vex-section vex-section--dark" style={{ textAlign: "center" }} aria-label="Get started">
        <div className="vex-container" style={{ maxWidth: "720px" }}>
          <ScrollReveal>
            <h2 className="vex-heading">Ready to get started?</h2>
            <p className="vex-description" style={{ marginBottom: "var(--s-6)" }}>
              The first step is a conversation. Tell us what you need and we&apos;ll
              take it from there.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="btn btn-primary">Send an Inquiry</Link>
              {contact.whatsappLink && (
                <a
                  href={contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-tertiary-dark"
                >
                  Chat on WhatsApp
                </a>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
