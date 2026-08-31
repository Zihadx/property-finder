"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PropertyPrice } from "./property-price";
import { PropertyFacts } from "./property-facts";
import { PropertyStatusBadges } from "./property-status-badges";
import type { Property } from "@/types/property";

export function PropertyQuickView({
  property,
  open,
  onClose,
}: {
  property: Property | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!property) return null;

  return (
    <Dialog open={open} onClose={onClose} title="Quick View" className="max-w-lg">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-muted">
        <Image src={property.images[0]} alt={property.title} fill sizes="512px" className="object-cover" />
        <div className="absolute left-3 top-3">
          <PropertyStatusBadges property={property} />
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-display text-xl text-foreground">{property.title}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          {property.location.address}
        </p>

        <div className="mt-4">
          <PropertyPrice price={property.price} purpose={property.purpose} />
        </div>

        <PropertyFacts property={property} className="mt-4 border-t border-border pt-4" />

        <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {property.description}
        </p>

        <Button asChild className="mt-5 w-full">
          <Link href={`/properties/${property.slug}`}>View Full Details</Link>
        </Button>
      </div>
    </Dialog>
  );
}
