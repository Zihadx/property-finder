import type { Metadata } from "next";

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { AreaCard } from "@/components/property/area-card";
import { areaService } from "@/services/area.service";

export const metadata: Metadata = {
  title: "Areas in Dhaka",
  description:
    "Browse properties by neighbourhood across Dhaka — Gulshan, Banani, Dhanmondi, Uttara, Mirpur, and more.",
};

export default async function AreasPage() {
  const areas = await areaService.list();

  console.log("AREAS:", areas);
  console.log("AREA COUNT:", areas.length);

  return (
    <>
      <SiteHeader />

      <main className="mx-auto container px-6 py-12 lg:py-16">
        {/* Editorial heading */}
        <header className="mb-12 lg:mb-16">
          <div className="mb-5 flex items-center gap-4">
            <span className="h-px w-10 bg-foreground/30" />

            <span className="text-[8px] font-medium uppercase tracking-[0.32em] text-muted-foreground/50">
              Discover by Location
            </span>

            <span className="font-mono text-[8px] tabular-nums tracking-[0.18em] text-muted-foreground/30">
              {String(areas.length).padStart(2, "0")}
            </span>
          </div>

          <h1 className="max-w-3xl font-display text-4xl font-normal leading-[0.95] tracking-[-0.045em] text-foreground sm:text-5xl lg:text-6xl">
            Neighbourhoods{" "}
            <span className="text-muted-foreground/40">worth knowing.</span>
          </h1>

          <div className="mt-6 flex max-w-2xl items-start gap-4">
            <span className="mt-2 h-px w-8 shrink-0 bg-border" />

            <p className="text-sm leading-6 text-muted-foreground">
              Explore Dhaka&apos;s most distinctive addresses, from established
              residential enclaves to the city&apos;s emerging luxury districts.
            </p>
          </div>
        </header>

        {/* Areas */}
        {areas.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
            {areas.map((area, index) => (
              <div
                key={area.slug}
                className="h-[420px] sm:h-[440px] lg:h-[460px]"
              >
                <AreaCard area={area} index={index} priority={index < 3} />
              </div>
            ))}
          </div>
        ) : (
          <div className="border-y border-border/60 py-20 text-center">
            <p className="text-[8px] font-medium uppercase tracking-[0.3em] text-muted-foreground/40">
              No locations available
            </p>

            <p className="mt-4 font-display text-2xl text-foreground">
              No neighbourhoods found.
            </p>
          </div>
        )}

        {/* Closing editorial line */}
        {areas.length > 0 && (
          <div className="mt-20 flex items-center gap-5">
            <span className="h-px flex-1 bg-border/60" />

            <span className="text-[7px] font-medium uppercase tracking-[0.3em] text-muted-foreground/35">
              Dhaka · Selected Addresses
            </span>

            <span className="h-px flex-1 bg-border/60" />
          </div>
        )}
      </main>

      <SiteFooter />
    </>
  );
}
