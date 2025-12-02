"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { caseStudies } from "@/data/varyonContent";
import { trackEvent } from "@/lib/analytics";

export function CaseStudiesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    let fired = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !fired) {
            trackEvent("case_studies_view");
            fired = true;
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="case-studies" ref={sectionRef} className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vs-text-body/70">
          Client stories
        </p>
        <h2 className="mt-4 text-3xl font-semibold text-vs-text-strong sm:text-[40px]">
          Three brands, three very different problems.
        </h2>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {caseStudies.map((study) => (
            <article key={study.slug} className="rounded-3xl border border-black/5 bg-vs-bgLight p-6 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vs-accent">{study.tag}</p>
              <h3 className="mt-3 text-xl font-semibold text-vs-text-strong">{study.name}</h3>
              <p className="mt-4 text-sm font-semibold text-vs-text-body/70">Problem</p>
              <p className="text-sm text-vs-text-body">{study.problem}</p>
              <p className="mt-4 text-sm font-semibold text-vs-text-body/70">What we did</p>
              <p className="text-sm text-vs-text-body">{study.approach}</p>
              <p className="mt-4 text-sm font-semibold text-vs-text-body/70">Outcome</p>
              <p className="text-sm text-vs-text-body">{study.outcome}</p>
              <Link
                href={`/case-studies/${study.slug}`}
                className="mt-6 inline-flex items-center text-sm font-semibold text-vs-accent"
              >
                View project →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
