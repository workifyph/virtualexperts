import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { VideoSection } from "@/components/sections";
import { getCaseStudies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "See how our remote teams have helped businesses improve operations and reduce missed opportunities.",
};

export default function CaseStudiesPage() {
  const cases = getCaseStudies();

  return (
    <>
      {/* Hero */}
      <VideoSection src="/welcome-video.mp4" poster="/welcome-video-poster.jpg" halfHeight>
        <p className="vex-eyebrow" style={{ color: "rgba(255,231,189,0.82)" }}>Case Studies</p>
        <h1 className="text-hero-video">
          From bottlenecks to scale —<br />real client results.
        </h1>
        <p className="max-w-xl text-lg text-white/75 mt-6 leading-relaxed">
          See how businesses streamline operations and grow with dedicated remote teams.
        </p>
      </VideoSection>

      {/* Cases */}
      <section className="vex-section" aria-label="Case study details">
        <div className="vex-container">
          {cases.length > 0 ? (
            <div className={`editorial-grid${cases.length === 1 ? " editorial-grid--single" : ""}`}>
              {cases.map((cs, i) => {
                const initial = cs.title.charAt(0).toUpperCase();
                return (
                  <ScrollReveal key={cs.slug} delay={i * 120}>
                    <Link
                      href={`/case-studies/${cs.slug}`}
                      className="editorial-card"
                      aria-label={cs.title}
                    >
                      <div className="editorial-card__media">
                        {cs.cover ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={cs.cover} alt={cs.coverAlt} loading="lazy" />
                        ) : (
                          <div className="editorial-card__media editorial-card__media--placeholder">
                            {initial}
                          </div>
                        )}
                      </div>
                      <div className="editorial-card__body">
                        <p className="case-card__industry">{cs.industry}</p>
                        <h2 className="editorial-card__title">{cs.title}</h2>
                        <p className="editorial-card__excerpt">{cs.excerpt}</p>
                      </div>
                    </Link>
                  </ScrollReveal>
                );
              })}
            </div>
          ) : (
            <ScrollReveal>
              <div
                className="editorial-card"
                style={{ maxWidth: 520, margin: "0 auto", padding: "var(--s-12) var(--s-6)", textAlign: "center" }}
              >
                <p className="case-card__industry">Coming soon</p>
                <h2 className="editorial-card__title" style={{ marginTop: "var(--s-3)" }}>
                  Client stories are on the way.
                </h2>
                <p className="editorial-card__excerpt" style={{ marginTop: "var(--s-3)" }}>
                  We&apos;re preparing real client case studies. Check back shortly.
                </p>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="vex-section vex-section--cta" style={{ textAlign: "center" }} aria-label="Get started">
        <div className="vex-container" style={{ maxWidth: "720px" }}>
          <ScrollReveal>
            <h2 className="vex-heading">Your business could be next.</h2>
            <p className="vex-description" style={{ marginBottom: "var(--s-6)" }}>
              Let&apos;s discuss what structured remote support looks like for your team.
            </p>
            <Link href="/contact" className="btn btn-primary">Start a Conversation</Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
