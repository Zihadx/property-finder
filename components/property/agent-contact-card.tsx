"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, MessageCircle, CalendarCheck, MessageSquareText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InquiryDialog } from "./inquiry-dialog";
import { SiteVisitDialog } from "./site-visit-dialog";
import type { Agent } from "@/types/agent";

export function AgentContactCard({
  agent,
  propertyId,
  propertyTitle,
}: {
  agent: Agent;
  propertyId: string;
  propertyTitle: string;
}) {
  const [inquiryOpen, setInquiryOpen] = React.useState(false);
  const [visitOpen, setVisitOpen] = React.useState(false);
  const whatsappHref = `https://wa.me/${agent.whatsapp.replace(/[^\d]/g, "")}?text=${encodeURIComponent(
    `Hi ${agent.name}, I'm interested in ${propertyTitle} on ListEasy BD.`
  )}`;

  return (
    <Card className="p-5">
      <Link href={`/agents/${agent.slug}`} className="flex items-center gap-3">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-border">
          <Image src={agent.photo} alt={agent.name} fill sizes="56px" className="object-cover" />
        </div>
        <div>
          <p className="font-display text-base text-foreground">{agent.name}</p>
          <p className="text-xs text-muted-foreground">{agent.position}</p>
        </div>
      </Link>
      <p className="mt-3 text-xs text-caption-foreground">{agent.responseTime}</p>

      <div className="mt-5 flex flex-col gap-2.5">
        <Button asChild>
          <a href={whatsappHref} target="_blank" rel="noreferrer">
            <MessageCircle className="mr-2 h-4 w-4" />
            WhatsApp Agent
          </a>
        </Button>
        <Button variant="outline" asChild>
          <a href={`tel:${agent.phone.replace(/\s/g, "")}`}>
            <Phone className="mr-2 h-4 w-4" />
            Call {agent.phone}
          </a>
        </Button>
        <Button variant="ghost" onClick={() => setVisitOpen(true)}>
          <CalendarCheck className="mr-2 h-4 w-4" />
          Request Site Visit
        </Button>
        <Button variant="ghost" onClick={() => setInquiryOpen(true)}>
          <MessageSquareText className="mr-2 h-4 w-4" />
          Send Inquiry
        </Button>
      </div>

      <InquiryDialog
        open={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        propertyId={propertyId}
        agentId={agent.id}
        propertyTitle={propertyTitle}
      />
      <SiteVisitDialog
        open={visitOpen}
        onClose={() => setVisitOpen(false)}
        propertyId={propertyId}
        agentId={agent.id}
        propertyTitle={propertyTitle}
      />
    </Card>
  );
}
