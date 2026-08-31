"use client";

import { Scale } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCompare, removeFromCompare } from "@/redux/slices/compareSlice";
import { cn } from "@/lib/utils";

/** Shared compare-list toggle. Same nested-Link safety as PropertyFavoriteButton. */
export function PropertyCompareButton({
  propertyId,
  size = "md",
  className,
}: {
  propertyId: string;
  size?: "sm" | "md";
  className?: string;
}) {
  const dispatch = useAppDispatch();
  const isComparing = useAppSelector((state) => state.compare.propertyIds.includes(propertyId));
  const box = size === "sm" ? "h-7 w-7" : "h-9 w-9";
  const icon = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";

  return (
    <button
      type="button"
      aria-label={isComparing ? "Remove from comparison" : "Add to comparison"}
      aria-pressed={isComparing}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(isComparing ? removeFromCompare(propertyId) : addToCompare(propertyId));
      }}
      className={cn(
        "flex items-center justify-center rounded-full bg-surface/90 backdrop-blur-sm transition-colors hover:bg-surface",
        box,
        className
      )}
    >
      <Scale className={cn(icon, "transition-colors", isComparing ? "text-accent" : "text-foreground")} />
    </button>
  );
}
