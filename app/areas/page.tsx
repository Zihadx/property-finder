import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { AreaCard } from "@/components/property/area-card";
import { areaService } from "@/services/area.service";

export const metadata: Metadata = {
  title: "Areas in Dhaka",
  description: "Browse properties by neighbourhood across Dhaka — Gulshan, Banani, Dhanmondi, Uttara, Mirpur, and more.",
};

export default async function AreasPage() {
  const areas = await areaService.list();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-6 py-10">
        <p className="ledger-label mb-2">Discover by Location</p>
        <h1 className="font-display text-3xl text-foreground">Areas in Dhaka</h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Find the right neighbourhood before you find the right flat.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area) => (
            <AreaCard key={area.slug} area={area} />
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
