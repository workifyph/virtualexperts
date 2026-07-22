interface Env {
  RESEND_API_KEY: string;
}

const NOTIFY_EMAIL = "contact@virtualexperts.ph";
const SITE_URL = "https://virtualexperts.ph";
const RATE_LIMIT_WINDOW = 60_000;
const MAX_REQUESTS = 5;
const requestCounts = new Map<string, { count: number; resetAt: number }>();

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  // Rate limiting
  const ip =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  const now = Date.now();
  const entry = requestCounts.get(ip);

  if (entry && now < entry.resetAt) {
    if (entry.count >= MAX_REQUESTS) {
      return Response.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }
    entry.count++;
  } else {
    requestCounts.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
  }

  try {
    const { name, email, company, message, vaName, vaRole, vaSlug } =
      await request.json<{
        name?: string;
        email?: string;
        company?: string;
        message?: string;
        vaName?: string;
        vaRole?: string;
        vaSlug?: string;
      }>();

    if (!name || !email || !vaName) {
      return Response.json(
        { error: "Name and email are required." },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: "Invalid email address." },
        { status: 400 },
      );
    }

    const profileUrl = vaSlug
      ? `${SITE_URL}/talent/${encodeURIComponent(vaSlug)}`
      : null;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "VEX Website <inquiries@virtualexperts.ph>",
        to: [NOTIFY_EMAIL],
        reply_to: email,
        subject: `Hire request: ${vaName} — from ${name}${company ? ` (${company})` : ""}`,
        html: `
          <h2>New Hire Request from the Talent Page</h2>
          <h3>Requested VA</h3>
          <p><strong>Name:</strong> ${escapeHtml(vaName)}</p>
          ${vaRole ? `<p><strong>Role:</strong> ${escapeHtml(vaRole)}</p>` : ""}
          ${profileUrl ? `<p><strong>Profile:</strong> <a href="${profileUrl}">${profileUrl}</a></p>` : ""}
          <hr />
          <h3>Client Details</h3>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          ${company ? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>` : ""}
          ${
            message
              ? `<hr /><p><strong>Message:</strong></p><p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>`
              : ""
          }
        `,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend error:", err);
      return Response.json(
        { error: "Failed to send request. Please try again." },
        { status: 500 },
      );
    }

    return Response.json({ success: true });
  } catch {
    return Response.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
