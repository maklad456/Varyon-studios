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
        <video
          className="hidden h-full w-full object-cover md:block"
          autoPlay
          loop
          muted
          playsInline
          poster="/media/hero/hero-still.jpg"
        >
          <source src="/media/hero/hero-loop.mp4" type="video/mp4" />
        </video>
        <div className="relative h-full w-full md:hidden">
          <Image src="/media/hero/hero-still.jpg" alt="Varyon Studios hero" fill className="object-cover" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
      </div>
      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-4 py-24 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-vs-accent-soft">AI-powered content studio</p>
        <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-[56px]">
          Million-dollar photoshoots that actually sell.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-vs-text-on-dark">
          We turn simple phone photos into cinematic campaigns, product images and launch assets that look like a global brand — and are built to convert, not just look good.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            onClick={handleWhatsApp}
            className="inline-flex items-center justify-center rounded-full bg-vs-accent px-8 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-black transition hover:bg-emerald-500"
          >
            Get your free sample
          </a>
          <button
            onClick={handleBookCall}
            className="inline-flex items-center justify-center rounded-full border border-white/30 px-8 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:border-white"
          >
            Book a discovery call
          </button>
        </div>
        <div className="mt-10 text-sm uppercase tracking-[0.3em] text-vs-text-on-dark">Trusted by brands across furniture, interiors, home tech and modular housing.</div>
        <div className="mt-4 flex flex-wrap gap-6 text-sm font-semibold text-white/80">
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
