"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams, notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getLibrarySampleBySlug, type LibrarySample } from "@/data/librarySamples";
import { trackEvent } from "@/lib/analytics";

type TabType = "before" | "after";
type LayoutType = "A" | "B" | "C" | "D" | "E";

export default function LibraryDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const sample = getLibrarySampleBySlug(slug);
  
  // Get layout from sample data, or URL param (for testing), default to "B"
  const layoutParam = searchParams.get("layout") as LayoutType | null;
  const layout: LayoutType = layoutParam && ["A", "B", "C", "D", "E"].includes(layoutParam)
    ? layoutParam
    : (sample?.layout || "B");

  // Removed activeTab and activeChapter state since we're not using chapter toggle anymore
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (sample) {
      trackEvent("library_detail_view", { slug: sample.slug, layout });
    }
  }, [sample, layout]);

  if (!sample) {
    notFound();
  }

  const hasChapters = !!(sample.chapters && sample.chapters.length > 0);
  // For chapters, we'll pass the sample directly and let layouts handle stacking
  // For non-chapters, use the original logic
  const beforeImage = hasChapters ? "" : sample.before;
  const afterImages = hasChapters ? [] : sample.after;
  const isSquareAfter = sample.afterAspectRatio === "1:1";
  const currentChapter = null; // No longer using chapter toggle, chapters are stacked
  const activeChapter = 0; // Keep for type compatibility but not used
  const setActiveChapter = () => {}; // No-op function since we don't use chapter toggle
  const activeTab = "after" as TabType; // Keep for type compatibility but not used
  const setActiveTab = () => {}; // No-op function since we don't use tabs

  const handleImageError = (src: string) => {
    setImageErrors((prev) => ({ ...prev, [src]: true }));
  };

  // Render different layouts based on the layout param
  switch (layout) {
    case "A":
      return <LayoutA sample={sample} beforeImage={beforeImage} afterImages={afterImages} 
                      hasChapters={hasChapters} currentChapter={currentChapter} 
                      activeChapter={activeChapter} setActiveChapter={setActiveChapter}
                      activeTab={activeTab} setActiveTab={setActiveTab}
                      imageErrors={imageErrors} handleImageError={handleImageError}
                      isSquareAfter={isSquareAfter} />;
    case "B":
      return <LayoutB sample={sample} beforeImage={beforeImage} afterImages={afterImages} 
                      hasChapters={hasChapters} currentChapter={currentChapter} 
                      activeChapter={activeChapter} setActiveChapter={setActiveChapter}
                      activeTab={activeTab} setActiveTab={setActiveTab}
                      imageErrors={imageErrors} handleImageError={handleImageError}
                      isSquareAfter={isSquareAfter} />;
    case "C":
      return <LayoutC sample={sample} beforeImage={beforeImage} afterImages={afterImages} 
                      hasChapters={hasChapters} currentChapter={currentChapter} 
                      activeChapter={activeChapter} setActiveChapter={setActiveChapter}
                      activeTab={activeTab} setActiveTab={setActiveTab}
                      imageErrors={imageErrors} handleImageError={handleImageError}
                      isSquareAfter={isSquareAfter} />;
    case "D":
      return <LayoutD sample={sample} beforeImage={beforeImage} afterImages={afterImages} 
                      hasChapters={hasChapters} currentChapter={currentChapter} 
                      activeChapter={activeChapter} setActiveChapter={setActiveChapter}
                      activeTab={activeTab} setActiveTab={setActiveTab}
                      imageErrors={imageErrors} handleImageError={handleImageError}
                      isSquareAfter={isSquareAfter} />;
    case "E":
      return <LayoutE sample={sample} beforeImage={beforeImage} afterImages={afterImages} 
                      hasChapters={hasChapters} currentChapter={currentChapter} 
                      activeChapter={activeChapter} setActiveChapter={setActiveChapter}
                      activeTab={activeTab} setActiveTab={setActiveTab}
                      imageErrors={imageErrors} handleImageError={handleImageError}
                      isSquareAfter={isSquareAfter} />;
    default:
      return <LayoutB sample={sample} beforeImage={beforeImage} afterImages={afterImages} 
                      hasChapters={hasChapters} currentChapter={currentChapter} 
                      activeChapter={activeChapter} setActiveChapter={setActiveChapter}
                      activeTab={activeTab} setActiveTab={setActiveTab}
                      imageErrors={imageErrors} handleImageError={handleImageError}
                      isSquareAfter={isSquareAfter} />;
  }
}

