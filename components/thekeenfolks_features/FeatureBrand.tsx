"use client";

import { motion } from "framer-motion";
import { TKFCursorGrid } from "./TKFCursorGrid";
import { TKFArticleTeaser, TKFArticle } from "./TKFArticleTeaser";

const heroTiles = [
  { label: "Vision", description: "Architect clarity" },
  { label: "Acceleration", description: "Ship weekly" },
  { label: "Resilience", description: "Adapt fast" },
];

const articles: TKFArticle[] = [
  {
    id: "ai-influence",
    title: "Why AI influence graphs will replace media mix modeling",
    category: "AI Trends",
    date: "Aug 05",
    readTime: "7 min read",
    author: "Sloane Vega",
    image: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "brand-operating-system",
    title: "Designing a brand operating system for adaptive commerce",
    category: "Playbooks",
    date: "Aug 12",
    readTime: "6 min read",
    author: "Rei Campos",
    image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "immersive-retail",
    title: "Immersive retail journeys that merge stores + virtual",
    category: "Future of Retail",
    date: "Aug 19",
    readTime: "8 min read",
    author: "Zara Malik",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80",
  },
];

export function FeatureBrand() {
  return (
    <section id="feature-brand" className="relative overflow-hidden bg-[#050505] text-white">
      <div className="mx-auto max-w-[1280px] px-4 py-20 lg:px-8 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gray-500">
              AI growth systems for global brands
            </p>
            <h1 className="font-tkf-heading mt-6 text-4xl font-semibold leading-tight md:text-[3.6rem]">
              Varyon Studios engineers brand systems that feel alive in every touch.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-gray-300">
              We choreograph strategy, design, media, and automation so enterprise teams can move at cultural speed without losing rigor.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button className="rounded-full bg-white px-8 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-black transition hover:bg-gray-200">
                Book a discovery call
              </button>
              <button className="rounded-full border border-white/30 px-8 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-white transition hover:border-white">
                Explore work
              </button>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4 rounded-[24px] border border-white/10 bg-[#0B0B0B] p-8"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-gray-500">Varyon Blueprint</p>
            <div className="grid gap-4 md:grid-cols-3">
              {heroTiles.map((tile) => (
                <div
                  key={tile.label}
                  className="rounded-2xl border border-white/10 bg-[#141414] p-4"
                >
                  <p className="text-xs uppercase tracking-[0.35em] text-accent_tkf_yellow">
                    {tile.label}
                  </p>
                  <p className="mt-3 text-lg font-semibold text-white">{tile.description}</p>
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-white/5 bg-gradient-to-br from-[#101010] to-[#060606] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-gray-500">
                24h onboarding • 30+ services • Global pods
              </p>
              <p className="mt-3 text-2xl font-semibold">“We build adaptive brand systems that behave like living products.”</p>
            </div>
          </motion.div>
        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="aspect-[4/3] overflow-hidden rounded-[18px] border border-white/10 bg-[#0b0b0b]">
            <TKFCursorGrid />
          </div>
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gray-500">
              Discovery Grid
            </p>
            <h3 className="font-tkf-heading text-3xl font-semibold text-white">
              Any industry. Any goal. We’ll architect your AI growth system.
            </h3>
            <p className="text-base text-gray-300">
              Hover across the field to watch our “snake” network light up. Each node represents research, creative, data, and automation squads working in sync.
            </p>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-accent_tkf_pink" />
                Rapid prototyping rituals keep experimentation continuous.
              </li>
              <li className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-accent_tkf_yellow" />
                Decision rooms connect CMOs, product, and ops live.
              </li>
              <li className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-accent_orange" />
                Data guardrails ensure every test loops back into the system.
              </li>
            </ul>
            <button className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-white transition hover:border-white">
              Book a discovery call →
            </button>
          </div>
        </div>

        <div className="mt-24 space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gray-500">
                Insights / AI Trends
              </p>
              <h3 className="font-tkf-heading text-3xl font-semibold text-white">
                Forecasts to help your teams move ahead of the curve.
              </h3>
            </div>
            <button className="self-start rounded-full border border-white/30 px-6 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:border-white">
              View all insights
            </button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <TKFArticleTeaser key={article.id} article={article} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
