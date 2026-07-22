import Link from "next/link";
import { siteConfig } from "@/config";

export default function Footer() {
  const { brand, nav, social, contact } = siteConfig;

  return (
    <footer className="bg-[var(--charcoal)] text-white/70">
      <div className="mx-auto max-w-[var(--content-max)] px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <img src={brand.logoLight} alt={brand.name} className="mb-4 h-6 w-auto" />
            <p className="text-sm leading-relaxed text-white/50">
              {brand.description}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--gold)]">
              Navigate
            </h4>
            <ul className="space-y-3">
              {nav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 no-underline transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--gold)]">
              Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={`mailto:${contact.email}`} className="text-white/60 no-underline hover:text-white">
                  {contact.email}
                </a>
              </li>
              <li>
                <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="text-white/60 no-underline hover:text-white">
                  {contact.phone}
                </a>
              </li>
              {contact.whatsappLink && (
                <li>
                  <a href={contact.whatsappLink} target="_blank" rel="noopener noreferrer" className="text-white/60 no-underline hover:text-white">
                    WhatsApp
                  </a>
                </li>
              )}
              {contact.address && (
                <li className="text-white/40">{contact.address}</li>
              )}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--gold)]">
              Follow Us
            </h4>
            <ul className="space-y-3">
              {social.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/60 no-underline transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
          {contact.hours && (
            <p className="text-xs text-white/30">
              {contact.hours} {contact.hoursContext && <>&middot; {contact.hoursContext}</>}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
