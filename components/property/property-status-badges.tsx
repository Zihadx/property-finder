import { Badge } from "@/components/ui/badge";
import { propertyStatusVariant } from "./property-status";
import type { Property } from "@/types/property";

/** Status + "Featured" badge pair, shared by every card variant and the detail page hero. */
export function PropertyStatusBadges({ property }: { property: Property }) {
  return (
    <div className="flex gap-2">
      <Badge variant={propertyStatusVariant[property.status]}>{property.status}</Badge>
      {property.featured && <Badge variant="accent">Featured</Badge>}
    </div>
  );
}
