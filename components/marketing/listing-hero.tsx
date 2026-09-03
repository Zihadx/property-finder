"use client";

import Link from "next/link";
import { ArrowUpRight, Users } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/button";

const stats = [
  { value: "48", suffix: "hrs", label: "First inquiry" },
  { value: "1,200", suffix: "+", label: "Active buyers" },
  { value: "18", suffix: "", label: "Areas covered" },
];

const ease = [0.22, 1, 0.36, 1] as const;

const reveal = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease,
    },
  },
};

export function ListingHero() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Quiet atmospheric detail */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <motion.div
          animate={
            reducedMotion
              ? undefined
              : {
                  x: [0, 12, 0],
                  y: [0, -8, 0],
                }
          }
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-32 -top-40 size-80 rounded-full bg-primary-foreground/[0.035] blur-3xl"
        />

        <div className="absolute -bottom-40 -left-32 size-72 rounded-full bg-accent/[0.045] blur-3xl" />
      </div>

      <div className="relative mx-auto container px-6 lg:px-8">
        {/* Minimal top identity */}
        <div className="flex items-center justify-between border-b border-primary-foreground/[0.09] py-4">
          <div className="flex items-center gap-3">
            <span className="h-px w-6 bg-accent/70" />

            <span className="text-[0.55rem] font-medium uppercase tracking-[0.25em] text-gray-foreground/45">
              Property Listing
            </span>
          </div>

          <span className="text-[0.5rem] uppercase tracking-[0.2em] text-gray-foreground/25">
            ListEasy BD
          </span>
        </div>

        {/* Main */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ staggerChildren: 0.09 }}
            className="py-14 sm:py-16 lg:py-20 lg:pr-16"
          >
            {/* Eyebrow */}
            <motion.div
              variants={reveal}
              className="flex items-center gap-3"
            >
              <span className="font-mono text-[0.52rem] tracking-[0.15em] text-gray-foreground/25">
                01
              </span>

              <span className="h-px w-8 bg-accent/60" />

              <span className="text-[0.58rem] font-medium uppercase tracking-[0.2em] text-gray-foreground/45">
                For owners & agents
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={reveal}
              className="mt-5 max-w-2xl font-display text-[2.8rem] font-normal leading-[0.94] tracking-[-0.05em] sm:text-5xl lg:text-[4.15rem]"
            >
              Put your property
              <span className="block text-gray-foreground/40">
                in the right place.
              </span>
            </motion.h1>

            {/* Bottom content */}
            <motion.div
              variants={reveal}
              className="mt-7 flex flex-col gap-6 sm:flex-row sm:items-center"
            >
              <p className="max-w-sm text-xs leading-6 text-gray-foreground/50">
                Reach people already searching for a property like yours —
                with a listing designed to stand apart.
              </p>

              <div className="flex shrink-0 items-center gap-5">
                <Button
                  asChild
                  size="sm"
                  variant="accent"
                  className="group h-10 rounded-none px-5"
                >
                  <Link href="/dashboard/properties/new">
                    List Your Property
                    <ArrowUpRight className="ml-4 size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </Button>

                <Link
                  href="/dashboard"
                  className="group flex items-center gap-2 text-[0.56rem] font-medium uppercase tracking-[0.17em] text-gray-foreground/45 transition-colors hover:text-gray-foreground"
                >
                  <Users className="size-3.5" />
                  Agent
                  <span className="h-px w-0 bg-accent transition-all duration-300 group-hover:w-4" />
                </Link>
              </div>
            </motion.div>
          </motion.div>

          {/* Small luxury side detail */}
          <motion.div
            initial={{
              opacity: 0,
              x: reducedMotion ? 0 : 12,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.2,
              ease,
            }}
            className="hidden border-l border-primary-foreground/[0.09] lg:flex lg:flex-col lg:justify-center lg:pl-8"
          >
            <span className="font-display text-6xl leading-none tracking-[-0.06em] text-gray-foreground/[0.08]">
              01
            </span>

            <div className="mt-5 h-px w-7 bg-accent/60" />

            <p className="mt-4 max-w-[150px] text-[0.56rem] uppercase leading-4 tracking-[0.15em] text-gray-foreground/35">
              Designed for properties worth discovering.
            </p>
          </motion.div>
        </div>

        {/* Minimal stat rail */}
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.65,
            delay: 0.3,
            ease,
          }}
          className="border-t border-primary-foreground/[0.11]"
        >
          <div className="grid grid-cols-3">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={[
                  "relative flex items-center gap-3 py-5",
                  index > 0
                    ? "border-l border-primary-foreground/[0.09] pl-4 sm:pl-6"
                    : "",
                ].join(" ")}
              >
                <span className="hidden font-mono text-[0.5rem] tracking-wider text-gray-foreground/20 sm:block">
                  0{index + 1}
                </span>

                <div>
                  <div className="font-display text-xl tracking-[-0.035em] sm:text-2xl">
                    {stat.value}
                    <span className="ml-0.5 text-xs text-gray-foreground/35">
                      {stat.suffix}
                    </span>
                  </div>

                  <p className="mt-0.5 text-[0.5rem] uppercase tracking-[0.14em] text-gray-foreground/30">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom hairline */}
        <div className="flex items-center justify-between border-t border-primary-foreground/[0.06] py-3">
          <span className="text-[0.48rem] uppercase tracking-[0.2em] text-gray-foreground/20">
            Better discovery
          </span>

          <span className="text-[0.48rem] uppercase tracking-[0.2em] text-gray-foreground/20">
            Better conversations
          </span>
        </div>
      </div>
    </section>
  );
}