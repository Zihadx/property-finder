"use client";

import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProjectStickyCta({ salesPhone }: { salesPhone: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-[1600px] items-center gap-3 px-4 py-3">
        <a
          href={`tel:${salesPhone}`}
          aria-label="Call sales"
          className="flex h-12 w-12 shrink-0 items-center justify-center border border-border"
        >
          <Phone className="size-4" strokeWidth={1.5} />
        </a>
        <Button asChild className="h-12 flex-1 rounded-none">
          <a href="#site-visit">Book a site visit</a>
        </Button>
      </div>
    </div>
  );
}