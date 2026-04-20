import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const MAX_REQUESTS = 5;
const requestCounts = new Map<string, { count: number; resetAt: number }>();

const NOTIFY_EMAIL = "contact@virtualexperts.ph";

export async function POST(req: NextRequest) {
  // Rate limiting
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const now = Date.now();
  const entry = requestCounts.get(ip);

  if (entry && now < entry.resetAt) {
    if (entry.count >= MAX_REQUESTS) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }
    entry.count++;
  } else {
    requestCounts.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
  }

  try {
    const body = await req.json();
    const { name, email, company, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: "VEX Website <inquiries@virtualexperts.ph>",
      to: [NOTIFY_EMAIL],
      replyTo: email,
      subject: `New Inquiry from ${name}${company ? ` (${company})` : ""}`,
      html: `
        <h2>New Website Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
        <hr />
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br />")}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send inquiry. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }
}
