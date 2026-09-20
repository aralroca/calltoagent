"use client";

import { trackEvent } from "@/lib/analytics";

export default function BuyButton({ escrowUrl }: { escrowUrl: string }) {
  function handleClick() {
    trackEvent("buy_securely_click");

    if (escrowUrl) {
      window.open(escrowUrl, "_blank", "noopener,noreferrer");
      return;
    }

    document.querySelector("#offer")?.scrollIntoView({ behavior: "smooth" });
  }

  return <button className="button button-primary" type="button" onClick={handleClick}>Buy securely <span aria-hidden="true">↗</span></button>;
}
