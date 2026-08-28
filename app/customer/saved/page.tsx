"use client";

import * as React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { PropertyGrid } from "@/components/property/property-grid";
import { PropertyCardSkeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/hooks";
import { propertyService } from "@/services/property.service";
import type { Property } from "@/types/property";

export default function SavedPropertiesPage() {
  const favoriteIds = useAppSelector((state) => state.favorites.propertyIds);
  const [properties, setProperties] = React.useState<Property[] | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    propertyService.getByIds(favoriteIds).then((result) => {
      if (!cancelled) setProperties(result);
    });
    return () => {
      cancelled = true;
    };
  }, [favoriteIds]);

  if (properties === null) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <PropertyCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <EmptyState
        icon={Heart}
        title="No saved properties yet"
        description="Tap the heart icon on any listing to save it here for later."
        action={
          <Button asChild>
            <Link href="/properties">Browse Properties</Link>
          </Button>
        }
      />
    );
  }

  return <PropertyGrid properties={properties} view="grid" />;
}
