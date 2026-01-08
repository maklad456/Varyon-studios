"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

export function CaseStudiesCTAClient() {
  return (
    <Link 
      href="/#discovery" 
      className="btn-primary mt-8"
      onClick={() => {
        trackEvent("cta_connect_click", { location: "case-studies" });
      }}
    >
      Connect with us
    </Link>
  );
}