// Common props type
type LayoutProps = {
  sample: LibrarySample;
  beforeImage: string;
  afterImages: string[];
  hasChapters: boolean;
  currentChapter: { id: string; name: string; before: string; after: string[] } | null;
  activeChapter: number;
  setActiveChapter: (idx: number) => void;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  imageErrors: Record<string, boolean>;
  handleImageError: (src: string) => void;
  isSquareAfter: boolean;
};

// Reusable Components
function BackLink() {
  return (
    <Link
      href="/library"
      className="inline-flex items-center gap-2 text-base font-medium text-vs-text-body hover:text-vs-accent transition-colors"
    >
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      Back to Library
    </Link>
  );
}

// ChapterToggle removed - chapters now display stacked instead of toggled

function BrandHeader({ sample, currentChapter }: { sample: LibrarySample; currentChapter: LayoutProps["currentChapter"] }) {
  return (
    <div className="text-center relative">
      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-2 relative">
        {/* Back Button - Positioned on same line as categories, aligned with logo V center (hidden on mobile) */}
        <Link
          href="/library"
          className="hidden md:flex absolute left-0 items-center justify-center w-10 h-10 rounded-full bg-black text-white hover:bg-black/80 transition-colors"
          aria-label="Back to Library"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        {sample.categories.map((cat) => (
          <span
            key={cat}
            className="rounded-full bg-vs-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-vs-accent"
          >
            {cat}
          </span>
        ))}
      </div>

      {/* Name */}
      <h1 className="mt-4 text-3xl font-semibold text-vs-text-strong sm:text-4xl lg:text-5xl">
        {sample.name}
      </h1>

      {/* Industry */}
      <p className="mt-2 text-base font-medium text-vs-text-body/60">
        {sample.industry}
      </p>

      {/* Description */}
      <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-vs-text-body">
        {sample.description}
      </p>

      {/* Chapter Name */}
      {currentChapter && (
        <div className="mt-6 inline-flex rounded-full border border-vs-accent/30 bg-vs-accent/5 px-5 py-2">
          <p className="text-sm font-semibold text-vs-accent">
            {currentChapter.name}
          </p>
        </div>
      )}
    </div>
  );
}

// CTAButtons removed as per user request

function ImageWithFallback({ 
  src, 
  alt, 
  className, 
  sizes, 
  priority = false,
  imageErrors,
  handleImageError 
}: { 
  src: string; 
  alt: string; 
  className?: string;
  sizes: string;
  priority?: boolean;
  imageErrors: Record<string, boolean>;
  handleImageError: (src: string) => void;
}) {
  if (imageErrors[src]) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-vs-bgLight">
        <span className="text-sm text-vs-text-body/40">Image not found</span>
      </div>
    );
  }
  
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={className || "object-contain"}
      sizes={sizes}
      priority={priority}
      onError={() => handleImageError(src)}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// LAYOUT A: Side-by-side (Before left, After 2x2 right)
