"use client";

import { trackEvent } from "@/lib/analytics";

export function CaseStudiesCTAClient() {
  return (
    <a
      href="https://wa.me/201116001400?text=Hi!%20I%27m%20interested%20in%20working%20with%20you."
      target="_blank"
      rel="noreferrer"
      className="btn-primary mt-8"
      onClick={() => {
        trackEvent("cta_connect_click", { location: "case-studies" });
        trackEvent("whatsapp_click", { location: "case-studies-cta" });
      }}
    >
      Connect with us
    </a>
  );
}
