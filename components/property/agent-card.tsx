import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Agent } from "@/types/agent";

export function AgentCard({ agent, listingCount }: { agent: Agent; listingCount: number }) {
  return (
    <Link href={`/agents/${agent.slug}`}>
      <Card className="p-5 transition-shadow hover:shadow-[var(--shadow-md)]">
        <div className="flex items-center gap-3">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-border">
            <Image src={agent.photo} alt={agent.name} fill sizes="64px" className="object-cover" />
          </div>
          <div>
            <p className="font-display text-lg text-foreground">{agent.name}</p>
            <p className="text-xs text-muted-foreground">{agent.position}</p>
          </div>
        </div>
        <p className="mt-4 flex items-start gap-1.5 text-sm text-muted-foreground">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          {agent.areasServed.join(", ")}
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-sm">
          <span className="text-muted-foreground">
            <span className="ledger-value text-foreground">{listingCount}</span> active listings
          </span>
          <span className="text-muted-foreground">
            <span className="ledger-value text-foreground">{agent.experienceYears}</span> yrs exp.
          </span>
        </div>
      </Card>
    </Link>
  );
}
