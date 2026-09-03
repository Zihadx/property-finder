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

  renderItem: (
    item: T,
    index: number,
    isSelected: boolean
  ) => React.ReactNode;

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

  /*
   * Embla owns these values.
   * Do NOT create separate React state for them.
   */
  const canScrollPrev = emblaApi?.canScrollPrev() ?? false;
  const canScrollNext = emblaApi?.canScrollNext() ?? false;

  /*
   * Subscribe to Embla events.
   *
   * Important:
   * We intentionally DO NOT call handleSelect()
   * or handleScroll() synchronously inside the effect.
   *
   * This avoids React's:
   * "Calling setState synchronously within an effect"
   * warning.
   */
  React.useEffect(() => {
    if (!emblaApi) return;

    const handleSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    const handleScroll = () => {
      setScrollProgress(emblaApi.scrollProgress());
    };

    const handleReInit = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setScrollProgress(emblaApi.scrollProgress());
    };

    emblaApi.on("select", handleSelect);
    emblaApi.on("scroll", handleScroll);
    emblaApi.on("reInit", handleReInit);

    return () => {
      emblaApi.off("select", handleSelect);
      emblaApi.off("scroll", handleScroll);
      emblaApi.off("reInit", handleReInit);
    };
  }, [emblaApi]);

  /*
   * Keyboard navigation.
   */
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

    return () => {
      viewport.removeEventListener("keydown", handleKeyDown);
    };
  }, [emblaApi]);

  if (!items.length) {
    return null;
  }

  /*
   * Keep the progress rail visually useful even
   * when Embla reports 0 initially.
   */
  const progressWidth =
    items.length > 1
      ? Math.max(Math.min(scrollProgress * 100, 100), 8)
      : 100;

  return (
    <section
      className={cn("relative w-full", className)}
      aria-label={ariaLabel}
    >
      {/* Carousel viewport */}
      <div
        ref={emblaRef}
        tabIndex={0}
        className={cn(
          "w-full overflow-hidden",
          "touch-pan-y",
          "outline-none",
          "focus-visible:ring-1 focus-visible:ring-[#2095AE]/40",
          viewportClassName
        )}
      >
        {/* Carousel track */}
        <div
          className={cn(
            "flex items-stretch",
            GAP_CLASSES[gap],
            trackClassName
          )}
        >
          {items.map((item, index) => {
            const isSelected = index === selectedIndex;

            return (
              <div
                key={getItemKey ? getItemKey(item, index) : index}
                className={cn(
                  "min-w-0 shrink-0 grow-0",
                  "h-auto",
                  slideBasis,
                  slideClassName
                )}
              >
                {renderItem(item, index, isSelected)}
              </div>
            );
          })}
        </div>
      </div>

      {/* Carousel footer */}
      {(showNavigation || showProgress || showIndex) && (
        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          {/* Progress */}
          {showProgress && (
            <div className="flex items-center gap-3">
              {showIndex && (
                <span className="font-mono text-xs tabular-nums text-muted-foreground">
                  {String(
                    Math.min(selectedIndex + 1, items.length)
                  ).padStart(2, "0")}
                </span>
              )}

              <div className="relative h-px w-20 overflow-hidden bg-border sm:w-28">
                <div
                  className="absolute inset-y-0 left-0 bg-foreground transition-[width] duration-300 ease-out"
                  style={{
                    width: `${progressWidth}%`,
                  }}
                />
              </div>

              {showIndex && (
                <span className="font-mono text-xs tabular-nums text-muted-foreground">
                  {String(items.length).padStart(2, "0")}
                </span>
              )}
            </div>
          )}

          {/* Index only */}
          {!showProgress && showIndex && (
            <div className="font-mono text-xs tabular-nums text-muted-foreground">
              {String(
                Math.min(selectedIndex + 1, items.length)
              ).padStart(2, "0")}

              <span className="mx-1.5 text-muted-foreground/40">
                /
              </span>

              {String(items.length).padStart(2, "0")}
            </div>
          )}

          {/* Navigation */}
          {showNavigation && (
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => emblaApi?.scrollPrev()}
                disabled={!canScrollPrev}
                aria-label={previousLabel}
                className={cn(
                  "size-9 rounded-full",
                  "border-border bg-background",
                  "transition-all duration-300",
                  "hover:border-foreground",
                  "hover:bg-foreground",
                  "hover:text-background",
                  "disabled:pointer-events-none",
                  "disabled:opacity-30"
                )}
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
                className={cn(
                  "size-9 rounded-full",
                  "border-border bg-background",
                  "transition-all duration-300",
                  "hover:border-foreground",
                  "hover:bg-foreground",
                  "hover:text-background",
                  "disabled:pointer-events-none",
                  "disabled:opacity-30"
                )}
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