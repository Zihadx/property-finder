import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  CalendarClock,
  Check,
  MessagesSquare,
} from "lucide-react";

import { KpiCard } from "@/components/dashboard/kpi-card";
import { Button } from "@/components/ui/button";
import { analyticsService } from "@/services/analytics.service";
import { AgentConversionMotion } from "./agent-conversion-motion";


const capabilities = [
  "Manage listings, inquiries, and visits from one workspace",
  "Give every property a professional, shareable presence",
  "Keep your agent profile, expertise, and contact details current",
  "Track demand with the same data used across your dashboard",
];

export async function AgentConversion() {
  const overview = await analyticsService.getOverview();

  return (
    <section className="border-y border-border bg-surface-muted">
      <div className="container mx-auto px-6 py-14 sm:py-16 lg:py-18">
        <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">

          <AgentConversionMotion>
            <div className="flex items-center gap-3">
              <span className="h-px w-7 bg-accent" />

              <p className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                For agents & agencies
              </p>
            </div>

            <h2 className="mt-4 max-w-lg font-display text-2xl leading-tight tracking-tight text-foreground sm:text-3xl">
              A better operating layer for your property business.
            </h2>

            <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
              Keep your inventory, conversations, visits, and market activity
              connected instead of managing them across disconnected tools.
            </p>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {capabilities.map((capability) => (
                <li
                  key={capability}
                  className="flex items-start gap-2.5 text-xs leading-5 text-muted-foreground"
                >
                  <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-accent/10">
                    <Check className="size-2.75 text-accent-strong" />
                  </span>

                  {capability}
                </li>
              ))}
            </ul>

            <div className="mt-7">
              <Button asChild size="sm">
                <Link href="/dashboard">
                  Join as an Agent
                  <ArrowUpRight className="ml-1.5 size-3.5" />
                </Link>
              </Button>
            </div>
          </AgentConversionMotion>

          <AgentConversionMotion delay={0.1}>
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Dashboard overview
              </p>

              <span className="flex items-center gap-1.5 text-[0.65rem] text-muted-foreground">
                <span className="size-1.5 rounded-full bg-accent" />
                Live data
              </span>
            </div>

            <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
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
          </AgentConversionMotion>

        </div>
      </div>
    </section>
  );
}