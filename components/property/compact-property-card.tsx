import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { PropertyPrice } from "./property-price";
import { propertyStatusVariant } from "./property-status";
import type { Property } from "@/types/property";

/**
 * Dense card for tight spaces — comparison drawers, "you may also like"
 * sidebars, mobile saved-list rows. No favorite/compare controls: the
 * surrounding context (compare bar, saved page) already owns those
 * actions, so this stays a single-purpose tap-through.
 */
export function CompactPropertyCard({ property }: { property: Property }) {
  return (
    <Link
      href={`/properties/${property.slug}`}
      className="group flex items-center gap-3 rounded-[var(--radius-md)] border border-border bg-surface p-2.5 transition-shadow hover:shadow-[var(--shadow-sm)]"
    >
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[var(--radius-sm)] bg-surface-muted">
        <Image src={property.images[0]} alt={property.title} fill sizes="64px" className="object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-display text-sm text-foreground group-hover:text-accent">{property.title}</p>
        <p className="mt-0.5 truncate text-xs text-muted-foreground">{property.location.area}</p>
        <div className="mt-1 flex items-center justify-between gap-2">
          <PropertyPrice price={property.price} purpose={property.purpose} size="sm" />
          <Badge variant={propertyStatusVariant[property.status]} className="shrink-0">
            {property.status}
          </Badge>
        </div>
      </div>
    </Link>
  );
}
