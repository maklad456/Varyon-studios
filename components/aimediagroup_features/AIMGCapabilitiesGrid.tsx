"use client";

import { motion } from "framer-motion";

const capabilities = [
  {
    kicker: "Signal Graph",
    title: "Unified intelligence layer",
    body: "Ingest first-party, paid, CRM, and product telemetry to expose profitable cohorts daily.",
  },
  {
    kicker: "Creative OS",
    title: "AI-assisted production",
    body: "Asset briefs autopopulate from learnings, keeping design and copy synced with performance.",
  },
  {
    kicker: "Ops Suite",
    title: "Automation & QA",
    body: "Workflow bots triage approvals, trafficking, and compliance so your talent works on insights not tickets.",
  },
];

export function AIMGCapabilitiesGrid() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="rounded-3xl bg-gray-50 px-6 py-10 md:px-10 md:py-14 lg:px-12 lg:py-16"
    >
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
            Capabilities
          </p>
          <h3 className="mt-4 text-3xl font-semibold text-text_primary md:text-[2.15rem]">
            Our technology + services stack scales with you.
          </h3>
          <p className="mt-4 text-base text-text_muted md:text-lg">
            Whether you run an agile in-house team or a distributed revops org, each capability slots into your existing workflows.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-gray-700">
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-accent_orange" />
              Live KPI bridge mapped to every executive objective.
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-accent_pink" />
              Secure clean-room ready integrations across walled gardens.
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-accent_tkf_yellow" />
              Pods available across paid social, programmatic, SEO, and CRO.
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          {capabilities.map((capability) => (
            <article
              key={capability.title}
              className="rounded-2xl border border-white/70 bg-white p-6 shadow-[0_14px_30px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(15,23,42,0.15)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
                {capability.kicker}
              </p>
              <h4 className="mt-2 text-xl font-semibold text-text_primary">{capability.title}</h4>
              <p className="mt-2 text-sm text-gray-600">{capability.body}</p>
            </article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
