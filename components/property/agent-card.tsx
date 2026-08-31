import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Agent } from "@/types/agent";

/**
 * Signature agent card: portrait, a real specialization line (from bio),
 * a response-time signal, and direct contact — not a name + "View
 * Profile" tile. Uses the "stretched link" pattern (invisible full-card
 * Link + real relatively-positioned contact anchors on top) rather than
 * wrapping the whole card in a Link, since nesting an <a> for
 * call/WhatsApp inside another <a> would be invalid HTML.
 */
export function AgentCard({ agent, listingCount }: { agent: Agent; listingCount: number }) {
  const whatsappHref = `https://wa.me/${agent.whatsapp.replace(/[^\d]/g, "")}`;

  return (
    <Card className="relative p-5 transition-shadow hover:shadow-[var(--shadow-md)]">
      <Link href={`/agents/${agent.slug}`} className="absolute inset-0" aria-label={`View ${agent.name}'s profile`} />

      <div className="flex items-start gap-3">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-border">
          <Image src={agent.photo} alt={agent.name} fill sizes="64px" className="object-cover" />
        </div>
        <div className="min-w-0">
          <p className="truncate font-display text-lg text-foreground">{agent.name}</p>
          <p className="text-xs text-muted-foreground">{agent.position}</p>
          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-success" aria-hidden />
            {agent.responseTime}
          </p>
        </div>
      </div>

      <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{agent.bio}</p>

      <p className="mt-3 flex items-start gap-1.5 text-xs text-muted-foreground">
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

      <div className="relative z-10 mt-4 flex gap-2">
        <a
          href={`tel:${agent.phone.replace(/\s/g, "")}`}
          className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-[var(--radius-sm)] border border-border-strong text-xs font-medium text-foreground transition-colors hover:bg-surface-muted"
        >
          <Phone className="h-3.5 w-3.5" />
          Call
        </a>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-[var(--radius-sm)] border border-border-strong text-xs font-medium text-foreground transition-colors hover:bg-surface-muted"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          WhatsApp
        </a>
      </div>
    </Card>
  );
}
