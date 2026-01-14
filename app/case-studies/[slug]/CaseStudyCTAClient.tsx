"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

export function CaseStudyCTAClient({ slug }: { slug: string }) {
  return (
    <Link
      href="/#discovery"
      className="btn-primary w-full text-center"
      onClick={() => trackEvent("case_study_cta_click", { slug })}
    >
      Book a discovery call
    </Link>
  );
}

export function CaseStudyConnectCTA() {
  return (
    <a
      href="https://wa.me/201116001400?text=Hi!%20I%27m%20interested%20in%20working%20with%20you."
      target="_blank"
      rel="noreferrer"
      className="btn-primary mt-8"
      onClick={() => {
        trackEvent("cta_connect_click", { location: "case-study-detail" });
        trackEvent("whatsapp_click", { location: "case-study-detail-cta" });
      }}
    >
      Connect with us
    </a>
  );
}