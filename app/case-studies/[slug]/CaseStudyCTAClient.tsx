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

