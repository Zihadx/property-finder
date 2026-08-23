import { PropertyCard } from "./property-card";
import type { Property } from "@/types/property";

export function SimilarProperties({ properties }: { properties: Property[] }) {
  if (properties.length === 0) return null;
  return (
    <section className="mt-16 border-t border-border pt-12">
      <h2 className="font-display text-2xl text-foreground">Similar properties</h2>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </section>
  );
}
