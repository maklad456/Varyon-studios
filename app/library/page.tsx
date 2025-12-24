"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { librarySamples, type LibrarySample } from "@/data/librarySamples";
import { trackEvent } from "@/lib/analytics";

const ITEMS_PER_PAGE = 6;

export default function LibraryPage() {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    trackEvent("library_page_view");
  }, []);

  const visibleSamples = librarySamples.slice(0, visibleCount);
  const hasMore = visibleCount < librarySamples.length;
  const remaining = librarySamples.length - visibleCount;

  const handleLoadMore = () => {
    const nextCount = Math.min(visibleCount + ITEMS_PER_PAGE, librarySamples.length);
    setVisibleCount(nextCount);
    trackEvent("library_load_more", { count: nextCount });
  };

  return (
    <main className="min-h-screen bg-vs-bgLight">
      {/* Header */}
      <section className="bg-vs-bgDark text-white pt-28 pb-12">
        <div className="site-container pt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vs-accent">
            Library
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl sm:leading-tight">
            Before & After Gallery
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            Explore real transformations across industries. Each project showcases
            how we elevate brands with AI-powered visual content.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section ref={sectionRef} className="site-section">
        <div className="site-container">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {visibleSamples.map((sample) => (
              <LibraryCard key={sample.slug} sample={sample} />
            ))}
          </div>

          {/* Load More */}
          {hasMore && (
            <div className="mt-12 flex justify-center">
              <button
                onClick={handleLoadMore}
                className="group inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-vs-text-strong shadow-soft transition-all hover:border-vs-accent hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              >
                Load More
                <span className="rounded-full bg-vs-accent/10 px-2 py-0.5 text-xs font-medium text-vs-accent">
                  {remaining}
                </span>
              </button>
            </div>
          )}

          {/* All loaded message */}
          {!hasMore && visibleCount > ITEMS_PER_PAGE && (
            <p className="mt-12 text-center text-sm text-vs-text-body/70">
              You&apos;ve explored all {librarySamples.length} projects
            </p>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="site-section bg-vs-bgDark">
        <div className="site-container text-center">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">
            Ready for your transformation?
          </h2>
          <p className="mt-4 text-base text-white/70">
            Let&apos;s discuss how we can elevate your brand visuals.
          </p>
          <Link href="/#discovery" className="btn-primary mt-8">
            Get a Free Sample
          </Link>
        </div>
      </section>
    </main>
  );
}

function LibraryCard({ sample }: { sample: LibrarySample }) {
  const [imageError, setImageError] = useState(false);
  const isAnetos = sample.slug === "anetos";

  return (
    <Link
      href={`/library/${sample.slug}`}
      className="group block overflow-hidden rounded-3xl border border-black/5 bg-white shadow-soft transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]"
      onClick={() => trackEvent("library_card_click", { slug: sample.slug })}
    >
      {/* Cover Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-vs-bgLight">
        {!imageError ? (
          <Image
            src={sample.coverImage}
            alt={`${sample.name} preview`}
            fill
            className={isAnetos ? "object-cover transition-transform duration-500 group-hover:scale-105" : "object-contain p-2 transition-transform duration-500 group-hover:scale-105"}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-vs-accent/10 to-vs-accent/5">
            <span className="text-4xl font-bold text-vs-accent/30">
              {sample.name.charAt(0)}
            </span>
          </div>
        )}
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <div className="absolute bottom-3 right-3 opacity-0 transition-all group-hover:opacity-100">
          <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-vs-text-strong">
            View →
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Categories */}
        <div className="flex flex-wrap gap-1.5">
          {sample.categories.slice(0, 2).map((cat) => (
            <span
              key={cat}
              className="rounded-full bg-vs-accent/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-vs-accent"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Name */}
        <h3 className="mt-4 text-xl font-semibold text-vs-text-strong group-hover:text-vs-accent transition-colors">
          {sample.name}
        </h3>

        {/* Industry */}
        <p className="mt-2 text-sm font-medium text-vs-text-body/60">
          {sample.industry}
        </p>

        {/* Blurb */}
        <p className="mt-4 text-base leading-relaxed text-vs-text-body">
          {sample.blurb}
        </p>
      </div>
    </Link>
  );
}

