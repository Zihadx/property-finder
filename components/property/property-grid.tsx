"use client";

import { motion, useReducedMotion } from "motion/react";
import { SearchX } from "lucide-react";
import { PropertyCard } from "./property-card";
import { HorizontalPropertyCard } from "./horizontal-property-card";
import { EmptyState } from "@/components/ui/empty-state";
import type { Property } from "@/types/property";

export function PropertyGrid({ properties, view }: { properties: Property[]; view: "grid" | "list" }) {
  const reduceMotion = useReducedMotion();

  if (properties.length === 0) {
    return (
      <EmptyState
        icon={SearchX}
        title="No properties found"
        description="Try widening your budget range or clearing a filter — new listings are added every week."
      />
    );
  }

  // Staggered entrance communicates "these are fresh results" when filters
  // change — capped delay so long result sets don't feel sluggish, and
  // skipped entirely when the user prefers reduced motion.
  const itemAnimation = (index: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.25, delay: Math.min(index, 8) * 0.04, ease: "easeOut" as const },
        };

  if (view === "list") {
    return (
      <div className="flex flex-col gap-4">
        {properties.map((property, index) => (
          <motion.div key={property.id} {...itemAnimation(index)}>
            <HorizontalPropertyCard property={property} />
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {properties.map((property, index) => (
        <motion.div key={property.id} {...itemAnimation(index)}>
          <PropertyCard property={property} />
        </motion.div>
      ))}
    </div>
  );
}
