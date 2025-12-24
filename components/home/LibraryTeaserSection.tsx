"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";
import { getLibraryIndustries } from "@/data/librarySamples";

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

