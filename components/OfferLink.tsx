"use client";

import { trackOfferIntent } from "@/lib/analytics";

export default function OfferLink() {
  return <a className="button button-secondary" href="#offer" onClick={trackOfferIntent}>Make an offer</a>;
}
