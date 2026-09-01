
import type { Metadata } from "next";

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { AgentCard } from "@/components/property/agent-card";
import { agentService } from "@/services/agent.service";

export const metadata: Metadata = {
  title: "Our Agents",
  description:
    "Meet the ListEasy BD property consultants across Gulshan, Banani, Dhanmondi, Uttara, and beyond.",
};

export default async function AgentsPage() {
  const withCounts = await agentService.listWithActiveCounts();

  return (
    <>
      <SiteHeader />

      <main className="min-h-screen">
        {/* ─────────────────────────────────────────────
            EDITORIAL HERO
        ───────────────────────────────────────────── */}
        <section className="mx-auto max-w-[1600px] px-6 pb-16 pt-14 sm:px-8 lg:px-12 lg:pb-20 lg:pt-20">
          <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
            {/* Left */}
            <div>
              <div className="mb-6 flex items-center gap-4">
                <span className="h-px w-10 bg-foreground/40" />

                <p className="text-[9px] font-semibold uppercase tracking-[0.32em] text-muted-foreground/55">
                  The Advisory
                </p>
              </div>

              <h1
                className="
                  max-w-4xl
                  font-display
                  text-5xl
                  font-normal
                  leading-[0.9]
                  tracking-[-0.055em]
                  text-foreground
                  sm:text-6xl
                  lg:text-7xl
                  xl:text-[6.5rem]
                "
              >
                People behind
                <br />
                <span className="text-muted-foreground/45">
                  exceptional property.
                </span>
              </h1>

              <p
                className="
                  mt-7
                  max-w-2xl
                  text-sm
                  leading-7
                  text-muted-foreground
                  sm:text-base
                "
              >
                A carefully selected network of property consultants who
                understand the neighbourhoods, buildings, and opportunities
                that define Dhaka&lsquo;s most sought-after addresses.
              </p>
            </div>

            {/* Right editorial metadata */}
            <div className="hidden lg:block lg:pb-2">
              <div className="border-l border-border pl-6">
                <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground/40">
                  ListEasy BD
                </p>

                <p className="mt-2 text-xs text-muted-foreground/60">
                  Private property advisory
                </p>
              </div>
            </div>
          </div>

          {/* Editorial divider */}
          <div className="mt-14 flex items-center gap-5 border-t border-border pt-5 lg:mt-20">
            <span className="font-mono text-[8px] tabular-nums tracking-[0.2em] text-muted-foreground/40">
              {String(withCounts.length).padStart(2, "0")}
            </span>

            <span className="text-[8px] font-medium uppercase tracking-[0.28em] text-muted-foreground/40">
              Property Advisors
            </span>

            <span className="h-px flex-1 bg-border/70" />

            <span className="hidden text-[8px] uppercase tracking-[0.25em] text-muted-foreground/30 sm:block">
              Dhaka · Bangladesh
            </span>
          </div>
        </section>

        {/* ─────────────────────────────────────────────
            AGENT COLLECTION
        ───────────────────────────────────────────── */}
        <section className="mx-auto max-w-[1600px] px-6 pb-24 sm:px-8 lg:px-12 lg:pb-32">
          {withCounts.length > 0 ? (
            <>
              {/* Section header */}
              <div className="mb-8 flex items-end justify-between">
                <div>
                  <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-muted-foreground/40">
                    Our consultants
                  </p>

                  <h2 className="mt-2 font-display text-2xl tracking-[-0.03em] text-foreground sm:text-3xl">
                    Meet the people
                  </h2>
                </div>

                <span className="font-mono text-[8px] tabular-nums tracking-[0.18em] text-muted-foreground/30">
                  01 — {String(withCounts.length).padStart(2, "0")}
                </span>
              </div>

              {/* Agent grid */}
              <div
                className="
                  grid
                  grid-cols-1
                  gap-x-8
                  gap-y-14
                  sm:grid-cols-2
                  lg:grid-cols-3
                  xl:grid-cols-4
                  xl:gap-x-10
                  xl:gap-y-20
                "
              >
                {withCounts.map(({ agent, listingCount }, index) => (
                  <AgentCard
                    key={agent.id}
                    agent={agent}
                    listingCount={listingCount}
                    index={index}
                  />
                ))}
              </div>

              {/* Bottom closure */}
              <div className="mt-20 flex items-center gap-5">
                <span className="h-px flex-1 bg-border/60" />

                <span className="text-[7px] font-medium uppercase tracking-[0.32em] text-muted-foreground/30">
                  End of advisory
                </span>

                <span className="h-px flex-1 bg-border/60" />
              </div>
            </>
          ) : (
            <div className="border-y border-border py-20 text-center">
              <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-muted-foreground/40">
                Advisory network
              </p>

              <p className="mt-4 font-display text-2xl text-foreground">
                Our consultants are currently unavailable.
              </p>
            </div>
          )}
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

