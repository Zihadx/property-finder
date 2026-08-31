import { cn } from "@/lib/utils";
import { formatBDT } from "@/lib/utils";
import type { ListingPurpose } from "@/types/property";

export function PropertyPrice({
  price,
  purpose,
  size = "md",
  className,
}: {
  price: number;
  purpose: ListingPurpose;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const textSize = size === "lg" ? "text-3xl" : size === "sm" ? "text-lg" : "text-2xl";
  return (
    <div>
      <p className={cn("ledger-value font-medium text-foreground", textSize, className)}>
        {formatBDT(price)}
        {purpose === "Rent" && <span className="text-sm opacity-80"> /month</span>}
      </p>
    </div>
  );
}
