import type { PropertyStatus } from "@/types/property";

/**
 * Single source of truth for how a listing status renders as a badge
 * variant. Previously duplicated across the grid card, list item, quick
 * view, and the detail page — centralized here for Milestone 05.
 */
export const propertyStatusVariant: Record<
  PropertyStatus,
  "success" | "danger" | "warning" | "neutral"
> = {
  Available: "success",
  Sold: "danger",
  Rented: "neutral",
  "Under Offer": "warning",
};
