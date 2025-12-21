"use client";

import { motion } from "framer-motion";

export function ResultMetric({
  label,
  value,
  suffix,
  delay = 0,
}: {
  label: string;
  value: string;
  suffix?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.4, delay }}
      className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-soft"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-accent_orange">
        {value}
        {suffix && <span className="text-lg font-semibold text-gray-700">{suffix}</span>}
      </p>
    </motion.div>
  );
}



