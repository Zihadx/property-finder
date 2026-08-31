import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { PropertyPrice } from "./property-price";
import { PropertyStatusBadges } from "./property-status-badges";
import type { Property } from "@/types/property";

/**
 * Editorial rail card — full-bleed image with a scrim and the essentials
 * layered on top. Built for horizontal-scroll showcases ("New / Just
 * Listed", area highlight rails) where the image should carry the section
 * rather than sitting inside a boxed card with a separate text block.
 */
export function EditorialPropertyCard({ property }: { property: Property }) {
  return (
    <Link
      href={`/properties/${property.slug}`}
      className="group relative block aspect-[3/4] w-64 shrink-0 overflow-hidden rounded-[var(--radius-md)] bg-surface-muted"
    >
      <Image
        src={property.images[0]}
        alt={property.title}
        fill
        sizes="256px"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(28,27,25,0.92)] via-[rgba(28,27,25,0.3)] to-transparent" />

      <div className="absolute left-4 top-4">
        <PropertyStatusBadges property={property} />
      </div>

      <div className="absolute inset-x-4 bottom-4">
        <p className="flex items-center gap-1.5 text-xs text-primary-foreground/75">
          <MapPin className="h-3.5 w-3.5" />
          {property.location.area}
        </p>
        <h3 className="mt-1 font-display text-lg leading-snug text-primary-foreground">{property.title}</h3>
        <PropertyPrice
          price={property.price}
          purpose={property.purpose}
          size="sm"
          className="mt-1.5 text-primary-foreground"
        />
      </div>
    </Link>
  );
}
