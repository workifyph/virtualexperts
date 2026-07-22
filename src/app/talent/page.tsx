import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { getTalentProfiles } from "@/lib/talent";
import { initials } from "./initials";

export const metadata: Metadata = {
  title: "Hire a VA",
  description:
    "Meet the virtual assistants of Virtual Experts Philippines who are ready to join your team today.",
};

export default function TalentPage() {
  const profiles = getTalentProfiles();

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

      {/* Profiles */}
      <section className="vex-section" aria-label="Available virtual assistants">
        <div className="vex-container">
          {profiles.length > 0 ? (
            <div className="vex-grid vex-grid--3">
              {profiles.map((profile, i) => (
                <ScrollReveal key={profile.slug} delay={i * 100}>
                  <div className="founder-card" style={{ height: "100%" }}>
                    <div className="founder-card__portrait">
                      {profile.photo ? (
                        <img src={profile.photo} alt={profile.name} />
                      ) : (
                        <div className="talent-portrait-fallback" aria-hidden>
                          {initials(profile.name)}
                        </div>
                      )}
                    </div>
                    <span
                      className={`talent-badge ${profile.available ? "" : "talent-badge--unavailable"}`}
                      style={{ marginBottom: "var(--s-2)" }}
                    >
                      {profile.available ? "Available" : "Currently Placed"}
                    </span>
                    <h3 className="founder-card__name">{profile.name}</h3>
                    <p className="founder-card__role">{profile.role}</p>
                    {profile.skills.length > 0 && (
                      <div className="talent-pills" style={{ marginBottom: "var(--s-3)" }}>
                        {profile.skills.slice(0, 4).map((skill) => (
                          <span key={skill} className="industry-pill" style={{ padding: "0.35rem 0.7rem" }}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                    <Link href={`/talent/${profile.slug}`} className="btn btn-secondary w-full">
                      View Profile
                    </Link>
                  </div>
                </ScrollReveal>
              ))}
            </div>
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
    </>
  );
}
