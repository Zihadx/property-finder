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
          <AgentDiscoveryCarousel agents={withCounts} />
        </div>
      </div>
    </section>
  );
}