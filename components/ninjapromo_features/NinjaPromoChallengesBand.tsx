"use client";

import { motion } from "framer-motion";

const challenges = [
  {
    quote: "We burned months inside retainers without seeing a single full-funnel plan.",
    response:
      "We map day-zero sprints, publish every deliverable in Notion, and log the signals we are reacting to so finance and leadership never wonder about status.",
  },
  {
    quote: "Subscription agencies sound great, but what am I actually getting each week?",
    response:
      "Each pod ships a transparent capacity board plus a rolling roadmap so you know what is in build, review, or launch before Monday begins.",
  },
  {
    quote: "Our last partner hid media fees and inflated results.",
    response:
      "We connect to your live dashboards, QA tracking ourselves, and report on incrementality not vanity metrics.",
  },
  {
    quote: "Long contracts make it hard to experiment quickly.",
    response:
      "Engage through 30-day modular scopes that can scale up or down as your initiatives shift.",
  },
  {
    quote: "We don’t have time to educate another vendor on our category.",
    response:
      "You work directly with strategists and builders who already shipped inside fintech, SaaS, and commerce teams.",
  },
  {
    quote: "Our channels are disconnected and messaging feels inconsistent.",
    response:
      "Brand, lifecycle, and acquisition pods collaborate in the same shared workspace so every touchpoint ladders to the same narrative.",
  },
  {
    quote: "Creative approvals are slowing everything down.",
    response:
      "Async reviews with Loom walk-throughs, annotated files, and AI-first production trims your review cycle to hours instead of days.",
  },
  {
    quote: "How do we protect the team’s time?",
    response:
      "We absorb channel ops, QA, and reporting. Your team focuses on insight and direction—not trafficking tickets.",
  },
  {
    quote: "We need flexibility for launches, not rigid scopes.",
    response:
      "Pods scale capacity around promos, raises, and product releases with surge sprints and weekend coverage when you need it most.",
  },
];

const card = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

export function NinjaPromoChallengesBand() {
  return (
    <section id="feature-challenges" className="bg-white py-20">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent_orange">
            Challenges before Varyon
          </p>
          <h3 className="mt-3 text-2xl font-bold text-text_primary md:text-3xl">
            The friction points our clients mention most often.
          </h3>
          <p className="mt-3 text-sm text-text_muted md:text-base">
            Every objection becomes an operating principle inside our pods—so you’re never left guessing how or why decisions were made.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.08 }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {challenges.map((challenge) => (
            <motion.article
              key={challenge.quote}
              variants={card}
              whileHover={{ y: -6 }}
              className="relative h-full rounded-[12px] border border-gray-100 bg-[#FCFCFC] p-6 shadow-soft transition hover:shadow-strong"
            >
              <div className="absolute left-0 top-6 bottom-6 w-1 rounded-full bg-accent_orange" />
              <p className="mb-3 pl-4 text-[15px] italic text-gray-800">“{challenge.quote}”</p>
              <p className="pl-4 text-sm text-gray-700">{challenge.response}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}



