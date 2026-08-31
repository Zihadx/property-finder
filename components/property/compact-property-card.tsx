
"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { PropertyPrice } from "./property-price";
import { propertyStatusVariant } from "./property-status";
import type { Property } from "@/types/property";

/**
 * Compact property card
 *
 * Designed for:
 * - comparison drawers
 * - saved-property previews
 * - recommendation rails
 * - sidebars
 * - dense discovery surfaces
 *
 * The component intentionally stays compact.
 * Visual hierarchy comes from spacing, typography, image treatment,
 * and interaction rather than additional UI elements.
 */
export function CompactPropertyCard({
  property,
}: {
  property: Property;
}) {
  return (
    <Link
      href={`/properties/${property.slug}`}
      className="group relative flex min-w-0 items-center gap-3 border border-border/70 bg-card p-2 transition-all duration-300 ease-out hover:border-foreground/20 hover:bg-muted/30"
    >
      {/* Property image */}
      <div className="relative size-17 shrink-0 overflow-hidden bg-muted">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          sizes="68px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Image edge */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10"
        />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1 py-0.5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate font-display text-sm leading-tight tracking-[-0.01em] text-foreground transition-colors duration-200 group-hover:text-accent">
              {property.title}
            </p>

            <p className="mt-1 flex min-w-0 items-center gap-1 truncate text-xs text-muted-foreground">
              <MapPin className="size-3 shrink-0" />
              <span className="truncate">{property.location.area}</span>
            </p>
          </div>

          {/* Directional affordance */}
          <span
            aria-hidden="true"
            className="flex size-6 shrink-0 items-center justify-center border border-border/70 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
          >
            <ArrowUpRight className="size-3" />
          </span>
        </div>

        <div className="mt-2.5 flex items-center justify-between gap-2 border-t border-border/60 pt-2">
          <PropertyPrice
            price={property.price}
            purpose={property.purpose}
            size="sm"
          />

          <Badge
            variant={propertyStatusVariant[property.status]}
            className="h-5 shrink-0 rounded-sm px-1.5 text-[9px] font-medium uppercase tracking-[0.08em]"
          >
            {property.status}
          </Badge>
        </div>
      </div>
    </Link>
  );
}

