"use client";

import { motion } from "framer-motion";

const cards = [
  {
    title: "AI-Driven Strategies",
    body: "Scenario planning engines score hundreds of media combinations and automatically surface the ones aligned to your CAC targets.",
    eyebrow: "Predictive Planning",
  },
  {
    title: "Guaranteed Performance",
    body: "Our compensation flexes with your outcomes. If benchmarks aren’t hit, we expand scope until they are.",
    eyebrow: "Aligned Incentives",
  },
  {
    title: "Trusted Partners",
    body: "Enterprise-grade tagging, privacy-by-design measurement, and partner ecosystem access from day one.",
    eyebrow: "Enterprise Ready",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export function AIMGCardCluster() {
  return (
    <div className="space-y-10">
      <div className="text-left">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent_orange">
          Why we&apos;re different
        </p>
        <h2 className="mt-3 text-3xl font-semibold leading-tight text-text_primary md:text-4xl">
          Full-stack media intelligence that feels bespoke for every stakeholder.
        </h2>
        <p className="mt-4 max-w-3xl text-base text-text_muted md:text-lg">
          We interlock data, creative, and automation stacks so your marketing organization can pivot in hours instead of quarters.
        </p>
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ staggerChildren: 0.1 }}
        className="grid gap-6 md:grid-cols-3"
      >
        {cards.map((card) => (
          <motion.article
            key={card.title}
            variants={cardVariants}
            whileHover={{ y: -6 }}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)]"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
              {card.eyebrow}
            </span>
            <h3 className="mt-3 text-xl font-semibold text-text_primary md:text-2xl">{card.title}</h3>
            <p className="mt-3 text-base text-gray-600">{card.body}</p>
          </motion.article>
        ))}
      </motion.div>
    </div>
  );
}
