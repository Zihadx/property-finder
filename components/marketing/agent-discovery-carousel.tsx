"use client";

import { Carousel } from "@/components/ui/carousel";
import { AgentCard } from "@/components/property/agent-card";
import type { Agent } from "@/types/agent";

type AgentWithCount = {
  agent: Agent;
  listingCount: number;
};

export function AgentDiscoveryCarousel({
  agents,
}: {
  agents: AgentWithCount[];
}) {
  if (!agents.length) return null;

  return (
    <Carousel
      items={agents}
      ariaLabel="Featured agents"
      slideBasis="basis-[88%] sm:basis-[52%] md:basis-[36%] lg:basis-1/4"
      gap="md"
      showNavigation
      showProgress
      showIndex
      getItemKey={(item) => item.agent.id}
      renderItem={({ agent, listingCount }, index, isSelected) => (
        <div
          className="h-full transition-transform duration-500 ease-out"
          style={{
            transform: isSelected
              ? "translateY(0)"
              : "translateY(2px)",
          }}
        >
          <AgentCard
            agent={agent}
            listingCount={listingCount}
            index={index}
          />
        </div>
      )}
    />
  );
}