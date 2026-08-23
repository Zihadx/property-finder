import { Bed, Bath, Ruler, Building2, Car, Layers } from "lucide-react";
import type { Property } from "@/types/property";

export function PropertySpecs({ property }: { property: Property }) {
  const specs = [
    { icon: Bed, label: "Bedrooms", value: property.bedrooms || "—" },
    { icon: Bath, label: "Bathrooms", value: property.bathrooms || "—" },
    { icon: Ruler, label: "Area", value: `${property.areaSqft.toLocaleString("en-BD")} sqft` },
    { icon: Building2, label: "Floor", value: property.floor ?? "—" },
    { icon: Layers, label: "Total Floors", value: property.totalFloors ?? "—" },
    { icon: Car, label: "Parking", value: property.parking },
  ];

  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-md)] border border-border bg-border sm:grid-cols-3">
      {specs.map((spec) => (
        <div key={spec.label} className="bg-surface p-4">
          <dt className="flex items-center gap-1.5 text-caption-foreground">
            <spec.icon className="h-3.5 w-3.5" />
            <span className="ledger-label">{spec.label}</span>
          </dt>
          <dd className="ledger-value mt-1.5 text-lg text-foreground">{spec.value}</dd>
        </div>
      ))}
    </dl>
  );
}
