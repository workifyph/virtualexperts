"use client";

import { useState, type FormEvent } from "react";

const inputClass =
  "w-full rounded-lg border border-[var(--line)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--ink)] outline-none transition-colors focus:border-[var(--gold)]";

export default function ApplyForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to send");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="text-center py-12">
        <h3 className="font-serif text-xl text-[var(--ink)] mb-2">
          Application received — thank you!
        </h3>
        <p className="text-sm text-[var(--muted)]">
          Our recruitment team will review your application and reach out if
          there&apos;s a fit.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} method="post" action="/api/apply" className="flex flex-col gap-5">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-[var(--ink-soft)]">
          Full name
        </label>
        <input id="name" name="name" type="text" required className={inputClass} />
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-[var(--ink-soft)]">
          Email address
        </label>
        <input id="email" name="email" type="email" required className={inputClass} />
      </div>

      <div>
        <label htmlFor="phone" className="mb-1 block text-sm font-medium text-[var(--ink-soft)]">
          Phone / WhatsApp (optional)
        </label>
        <input id="phone" name="phone" type="tel" className={inputClass} />
      </div>

      <div>
        <label htmlFor="role" className="mb-1 block text-sm font-medium text-[var(--ink-soft)]">
          Role you&apos;re applying for
        </label>
        <input
          id="role"
          name="role"
          type="text"
          required
          placeholder="e.g. Executive VA, Customer Support, Bookkeeping"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="experience" className="mb-1 block text-sm font-medium text-[var(--ink-soft)]">
          Years of experience (optional)
        </label>
        <input id="experience" name="experience" type="text" className={inputClass} />
      </div>

      <div>
        <label htmlFor="resumeLink" className="mb-1 block text-sm font-medium text-[var(--ink-soft)]">
          Resume / portfolio link (optional)
        </label>
        <input
          id="resumeLink"
          name="resumeLink"
          type="url"
          placeholder="Google Drive, LinkedIn, or portfolio URL"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-[var(--ink-soft)]">
          Tell us about yourself (optional)
        </label>
        <textarea id="message" name="message" rows={4} className={`${inputClass} resize-none`} />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">
          Something went wrong. Please try again or email us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn btn-primary w-full disabled:opacity-50"
      >
        {status === "sending" ? "Sending..." : "Submit Application"}
      </button>
    </form>
  );
}
