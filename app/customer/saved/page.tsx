"use client";

import * as React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PropertyCard } from "@/components/property/property-card";
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

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-6 py-10">
        <p className="ledger-label mb-2">Your Account</p>
        <h1 className="font-display text-3xl text-foreground">Saved Properties</h1>

        <div className="mt-8">
          {properties === null ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <PropertyCardSkeleton key={i} />
              ))}
            </div>
          ) : properties.length === 0 ? (
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
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
