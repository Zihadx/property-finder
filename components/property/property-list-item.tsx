"use client";

import Link from "next/link";
import Image from "next/image";
import { Bed, Bath, Ruler, MapPin, Heart } from "lucide-react";
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

export function PropertyListItem({ property }: { property: Property }) {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector((state) => state.favorites.propertyIds.includes(property.id));

  return (
    <article className="group flex flex-col gap-4 overflow-hidden rounded-[var(--radius-md)] border border-border bg-surface p-3 transition-shadow hover:shadow-[var(--shadow-md)] sm:flex-row">
      <Link href={`/properties/${property.slug}`} className="relative block h-48 shrink-0 overflow-hidden rounded-[var(--radius-sm)] sm:h-auto sm:w-64">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          sizes="256px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute left-2 top-2 flex gap-2">
          <Badge variant={statusVariant[property.status]}>{property.status}</Badge>
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
            <button
              type="button"
              aria-label={isFavorite ? "Remove from saved properties" : "Save property"}
              aria-pressed={isFavorite}
              onClick={() => dispatch(toggleFavorite(property.id))}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full hover:bg-surface-muted"
            >
              <Heart className={cn("h-4 w-4", isFavorite ? "fill-danger text-danger" : "text-foreground")} />
            </button>
          </div>
          <p className="mt-3 line-clamp-2 max-w-xl text-sm text-muted-foreground">{property.description}</p>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
          <PropertyPrice price={property.price} purpose={property.purpose} size="sm" />
        </div>
      </div>
    </article>
  );
}
