"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export type TKFArticle = {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  image?: string;
};

export function TKFArticleTeaser({ article }: { article: TKFArticle }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      className="tkf-article-card flex h-full flex-col gap-4 p-5"
    >
      <div className="teaser-media aspect-[4/3] w-full">
        {article.image ? (
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="(min-width: 1024px) 360px, 100vw"
            className="object-cover"
            priority={article.id === "ai-influence"}
          />
        ) : (
          <div className="teaser-fallback h-full w-full bg-gradient-to-br from-accent_tkf_pink to-accent_tkf_yellow" />
        )}
        <div className="teaser-hover-cta">
          <span>Read forecast</span>
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-black">→</span>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-gray-400">
        <span>{article.category}</span>
        <span className="h-1 w-1 rounded-full bg-gray-600" />
        <span>{article.date}</span>
        <span className="h-1 w-1 rounded-full bg-gray-600" />
        <span>{article.readTime}</span>
      </div>
      <h4 className="font-tkf-heading text-xl font-semibold leading-tight text-white">{article.title}</h4>
      <p className="text-sm text-gray-400">By {article.author}</p>
    </motion.article>
  );
}
