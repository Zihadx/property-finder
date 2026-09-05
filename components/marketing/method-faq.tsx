"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";

/**
 * FAQ answers are written as plausible defaults for a private-advisory
 * model, same caveat as MethodPrinciples — check each one against how
 * ListEasy actually operates before publishing.
 */

const reveal = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const faqs = [
  {
    question: "Is there a cost to use ListEasy?",
    answer:
      "No — advisory is free for buyers. Our fees are paid by the seller or developer on completion.",
  },
  {
    question: "How are properties selected for my shortlist?",
    answer:
      "Your advisor filters the active catalog against what you've told us — location, budget, and lifestyle — before anything reaches your shortlist.",
  },
  {
    question: "Can I search discreetly?",
    answer:
      "Yes. Your search stays between you and your advisor; nothing is shared publicly or with other agents.",
  },
  {
    question: "What happens after I shortlist a property?",
    answer:
      "Your advisor arranges a private viewing directly with the listing agent and briefs you beforehand.",
  },
  {
    question: "Can I change advisors if it isn't the right fit?",
    answer:
      "Yes, at any point — just let us know and we'll reassign your search to someone better suited.",
  },
];

export function MethodFaq() {
  const reducedMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <motion.div
      initial={reducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={reveal}
      className="border-t border-stone-300 pt-14 md:pt-16"
    >
      <div className="flex items-center gap-4">
        <span aria-hidden="true" className="h-px w-10 bg-cyan-700" />
        <span className="text-[9px] font-medium uppercase tracking-[0.38em] text-stone-500">
          Common questions
        </span>
      </div>

      <h3 className="mt-6 max-w-xl font-display text-2xl leading-tight tracking-[-0.02em] text-stone-950 sm:text-3xl">
        Before you start.
      </h3>

      <dl className="mt-10 divide-y divide-stone-300">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={faq.question} className="py-5">
              <dt>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-base tracking-tight text-stone-900 sm:text-lg">
                    {faq.question}
                  </span>
                  <Plus
                    className={`size-4 shrink-0 text-cyan-700 transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  />
                </button>
              </dt>
              {isOpen && (
                <dd className="mt-3 max-w-2xl text-[13px] leading-relaxed text-stone-500">{faq.answer}</dd>
              )}
            </div>
          );
        })}
      </dl>
    </motion.div>
  );
}