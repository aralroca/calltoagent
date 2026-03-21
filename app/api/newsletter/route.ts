import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.NEWSLETTER_FROM_EMAIL || "delivered@resend.dev";
    const audienceId = process.env.RESEND_AUDIENCE_ID;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Newsletter service not configured" },
        { status: 503 }
      );
    }

    const resend = new Resend(apiKey);

    // 1. Send notification to the team
    await resend.emails.send({
      from: fromEmail,
      to: fromEmail,
      subject: `New Waitlist Signup: ${name || email}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.5; color: #333; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #4f46e5; margin-top: 0;">New subscriber joined the waitlist!</h2>
          <p><strong>Name:</strong> ${name || "N/A"}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #666; margin-bottom: 0;">This notification was sent automatically from CallToAgent Landing.</p>
        </div>
      `,
    });

    // 2. Send welcome email to the subscriber
    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: "Welcome to the CallToAgent Waitlist! 🚀",
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 12px;">
          <h1 style="color: #4f46e5; margin-bottom: 24px;">Welcome on board!</h1>
          <p>Hi ${name || "there"},</p>
          <p>Thanks for joining the <strong>CallToAgent</strong> waiting list! We're excited to have you with us.</p>
          <p>You're now among the first who will get early access to our AI voice infrastructure. We're working hard to help businesses like yours stop missing calls and start resolving them instantly.</p>
          <p>We'll be in touch soon with updates and exclusive early access.</p>
          <p style="margin-top: 32px;">Best regards,<br />The CallToAgent Team</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 32px 0;" />
          <p style="font-size: 12px; color: #666; text-align: center;">
            © 2026 CallToAgent. Any business tools, integrated.
          </p>
        </div>
      `,
    });

    // 3. Optional: Add to Resend Audience if configured
    if (audienceId) {
      try {
        await resend.contacts.create({
          email,
          firstName: name ?? "",
          audienceId,
        });
      } catch (e) {
        console.error("Error adding to audience:", e);
        // We don't fail the whole request if this fails, as emails were sent
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter API Error:", error);
    return NextResponse.json(
      { error: "Failed to process subscription" },
      { status: 500 }
    );
  }
}
