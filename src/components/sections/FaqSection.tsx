"use client";

import { useState } from "react";
import ScrollReveal from "../ScrollReveal";
import SectionHeader from "./SectionHeader";
import type { FaqItem } from "@/config/types";

function FaqAccordionItem({ item, isOpen, onToggle }: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="faq-card" style={{ marginBottom: "0.75rem" }}>
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "0.25rem 0",
          fontFamily: "var(--display)",
          fontSize: "1.1rem",
          fontWeight: 700,
          textAlign: "left",
          color: "var(--ink)",
        }}
      >
        {item.question}
        <span
          style={{
            transition: "transform 0.3s ease",
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
            fontSize: "1.4rem",
            color: "var(--accent, var(--gold))",
            flexShrink: 0,
            marginLeft: "1rem",
          }}
        >
          +
        </span>
      </button>
      <div
        style={{
          display: "grid",
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          opacity: isOpen ? 1 : 0,
          transition: "grid-template-rows 0.4s ease, opacity 0.3s ease",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <p style={{
            marginTop: "0.75rem",
            color: "var(--muted)",
            fontSize: "var(--text-body)",
            lineHeight: 1.7,
          }}>
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FaqSection({
  eyebrow = "FAQ",
  heading = "Frequently asked questions.",
  faqs,
}: {
  eyebrow?: string;
  heading?: string;
  faqs: FaqItem[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="vex-section" aria-label={eyebrow}>
      <div className="vex-container" style={{ maxWidth: "48rem" }}>
        <SectionHeader eyebrow={eyebrow} heading={heading} />

        {faqs.map((faq, i) => (
          <ScrollReveal key={i} delay={i * 60}>
            <FaqAccordionItem
              item={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
