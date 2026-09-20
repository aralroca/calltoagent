import { NextResponse } from "next/server";
import { Resend } from "resend";
import { formattedPrice, saleConfig } from "@/lib/sale-config";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type OfferPayload = {
  name?: unknown;
  email?: unknown;
  offer?: unknown;
  message?: unknown;
  website?: unknown;
  loadedAt?: unknown;
};

export async function POST(request: Request) {
  let payload: OfferPayload;

  try {
    payload = (await request.json()) as OfferPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (typeof payload.website === "string" && payload.website.length > 0) {
    return NextResponse.json({ success: true });
  }

  if (typeof payload.loadedAt !== "number" || payload.loadedAt <= 0 || Date.now() - payload.loadedAt < 1500) {
    return NextResponse.json({ error: "Please wait a moment and try again." }, { status: 400 });
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";
  const offer = Number(payload.offer);

  if (name.length < 2 || name.length > 80) return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  if (!emailPattern.test(email) || email.length > 160) return NextResponse.json({ error: "Please enter a valid work email." }, { status: 400 });
  if (!Number.isInteger(offer) || offer < 1 || offer > 10_000_000) return NextResponse.json({ error: "Please enter a valid offer amount." }, { status: 400 });
  if (message.length > 1200) return NextResponse.json({ error: "The message is too long." }, { status: 400 });

  const apiKey = process.env.RESEND_API_KEY;
  const destination = saleConfig.contactEmail;
  const from = `CallToAgent Offers <${saleConfig.contactEmail}>`;

  if (!apiKey) {
    console.error("Offer delivery is missing RESEND_API_KEY.");
    return NextResponse.json({ error: "Offer delivery is temporarily unavailable. Please try again later." }, { status: 503 });
  }

  const formattedOffer = new Intl.NumberFormat("en-IE", { style: "currency", currency: saleConfig.currency, maximumFractionDigits: 0 }).format(offer);
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: destination,
    replyTo: email,
    subject: `Offer for ${saleConfig.domain}: ${formattedOffer}`,
    text: [
      `New non-binding offer for ${saleConfig.domain}`,
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Offer: ${formattedOffer}`,
      `Current asking price: ${formattedPrice}`,
      `Message: ${message || "No message provided"}`,
    ].join("\n"),
  });

  if (error) {
    console.error("Resend offer delivery failed:", error.name);
    return NextResponse.json({ error: "We couldn’t send your offer. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