// ═══════════════════════════════════════════════════════════════════════════════
function LayoutA({ sample, beforeImage, afterImages, hasChapters, currentChapter, 
                   activeChapter, setActiveChapter, activeTab, setActiveTab,
                   imageErrors, handleImageError, isSquareAfter }: LayoutProps) {
  return (
    <main className="flex min-h-screen flex-col bg-vs-bgLight pt-28">

      {/* Main Content */}
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Left Side - Info */}
        <aside className="flex-shrink-0 border-b border-black/5 bg-white p-8 lg:w-96 lg:border-b-0 lg:border-r lg:p-10">
          <div className="flex flex-wrap gap-2">
            {sample.categories.map((cat) => (
              <span key={cat} className="rounded-full bg-vs-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-vs-accent">
                {cat}
              </span>
            ))}
          </div>
          <h1 className="mt-5 text-3xl font-semibold text-vs-text-strong lg:text-4xl">{sample.name}</h1>
          <p className="mt-2 text-base font-medium text-vs-text-body/60">{sample.industry}</p>
          <p className="mt-5 text-base leading-relaxed text-vs-text-body">{sample.description}</p>
        </aside>

        {/* Right Side - Images (After First, Then Before Below) */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-auto p-6 lg:p-10">
            {hasChapters && sample.chapters ? (
              // Render chapters stacked
              sample.chapters.map((chapter, chapterIdx) => (
                <div key={chapter.id} className={chapterIdx > 0 ? "mt-12" : ""}>
                  {/* After Grid */}
                  <div className="mb-6">
                    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-vs-accent">After</p>
                    <div className="grid grid-cols-2 gap-4">
                      {chapter.after.slice(0, 4).map((src, idx) => (
                        <div key={idx} className={`relative overflow-hidden rounded-2xl border border-black/5 bg-white ${isSquareAfter ? "aspect-square" : "aspect-[4/5]"}`}>
                          <ImageWithFallback src={src} alt={`${sample.name} chapter ${chapterIdx + 1} after ${idx + 1}`} className="object-contain p-3" sizes="33vw" priority={chapterIdx === 0 && idx < 2} imageErrors={imageErrors} handleImageError={handleImageError} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Before */}
                  <div>
                    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-vs-text-body/50">Before</p>
                    <div className="relative min-h-[300px] overflow-hidden rounded-2xl border border-dashed border-black/10 bg-white">
                      <ImageWithFallback src={chapter.before} alt={`${sample.name} chapter ${chapterIdx + 1} before`} className="object-contain p-4" sizes="33vw" priority={chapterIdx === 0} imageErrors={imageErrors} handleImageError={handleImageError} />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <>
                {/* Desktop: After Grid First */}
                <div className="mb-6">
                  <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-vs-accent">After</p>
                  <div className={`grid grid-cols-2 gap-4 ${isSquareAfter ? "" : ""}`}>
                    {afterImages.slice(0, 4).map((src, idx) => (
                      <div key={idx} className={`relative overflow-hidden rounded-2xl border border-black/5 bg-white ${isSquareAfter ? "aspect-square" : "aspect-[4/5]"}`}>
                        <ImageWithFallback src={src} alt={`${sample.name} after ${idx + 1}`} className="object-contain p-3" sizes="33vw" priority={idx < 2} imageErrors={imageErrors} handleImageError={handleImageError} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Desktop: Before Below */}
                <div>
                  <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-vs-text-body/50">Before</p>
                  <div className="relative min-h-[300px] overflow-hidden rounded-2xl border border-dashed border-black/10 bg-white">
                    <ImageWithFallback src={beforeImage} alt={`${sample.name} before`} className="object-contain p-4" sizes="33vw" priority imageErrors={imageErrors} handleImageError={handleImageError} />
                  </div>
                </div>

                {/* Mobile: After Grid First */}
                <div className="mb-6 lg:hidden">
                  <p className="mb-4 text-center text-sm font-semibold uppercase tracking-[0.2em] text-vs-accent">After</p>
                  <div className="grid grid-cols-2 gap-3">
                    {afterImages.slice(0, 4).map((src, idx) => (
                      <div key={idx} className={`relative overflow-hidden rounded-2xl border border-black/5 bg-white ${isSquareAfter ? "aspect-square" : "aspect-[4/5]"}`}>
                        <ImageWithFallback src={src} alt={`${sample.name} after ${idx + 1}`} className="object-contain p-2" sizes="50vw" priority={idx < 2} imageErrors={imageErrors} handleImageError={handleImageError} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mobile: Before Below */}
                <div className="lg:hidden">
                  <p className="mb-4 text-center text-sm font-semibold uppercase tracking-[0.2em] text-vs-text-body/50">Before</p>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-dashed border-black/10 bg-white">
                    <ImageWithFallback src={beforeImage} alt={`${sample.name} before`} className="object-contain p-4" sizes="100vw" priority imageErrors={imageErrors} handleImageError={handleImageError} />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      
    </main>
  );
}

// Helper component for chapter carousel (manages its own state)
function ChapterCarousel({ chapter, sample, chapterIdx, isSquareAfter, imageErrors, handleImageError }: {
  chapter: { id: string; name: string; before: string; after: string[] };
  sample: LibrarySample;
  chapterIdx: number;
  isSquareAfter: boolean;
  imageErrors: Record<string, boolean>;
  handleImageError: (src: string) => void;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className={chapterIdx > 0 ? "mt-16" : ""}>
      {/* Desktop: Side-by-side */}
      <div className="hidden lg:grid lg:grid-cols-2 lg:gap-6 mb-12">
        {/* Before - Left */}
        <div className="flex flex-col">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-vs-text-body/50">Before</p>
          <div className="relative h-[500px] overflow-hidden rounded-2xl border-2 border-dashed border-black/10 bg-white shadow-soft">
            <ImageWithFallback src={chapter.before} alt={`${sample.name} chapter ${chapterIdx + 1} before`} className="object-contain p-4" sizes="50vw" priority={chapterIdx === 0} imageErrors={imageErrors} handleImageError={handleImageError} />
          </div>
        </div>

        {/* After - Right with Carousel */}
        <div className="flex flex-col">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-vs-accent">After</p>
          <div className="relative h-[500px] flex gap-3 overflow-hidden rounded-2xl border border-black/5 bg-white shadow-soft">
            {/* Thumbnails - Left Side (Vertical Stack) */}
            <div className="flex-shrink-0 w-20 flex flex-col gap-2 justify-center p-2">
              {chapter.after.slice(0, 4).map((src, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedIndex(idx)}
                  className={`relative h-16 w-16 overflow-hidden rounded-lg border-2 transition-all flex-shrink-0 ${
                    selectedIndex === idx
                      ? "border-vs-accent shadow-[0_0_8px_rgba(16,185,129,0.4)] scale-105"
                      : "border-transparent opacity-60 hover:opacity-100 hover:scale-105"
                  }`}
                >
                  <ImageWithFallback src={src} alt={`Thumbnail ${idx + 1}`} className="object-cover" sizes="64px" imageErrors={imageErrors} handleImageError={handleImageError} />
                </button>
              ))}
            </div>
            
            {/* Main Image - Right Side */}
            <div className="flex-1 relative overflow-hidden">
              <button onClick={() => setSelectedIndex((prev) => (prev - 1 + chapter.after.length) % chapter.after.length)} className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg transition-all hover:bg-white hover:shadow-xl">
                <svg className="h-5 w-5 text-vs-text-strong" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button onClick={() => setSelectedIndex((prev) => (prev + 1) % chapter.after.length)} className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg transition-all hover:bg-white hover:shadow-xl">
                <svg className="h-5 w-5 text-vs-text-strong" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
              <ImageWithFallback src={chapter.after[selectedIndex]} alt={`${sample.name} chapter ${chapterIdx + 1} after ${selectedIndex + 1}`} className="object-contain p-4" sizes="calc(50vw - 100px)" priority={chapterIdx === 0 && selectedIndex < 2} imageErrors={imageErrors} handleImageError={handleImageError} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: After then Before */}
      <div className="lg:hidden mb-12">
        <p className="mb-4 text-center text-sm font-semibold uppercase tracking-[0.2em] text-vs-accent">After</p>
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-black/5 bg-white shadow-soft mb-8">
          <ImageWithFallback src={chapter.after[0]} alt={`${sample.name} chapter ${chapterIdx + 1} after`} className="object-contain p-4" sizes="100vw" priority={chapterIdx === 0} imageErrors={imageErrors} handleImageError={handleImageError} />
        </div>
        <p className="mb-4 text-center text-sm font-semibold uppercase tracking-[0.2em] text-vs-text-body/50">Before</p>
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border-2 border-dashed border-black/10 bg-white">
          <ImageWithFallback src={chapter.before} alt={`${sample.name} chapter ${chapterIdx + 1} before`} className="object-contain p-6" sizes="100vw" priority={chapterIdx === 0} imageErrors={imageErrors} handleImageError={handleImageError} />
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// LAYOUT B: Side-by-side comparison with After carousel (Drowsy-style text)
// ═══════════════════════════════════════════════════════════════════════════════
function LayoutB({ sample, beforeImage, afterImages, hasChapters, currentChapter, 
                   activeChapter, setActiveChapter, activeTab, setActiveTab,
                   imageErrors, handleImageError, isSquareAfter }: LayoutProps) {
  const [selectedAfterIndex, setSelectedAfterIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleNext = () => {
    setSelectedAfterIndex((prev) => (prev + 1) % afterImages.length);
  };

  const handlePrev = () => {
    setSelectedAfterIndex((prev) => (prev - 1 + afterImages.length) % afterImages.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrev();
    }
  };

  return (
    <main className="min-h-screen bg-vs-bgLight pt-28">
      {/* Brand Header */}
      <section className="site-container mb-12">
        <BrandHeader sample={sample} currentChapter={null} />
      </section>

      {/* Before/After Comparison Section */}
      <section className="site-container mb-16">
        {hasChapters && sample.chapters ? (
          // Render chapters stacked
          sample.chapters.map((chapter, chapterIdx) => (
            <ChapterCarousel 
              key={chapter.id} 
              chapter={chapter} 
              sample={sample} 
              chapterIdx={chapterIdx}
              isSquareAfter={isSquareAfter}
              imageErrors={imageErrors}
              handleImageError={handleImageError}
            />
          ))
        ) : (
          <>
        {/* Desktop: Side-by-side */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-6">
          {/* Before - Left */}
          <div className="flex flex-col">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-vs-text-body/50">
              Before
            </p>
            <div className="relative h-[500px] overflow-hidden rounded-2xl border-2 border-dashed border-black/10 bg-white shadow-soft">
              <ImageWithFallback 
                src={beforeImage} 
                alt={`${sample.name} before`} 
                className="object-contain p-4" 
                sizes="50vw" 
                priority 
                imageErrors={imageErrors} 
                handleImageError={handleImageError} 
              />
            </div>
          </div>

          {/* After - Right with Carousel */}
          <div className="flex flex-col">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-vs-accent">
              After
            </p>
            
            {/* Main After Image with Navigation and Thumbnails on Left */}
            <div className="relative h-[500px] flex gap-3 overflow-hidden rounded-2xl border border-black/5 bg-white shadow-soft">
              {/* Thumbnails - Left Side (Vertical Stack) */}
              <div className="flex-shrink-0 w-20 flex flex-col gap-2 justify-center p-2">
                {afterImages.slice(0, 4).map((src, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedAfterIndex(idx)}
                    className={`relative h-16 w-16 overflow-hidden rounded-lg border-2 transition-all flex-shrink-0 ${
                      selectedAfterIndex === idx
                        ? "border-vs-accent shadow-[0_0_8px_rgba(16,185,129,0.4)] scale-105"
                        : "border-transparent opacity-60 hover:opacity-100 hover:scale-105"
                    }`}
                  >
                    <ImageWithFallback 
                      src={src} 
                      alt={`Thumbnail ${idx + 1}`} 
                      className="object-cover" 
                      sizes="64px" 
                      imageErrors={imageErrors} 
                      handleImageError={handleImageError} 
                    />
                  </button>
                ))}
              </div>
              
              {/* Main Image - Right Side */}
              <div className="flex-1 relative overflow-hidden">
                {/* Arrow Buttons */}
                <button
                  onClick={handlePrev}
                  className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg transition-all hover:bg-white hover:shadow-xl"
                  aria-label="Previous image"
                >
                  <svg className="h-5 w-5 text-vs-text-strong" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg transition-all hover:bg-white hover:shadow-xl"
                  aria-label="Next image"
                >
                  <svg className="h-5 w-5 text-vs-text-strong" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Main Image - Full Height */}
                <ImageWithFallback 
                  src={afterImages[selectedAfterIndex]} 
                  alt={`${sample.name} after ${selectedAfterIndex + 1}`} 
                  className="object-contain p-4" 
                  sizes="calc(50vw - 100px)" 
                  priority={selectedAfterIndex < 2}
                  imageErrors={imageErrors} 
                  handleImageError={handleImageError} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: Swipeable After Images */}
        <div className="lg:hidden">
          <p className="mb-4 text-center text-sm font-semibold uppercase tracking-[0.2em] text-vs-accent">
            After
          </p>
          
          {/* Swipeable After Carousel */}
          <div 
            className="relative overflow-hidden rounded-2xl border border-black/5 bg-white shadow-soft"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${selectedAfterIndex * 100}%)` }}
            >
              {afterImages.slice(0, 4).map((src, idx) => (
                <div key={idx} className="min-w-full flex-shrink-0">
                  <div className={`relative ${isSquareAfter ? "aspect-square" : "aspect-[4/5]"}`}>
                    <ImageWithFallback 
                      src={src} 
                      alt={`${sample.name} after ${idx + 1}`} 
                      className="object-contain p-4" 
                      sizes="100vw" 
                      priority={idx < 2}
                      imageErrors={imageErrors} 
                      handleImageError={handleImageError} 
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
              {afterImages.slice(0, 4).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedAfterIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    selectedAfterIndex === idx
                      ? "w-8 bg-vs-accent"
                      : "w-2 bg-white/60"
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          </div>


          {/* Before - Below on Mobile */}
          <div className="mt-12">
            <p className="mb-4 text-center text-sm font-semibold uppercase tracking-[0.2em] text-vs-text-body/50">
              Before
            </p>
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border-2 border-dashed border-black/10 bg-white shadow-soft">
              <ImageWithFallback 
                src={beforeImage} 
                alt={`${sample.name} before`} 
                className="object-contain p-6" 
                sizes="100vw" 
                priority
                imageErrors={imageErrors} 
                handleImageError={handleImageError} 
              />
            </div>
          </div>
        </div>
          </>
        )}
      </section>
      
    </main>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// LAYOUT C: Horizontal row (Before + 4 After in a single row)
// ═══════════════════════════════════════════════════════════════════════════════
function LayoutC({ sample, beforeImage, afterImages, hasChapters, currentChapter, 
                   activeChapter, setActiveChapter, activeTab, setActiveTab,
                   imageErrors, handleImageError, isSquareAfter }: LayoutProps) {
  return (
    <main className="min-h-screen bg-vs-bgLight pt-28">
      {/* Brand Header */}
      <section className="site-container mb-6">
        <BrandHeader sample={sample} currentChapter={null} />
      </section>

      {hasChapters && sample.chapters ? (
        // Render chapters stacked
        sample.chapters.map((chapter, chapterIdx) => (
          <div key={chapter.id} className={chapterIdx > 0 ? "mt-16" : ""}>
            {/* After Images Row */}
            <section className="mb-12 overflow-x-auto px-4 sm:px-8 lg:px-12">
              <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-vs-accent">After</p>
              <div className="flex gap-4 pb-4" style={{ minWidth: "max-content" }}>
                {chapter.after.slice(0, 4).map((src, idx) => (
                  <div key={idx} className="flex-shrink-0" style={{ width: "220px" }}>
                    <div className={`relative overflow-hidden rounded-2xl border border-black/5 bg-white shadow-soft transition-all hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] ${isSquareAfter ? "aspect-square" : "aspect-[4/5]"}`}>
                      <ImageWithFallback src={src} alt={`${sample.name} chapter ${chapterIdx + 1} after ${idx + 1}`} className="object-contain p-3" sizes="220px" priority={chapterIdx === 0 && idx < 2} imageErrors={imageErrors} handleImageError={handleImageError} />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Before */}
            <section className="site-container mb-16">
              <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-vs-text-body/50">Before</p>
              <div className="mx-auto max-w-2xl">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border-2 border-dashed border-black/10 bg-white">
                  <ImageWithFallback src={chapter.before} alt={`${sample.name} chapter ${chapterIdx + 1} before`} className="object-contain p-6" sizes="(max-width: 768px) 100vw, 672px" priority={chapterIdx === 0} imageErrors={imageErrors} handleImageError={handleImageError} />
                </div>
              </div>
            </section>
          </div>
        ))
      ) : (
        <>
          {/* After Images Row - First! */}
          <section className="mb-12 overflow-x-auto px-4 sm:px-8 lg:px-12">
            <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-vs-accent">After</p>
            <div className="flex gap-4 pb-4" style={{ minWidth: "max-content" }}>
              {afterImages.slice(0, 4).map((src, idx) => (
                <div key={idx} className="flex-shrink-0" style={{ width: "220px" }}>
                  <div className={`relative overflow-hidden rounded-2xl border border-black/5 bg-white shadow-soft transition-all hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] ${isSquareAfter ? "aspect-square" : "aspect-[4/5]"}`}>
                    <ImageWithFallback src={src} alt={`${sample.name} after ${idx + 1}`} className="object-contain p-3" sizes="220px" priority={idx < 2} imageErrors={imageErrors} handleImageError={handleImageError} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Before - Below */}
          <section className="site-container mb-16">
            <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-vs-text-body/50">Before</p>
            <div className="mx-auto max-w-2xl">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border-2 border-dashed border-black/10 bg-white">
                <ImageWithFallback src={beforeImage} alt={`${sample.name} before`} className="object-contain p-6" sizes="(max-width: 768px) 100vw, 672px" priority imageErrors={imageErrors} handleImageError={handleImageError} />
              </div>
            </div>
          </section>
        </>
      )}
      
    </main>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// LAYOUT D: Magazine style (Large before hero, info overlay, after gallery)
// ═══════════════════════════════════════════════════════════════════════════════
function LayoutD({ sample, beforeImage, afterImages, hasChapters, currentChapter, 
                   activeChapter, setActiveChapter, activeTab, setActiveTab,
                   imageErrors, handleImageError, isSquareAfter }: LayoutProps) {
  return (
    <main className="min-h-screen bg-vs-bgDark pt-24">
      {/* Back Link */}
      <div className="site-container py-6">
        <Link href="/library" className="inline-flex items-center gap-2 text-base font-medium text-white/70 hover:text-vs-accent transition-colors">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Library
        </Link>
      </div>

      {/* Info Card Header */}
      <section className="site-container mb-12 pt-8">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-[#0a0a0a] p-8 shadow-2xl sm:p-12">
          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2">
            {sample.categories.map((cat) => (
              <span key={cat} className="rounded-full bg-vs-accent/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-vs-accent">
                {cat}
              </span>
            ))}
          </div>
          
          <h1 className="mt-6 text-center text-4xl font-semibold text-white sm:text-5xl">{sample.name}</h1>
          <p className="mt-2 text-center text-lg text-white/50">{sample.industry}</p>
          <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-white/70">{sample.description}</p>
        </div>
      </section>

      {hasChapters && sample.chapters ? (
        // Render chapters stacked
        sample.chapters.map((chapter, chapterIdx) => (
          <div key={chapter.id}>
            {/* After Gallery */}
            <section className="bg-vs-bgLight py-16">
              <div className="site-container">
                <p className="mb-8 text-center text-sm font-semibold uppercase tracking-[0.3em] text-vs-accent">After</p>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                  {chapter.after.slice(0, 4).map((src, idx) => (
                    <div key={idx} className={`relative overflow-hidden rounded-2xl border border-black/5 bg-white shadow-soft transition-all hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] ${isSquareAfter ? "aspect-square" : "aspect-[4/5]"}`}>
                      <ImageWithFallback src={src} alt={`${sample.name} chapter ${chapterIdx + 1} after ${idx + 1}`} className="object-contain p-4" sizes="(max-width: 640px) 100vw, 50vw" priority={chapterIdx === 0 && idx < 2} imageErrors={imageErrors} handleImageError={handleImageError} />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Before Section */}
            <section className="relative bg-vs-bgDark py-16">
              <div className="site-container">
                <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.3em] text-white/40">Before</p>
                <div className="relative mx-auto max-w-4xl">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/10 bg-black/50">
                    <ImageWithFallback src={chapter.before} alt={`${sample.name} chapter ${chapterIdx + 1} before`} className="object-contain p-8" sizes="(max-width: 1024px) 100vw, 1024px" priority={chapterIdx === 0} imageErrors={imageErrors} handleImageError={handleImageError} />
                  </div>
                </div>
              </div>
            </section>
          </div>
        ))
      ) : (
        <>
          {/* After Gallery - First! */}
          <section className="bg-vs-bgLight py-16">
            <div className="site-container">
              <p className="mb-8 text-center text-sm font-semibold uppercase tracking-[0.3em] text-vs-accent">After</p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                {afterImages.slice(0, 4).map((src, idx) => (
                  <div key={idx} className={`relative overflow-hidden rounded-2xl border border-black/5 bg-white shadow-soft transition-all hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] ${isSquareAfter ? "aspect-square" : "aspect-[4/5]"}`}>
                    <ImageWithFallback src={src} alt={`${sample.name} after ${idx + 1}`} className="object-contain p-4" sizes="(max-width: 640px) 100vw, 50vw" priority={idx < 2} imageErrors={imageErrors} handleImageError={handleImageError} />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Hero Before Section - Below */}
          <section className="relative bg-vs-bgDark py-16">
            <div className="site-container">
              <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.3em] text-white/40">Before</p>
              <div className="relative mx-auto max-w-4xl">
                <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/10 bg-black/50">
                  <ImageWithFallback src={beforeImage} alt={`${sample.name} before`} className="object-contain p-8" sizes="(max-width: 1024px) 100vw, 1024px" priority imageErrors={imageErrors} handleImageError={handleImageError} />
                </div>
              </div>
            </div>
          </section>
        </>
      )}
      
    </main>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// LAYOUT E: Split comparison (Before/After with visual comparison)
// ═══════════════════════════════════════════════════════════════════════════════
function LayoutE({ sample, beforeImage, afterImages, hasChapters, currentChapter, 
                   activeChapter, setActiveChapter, activeTab, setActiveTab,
                   imageErrors, handleImageError, isSquareAfter }: LayoutProps) {
  const [selectedAfter, setSelectedAfter] = useState(0);
  
  return (
    <main className="min-h-screen bg-vs-bgLight pt-28">
      {/* Header Bar */}
      <div className="site-container mb-8">
      </div>

      {/* Brand Header - Compact */}
      <section className="site-container mb-6">
        <div className="text-center relative">
          <div className="flex flex-wrap justify-center gap-2 relative">
            {/* Back Button - Positioned on same line as categories, aligned with logo V center (hidden on mobile) */}
            <Link
              href="/library"
              className="hidden md:flex absolute left-0 items-center justify-center w-10 h-10 rounded-full bg-black text-white hover:bg-black/80 transition-colors"
              aria-label="Back to Library"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            {sample.categories.map((cat) => (
              <span key={cat} className="rounded-full bg-vs-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-vs-accent">
                {cat}
              </span>
            ))}
          </div>
          <h1 className="mt-4 text-4xl font-semibold text-vs-text-strong sm:text-5xl">{sample.name}</h1>
          <p className="mt-2 text-lg text-vs-text-body/60">{sample.industry}</p>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-vs-text-body">{sample.description}</p>
        </div>
      </section>

      {hasChapters && sample.chapters ? (
        // Render chapters stacked
        sample.chapters.map((chapter, chapterIdx) => (
          <div key={chapter.id} className={chapterIdx > 0 ? "mt-16" : ""}>
            {/* After Grid */}
            <section className="site-container mb-12">
              <p className="mb-6 text-center text-sm font-semibold uppercase tracking-[0.3em] text-vs-accent">After</p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                {chapter.after.slice(0, 4).map((src, idx) => (
                  <div key={idx} className={`relative overflow-hidden rounded-2xl border border-black/5 bg-white shadow-soft transition-all hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] ${isSquareAfter ? "aspect-square" : "aspect-[4/5]"}`}>
                    <ImageWithFallback src={src} alt={`${sample.name} chapter ${chapterIdx + 1} after ${idx + 1}`} className="object-contain p-4" sizes="(max-width: 640px) 100vw, 50vw" priority={chapterIdx === 0 && idx < 2} imageErrors={imageErrors} handleImageError={handleImageError} />
                  </div>
                ))}
              </div>
            </section>

            {/* Before */}
            <section className="site-container mb-12">
              <p className="mb-6 text-center text-sm font-semibold uppercase tracking-[0.3em] text-vs-text-body/50">Before</p>
              <div className="mx-auto max-w-2xl">
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border-2 border-dashed border-black/10 bg-white shadow-soft">
                  <ImageWithFallback src={chapter.before} alt={`${sample.name} chapter ${chapterIdx + 1} before`} className="object-contain p-6" sizes="(max-width: 768px) 100vw, 672px" priority={chapterIdx === 0} imageErrors={imageErrors} handleImageError={handleImageError} />
                </div>
              </div>
            </section>
          </div>
        ))
      ) : (
        <>
          {/* After Grid - First! */}
          <section className="site-container mb-12">
            <p className="mb-6 text-center text-sm font-semibold uppercase tracking-[0.3em] text-vs-accent">After</p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
              {afterImages.slice(0, 4).map((src, idx) => (
                <div key={idx} className={`relative overflow-hidden rounded-2xl border border-black/5 bg-white shadow-soft transition-all hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] ${isSquareAfter ? "aspect-square" : "aspect-[4/5]"}`}>
                  <ImageWithFallback src={src} alt={`${sample.name} after ${idx + 1}`} className="object-contain p-4" sizes="(max-width: 640px) 100vw, 50vw" priority={idx < 2} imageErrors={imageErrors} handleImageError={handleImageError} />
                </div>
              ))}
            </div>
          </section>

          {/* Before - Below */}
          <section className="site-container mb-12">
            <p className="mb-6 text-center text-sm font-semibold uppercase tracking-[0.3em] text-vs-text-body/50">Before</p>
            <div className="mx-auto max-w-2xl">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border-2 border-dashed border-black/10 bg-white shadow-soft">
                <ImageWithFallback src={beforeImage} alt={`${sample.name} before`} className="object-contain p-6" sizes="(max-width: 768px) 100vw, 672px" priority imageErrors={imageErrors} handleImageError={handleImageError} />
              </div>
            </div>
          </section>
        </>
      )}
      
    </main>
  );
}
