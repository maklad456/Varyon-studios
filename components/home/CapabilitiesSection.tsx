"use client";

import { capabilities } from "@/data/varyonContent";
import Image from "next/image";
import { useState, useEffect } from "react";

export function CapabilitiesSection() {
  const [activeCapabilityIndex, setActiveCapabilityIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const activeCapability = capabilities[activeCapabilityIndex];
  const activeImage = activeCapability.images[activeImageIndex];

  // Auto-advance images within current capability (every 3 seconds)
  useEffect(() => {
    if (!activeCapability.images || activeCapability.images.length <= 1) return;

    const imageInterval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % activeCapability.images.length);
    }, 3000);

    return () => clearInterval(imageInterval);
  }, [activeCapabilityIndex, activeCapability.images]);

  // Auto-advance capabilities (every 6 seconds)
  useEffect(() => {
    const capabilityInterval = setInterval(() => {
      setActiveCapabilityIndex((prev) => {
        const next = (prev + 1) % capabilities.length;
        setActiveImageIndex(0); // Reset image index when changing capability
        return next;
      });
    }, 6000);

    return () => clearInterval(capabilityInterval);
  }, []);

  // Reset image index when capability changes manually
  const handleCapabilityClick = (index: number) => {
    setActiveCapabilityIndex(index);
    setActiveImageIndex(0);
  };

  return (
    <section id="capabilities" className="site-section relative bg-black text-white scroll-mt-24 min-h-screen md:min-h-0 md:h-auto flex flex-col pb-0 md:pb-12">
      <div className="absolute inset-0">
        <div className="relative h-full w-full">
          <img 
            src="/media/backgrounds/capabilities-bg-3.webp" 
            alt="" 
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/40 to-transparent" />
      </div>
      <div className="site-container relative z-10 flex flex-col justify-center md:justify-start pt-4 pb-8 md:py-8 lg:py-8 w-full">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vs-accent-soft md:text-sm">What we can produce</p>
        
        {/* Carousel Container */}
        <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8 lg:items-stretch md:mt-5 md:gap-4">
          {/* Left: Text Content */}
          <div className="flex flex-col col-span-1 lg:col-span-5 min-w-0 w-full max-w-full lg:h-full lg:justify-between">
            {/* Mobile: Title */}
            <h2 className="md:hidden mt-6 text-3xl font-semibold leading-[1.05] text-white">
              Every format you need to sell — from a single product to 1,000+ SKUs.
            </h2>
            {/* Mobile: Glass card - fixed height matching "Bundles, sets & variant grids" size */}
            <div className="md:hidden mt-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-3 h-[145px] flex flex-col">
              <h3 className="text-xl font-semibold leading-tight text-white">
                {activeCapability.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-vs-text-on-dark">
                {activeCapability.body}
              </p>
            </div>

            {/* Desktop: Container with equal spacing */}
            <div className="hidden md:flex md:flex-col md:h-full md:justify-between">
              {/* Title - Moved to left column */}
              <h2 className="text-3xl font-semibold leading-[1.05] text-white md:text-5xl">
                Every format you need to sell — from a single product to 1,000+ SKUs.
              </h2>

              {/* Format Rail - 2 Rows */}
              <div className="w-full">
                <div className="flex flex-col gap-4">
                  {/* Row 1: Items 0-3 (01-04) */}
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:overflow-x-visible">
                      {capabilities.slice(0, 4).map((capability, idx) => {
                        const index = idx;
                        const formatLabels = [
                          "Product-only",
                          "Lifestyle",
                          "On-model",
                          "CGI",
                          "Macro",
                          "Before/After",
                          "Ad Creatives",
                          "Bundles"
                        ];
                        const isActive = index === activeCapabilityIndex;
                        return (
                          <button
                            key={capability.title}
                            onClick={() => handleCapabilityClick(index)}
                            className={`flex items-center gap-2 whitespace-nowrap transition-all duration-200 ${
                              isActive
                                ? "text-vs-accent font-semibold underline decoration-vs-accent underline-offset-4"
                                : "text-white/70 hover:text-white/90"
                            }`}
                            aria-label={`View ${capability.title}`}
                          >
                            <span className="text-xs font-mono text-white/50">{String(index + 1).padStart(2, '0')}</span>
                            <span>{formatLabels[index]}</span>
                          </button>
                        );
                      })}
                    </div>
                    {/* Progress Bar for Row 1 - Desktop only */}
                    <div className="hidden md:block progress-bar-mobile-hide h-0.5 w-full bg-white/10">
                      <div
                        className={`h-full bg-vs-accent transition-all duration-200 ${
                          activeCapabilityIndex >= 0 && activeCapabilityIndex < 4 ? '' : 'opacity-0'
                        }`}
                        style={{ 
                          width: activeCapabilityIndex >= 0 && activeCapabilityIndex < 4 
                            ? `${((activeCapabilityIndex + 1) / 4) * 100}%` 
                            : '0%' 
                        }}
                      />
                    </div>
                  </div>

                  {/* Row 2: Items 4-7 (05-08) */}
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:overflow-x-visible">
                      {capabilities.slice(4, 8).map((capability, idx) => {
                        const index = idx + 4;
                        const formatLabels = [
                          "Product-only",
                          "Lifestyle",
                          "On-model",
                          "CGI",
                          "Macro",
                          "Before/After",
                          "Ad Creatives",
                          "Bundles"
                        ];
                        const isActive = index === activeCapabilityIndex;
                        return (
                          <button
                            key={capability.title}
                            onClick={() => handleCapabilityClick(index)}
                            className={`flex items-center gap-2 whitespace-nowrap transition-all duration-200 ${
                              isActive
                                ? "text-vs-accent font-semibold underline decoration-vs-accent underline-offset-4"
                                : "text-white/70 hover:text-white/90"
                            }`}
                            aria-label={`View ${capability.title}`}
                          >
                            <span className="text-xs font-mono text-white/50">{String(index + 1).padStart(2, '0')}</span>
                            <span>{formatLabels[index]}</span>
                          </button>
                        );
                      })}
                    </div>
                    {/* Progress Bar for Row 2 - Desktop only */}
                    <div className="hidden md:block progress-bar-mobile-hide h-0.5 w-full bg-white/10">
                      <div
                        className={`h-full bg-vs-accent transition-all duration-200 ${
                          activeCapabilityIndex >= 4 && activeCapabilityIndex < 8 ? '' : 'opacity-0'
                        }`}
                        style={{ 
                          width: activeCapabilityIndex >= 4 && activeCapabilityIndex < 8 
                            ? `${((activeCapabilityIndex - 3) / 4) * 100}%` 
                            : '0%' 
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop: Glass card - consistent height for all capabilities */}
              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 lg:p-8 flex flex-col w-full max-w-full overflow-hidden min-h-[200px] lg:min-h-[220px]">
                <div className="min-w-0">
                  <h3 className="text-3xl font-semibold leading-tight text-white md:text-4xl md:leading-tight lg:text-4xl lg:leading-tight break-words">
                    {activeCapability.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-vs-text-on-dark md:text-lg md:mt-4 lg:text-lg break-words">
                    {activeCapability.body}
                  </p>
                </div>
              </div>
              
              {/* Pricing Text - Desktop only, aligned to bottom */}
              <p className="text-base leading-relaxed text-vs-text-on-dark md:text-lg">
                Pricing depends on volume, formats and complexity. We&apos;ll scope it with you on WhatsApp or a quick call.
              </p>
            </div>
          </div>

          {/* Right: Image Carousel */}
          <div className="relative aspect-[4/5] w-full col-span-1 lg:col-span-7 min-w-0 overflow-hidden rounded-2xl border border-white/10 md:max-h-[66vh] lg:max-h-[72vh]">
            <Image
              src={activeImage}
              alt={activeCapability.title}
              fill
              className="object-contain transition-opacity duration-500 md:scale-110"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={activeCapabilityIndex === 0}
            />
            
            {/* Image indicators (if multiple images) */}
            {activeCapability.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                {activeCapability.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === activeImageIndex
                        ? "w-8 bg-vs-accent"
                        : "w-2 bg-white/30 hover:bg-white/50"
                    }`}
                    aria-label={`View image ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Pricing Text - Mobile only */}
          <p className="md:hidden mt-2 text-sm leading-relaxed text-vs-text-on-dark">
            Pricing depends on volume, formats and complexity. We&apos;ll scope it with you on WhatsApp or a quick call.
          </p>
        </div>
      </div>
    </section>
  );
}
