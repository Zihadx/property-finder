"use client";

import * as React from "react";
import { ArrowUpRight, Check, LockKeyhole } from "lucide-react";

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
    "border-border/80 bg-background text-foreground hover:border-foreground hover:bg-foreground hover:text-background",
  reserved:
    "cursor-default border-amber-600/30 bg-amber-600/[0.06] text-amber-700",
  sold:
    "cursor-not-allowed border-border/40 bg-muted/60 text-muted-foreground/50",
};

export function UnitAvailabilityGrid({
  floors,
}: {
  floors: ProjectFloor[];
}) {
  const [selected, setSelected] = React.useState<string | null>(null);

 const getSelectedUnit = (
  floors: ProjectFloor[],
  selected: string | null
) => {
  if (!selected) return null;

  for (const floor of floors) {
    const unit = floor.units.find(
      (item) => item.unitId === selected
    );

    if (unit) {
      return {
        ...unit,
        floor: floor.floor,
      };
    }
  }

  return null;
};
const selectedUnit = getSelectedUnit(floors, selected);

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Live availability
          </p>

          <h3 className="mt-2 font-display text-2xl tracking-[-0.03em] text-foreground sm:text-3xl">
            Choose your unit.
          </h3>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
          <Legend
            type="available"
            label="Available"
          />

          <Legend
            type="reserved"
            label="Reserved"
          />

          <Legend
            type="sold"
            label="Sold"
          />
        </div>
      </div>

      {/* Floor list */}
      <div className="overflow-hidden border-y border-border/60">
        {floors.map((floor, floorIndex) => (
          <div
            key={floor.floor}
            className={cn(
              "group flex flex-col gap-5 py-6 sm:flex-row sm:items-start sm:gap-8",
              floorIndex !== floors.length - 1 &&
                "border-b border-border/50"
            )}
          >
            {/* Floor number */}
            <div className="flex shrink-0 items-center gap-3 sm:w-28 sm:pt-2">
              <span className="font-display text-2xl tracking-[-0.03em] text-foreground">
                {String(floor.floor).padStart(2, "0")}
              </span>

              <span className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                Floor
              </span>
            </div>

            {/* Units */}
            <div className="grid flex-1 grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {floor.units.map((unit) => {
                const isSelected = selected === unit.unitId;
                const isAvailable = unit.status === "available";
                const isReserved = unit.status === "reserved";

                return (
                  <button
                    key={unit.unitId}
                    type="button"
                    disabled={!isAvailable}
                    onClick={() =>
                      isAvailable &&
                      setSelected((current) =>
                        current === unit.unitId ? null : unit.unitId
                      )
                    }
                    aria-pressed={isSelected}
                    aria-label={`${unit.unitId} — ${STATUS_LABEL[unit.status]}`}
                    className={cn(
                      "group/unit relative flex h-14 items-center justify-between border px-3.5 text-left transition-all duration-300",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2",
                      STATUS_CLASS[unit.status],
                      isSelected &&
                        "border-foreground bg-foreground text-background"
                    )}
                  >
                    <span className="text-xs font-medium">
                      {unit.unitId}
                    </span>

                    {isAvailable && (
                      <span
                        className={cn(
                          "flex size-5 items-center justify-center rounded-full border border-border/70 transition-all duration-300",
                          "group-hover/unit:border-current",
                          isSelected &&
                            "border-background/30 bg-background/10"
                        )}
                      >
                        {isSelected ? (
                          <Check
                            className="size-3"
                            strokeWidth={2}
                          />
                        ) : (
                          <ArrowUpRight
                            className="size-3 opacity-0 transition-opacity duration-300 group-hover/unit:opacity-100"
                            strokeWidth={1.5}
                          />
                        )}
                      </span>
                    )}

                    {isReserved && (
                      <LockKeyhole
                        className="size-3.5 opacity-60"
                        strokeWidth={1.5}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Selected unit */}
      <div
        className={cn(
          "grid transition-[grid-template-rows,opacity,margin] duration-500",
          selectedUnit
            ? "mt-6 grid-rows-[1fr] opacity-100"
            : "mt-0 grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="min-h-0 overflow-hidden">
          {selectedUnit && (
            <div className="relative overflow-hidden border border-foreground/15 bg-foreground text-background">
              {/* subtle accent */}
              <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-[#2095AE]/20 to-transparent" />

              <div className="relative flex flex-col gap-6 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center border border-background/15 bg-background/5">
                    <Check
                      className="size-4"
                      strokeWidth={1.5}
                    />
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-background/50">
                      Selected unit
                    </p>

                    <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="font-display text-xl tracking-[-0.025em]">
                        {selectedUnit.unitId}
                      </span>

                      <span className="text-xs text-background/50">
                        Floor {selectedUnit.floor}
                      </span>
                    </div>

                    <p className="mt-2 max-w-md text-xs leading-5 text-background/60">
                      This unit is currently available. Contact an
                      advisor for pricing, availability and reservation
                      details.
                    </p>
                  </div>
                </div>

                <Button
                  asChild
                  className="group h-11 w-full shrink-0 rounded-none bg-background px-5 text-foreground hover:bg-background/90 sm:w-auto"
                >
                  <a href="#site-visit">
                    Enquire about unit
                    <ArrowUpRight
                      className="ml-3 size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      strokeWidth={1.5}
                    />
                  </a>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Legend({
  type,
  label,
}: {
  type: UnitStatus;
  label: string;
}) {
  const styles: Record<UnitStatus, string> = {
    available: "border-border bg-background",
    reserved: "border-amber-600/30 bg-amber-600/10",
    sold: "border-border/40 bg-muted",
  };

  return (
    <span className="flex items-center gap-2">
      <span
        className={cn(
          "size-2.5 border",
          styles[type]
        )}
      />

      <span>{label}</span>
    </span>
  );
}