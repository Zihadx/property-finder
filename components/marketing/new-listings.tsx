import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

import { propertyService } from "@/services/property.service";
import { EditorialPropertyCard } from "@/components/property";
import { SectionHeading } from "./section-heading";
import { PropertyRail } from "./property-rail";

export async function NewListings() {
  const listings = await propertyService.list({}, "newest");
  const latest = listings.slice(0, 8);

  if (latest.length === 0) return null;

  return (
    <section className="border-t border-border/60 bg-background">
      <div className="container mx-auto px-6 py-14 sm:py-16 lg:px-8 lg:py-20">
        {/* Header */}
        <div className="max-w-2xl">
          <div className="mb-4 flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-full border border-border/70 bg-muted/40">
              <Sparkles className="size-3.5" />
            </span>

            <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
              Fresh on the market
            </span>
          </div>

          <SectionHeading
            title="Just listed"
            description="The latest properties entering the collection, selected for buyers actively exploring Dhaka."
          />
        </div>

        {/* Property rail */}
        <div className="mt-9">
          <PropertyRail>
            {latest.map((property, index) => (
              <EditorialPropertyCard
                key={property.id}
                property={property}
                showListedDate
                index={index}
              />
            ))}
          </PropertyRail>

          {/* Mobile swipe cue */}
          <div className="mt-5 flex items-center justify-end animate-pulse">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-foreground/25" />

              <span className="text-[9px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
                Swipe to explore
              </span>
            </div>

          </div>
        </div>

        {/* Editorial footer */}
        <div className="mt-10 border-t border-border pt-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-lg text-[11px] leading-5 text-muted-foreground">
              We don&apos;t believe in listing everything. We believe in presenting
              the right properties, with the right context, at the right time.
            </p>

            <Link
              href="/properties?sort=newest"
              className="
                group
                inline-flex
                items-center
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-foreground
              "
            >
              Explore the full catalog

              <ArrowUpRight
                className="
                  ml-3
                  size-3.5
                  transition-transform
                  duration-500
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}