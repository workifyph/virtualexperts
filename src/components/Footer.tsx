import Link from "next/link";
import { navLinks, socialLinks, businessProfile } from "@/content/siteData";

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-charcoal)] text-white/70">
      <div className="mx-auto max-w-[var(--content-max)] px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <img src="/vex_logo.png" alt={businessProfile.legalName} className="mb-4 h-10 w-auto" />
            <p className="text-sm leading-relaxed text-white/50">
              {businessProfile.description}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--gold)]">
              Navigate
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
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
                <a href={`mailto:${businessProfile.primaryEmail}`} className="text-white/60 no-underline hover:text-white">
                  {businessProfile.primaryEmail}
                </a>
              </li>
              <li>
                <a href={`tel:${businessProfile.primaryPhone.replace(/\s/g, "")}`} className="text-white/60 no-underline hover:text-white">
                  {businessProfile.primaryPhone}
                </a>
              </li>
              <li>
                <a href={businessProfile.whatsappLink} target="_blank" rel="noopener noreferrer" className="text-white/60 no-underline hover:text-white">
                  WhatsApp
                </a>
              </li>
              <li className="text-white/40">{businessProfile.officeAddress}</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--gold)]">
              Follow Us
            </h4>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
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
            &copy; {new Date().getFullYear()} {businessProfile.legalName}. All rights reserved.
          </p>
          <p className="text-xs text-white/30">
            {businessProfile.officeHours} &middot; {businessProfile.officeHoursContext}
          </p>
        </div>
      </div>
    </footer>
  );
}
