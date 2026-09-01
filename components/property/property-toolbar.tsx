"use client";

import * as React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { SlidersHorizontal, LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Sheet } from "@/components/ui/sheet";
import { PropertyFiltersForm } from "./property-filters-form";
import { cn } from "@/lib/utils";

export function PropertyToolbar({ resultCount }: { resultCount: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filtersOpen, setFiltersOpen] = React.useState(false);

  const sort = searchParams.get("sort") ?? "newest";
  const view = searchParams.get("view") ?? "grid";

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`${pathname}?${params.toString()}`);
  }


return (
  <div className="border-b border-border/70 pb-5">
    <div className="flex flex-wrap items-center justify-between gap-5">
      {/* Results */}
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-[11px] tabular-nums tracking-[0.08em] text-foreground">
          {String(resultCount).padStart(2, "0")}
        </span>

        <span className="text-[9px] uppercase tracking-[0.24em] text-muted-foreground/50">
          Properties Found
        </span>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        <Button
          variant="outline"
          size="sm"
          className="
            h-10
            rounded-none
            border-border
            px-4
            text-[9px]
            font-medium
            uppercase
            tracking-[0.18em]
            lg:hidden
          "
          onClick={() => setFiltersOpen(true)}
        >
          <SlidersHorizontal className="mr-2 size-3.5" />
          Refine
        </Button>

        <Select
          value={sort}
          onChange={(e) => updateParam("sort", e.target.value)}
          className="
            h-10
            w-40
            rounded-none
            border-border
            bg-transparent
            text-[10px]
            tracking-wide
          "
          aria-label="Sort properties"
        >
          <option value="newest">Newest first</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="most-viewed">Most viewed</option>
        </Select>

        {/* View switch */}
        <div className="hidden h-10 items-center border border-border sm:flex">
          <button
            type="button"
            aria-label="Grid view"
            aria-pressed={view === "grid"}
            onClick={() => updateParam("view", "grid")}
            className={cn(
              "flex size-10 items-center justify-center transition-colors",
              view === "grid"
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <LayoutGrid className="size-3.5" strokeWidth={1.5} />
          </button>

          <button
            type="button"
            aria-label="List view"
            aria-pressed={view === "list"}
            onClick={() => updateParam("view", "list")}
            className={cn(
              "flex size-10 items-center justify-center border-l border-border transition-colors",
              view === "list"
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <List className="size-3.5" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>

    <Sheet
      open={filtersOpen}
      onClose={() => setFiltersOpen(false)}
      title="Refine Selection"
      side="bottom"
    >
      <PropertyFiltersForm onApply={() => setFiltersOpen(false)} />
    </Sheet>
  </div>
);


}
