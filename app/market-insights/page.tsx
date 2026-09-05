import Link from "next/link";
import { ArrowUpRight, Crown, Sparkles } from "lucide-react";

import { areaService } from "@/services/area.service";
import { propertyService } from "@/services/property.service";
import type { Property, PropertyType } from "@/types/property";

import { formatBDT } from "@/lib/utils";
import { PropertyInsightsMotion } from "@/components/marketing/property-insights-motion";
import { RevealHeading } from "@/components/marketing/reveal-heading";
import { AreaPriceChart } from "@/components/marketing/area-price-chart";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

/**
 * Public market intelligence — restyled against the ListEasy editorial
 * system (hairline rules, tracked caps micro-labels, serif figures) and
 * consolidated into three sections: one composed snapshot (chart + price
 * range + inventory, side by side rather than stacked), a showcase, and a
 * single closing line.
 *
 * SiteHeader is rendered here on the same pattern as the existing
 * SiteFooter call at the bottom. If your root layout.tsx already renders a
 * global header, remove this import/usage — otherwise it'll render twice.
 *
 * The hero now reuses RevealHeading, the actual eyebrow/heading/side-note
 * pattern from How It Works (cyan-700 dash, stone-950/500/400 text) — the
 * Eyebrow() helper further down uses the same tokens for consistency.
 *
 * LUXURY_TYPES defines what counts as "the luxury segment" for the badge and
 * share stat. Adjust if your business draws that line differently.
 */
const LUXURY_TYPES: PropertyType[] = ["Luxury Apartment", "Penthouse", "Duplex"];

