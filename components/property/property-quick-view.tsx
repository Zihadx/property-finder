"use client";

import Link from "next/link";
import Image from "next/image";
import { Bed, Bath, Ruler, MapPin } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PropertyPrice } from "./property-price";
import type { Property } from "@/types/property";

const statusVariant: Record<Property["status"], "success" | "danger" | "warning" | "neutral"> = {
  Available: "success",
  Sold: "danger",
  Rented: "neutral",
  "Under Offer": "warning",
};

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
        <div className="absolute left-3 top-3 flex gap-2">
          <Badge variant={statusVariant[property.status]}>{property.status}</Badge>
          {property.featured && <Badge variant="accent">Featured</Badge>}
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

        <div className="mt-4 flex items-center gap-4 border-t border-border pt-4 text-sm text-muted-foreground">
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
