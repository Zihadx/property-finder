
"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  CalendarClock,
  Check,
  MessagesSquare,
} from "lucide-react";
import { motion } from "framer-motion";

import { KpiCard } from "@/components/dashboard/kpi-card";
import { Button } from "@/components/ui/button";
import { analyticsService } from "@/services/analytics.service";

const capabilities = [
  "Manage listings, inquiries, and visits from one workspace",
  "Give every property a professional, shareable presence",
  "Keep your agent profile, expertise, and contact details current",
  "Track demand with the same data used across your dashboard",
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export async function AgentConversion() {
  const overview = await analyticsService.getOverview();

  return (
    <section className="border-y border-border bg-surface-muted">
      <div className="mx-auto container px-6 py-14 sm:py-16 lg:py-18">
        <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          {/* Copy */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={containerVariants}
          >
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3"
            >
              <span className="h-px w-7 bg-accent" />

              <p className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                For agents & agencies
              </p>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="mt-4 max-w-lg font-display text-2xl leading-tight tracking-tight text-foreground sm:text-3xl"
            >
              A better operating layer for your property business.
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="mt-4 max-w-md text-sm leading-6 text-muted-foreground"
            >
              Keep your inventory, conversations, visits, and market activity
              connected instead of managing them across disconnected tools.
            </motion.p>

            <motion.ul
              variants={containerVariants}
              className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1"
            >
              {capabilities.map((capability) => (
                <motion.li
                  key={capability}
                  variants={itemVariants}
                  className="flex items-start gap-2.5 text-xs leading-5 text-muted-foreground"
                >
                  <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-accent/10">
                    <Check className="size-2.75 text-accent-strong" />
                  </span>

                  {capability}
                </motion.li>
              ))}
            </motion.ul>

            <motion.div variants={itemVariants} className="mt-7">
              <Button asChild size="sm">
                <Link href="/dashboard">
                  Join as an Agent
                  <ArrowUpRight className="ml-1.5 size-3.5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Dashboard preview */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1] as const,
            }}
            className="relative"
          >
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                  Dashboard overview
                </p>
              </div>

              <span className="flex items-center gap-1.5 text-[0.65rem] text-muted-foreground">
                <span className="size-1.5 rounded-full bg-accent" />
                Live data
              </span>
            </div>

            <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
              {/* Dashboard header */}
              <div className="flex items-center justify-between border-b border-border px-4 py-3.5 sm:px-5">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Performance
                  </p>
                  <p className="mt-0.5 text-[0.68rem] text-muted-foreground">
                    Current portfolio activity
                  </p>
                </div>

                <div className="hidden items-center gap-2 text-[0.65rem] text-muted-foreground sm:flex">
                  <span className="size-1.5 rounded-full bg-accent" />
                  Updated now
                </div>
              </div>

              {/* KPI grid */}
              <div className="grid grid-cols-2 divide-x divide-y divide-border">
                <div className="p-3 sm:p-4">
                  <KpiCard
                    label="Total listings"
                    value={overview.totalListings}
                    icon={Building2}
                  />
                </div>

                <div className="p-3 sm:p-4">
                  <KpiCard
                    label="New leads"
                    value={overview.newLeadsThisWeek}
                    icon={MessagesSquare}
                    trend={overview.leadsChangePct}
                  />
                </div>

                <div className="p-3 sm:p-4">
                  <KpiCard
                    label="Site visits"
                    value={overview.siteVisitRequests}
                    icon={CalendarClock}
                  />
                </div>

                <div className="p-3 sm:p-4">
                  <KpiCard
                    label="Available"
                    value={overview.available}
                    icon={Building2}
                  />
                </div>
              </div>

              {/* Bottom status rail */}
              <div className="flex items-center justify-between border-t border-border bg-surface-muted px-4 py-3 sm:px-5">
                <p className="text-[0.65rem] text-muted-foreground">
                  Portfolio activity
                </p>

                <div className="flex items-center gap-2 text-[0.65rem] font-medium text-foreground">
                  <span className="size-1.5 rounded-full bg-accent" />
                  Operating normally
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

