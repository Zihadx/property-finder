"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Eye } from "lucide-react";
import { PropertyPrice } from "./property-price";
import { PropertyFacts } from "./property-facts";
import { PropertyStatusBadges } from "./property-status-badges";
import { PropertyFavoriteButton } from "./property-favorite-button";
import { PropertyCompareButton } from "./property-compare-button";
import { PropertyQuickView } from "./property-quick-view";
import type { Property } from "@/types/property";

/**
 * Default grid card — the workhorse variant for search-result grids and
 * similar-properties rails. Self-contained: save, compare, and quick view
 * all live on the card itself. See ./index.ts for the other signature
 * variants (Featured, Horizontal, Compact, Editorial, Map).
 */
export function PropertyCard({ property }: { property: Property }) {
  const [quickViewOpen, setQuickViewOpen] = React.useState(false);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[var(--radius-md)] border border-border bg-surface transition-shadow duration-200 hover:shadow-[var(--shadow-md)]">
      <Link href={`/properties/${property.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-surface-muted">
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute left-3 top-3">
            <PropertyStatusBadges property={property} />
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setQuickViewOpen(true);
            }}
            className="absolute inset-x-3 bottom-3 flex translate-y-2 items-center justify-center gap-2 rounded-[var(--radius-sm)] bg-surface/95 py-2 text-sm font-medium text-foreground opacity-0 backdrop-blur-sm transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100"
          >
            <Eye className="h-3.5 w-3.5" />
            Quick View
          </button>
        </div>
      </Link>

      <div className="absolute right-3 top-3 flex flex-col gap-2">
        <PropertyFavoriteButton propertyId={property.id} />
        <PropertyCompareButton propertyId={property.id} />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <Link href={`/properties/${property.slug}`}>
            <h3 className="font-display text-lg leading-snug text-foreground hover:text-accent">
              {property.title}
            </h3>
          </Link>
          <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            {property.location.area}
          </p>
        </div>

        <PropertyPrice price={property.price} purpose={property.purpose} />

        <PropertyFacts property={property} className="mt-1 border-t border-border pt-3" />
      </div>

      <PropertyQuickView property={property} open={quickViewOpen} onClose={() => setQuickViewOpen(false)} />
    </article>
  );
}
