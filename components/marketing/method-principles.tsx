"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EyeOff, ShieldCheck, UserCheck, Wallet, type LucideIcon } from "lucide-react";

/**
 * Trust strip for How It Works. The four claims (no cost to buyers,
 * verification, single point of contact, discretion) are written as
 * plausible defaults for a private-advisory model — confirm each one
 * against your actual policy before shipping; a wrong claim on a live page
 * is worse than a generic one.
 */

const reveal = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const principles: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Wallet,
    title: "No cost to buyers",
    description: "Advisory is funded by sellers and developers — never the buyer.",
  },
  {
    icon: ShieldCheck,
    title: "Every listing verified",
    description: "Each property is checked and confirmed before it appears in a search.",
  },
  {
    icon: UserCheck,
    title: "One point of contact",
    description: "A single advisor manages your search from first call to closing.",
  },
  {
    icon: EyeOff,
    title: "Discretion as standard",
    description: "Off-market opportunities and private viewings, handled quietly.",
  },
];

export function MethodPrinciples() {
  const reducedMotion = useReducedMotion();

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
          Why the method works
        </span>
      </div>

      <h3 className="mt-6 max-w-xl font-display text-2xl leading-tight tracking-[-0.02em] text-stone-950 sm:text-3xl">
        Built on a few simple principles.
      </h3>

      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {principles.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="border-t border-stone-300 pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0 lg:first:border-l-0 lg:first:pl-0"
          >
            <Icon className="size-4 text-cyan-700" />
            <p className="mt-4 font-display text-base tracking-tight text-stone-900">{title}</p>
            <p className="mt-2 text-[11px] leading-relaxed text-stone-500">{description}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}