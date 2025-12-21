"use client";

import { trackEvent } from "@/lib/analytics";

const WHATSAPP_URL =
  "https://wa.me/201116001400?text=Hi%20Varyon%20Studios,%20I%27m%20ready%20to%20see%20a%20free%20sample.";

export function FinalCtaSection() {
  return (
    <section className="bg-black py-12 text-white">
      <div className="mx-auto flex max-w-screen-2xl flex-col items-start gap-6 px-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vs-accent-soft">
            Final step
          </p>
          <h3 className="mt-2 text-2xl font-semibold">Ready to see what AI can really do for your brand?</h3>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent("whatsapp_click", { location: "final-cta" })}
            className="inline-flex items-center justify-center rounded-full bg-vs-accent px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-black"
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
