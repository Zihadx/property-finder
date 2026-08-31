import Link from "next/link";
import { propertyService } from "@/services/property.service";
import { EditorialPropertyCard } from "@/components/property";
import { SectionHeading } from "./section-heading";
import { Button } from "@/components/ui/button";

/**
 * Milestone 12: the "just arrived" feed. Reuses EditorialPropertyCard
 * (built in Milestone 05, unused until now) with its listed-date caption
 * turned on — newest-first order plus the date is the "alive" signal, no
 * separate "New" badge needed.
 */
export async function NewListings() {
  const listings = await propertyService.list({}, "newest");
  const latest = listings.slice(0, 8);

  if (latest.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
      <SectionHeading
        eyebrow="Fresh on the market"
        title="Just listed"
        description="The newest properties added to the catalog, most recent first."
        action={
          <Button variant="link" asChild>
            <Link href="/properties?sort=newest">View all →</Link>
          </Button>
        }
      />
      <div className="mt-10 flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {latest.map((property) => (
          <EditorialPropertyCard key={property.id} property={property} showListedDate />
        ))}
      </div>
    </section>
  );
}
