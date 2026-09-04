"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { FloorPlan } from "@/types/project";

export function FloorPlans({ plans }: { plans: FloorPlan[] }) {
  const bedroomOptions = Array.from(new Set(plans.map((p) => p.bedrooms))).sort(
    (a, b) => a - b
  );
  const [active, setActive] = React.useState(bedroomOptions[0]);

  const visible = plans.filter((p) => p.bedrooms === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2 border-b border-border/60 pb-4">
        {bedroomOptions.map((bedrooms) => (
          <button
            key={bedrooms}
            type="button"
            onClick={() => setActive(bedrooms)}
            className={cn(
              "h-10 border px-4 text-sm font-medium transition-colors",
              active === bedrooms
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:text-foreground"
            )}
          >
            {bedrooms} Bedroom
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-8 sm:grid-cols-2">
        {visible.map((plan) => (
          <a
            key={plan.id}
            href={plan.image}
            target="_blank"
            rel="noreferrer"
            className="group block"
          >
            <div className="relative aspect-[4/3] overflow-hidden border border-border/70 bg-muted">
              <Image
                src={plan.image}
                alt={plan.name}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="mt-3 flex items-center justify-between">
              <p className="text-sm font-medium text-foreground">{plan.name}</p>
              <p className="text-sm text-muted-foreground">{plan.areaSqft} sqft</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}