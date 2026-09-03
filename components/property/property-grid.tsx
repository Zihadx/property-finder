
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SearchX } from "lucide-react";

import { PropertyCard } from "./property-card";
import { HorizontalPropertyCard } from "./horizontal-property-card";
import { EmptyState } from "@/components/ui/empty-state";
import type { Property } from "@/types/property";

interface PropertyGridProps {
  properties: Property[];
  view: "grid" | "list";
}

export function PropertyGrid({
  properties,
  view,
}: PropertyGridProps) {
  const reduceMotion = useReducedMotion();

  if (properties.length === 0) {
    return (
      <div className="py-16">
        <EmptyState
          icon={SearchX}
          title="No properties found"
          description="Try widening your budget range or clearing a filter — new listings are added every week."
        />
      </div>
    );
  }

  const itemAnimation = (index: number) =>
    reduceMotion
      ? {}
      : {
          initial: {
            opacity: 0,
            y: 18,
          },
          animate: {
            opacity: 1,
            y: 0,
          },
          transition: {
            duration: 0.7,
            delay: Math.min(index, 8) * 0.055,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        };

  /*
   * ─────────────────────────────────────────────
   * List View
   * ─────────────────────────────────────────────
   */

  if (view === "list") {
    return (
      <div className="relative">
        {/* List heading */}
        <div className="mb-6 flex items-center gap-4">
          <span className="text-[8px] font-medium uppercase tracking-[0.3em] text-muted-foreground/40">
            Selected Residences
          </span>

          <span
            aria-hidden="true"
            className="h-px w-12 bg-border"
          />

          <span className="font-mono text-[8px] tabular-nums tracking-[0.15em] text-muted-foreground/30">
            {String(properties.length).padStart(2, "0")}
          </span>
        </div>

        {/* Properties */}
        <div className="divide-y divide-border/50 border-y border-border/50">
          {properties.map((property, index) => (
            <motion.article
              key={property.id}
              {...itemAnimation(index)}
              className="
                group
                py-6
                transition-all
                duration-500
                first:pt-0
                last:pb-0
              "
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="text-[12px] font-mono font-medium uppercase tracking-[0.16em] text-muted-foreground/45 transition-colors duration-500 group-hover:text-foreground/70">
                  ID · {property.id}
                </span>

                <span
                  aria-hidden="true"
                  className="h-px flex-1 bg-border/50 transition-colors duration-500 group-hover:bg-foreground/20"
                />

                <span className="text-[7px] font-medium uppercase tracking-[0.25em] text-muted-foreground/35">
                  {property.type}
                </span>
              </div>

              <HorizontalPropertyCard property={property} />
            </motion.article>
          ))}
        </div>
      </div>
    );
  }

  /*
   * ─────────────────────────────────────────────
   * Grid View
   * ─────────────────────────────────────────────
   */

  return (
    <div>
      {/* Grid heading */}
      <div className="mb-7 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span
            aria-hidden="true"
            className="h-px w-8 bg-foreground/30"
          />

          <span className="text-[8px] font-medium uppercase tracking-[0.3em] text-muted-foreground/45">
            Curated Residences
          </span>
        </div>

        <span className="font-mono text-[8px] tabular-nums tracking-[0.16em] text-muted-foreground/35">
          {String(properties.length).padStart(2, "0")} / SELECTION
        </span>
      </div>

      {/* Property grid */}
      <div
        className="
          grid
          grid-cols-1
          gap-x-7
          gap-y-14
          sm:grid-cols-2
          xl:grid-cols-3
          xl:gap-x-8
          xl:gap-y-16
        "
      >
        {properties.map((property, index) => (
          <motion.article
            key={property.id}
            {...itemAnimation(index)}
            className="group relative min-w-0"
          >
            {/* Property identity */}
            <div className="mb-3 flex items-center gap-3">
              <span
                className="
                  font-mono
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-muted-foreground/80
                  transition-colors
                  duration-500
                  group-hover:text-foreground/70
                "
              >
                ID · {property.id}
              </span>

              <span
                aria-hidden="true"
                className="
                  h-px
                  flex-1
                  bg-border/80
                  transition-all
                  duration-700
                  ease-[cubic-bezier(0.22,1,0.36,1)]
                  group-hover:bg-foreground/50
                "
              />

              <span
                className="
                  text-[7px]
                  font-medium
                  uppercase
                  tracking-[0.25em]
                  text-muted-foreground/0
                  transition-all
                  duration-500
                  group-hover:text-muted-foreground/80
                "
              >
                {property.type}
              </span>
            </div>

            {/* Property card */}
            <div
              className="
                relative
                transition-all
                duration-700
                ease-[cubic-bezier(0.22,1,0.36,1)]
             
              "
            >
              <PropertyCard property={property} />
            </div>
          </motion.article>
        ))}
      </div>

      {/* End marker */}
      <div className="mt-16 flex items-center gap-5">
        <span
          aria-hidden="true"
          className="h-px flex-1 bg-border/50"
        />

        <span className="text-[7px] font-medium uppercase tracking-[0.3em] text-muted-foreground/30">
          End of selection
        </span>

        <span
          aria-hidden="true"
          className="h-px flex-1 bg-border/50"
        />
      </div>
    </div>
  );
}

