"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { TalentCategory, TalentProfile } from "@/config/types";
import { initials } from "./initials";

/* ==================================================================
   Talent pool browser

   Category buttons on top, CV-style profile cards underneath. Runs on
   the client because the site is a static export — there is no server
   to re-query, so all profiles ship in the HTML and filtering is a
   local state change.
   ================================================================== */

const ALL = "all";

type Category = TalentCategory & { count: number };

export default function TalentBrowser({
  profiles,
  categories,
}: {
  profiles: TalentProfile[];
  categories: Category[];
}) {
  const [active, setActive] = useState<string>(ALL);

  const visible = useMemo(
    () => (active === ALL ? profiles : profiles.filter((p) => p.category === active)),
    [active, profiles],
  );

  const activeCategory = categories.find((category) => category.slug === active);

  return (
    <>
      {/* ── Category menu ── */}
      <div className="talent-cat-grid" role="group" aria-label="Filter talent by category">
        <button
          type="button"
          className="talent-cat-card"
          aria-pressed={active === ALL}
          onClick={() => setActive(ALL)}
        >
          <span className="talent-cat-card__icon" aria-hidden>
            👥
          </span>
          <span className="talent-cat-card__title">All Talent</span>
          <span className="talent-cat-card__tagline">
            Every vetted specialist in our pool, available and currently placed.
          </span>
          <span className="talent-cat-card__count">
            {profiles.length} {profiles.length === 1 ? "specialist" : "specialists"}
          </span>
        </button>

        {categories.map((category) => (
          <button
            key={category.slug}
            type="button"
            className="talent-cat-card"
            aria-pressed={active === category.slug}
            onClick={() => setActive(category.slug)}
          >
            <span className="talent-cat-card__icon" aria-hidden>
              {category.icon}
            </span>
            <span className="talent-cat-card__title">{category.title}</span>
            {category.tagline && (
              <span className="talent-cat-card__tagline">{category.tagline}</span>
            )}
            <span className="talent-cat-card__count">
              {category.count} {category.count === 1 ? "specialist" : "specialists"}
            </span>
          </button>
        ))}
      </div>

      {/* ── Profile grid ── */}
      <p className="talent-result-count" aria-live="polite">
        Showing {visible.length} of {profiles.length}
        {activeCategory ? ` — ${activeCategory.title}` : ""}
      </p>

      {/* key= restarts the card entrance animation on every switch */}
      <div className="cv-grid" key={active}>
        {visible.map((profile, i) => (
          <CvCard key={profile.slug} profile={profile} index={i} />
        ))}
      </div>
    </>
  );
}

function CvCard({ profile, index }: { profile: TalentProfile; index: number }) {
  const [firstName, ...rest] = profile.name.split(" ");
  const surname = rest.join(" ");

  return (
    <article className="cv-card" style={{ animationDelay: `${Math.min(index, 8) * 70}ms` }}>
      <header className="cv-card__header">
        <div className="cv-card__avatar">
          {profile.photo ? (
            <img src={profile.photo} alt={profile.name} loading="lazy" />
          ) : (
            <div className="cv-card__avatar-fallback" aria-hidden>
              {initials(profile.name)}
            </div>
          )}
        </div>
        <div className="cv-card__ident">
          <h3 className="cv-card__name">
            {firstName}
            {surname && <span className="cv-card__surname"> {surname}</span>}
          </h3>
          <span className="cv-card__spec">{profile.specialization ?? profile.categoryTitle}</span>
        </div>
      </header>

      <div className="cv-card__body">
        <CvRow label="Role" value={profile.role} />
        {profile.experience && <CvRow label="Experience" value={profile.experience} />}
        {profile.skills.length > 0 && (
          <CvRow
            label="Key Skills"
            value={
              <span className="cv-chips">
                {profile.skills.slice(0, 6).map((skill) => (
                  <span key={skill} className="cv-chip">
                    {skill}
                  </span>
                ))}
              </span>
            }
          />
        )}
        {profile.languages.length > 0 && (
          <CvRow label="Languages" value={profile.languages.join(" · ")} />
        )}
        {profile.tools.length > 0 && (
          <CvRow
            label="Tools"
            value={
              <span className="cv-chips">
                {profile.tools.slice(0, 6).map((tool) => (
                  <span key={tool} className="cv-chip cv-chip--tool">
                    {tool}
                  </span>
                ))}
              </span>
            }
          />
        )}
        {profile.location && <CvRow label="Based In" value={profile.location} />}
      </div>

      <footer className="cv-card__footer">
        <span
          className={`talent-badge ${profile.available ? "talent-badge--live" : "talent-badge--unavailable"}`}
        >
          {profile.available ? "Available" : "On Duty"}
        </span>
        <Link href={`/talent/${profile.slug}`} className="btn btn-secondary cv-card__cta">
          View CV
        </Link>
      </footer>
    </article>
  );
}

function CvRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="cv-row">
      <span className="cv-row__label">{label}</span>
      <span className="cv-row__value">{value}</span>
    </div>
  );
}
