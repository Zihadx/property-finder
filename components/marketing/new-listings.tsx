import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

import { propertyService } from "@/services/property.service";
import { EditorialPropertyCard } from "@/components/property";
import { SectionHeading } from "./section-heading";
import { Button } from "@/components/ui/button";
import { PropertyRail } from "./property-rail";


export async function NewListings() {
  const listings = await propertyService.list({}, "newest");
  const latest = listings.slice(0, 8);

  if (latest.length === 0) return null;

  return (
    <section className="border-t border-border/60 bg-background">
      <div className="container mx-auto px-6 py-14 sm:py-16 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
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

          <Button
            asChild
            variant="ghost"
            className="group w-fit gap-2 rounded-full px-0 text-xs font-medium uppercase tracking-[0.12em] hover:bg-transparent"
          >
            <Link href="/properties?sort=newest">
              View all
              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>

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
        </div>
      </div>
    </section>
  );
}