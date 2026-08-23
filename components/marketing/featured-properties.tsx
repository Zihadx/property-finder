import Link from "next/link";
import { propertyService } from "@/services/property.service";
import { PropertyCard } from "@/components/property/property-card";
import { SectionHeading } from "./section-heading";
import { Button } from "@/components/ui/button";

export async function FeaturedProperties() {
  const properties = await propertyService.getFeatured(6);

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
      <SectionHeading
        eyebrow="Curated selection"
        title="Featured listings"
        description="A handful of properties our agents are prioritizing this week."
        action={
          <Button variant="link" asChild>
            <Link href="/properties?featured=true">View all featured →</Link>
          </Button>
        }
      />
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </section>
  );
}
