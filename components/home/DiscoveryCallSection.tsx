"use client";

import { useState, type MouseEvent } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

export function DiscoveryCallSection() {
  const [position, setPosition] = useState({ x: 50, y: 50 });

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setPosition({ x, y });
  };

  const handleClick = () => {
    trackEvent("book_call_click", { location: "discovery" });
  };

  return (
    <section id="discovery" className="site-section bg-vs-bgLight hidden">
      <div className="site-container grid gap-8 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vs-accent-soft md:text-sm">
            Need to think bigger?
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-[1.05] text-black md:text-5xl">
            Planning a launch or campaign?
          </h2>
          <p className="mt-6 text-base leading-relaxed text-vs-text-body">
            If you&apos;re working on a new collection, campaign or rebrand, we can help you plan the visuals from day one — not just generate images at the end.
          </p>
          <Link
            href="/book-call"
            onClick={handleClick}
            className="btn-secondary mt-6 !border-vs-text-body/30 !text-vs-text-strong hover:!border-vs-text-strong"
          >
            Book a discovery call
          </Link>
        </div>
        <div className="relative h-80 overflow-hidden rounded-3xl border border-black/5 bg-white shadow-soft">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#E8FFF6,transparent_60%)]" />
          <div className="absolute inset-0" onMouseMove={handleMove}>
            <div
              className="pointer-events-none absolute h-12 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-vs-accent/40 blur-3xl transition-all"
              style={{ left: `${position.x}%`, top: `${position.y}%` }}
            />
            <div
              className="pointer-events-none absolute flex h-12 items-center justify-center rounded-full border border-vs-accent/60 bg-white/80 px-6 text-xs font-semibold uppercase tracking-[0.3em] text-vs-text-strong shadow-lg transition-all"
              style={{ left: `${position.x}%`, top: `${position.y}%`, transform: "translate(-50%, -50%)" }}
            >
              Launch beats
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
