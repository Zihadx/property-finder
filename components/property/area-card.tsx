import Link from "next/link";
import Image from "next/image";
import { formatBDT } from "@/lib/utils";
import type { Area } from "@/types/area";

export function AreaCard({ area }: { area: Area }) {
  return (
    <Link
      href={`/areas/${area.slug}`}
      className="group relative block aspect-[4/3] overflow-hidden rounded-[var(--radius-md)] border border-border"
    >
      <Image
        src={area.image}
        alt={area.name}
        fill
        sizes="(min-width: 1024px) 33vw, 50vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4">
        <p className="font-display text-lg text-white">{area.name}</p>
        <p className="ledger-value text-sm text-white/85">from {formatBDT(area.averagePricePerSqft)}/sqft</p>
        <p className="mt-1 text-xs text-white/70">{area.propertyCount} listings</p>
      </div>
    </Link>
  );
}
