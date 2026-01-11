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
    <Link
      href="/#discovery"
      className="btn-primary mt-8"
      onClick={() => trackEvent("cta_connect_click", { location: "case-study-detail" })}
    >
      Connect with us
    </Link>
  );
}