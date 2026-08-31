"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { AgentCard } from "@/components/property/agent-card";
import { Button } from "@/components/ui/button";
import type { Agent } from "@/types/agent";

type AgentWithCount = {
  agent: Agent;
  listingCount: number;
};

export function AgentDiscoveryCarousel({
  agents,
}: {
  agents: AgentWithCount[];
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
  });

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollProgress, setScrollProgress] = React.useState(0);

  const canScrollPrev = emblaApi?.canScrollPrev() ?? false;
  const canScrollNext = emblaApi?.canScrollNext() ?? false;

  React.useEffect(() => {
    if (!emblaApi) return;

    const handleSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    const handleScroll = () => {
      setScrollProgress(emblaApi.scrollProgress());
    };

    handleSelect();
    handleScroll();

    emblaApi.on("select", handleSelect);
    emblaApi.on("scroll", handleScroll);
    emblaApi.on("reInit", handleSelect);
    emblaApi.on("reInit", handleScroll);

    return () => {
      emblaApi.off("select", handleSelect);
      emblaApi.off("scroll", handleScroll);
      emblaApi.off("reInit", handleSelect);
      emblaApi.off("reInit", handleScroll);
    };
  }, [emblaApi]);

  if (!agents.length) return null;

  return (
    <div className="relative">
      {/* Carousel viewport */}
      <div
        ref={emblaRef}
        className="overflow-hidden"
      >
        <div className="-ml-3 flex touch-pan-y select-none md:-ml-4 py-8">
          {agents.map(({ agent, listingCount }, index) => (
            <div
              key={agent.id}
              className="min-w-0 shrink-0 grow-0 basis-[88%] pl-3 sm:basis-[52%] md:basis-[36%] md:pl-4 lg:basis-1/4"
            >
              <div
                className="h-full transition-transform duration-500 ease-out"
                style={{
                  transform:
                    selectedIndex === index
                      ? "translateY(0)"
                      : "translateY(2px)",
                }}
              >
                <AgentCard
                  agent={agent}
                  listingCount={listingCount}
                  index={index}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel footer */}
      <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
        {/* Progress */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs tabular-nums text-muted-foreground">
            {String(selectedIndex + 1).padStart(2, "0")}
          </span>

          <div className="relative h-px w-20 overflow-hidden bg-border sm:w-28">
            <div
              className="absolute inset-y-0 left-0 bg-foreground transition-[width] duration-300 ease-out"
              style={{
                width: `${Math.max(scrollProgress * 100, 8)}%`,
              }}
            />
          </div>

          <span className="font-mono text-xs tabular-nums text-muted-foreground">
            {String(agents.length).padStart(2, "0")}
          </span>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canScrollPrev}
            aria-label="Previous agents"
            className="size-9 rounded-full border-border bg-background transition-all duration-300 hover:border-foreground hover:bg-foreground hover:text-background disabled:pointer-events-none disabled:opacity-30"
          >
            <ArrowLeft className="size-4" />
          </Button>

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canScrollNext}
            aria-label="Next agents"
            className="size-9 rounded-full border-border bg-background transition-all duration-300 hover:border-foreground hover:bg-foreground hover:text-background disabled:pointer-events-none disabled:opacity-30"
          >
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}