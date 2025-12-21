"use client";

import { motion } from "framer-motion";

const industries = [
  {
    tag: "SaaS",
    title: "B2B SaaS Platforms",
    description:
      "Scaled paid media playbooks that compress payback and accelerate pipeline velocity for product-led growth brands.",
  },
  {
    tag: "Fintech",
    title: "Fintech & Payments",
    description:
      "Regulation-ready messaging frameworks and conversion journeys that keep complex buying committees moving forward.",
  },
  {
    tag: "Ecommerce",
    title: "Ecommerce Retail",
    description:
      "Merchandising pods that pair AI-generated creative with SKU-level profit controls for every drop and season.",
  },
  {
    tag: "AI",
    title: "AI & Deep Tech",
    description:
      "Category education engines that translate technical moats into punchy stories for investors, partners, and buyers.",
  },
  {
    tag: "Crypto",
    title: "Web3 & Crypto",
    description:
      "Always-on storytelling that keeps community, liquidity, and compliance teams aligned as you scale globally.",
  },
  {
    tag: "EdTech",
    title: "Learning Platforms",
    description:
      "Lifecycle programs for admissions, cohorts, and alumni that prove lifetime value faster than traditional campuses.",
  },
  {
    tag: "Health",
    title: "Health & Wellness",
    description:
      "Medical-legal reviewed campaigns with transparent measurement so clinicians, operators, and finance stay in sync.",
  },
  {
    tag: "Capital",
    title: "Investment Firms",
    description:
      "Fund launch kits, LP activation playbooks, and deal-level acquisition programs built to close faster.",
  },
  {
    tag: "Gaming",
    title: "Gaming & Interactive",
    description:
      "LiveOps and creator collaborations that keep retention curves steady across every season and content drop.",
  },
  {
    tag: "Real Estate",
    title: "Real Estate Tech",
    description:
      "Geo-aware media buying, immersive tours, and lead scoring for modern brokerages and proptech operators.",
  },
  {
    tag: "Energy",
    title: "Sustainability",
    description:
      "Brand systems that make complex climate innovation tangible for buyers, regulators, and community partners.",
  },
  {
    tag: "Gov",
    title: "Public Sector",
    description:
      "Citizen-first service experiences, multilingual outreach, and reporting rigor built for accountability.",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const card = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export function NinjaPromoIndustryBand() {
  const cards = industries.map((industry) => (
    <motion.article
      key={industry.title}
      variants={card}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="glare-card flex min-w-[260px] flex-col justify-between rounded-[12px] border border-gray-100 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
    >
      <div>
        <span className="mb-3 inline-flex items-center rounded-full bg-orange-50 px-3 py-1 text-[13px] font-medium text-accent_orange">
          {industry.tag}
        </span>
        <h4 className="mb-2 text-lg font-semibold text-text_primary">{industry.title}</h4>
        <p className="text-sm leading-relaxed text-gray-700">{industry.description}</p>
      </div>
      <button className="mt-4 text-left text-sm font-semibold text-accent_orange">View playbook →</button>
    </motion.article>
  ));

  return (
    <section id="feature-industry" className="bg-neutral_light py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4 }}
            className="text-sm font-semibold uppercase tracking-[0.2em] text-accent_orange"
          >
            Any industry. Any goal.
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="mb-4 text-3xl font-bold text-text_primary md:text-4xl"
          >
            Modular squads that embed inside your team in days, not months.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="text-base text-text_muted md:text-lg"
          >
            Activate a cross-functional “mission unit” with strategists, creative technologists, and media pilots who already know the terrain you’re entering.
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="industry-scroll flex gap-5 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0"
        >
          {cards}
        </motion.div>

        <div className="mt-8 flex justify-end">
          <button className="text-sm font-semibold text-gray-700 underline underline-offset-4 transition hover:text-accent_orange">
            Show all industries
          </button>
        </div>
      </div>
    </section>
  );
}



