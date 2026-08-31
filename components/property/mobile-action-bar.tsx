"use client";

import * as React from "react";
import { Phone, MessageCircle, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteVisitDialog } from "./site-visit-dialog";
import type { Agent } from "@/types/agent";

/**
 * Milestone 23: previously Call/WhatsApp only — there was no way to
 * request a site visit from mobile at all, even though the desktop
 * AgentContactCard has always had it. Added as a third real action
 * (with its own dialog, mirroring AgentContactCard's pattern) rather
 * than a hidden overflow menu, since closing that exact gap is what
 * this milestone is for.
 */
export function MobileActionBar({
  agent,
  propertyId,
  propertyTitle,
}: {
  agent: Agent;
  propertyId: string;
  propertyTitle: string;
}) {
  const [visitOpen, setVisitOpen] = React.useState(false);
  const whatsappHref = `https://wa.me/${agent.whatsapp.replace(/[^\d]/g, "")}?text=${encodeURIComponent(
    `Hi ${agent.name}, I'm interested in ${propertyTitle} on ListEasy BD.`
  )}`;

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-30 flex gap-2 border-t border-border bg-surface p-3 shadow-[var(--shadow-lg)] lg:hidden">
        <Button variant="outline" className="flex-1 px-2" asChild>
          <a href={`tel:${agent.phone.replace(/\s/g, "")}`}>
            <Phone className="mr-1.5 h-4 w-4" />
            Call
          </a>
        </Button>
        <Button variant="outline" className="flex-1 px-2" asChild>
          <a href={whatsappHref} target="_blank" rel="noreferrer">
            <MessageCircle className="mr-1.5 h-4 w-4" />
            Chat
          </a>
        </Button>
        <Button className="flex-1 px-2" onClick={() => setVisitOpen(true)}>
          <CalendarCheck className="mr-1.5 h-4 w-4" />
          Visit
        </Button>
      </div>

      <SiteVisitDialog
        open={visitOpen}
        onClose={() => setVisitOpen(false)}
        propertyId={propertyId}
        agentId={agent.id}
        propertyTitle={propertyTitle}
      />
    </>
  );
}
