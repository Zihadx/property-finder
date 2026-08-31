
"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Define",
    subtitle: "Your requirements",
    description:
      "Tell us the area, property type, budget and lifestyle you're looking for.",
  },
  {
    number: "02",
    title: "Discover",
    subtitle: "Curated properties",
    description:
      "Explore relevant homes selected around what actually matters to you.",
  },
  {
    number: "03",
    title: "Shortlist",
    subtitle: "Compare with clarity",
    description:
      "Save, compare and narrow your options before making a decision.",
  },
  {
    number: "04",
    title: "Connect",
    subtitle: "With the right agent",
    description:
      "Reach the person responsible for the property directly.",
  },
  {
    number: "05",
    title: "Experience",
    subtitle: "See it in person",
    description:
      "Arrange a private viewing and experience the property for yourself.",
  },
];

const reveal = {
  hidden: {
    opacity: 0,
    y: 6,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden border-y border-stone-200/80 bg-stone-50">
      {/* Subtle atmospheric detail */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/2 size-72 -translate-y-1/2 rounded-full bg-cyan-700/5 blur-3xl"
      />

      <div className="relative mx-auto container px-6 py-12 sm:px-8 md:py-16 lg:px-12">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={reveal}
          className="flex flex-col justify-between gap-5 md:flex-row md:items-end"
        >
          <div>
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-8 bg-cyan-700"
              />

              <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-stone-500">
                The ListEasy experience
              </span>
            </div>

            <h2 className="mt-4 max-w-xl font-display text-2xl leading-tight tracking-tight text-stone-950 sm:text-3xl">
              From search to{" "}
              <span className="text-stone-400">your next address.</span>
            </h2>
          </div>

          <div className="flex items-center gap-3 pb-1">
            <span className="text-[9px] uppercase tracking-[0.22em] text-stone-400">
              A considered process
            </span>

            <ArrowUpRight className="size-4 text-cyan-700/70" />
          </div>
        </motion.div>

        {/* Process */}
        <div className="relative mt-10 md:mt-12">
          {/* Desktop connecting line */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-4.25 hidden h-px bg-stone-200 md:block"
          />

          {/* Animated progress line */}
          <motion.div
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 1.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ transformOrigin: "left" }}
            className="absolute inset-x-0 top-4.25 hidden h-px origin-left bg-linear-to-r from-cyan-700/70 via-cyan-700/30 to-transparent md:block"
          />

          <ol className="grid grid-cols-1 md:grid-cols-5">
            {steps.map((step, index) => (
              <motion.li
                key={step.number}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={reveal}
                transition={{
                  delay: index * 0.09,
                }}
                className="group relative border-b border-stone-200 py-5 last:border-b-0 md:border-b-0 md:px-4 md:py-0 md:first:pl-0 md:last:pr-0"
              >
                {/* Marker */}
                <div className="relative z-10 flex items-center">
                  <div className="flex size-9 items-center justify-center rounded-full border border-stone-300 bg-stone-50 transition-all duration-500 group-hover:border-cyan-700/60 group-hover:bg-white group-hover:shadow-[0_0_0_5px_rgba(32,149,174,0.06)]">
                    <span className="font-mono text-[9px] tracking-[0.08em] text-stone-500 transition-colors duration-300 group-hover:text-cyan-700">
                      {step.number}
                    </span>
                  </div>

                  {/* Mobile connector */}
                  <span
                    aria-hidden="true"
                    className="ml-3 h-px flex-1 bg-stone-200 md:hidden"
                  />
                </div>

                {/* Content */}
                <div className="mt-4 md:mt-6">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-cyan-700/80">
                    {step.title}
                  </p>

                  <h3 className="mt-1.5 font-display text-base tracking-tight text-stone-900">
                    {step.subtitle}
                  </h3>

                  <p className="mt-2 max-w-48 text-xs leading-relaxed text-stone-500 transition-colors duration-300 group-hover:text-stone-700">
                    {step.description}
                  </p>
                </div>

                {/* Editorial index */}
                <span className="absolute right-0 top-5 font-mono text-[8px] tracking-[0.2em] text-stone-300 md:right-4 md:top-14">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Hover accent */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-cyan-700 transition-transform duration-500 group-hover:scale-x-100"
                />
              </motion.li>
            ))}
          </ol>
        </div>

        {/* Footer detail */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.75, duration: 0.7 }}
          className="mt-7 flex items-center justify-between border-t border-stone-200 pt-4"
        >
          <span className="text-[8px] uppercase tracking-[0.28em] text-stone-400">
            Curated property discovery
          </span>

          <span className="font-mono text-[8px] tracking-[0.18em] text-stone-300">
            05 / 05
          </span>
        </motion.div>
      </div>
    </section>
  );
}

