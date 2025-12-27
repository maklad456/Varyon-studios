"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { caseStudies } from "@/data/varyonContent";
import { trackEvent } from "@/lib/analytics";

const WHATSAPP_URL =
  "https://wa.me/201116001400?text=Hi%20Varyon%20Studios,%20I%27d%20love%20to%20see%20a%20free%20sample%20for%20my%20brand.";

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
          Four brands. Four different production problems. One strategy-first pipeline.
        </h2>

        {/* CTA Row */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/case-studies"
            className="btn-primary"
            onClick={() => trackEvent("case_studies_cta_click", { type: "view_all" })}
          >
            View all case studies
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary"
            onClick={() => trackEvent("case_studies_cta_click", { type: "free_sample" })}
          >
            Get your free sample
          </a>
        </div>

        {/* Card Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {caseStudies.map((study) => (
            <Link
              key={study.slug}
              href={`/case-studies/${study.slug}`}
              className="group block overflow-hidden rounded-3xl border border-black/5 bg-white shadow-soft transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]"
              onClick={() => trackEvent("case_study_card_click", { slug: study.slug })}
            >
              {/* Image Placeholder */}
              <div className="relative aspect-[4/5] overflow-hidden bg-vs-bgLight">
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-vs-accent/10 to-vs-accent/5">
                  <span className="text-sm font-medium text-vs-text-body/40">4:5 placeholder</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vs-accent">
                  {study.tag}
                </p>
                <h3 className="mt-4 text-xl font-semibold leading-tight text-vs-text-strong group-hover:text-vs-accent transition-colors">
                  {study.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-vs-text-body">
                  {study.summary}
                </p>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-vs-accent">
                  View case study →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
