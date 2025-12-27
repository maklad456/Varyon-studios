import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies } from "@/data/varyonContent";
import { caseStudyDetails } from "@/data/caseStudyDetails";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const study = caseStudies.find((item) => item.slug === params.slug);
  if (!study) {
    return {};
  }
  return {
    title: `${study.name} Case Study | Varyon Studios`,
    description: study.summary || `${study.problem} — ${study.approach}`,
  };
}

export default function CaseStudyDetail({ params }: { params: { slug: string } }) {
  const study = caseStudies.find((item) => item.slug === params.slug);
  if (!study) {
    notFound();
  }

  const detail = caseStudyDetails[params.slug];

  return (
    <main className="min-h-screen bg-vs-bgLight pt-28">
      {/* Back Link */}
      <div className="site-container py-6">
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-2 text-base font-medium text-vs-text-body hover:text-vs-accent transition-colors"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to all case studies
        </Link>
      </div>

      {/* Header */}
      <section className="site-container mb-12">
        <div className="text-center relative">
          {/* Back Button - Desktop only, positioned on same line as title */}
          <Link
            href="/case-studies"
            className="hidden md:flex absolute left-0 items-center justify-center w-10 h-10 rounded-full bg-black text-white hover:bg-black/80 transition-colors"
            aria-label="Back to all case studies"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>

          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vs-text-body/70">
            Client story
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-vs-text-strong sm:text-5xl">
            {study.name}
          </h1>
          <p className="mt-2 text-lg text-vs-text-body/60">{study.tag}</p>
          {detail && (
            <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-vs-text-body">
              {detail.summary}
            </p>
          )}
        </div>
      </section>

      {/* Content Sections */}
      <section className="site-container mb-12">
        <div className="mx-auto max-w-4xl space-y-12">
          {/* Problem */}
          {detail && (
            <>
              <div>
                <h2 className="text-2xl font-semibold text-vs-text-strong mb-4">Problem</h2>
                <div className="text-base leading-relaxed text-vs-text-body whitespace-pre-line">
                  {detail.problem}
                </div>
              </div>

              {/* What we did */}
              <div>
                <h2 className="text-2xl font-semibold text-vs-text-strong mb-4">What we did</h2>
                <div className="text-base leading-relaxed text-vs-text-body whitespace-pre-line">
                  {detail.whatWeDid}
                </div>
              </div>

              {/* Deliverables */}
              <div>
                <h2 className="text-2xl font-semibold text-vs-text-strong mb-4">
                  Deliverables (what was shipped)
                </h2>
                <div className="text-base leading-relaxed text-vs-text-body whitespace-pre-line mb-6">
                  {detail.deliverables}
                </div>

                {/* Image Placeholders */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
                  {detail.imagePlaceholders.map((label, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-black/5 bg-vs-bgLight"
                    >
                      <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-vs-accent/10 to-vs-accent/5 p-4">
                        <span className="text-xs font-medium text-vs-text-body/60 text-center">
                          {label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Outcome */}
              <div>
                <h2 className="text-2xl font-semibold text-vs-text-strong mb-4">Outcome</h2>
                <div className="text-base leading-relaxed text-vs-text-body whitespace-pre-line">
                  {detail.outcome}
                </div>
              </div>
            </>
          )}

          {/* Fallback for case studies without detailed content */}
          {!detail && (
            <div className="space-y-6 text-base text-vs-text-body">
              <div>
                <h2 className="text-xl font-semibold text-vs-text-strong">Problem</h2>
                <p className="mt-2">{study.problem}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-vs-text-strong">What we did</h2>
                <p className="mt-2">{study.approach}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-vs-text-strong">Outcome</h2>
                <p className="mt-2">{study.outcome}</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
