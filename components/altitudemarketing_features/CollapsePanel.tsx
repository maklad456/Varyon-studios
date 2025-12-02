"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export function CollapsePanel({
  heading,
  paragraphs,
}: {
  heading: string;
  paragraphs: string[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative rounded-2xl border border-gray-200 bg-white shadow-soft">
      <div className="flex items-center justify-between gap-4 border-b border-gray-100 px-6 py-4">
        <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">{heading}</h4>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="text-sm font-semibold text-accent_orange"
        >
          {open ? "Hide full solution" : "See full solution"}
        </button>
      </div>
      <AnimatePresence initial={false}>
        <motion.div
          key={open ? "open" : "closed"}
          initial={{ height: open ? 0 : 220, opacity: 1 }}
          animate={{ height: open ? "auto" : 220 }}
          exit={{ height: open ? 220 : 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="overflow-hidden px-6"
        >
          <div className="space-y-4 py-6 text-sm text-gray-700">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
      {!open && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 rounded-b-2xl bg-gradient-to-t from-white to-transparent" />
      )}
    </div>
  );
}

