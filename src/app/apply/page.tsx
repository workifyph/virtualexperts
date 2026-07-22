import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import ApplyForm from "./ApplyForm";

export const metadata: Metadata = {
  title: "Apply as a VA",
  description:
    "Join the Virtual Experts Philippines talent pool. Apply as a virtual assistant and work with US clients from home.",
};

const PERKS = [
  { title: "US clients, real careers", body: "Long-term placements with established businesses — not gig work." },
  { title: "Structured support", body: "Training, QA, and a team behind you from day one." },
  { title: "Work from home", body: "Full-time remote roles aligned with US business hours." },
];

export default function ApplyPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-premium vex-section" aria-label="Apply hero">
        <div className="vex-container" style={{ textAlign: "center" }}>
          <ScrollReveal>
            <p className="vex-eyebrow">Careers</p>
            <h1 className="vex-heading" style={{ fontSize: "var(--text-hero)" }}>
              Become a Virtual Expert.
            </h1>
            <p className="vex-description" style={{ maxWidth: "52ch", marginInline: "auto" }}>
              We&apos;re always looking for skilled, reliable virtual assistants to
              join our talent pool. Tell us what you do best.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Perks + form */}
      <section className="vex-section" aria-label="Application">
        <div className="vex-container" style={{ maxWidth: "960px" }}>
          <div className="vex-grid vex-grid--2" style={{ alignItems: "start" }}>
            <ScrollReveal>
              <div className="talent-facts" style={{ gap: "var(--s-6)" }}>
                {PERKS.map((perk) => (
                  <div key={perk.title} className="faq-card">
                    <h3 className="vex-heading" style={{ fontSize: "1.1rem", marginBottom: "var(--s-2)" }}>
                      {perk.title}
                    </h3>
                    <p className="vex-description">{perk.body}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={120}>
              <div className="faq-card">
                <h2 className="vex-heading" style={{ fontSize: "1.4rem", marginBottom: "var(--s-2)" }}>
                  Apply now
                </h2>
                <p className="vex-description" style={{ marginBottom: "var(--s-5)" }}>
                  Fill in the form and our recruitment team will get back to you.
                </p>
                <ApplyForm />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
