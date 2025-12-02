"use client";

import { motion } from "framer-motion";

export function AIMGVideoBand() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="rounded-3xl bg-gray-900 px-6 py-10 text-white md:px-10 md:py-14 lg:px-12 lg:py-16"
    >
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">
            Watch what makes us different
          </p>
          <h3 className="text-3xl font-semibold leading-tight md:text-4xl">
            Orchestrating media, AI automation, and revenue ops in one command center.
          </h3>
          <p className="text-base text-gray-300 md:text-lg">
            Follow a live tour of the platform that lets revenue teams see creative learnings, channel pacing, and profitability on a single canvas.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white/20">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-gray-900">▶</span>
              Play explainer
            </button>
            <button className="text-sm font-semibold text-gray-300 underline-offset-4 transition hover:text-white">
              Download one pager
            </button>
          </div>
        </div>
        <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-gray-800 shadow-[0_25px_60px_rgba(0,0,0,0.45)]">
          <div className="relative aspect-video w-full bg-gradient-to-br from-gray-800 via-gray-900 to-black">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(237,109,112,0.5),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(249,227,122,0.35),transparent_40%)] opacity-80" />
            <div className="absolute inset-4 rounded-xl border border-white/15" />
            <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-white/10 p-3">
              <p className="text-sm font-semibold">Varyon Command // Session 12</p>
              <p className="text-xs text-gray-300">Live KPI bridge & AI-generated insights stream.</p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
