import Link from "next/link";
import { areaService } from "@/services/area.service";
import { propertyService } from "@/services/property.service";
import { SectionHeading } from "./section-heading";
import type { PropertyType } from "@/types/property";

/**
 * Milestone 14: dense, crawlable text links rather than another card
 * grid — this section exists for search-engine internal linking and for
 * the visitor who already knows exactly what they want ("Apartment in
 * Gulshan"). Every combo is generated from properties that actually
 * exist, so no link leads to an empty result page.
 */
export async function AreaSeoLinks() {
  const [allProperties, areas] = await Promise.all([propertyService.list(), areaService.list()]);
  const areaNames = new Map(areas.map((a) => [a.slug, a.name]));

  const grouped = new Map<string, { areaName: string; types: Set<PropertyType> }>();
  for (const property of allProperties) {
    const slug = property.location.areaSlug;
    const entry =
      grouped.get(slug) ?? { areaName: areaNames.get(slug) ?? property.location.area, types: new Set<PropertyType>() };
    entry.types.add(property.type);
    grouped.set(slug, entry);
  }

  const entries = Array.from(grouped.entries())
    .map(([slug, { areaName, types }]) => ({ slug, areaName, types: Array.from(types) }))
    .sort((a, b) => a.areaName.localeCompare(b.areaName));

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
      <SectionHeading
        eyebrow="Browse by search"
        title="Explore Dhaka by area"
        description="Jump straight to what you're looking for."
      />
      <div className="mt-10 columns-1 gap-x-10 sm:columns-2 lg:columns-3">
        {entries.map(({ slug, areaName, types }) => (
          <div key={slug} className="mb-6 break-inside-avoid">
            <Link href={`/areas/${slug}`} className="font-display text-sm text-foreground hover:text-accent">
              {areaName}
            </Link>
            <ul className="mt-2 flex flex-col gap-1">
              {types.map((type) => (
                <li key={type}>
                  <Link
                    href={`/properties?area=${slug}&type=${encodeURIComponent(type)}`}
                    className="text-sm text-muted-foreground hover:text-accent"
                  >
                    {type} listings in {areaName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
