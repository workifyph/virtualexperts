import Link from "next/link";
import ScrollReveal from "../ScrollReveal";
import SectionHeader from "./SectionHeader";
import type { SectionVariant } from "./Section";
import type { StepItem } from "@/config/types";

export default function StepsGrid({
  eyebrow = "How It Works",
  heading = "Four steps to get started.",
  steps,
  variant = "tan",
  ctaLabel,
  ctaHref,
}: {
  eyebrow?: string;
  heading?: string;
  steps: StepItem[];
  variant?: SectionVariant;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  const variantClass = variant === "default" ? "" : `vex-section--${variant}`;

  return (
    <section className={`vex-section ${variantClass}`} aria-label={eyebrow}>
      <div className="vex-container">
        <SectionHeader eyebrow={eyebrow} heading={heading} />

        <div className="vex-grid vex-grid--4">
          {steps.map((step, i) => (
            <ScrollReveal key={step.step} delay={i * 120}>
              <div className="step-card">
                <div className="step-badge">{step.step}</div>
                <h3 className="step-card__title">{step.title}</h3>
                <p className="step-card__body">{step.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {ctaLabel && ctaHref && (
          <ScrollReveal>
            <div className="mt-8 text-center">
              <Link href={ctaHref} className="btn btn-tertiary">
                {ctaLabel}
              </Link>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
