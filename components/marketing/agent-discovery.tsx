import { agentService } from "@/services/agent.service";
import { AgentCard } from "@/components/property/agent-card";
import { SectionHeading } from "./section-heading";

/**
 * Milestone 11: puts the same signature AgentCard used on /agents in
 * front of homepage visitors — "I know who I'm dealing with" shouldn't
 * require clicking through to a separate page first.
 */
export async function AgentDiscovery() {
  const withCounts = await agentService.listWithActiveCounts();

  return (
    <section className="border-t border-border bg-surface-muted">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <SectionHeading
          eyebrow="Meet the team"
          title="Every listing has a name behind it"
          description="Real agents, real response times — not a shared inbox."
        />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {withCounts.map(({ agent, listingCount }) => (
            <AgentCard key={agent.id} agent={agent} listingCount={listingCount} />
          ))}
        </div>
      </div>
    </section>
  );
}
