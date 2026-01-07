import Link from "next/link";
import type { Metadata } from "next";
import { caseStudies } from "@/data/varyonContent";
import { CaseStudiesHubClient } from "./CaseStudiesHubClient";

export const metadata: Metadata = {
  title: "Case Studies | Varyon Studios",
  description: "Deep, technical breakdowns of how we build systems that scale.",
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
            Case studies
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            Deep, technical breakdowns of how we build systems that scale.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="site-section">
        <div className="site-container">
          <CaseStudiesHubClient caseStudies={caseStudies} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="site-section bg-vs-bgDark py-12 md:py-6">
        <div className="site-container text-center">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">
            Ready for your transformation?
          </h2>
          <p className="mt-4 text-base text-white/70">
            Let&apos;s discuss how we can elevate your brand visuals.
          </p>
          <Link href="/#discovery" className="btn-primary mt-8">
            Connect with us
          </Link>
        </div>
      </section>
    </main>
  );
}
