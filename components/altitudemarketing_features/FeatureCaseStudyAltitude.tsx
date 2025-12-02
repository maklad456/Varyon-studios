"use client";

import { motion } from "framer-motion";
import { CaseStudy } from "@/data/caseStudies/altitudeCaseStudies";
import { CollapsePanel } from "./CollapsePanel";
import { ResultMetric } from "./ResultMetric";

export function FeatureCaseStudyAltitude({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <article id="feature-case-study" className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-0">
      <motion.header
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">Altitude Case Study</p>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent_orange">
              {caseStudy.industryLabel}
            </p>
            <h1 className="mt-3 text-3xl font-bold text-gray-900">{caseStudy.title}</h1>
            <p className="mt-4 text-base text-gray-600">{caseStudy.summary}</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-6 text-center shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-500">
              {caseStudy.clientName}
            </p>
            <p className="mt-4 text-2xl font-semibold text-gray-900">Trusted partner since 2021</p>
            <p className="mt-2 text-sm text-gray-500">Brand • Demand • RevOps</p>
          </div>
        </div>
      </motion.header>

      <div className="mt-12 grid gap-10 md:grid-cols-2">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-500">
            {caseStudy.challenge.heading}
          </h3>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-gray-700">
            {caseStudy.challenge.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </motion.section>

        <CollapsePanel heading={caseStudy.solution.heading} paragraphs={caseStudy.solution.body} />
      </div>

      <section className="mt-12 rounded-3xl bg-neutral_light p-6">
        <div className="grid gap-6 sm:grid-cols-3">
          {caseStudy.metrics.map((metric, index) => (
            <ResultMetric
              key={metric.label}
              label={metric.label}
              value={metric.value}
              suffix={metric.suffix}
              delay={index * 0.1}
            />
          ))}
        </div>
      </section>

      <footer className="mt-12 border-t border-gray-200 pt-8">
        <p className="text-base font-semibold text-gray-900">
          Want to see the full Daelight blueprint?
        </p>
        <p className="mt-2 text-sm text-gray-600">
          We’ll walk you through the challenge, how we operationalized the solution, and the exact dashboards their CRO uses today.
        </p>
        <button className="mt-6 rounded-full bg-accent_orange px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-accent_orange_alt">
          Talk to our team
        </button>
      </footer>
    </article>
  );
}

