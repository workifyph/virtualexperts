import ScrollReveal from "../ScrollReveal";
import SectionHeader from "./SectionHeader";
import type { TeamMember } from "@/config/types";

export default function TeamGrid({
  eyebrow = "Leadership",
  heading = "The people behind the work.",
  members,
}: {
  eyebrow?: string;
  heading?: string;
  members: TeamMember[];
}) {
  return (
    <section className="vex-section" aria-label={eyebrow}>
      <div className="vex-container">
        <SectionHeader eyebrow={eyebrow} heading={heading} />

        <div className="vex-grid vex-grid--2" style={{ maxWidth: "44rem" }}>
          {members.map((member, i) => (
            <ScrollReveal key={member.name} delay={i * 120}>
              <div className="founder-card">
                <div className="founder-card__portrait">
                  <img src={member.image} alt={member.name} />
                </div>
                <h3 className="founder-card__name">{member.name}</h3>
                <p className="founder-card__role">{member.role}</p>
                <p className="founder-card__body">{member.bio}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
