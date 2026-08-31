"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { PropertyCategoryCard } from "./property-category-card";

type PropertyCategoryItem = {
  title: string;
  subtitle: string;
  href: string;
  icon: "building" | "layers" | "map" | "store";
  count: number;
  image?: string;
};

interface PropertyCategorySliderProps {
  items: PropertyCategoryItem[];
}

export function PropertyCategorySlider({
  items,
}: PropertyCategorySliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
    skipSnaps: false,
  });

  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const updateControls = React.useCallback(() => {
    if (!emblaApi) return;

    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;

    const handleSelect = () => {
      updateControls();
    };

    emblaApi.on("select", handleSelect);
    emblaApi.on("reInit", handleSelect);

    return () => {
      emblaApi.off("select", handleSelect);
      emblaApi.off("reInit", handleSelect);
    };
  }, [emblaApi, updateControls]);

  const scrollPrev = React.useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative">
      {/* Slider */}
      <div
        ref={emblaRef}
        className="overflow-hidden"
      >
        <div className="flex touch-pan-y select-none gap-4">
          {items.map((item, index) => (
            <div
              key={item.href}
              className={cn(
                "min-w-0 shrink-0",
                "basis-[82%]",
                "xs:basis-[72%]",
                "sm:basis-[48%]",
                "md:basis-[36%]",
                "lg:basis-[30%]",
                "xl:basis-[25%]",
              )}
            >
              <PropertyCategoryCard
                title={item.title}
                subtitle={item.subtitle}
                href={item.href}
                count={item.count}
                image={item.image}
                icon={item.icon}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-7 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-foreground/20" />

          <span className="text-[9px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
            Explore collection
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            aria-label="Previous properties"
            className={cn(
              "flex h-11 w-11 items-center justify-center",
              "border border-border bg-background",
              "transition-all duration-300",
              "hover:border-foreground/30 hover:bg-muted",
              "disabled:pointer-events-none disabled:opacity-30",
            )}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={scrollNext}
            disabled={!canScrollNext}
            aria-label="Next properties"
            className={cn(
              "flex h-11 w-11 items-center justify-center",
              "border border-border bg-background",
              "transition-all duration-300",
              "hover:border-foreground/30 hover:bg-muted",
              "disabled:pointer-events-none disabled:opacity-30",
            )}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}