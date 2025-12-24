import Link from "next/link";
import type { Metadata } from "next";
import { caseStudies } from "@/data/varyonContent";

export const metadata: Metadata = {
  title: "Case Studies | Varyon Studios",
  description:
    "Dive deeper into Woodworkers, Zee Plexiglass Designs and Discovery Homes — three very different problems solved with AI product imagery.",
};

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-vs-bgLight">
      {/* Header */}
      <section className="bg-vs-bgDark text-white pt-28 pb-12">
        <div className="site-container pt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vs-accent">
            Case studies
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl sm:leading-tight">
            Work we can show publicly.
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/70 sm:text-lg">
            Each of these projects solved a wildly different problem — from showing modular homes that didn't exist yet to generating 1,500+ ecommerce images without a single studio day.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="site-section">
        <div className="site-container">
          <div className="mt-10 space-y-8">
          {caseStudies.map((study) => (
            <article key={study.slug} className="rounded-3xl border border-black/5 bg-white p-6 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vs-accent">{study.tag}</p>
              <h2 className="mt-3 text-2xl font-semibold text-vs-text-strong">{study.name}</h2>
              <div className="mt-4 space-y-3 text-sm text-vs-text-body">
                <p><strong>Problem:</strong> {study.problem}</p>
                <p><strong>What we did:</strong> {study.approach}</p>
                <p><strong>Outcome:</strong> {study.outcome}</p>
              </div>
              <Link href={`/case-studies/${study.slug}`} className="mt-4 inline-flex items-center text-sm font-semibold text-vs-accent">
                View full project →
              </Link>
            </article>
          ))}
          </div>
        </div>
      </section>
    </main>
  );
}
