"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Scale, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeFromCompare, clearCompare } from "@/redux/slices/compareSlice";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Milestone 24: this bar and the property-detail page's MobileActionBar
 * are both `fixed bottom-0` at the same z-index — on mobile, having any
 * items in compare while viewing a property detail meant this rendered
 * on top and completely hid the Call/Chat/Visit buttons underneath it.
 * MobileActionBar's height is deterministic (h-11 button + p-3 padding =
 * 68px, single row, can't wrap), so this shifts up by that exact amount
 * on property detail routes below the lg breakpoint.
 */
export function CompareBar() {
  const dispatch = useAppDispatch();
  const ids = useAppSelector((state) => state.compare.propertyIds);
  const pathname = usePathname();
  const sharesSpaceWithMobileActionBar = /^\/properties\/[^/]+$/.test(
    pathname ?? "",
  );

  if (ids.length === 0) return null;

  return (
    <div
      className={cn(
        "fixed inset-x-0 z-30 border-t border-border bg-surface shadow-[var(--shadow-lg)]",
        sharesSpaceWithMobileActionBar
          ? "bottom-[68px] lg:bottom-0"
          : "bottom-0",
      )}
    >
      <div className="mx-auto flex container flex-wrap items-center justify-between gap-3 px-6 py-3">
        <div className="flex items-center gap-2 text-sm text-foreground">
          <Scale className="h-4 w-4 text-accent" />
          <span className="ledger-value">{ids.length}</span> of 3 properties
          selected to compare
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => dispatch(clearCompare())}
          >
            <X className="mr-1.5 h-3.5 w-3.5" />
            Clear
          </Button>
          <Button size="sm" disabled={ids.length < 2} asChild={ids.length >= 2}>
            {ids.length >= 2 ? (
              <Link href="/compare">Compare Now</Link>
            ) : (
              <span>Compare Now</span>
            )}
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
