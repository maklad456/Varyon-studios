"use client";

import { capabilities } from "@/data/varyonContent";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export function CapabilitiesSection() {
  const [activeCapabilityIndex, setActiveCapabilityIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const capabilityIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const imageIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const clickedCapabilityRef = useRef<number | null>(null);
  const imageDirectionRef = useRef<"forward" | "backward">("forward");

  const activeCapability = capabilities[activeCapabilityIndex];
  const activeImage = activeCapability.images[activeImageIndex];

  // Auto-advance images within current capability - forward then backward once
  useEffect(() => {
    if (!activeCapability.images || activeCapability.images.length <= 1) return;

    // Clear any existing interval
    if (imageIntervalRef.current) {
      clearInterval(imageIntervalRef.current);
    }

    // Reset to start when capability changes
    setActiveImageIndex(0);
    imageDirectionRef.current = "forward";

    const imageInterval = setInterval(() => {
      setActiveImageIndex((prev) => {
        if (imageDirectionRef.current === "forward") {
          if (prev < activeCapability.images.length - 1) {
            return prev + 1;
          } else {
            // Reached the end, go backward
            imageDirectionRef.current = "backward";
            return prev - 1;
          }
        } else {
          // Going backward
          if (prev > 0) {
            return prev - 1;
          } else {
            // Reached the start, stop cycling (will restart when capability changes)
            clearInterval(imageInterval);
            return 0;
          }
        }
      });
    }, 3000);

    imageIntervalRef.current = imageInterval;

    return () => {
      if (imageIntervalRef.current) {
        clearInterval(imageIntervalRef.current);
      }
    };
  }, [activeCapabilityIndex, activeCapability.images.length]);

  // Auto-advance capabilities (every 6 seconds, or 16 seconds if manually clicked)
  useEffect(() => {
    // Clear any existing interval
    if (capabilityIntervalRef.current) {
      clearInterval(capabilityIntervalRef.current);
    }

    const baseInterval = 6000;
    const extraTimeOnClick = 10000;
    const intervalTime = clickedCapabilityRef.current === activeCapabilityIndex 
      ? baseInterval + extraTimeOnClick 
      : baseInterval;

    const capabilityInterval = setInterval(() => {
      setActiveCapabilityIndex((prev) => {
        const next = (prev + 1) % capabilities.length;
        setActiveImageIndex(0); // Reset image index when changing capability
        imageDirectionRef.current = "forward";
        clickedCapabilityRef.current = null; // Reset click tracking
        return next;
      });
    }, intervalTime);

    capabilityIntervalRef.current = capabilityInterval;

    return () => {
      if (capabilityIntervalRef.current) {
        clearInterval(capabilityIntervalRef.current);
      }
    };
  }, [activeCapabilityIndex]);

  // Reset image index when capability changes manually
  const handleCapabilityClick = (index: number) => {
    // Clear existing intervals
    if (capabilityIntervalRef.current) {
      clearInterval(capabilityIntervalRef.current);
    }
    if (imageIntervalRef.current) {
      clearInterval(imageIntervalRef.current);
    }

    setActiveCapabilityIndex(index);
    setActiveImageIndex(0);
    imageDirectionRef.current = "forward";
    clickedCapabilityRef.current = index; // Mark this as clicked

    // Restart the capability interval with extra time
    const baseInterval = 6000;
    const extraTimeOnClick = 10000;
    const intervalTime = baseInterval + extraTimeOnClick;

    capabilityIntervalRef.current = setInterval(() => {
      setActiveCapabilityIndex((prev) => {
        const next = (prev + 1) % capabilities.length;
        setActiveImageIndex(0);
        imageDirectionRef.current = "forward";
        clickedCapabilityRef.current = null;
        return next;
      });
    }, intervalTime);

    // Restart image cycling
    if (capabilities[index].images && capabilities[index].images.length > 1) {
      imageIntervalRef.current = setInterval(() => {
        setActiveImageIndex((prev) => {
          if (imageDirectionRef.current === "forward") {
            if (prev < capabilities[index].images.length - 1) {
              return prev + 1;
            } else {
              imageDirectionRef.current = "backward";
              return prev - 1;
            }
          } else {
            if (prev > 0) {
              return prev - 1;
            } else {
              if (imageIntervalRef.current) {
                clearInterval(imageIntervalRef.current);
              }
              return 0;
            }
          }
        });
      }, 3000);
    }
  };

  return (
    <section id="capabilities" className="site-section relative bg-black text-white scroll-mt-24 min-h-screen md:min-h-0 md:h-auto flex flex-col">
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
      <div className="site-container relative z-10 flex flex-col md:justify-start py-1 md:py-8 lg:py-8 w-full">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vs-accent-soft md:text-sm">What we can produce</p>
        <h2 className="mt-2 text-3xl font-semibold leading-tight text-white md:text-4xl md:leading-tight lg:text-4xl lg:leading-tight md:mt-3">
          Every format you need to sell — from a single product to 1,000+ SKUs.
        </h2>
        
        {/* Carousel Container */}
        <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-start md:gap-6 lg:gap-8 md:mt-5">
          {/* Left: Text Content */}
          <div className="flex flex-col md:w-[min(400px,32vw)] md:flex-shrink-0 lg:w-[400px]">
            {/* Mobile: Glass card - fixed height matching "Bundles, sets & variant grids" size */}
            <div className="md:hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-3 h-[145px] flex flex-col">
              <h3 className="text-xl font-semibold leading-tight text-white">
                {activeCapability.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-vs-text-on-dark">
                {activeCapability.body}
              </p>
            </div>

            {/* Desktop: Glass card with fixed height */}
            <div className="hidden md:block rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 lg:p-8 h-[280px] lg:h-[300px] flex flex-col justify-between">
              <div>
                <h3 className="text-3xl font-semibold leading-tight text-white md:text-4xl md:leading-tight lg:text-4xl lg:leading-tight">
                  {activeCapability.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-vs-text-on-dark md:text-lg md:mt-4 lg:text-lg">
                  {activeCapability.body}
                </p>
              </div>
            </div>
            
            {/* Navigation Buttons - Below Text on Desktop, Below Image on Mobile */}
            <div className="hidden md:flex md:flex-wrap md:gap-2 md:mt-5">
              {capabilities.map((capability, index) => (
                <button
                  key={capability.title}
                  onClick={() => handleCapabilityClick(index)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    index === activeCapabilityIndex
                      ? "border border-white text-white bg-white/5"
                      : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white border border-transparent"
                  }`}
                  aria-label={`View ${capability.title}`}
                >
                  {capability.title}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Image Carousel */}
          <div className="relative aspect-[4/5] w-full flex-1 overflow-hidden rounded-2xl border border-white/10 bg-white/5 md:max-h-[60vh] lg:max-h-[65vh]">
            <Image
              src={activeImage}
              alt={activeCapability.title}
              fill
              className="object-contain transition-opacity duration-500"
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

          {/* Mobile: Navigation Buttons - Below Image */}
          <div className="flex flex-wrap gap-2 md:hidden mt-4">
            {capabilities.map((capability, index) => (
              <button
                key={capability.title}
                onClick={() => handleCapabilityClick(index)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                  index === activeCapabilityIndex
                    ? "border border-white text-white bg-white/5"
                    : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white border border-transparent"
                }`}
                aria-label={`View ${capability.title}`}
              >
                {capability.title}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-vs-text-on-dark md:text-base md:mt-6">
          Pricing depends on volume, formats and complexity — we&apos;ll scope it with you on WhatsApp or a quick call.
        </p>
      </div>
    </section>
  );
}
