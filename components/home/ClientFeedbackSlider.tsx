"use client";

import { useState, useEffect, useRef } from "react";

const testimonials = [
  { name: "Mariam S.", role: "E-commerce Manager", quote: "We replaced a full shoot week with a WhatsApp brief — and the assets looked like a global campaign." },
  { name: "Omar K.", role: "Brand Owner", quote: "The scenes actually matched our buyers. It didn't feel like generic AI — it felt like us." },
  { name: "Nour E.", role: "Performance Marketer", quote: "We shipped ad creatives in days, not weeks. And the results finally looked premium enough for paid." },
  { name: "Karim A.", role: "Product Lead", quote: "Fast, consistent, and scalable. We finally have a library we can build on — not random one-offs." },
  { name: "Salma M.", role: "Creative Director", quote: "The art direction was the difference. Materials, lighting, proportions — it looked like real photography." },
  { name: "Youssef H.", role: "Operations Manager", quote: "No logistics headaches. No back-and-forth with studios. Just clear iterations and delivery." },
  { name: "Dina R.", role: "Content & Social Lead", quote: "We used the outputs everywhere: website, reels, ads. Same brand feel across all formats." },
  { name: "Ahmed N.", role: "Commercial Manager", quote: "It looks expensive, but the process was simple. That's what surprised us most." },
  { name: "Farah T.", role: "Marketing Lead", quote: "They understood our taste quickly. After the first sample, it felt like we had a long-term partner." }
];

export default function ClientFeedbackSlider() {
  const [activeSetIndex, setActiveSetIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Group testimonials: 1 per set on mobile, 3 per set on desktop
  const getTestimonialSets = () => {
    const sets: typeof testimonials[] = [];
    const itemsPerSet = isMobile ? 1 : 3;
    for (let i = 0; i < testimonials.length; i += itemsPerSet) {
      sets.push(testimonials.slice(i, i + itemsPerSet));
    }
    return sets;
  };

  const testimonialSets = getTestimonialSets();
  const totalSets = testimonialSets.length;

  // Reset to first set when switching between mobile/desktop
  useEffect(() => {
    setActiveSetIndex(0);
  }, [isMobile]);

  // Auto-advance every 5 seconds
  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setDirection("right");
      setActiveSetIndex((prev) => (prev + 1) % totalSets);
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, totalSets]);

  // Pause when tab is hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPaused(document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const restartAutoAdvance = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setDirection("right");
        setActiveSetIndex((prev) => (prev + 1) % totalSets);
      }, 5000);
    }
  };


  const handlePrevious = () => {
    setDirection("left");
    setActiveSetIndex((prev) => (prev - 1 + totalSets) % totalSets);
    restartAutoAdvance();
  };

  const handleNext = () => {
    setDirection("right");
    setActiveSetIndex((prev) => (prev + 1) % totalSets);
    restartAutoAdvance();
  };

  const handleDotClick = (index: number) => {
    setDirection(index > activeSetIndex ? "right" : "left");
    setActiveSetIndex(index);
    restartAutoAdvance();
  };

  return (
    <section className="site-section bg-white py-16 md:py-20">
      <div className="site-container">
        {/* Header - Left aligned */}
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vs-accent-soft md:text-sm">
          CLIENT FEEDBACK
        </p>
        <h2 className="mt-4 text-3xl font-semibold leading-[1.05] text-black md:text-5xl">
          We make long-term partners.
          <br />
          Most clients come back for every launch.
        </h2>
        <p className="mt-6 text-base leading-relaxed text-vs-text-body md:text-lg">
          Because the output looks premium — and the process stays simple.
        </p>

        {/* Slider Container */}
        <div
          ref={containerRef}
          className="relative mt-12"
          onMouseEnter={() => !isMobile && setIsPaused(true)}
          onMouseLeave={() => !isMobile && setIsPaused(false)}
        >
          <div className="flex items-center gap-4">
            {/* Previous Arrow */}
            <button
              onClick={handlePrevious}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-vs-text-strong shadow-sm transition-all hover:border-vs-accent hover:bg-vs-accent/10 md:h-14 md:w-14"
              aria-label="Previous testimonials"
            >
              <svg className="h-6 w-6 md:h-7 md:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Slider Track */}
            <div className="relative flex-1 overflow-hidden">
              <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${activeSetIndex * 100}%)` }}>
                {testimonialSets.map((set, setIndex) => (
                  <div key={setIndex} className="grid min-w-full w-full shrink-0 grid-cols-1 gap-6 md:grid-cols-3">
                    {set.map((testimonial, cardIndex) => (
                      <div
                        key={`${setIndex}-${cardIndex}`}
                        className="flex flex-col items-center justify-center text-center rounded-2xl border border-black/5 bg-white p-6 min-h-[280px]"
                      >
                        <p className="text-lg leading-relaxed text-vs-text-body md:text-xl">
                          &ldquo;{testimonial.quote}&rdquo;
                        </p>
                        <div className="mt-4 border-t border-black/5 pt-4">
                          <p className="text-base font-semibold text-vs-text-strong md:text-lg">
                            {testimonial.name}
                          </p>
                          <p className="mt-1 text-sm text-vs-text-body/70 md:text-base">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Next Arrow */}
            <button
              onClick={handleNext}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-vs-text-strong shadow-sm transition-all hover:border-vs-accent hover:bg-vs-accent/10 md:h-14 md:w-14"
              aria-label="Next testimonials"
            >
              <svg className="h-6 w-6 md:h-7 md:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="mt-8 flex justify-center gap-2">
          {testimonialSets.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleDotClick(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === activeSetIndex
                  ? "w-8 bg-vs-accent"
                  : "w-2 bg-black/20 hover:bg-black/40"
              }`}
              aria-label={`Go to testimonial set ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
