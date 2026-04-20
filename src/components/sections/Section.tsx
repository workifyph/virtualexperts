import type { ReactNode } from "react";

export type SectionVariant = "default" | "light" | "dark" | "tan" | "cta" | "sand";

export default function Section({
  children,
  variant = "default",
  className = "",
  ariaLabel,
}: {
  children: ReactNode;
  variant?: SectionVariant;
  className?: string;
  ariaLabel?: string;
}) {
  const variantClass = variant === "default" ? "" : `vex-section--${variant}`;
  return (
    <section
      className={`vex-section ${variantClass} ${className}`.trim()}
      aria-label={ariaLabel}
    >
      <div className="vex-container">{children}</div>
    </section>
  );
}
