// Shared tokens across the ListEasy BD real-estate components.
//
// Luxury real-estate theme:
// Midnight Navy + Muted Champagne + Architectural Blue
// + Warm Ivory + Soft Slate

export const ACCENT = "#C5B07A";
// Primary CTA, active states, prices, featured badges, key highlights

export const NAVY = "#091A35";
// Main dark BG, header, footer, primary dark text

export const NAVY_SOFT = "#102544";
// Dark cards, panels, dropdowns, secondary surfaces

export const CHARCOAL = "#06142A";
// Deep/cinematic BG, hero sections, premium dark sections

export const PAPER = "#F3F2EC";
// Main light BG, light sections, primary text on dark

export const SLATE = "#8D98A9";
// Secondary/muted text, descriptions, metadata, placeholders

export const BLUE = "#2A4263";
// Subtle UI surfaces, filters, info cards, secondary accents

export const GOLD = "#D4C28F";
// Accent hover, secondary highlights, decorative details

export const LINE = "rgba(243, 242, 236, 0.10)";
// Borders/dividers on dark backgrounds

export const LINE_LIGHT = "rgba(9, 26, 53, 0.12)";
// Borders/dividers on light backgrounds

export function formatBDTCompact(amountBDT: number): string {
  if (amountBDT >= 10_000_000) {
    return `৳${(amountBDT / 10_000_000).toFixed(1)}Cr`;
  }

  if (amountBDT >= 100_000) {
    return `৳${(amountBDT / 100_000).toFixed(1)}L`;
  }

  if (amountBDT >= 1_000) {
    return `৳${(amountBDT / 1_000).toFixed(0)}K`;
  }

  return `৳${amountBDT}`;
}