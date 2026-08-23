"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Scale, X } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { PropertyPrice } from "@/components/property/property-price";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeFromCompare, clearCompare } from "@/redux/slices/compareSlice";
import { propertyService } from "@/services/property.service";
import { formatBDT } from "@/lib/utils";
import type { Property } from "@/types/property";

const rows: { label: string; render: (p: Property) => React.ReactNode }[] = [
  { label: "Price", render: (p) => <PropertyPrice price={p.price} purpose={p.purpose} size="sm" /> },
  { label: "Location", render: (p) => p.location.area },
  { label: "Bedrooms", render: (p) => p.bedrooms || "—" },
  { label: "Bathrooms", render: (p) => p.bathrooms || "—" },
  { label: "Area", render: (p) => `${p.areaSqft.toLocaleString("en-BD")} sqft` },
  { label: "Price / sqft", render: (p) => formatBDT(Math.round(p.price / p.areaSqft)) },
  { label: "Parking", render: (p) => p.parking },
  { label: "Status", render: (p) => p.status },
  { label: "Amenities", render: (p) => p.amenities.slice(0, 4).join(", ") || "—" },
];

export default function ComparePage() {
  const dispatch = useAppDispatch();
  const compareIds = useAppSelector((state) => state.compare.propertyIds);
  const [properties, setProperties] = React.useState<Property[] | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    propertyService.getByIds(compareIds).then((result) => {
      if (!cancelled) setProperties(result);
    });
    return () => {
      cancelled = true;
    };
  }, [compareIds]);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="ledger-label mb-2">Comparison</p>
            <h1 className="font-display text-3xl text-foreground">Compare Properties</h1>
          </div>
          {properties && properties.length > 0 && (
            <Button variant="outline" size="sm" onClick={() => dispatch(clearCompare())}>
              Clear all
            </Button>
          )}
        </div>

        <div className="mt-8">
          {properties === null ? null : properties.length === 0 ? (
            <EmptyState
              icon={Scale}
              title="Nothing to compare yet"
              description="Select the scale icon on up to 3 property cards to compare them side by side."
              action={
                <Button asChild>
                  <Link href="/properties">Browse Properties</Link>
                </Button>
              }
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse">
                <thead>
                  <tr>
                    <th className="w-40 border-b border-border p-3 text-left" />
                    {properties.map((p) => (
                      <th key={p.id} className="border-b border-border p-3 text-left align-top">
                        <div className="relative mb-3 aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-sm)]">
                          <Image src={p.images[0]} alt={p.title} fill sizes="240px" className="object-cover" />
                          <button
                            type="button"
                            onClick={() => dispatch(removeFromCompare(p.id))}
                            aria-label={`Remove ${p.title} from comparison`}
                            className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-surface/90"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <Link href={`/properties/${p.slug}`} className="font-display text-base text-foreground hover:text-accent">
                          {p.title}
                        </Link>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.label}>
                      <th scope="row" className="ledger-label border-b border-border p-3 text-left align-top">
                        {row.label}
                      </th>
                      {properties.map((p) => (
                        <td key={p.id} className="border-b border-border p-3 align-top text-sm text-foreground">
                          {row.render(p)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
