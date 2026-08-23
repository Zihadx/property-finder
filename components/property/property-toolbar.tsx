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
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
      <p className="text-sm text-muted-foreground">
        <span className="ledger-value text-foreground">{resultCount}</span> properties found
      </p>

      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" className="lg:hidden" onClick={() => setFiltersOpen(true)}>
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filters
        </Button>

        <Select
          value={sort}
          onChange={(e) => updateParam("sort", e.target.value)}
          className="w-44"
          aria-label="Sort properties"
        >
          <option value="newest">Newest first</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="most-viewed">Most viewed</option>
        </Select>

        <div className="hidden items-center rounded-[var(--radius-sm)] border border-border-strong sm:flex">
          <button
            type="button"
            aria-label="Grid view"
            aria-pressed={view === "grid"}
            onClick={() => updateParam("view", "grid")}
            className={cn("flex h-11 w-11 items-center justify-center", view === "grid" && "bg-surface-muted")}
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="List view"
            aria-pressed={view === "list"}
            onClick={() => updateParam("view", "list")}
            className={cn("flex h-11 w-11 items-center justify-center border-l border-border-strong", view === "list" && "bg-surface-muted")}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      <Sheet open={filtersOpen} onClose={() => setFiltersOpen(false)} title="Filters" side="bottom">
        <PropertyFiltersForm onApply={() => setFiltersOpen(false)} />
      </Sheet>
    </div>
  );
}
