import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import { FaqSection } from "@/components/sections";
import { faqs } from "@/content/siteData";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions — pricing, onboarding, team structure, and more.",
};

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="hero-premium vex-section" aria-label="FAQ hero">
        <div className="vex-container" style={{ textAlign: "center" }}>
          <ScrollReveal>
            <p className="vex-eyebrow">FAQ</p>
            <h1 className="vex-heading" style={{ fontSize: "var(--text-hero)" }}>
              Common questions, clear answers.
            </h1>
            <p className="vex-description" style={{ maxWidth: "52ch", marginInline: "auto" }}>
              Everything you need to know about working with us.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ Accordion */}
      <FaqSection faqs={faqs} eyebrow="" heading="" />

      {/* CTA */}
      <section className="vex-section vex-section--cta" style={{ textAlign: "center" }} aria-label="Still have questions">
        <div className="vex-container" style={{ maxWidth: "720px" }}>
          <ScrollReveal>
            <h2 className="vex-heading">Still have questions?</h2>
            <p className="vex-description" style={{ marginBottom: "var(--s-6)" }}>
              Reach out and we&apos;ll get back to you within 24 hours.
            </p>
            <Link href="/contact" className="btn btn-primary">Contact Us</Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
