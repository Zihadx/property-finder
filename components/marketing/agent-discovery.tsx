import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { agentService } from "@/services/agent.service";
import { SectionHeading } from "./section-heading";
import { AgentDiscoveryCarousel } from "./agent-discovery-carousel";

export async function AgentDiscovery() {
  const withCounts = await agentService.listWithActiveCounts();

  return (
    <section className="border-t border-border bg-background">
      <div className="mx-auto container px-6 py-14 md:py-18">
        <SectionHeading
          eyebrow="People behind the listings"
          title="Work with someone who knows the market."
          description="Meet the agents representing the properties you see here, with direct access when you're ready to move."
        />

        <div className="mt-8 md:mt-10">
          <AgentDiscoveryCarousel agents={withCounts.slice(0, 5)} />
        </div>

        <div className="mt-10 border-t border-border pt-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-lg text-[11px] leading-5 text-muted-foreground">
              The right agent can make all the difference. Meet experienced
              professionals who know the local market and the properties they
              represent.
            </p>

            <Link
              href="/agents"
              className="
            group
            inline-flex
            items-center
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.2em]
            text-foreground
          "
            >
              Explore all agents
              <ArrowUpRight
                className="
              ml-3
              h-3.5 w-3.5
              transition-transform duration-500
              group-hover:-translate-y-0.5
              group-hover:translate-x-0.5
            "
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
