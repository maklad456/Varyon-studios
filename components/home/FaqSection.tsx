"use client";

import { useState } from "react";
import { faqItems } from "@/data/varyonContent";
import { trackEvent } from "@/lib/analytics";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
    trackEvent("faq_toggle", { index });
  };

  return (
    <section id="faq" className="site-section bg-white scroll-mt-24">
      <div className="site-container">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vs-text-body/70">FAQ</p>
        <h2 className="mt-4 text-3xl font-semibold leading-tight text-vs-text-strong sm:text-4xl sm:leading-tight">Questions that come up a lot.</h2>
        <div className="mt-8 space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.question} className="rounded-3xl border border-black/5 bg-vs-bgLight p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                <button
                  className="flex w-full items-center justify-between gap-8 text-left"
                  onClick={() => handleToggle(index)}
                >
                  <span className="text-lg font-semibold leading-tight text-vs-text-strong">{item.question}</span>
                  <span className={`inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border ${isOpen ? "border-vs-accent text-vs-accent" : "border-vs-text-body/30 text-vs-text-body"}`}>
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && <p className="mt-4 text-sm leading-relaxed text-vs-text-body">{item.answer}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
