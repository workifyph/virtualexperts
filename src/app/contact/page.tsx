import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import ContactForm from "./ContactForm";
import { businessProfile } from "@/content/siteData";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Virtual Experts Philippines. Send an inquiry about remote staffing, customer support, or virtual assistant services.",
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Virtual Experts Philippines",
    description: metadata.description,
    mainEntity: {
      "@type": "Organization",
      name: businessProfile.legalName,
      telephone: businessProfile.primaryPhone,
      email: businessProfile.primaryEmail,
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
          <img src="/contact-hero.png" alt="VEX team at work" />
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
                    href={`mailto:${businessProfile.primaryEmail}`}
                    className="text-lg no-underline"
                    style={{ color: "#fff6e6" }}
                  >
                    {businessProfile.primaryEmail}
                  </a>
                </div>

                <div>
                  <p className="vex-eyebrow" style={{ color: "rgba(255,231,189,0.82)" }}>Phone (US)</p>
                  <a
                    href={`tel:${businessProfile.primaryPhone.replace(/\s/g, "")}`}
                    className="text-lg no-underline"
                    style={{ color: "#fff6e6" }}
                  >
                    {businessProfile.primaryPhone}
                  </a>
                </div>

                <div>
                  <p className="vex-eyebrow" style={{ color: "rgba(255,231,189,0.82)" }}>WhatsApp</p>
                  <a
                    href={businessProfile.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg no-underline"
                    style={{ color: "#fff6e6" }}
                  >
                    {businessProfile.whatsappPhone}
                  </a>
                </div>

                <div>
                  <p className="vex-eyebrow" style={{ color: "rgba(255,231,189,0.82)" }}>Office</p>
                  <p style={{ color: "rgba(255,248,239,0.74)" }}>
                    {businessProfile.officeAddress}
                  </p>
                  <a
                    href={businessProfile.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-sm no-underline"
                    style={{ color: "var(--gold)" }}
                  >
                    View on Google Maps
                  </a>
                </div>

                <div>
                  <p className="vex-eyebrow" style={{ color: "rgba(255,231,189,0.82)" }}>Hours</p>
                  <p style={{ color: "rgba(255,248,239,0.74)" }}>
                    {businessProfile.officeHours}
                  </p>
                  <p className="text-sm" style={{ color: "rgba(255,248,239,0.5)" }}>
                    {businessProfile.officeHoursContext}
                  </p>
                </div>

                <div>
                  <p className="vex-eyebrow" style={{ color: "rgba(255,231,189,0.82)" }}>Response Time</p>
                  <p style={{ color: "rgba(255,248,239,0.74)" }}>
                    {businessProfile.expectedResponseTime}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
