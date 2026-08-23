import { SearchX } from "lucide-react";
import { PropertyCard } from "./property-card";
import { PropertyListItem } from "./property-list-item";
import { EmptyState } from "@/components/ui/empty-state";
import type { Property } from "@/types/property";

export function PropertyGrid({ properties, view }: { properties: Property[]; view: "grid" | "list" }) {
  if (properties.length === 0) {
    return (
      <EmptyState
        icon={SearchX}
        title="No properties found"
        description="Try widening your budget range or clearing a filter — new listings are added every week."
      />
    );
  }

  if (view === "list") {
    return (
      <div className="flex flex-col gap-4">
        {properties.map((property) => (
          <PropertyListItem key={property.id} property={property} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
