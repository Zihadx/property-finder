import { Bed, Bath, Ruler } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Property } from "@/types/property";

/**
 * Compact inline bed/bath/area row used across every card variant.
 * `PropertySpecs` (the full 6-field grid on the detail page) is a
 * different, heavier component — this is the condensed version so card
 * variants don't each re-implement the same three icons.
 */
export function PropertyFacts({
  property,
  size = "md",
  className,
}: {
  property: Property;
  size?: "sm" | "md";
  className?: string;
}) {
  const iconSize = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
  const textSize = size === "sm" ? "text-xs" : "text-sm";

  return (
    <div className={cn("flex items-center gap-3 text-muted-foreground", textSize, className)}>
      {property.bedrooms > 0 && (
        <span className="flex items-center gap-1.5">
          <Bed className={iconSize} />
          <span className="ledger-value">{property.bedrooms}</span>
        </span>
      )}
      {property.bathrooms > 0 && (
        <span className="flex items-center gap-1.5">
          <Bath className={iconSize} />
          <span className="ledger-value">{property.bathrooms}</span>
        </span>
      )}
      <span className="flex items-center gap-1.5">
        <Ruler className={iconSize} />
        <span className="ledger-value">{property.areaSqft.toLocaleString("en-BD")}</span>
        {size === "md" && " sqft"}
      </span>
    </div>
  );
}
