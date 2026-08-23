"use client";

import Link from "next/link";
import { Scale, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeFromCompare, clearCompare } from "@/redux/slices/compareSlice";
import { Button } from "@/components/ui/button";

export function CompareBar() {
  const dispatch = useAppDispatch();
  const ids = useAppSelector((state) => state.compare.propertyIds);

  if (ids.length === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface shadow-[var(--shadow-lg)]">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-3">
        <div className="flex items-center gap-2 text-sm text-foreground">
          <Scale className="h-4 w-4 text-accent" />
          <span className="ledger-value">{ids.length}</span> of 3 properties selected to compare
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => dispatch(clearCompare())}>
            <X className="mr-1.5 h-3.5 w-3.5" />
            Clear
          </Button>
          <Button size="sm" disabled={ids.length < 2} asChild={ids.length >= 2}>
            {ids.length >= 2 ? <Link href="/compare">Compare Now</Link> : <span>Compare Now</span>}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function useRemoveFromCompare() {
  const dispatch = useAppDispatch();
  return (id: string) => dispatch(removeFromCompare(id));
}
