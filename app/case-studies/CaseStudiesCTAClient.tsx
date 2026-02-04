"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

export function CaseStudiesCTAClient() {
  return (
    <Link
      href="/free-sample"
      className="btn-primary mt-8"
      onClick={() => {
        trackEvent("cta_connect_click", { location: "case-studies" });
        trackEvent("free_sample_click", { location: "case-studies-cta" });
      }}
    >
      Get your free sample
    </Link>
  );
}
