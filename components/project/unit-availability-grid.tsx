"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ProjectFloor, UnitStatus } from "@/types/project";

const STATUS_LABEL: Record<UnitStatus, string> = {
  available: "Available",
  reserved: "Reserved",
  sold: "Sold",
};

const STATUS_CLASS: Record<UnitStatus, string> = {
  available:
    "border-border text-foreground hover:border-foreground",
  reserved:
    "border-amber-600/40 bg-amber-600/10 text-amber-700 cursor-default",
  sold:
    "border-border/50 bg-muted text-muted-foreground cursor-not-allowed",
};

export function UnitAvailabilityGrid({ floors }: { floors: ProjectFloor[] }) {
  const [selected, setSelected] = React.useState<string | null>(null);

  return (
    <div>
      {/* Legend */}
      <div className="mb-6 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
        <LegendDot className="border-border" label="Available" />
        <LegendDot className="border-amber-600/40 bg-amber-600/10" label="Reserved" />
        <LegendDot className="border-border/50 bg-muted" label="Sold" />
      </div>

      <div className="flex flex-col divide-y divide-border/60 border-y border-border/60">
        {floors.map((floor) => (
          <div
            key={floor.floor}
            className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:gap-6"
          >
            <span className="w-24 shrink-0 text-sm font-medium text-foreground">
              Floor {floor.floor}
            </span>

            <div className="flex flex-wrap gap-2">
              {floor.units.map((unit) => (
                <button
                  key={unit.unitId}
                  type="button"
                  disabled={unit.status === "sold"}
                  onClick={() =>
                    unit.status === "available" && setSelected(unit.unitId)
                  }
                  title={`${unit.unitId} — ${STATUS_LABEL[unit.status]}`}
                  className={cn(
                    "h-10 min-w-[4.5rem] border px-3 text-xs font-medium transition-colors",
                    STATUS_CLASS[unit.status],
                    selected === unit.unitId && "border-foreground bg-foreground text-background"
                  )}
                >
                  {unit.unitId}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="mt-6 flex flex-col items-start justify-between gap-4 border border-border/70 bg-card p-5 sm:flex-row sm:items-center">
          <p className="text-sm text-foreground">
            Unit <span className="font-medium">{selected}</span> is available.
            Talk to an advisor to check pricing and reserve it.
          </p>
          <Button asChild className="h-11 shrink-0 rounded-none px-6">
            <a href="#site-visit">Enquire about this unit</a>
          </Button>
        </div>
      )}
    </div>
  );
}

function LegendDot({ className, label }: { className: string; label: string }) {
  return (
    <span className="flex items-center gap-2">
      <span className={cn("h-3 w-3 border", className)} />
      {label}
    </span>
  );
}