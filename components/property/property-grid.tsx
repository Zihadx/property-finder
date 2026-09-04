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

export function PropertyGrid({ properties, view }: PropertyGridProps) {
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
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.7,
            delay: Math.min(index, 8) * 0.055,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        };

  // List view
  if (view === "list") {
    return (
      <div className="divide-y divide-border/50 border-y border-border/50">
        {properties.map((property, index) => (
          <motion.article
            key={property.id}
            {...itemAnimation(index)}
            className="py-6 first:pt-0 last:pb-0"
          >
            <HorizontalPropertyCard property={property} />
          </motion.article>
        ))}
      </div>
    );
  }

  // Grid view
  return (
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
        <motion.article key={property.id} {...itemAnimation(index)}>
          <PropertyCard property={property} />
        </motion.article>
      ))}
    </div>
  );
}