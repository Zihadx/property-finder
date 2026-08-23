import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a BDT amount into the Bangladeshi lakh/crore convention
 * used throughout the property catalog, e.g. 8500000 -> "৳ 85 Lakh".
 */
export function formatBDT(amount: number): string {
  if (amount >= 10_000_000) {
    const crore = amount / 10_000_000;
    return `৳ ${trimDecimal(crore)} Crore`;
  }
  if (amount >= 100_000) {
    const lakh = amount / 100_000;
    return `৳ ${trimDecimal(lakh)} Lakh`;
  }
  return `৳ ${amount.toLocaleString("en-BD")}`;
}

function trimDecimal(value: number): string {
  return value % 1 === 0 ? value.toString() : value.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
}

export function formatArea(sqft: number): string {
  return `${sqft.toLocaleString("en-BD")} sqft`;
}
