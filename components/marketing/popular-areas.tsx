import Link from "next/link";
import Image from "next/image";
import { areaService } from "@/services/area.service";
import { formatBDT } from "@/lib/utils";
import { SectionHeading } from "./section-heading";

export async function PopularAreas() {
  const areas = await areaService.list();
  const popular = areas.slice(0, 6);

  return (
    <section className="border-t border-border bg-surface-muted">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <SectionHeading
          eyebrow="Discover by location"
          title="Popular areas"
          description="Browse listings the way your customers already ask for them — by neighbourhood."
        />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {popular.map((area) => (
            <Link
              key={area.slug}
              href={`/areas/${area.slug}`}
              className="group relative aspect-[3/4] overflow-hidden rounded-[var(--radius-md)] border border-border"
            >
              <Image
                src={area.image}
                alt={area.name}
                fill
                sizes="(min-width: 1024px) 16vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3">
                <p className="font-display text-base text-white">{area.name}</p>
                <p className="ledger-value text-xs text-white/80">
                  from {formatBDT(area.averagePricePerSqft)}/sqft
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
