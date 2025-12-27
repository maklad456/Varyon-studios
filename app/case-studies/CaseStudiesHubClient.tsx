"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { caseStudies, type CaseStudy } from "@/data/varyonContent";
import { trackEvent } from "@/lib/analytics";

export function CaseStudiesHubClient({ caseStudies }: { caseStudies: CaseStudy[] }) {
  useEffect(() => {
    trackEvent("case_studies_hub_view");
  }, []);

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {caseStudies.map((study) => (
        <CaseStudyCard key={study.slug} study={study} />
      ))}
    </div>
  );
}

function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className="group block overflow-hidden rounded-3xl border border-black/5 bg-white shadow-soft transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]"
      onClick={() => trackEvent("case_study_card_click", { slug: study.slug })}
    >
      {/* Cover Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-vs-bgLight">
        {study.slug === "discovery-homes" ? (
          <Image
            src="/case-studies/discovery-homes/hero-image.webp"
            alt={study.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : study.slug === "mehos" ? (
          <Image
            src="/case-studies/mehos/mehos1.webp"
            alt={study.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : study.slug === "woodworkers" ? (
          <Image
            src="/case-studies/woodworkers/wood6.webp"
            alt={study.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : study.slug === "zee-plexiglass-designs" ? (
          <Image
            src="/case-studies/zee-plexiglass-designs/plexi7.webp"
            alt={study.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-vs-accent/10 to-vs-accent/5">
            <span className="text-sm font-medium text-vs-text-body/40">4:5 placeholder</span>
          </div>
        )}
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <div className="absolute bottom-3 right-3 opacity-0 transition-all group-hover:opacity-100">
          <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-vs-text-strong">
            View →
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Industry Tag */}
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vs-accent">
          {study.tag}
        </p>

        {/* Name */}
        <h3 className="mt-4 text-xl font-semibold text-vs-text-strong group-hover:text-vs-accent transition-colors">
          {study.name}
        </h3>

        {/* View Project Link */}
        <p className="mt-4 text-sm font-medium text-vs-text-body/60">
          View project
        </p>
      </div>
    </Link>
  );
}

