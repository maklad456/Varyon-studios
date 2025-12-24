"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
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

export function LibraryTeaserSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const allIndustries = getLibraryIndustries();
  // Show first 8 industries, then "+X more"
  const displayedIndustries = allIndustries.slice(0, 8);
  const remainingCount = allIndustries.length - displayedIndustries.length;

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
          {/* Stats badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
            <span className="text-vs-accent text-lg font-semibold">100+</span>
            <span className="text-sm text-white/70">clients worldwide</span>
          </div>

          {/* Headline */}
          <h2 className="mt-6 text-3xl font-semibold leading-tight text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
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

          {/* Industry pills */}
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {displayedIndustries.map((industry) => (
              <span
                key={industry}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/60"
              >
                {industry}
              </span>
            ))}
            {remainingCount > 0 && (
              <span className="rounded-full border border-vs-accent/30 bg-vs-accent/10 px-3 py-1.5 text-xs font-medium text-vs-accent">
                +{remainingCount} more
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

