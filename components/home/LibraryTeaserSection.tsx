"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { getLibraryIndustries } from "@/data/librarySamples";

// Logo filenames from logo-carousel folder
const logoFiles = [
  "20250518_2020_Minimalist_Logo_Design_remix_01jvj6hnfcf8w9xe6ksz2e3xqh_1 copy.png",
  "352988881_588704730017442_5215786875835733250_n-removebg-preview copy.png",
  "Anetos_Logo_White.png",
  "Drowzy_Logo_No_BKGD copy.png",
  "Favicon copy.png",
  "Long_Black_no_BG copy.png",
  "MESH_logo_transparent-removebg-preview copy.png",
  "Purple_Modern_Eid_Al_Fitr_Greeting_Instagram_Post copy.png",
  "Zee_Designs_Plexi_Glass_Logo copy.png",
  "home-hive-white.png",
  "lilly-home-logo_180x copy.png",
  "logo copy.png",
  "logo-header copy.png",
  "transparent-1-1 copy.png",
  "website-logo-Main copy.png",
  "wood_workers_logo copy.png",
];

// Additional industries to add to the list
const additionalIndustries = [
  "Home Furniture",
  "Interior Design",
  "Home Accessories",
  "Modular Homes",
  "Real Estate Marketing",
  "E-commerce Retail",
  "Beauty & Personal Care",
  "Food & Beverage",
  "Fashion & Accessories",
  "Consumer Electronics",
];

export function LibraryTeaserSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isIndustriesExpanded, setIsIndustriesExpanded] = useState(false);
  
  const baseIndustries = getLibraryIndustries();
  // Combine base industries with additional ones, remove duplicates, and add Clothing at the beginning
  const combinedIndustries = Array.from(new Set([...baseIndustries, ...additionalIndustries]));
  const allIndustries = ["Clothing", ...combinedIndustries.filter(industry => industry !== "Clothing")];

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    let fired = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !fired) {
            trackEvent("library_teaser_view");
            fired = true;
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="library"
      ref={sectionRef}
      className="site-section bg-vs-bgDark text-white scroll-mt-24"
    >
      <div className="site-container">
        <div className="flex flex-col items-center text-center">
          {/* Section Title */}
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vs-accent-soft md:text-sm">
            Our work
          </p>
          {/* Headline */}
          <h2 className="mt-4 text-3xl font-semibold leading-[1.05] text-white md:text-5xl">
            Connected with 100+ clients worldwide
          </h2>

          {/* Subcopy */}
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            A peek at what&apos;s possible — and exactly how we build it.
          </p>

          {/* Logo Marquee - Full Width */}
          <div className="mt-10 -mx-6 w-[100vw] overflow-hidden py-4 sm:-mx-8 lg:-mx-12" style={{ marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)' }}>
            <div className="flex animate-scroll gap-8 md:gap-12" style={{ width: 'max-content' }}>
              {/* Render all 16 logos multiple times for seamless infinite loop */}
              {[...Array(3)].map((_, setNum) =>
                logoFiles.map((logo, index) => (
                  <div
                    key={`set${setNum}-logo${index}`}
                    className="flex h-20 w-40 md:h-28 md:w-56 flex-shrink-0 items-center justify-center px-4"
                  >
                    <Image
                      src={`/logo-carousel/${logo}`}
                      alt={`Client logo ${index + 1}`}
                      width={224}
                      height={112}
                      className="h-full w-full object-contain object-center opacity-100 transition-all duration-300 hover:opacity-90"
                      unoptimized
                    />
                  </div>
                ))
              )}
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-8">
            {/* Primary CTA */}
            <div className="flex flex-col items-center text-center">
              <Link
                href="/library"
                className="btn-primary px-10 py-5 text-base"
                onClick={() => trackEvent("library_teaser_cta_click")}
              >
                Explore the Library
              </Link>
              <p className="mt-2 text-base leading-relaxed text-white/70 sm:text-lg">
                <span className="block">Browse real before/after</span>
                <span className="block">transformations.</span>
              </p>
            </div>

            {/* Secondary CTA */}
            <div className="flex flex-col items-center text-center">
              <Link
                href="/case-studies"
                className="btn-secondary px-10 py-5 text-base"
                onClick={() => trackEvent("case_studies_teaser_cta_click")}
              >
                Explore Case Studies
              </Link>
              <p className="mt-2 text-base leading-relaxed text-white/70 sm:text-lg">
                <span className="block">Deep, technical breakdowns</span>
                <span className="block">of selected projects.</span>
              </p>
            </div>
          </div>

          {/* Industry pills */}
          <div className="mt-10 w-full">
            <div 
              id="industries-list" 
              className="flex flex-wrap justify-center gap-2 transition-all duration-300"
            >
              {allIndustries.map((industry, index) => {
                // On mobile: hide industries beyond first 2 when collapsed. On desktop: show all
                const isHiddenOnMobile = !isIndustriesExpanded && index >= 2;
                return (
                  <span
                    key={industry}
                    className={`rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-white/70 sm:text-base ${isHiddenOnMobile ? 'hidden md:inline-block' : ''}`}
                  >
                    {industry}
                  </span>
                );
              })}
              {/* Mobile: Show count button inline when collapsed */}
              {!isIndustriesExpanded && (
                <button
                  onClick={() => {
                    setIsIndustriesExpanded(true);
                    trackEvent("industries_expand", { expanded: true });
                  }}
                  aria-expanded={isIndustriesExpanded}
                  aria-controls="industries-list"
                  className="md:hidden rounded-full border border-vs-accent/30 bg-vs-accent/10 px-3 py-1.5 text-sm font-medium text-vs-accent transition-all hover:bg-vs-accent/20"
                >
                  +{allIndustries.length - 2}
                </button>
              )}
            </div>
            {/* Mobile: Show less button below when expanded */}
            {isIndustriesExpanded && (
              <div className="mt-4 flex justify-center md:hidden">
                <button
                  onClick={() => {
                    setIsIndustriesExpanded(false);
                    trackEvent("industries_expand", { expanded: false });
                  }}
                  aria-expanded={isIndustriesExpanded}
                  aria-controls="industries-list"
                  className="whitespace-nowrap rounded-full border border-vs-accent/30 bg-vs-accent/10 px-5 py-2.5 text-sm font-medium text-vs-accent transition-all hover:bg-vs-accent/20"
                >
                  Show less
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

