"use client";

import * as React from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type EmblaApi = UseEmblaCarouselType[1];

export interface CarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number, isSelected: boolean) => React.ReactNode;

  className?: string;
  viewportClassName?: string;
  trackClassName?: string;
  slideClassName?: string;

  slideBasis?: string;

  showNavigation?: boolean;
  showProgress?: boolean;
  showIndex?: boolean;

  gap?: "sm" | "md" | "lg";

  align?: "start" | "center";
  dragFree?: boolean;

  ariaLabel?: string;

  options?: Parameters<typeof useEmblaCarousel>[0];

  getItemKey?: (item: T, index: number) => React.Key;

  previousLabel?: string;
  nextLabel?: string;
}

const GAP_CLASSES = {
  sm: "gap-3",
  md: "gap-5",
  lg: "gap-7",
} as const;

const NAV_BUTTON_CLASSES = cn(
  "size-9 rounded-full border-border bg-background transition-all duration-300",
  "hover:border-foreground hover:bg-foreground hover:text-background",
  "disabled:pointer-events-none disabled:opacity-30"
);

function padIndex(n: number) {
  return String(n).padStart(2, "0");
}

export function Carousel<T>({
  items,
  renderItem,

  className,
  viewportClassName,
  trackClassName,
  slideClassName,

  slideBasis = "basis-[88%] sm:basis-[52%] md:basis-[36%] lg:basis-1/4",

  showNavigation = true,
  showProgress = true,
  showIndex = false,

  gap = "md",

  align = "start",
  dragFree = false,

  ariaLabel = "Carousel",

  options,

  getItemKey,

  previousLabel = "Previous slide",
  nextLabel = "Next slide",
}: CarouselProps<T>) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align,
    containScroll: "trimSnaps",
    dragFree,
    ...options,
  });

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  // Subscribe to Embla events. All derived UI state (selected index,
  // scroll progress, scrollability) is synced here rather than read
  // directly from emblaApi during render, so the component re-renders
  // reliably whenever any of it changes.
  React.useEffect(() => {
    if (!emblaApi) return;

    const sync = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setScrollProgress(emblaApi.scrollProgress());
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    sync();

    emblaApi.on("select", sync);
    emblaApi.on("scroll", sync);
    emblaApi.on("reInit", sync);

    return () => {
      emblaApi.off("select", sync);
      emblaApi.off("scroll", sync);
      emblaApi.off("reInit", sync);
    };
  }, [emblaApi]);

  // Keyboard navigation
  React.useEffect(() => {
    if (!emblaApi) return;

    const viewport = emblaApi.rootNode();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        emblaApi.scrollPrev();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        emblaApi.scrollNext();
      }
    };

    viewport.addEventListener("keydown", handleKeyDown);
    return () => viewport.removeEventListener("keydown", handleKeyDown);
  }, [emblaApi]);

  if (!items.length) {
    return null;
  }

  // Keep the progress rail visually useful even when Embla reports 0 initially.
  const progressWidth =
    items.length > 1 ? Math.max(Math.min(scrollProgress * 100, 100), 8) : 100;

  const showFooter = showNavigation || showProgress || showIndex;

  return (
    <section className={cn("relative w-full", className)} aria-label={ariaLabel}>
      <div
        ref={emblaRef}
        tabIndex={0}
        className={cn(
          "w-full overflow-hidden touch-pan-y outline-none",
          "focus-visible:ring-1 focus-visible:ring-[#2095AE]/40",
          viewportClassName
        )}
      >
        <div className={cn("flex items-stretch", GAP_CLASSES[gap], trackClassName)}>
          {items.map((item, index) => (
            <div
              key={getItemKey ? getItemKey(item, index) : index}
              className={cn("min-w-0 shrink-0 grow-0 h-auto", slideBasis, slideClassName)}
            >
              {renderItem(item, index, index === selectedIndex)}
            </div>
          ))}
        </div>
      </div>

      {showFooter && (
        <div className="flex items-center justify-between pt-4">
          {showProgress && (
            <div className="flex items-center gap-3">
              {showIndex && (
                <span className="font-mono text-xs tabular-nums text-muted-foreground">
                  {padIndex(Math.min(selectedIndex + 1, items.length))}
                </span>
              )}

              <div className="relative h-px w-20 overflow-hidden bg-border sm:w-28">
                <div
                  className="absolute inset-y-0 left-0 bg-foreground transition-[width] duration-300 ease-out"
                  style={{ width: `${progressWidth}%` }}
                />
              </div>

              {showIndex && (
                <span className="font-mono text-xs tabular-nums text-muted-foreground">
                  {padIndex(items.length)}
                </span>
              )}
            </div>
          )}

          {!showProgress && showIndex && (
            <div className="font-mono text-xs tabular-nums text-muted-foreground">
              {padIndex(Math.min(selectedIndex + 1, items.length))}
              <span className="mx-1.5 text-muted-foreground/40">/</span>
              {padIndex(items.length)}
            </div>
          )}

          {showNavigation && (
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => emblaApi?.scrollPrev()}
                disabled={!canScrollPrev}
                aria-label={previousLabel}
                className={NAV_BUTTON_CLASSES}
              >
                <ArrowLeft className="size-4" />
              </Button>

              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => emblaApi?.scrollNext()}
                disabled={!canScrollNext}
                aria-label={nextLabel}
                className={NAV_BUTTON_CLASSES}
              >
                <ArrowRight className="size-4" />
              </Button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}