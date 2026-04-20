"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { navLinks, businessProfile } from "@/content/siteData";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
        scrolled || menuOpen
          ? "bg-[var(--bg)]/95 backdrop-blur-lg shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[var(--content-max)] items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 no-underline" onClick={() => setMenuOpen(false)}>
          <img
            src="/vex_logo.png"
            alt={businessProfile.legalName}
            className="h-9 w-auto"
          />
          <span
            className={`text-sm font-semibold tracking-wide transition-colors duration-500 ${
              scrolled || menuOpen ? "text-[var(--ink)]" : "text-white"
            }`}
          >
            {businessProfile.shortName}
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium tracking-wide no-underline transition-colors duration-300 hover:text-[var(--gold)] ${
                scrolled ? "text-[var(--ink-soft)]" : "text-white/90"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="btn btn-primary text-xs">
            Get Started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden ${
            scrolled || menuOpen ? "text-[var(--ink)]" : "text-white"
          }`}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span
            className={`block h-0.5 w-6 rounded transition-all duration-300 ${
              menuOpen
                ? "translate-y-[4px] rotate-45 bg-[var(--ink)]"
                : scrolled
                ? "bg-[var(--ink)]"
                : "bg-white"
            }`}
          />
          <span
            className={`block h-0.5 w-6 rounded transition-all duration-300 ${
              menuOpen
                ? "-translate-y-[4px] -rotate-45 bg-[var(--ink)]"
                : scrolled
                ? "bg-[var(--ink)]"
                : "bg-white"
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 top-0 bg-[var(--bg)] transition-all duration-500 md:hidden ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-full flex-col items-center justify-center gap-8">
          {navLinks.map((link) => (
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
