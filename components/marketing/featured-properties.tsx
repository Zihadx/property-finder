import Link from "next/link";
import { propertyService } from "@/services/property.service";
import { agentService } from "@/services/agent.service";
import { PropertyCard, FeaturedPropertyCard } from "@/components/property";
import { SectionHeading } from "./section-heading";
import { Button } from "@/components/ui/button";

/**
 * Milestone 06: an asymmetric composition — one signature listing gets the
 * magazine-cover treatment, with a supporting row underneath — rather than
 * six identical cards in a flat grid.
 */
export async function FeaturedProperties() {
  const featured = await propertyService.getFeatured(5);
  const [signature, ...supporting] = featured;
  if (!signature) return null;

  const agent = await agentService.getById(signature.agentId);

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

      <div className="mt-10">
        <FeaturedPropertyCard property={signature} agent={agent} />
      </div>

      {supporting.length > 0 && (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {supporting.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </section>
  );
}
