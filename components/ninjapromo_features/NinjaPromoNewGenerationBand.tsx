"use client";

import { motion } from "framer-motion";

const metrics = [
  {
    value: "24h",
    label: "Average Turnaround",
    description: "From kickoff to the first deployable assets and experiments.",
  },
  {
    value: "50%+",
    label: "Creative Lift",
    description: "AI-assisted production kits double the number of ready concepts.",
  },
  {
    value: "$100k",
    label: "Annual Savings",
    description: "Hybrid pods cut traditional shoot + edit budgets dramatically.",
  },
  {
    value: "10",
    label: "Hours Reclaimed",
    description: "Ops automation gives your team back a full workday every week.",
  },
  {
    value: "30+",
    label: "On-tap Services",
    description: "Strategy, CRO, lifecycle, media, and AI labs ready when you are.",
  },
  {
    value: "1%",
    label: "Specialist Bench",
    description: "We retain a vetted network of creators and builders worldwide.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function NinjaPromoNewGenerationBand() {
  return (
    <section id="feature-new-generation" className="bg-neutral_dark py-24 text-white">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-center text-3xl font-bold md:text-4xl"
        >
          Meet the new generation of AI-powered media & marketing
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mx-auto mb-12 max-w-2xl text-center text-base text-gray-300 md:text-lg"
        >
          Pods fuse human judgment with proprietary AI assistants so messaging, creative, and media learning loops spin faster than the market.
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.08 }}
          className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {metrics.map((metric) => (
            <motion.div
              key={metric.label}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              className="rounded-[14px] border border-zinc-800 bg-zinc-900 px-6 py-6 shadow-soft_dark"
            >
              <span className="text-3xl font-extrabold text-accent_orange">{metric.value}</span>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-gray-300">
                {metric.label}
              </p>
              <p className="mt-2 text-xs text-gray-400">{metric.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

