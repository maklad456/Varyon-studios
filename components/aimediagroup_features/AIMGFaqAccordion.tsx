"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const faqs = [
  {
    question: "How quickly can you launch once we sign?",
    answer:
      "Discovery and stack integration first sprint, pods live inside your channels within 10 business days.",
  },
  {
    question: "Do you replace our internal team?",
    answer:
      "We extend your capabilities. Operators get their time back while we run the blocking-and-tackling inside a transparent workspace.",
  },
  {
    question: "How do you measure success?",
    answer:
      "We align on a North Star ROI or CAC-to-LTV ratio and instrument every channel and creative variant against that bridge.",
  },
  {
    question: "Is the AI custom to us?",
    answer:
      "Yes. Prompt stacks, automation rules, and training data are configured per client and live in your cloud footprint.",
  },
];

const supportBlocks = [
  {
    title: "Security + Privacy",
    detail: "SOC 2-ready controls, clean-room options, and documented data flows.",
  },
  {
    title: "Engagement Models",
    detail: "Month-to-month pods, embedded squads, or fractional leadership support.",
  },
  {
    title: "Global Coverage",
    detail: "Team members across NA, EU, MEA, and APAC for true follow-the-sun ops.",
  },
];

export function AIMGFaqAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={faq.question} className="rounded-2xl border border-gray-200 bg-white">
              <button
                className="flex w-full items-center justify-between gap-6 px-5 py-4 text-left"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                aria-expanded={isOpen}
              >
                <div>
                  <p className="text-lg font-semibold text-text_primary">{faq.question}</p>
                </div>
                <span
                  className={`inline-flex h-8 w-8 items-center justify-center rounded-full border ${
                    isOpen ? "rotate-45 border-accent_orange text-accent_orange" : "border-gray-300 text-gray-500"
                  } transition`}
                >
                  +
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="px-5 pb-5 text-sm text-gray-600 md:text-base"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <div className="space-y-4">
        {supportBlocks.map((block) => (
          <div
            key={block.title}
            className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-5"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-500">
              {block.title}
            </p>
            <p className="mt-2 text-base text-gray-700">{block.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

