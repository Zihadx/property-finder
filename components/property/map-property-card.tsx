import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { PropertyPrice } from "./property-price";
import type { Property } from "@/types/property";

/**
 * Minimal card for map-pin popovers — a thumbnail preview, not a full
 * listing tile. Interactions stay to a single tap-through since map
 * popups have limited real estate and get dismissed easily.
 */
export function MapPropertyCard({ property }: { property: Property }) {
  return (
    <Link
      href={`/properties/${property.slug}`}
      className="group flex w-64 items-center gap-3 rounded-[var(--radius-md)] bg-surface p-2 shadow-[var(--shadow-lg)]"
    >
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-[var(--radius-sm)] bg-surface-muted">
        <Image src={property.images[0]} alt={property.title} fill sizes="56px" className="object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">{property.title}</p>
        <PropertyPrice price={property.price} purpose={property.purpose} size="sm" />
      </div>
      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
