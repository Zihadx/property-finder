"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { PropertyPrice } from "./property-price";
import { PropertyFacts } from "./property-facts";
import { PropertyStatusBadges } from "./property-status-badges";
import { PropertyFavoriteButton } from "./property-favorite-button";
import type { Property } from "@/types/property";

/**
 * Landscape card for list views and dense feeds (search "list" toggle).
 * Same data as PropertyCard, laid out image-left/content-right so more
 * listings fit per scroll and the description gets room to breathe.
 */
export function HorizontalPropertyCard({ property }: { property: Property }) {
  return (
    <article className="group flex flex-col gap-4 overflow-hidden rounded-md border border-border bg-surface p-3 transition-shadow hover:shadow-(--shadow-md) sm:flex-row">
      <Link
        href={`/properties/${property.slug}`}
        className="relative block h-48 shrink-0 overflow-hidden rounded-md sm:h-auto sm:w-64"
      >
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          sizes="256px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute left-2 top-2">
          <PropertyStatusBadges property={property} />
        </div>
      </Link>

      <div className="flex flex-1 flex-col justify-between py-1">
        <div>
          <div className="flex items-start justify-between gap-3">
            <div>
              <Link href={`/properties/${property.slug}`}>
                <h3 className="font-display text-lg text-foreground hover:text-accent">{property.title}</h3>
              </Link>
              <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                {property.location.address}
              </p>
            </div>
            <PropertyFavoriteButton
              propertyId={property.id}
              className="shrink-0 bg-transparent backdrop-blur-none hover:bg-surface-muted"
            />
          </div>
          <p className="mt-3 line-clamp-2 max-w-xl text-sm text-muted-foreground">{property.description}</p>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <PropertyFacts property={property} />
          <PropertyPrice price={property.price} purpose={property.purpose} size="sm" />
        </div>
      </div>
    </article>
  );
}
