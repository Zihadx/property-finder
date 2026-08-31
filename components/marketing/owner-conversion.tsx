
"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  ClipboardList,
  LineChart,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";

const benefits = [
  {
    icon: Building2,
    index: "01",
    title: "Present",
    text: "A structured listing page that gives every property a professional presence.",
  },
  {
    icon: Users,
    index: "02",
    title: "Reach",
    text: "Get discovered by buyers and renters searching by location and budget.",
  },
  {
    icon: ClipboardList,
    index: "03",
    title: "Qualify",
    text: "Turn scattered messages into structured inquiries and visit requests.",
  },
  {
    icon: LineChart,
    index: "04",
    title: "Understand",
    text: "See which properties are generating genuine interest.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function OwnerConversion() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-primary text-primary-foreground">
      {/* Ambient architectural detail */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -right-32 -top-40 h-112 w-md rounded-full bg-primary-foreground/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

    
       
      </div>

      <div className="relative mx-auto container px-6 py-14 sm:py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          {/* Editorial copy */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={containerVariants}
            className="max-w-2xl"
          >
            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <span className="h-px w-8 bg-accent" />

              <p className="text-[0.68rem] font-medium uppercase tracking-[0.2em] text-primary-foreground/55">
                For property owners
              </p>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="mt-5 max-w-xl font-display text-3xl leading-[1.08] tracking-tight sm:text-4xl lg:text-[2.8rem]"
            >
              Put your property where
              <span className="block text-primary-foreground/55">
                serious searches begin.
              </span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="mt-5 max-w-lg text-sm leading-6 text-primary-foreground/65"
            >
              One structured listing. Better discovery. Direct conversations
              with people already looking for a property like yours.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-7 flex flex-wrap items-center gap-3"
            >
              <Button asChild size="lg" variant="accent">
                <Link href="/dashboard/properties/new">
                  List Your Property
                  <ArrowUpRight className="ml-2 size-4" />
                </Link>
              </Button>

              <Link
                href="/properties"
                className="group inline-flex h-11 items-center gap-2 px-3 text-sm font-medium text-primary-foreground/65 transition-colors hover:text-primary-foreground"
              >
                Explore listings
                <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Benefits — compact architectural grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="grid grid-cols-2 border-l border-t border-primary-foreground/10"
          >
            {benefits.map(({ icon: Icon, index, title, text }) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative min-h-40 border-b border-r border-primary-foreground/10 p-5 transition-colors duration-300 hover:bg-primary-foreground/[0.035] sm:min-h-44 sm:p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex size-8 items-center justify-center border border-primary-foreground/12 bg-primary-foreground/2.5">
                    <Icon className="size-3.5 text-primary-foreground/60 transition-colors duration-300 group-hover:text-accent" />
                  </div>

                  <span className="font-mono text-[0.62rem] tracking-[0.15em] text-primary-foreground/25">
                    {index}
                  </span>
                </div>

                <h3 className="mt-7 text-sm font-medium tracking-tight text-primary-foreground">
                  {title}
                </h3>

                <p className="mt-2 max-w-52 text-xs leading-5 text-primary-foreground/48">
                  {text}
                </p>

                <span className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-500 group-hover:w-10" />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom signal */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-10 flex items-center justify-between border-t border-primary-foreground/10 pt-4"
        >
          <p className="text-[0.65rem] uppercase tracking-[0.16em] text-primary-foreground/30">
            Built for property owners
          </p>

          <div className="flex items-center gap-2 text-[0.65rem] text-primary-foreground/35">
            <span className="size-1.5 rounded-full bg-accent" />
            Direct property discovery
          </div>
        </motion.div>
      </div>
    </section>
  );
}

