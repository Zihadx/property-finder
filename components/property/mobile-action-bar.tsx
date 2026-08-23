"use client";

import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Agent } from "@/types/agent";

export function MobileActionBar({ agent, propertyTitle }: { agent: Agent; propertyTitle: string }) {
  const whatsappHref = `https://wa.me/${agent.whatsapp.replace(/[^\d]/g, "")}?text=${encodeURIComponent(
    `Hi ${agent.name}, I'm interested in ${propertyTitle} on ListEasy BD.`
  )}`;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 flex gap-2 border-t border-border bg-surface p-3 shadow-[var(--shadow-lg)] lg:hidden">
      <Button variant="outline" className="flex-1" asChild>
        <a href={`tel:${agent.phone.replace(/\s/g, "")}`}>
          <Phone className="mr-2 h-4 w-4" />
          Call
        </a>
      </Button>
      <Button className="flex-1" asChild>
        <a href={whatsappHref} target="_blank" rel="noreferrer">
          <MessageCircle className="mr-2 h-4 w-4" />
          WhatsApp
        </a>
      </Button>
    </div>
  );
}
