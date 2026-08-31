import { areaService } from "@/services/area.service";
import { propertyService } from "@/services/property.service";
import { AreaPriceChart } from "./area-price-chart";
import { SectionHeading } from "./section-heading";
import { formatBDT } from "@/lib/utils";

/**
 * Milestone 13: buyer-facing decision support — average price by area,
 * catalog price range, property-type distribution. Deliberately not the
 * agency's internal analyticsService (leads, conversion funnel, lead
 * sources) — that's a different audience and doesn't belong on a public
 * page. Every number here traces to a real field on Property/Area, so
 * swapping the mock data for a real API keeps this working unchanged.
 */
export async function PropertyInsights() {
  const areas = await areaService.list();
  const chartData = [...areas]
    .sort((a, b) => b.averagePricePerSqft - a.averagePricePerSqft)
    .slice(0, 6)
    .map((a) => ({ area: a.name, pricePerSqft: a.averagePricePerSqft }));

  const priceRange = await propertyService.getPriceRange();
  const typeDistribution = await propertyService.getTypeDistribution();
  const totalListings = typeDistribution.reduce((sum, t) => sum + t.count, 0);

  return (
    <section className="border-t border-border bg-surface-muted">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <SectionHeading
          eyebrow="Know before you ask"
          title="What the market actually looks like"
          description="Real numbers pulled from the current catalog — not marketing copy."
        />

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-[var(--radius-md)] border border-border bg-surface p-6">
            <p className="ledger-label mb-4">Average price per sqft by area</p>
            <AreaPriceChart data={chartData} />
          </div>

          <div className="rounded-[var(--radius-md)] border border-border bg-surface p-6">
            <p className="ledger-label mb-4">Catalog price range</p>
            <div className="flex items-baseline justify-between gap-2">
              <div>
                <p className="ledger-value text-xl text-foreground sm:text-2xl">{formatBDT(priceRange.min)}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">Lowest listed</p>
              </div>
              <div className="text-center">
                <p className="ledger-value text-xl text-foreground sm:text-2xl">{formatBDT(priceRange.median)}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">Median</p>
              </div>
              <div className="text-right">
                <p className="ledger-value text-xl text-foreground sm:text-2xl">{formatBDT(priceRange.max)}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">Highest listed</p>
              </div>
            </div>

            <p className="ledger-label mb-3 mt-8">Property type distribution</p>
            <div className="flex flex-col gap-3">
              {typeDistribution.map(({ type, count }) => (
                <div key={type}>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{type}</span>
                    <span className="ledger-value text-foreground">{count}</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-surface-muted">
                    <div
                      className="h-full rounded-full bg-accent"
                      style={{ width: `${(count / totalListings) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
