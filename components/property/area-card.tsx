import Link from "next/link";
import Image from "next/image";
import { cn, formatBDT } from "@/lib/utils";
import type { Area } from "@/types/area";

/**
 * Geographic discovery tile. Deliberately dimension-agnostic — the parent
 * grid decides how much space each tile gets (see PopularAreas' bento
 * layout), this just fills it and scales its type down for the "sm" size.
 */
export function AreaCard({
  area,
  size = "md",
  className,
}: {
  area: Area;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  return (
    <Link
      href={`/areas/${area.slug}`}
      className={cn(
        "group relative block aspect-[4/3] overflow-hidden rounded-[var(--radius-md)] border border-border",
        className
      )}
    >
      <Image
        src={area.image}
        alt={area.name}
        fill
        sizes={size === "lg" ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
      <div className={cn("absolute inset-x-0 bottom-0", size === "lg" ? "p-5" : "p-3")}>
        <p className={cn("font-display text-white", size === "lg" ? "text-2xl" : "text-base")}>{area.name}</p>
        <p className={cn("ledger-value text-white/85", size === "lg" ? "text-sm" : "text-xs")}>
          from {formatBDT(area.averagePricePerSqft)}/sqft
        </p>
        <p className={cn("mt-1 text-white/70", size === "lg" ? "text-sm" : "text-xs")}>
          {area.propertyCount} listings
        </p>
      </div>
    </Link>
  );
}
