"use client";

import { motion } from "framer-motion";
import { MetricCard } from "./MetricCard";

const highlights = [
  {
    label: "Average ROI",
    value: "4.2x",
    helper: "Median across multi-channel programs post-onboarding.",
  },
  {
    label: "CAC Reduction",
    value: "-32%",
    helper: "Realized within the first 60 days of systemizing spend.",
  },
  {
    label: "LTV Increase",
    value: "+48%",
    helper: "Retention rituals plus pricing workstreams lift customer value.",
  },
];

export function MetricsHighlights() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="mb-10 grid gap-4 md:grid-cols-3"
    >
      {highlights.map((highlight) => (
        <MetricCard
          key={highlight.label}
          label={highlight.label}
          value={highlight.value}
          helper={highlight.helper}
        />
      ))}
    </motion.div>
  );
}

