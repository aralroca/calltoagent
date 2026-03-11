"use client";

import { useState } from "react";
import useAppTranslation from "@/hooks/useAppTranslation";
import { trackEvent } from "@/lib/analytics";

export default function NewsletterForm() {
  const { t } = useAppTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      if (res.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        trackEvent("sign_up", { method: "waitlist" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <p className="text-green-400 font-semibold text-sm mt-6">
        {t("finalCTA.waitlistSuccess")}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <label className="sr-only" htmlFor="waitlist-name">Name</label>
        <input
          id="waitlist-name"
          type="text"
          required
          minLength={2}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("finalCTA.waitlistNamePlaceholder")}
          className="w-full sm:w-40 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <label className="sr-only" htmlFor="waitlist-email">Email</label>
        <input
          id="waitlist-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("finalCTA.waitlistPlaceholder")}
          className="w-full sm:flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-6 py-3 rounded-lg bg-accent text-white font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 whitespace-nowrap"
        >
          {status === "loading" ? "..." : t("finalCTA.waitlistSubmit")}
        </button>
      </div>
      {status === "error" && (
        <p className="text-red-400 text-sm text-center">
          {t("finalCTA.waitlistError")}
        </p>
      )}
    </form>
  );
}
