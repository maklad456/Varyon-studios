"use client";

import { trackEvent } from "@/lib/analytics";

const WHATSAPP_URL =
  "https://wa.me/201116001400?text=Hi%20Varyon%20Studios,%20I%27m%20ready%20to%20see%20a%20free%20sample.";

export function FinalCtaSection() {
  return (
    <section className="bg-black py-12 text-white">
      <div className="site-container flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vs-accent-soft">
            Final step
          </p>
          <h3 className="mt-4 text-2xl font-semibold leading-tight">Ready to see what AI can really do for your brand?</h3>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent("whatsapp_click", { location: "final-cta" })}
            className="btn-primary"
          >
            Get your free sample on WhatsApp
          </a>
          <a
            href="mailto:info@varyonstudios.com"
            className="text-sm text-white/80 underline-offset-4 hover:underline"
          >
            Or email us at info@varyonstudios.com
          </a>
        </div>
      </div>
    </section>
  );
}