export default async function Page() {
  const [areas, priceRange, typeDistribution, showcase] = await Promise.all([
    areaService.list(),
    propertyService.getPriceRange(),
    propertyService.getTypeDistribution(),
    propertyService.list({ status: "Available", purpose: "Sale", featured: true }, "price-desc"),
  ]);

  const topAreas = [...areas].sort((a, b) => b.averagePricePerSqft - a.averagePricePerSqft).slice(0, 6);
  const chartData = topAreas.map((area) => ({ area: area.name, pricePerSqft: area.averagePricePerSqft }));
  const primeAddress = topAreas[0];

  const totalListings = typeDistribution.reduce((sum, item) => sum + item.count, 0);
  const highestType = [...typeDistribution].sort((a, b) => b.count - a.count)[0];

  const luxuryCount = typeDistribution
    .filter((item) => LUXURY_TYPES.includes(item.type))
    .reduce((sum, item) => sum + item.count, 0);
  const luxuryShare = totalListings > 0 ? (luxuryCount / totalListings) * 100 : 0;

  const featuredListings = showcase.slice(0, 3);

  return (
    <>
      <SiteHeader />

      <section className="border-t border-border/60 bg-muted/20">
        <div className="container mx-auto px-6 py-14 sm:py-16 lg:px-8 lg:py-20">
          <RevealHeading
            eyebrow="Private market intelligence"
            titleLead="An insider's view"
            titleMuted="of the luxury market."
            note={{
              lines: ["Every figure sourced", "from the live catalog."],
              bullet: "Updated automatically",
            }}
          />
        </div>

        <PropertyInsightsMotion>
          {/* Snapshot — chart, price range, and inventory composed side by side */}
          <div className="border-t border-border/60">
            <div className="container mx-auto px-6 py-12 sm:py-14 lg:px-8 lg:py-16">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <Eyebrow>Market snapshot</Eyebrow>
                <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                  {totalListings} active listings
                  {highestType && <> &middot; {highestType.type} most common</>}
                </span>
              </div>

              <div className="mt-8 grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
                {/* Left: chart */}
                <div>
                  <h3 className="font-display text-2xl tracking-tight text-foreground sm:text-3xl">
                    Average price by area.
                  </h3>
                  {primeAddress && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      Prime address right now:{" "}
                      <span className="font-medium text-foreground">{primeAddress.name}</span> at{" "}
                      {formatBDT(primeAddress.averagePricePerSqft)}/sqft
                    </p>
                  )}
                  <div className="mt-6 h-64">
                    <AreaPriceChart data={chartData} />
                  </div>
                </div>

                {/* Right: price range + luxury share + inventory, one compact stack */}
                <div className="flex flex-col divide-y divide-border/60">
                  <div className="pb-6">
                    <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                      Median asking price
                    </p>
                    <p className="mt-2 font-display text-3xl tracking-tight text-foreground sm:text-4xl">
                      {formatBDT(priceRange.median)}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Range {formatBDT(priceRange.min)} – {formatBDT(priceRange.max)}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 py-4 text-xs font-medium text-muted-foreground">
                    <Crown className="size-3.5" />
                    {luxuryShare.toFixed(0)}% of catalog is luxury-tier
                  </div>

                  <div className="pt-4">
                    <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                      Property types
                    </p>
                    <div className="mt-3 flex flex-col divide-y divide-border/60">
                      {typeDistribution.map(({ type, count }) => {
                        const percentage = totalListings > 0 ? (count / totalListings) * 100 : 0;
                        return (
                          <TypeRow
                            key={type}
                            type={type}
                            count={count}
                            percentage={percentage}
                            isLuxury={LUXURY_TYPES.includes(type)}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Showcase */}
          {featuredListings.length > 0 && (
            <div className="border-t border-border/60">
              <div className="container mx-auto px-6 py-12 sm:py-14 lg:px-8 lg:py-16">
                <Eyebrow>Handpicked</Eyebrow>
                <h3 className="mt-3 font-display text-xl tracking-tight text-foreground sm:text-2xl">
                  Currently showcasing
                </h3>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {featuredListings.map((property) => (
                    <ShowcaseCard key={property.id} property={property} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Closing meta line */}
          <div className="border-y border-border/60">
            <div className="container mx-auto flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between lg:px-8">
              <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Beyond the numbers
              </span>
              <Link
                href="/contact"
                className="group flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-foreground"
              >
                Request a private advisory call
                <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </PropertyInsightsMotion>

        <SiteFooter />
      </section>
    </>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span className="h-px w-10 bg-cyan-700" />
      <span className="text-[9px] font-medium uppercase tracking-[0.38em] text-stone-500">{children}</span>
    </div>
  );
}

function TypeRow({
  type,
  count,
  percentage,
  isLuxury,
}: {
  type: PropertyType;
  count: number;
  percentage: number;
  isLuxury: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-2.5">
      <span className="flex items-center gap-1.5 truncate text-xs font-medium text-foreground">
        {type}
        {isLuxury && <Crown className="size-3 shrink-0 text-muted-foreground" />}
      </span>
      <div className="flex shrink-0 items-center gap-2">
        <span className="h-1 w-14 overflow-hidden rounded-full bg-muted">
          <span className="block h-full rounded-full bg-foreground" style={{ width: `${percentage}%` }} />
        </span>
        <span className="w-6 text-right text-[11px] tabular-nums text-muted-foreground">{count}</span>
      </div>
    </div>
  );
}

function ShowcaseCard({ property }: { property: Property }) {
  const cover = property.images?.[0];

  return (
    <div className="flex flex-col gap-5 rounded-xl border border-border/60 bg-background/70 p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="size-12 shrink-0 overflow-hidden rounded-lg bg-muted/40">
            {cover ? (
              // eslint-disable-next-line @next/next/no-img-element -- external/mock image paths, no domain config assumed
              <img src={cover} alt={property.title} className="h-full w-full object-cover" loading="lazy" />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <Sparkles className="size-4 text-muted-foreground/40" />
              </div>
            )}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium tracking-tight text-foreground">{property.title}</p>
            <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{property.type}</p>
          </div>
        </div>
        <ArrowUpRight className="size-3.5 shrink-0 text-muted-foreground" />
      </div>

      <p className="text-xs text-muted-foreground">
        {property.location.area} &middot; {property.location.address}
      </p>

      <div className="grid grid-cols-2 divide-x divide-border/60 rounded-lg border border-border/60 text-center">
        <div className="px-3 py-2.5">
          <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Price</p>
          <p className="mt-0.5 text-sm font-semibold tracking-tight text-foreground">{formatBDT(property.price)}</p>
        </div>
        <div className="px-3 py-2.5">
          <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Size</p>
          <p className="mt-0.5 text-sm font-semibold tracking-tight text-foreground">
            {property.areaSqft.toLocaleString()} sqft
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <Link
          href={`/properties/${property.slug}`}
          className="flex-1 rounded-full border border-border/70 py-2 text-center text-xs font-medium tracking-tight text-foreground transition-colors hover:border-border"
        >
          View details
        </Link>
        <Link
          href="/contact"
          className="flex-1 rounded-full bg-foreground py-2 text-center text-xs font-medium tracking-tight text-background"
        >
          Enquire
        </Link>
      </div>
    </div>
  );
}