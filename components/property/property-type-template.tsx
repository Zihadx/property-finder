
import Link from "next/link";

import { SearchX } from "lucide-react";

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PropertyGrid } from "@/components/property/property-grid";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { propertyService } from "@/services/property.service";
import type { PropertyType } from "@/types/property";

export async function PropertyTypeTemplate({
  title,
  description,
  types,
}: {
  title: string;
  description: string;
  types: PropertyType[];
}) {
  const properties = await propertyService.listByTypes(types);

  const primaryType = types[0];
  const propertyCount = properties.length;
  const categoryLabel = types.join(" / ");

  const collectionHref = `/properties?type=${encodeURIComponent(
    primaryType,
  )}`;

  return (
    <>
      <SiteHeader />

      <main className="min-h-screen">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border">
          {/* Atmospheric background */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <div className="absolute -right-32 -top-32 size-96 rounded-full bg-primary/10 blur-3xl" />

            <div className="absolute -bottom-40 -left-32 size-96 rounded-full bg-primary/5 blur-3xl" />

            <div className="absolute right-1/4 top-1/2 size-72 -translate-y-1/2 rounded-full bg-foreground/2 blur-3xl" />
          </div>

          <div className="relative mx-auto grid container gap-8 px-6 py-10 sm:px-8 sm:py-12 lg:grid-cols-[1.6fr_1fr] lg:items-stretch lg:gap-10 lg:px-10 lg:py-14">
            {/* Title */}
            <div className="flex flex-col justify-center">
              <span
                aria-hidden="true"
                className="block h-px w-10 bg-primary"
              />

              <h1 className="mt-4 font-display text-4xl leading-[0.97] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {title}
              </h1>

              <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground sm:text-[15px] sm:leading-7">
                {description}
              </p>
            </div>

            {/* Collection plaque */}
            <div className="flex flex-col justify-between gap-5 border border-border bg-card/40 p-5 backdrop-blur-sm sm:p-6">
              <div className="flex items-center gap-4">
                {/* Collection mark */}
                <div
                  aria-hidden="true"
                  className="relative flex size-14 shrink-0 items-center justify-center rounded-full border border-primary/40"
                >
                  <div className="absolute inset-1 rounded-full border border-primary/15" />

                  <span className="font-display text-xl italic text-primary">
                    {primaryType.charAt(0).toUpperCase()}
                  </span>
                </div>

                <div>
                  <p className="font-display text-3xl leading-none tracking-tight text-foreground">
                    {propertyCount}
                  </p>

                  <p className="mt-1.5 text-[11px] text-muted-foreground">
                    {propertyCount === 1
                      ? "Listing available"
                      : "Listings available"}
                  </p>
                </div>
              </div>

              <div className="flex items-end justify-between gap-4 border-t border-border pt-4">
                <div className="min-w-0">
                  <p className="truncate text-[11px] text-muted-foreground">
                    {categoryLabel}
                  </p>

                  <p className="mt-1 text-[9px] uppercase tracking-[0.12em] text-primary">
                    Curated collection
                  </p>
                </div>

                <Link
                  href={collectionHref}
                  className="shrink-0 text-[12px] font-medium text-foreground underline decoration-primary/40 decoration-1 underline-offset-4 transition-colors duration-300 hover:text-primary focus-visible:text-primary focus-visible:outline-none"
                >
                  View collection
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Properties */}
        <section className="mx-auto container px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
          <div className="mb-5 flex items-baseline justify-between gap-6 border-b border-border pb-3">
            <h2 className="font-display text-xl tracking-tight text-foreground sm:text-2xl">
              Available now
            </h2>

            <p className="text-[11px] text-muted-foreground">
              {propertyCount}{" "}
              {propertyCount === 1 ? "property" : "properties"}
            </p>
          </div>

          {propertyCount > 0 ? (
            <PropertyGrid
              properties={properties}
              view="grid"
            />
          ) : (
            <EmptyState
              icon={SearchX}
              title="No properties found"
              description="There are currently no properties available in this collection. Browse the full catalogue to explore other opportunities."
              action={
                <Button
                  asChild
                  variant="outline"
                  className="h-9 rounded-none px-5 text-[11px] uppercase tracking-[0.12em]"
                >
                  <Link href="/properties">
                    Browse all properties
                  </Link>
                </Button>
              }
            />
          )}
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

