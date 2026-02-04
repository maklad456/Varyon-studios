"use client";

import Script from "next/script";

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_DISCOVERY_URL ||
  "https://calendly.com/varyon-studios/discovery?hide_gdpr_banner=1&primary_color=10b981";

export default function BookCallPage() {
  return (
    <main className="min-h-screen bg-vs-bgLight">
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
      />
      <section className="bg-vs-bgDark text-white pt-28 pb-6 md:pb-12">
        <div className="site-container pt-8 md:text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vs-accent">
            Discovery Call
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl sm:leading-tight">
            Book a Discovery Call
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg md:mx-auto">
            Pick a time that works for you. We&apos;ll discuss your launch or
            campaign and how we can help.
          </p>
        </div>
      </section>

      <section className="site-container py-12 md:py-16">
        <div
          className="calendly-inline-widget min-h-[700px] w-full"
          data-url={CALENDLY_URL}
          style={{ minWidth: "320px", height: "700px" }}
        />
      </section>
    </main>
  );
}
