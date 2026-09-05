"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * The eyebrow + two-line serif heading + right-side note block, shared
 * between How It Works ("The ListEasy Method") and the market-intelligence
 * page ("Private market intelligence"). "use client" is required for the
 * motion/useReducedMotion hooks, so this can't be inlined into any page
 * that fetches data as an async Server Component.
 */

const reveal = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function RevealHeading({
  eyebrow,
  titleLead,
  titleMuted,
  note,
}: {
  eyebrow: string;
  titleLead: string;
  titleMuted: string;
  note: {
    lines: [string, string];
    bullet: string;
  };
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={reducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={reveal}
      className="grid gap-10 lg:grid-cols-[1fr_auto]"
    >
      <div>
        {/* Eyebrow */}
        <div className="flex items-center gap-4">
          <span
            aria-hidden="true"
            className="h-px w-10 bg-cyan-700"
          />

          <span className="text-[9px] font-medium uppercase tracking-[0.38em] text-stone-500">
            {eyebrow}
          </span>
        </div>

        {/* Heading */}
        <h2 className="mt-7 max-w-3xl font-display text-[2.5rem] leading-[0.98] tracking-[-0.045em] text-stone-950 sm:text-5xl lg:text-[4.4rem]">
          {titleLead}
          <br />
          <span className="text-stone-400">
            {titleMuted}
          </span>
        </h2>
      </div>

      {/* Header side note */}
      <div className="flex max-w-[230px] items-end lg:pb-1">
        <div className="border-l border-stone-300 pl-5">
          <p className="text-[10px] uppercase leading-[1.8] tracking-[0.22em] text-stone-500">
            {note.lines[0]}
            <br />
            {note.lines[1]}
          </p>

          <div className="mt-5 flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-cyan-700" />

            <span className="text-[8px] uppercase tracking-[0.25em] text-stone-400">
              {note.bullet}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}