"use client";

import { useState, type FormEvent } from "react";

export default function HireForm({
  vaName,
  vaRole,
  vaSlug,
}: {
  vaName: string;
  vaRole: string;
  vaSlug: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/hire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, vaName, vaRole, vaSlug }),
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
          Thank you for your interest in {vaName}.
        </h3>
        <p className="text-sm text-[var(--muted)]">
          We&apos;ll get back to you within 24 hours to arrange the next steps.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} method="post" action="/api/hire" className="flex flex-col gap-5">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-[var(--ink-soft)]">
          Full name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full rounded-lg border border-[var(--line)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--ink)] outline-none transition-colors focus:border-[var(--gold)]"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-[var(--ink-soft)]">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-lg border border-[var(--line)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--ink)] outline-none transition-colors focus:border-[var(--gold)]"
        />
      </div>

      <div>
        <label htmlFor="company" className="mb-1 block text-sm font-medium text-[var(--ink-soft)]">
          Company (optional)
        </label>
        <input
          id="company"
          name="company"
          type="text"
          className="w-full rounded-lg border border-[var(--line)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--ink)] outline-none transition-colors focus:border-[var(--gold)]"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-[var(--ink-soft)]">
          Anything we should know? (optional)
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full resize-none rounded-lg border border-[var(--line)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--ink)] outline-none transition-colors focus:border-[var(--gold)]"
        />
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
        {status === "sending" ? "Sending..." : `I'm Interested in Hiring ${vaName}`}
      </button>
    </form>
  );
}
