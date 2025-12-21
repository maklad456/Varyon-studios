"use client";

import { MetricsHighlights } from "./MetricsHighlights";
import { RoiCalculatorPanel } from "./RoiCalculatorPanel";

export function FeatureMetrics() {
  return (
    <section id="feature-metrics" className="bg-white py-16 text-[#333]">
      <div className="mx-auto max-w-[880px] px-6">
        <header className="mb-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--mm-ink)]/60">
            Matrix Marketing Intelligence
          </p>
          <h2 className="mb-2 text-[1.9rem] font-bold text-[var(--mm-brand)] md:text-[2.1rem]">
            A metrics-first engine that proves ROI before you scale.
          </h2>
          <p className="mx-auto max-w-2xl text-base opacity-85 md:text-lg">
            Instrument every dollar across CAC, retention, and creative testing in one command center so your next scale decision already has proof.
          </p>
        </header>

        <MetricsHighlights />
        <RoiCalculatorPanel />
      </div>
    </section>
  );
}



