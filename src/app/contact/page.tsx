import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import ContactForm from "./ContactForm";
import { siteConfig } from "@/config";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch. Send an inquiry about remote staffing, customer support, or virtual assistant services.",
};

export default function ContactPage() {
  const { brand, contact } = siteConfig;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${brand.name}`,
    description: metadata.description,
    mainEntity: {
      "@type": "Organization",
      name: brand.name,
      telephone: contact.phone,
      email: contact.email,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="section-full section-full--half" aria-label="Contact hero">
        <div className="section-media">
          <img src="/contact-hero.png" alt="Team at work" />
        </div>
        <div className="section-content section-content--center">
          <p className="vex-eyebrow" style={{ color: "rgba(255,231,189,0.82)" }}>Contact</p>
          <h1 className="text-hero-video">
            Let&apos;s start a<br />conversation.
          </h1>
        </div>
      </section>

      {/* Form + Info */}
      <section className="vex-section" aria-label="Contact form">
        <div className="vex-container">
          <div className="vex-grid vex-grid--2">
            {/* Form card */}
            <ScrollReveal>
              <div className="premium-card">
                <h2 className="vex-heading" style={{ fontSize: "var(--text-card-title)" }}>
                  Send an inquiry
                </h2>
                <ContactForm />
              </div>
            </ScrollReveal>

            {/* Contact details card */}
            <ScrollReveal delay={150}>
              <div className="premium-card-dark premium-card" style={{ display: "flex", flexDirection: "column", gap: "var(--s-6)" }}>
                <div>
                  <p className="vex-eyebrow" style={{ color: "rgba(255,231,189,0.82)" }}>Email</p>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-lg no-underline"
                    style={{ color: "#fff6e6" }}
                  >
                    {contact.email}
                  </a>
                </div>

                <div>
                  <p className="vex-eyebrow" style={{ color: "rgba(255,231,189,0.82)" }}>Phone</p>
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    className="text-lg no-underline"
                    style={{ color: "#fff6e6" }}
                  >
                    {contact.phone}
                  </a>
                </div>

                {contact.whatsappLink && (
                  <div>
                    <p className="vex-eyebrow" style={{ color: "rgba(255,231,189,0.82)" }}>WhatsApp</p>
                    <a
                      href={contact.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg no-underline"
                      style={{ color: "#fff6e6" }}
                    >
                      Chat with us
                    </a>
                  </div>
                )}

                {contact.address && (
                  <div>
                    <p className="vex-eyebrow" style={{ color: "rgba(255,231,189,0.82)" }}>Office</p>
                    <p style={{ color: "rgba(255,248,239,0.74)" }}>
                      {contact.address}
                    </p>
                  </div>
                )}

                {contact.hours && (
                  <div>
                    <p className="vex-eyebrow" style={{ color: "rgba(255,231,189,0.82)" }}>Hours</p>
                    <p style={{ color: "rgba(255,248,239,0.74)" }}>
                      {contact.hours}
                    </p>
                    {contact.hoursContext && (
                      <p className="text-sm" style={{ color: "rgba(255,248,239,0.5)" }}>
                        {contact.hoursContext}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
