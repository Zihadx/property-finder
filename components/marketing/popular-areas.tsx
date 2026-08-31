
import { areaService } from "@/services/area.service";
import { AreaCard } from "@/components/property/area-card";
import { SectionHeading } from "./section-heading";

/**
 * Premium editorial / bento area discovery section.
 *
 * Server component:
 * - Fetches area data on the server.
 * - Keeps business/data logic out of the client.
 * - AreaCard handles all visual interaction + scroll animation.
 */
export async function PopularAreas() {
  const areas = await areaService.list();

  const sorted = [...areas]
    .sort((a, b) => b.propertyCount - a.propertyCount)
    .slice(0, 5);

  const [lead, ...rest] = sorted;

  return (
    <section className="relative overflow-hidden  text-black">
      {/* Ambient architectural light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 h-125 w-125 rounded-full bg-[#2095AE]/[0.07] blur-[140px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 h-125 w-125 rounded-full bg-white/2.5 blur-[140px]"
      />

      <div className="relative mx-auto max-w-[1600px] px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
        {/* Editorial heading */}
        <SectionHeading
          eyebrow="Explore by location"
          title="Where exceptional living begins."
          description="Discover Dhaka's most sought-after neighbourhoods, from established diplomatic districts to the city's next generation of residential destinations."
        />

        {/* Bento architecture */}
        <div className="mt-14 grid auto-rows-45 grid-cols-2 gap-3 sm:gap-4 lg:mt-16 lg:auto-rows-47.5 lg:grid-cols-4">
          {lead && (
            <AreaCard
              area={lead}
              size="lg"
              className="col-span-2 row-span-2"
              priority
              index={0}
            />
          )}

          {rest.map((area, index) => (
            <AreaCard
              key={area.slug}
              area={area}
              size="sm"
              index={index + 1}
            />
          ))}
        </div>

        {/* Bottom editorial metadata */}
        <div className="mt-8 flex flex-col gap-4 border-t border-white/8 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-white/30" />

            <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/40">
              Curated locations
            </span>
          </div>

          <p className="text-xs tracking-wide text-white/35">
            Premium properties · Dhaka
          </p>
        </div>
      </div>
    </section>
  );
}

