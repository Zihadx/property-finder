"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const reveal = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function MethodCta() {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={reducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={reveal}
      className="flex flex-col items-start justify-between gap-8 border-t border-stone-300 pt-14 md:flex-row md:items-end md:pt-16"
    >
      <div>
        <div className="flex items-center gap-4">
          <span aria-hidden="true" className="h-px w-10 bg-cyan-700" />
          <span className="text-[9px] font-medium uppercase tracking-[0.38em] text-stone-500">
            Start your search
          </span>
        </div>
        <h3 className="mt-6 max-w-lg font-display text-3xl leading-[1.05] tracking-[-0.03em] text-stone-950 sm:text-4xl">
          Ready to find your next address?
        </h3>
      </div>

      <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
        <Link
          href="/properties"
          className="flex items-center justify-center gap-2 rounded-full bg-stone-950 px-6 py-3 text-[11px] font-medium uppercase tracking-[0.16em] text-[#f6f5f1] transition-transform hover:-translate-y-0.5"
        >
          Browse properties
          <ArrowUpRight className="size-3.5" />
        </Link>
        <Link
          href="/contact"
          className="flex items-center justify-center gap-2 rounded-full border border-stone-300 px-6 py-3 text-[11px] font-medium uppercase tracking-[0.16em] text-stone-700 transition-colors hover:border-stone-950"
        >
          Talk to an advisor
        </Link>
      </div>
    </motion.div>
  );
}