import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { agentService } from "@/services/agent.service";
import { propertyService } from "@/services/property.service";
import { inquiryService } from "@/services/inquiry.service";

export const metadata: Metadata = { title: "Agents" };

export default async function DashboardAgentsPage() {
  const agentsList = await agentService.list();
  const inquiries = await inquiryService.list();

  const rows = await Promise.all(
    agentsList.map(async (agent) => {
      const listings = await propertyService.getByAgent(agent.id);
      const leadCount = inquiries.filter((i) => i.agentId === agent.id).length;
      return { agent, listingCount: listings.length, leadCount };
    })
  );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="ledger-label mb-2">Team</p>
        <h1 className="font-display text-2xl text-foreground">Agents</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rows.map(({ agent, listingCount, leadCount }) => (
          <Card key={agent.id} className="p-5">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-border">
                <Image src={agent.photo} alt={agent.name} fill sizes="48px" className="object-cover" />
              </div>
              <div>
                <Link href={`/agents/${agent.slug}`} className="font-display text-base text-foreground hover:text-accent">
                  {agent.name}
                </Link>
                <p className="text-xs text-muted-foreground">{agent.position}</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-3 text-sm">
              <div>
                <p className="ledger-label">Listings</p>
                <p className="ledger-value mt-1 text-lg text-foreground">{listingCount}</p>
              </div>
              <div>
                <p className="ledger-label">Leads</p>
                <p className="ledger-value mt-1 text-lg text-foreground">{leadCount}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
