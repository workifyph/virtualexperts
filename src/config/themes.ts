import type { Theme } from "./types";

/* ══════════════════════════════════════════════════════════════
   Theme Presets
   Swap these to change the entire visual identity.
   ══════════════════════════════════════════════════════════════ */

export const warmGold: Theme = {
  name: "warm-gold",
  colors: {
    bg: "#f7f1e8",
    paper: "#fffdf8",
    paperStrong: "#fff9f0",
    ink: "#12110f",
    inkSoft: "#2c2a27",
    muted: "#665f57",
    line: "#ddd2c4",
    accent: "#c79b44",
    accentDeep: "#8d6823",
    accentSoft: "rgba(199, 155, 68, 0.18)",
    sand: "#f0e5d5",
    tan: "#ead9bb",
    charcoal: "#171512",
    charcoalSoft: "#231f1a",
  },
  typography: {
    display: '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif',
    sans: '"Avenir Next", "Segoe UI", Helvetica, Arial, sans-serif',
  },
};

export const coolSlate: Theme = {
  name: "cool-slate",
  colors: {
    bg: "#f4f6f8",
    paper: "#ffffff",
    paperStrong: "#fafbfc",
    ink: "#1a1d23",
    inkSoft: "#2d3748",
    muted: "#64748b",
    line: "#e2e8f0",
    accent: "#3b82f6",
    accentDeep: "#1d4ed8",
    accentSoft: "rgba(59, 130, 246, 0.12)",
    sand: "#f1f5f9",
    tan: "#e2e8f0",
    charcoal: "#0f172a",
    charcoalSoft: "#1e293b",
  },
  typography: {
    display: '"Inter", "SF Pro Display", -apple-system, sans-serif',
    sans: '"Inter", "SF Pro Text", -apple-system, sans-serif',
  },
};

export const deepEmerald: Theme = {
  name: "deep-emerald",
  colors: {
    bg: "#f0f7f4",
    paper: "#fbfefc",
    paperStrong: "#f5faf7",
    ink: "#0f1a14",
    inkSoft: "#1c3829",
    muted: "#4a6d5c",
    line: "#c8ddd2",
    accent: "#10b981",
    accentDeep: "#047857",
    accentSoft: "rgba(16, 185, 129, 0.14)",
    sand: "#e6f4ed",
    tan: "#d1eae0",
    charcoal: "#0a1912",
    charcoalSoft: "#132a1f",
  },
  typography: {
    display: '"DM Serif Display", Georgia, serif',
    sans: '"DM Sans", "Segoe UI", Helvetica, Arial, sans-serif',
  },
};

export const luxeNoir: Theme = {
  name: "luxe-noir",
  colors: {
    bg: "#faf9f7",
    paper: "#ffffff",
    paperStrong: "#fefefe",
    ink: "#0a0a0a",
    inkSoft: "#1c1c1c",
    muted: "#6b6b6b",
    line: "#e5e5e5",
    accent: "#9333ea",
    accentDeep: "#6b21a8",
    accentSoft: "rgba(147, 51, 234, 0.1)",
    sand: "#f5f3ff",
    tan: "#ede9fe",
    charcoal: "#09090b",
    charcoalSoft: "#18181b",
  },
  typography: {
    display: '"Playfair Display", "Times New Roman", serif',
    sans: '"Plus Jakarta Sans", "Segoe UI", Helvetica, Arial, sans-serif',
  },
};

export const themes = { warmGold, coolSlate, deepEmerald, luxeNoir } as const;
