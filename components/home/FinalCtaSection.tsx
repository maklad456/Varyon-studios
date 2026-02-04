"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

export function FinalCtaSection() {
  return (
    <section className="bg-black py-12 text-white">
      <div className="site-container flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vs-accent-soft md:text-sm">
            Final step
          </p>
          <h3 className="mt-4 text-2xl font-semibold leading-tight">Ready to see what AI can really do for your brand?</h3>
        </div>
        <div className="flex flex-col items-center sm:items-end gap-4 w-full sm:w-auto">
          <div className="flex flex-col items-center gap-4 w-full sm:w-auto">
            <Link
              href="/free-sample"
              onClick={() => trackEvent("free_sample_click", { location: "final-cta" })}
              className="btn-primary w-full sm:w-auto text-center"
            >
              Get your free sample
            </Link>
            <a
              href="mailto:info@varyonstudios.com"
              className="text-sm text-white/80 underline-offset-4 hover:underline text-center"
            >
              Or email us at info@varyonstudios.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
