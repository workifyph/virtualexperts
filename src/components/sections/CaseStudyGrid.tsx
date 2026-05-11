import ScrollReveal from "../ScrollReveal";
import SectionHeader from "./SectionHeader";
import type { CaseStudyItem } from "@/config/types";

export default function CaseStudyGrid({
  eyebrow = "Case Studies",
  heading = "Real results, real businesses.",
  caseStudies,
}: {
  eyebrow?: string;
  heading?: string;
  caseStudies: CaseStudyItem[];
}) {
  return (
    <section className="vex-section" aria-label={eyebrow}>
      <div className="vex-container">
        <SectionHeader eyebrow={eyebrow} heading={heading} />

        <div className="vex-grid vex-grid--3">
          {caseStudies.map((cs, i) => (
            <ScrollReveal key={cs.slug} delay={i * 120}>
              <article className="case-card">
                <p className="case-card__industry">{cs.industry}</p>
                <h3 className="case-card__title">{cs.title}</h3>
                <dl>
                  <dt>Challenge</dt>
                  <dd>{cs.challenge}</dd>
                  <dt>Approach</dt>
                  <dd>{cs.approach}</dd>
                  <dt>Outcome</dt>
                  <dd>{cs.outcome}</dd>
                </dl>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
