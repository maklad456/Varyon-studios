"use client";

import { useState } from "react";

const timelineSteps = [
  {
    number: "01",
    title: "Discovery & Alignment",
    description: "We review your brand, audience, constraints, and goals.",
  },
  {
    number: "02",
    title: "Research & Benchmarking",
    description: "We analyze competitors and proven visual patterns for your market.",
  },
  {
    number: "03",
    title: "Visual System",
    description: "Lighting, environments, styling rules, shot list, consistency standards.",
  },
  {
    number: "04",
    title: "Samples & Direction Lock",
    description: "We send a sample set early to approve the direction before scaling.",
  },
  {
    number: "05",
    title: "Production",
    description: "AI image + video + design produced to the approved system.",
  },
  {
    number: "06",
    title: "Human Finishing",
    description: "Realism cleanup, lighting polish, compositing, enhancement.",
  },
  {
    number: "07",
    title: "Delivery Optimization",
    description: "Exported for web/ads/social sizes + controlled refinements.",
  },
];

export function ProcessSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleSteps = isExpanded ? timelineSteps : [timelineSteps[0]];

  return (
    <section id="process" className="site-section bg-vs-bgLight scroll-mt-24" data-section="process">
      <div className="site-container">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vs-text-body/70">Process</p>
        <h2 className="mt-4 text-3xl font-semibold leading-tight text-vs-text-strong sm:text-4xl sm:leading-tight">
          From a few phone photos to a full campaign.
        </h2>

        {/* Mobile: Vertical Timeline */}
        <div className="mt-12 lg:hidden">
          <ol className="space-y-6">
            {visibleSteps.map((step, index) => (
              <li key={step.number} className="relative flex gap-4">
                {/* Vertical Line */}
                {index < visibleSteps.length - 1 && (
                  <div className="absolute left-3 top-12 h-full w-0.5 bg-vs-accent/20" />
                )}
                
                {/* Number Badge */}
                <div className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-vs-accent text-sm font-bold text-white">
                  {step.number}
                </div>
                
                {/* Card */}
                <div className="flex-1 rounded-2xl border border-black/5 bg-white p-6 shadow-soft">
                  <h3 className="text-xl font-semibold text-vs-text-strong">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-vs-text-body">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
          
          {/* Expand/Collapse Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-vs-accent/30 bg-vs-accent/10 px-6 py-3 text-sm font-semibold text-vs-accent transition-all hover:bg-vs-accent/20"
            aria-label={isExpanded ? "Show less steps" : "Show all steps"}
          >
            <span>{isExpanded ? "Show less" : "Show all steps"}</span>
            <svg 
              className={`h-5 w-5 transition-transform ${isExpanded ? "rotate-180" : ""}`}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Desktop: 2-Row Grid with Connectors */}
        <div className="relative mt-12 hidden lg:block">
          {/* Top Row: 4 steps */}
          <div className="relative mb-16">
            {/* Connector Line - Top Row */}
            <div className="absolute left-0 right-0 top-6 h-0.5 bg-vs-accent/20" />
            
            <ol className="relative grid grid-cols-4 gap-4">
              {timelineSteps.slice(0, 4).map((step) => (
                <li key={step.number} className="flex flex-col items-center">
                  <div className="relative z-10 mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-vs-accent text-sm font-bold text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                    {step.number}
                  </div>
                  <div className="w-full rounded-2xl border border-black/5 bg-white p-6 shadow-soft transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                    <h3 className="text-xl font-semibold leading-tight text-vs-text-strong">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-vs-text-body">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          
          {/* Bottom Row: 3 steps (centered) */}
          <div className="relative">
            {/* Connector Line - Bottom Row */}
            <div className="absolute left-1/2 right-0 top-6 h-0.5 bg-vs-accent/20 -translate-x-1/2 max-w-3xl" />
            
            <ol className="relative grid grid-cols-3 gap-4 mx-auto max-w-3xl">
              {timelineSteps.slice(4, 7).map((step) => (
                <li key={step.number} className="flex flex-col items-center">
                  <div className="relative z-10 mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-vs-accent text-sm font-bold text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                    {step.number}
                  </div>
                  <div className="w-full rounded-2xl border border-black/5 bg-white p-6 shadow-soft transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                    <h3 className="text-xl font-semibold leading-tight text-vs-text-strong">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-vs-text-body">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
