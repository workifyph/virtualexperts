import ScrollReveal from "../ScrollReveal";
import SectionHeader from "./SectionHeader";
import type { TestimonialItem } from "@/config/types";

export default function TestimonialGrid({
  eyebrow = "Client Stories",
  heading = "Trusted by businesses<br/>that need to scale.",
  testimonials,
  columns = 3,
}: {
  eyebrow?: string;
  heading?: string;
  testimonials: TestimonialItem[];
  columns?: 2 | 3;
}) {
  return (
    <section className="vex-section vex-section--light" aria-label={eyebrow}>
      <div className="vex-container">
        <SectionHeader eyebrow={eyebrow} heading={heading} />

        <div className={`vex-grid vex-grid--${columns}`}>
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 120}>
              <blockquote className="testimonial-card">
                <span className="quote-mark" aria-hidden="true">&ldquo;</span>
                <p className="testimonial-card__quote">{t.quote}</p>
                <footer>
                  <strong className="testimonial-card__name">{t.name}</strong>
                  <span className="testimonial-card__role">{t.role}</span>
                </footer>
              </blockquote>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
