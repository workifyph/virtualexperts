import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ScrollReveal from "@/components/ScrollReveal";
import { getTalentProfile, getTalentProfiles } from "@/lib/talent";
import HireForm from "../HireForm";
import { initials } from "../initials";

type Props = { params: Promise<{ slug: string }> };

const PLACEHOLDER_SLUG = "coming-soon";

export function generateStaticParams() {
  const profiles = getTalentProfiles();
  if (profiles.length === 0) return [{ slug: PLACEHOLDER_SLUG }];
  return profiles.map((profile) => ({ slug: profile.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const profile = getTalentProfile(slug);
  if (!profile) {
    if (slug === PLACEHOLDER_SLUG) return { title: "Talent coming soon" };
    return { title: "Profile not found" };
  }
  return {
    title: `${profile.name} — ${profile.role}`,
    description: profile.bio[0] ?? `${profile.name}, ${profile.role} at Virtual Experts Philippines.`,
  };
}

export default async function TalentProfilePage({ params }: Props) {
  const { slug } = await params;
  const profile = getTalentProfile(slug);

  if (!profile) {
    if (slug === PLACEHOLDER_SLUG) {
      return (
        <section className="vex-section vex-section--editorial" aria-label="Coming soon">
          <div className="vex-container vex-article" style={{ textAlign: "center" }}>
            <p className="vex-eyebrow">Hire a VA</p>
            <h1 className="vex-heading">Coming soon</h1>
            <p className="vex-description">
              We&apos;re preparing our first talent profiles. Check back shortly.
            </p>
            <Link href="/talent" className="btn btn-primary" style={{ marginTop: "var(--s-6)" }}>
              Back to Talent
            </Link>
          </div>
        </section>
      );
    }
    notFound();
  }

  return (
    <section className="vex-section vex-section--editorial" aria-label={profile.name}>
      <div className="vex-container" style={{ maxWidth: "960px" }}>
        <ScrollReveal>
          <p className="vex-eyebrow">Hire a VA</p>
        </ScrollReveal>

        <div className="vex-grid vex-grid--2" style={{ alignItems: "start" }}>
          {/* Portrait + facts */}
          <ScrollReveal>
            <div className="founder-card">
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
                {profile.available ? "Available" : "On Duty"}
              </span>
              <h1 className="founder-card__name" style={{ fontSize: "1.5rem" }}>
                {profile.name}
              </h1>
              <p className="founder-card__role">{profile.role}</p>

              <dl className="talent-facts">
                <div>
                  <dt>Specialization</dt>
                  <dd>{profile.specialization ?? profile.categoryTitle}</dd>
                </div>
                {profile.languages.length > 0 && (
                  <div>
                    <dt>Languages</dt>
                    <dd>{profile.languages.join(" · ")}</dd>
                  </div>
                )}
                {profile.experience && (
                  <div>
                    <dt>Experience</dt>
                    <dd>{profile.experience}</dd>
                  </div>
                )}
                {profile.location && (
                  <div>
                    <dt>Location</dt>
                    <dd>{profile.location}</dd>
                  </div>
                )}
                {profile.skills.length > 0 && (
                  <div>
                    <dt>Skills</dt>
                    <dd>
                      <div className="talent-pills" style={{ marginTop: "0.35rem" }}>
                        {profile.skills.map((skill) => (
                          <span key={skill} className="industry-pill" style={{ padding: "0.35rem 0.7rem" }}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </dd>
                  </div>
                )}
                {profile.tools.length > 0 && (
                  <div>
                    <dt>Tools</dt>
                    <dd>{profile.tools.join(" · ")}</dd>
                  </div>
                )}
              </dl>
            </div>
          </ScrollReveal>

          {/* Bio + hire form */}
          <ScrollReveal delay={120}>
            <div>
              {profile.bio.length > 0 && (
                <div style={{ marginBottom: "var(--s-8)" }}>
                  <h2 className="vex-heading" style={{ fontSize: "1.4rem", marginBottom: "var(--s-3)" }}>
                    About {profile.name.split(" ")[0]}
                  </h2>
                  {profile.bio.map((paragraph, i) => (
                    <p key={i} className="vex-description" style={{ marginBottom: "var(--s-3)" }}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}

              {profile.available ? (
                <div className="faq-card">
                  <h2 className="vex-heading" style={{ fontSize: "1.4rem", marginBottom: "var(--s-2)" }}>
                    Interested in hiring {profile.name.split(" ")[0]}?
                  </h2>
                  <p className="vex-description" style={{ marginBottom: "var(--s-5)" }}>
                    Leave your details and we&apos;ll reach out within 24 hours to
                    set up an introduction.
                  </p>
                  <HireForm vaName={profile.name} vaRole={profile.role} vaSlug={profile.slug} />
                </div>
              ) : (
                <div className="faq-card" style={{ textAlign: "center" }}>
                  <h2 className="vex-heading" style={{ fontSize: "1.4rem", marginBottom: "var(--s-2)" }}>
                    {profile.name.split(" ")[0]} is currently placed with a client.
                  </h2>
                  <p className="vex-description" style={{ marginBottom: "var(--s-5)" }}>
                    We have other great VAs with similar skills — tell us what you
                    need and we&apos;ll recommend a match.
                  </p>
                  <Link href="/contact" className="btn btn-primary">Contact Us</Link>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <nav className="article-nav" aria-label="Talent navigation">
            <Link href="/talent" className="btn btn-ghost">
              ← Back to all talent
            </Link>
            <Link href="/contact" className="btn btn-primary">
              Talk to us
            </Link>
          </nav>
        </ScrollReveal>
      </div>
    </section>
  );
}
