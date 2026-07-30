import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { getTalentCategories, getTalentProfiles } from "@/lib/talent";
import TalentBrowser from "./TalentBrowser";

export const metadata: Metadata = {
  title: "Hire a VA",
  description:
    "Meet the virtual assistants of Virtual Experts Philippines who are ready to join your team today.",
};

export default function TalentPage() {
  const profiles = getTalentProfiles();
  const categories = getTalentCategories(profiles);

  return (
    <>
      {/* Hero */}
      <section className="hero-premium vex-section" aria-label="Talent hero">
        <div className="vex-container" style={{ textAlign: "center" }}>
          <ScrollReveal>
            <p className="vex-eyebrow">Hire a VA</p>
            <h1 className="vex-heading" style={{ fontSize: "var(--text-hero)" }}>
              Meet the experts ready to join your team.
            </h1>
            <p className="vex-description" style={{ maxWidth: "52ch", marginInline: "auto" }}>
              Vetted, trained, and ready to start. Browse our available virtual
              assistants and tell us who fits your business.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Talent pool — category menu + CV cards */}
      <section className="vex-section" aria-label="Talent pool">
        <div className="vex-container">
          {profiles.length > 0 ? (
            <ScrollReveal>
              <TalentBrowser profiles={profiles} categories={categories} />
            </ScrollReveal>
          ) : (
            <p className="vex-description" style={{ textAlign: "center" }}>
              New talent profiles are being prepared — check back soon, or{" "}
              <Link href="/contact">contact us</Link> and we&apos;ll match you with
              the right VA.
            </p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="vex-section vex-section--cta" style={{ textAlign: "center" }} aria-label="Not sure who to pick">
        <div className="vex-container" style={{ maxWidth: "720px" }}>
          <ScrollReveal>
            <h2 className="vex-heading">Not sure who&apos;s the right fit?</h2>
            <p className="vex-description" style={{ marginBottom: "var(--s-6)" }}>
              Tell us what you need and we&apos;ll recommend the best match from our
              team — or recruit one specifically for you.
            </p>
            <Link href="/contact" className="btn btn-primary">Contact Us</Link>
          </ScrollReveal>
        </div>
      </section>

      {/* VA recruitment */}
      <section className="vex-section vex-section--sand" style={{ textAlign: "center" }} aria-label="Apply as a VA">
        <div className="vex-container" style={{ maxWidth: "720px" }}>
          <ScrollReveal>
            <p className="vex-eyebrow">For Virtual Assistants</p>
            <h2 className="vex-heading">Want to see your profile here?</h2>
            <p className="vex-description" style={{ marginBottom: "var(--s-6)" }}>
              We&apos;re growing our talent pool. If you&apos;re a skilled VA looking
              for long-term work with US clients, we&apos;d love to meet you.
            </p>
            <Link href="/apply" className="btn btn-secondary">Apply as a VA</Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
