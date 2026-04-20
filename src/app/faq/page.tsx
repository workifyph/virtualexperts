import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import FaqAccordion from "./FaqAccordion";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about Virtual Experts Philippines — pricing, onboarding, team structure, and more.",
};

const faqs = [
  {
    question: "How does pricing work?",
    answer:
      "Pricing depends on the role, coverage hours, and scope of work. We offer full-time, part-time, and on-call options. After an initial consultation we provide a transparent quote with no hidden fees.",
  },
  {
    question: "How quickly can you get a team member started?",
    answer:
      "Most placements are onboarded within 5 to 10 business days. This includes talent matching, client approval, and a supervised onboarding period to align tools and workflows.",
  },
  {
    question: "What time zones do you cover?",
    answer:
      "Our team operates primarily during US business hours (9 AM to 9 PM Eastern), which corresponds to 9 PM to 9 AM Philippine Time. We can also arrange coverage for other time zones on request.",
  },
  {
    question: "Do I manage the team directly?",
    answer:
      "You can, but you do not have to. VEX provides supervision, quality monitoring, and daily accountability. You set the priorities and we handle day-to-day execution and oversight.",
  },
  {
    question: "What happens if a team member leaves or underperforms?",
    answer:
      "We handle replacement and transition at no additional cost. Our structured model means processes are documented, so a new team member can ramp up quickly without disrupting your operations.",
  },
  {
    question: "Is there a minimum contract length?",
    answer:
      "We recommend a minimum of three months to see meaningful results, but we do not lock clients into long-term contracts. Month-to-month arrangements are available after the initial period.",
  },
  {
    question: "What tools and platforms does your team use?",
    answer:
      "Our team adapts to your existing tools — whether that is Salesforce, HubSpot, Zendesk, Slack, Microsoft Teams, Google Workspace, or any other platform. We also help set up workflows if needed.",
  },
  {
    question: "How do I get started?",
    answer:
      "Start by reaching out through our contact page or WhatsApp. We will schedule a short consultation to understand your needs, then match you with the right talent and begin onboarding.",
  },
];

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
              Everything you need to know about working with Virtual Experts Philippines.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Accordion */}
      <section className="vex-section" aria-label="Frequently asked questions">
        <div className="vex-container" style={{ maxWidth: "780px" }}>
          <ScrollReveal>
            <FaqAccordion items={faqs} />
          </ScrollReveal>
        </div>
      </section>

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
