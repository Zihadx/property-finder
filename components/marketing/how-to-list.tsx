// components/marketing/how-to-list.tsx
"use client";

import { FileText, ShieldCheck, Rocket, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: FileText,
    index: "01",
    title: "Submit details",
    text: "Add photos, pricing, specifications, and location for your property.",
  },
  {
    icon: ShieldCheck,
    index: "02",
    title: "Get verified",
    text: "Our team reviews the listing to keep the catalog trustworthy for buyers.",
  },
  {
    icon: Rocket,
    index: "03",
    title: "Goes live",
    text: "Your listing appears in search, area pages, and category browsing.",
  },
  {
    icon: MessageCircle,
    index: "04",
    title: "Receive inquiries",
    text: "Serious buyers reach out directly — track it all from your dashboard.",
  },
];

export function HowToList() {
  return (
    <section className="bg-background">
      <div className="mx-auto container px-6 py-14 md:py-18">
        <div className="max-w-xl">
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.24em] text-accent">
            The process
          </p>
          <h2 className="mt-4 font-display text-2xl leading-tight tracking-tight text-foreground sm:text-3xl">
            From submission to serious inquiries.
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.index}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="flex items-center justify-between">
                  <div className="flex size-9 items-center justify-center rounded-xl border border-border bg-surface-muted">
                    <Icon className="size-4 text-accent-strong" strokeWidth={1.75} />
                  </div>
                  <span className="font-mono text-[0.65rem] tracking-[0.15em] text-muted-foreground/40">
                    {step.index}
                  </span>
                </div>

                <h3 className="mt-5 text-sm font-medium tracking-tight text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-[0.8rem] leading-5 text-muted-foreground">
                  {step.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}