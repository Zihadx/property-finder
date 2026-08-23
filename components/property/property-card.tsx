"use client";

import Link from "next/link";
import Image from "next/image";
import { Bed, Bath, Ruler, Heart, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PropertyPrice } from "./property-price";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleFavorite } from "@/redux/slices/favoritesSlice";
import { cn } from "@/lib/utils";
import type { Property } from "@/types/property";

const statusVariant: Record<Property["status"], "success" | "danger" | "warning" | "neutral"> = {
  Available: "success",
  Sold: "danger",
  Rented: "neutral",
  "Under Offer": "warning",
};

export function PropertyCard({ property }: { property: Property }) {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector((state) => state.favorites.propertyIds.includes(property.id));

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
          <div className="absolute left-3 top-3 flex gap-2">
            <Badge variant={statusVariant[property.status]}>{property.status}</Badge>
            {property.featured && <Badge variant="accent">Featured</Badge>}
          </div>
        </div>
      </Link>

      <button
        type="button"
        aria-label={isFavorite ? "Remove from saved properties" : "Save property"}
        aria-pressed={isFavorite}
        onClick={() => dispatch(toggleFavorite(property.id))}
        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-surface/90 backdrop-blur-sm transition-colors hover:bg-surface"
      >
        <Heart
          className={cn("h-4 w-4 transition-colors", isFavorite ? "fill-danger text-danger" : "text-foreground")}
        />
      </button>

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

        <div className="mt-1 flex items-center gap-4 border-t border-border pt-3 text-sm text-muted-foreground">
          {property.bedrooms > 0 && (
            <span className="flex items-center gap-1.5">
              <Bed className="h-4 w-4" />
              <span className="ledger-value">{property.bedrooms}</span>
            </span>
          )}
          {property.bathrooms > 0 && (
            <span className="flex items-center gap-1.5">
              <Bath className="h-4 w-4" />
              <span className="ledger-value">{property.bathrooms}</span>
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Ruler className="h-4 w-4" />
            <span className="ledger-value">{property.areaSqft.toLocaleString("en-BD")}</span> sqft
          </span>
        </div>
      </div>
    </article>
  );
}
