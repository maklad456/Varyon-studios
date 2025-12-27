"use client";

import { useState, useEffect, useRef } from "react";

const videoTypes = [
  {
    icon: "🎬",
    label: "Product demo",
    description: "Showcase product features and functionality in motion.",
  },
  {
    icon: "✨",
    label: "ASMR / texture",
    description: "Sensory-focused videos highlighting textures and details.",
  },
  {
    icon: "📚",
    label: "Educational",
    description: "How-to and instructional content that builds trust.",
  },
  {
    icon: "🎥",
    label: "Storytelling / launch teaser",
    description: "Narrative-driven videos that build anticipation and emotion.",
  },
  {
    icon: "🎨",
    label: "Motion graphics",
    description: "Animated graphics and text overlays for brand consistency.",
  },
];

export function VideoCapabilitySection() {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const videoIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-advance videos (every 5 seconds)
  useEffect(() => {
    videoIntervalRef.current = setInterval(() => {
      setDirection("right");
      setActiveVideoIndex((prev) => (prev + 1) % videoTypes.length);
    }, 5000);

    return () => {
      if (videoIntervalRef.current) {
        clearInterval(videoIntervalRef.current);
      }
    };
  }, []);

  // Restart auto-advance after manual navigation
  const restartAutoAdvance = () => {
    if (videoIntervalRef.current) {
      clearInterval(videoIntervalRef.current);
    }
    videoIntervalRef.current = setInterval(() => {
      setDirection("right");
      setActiveVideoIndex((prev) => (prev + 1) % videoTypes.length);
    }, 5000);
  };

  const handlePrevious = () => {
    setDirection("left");
    setActiveVideoIndex((prev) => (prev - 1 + videoTypes.length) % videoTypes.length);
    restartAutoAdvance();
  };

  const handleNext = () => {
    setDirection("right");
    setActiveVideoIndex((prev) => (prev + 1) % videoTypes.length);
    restartAutoAdvance();
  };

  const currentVideo = videoTypes[activeVideoIndex];

  return (
    <section className="site-section bg-white">
      <div className="site-container">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vs-text-body/70">
          What we can produce
        </p>
        <h2 className="mt-4 text-3xl font-semibold leading-tight text-vs-text-strong sm:text-4xl sm:leading-tight">
          Video (Shorts + Campaign)
        </h2>
        <p className="mt-4 text-base leading-relaxed text-vs-text-body sm:text-lg">
          Product-led motion assets with professional finishing (including sound cleanup when needed).
        </p>

        {/* Video Carousel */}
        <div className="relative mt-12 w-full">
          {/* Previous Arrow - Positioned at left edge */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white text-vs-text-strong shadow-sm transition-all hover:border-vs-accent hover:bg-vs-accent/10 md:h-14 md:w-14"
            aria-label="Previous video type"
          >
            <svg className="h-6 w-6 md:h-7 md:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Video Type Display - Centered */}
          <div className="relative mx-auto flex min-h-[200px] w-full max-w-md items-center justify-center overflow-hidden px-16 md:px-20">
            <div
              key={activeVideoIndex}
              className={`absolute flex w-full flex-col items-center justify-center text-center transition-all duration-500 ease-in-out ${
                direction === "right"
                  ? "animate-slide-in-right"
                  : "animate-slide-in-left"
              }`}
            >
              <div className="text-6xl mb-4 md:text-7xl">{currentVideo.icon}</div>
              <h3 className="text-2xl font-semibold text-vs-text-strong md:text-3xl">{currentVideo.label}</h3>
              <p className="mt-3 text-base leading-relaxed text-vs-text-body md:text-lg">
                {currentVideo.description}
              </p>
            </div>
          </div>

          {/* Next Arrow - Positioned at right edge */}
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white text-vs-text-strong shadow-sm transition-all hover:border-vs-accent hover:bg-vs-accent/10 md:h-14 md:w-14"
            aria-label="Next video type"
          >
            <svg className="h-6 w-6 md:h-7 md:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="mt-8 flex justify-center gap-2">
          {videoTypes.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > activeVideoIndex ? "right" : "left");
                setActiveVideoIndex(idx);
                restartAutoAdvance();
              }}
              className={`h-2 rounded-full transition-all ${
                idx === activeVideoIndex
                  ? "w-8 bg-vs-accent"
                  : "w-2 bg-black/20 hover:bg-black/40"
              }`}
              aria-label={`Go to ${videoTypes[idx].label}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

