"use client";

import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-3)" }}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className="faq-card">
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                fontFamily: "var(--display)",
                fontSize: "var(--text-card-title)",
                fontWeight: 700,
                lineHeight: 1.25,
                color: "var(--ink)",
                padding: 0,
              }}
            >
              {item.question}
              <span
                style={{
                  flexShrink: 0,
                  display: "inline-grid",
                  placeItems: "center",
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "999px",
                  background: isOpen ? "var(--gold-soft)" : "transparent",
                  color: "var(--gold-deep)",
                  fontSize: "1.2rem",
                  fontWeight: 400,
                  transition: "transform 250ms ease, background 250ms ease",
                  transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                }}
              >
                +
              </span>
            </button>
            <div
              style={{
                display: "grid",
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                transition: "grid-template-rows 300ms ease",
              }}
            >
              <div style={{ overflow: "hidden" }}>
                <p
                  style={{
                    paddingTop: "var(--s-3)",
                    color: "var(--muted)",
                    fontSize: "var(--text-body)",
                    lineHeight: 1.65,
                  }}
                >
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
