"use client";

import Image from "next/image";
import { trackEvent } from "@/lib/analytics";
import { heroLogos } from "@/data/varyonContent";

const WHATSAPP_URL =
  "https://wa.me/201116001400?text=Hi%20Varyon%20Studios,%20I%27d%20love%20to%20see%20a%20free%20sample%20for%20my%20brand.";

export function HeroSection() {
  const handleWhatsApp = () => {
    trackEvent("hero_sample_click");
    trackEvent("whatsapp_click", { location: "hero" });
  };

  const handleBookCall = () => {
    trackEvent("book_call_click", { location: "hero" });
    const target = document.querySelector("#discovery");
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative min-h-screen bg-black text-white" aria-label="Varyon Studios hero">
      <div className="absolute inset-0">
        <div className="relative h-full w-full">
          <Image src="/media/hero/hero-image.webp" alt="Varyon Studios hero" fill className="object-cover" priority quality={100} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/20 to-transparent" />
      </div>
      <div className="relative z-10 site-container flex min-h-screen flex-col justify-center py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-vs-accent-soft">AI-powered content studio</p>
        <h1 className="mt-8 max-w-3xl text-5xl font-semibold leading-tight text-white sm:text-5xl lg:text-[56px] lg:leading-[64px]">
          Million-dollar photoshoots that actually sell.
        </h1>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-vs-text-on-dark sm:text-lg sm:leading-7">
          We turn simple phone photos into cinematic campaigns, product images and launch assets that look like a global brand — and are built to convert, not just look good.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            onClick={handleWhatsApp}
            className="btn-primary"
          >
            Get your free sample
          </a>
          <button
            onClick={handleBookCall}
            className="btn-secondary"
          >
            Book a discovery call
          </button>
        </div>
        <div className="mt-12 text-sm uppercase tracking-[0.3em] text-vs-text-on-dark">Trusted by brands across furniture, interiors, home tech and modular housing.</div>
        <div className="mt-4 flex flex-wrap gap-8 text-sm font-semibold text-white/80">
          {heroLogos.map((logo) => (
            <span key={logo} className="tracking-wide">
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
