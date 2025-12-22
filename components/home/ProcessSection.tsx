"use client";

import { processSteps } from "@/data/varyonContent";

export function ProcessSection() {
  return (
    <section id="process" className="site-section bg-vs-bgLight scroll-mt-24">
      <div className="site-container">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vs-text-body/70">Process</p>
        <h2 className="mt-4 text-3xl font-semibold leading-tight text-vs-text-strong sm:text-4xl sm:leading-tight">
          From a few phone photos to a full campaign.
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {processSteps.map((step, index) => (
            <article key={step.title} className="rounded-3xl bg-white p-8 shadow-soft transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vs-accent">Step {index + 1}</p>
              <h3 className="mt-4 text-xl font-semibold leading-tight text-vs-text-strong">{step.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-vs-text-body">{step.body}</p>
            </article>
          ))}
        </div>
        <button
          onClick={() => document.querySelector("#case-studies")?.scrollIntoView({ behavior: "smooth" })}
          className="mt-6 text-sm font-semibold text-vs-accent underline-offset-4 hover:underline"
        >
          See client stories
        </button>
      </div>
    </section>
  );
}
