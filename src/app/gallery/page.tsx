import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import GalleryCarousel from "@/components/sections/GalleryCarousel";
import { getGalleryAlbums } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Moments from Virtual Experts Philippines — company visits, team events, and community highlights.",
};

export default function GalleryPage() {
  const albums = getGalleryAlbums();

  return (
    <>
      {/* Hero */}
      <section className="hero-premium vex-section" aria-label="Gallery hero">
        <div className="vex-container" style={{ textAlign: "center" }}>
          <ScrollReveal>
            <p className="vex-eyebrow">Gallery</p>
            <h1 className="vex-heading" style={{ fontSize: "var(--text-hero)" }}>
              Moments that shape our story.
            </h1>
            <p className="vex-description" style={{ maxWidth: "52ch", marginInline: "auto" }}>
              Company visits, team celebrations, and the people behind the work.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Carousel */}
      <section className="vex-section" aria-label="Photo albums">
        <div className="vex-container" style={{ maxWidth: "960px" }}>
          <ScrollReveal>
            {albums.length > 0 ? (
              <GalleryCarousel albums={albums} />
            ) : (
              <p className="vex-description" style={{ textAlign: "center" }}>
                Photos are on the way — check back soon.
              </p>
            )}
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="vex-section vex-section--cta" style={{ textAlign: "center" }} aria-label="Work with us">
        <div className="vex-container" style={{ maxWidth: "720px" }}>
          <ScrollReveal>
            <h2 className="vex-heading">Want to be part of the story?</h2>
            <p className="vex-description" style={{ marginBottom: "var(--s-6)" }}>
              Let&apos;s talk about building your remote support team.
            </p>
            <Link href="/contact" className="btn btn-primary">Contact Us</Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
