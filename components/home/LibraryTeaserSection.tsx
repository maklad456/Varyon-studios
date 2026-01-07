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
  // Combine base industries with additional ones, remove duplicates
  const allIndustries = Array.from(new Set([...baseIndustries, ...additionalIndustries]));
  
  // Show first 8 industries by default
  const displayedIndustries = isIndustriesExpanded 
    ? allIndustries 
    : allIndustries.slice(0, 8);
  const remainingCount = allIndustries.length - 8;

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
          {/* Headline */}
          <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
            Connected with 100+ clients worldwide
          </h2>

          {/* Subcopy */}
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            Across 30+ industries — explore a curated library of before/after samples
            that showcase real transformations.
          </p>

          {/* Logo Marquee - Full Width */}
          <div className="mt-10 -mx-6 w-[100vw] overflow-hidden py-4 sm:-mx-8 lg:-mx-12" style={{ marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)' }}>
            <div className="flex animate-scroll gap-8 md:gap-12" style={{ width: 'max-content' }}>
              {/* Render all 16 logos multiple times for seamless infinite loop */}
              {[...Array(3)].map((_, setNum) =>
                logoFiles.map((logo, index) => (
                  <div
                    key={`set${setNum}-logo${index}`}
                    className="flex h-20 w-40 flex-shrink-0 items-center justify-center px-4"
                  >
                    <Image
                      src={`/logo-carousel/${logo}`}
                      alt={`Client logo ${index + 1}`}
                      width={160}
                      height={80}
                      className="h-full w-full object-contain object-center opacity-100 transition-all duration-300 hover:opacity-90"
                      unoptimized
                    />
                  </div>
                ))
              )}
            </div>
          </div>

          {/* CTA */}
          <Link
            href="/library"
            className="btn-primary mt-8"
            onClick={() => trackEvent("library_teaser_cta_click")}
          >
            Explore the Library
          </Link>

          {/* Case Studies Teaser */}
          <div className="mt-8 flex flex-col items-center text-center">
            {/* Label */}
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vs-accent">
              CASE STUDIES
            </p>

            {/* Headline */}
            <h3 className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-4xl sm:leading-tight">
              Four brands. Four different production problems. One strategy-first pipeline.
            </h3>

            {/* Support line */}
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
              Deep, technical breakdowns of how we build systems that scale.
            </p>

            {/* Button */}
            <Link
              href="/case-studies"
              className="btn-secondary mt-5"
              onClick={() => trackEvent("case_studies_teaser_cta_click")}
            >
              Explore case studies
            </Link>

            {/* Micro line */}
            <p className="mt-3 text-sm text-white/50">
              Discovery Homes · Zee Plexiglass Designs · Woodworkers · Mehos
            </p>
          </div>

          {/* Industry pills */}
          <div className="mt-10 w-full">
            <div 
              id="industries-list" 
              className="flex flex-wrap justify-center gap-2 transition-all duration-300"
            >
              {displayedIndustries.map((industry) => (
                <span
                  key={industry}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/60"
                >
                  {industry}
                </span>
              ))}
            </div>
            {remainingCount > 0 && (
              <div className="mt-4 flex justify-center">
                <button
                  onClick={() => {
                    setIsIndustriesExpanded(!isIndustriesExpanded);
                    trackEvent("industries_expand", { expanded: !isIndustriesExpanded });
                  }}
                  aria-expanded={isIndustriesExpanded}
                  aria-controls="industries-list"
                  className="rounded-full border border-vs-accent/30 bg-vs-accent/10 px-4 py-2 text-sm font-medium text-vs-accent transition-all hover:bg-vs-accent/20"
                >
                  {isIndustriesExpanded ? "Show less" : `+${remainingCount} more`}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

