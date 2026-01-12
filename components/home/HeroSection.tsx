"use client";

import Image from "next/image";
import { trackEvent } from "@/lib/analytics";

const WHATSAPP_URL =
  "https://wa.me/201116001400?text=Hi%20Varyon%20Studios,%20I%27d%20love%20to%20see%20a%20free%20sample%20for%20my%20brand.";

export function HeroSection() {
  const handleWhatsApp = () => {
    trackEvent("hero_sample_click");
    trackEvent("whatsapp_click", { location: "hero" });
  };


  return (
    <section className="relative min-h-screen bg-black text-white" aria-label="Varyon Studios hero">
      <div className="absolute inset-0">
        <div className="relative h-full w-full">
          <Image 
            src="/media/hero/hero-image.webp" 
            alt="Varyon Studios hero" 
            fill 
            className="object-cover" 
            priority 
            quality={90}
            sizes="100vw"
            fetchPriority="high"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/20 to-transparent" />
      </div>
      <div className="relative z-10 site-container flex min-h-screen flex-col justify-center py-24 text-center md:text-left">
        <p className="text-sm font-semibold uppercase tracking-[0.4em] text-vs-accent-soft">AI-powered content studio</p>
        <h1 className="mt-8 text-5xl font-semibold leading-[1.05] text-white md:text-6xl">
          Your products.<br />
          Any scene.<br />
          Every format.
        </h1>
        <p className="mt-8 mx-auto max-w-2xl text-lg leading-relaxed text-vs-text-on-dark sm:text-xl sm:leading-7 md:mx-0 md:text-left">
          We turn simple phone photos into cinematic campaigns, product images and launch assets that look like a global brand — and are built to convert, not just look good.
        </p>
        <div className="mt-8 max-w-2xl mx-auto md:mx-0">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            onClick={handleWhatsApp}
            className="btn-primary inline-block text-center w-full text-base sm:w-auto sm:px-[84px] sm:py-4 md:text-xl"
          >
            Get your free sample
          </a>
        </div>
        <ul className="mt-12 flex flex-wrap gap-3 justify-center md:justify-start">
          <li>
            <div className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-white/70">
              10,000+ images
            </div>
          </li>
          <li>
            <div className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-white/70">
              18+ industries
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
