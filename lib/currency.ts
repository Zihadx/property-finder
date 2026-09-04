/**
 * Formats a BDT amount the way the rest of the site does elsewhere
 * (e.g. "৳ 1.68 Crore", "৳ 98 Lakh").
 */
export function formatBDT(amount: number): string {
  if (amount >= 1_00_00_000) {
    return `৳${trimDecimals(amount / 1_00_00_000)} Crore`;
  }
  if (amount >= 1_00_000) {
    return `৳${trimDecimals(amount / 1_00_000)} Lakh`;
  }
  return `৳${amount.toLocaleString("en-BD")}`;
}

function trimDecimals(value: number): string {
  return value % 1 === 0 ? value.toFixed(0) : value.toFixed(2);
}