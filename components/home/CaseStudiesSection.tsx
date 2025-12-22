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
    <section id="case-studies" ref={sectionRef} className="site-section bg-white scroll-mt-24">
      <div className="site-container">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vs-text-body/70">
          Client stories
        </p>
        <h2 className="mt-4 text-3xl font-semibold leading-tight text-vs-text-strong sm:text-4xl sm:leading-tight">
          Three brands, three very different problems.
        </h2>

        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {caseStudies.map((study) => (
            <article key={study.slug} className="rounded-3xl border border-black/5 bg-vs-bgLight p-8 shadow-soft transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vs-accent">{study.tag}</p>
              <h3 className="mt-4 text-xl font-semibold leading-tight text-vs-text-strong">{study.name}</h3>
              <p className="mt-4 text-sm font-semibold text-vs-text-body/70">Problem</p>
              <p className="mt-2 text-sm leading-relaxed text-vs-text-body">{study.problem}</p>
              <p className="mt-4 text-sm font-semibold text-vs-text-body/70">What we did</p>
              <p className="mt-2 text-sm leading-relaxed text-vs-text-body">{study.approach}</p>
              <p className="mt-4 text-sm font-semibold text-vs-text-body/70">Outcome</p>
              <p className="mt-2 text-sm leading-relaxed text-vs-text-body">{study.outcome}</p>
              <Link
                href={`/case-studies/${study.slug}`}
                className="mt-8 inline-flex items-center text-sm font-semibold text-vs-accent"
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
