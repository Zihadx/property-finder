"use client";

import { SiteHeader } from "@/components/layout/site-header";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronRight } from "lucide-react";

import { RevealHeading } from "@/components/marketing/reveal-heading";
import { MethodPrinciples } from "@/components/marketing/method-principles";
import { MethodFaq } from "@/components/marketing/method-faq";
import { MethodCta } from "@/components/marketing/method-cta";
import { SiteFooter } from "@/components/layout/site-footer";

const steps = [
  {
    number: "01",
    title: "Define",
    subtitle: "Begin with what matters.",
    description:
      "Tell us the location, property type, budget and lifestyle you're looking for.",
  },
  {
    number: "02",
    title: "Discover",
    subtitle: "Enter a more considered search.",
    description:
      "Explore properties curated around your priorities, not simply what's available.",
  },
  {
    number: "03",
    title: "Shortlist",
    subtitle: "Bring clarity to choice.",
    description:
      "Save, compare and refine your selection until only the right properties remain.",
  },
  {
    number: "04",
    title: "Connect",
    subtitle: "Meet the right people.",
    description:
      "Connect directly with the agent or representative responsible for the property.",
  },
  {
    number: "05",
    title: "Experience",
    subtitle: "See it for yourself.",
    description:
      "Arrange a private viewing and experience the architecture, space and atmosphere.",
  },
];

const reveal = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const HowItWorks = () => {
  const reducedMotion = useReducedMotion();

  return (
    <>
      <SiteHeader />
      <main className="overflow-hidden bg-[#f6f5f1] text-stone-950">
        {/* Atmospheric light */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 top-1/2 h-[34rem] w-[34rem] -translate-y-1/2 rounded-full bg-cyan-700/[0.035] blur-[110px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/4 top-0 h-64 w-64 rounded-full bg-white/70 blur-[100px]"
        />

        <div className="relative mx-auto container px-6 py-20 sm:px-8 md:py-28">
          {/* ───────────────── Header ───────────────── */}

          <RevealHeading
            eyebrow="The ListEasy Method"
            titleLead="A more refined way"
            titleMuted="to find your next address."
            note={{
              lines: ["From first search", "to private viewing."],
              bullet: "A considered process",
            }}
          />

          {/* ───────────────── Process ───────────────── */}

          <div className="relative mt-20 md:mt-28">
            {/* Desktop rail */}

            <div
              aria-hidden="true"
              className="absolute left-0 right-0 top-[23px] hidden h-px bg-stone-300 md:block"
            />

            <motion.div
              aria-hidden="true"
              initial={reducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 1.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                transformOrigin: "left",
              }}
              className="absolute left-0 right-0 top-[23px] hidden h-px bg-gradient-to-r from-cyan-700 via-cyan-700/40 to-transparent md:block"
            />

            <ol className="grid grid-cols-1 md:grid-cols-5">
              {steps.map((step, index) => (
                <motion.li
                  key={step.number}
                  initial={reducedMotion ? false : "hidden"}
                  whileInView="visible"
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  variants={reveal}
                  transition={{
                    delay: reducedMotion ? 0 : index * 0.1,
                  }}
                  className="group relative border-b border-stone-300/80 py-8 last:border-b-0 md:border-b-0 md:px-5 md:py-0 md:first:pl-0 md:last:pr-0"
                >
                  {/* Top marker */}

                  <div className="relative z-10 flex items-center">
                    <div className="relative flex size-[47px] shrink-0 items-center justify-center rounded-full border border-stone-300 bg-[#f6f5f1] transition-all duration-500 group-hover:border-cyan-700 group-hover:bg-white group-hover:shadow-[0_0_0_7px_rgba(32,149,174,0.045)]">
                      <span className="font-mono text-[10px] tracking-[0.12em] text-stone-500 transition-colors duration-300 group-hover:text-cyan-700">
                        {step.number}
                      </span>

                      {/* Inner detail */}

                      <span
                        aria-hidden="true"
                        className="absolute inset-[4px] rounded-full border border-stone-200/70"
                      />
                    </div>

                    {/* Mobile connector */}

                    {index !== steps.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="ml-4 h-px flex-1 bg-stone-300 md:hidden"
                      />
                    )}
                  </div>

                  {/* Content */}

                  <div className="relative mt-8 pr-7 md:mt-9 md:pr-4">
                    {/* Large editorial number */}

                    <span
                      aria-hidden="true"
                      className="absolute -right-1 -top-3 font-display text-5xl leading-none tracking-[-0.06em] text-stone-200 transition-colors duration-500 group-hover:text-stone-300 md:right-3"
                    >
                      {step.number}
                    </span>

                    {/* Label */}

                    <p className="relative text-[9px] font-semibold uppercase tracking-[0.3em] text-cyan-700">
                      {step.title}
                    </p>

                    {/* Title */}

                    <h3 className="relative mt-3 max-w-[190px] font-display text-[1.25rem] leading-[1.15] tracking-[-0.025em] text-stone-900">
                      {step.subtitle}
                    </h3>

                    {/* Description */}

                    <p className="relative mt-4 max-w-[210px] text-[11px] leading-[1.8] text-stone-500 transition-colors duration-500 group-hover:text-stone-700">
                      {step.description}
                    </p>

                    {/* Arrow */}

                    <div className="mt-7 flex items-center gap-2 opacity-50 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100">
                      <span className="h-px w-5 bg-stone-400 transition-all duration-500 group-hover:w-8 group-hover:bg-cyan-700" />

                      <ChevronRight className="size-3 text-stone-500 transition-colors duration-300 group-hover:text-cyan-700" />
                    </div>
                  </div>

                  {/* Bottom hover rule */}

                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-cyan-700 transition-transform duration-700 ease-out group-hover:scale-x-100 md:bottom-[-1px]"
                  />
                </motion.li>
              ))}
            </ol>
          </div>

          {/* ───────────────── Footer ───────────────── */}

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: reducedMotion ? 0 : 0.7,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-16 flex flex-col gap-5 border-t border-stone-300 pt-5 sm:flex-row sm:items-center sm:justify-between md:mt-20"
          >
            <div className="flex items-center gap-4">
              <span className="font-mono text-[8px] tracking-[0.22em] text-stone-400">
                05
              </span>

              <span className="h-px w-8 bg-stone-300" />

              <span className="text-[8px] uppercase tracking-[0.3em] text-stone-400">
                Curated property discovery
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[8px] uppercase tracking-[0.25em] text-stone-400">
                Your journey
              </span>

              <ArrowUpRight className="size-3.5 text-cyan-700" />
            </div>
          </motion.div>

          {/* ───────────────── Additional sections ───────────────── */}

          <div className="mt-16 md:mt-20">
            <MethodPrinciples />
          </div>

          <div className="mt-16 md:mt-20">
            <MethodFaq />
          </div>

          <div className="mt-16 md:mt-20">
            <MethodCta />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
};

export default HowItWorks;
