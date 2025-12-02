import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies } from "@/data/varyonContent";

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
    description: `${study.problem} — ${study.approach}`,
  };
}

export default function CaseStudyDetail({ params }: { params: { slug: string } }) {
  const found = caseStudies.find((item) => item.slug === params.slug);
  if (!found) {
    notFound();
  }
  const study = found;

  return (
    <article className="bg-vs-bgLight py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vs-text-body/70">Client story</p>
        <h1 className="mt-4 text-4xl font-semibold text-vs-text-strong">{study.name}</h1>
        <p className="mt-2 text-sm uppercase tracking-[0.3em] text-vs-accent">{study.tag}</p>

        <section className="mt-8 space-y-4 text-base text-vs-text-body">
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
        </section>
        <Link className="mt-10 inline-flex items-center text-sm font-semibold text-vs-accent" href="/case-studies">
          ← Back to all case studies
        </Link>
      </div>
    </article>
  );
}
