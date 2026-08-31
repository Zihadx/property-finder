"use client";

import Link from "next/link";
import { Heart, Scale } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { CompactPropertyCard, PropertyFavoriteButton, PropertyCompareButton } from "@/components/property";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./section-heading";
import type { Property } from "@/types/property";

/**
 * Live-wired, not a static mockup: the sidebar counts read straight from
 * the same favorites/compare Redux state the rest of the app uses, and
 * the heart/scale buttons on the preview cards are the same shared atoms
 * every property card uses elsewhere. Try it here, see it reflected on
 * /customer/saved and /compare.
 */
export function ShortlistPreviewClient({ suggestions }: { suggestions: Property[] }) {
  const savedCount = useAppSelector((state) => state.favorites.propertyIds.length);
  const compareIds = useAppSelector((state) => state.compare.propertyIds);
  const comparingCount = compareIds.length;

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
      <SectionHeading
        eyebrow="Shortlist as you browse"
        title="Save the ones you like, compare before you decide"
        description="Every listing has a save and compare control built in — try it on the properties below."
      />

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px]">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {suggestions.map((property) => (
            <div key={property.id} className="relative">
              <CompactPropertyCard property={property} />
              <div className="absolute right-2 top-1/2 flex -translate-y-1/2 gap-1.5">
                <PropertyFavoriteButton propertyId={property.id} size="sm" />
                <PropertyCompareButton propertyId={property.id} size="sm" />
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-between gap-6 rounded-[var(--radius-md)] border border-border bg-surface-muted p-6">
          <div>
            <p className="ledger-label mb-2">Your shortlist</p>
            <p className="ledger-value text-3xl text-foreground">{savedCount}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {savedCount === 1 ? "property saved" : "properties saved"}
            </p>
          </div>

          <div>
            <p className="ledger-label mb-2">Comparing</p>
            <p className="ledger-value text-3xl text-foreground">
              {comparingCount}
              <span className="text-base text-muted-foreground">/3</span>
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {comparingCount > 0 ? "ready to compare side by side" : "add up to 3 to compare"}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href="/customer/saved">
                <Heart className="mr-1.5 h-3.5 w-3.5" />
                View saved
              </Link>
            </Button>
            {comparingCount > 0 ? (
              <Button asChild size="sm">
                <Link href="/compare">
                  <Scale className="mr-1.5 h-3.5 w-3.5" />
                  Compare now
                </Link>
              </Button>
            ) : (
              <Button size="sm" disabled>
                <Scale className="mr-1.5 h-3.5 w-3.5" />
                Compare now
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
