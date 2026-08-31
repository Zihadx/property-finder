
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { areaService } from "@/services/area.service";
import { propertyService } from "@/services/property.service";
import { SectionHeading } from "./section-heading";
import type { PropertyType } from "@/types/property";

/**
 * Compact market index.
 *
 * SEO-friendly internal links generated only from combinations
 * that exist in the current property catalog.
 */
export async function AreaSeoLinks() {
  const [allProperties, areas] = await Promise.all([
    propertyService.list(),
    areaService.list(),
  ]);

  const areaNames = new Map(
    areas.map((area) => [area.slug, area.name]),
  );

  const grouped = new Map<
    string,
    {
      areaName: string;
      types: Set<PropertyType>;
    }
  >();

  for (const property of allProperties) {
    const slug = property.location.areaSlug;

    const entry =
      grouped.get(slug) ?? {
        areaName: areaNames.get(slug) ?? property.location.area,
        types: new Set<PropertyType>(),
      };

    entry.types.add(property.type);
    grouped.set(slug, entry);
  }

  const entries = Array.from(grouped.entries())
    .map(([slug, { areaName, types }]) => ({
      slug,
      areaName,
      types: Array.from(types),
    }))
    .sort((a, b) => a.areaName.localeCompare(b.areaName));

  if (!entries.length) return null;

  return (
    <section className="border-t border-border/60">
      <div className="mx-auto container px-6 py-10 md:py-12">
        <SectionHeading
          eyebrow="Market index"
          title="Explore by area"
          description="Browse available properties by neighbourhood and type."
        />

        <div className="mt-7 divide-y divide-border/60 border-y border-border/60">
          {entries.map(({ slug, areaName, types }, index) => (
            <div
              key={slug}
              className="group flex items-center gap-3 py-3.5 transition-colors duration-200 hover:bg-muted/30 md:gap-5 md:px-3"
            >
              {/* Index */}
              <span className="w-5 shrink-0 font-mono text-[9px] tabular-nums tracking-wider text-muted-foreground/50">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Area */}
              <Link
                href={`/areas/${slug}`}
                className="flex w-32 shrink-0 items-center gap-1.5 text-sm font-medium tracking-tight text-foreground transition-colors hover:text-primary sm:w-40 md:w-44"
              >
                {areaName}

                <ArrowUpRight className="size-3 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-60" />
              </Link>

              {/* Types */}
              <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-3 gap-y-1.5">
                {types.map((type) => (
                  <Link
                    key={type}
                    href={`/properties?area=${slug}&type=${encodeURIComponent(type)}`}
                    className="text-[11px] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {type}
                  </Link>
                ))}
              </div>

              {/* Desktop indicator */}
              <span
                className="hidden size-1 shrink-0 rounded-full bg-primary/40 md:block"
                aria-hidden="true"
              />
            </div>
          ))}
        </div>

        <p className="mt-3 text-[10px] text-muted-foreground/60">
          {entries.length} areas · Current catalog
        </p>
      </div>
    </section>
  );
}

