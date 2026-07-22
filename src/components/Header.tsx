"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config";

// Routes whose top of page is a dark video/photo hero. On these we keep the
// transparent header with white text until scroll. Everywhere else (blog,
// case study detail, faq, studio fallback) the header sits on a beige
// surface, so it always needs the opaque/dark-text treatment.
const DARK_HERO_ROUTES = new Set([
  "/",
  "/services",
  "/about",
  "/contact",
  "/how-it-works",
  "/industries",
  "/case-studies",
]);

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { brand, nav } = siteConfig;
  const onDarkHero = pathname ? DARK_HERO_ROUTES.has(pathname) : false;
  // When not on a dark hero, behave as if always scrolled (opaque bg + ink text).
  const opaque = scrolled || menuOpen || !onDarkHero;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        opaque
          ? "bg-[var(--bg)]/95 backdrop-blur-lg shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[var(--content-max)] items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center no-underline" onClick={() => setMenuOpen(false)}>
          <img
            src={opaque ? brand.logo : brand.logoLight}
            alt={brand.name}
            className="h-8 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 lg:flex">
          {nav.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide no-underline transition-colors duration-300 hover:text-[var(--gold)] ${
                  isActive
                    ? "text-[var(--gold)] font-semibold"
                    : opaque ? "text-[var(--ink-soft)]" : "text-white/90"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link href="/contact" className="btn btn-primary text-xs">
            Get Started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden ${
            opaque ? "text-[var(--ink)]" : "text-white"
          }`}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span
            className={`block h-0.5 w-6 rounded transition-all duration-300 ${
              menuOpen
                ? "translate-y-[4px] rotate-45 bg-[var(--ink)]"
                : opaque
                ? "bg-[var(--ink)]"
                : "bg-white"
            }`}
          />
          <span
            className={`block h-0.5 w-6 rounded transition-all duration-300 ${
              menuOpen
                ? "-translate-y-[4px] -rotate-45 bg-[var(--ink)]"
                : opaque
                ? "bg-[var(--ink)]"
                : "bg-white"
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 top-0 bg-[var(--bg)] transition-all duration-500 lg:hidden ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-full flex-col items-center justify-center gap-8">
          {nav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-serif text-2xl text-[var(--ink)] no-underline transition-colors hover:text-[var(--gold)]"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="btn btn-primary mt-4"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
