import ScrollReveal from "../ScrollReveal";
import SectionHeader from "./SectionHeader";
import type { IndustryItem } from "@/config/types";

export default function IndustryPills({
  eyebrow = "Industries",
  heading = "Support built for<br/>your industry.",
  industries,
}: {
  eyebrow?: string;
  heading?: string;
  industries: IndustryItem[];
}) {
  return (
    <section className="vex-section" aria-label={eyebrow}>
      <div className="vex-container">
        <SectionHeader eyebrow={eyebrow} heading={heading} />

        <div className="flex flex-wrap gap-3">
          {industries.map((ind, i) => (
            <ScrollReveal key={ind.name} delay={i * 40}>
              <span className="industry-pill">
                <span role="img" aria-label={ind.name}>{ind.icon}</span>
                {ind.name}
              </span>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
