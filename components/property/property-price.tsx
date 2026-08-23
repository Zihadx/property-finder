import { formatBDT } from "@/lib/utils";
import type { ListingPurpose } from "@/types/property";

export function PropertyPrice({
  price,
  purpose,
  size = "md",
}: {
  price: number;
  purpose: ListingPurpose;
  size?: "sm" | "md" | "lg";
}) {
  const textSize = size === "lg" ? "text-3xl" : size === "sm" ? "text-lg" : "text-2xl";
  return (
    <div>
      <p className={`ledger-value ${textSize} font-medium text-foreground`}>
        {formatBDT(price)}
        {purpose === "Rent" && <span className="text-sm text-muted-foreground"> /month</span>}
      </p>
    </div>
  );
}
