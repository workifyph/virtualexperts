"use client";

import { useEffect, useState } from "react";
import { isSanityConfigured } from "@/sanity/env";

// The Studio is a heavy client-only bundle. We mount it lazily on the client
// so that:
//   1. The static export's SSR shell doesn't try to evaluate the Sanity
//      config (which would fail when env vars are missing on a build host).
//   2. Build size of all other pages stays unaffected.
export const dynamic = "force-static";

const STUDIO_ENABLED =
  process.env.NEXT_PUBLIC_STUDIO_ENABLED === "true";

export default function StudioPage() {
  const [Studio, setStudio] = useState<React.ReactNode | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!STUDIO_ENABLED) {
      setError(
        "The CMS Studio is not available on this environment. Editors should use the dev environment at https://dev.virtualexperts.ph/studio."
      );
      return;
    }
    if (!isSanityConfigured) {
      setError(
        "Sanity is not configured. Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET, then redeploy."
      );
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const [{ NextStudio }, configMod] = await Promise.all([
          import("next-sanity/studio"),
          import("../../../sanity.config"),
        ]);
        if (cancelled) return;
        setStudio(<NextStudio config={configMod.default} />);
      } catch (err) {
        if (!cancelled) {
          console.error(err);
          setError("Studio failed to load. See console for details.");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <div style={{ padding: "var(--s-12)", maxWidth: 640, margin: "0 auto" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 600 }}>Studio unavailable</h1>
        <p style={{ marginTop: "var(--s-4)" }}>{error}</p>
      </div>
    );
  }

  if (!Studio) {
    return (
      <div style={{ padding: "var(--s-12)", textAlign: "center" }}>
        Loading Studio…
      </div>
    );
  }

  return Studio;
}
