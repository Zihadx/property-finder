import { BedDouble, Ruler } from "lucide-react";
import { formatBDT } from "@/lib/currency";
import type { ProjectUnitType } from "@/types/project";

export function UnitTypes({ unitTypes }: { unitTypes: ProjectUnitType[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {unitTypes.map((unit) => (
        <div key={unit.id} className="border border-border/70 p-6">
          <p className="text-sm font-medium text-muted-foreground">{unit.name}</p>

          <p className="mt-4 font-display text-2xl text-foreground">
            {formatBDT(unit.startingPrice)}
            <span className="ml-1 text-base font-normal text-muted-foreground">+</span>
          </p>

          <div className="mt-5 flex items-center gap-5 border-t border-border/60 pt-5 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Ruler className="size-4" strokeWidth={1.5} />
              {unit.areaSqft.toLocaleString()} sqft
            </span>
            <span className="flex items-center gap-1.5">
              <BedDouble className="size-4" strokeWidth={1.5} />
              {unit.bedrooms} Bed
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}