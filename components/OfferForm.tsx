"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";

type Status = "idle" | "submitting" | "success" | "error";

export default function OfferForm() {
  const loadedAt = useRef(0);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  useEffect(function recordLoadTime() {
    loadedAt.current = Date.now();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const response = await fetch("/api/offer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, loadedAt: loadedAt.current }),
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) throw new Error(result.error || "We couldn’t send your offer. Please try again.");

      form.reset();
      setStatus("success");
      trackEvent("offer_submitted");
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "We couldn’t send your offer. Please try again.");
      setStatus("error");
    }
  }

  return (
    <form className="offer-form" onSubmit={handleSubmit}>
      <div className="field-row">
        <label>Name<input name="name" type="text" autoComplete="name" minLength={2} maxLength={80} required placeholder="Your name" /></label>
        <label>Work email<input name="email" type="email" autoComplete="email" maxLength={160} required placeholder="you@company.com" /></label>
      </div>
      <label>Offer (€)<div className="money-input"><span>€</span><input name="offer" type="number" inputMode="numeric" min="1" max="10000000" step="1" required placeholder="15,000" /></div></label>
      <label>Message <span className="optional">Optional</span><textarea name="message" rows={4} maxLength={1200} placeholder="Tell us briefly about your intended use." /></label>
      <label className="website-field" aria-hidden="true">Website<input name="website" type="text" tabIndex={-1} autoComplete="off" /></label>
      <button className="button button-submit" type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Submitting…" : "Submit offer"} <span aria-hidden="true">→</span></button>
      <p className="legal">Offers are non-binding until a transaction is formally agreed by both parties.</p>
      <div className="form-status" aria-live="polite">
        {status === "success" && <p className="success">Thank you. Your offer has been sent to the owner.</p>}
        {status === "error" && <p className="error">{error}</p>}
      </div>
    </form>
  );
}
