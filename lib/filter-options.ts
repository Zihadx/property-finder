import { areas } from "@/data/areas";
import type { PropertyType } from "@/types/property";

export const propertyTypes: PropertyType[] = [
  "Apartment",
  "Luxury Apartment",
  "Duplex",
  "Penthouse",
  "Plot",
  "Commercial Space",
  "Office",
  "Shop",
  "Land",
  "House",
];

export const budgetPresets = [
  { label: "Any budget", min: undefined, max: undefined },
  { label: "Up to ৳50 Lakh", min: undefined, max: 5_000_000 },
  { label: "৳50 Lakh – ৳1 Crore", min: 5_000_000, max: 10_000_000 },
  { label: "৳1 Crore – ৳2 Crore", min: 10_000_000, max: 20_000_000 },
  { label: "৳2 Crore+", min: 20_000_000, max: undefined },
];

export const areaOptions = areas.map((a) => ({ value: a.slug, label: a.name }));
