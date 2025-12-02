"use client";

import { processSteps } from "@/data/varyonContent";

export function ProcessSection() {
  return (
    <section id="process" className="bg-vs-bgLight py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vs-text-body/70">Process</p>
        <h2 className="mt-4 text-3xl font-semibold text-vs-text-strong sm:text-[40px]">
          From a few phone photos to a full campaign.
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {processSteps.map((step, index) => (
            <article key={step.title} className="rounded-3xl bg-white p-6 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vs-accent">Step {index + 1}</p>
              <h3 className="mt-3 text-xl font-semibold text-vs-text-strong">{step.title}</h3>
              <p className="mt-2 text-sm text-vs-text-body">{step.body}</p>
            </article>
          ))}
        </div>
        <button
          onClick={() => document.querySelector("#case-studies")?.scrollIntoView({ behavior: "smooth" })}
          className="mt-8 text-sm font-semibold text-vs-accent underline-offset-4 hover:underline"
        >
          See client stories
        </button>
      </div>
    </section>
  );
}
