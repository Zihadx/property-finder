import { areaService } from "@/services/area.service";
import { AreaCard } from "@/components/property/area-card";
import { SectionHeading } from "./section-heading";

/**
 * Milestone 07: a bento-style composition — the most active area (by
 * listing count) gets a large tile, the next four sit smaller alongside —
 * instead of six identical squares in a uniform grid. 2x2 lead + 4x(1x1)
 * fills the grid exactly with no ragged trailing row.
 */
export async function PopularAreas() {
  const areas = await areaService.list();
  const sorted = [...areas].sort((a, b) => b.propertyCount - a.propertyCount).slice(0, 5);
  const [lead, ...rest] = sorted;

  return (
    <section className="border-t border-border bg-surface-muted">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <SectionHeading
          eyebrow="Discover by location"
          title="Popular areas"
          description="Browse listings the way your customers already ask for them — by neighbourhood."
        />
        <div className="mt-10 grid auto-rows-[150px] grid-cols-2 gap-4 lg:grid-cols-4">
          {lead && <AreaCard area={lead} size="lg" className="col-span-2 row-span-2" />}
          {rest.map((area) => (
            <AreaCard key={area.slug} area={area} size="sm" />
          ))}
        </div>
      </div>
    </section>
  );
}
