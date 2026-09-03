import { BarChart3, TrendingUp } from "lucide-react";

import { areaService } from "@/services/area.service";
import { propertyService } from "@/services/property.service";

import { formatBDT } from "@/lib/utils";
import { SectionHeading } from "@/components/marketing/section-heading";
import { PropertyInsightsMotion } from "@/components/marketing/property-insights-motion";
import { AreaPriceChart } from "@/components/marketing/area-price-chart";
import { SiteFooter } from "@/components/layout/site-footer";
import Image from "next/image";

/**
 * Public market intelligence.
 *
 * Keeps buyer-facing market context separate from internal agency analytics.
 * All values are derived from the existing property/area services.
 */
export default async function Page() {
  const areas = await areaService.list();
  // ...rest unchanged

  const chartData = [...areas]
    .sort((a, b) => b.averagePricePerSqft - a.averagePricePerSqft)
    .slice(0, 6)
    .map((area) => ({
      area: area.name,
      pricePerSqft: area.averagePricePerSqft,
    }));

  const priceRange = await propertyService.getPriceRange();
  const typeDistribution = await propertyService.getTypeDistribution();

  const totalListings = typeDistribution.reduce(
    (sum, item) => sum + item.count,
    0,
  );

  const highestType = [...typeDistribution].sort(
    (a, b) => b.count - a.count,
  )[0];

  return (
    <section className="border-t border-border/60 bg-muted/20">
      <div className="container mx-auto px-6 py-14 sm:py-16 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-10">
          {/* Header */}
          <SectionHeading
            eyebrow="Market intelligence"
            title="A clearer view of the market."
            description="Current catalog data, presented to help you understand pricing and availability before you make a decision."
          />

          {/* Main insight surface */}
          <PropertyInsightsMotion>
            <div className="overflow-hidden rounded-2xl border border-border/70 bg-background shadow-sm">
              {/* Top utility bar */}
              <div className="flex flex-col gap-4 border-b border-border/60 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-xl border border-border/70 bg-muted/40">
                    <BarChart3 className="size-4" />
                  </div>

                  <div>
                    <p className="text-sm font-medium tracking-tight text-foreground">
                      Current market snapshot
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Based on active catalog listings
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  Live catalog data
                </div>
              </div>

              {/* Content */}
              <div className="grid lg:grid-cols-[1.35fr_0.65fr]">
                {/* Price chart */}
                <div className="min-w-0 border-b border-border/60 p-5 sm:p-6 lg:border-b-0 lg:border-r">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                        Price intelligence
                      </p>

                      <h3 className="mt-1.5 font-display text-xl tracking-tight text-foreground">
                        Average price by area
                      </h3>
                    </div>

                    <TrendingUp className="size-4 text-muted-foreground" />
                  </div>

                  <div className="mt-6 h-60">
                    <AreaPriceChart data={chartData} />
                  </div>
                </div>

                {/* Pricing */}
                <div className="p-5 sm:p-6">
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    Catalog range
                  </p>

                  <div className="mt-5 divide-y divide-border/60">
                    <InsightMetric
                      label="Lowest listed"
                      value={formatBDT(priceRange.min)}
                    />

                    <InsightMetric
                      label="Median asking price"
                      value={formatBDT(priceRange.median)}
                      emphasized
                    />

                    <InsightMetric
                      label="Highest listed"
                      value={formatBDT(priceRange.max)}
                    />
                  </div>

                  <div className="mt-7 rounded-xl border border-border/60 bg-muted/30 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                          Catalog depth
                        </p>

                        <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
                          {totalListings}
                        </p>
                      </div>

                      {highestType && (
                        <div className="text-right">
                          <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                            Most represented
                          </p>

                          <p className="mt-1 max-w-28 truncate text-sm font-medium text-foreground">
                            {highestType.type}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Distribution */}
              <div className="border-t border-border/60 px-5 py-5 sm:px-6 sm:py-6">
                <div className="mb-5 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                      Inventory mix
                    </p>

                    <h3 className="mt-1.5 text-base font-medium tracking-tight text-foreground">
                      Property types
                    </h3>
                  </div>

                  <span className="hidden text-xs text-muted-foreground sm:block">
                    {totalListings} active listings
                  </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {typeDistribution.map(({ type, count }, index) => {
                    const percentage =
                      totalListings > 0 ? (count / totalListings) * 100 : 0;

                    return (
                      <PropertyTypeMetric
                        key={type}
                        type={type}
                        count={count}
                        percentage={percentage}
                        index={index}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </PropertyInsightsMotion>
        </div>
      </div>


        <div>
            <Image 
            width={400}
            height={400}
            src="/images/homepage-convirt.png" 
            alt="Market Insights" 
            className="w-[650px] h-[500px] rounded-lg mx-auto my-8"
            />
        </div>
  

      <SiteFooter />
    </section>
  );
}

function InsightMetric({
  label,
  value,
  emphasized = false,
}: {
  label: string;
  value: string;
  emphasized?: boolean;
}) {
  return (
    <div className="flex items-end justify-between gap-4 py-4 first:pt-0 last:pb-0">
      <span className="text-xs text-muted-foreground">{label}</span>

      <span
        className={
          emphasized
            ? "text-lg font-semibold tracking-tight text-foreground"
            : "text-sm font-medium tracking-tight text-foreground"
        }
      >
        {value}
      </span>
    </div>
  );
}

function PropertyTypeMetric({
  type,
  count,
  percentage,
  index,
}: {
  type: string;
  count: number;
  percentage: number;
  index: number;
}) {
  return (
    <div className="group rounded-xl border border-border/60 bg-background/70 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-border hover:shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <span className="truncate text-xs font-medium text-foreground">
          {type}
        </span>

        <span className="text-xs tabular-nums text-muted-foreground">
          {count}
        </span>
      </div>

      <div className="mt-3 h-1 overflow-hidden rounded-full bg-muted">
        <PropertyTypeBar percentage={percentage} index={index} />
      </div>

      <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
        <span>Share</span>
        <span>{percentage.toFixed(0)}%</span>
      </div>

    </div>
    
  );
}

async function PropertyTypeBar({
  percentage,
  index,
}: {
  percentage: number;
  index: number;
}) {
  return (
    <div
      className="h-full origin-left rounded-full bg-foreground transition-[width] duration-700 ease-out"
      style={{
        width: `${percentage}%`,
        animationDelay: `${index * 80}ms`,
      }}
    />
  );
}
