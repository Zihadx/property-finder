
"use client";

import {
  MessageSquareOff,
  Search,
  CalendarCheck,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";

const points = [
  {
    icon: MessageSquareOff,
    eyebrow: "01 / PRESENTATION",
    title: "A better way to present property",
    description:
      "Every listing has one considered destination for photography, pricing, specifications and location — ready to share with a serious buyer.",
  },
  {
    icon: Search,
    eyebrow: "02 / DISCOVERY",
    title: "Let the right buyer find it",
    description:
      "Customers can narrow the market by neighbourhood, budget and property type without depending on an agent to manually search for them.",
  },
  {
    icon: CalendarCheck,
    eyebrow: "03 / PRIVATE VIEWINGS",
    title: "Move naturally from interest to viewing",
    description:
      "When a property feels right, a structured viewing request turns interest into a clear next step for both sides.",
  },
  {
    icon: TrendingUp,
    eyebrow: "04 / MARKET SIGNAL",
    title: "Understand what deserves attention",
    description:
      "Listing activity gives your team a clearer view of demand, helping you focus attention where the market is responding.",
  },
];

export function WhyListEasy() {
  return (
    <section className="bg-surface-muted">
      <div className="mx-auto container px-6 py-14 md:py-18">
        {/* Editorial heading */}
        <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div>
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.24em] text-accent">
              The ListEasy approach
            </p>

            <div className="mt-4 h-px w-12 bg-accent/60" />
          </div>

          <div className="max-w-2xl">
            <h2 className="font-display text-2xl leading-[1.08] tracking-tight text-foreground sm:text-3xl md:text-[2.15rem]">
              Property deserves more than
              <br className="hidden sm:block" />
              <span className="text-muted-foreground">
                {" "}
                another listing on a feed.
              </span>
            </h2>
          </div>
        </div>

        {/* Real-estate editorial rail */}
        <div className="mt-10 border-t border-border/70">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {points.map((point, index) => {
              const Icon = point.icon;

              return (
                <motion.article
                  key={point.eyebrow}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group relative border-b border-border/70 py-7 md:px-6 md:first:pl-0 md:last:pr-0 md:nth-[n+3]:border-b-0 lg:border-b-0 lg:border-l lg:first:border-l-0"
                >
                  {/* Architectural marker */}
                  <div className="flex items-center justify-between">
                    <span className="text-[0.58rem] font-medium uppercase tracking-[0.2em] text-muted-foreground/65">
                      {point.eyebrow}
                    </span>

                    <Icon
                      className="h-4 w-4 text-accent/70 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={1.25}
                    />
                  </div>

                  {/* Heading */}
                  <h3 className="mt-7 max-w-60 font-display text-[1.05rem] leading-tight tracking-tight text-foreground">
                    {point.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 max-w-68 text-[0.76rem] leading-[1.7] text-muted-foreground">
                    {point.description}
                  </p>

                  {/* Fine architectural accent */}
                  <div className="mt-7 flex items-center gap-2">
                    <span className="h-px w-5 bg-border-strong transition-all duration-500 group-hover:w-9 group-hover:bg-accent" />
                    <span className="text-[0.55rem] uppercase tracking-[0.18em] text-muted-foreground/50">
                      ListEasy
                    </span>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

