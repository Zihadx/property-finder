import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { AgentCard } from "@/components/property/agent-card";
import { agentService } from "@/services/agent.service";

export const metadata: Metadata = {
  title: "Our Agents",
  description: "Meet the ListEasy BD property consultants across Gulshan, Banani, Dhanmondi, Uttara, and beyond.",
};

export default async function AgentsPage() {
  const withCounts = await agentService.listWithActiveCounts();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-6 py-10">
        <p className="ledger-label mb-2">Meet the Team</p>
        <h1 className="font-display text-3xl text-foreground">Our Agents</h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Every listing on ListEasy BD is backed by a real person you can call, message, or meet in person.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {withCounts.map(({ agent, listingCount }) => (
            <AgentCard key={agent.id} agent={agent} listingCount={listingCount} />
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
