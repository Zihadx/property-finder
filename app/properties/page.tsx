import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PropertyFiltersSidebar } from "@/components/property/property-filters-sidebar";
import { PropertyToolbar } from "@/components/property/property-toolbar";
import { PropertyGrid } from "@/components/property/property-grid";
import { Pagination } from "@/components/ui/pagination";
import { propertyService, type PropertySort } from "@/services/property.service";
import type { PropertyStatus, PropertyType } from "@/types/property";

export const metadata: Metadata = {
  title: "Properties for Sale & Rent in Dhaka",
  description: "Browse apartments, plots, and commercial spaces across Gulshan, Banani, Dhanmondi, Uttara, and more.",
};

const PAGE_SIZE = 9;

type SearchParams = Record<string, string | string[] | undefined>;

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const get = (key: string) => (typeof params[key] === "string" ? (params[key] as string) : undefined);

  const area = get("area");
  const type = get("type") as PropertyType | undefined;
  const status = get("status") as PropertyStatus | undefined;
  const purpose = get("purpose") as "Sale" | "Rent" | undefined;
  const featured = get("featured") === "true" ? true : undefined;
  const minPrice = get("minPrice") ? Number(get("minPrice")) : undefined;
  const maxPrice = get("maxPrice") ? Number(get("maxPrice")) : undefined;
  const bedrooms = get("bedrooms") ? Number(get("bedrooms")) : undefined;
  const query = get("q");
  const sort = (get("sort") as PropertySort) ?? "newest";
  const view = get("view") === "list" ? "list" : "grid";
  const page = Math.max(1, Number(get("page") ?? "1"));

  const allResults = await propertyService.list(
    { area, type, status, purpose, featured, minPrice, maxPrice, bedrooms, query },
    sort
  );

  const totalPages = Math.max(1, Math.ceil(allResults.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageResults = allResults.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function buildHref(targetPage: number) {
    const p = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (typeof value === "string" && key !== "page") p.set(key, value);
    }
    if (targetPage > 1) p.set("page", String(targetPage));
    const qs = p.toString();
    return qs ? `/properties?${qs}` : "/properties";
  }


return (
  <>
    <SiteHeader />

    <main className="min-h-screen bg-background">
      {/* ─────────────────────────────────────────
          EDITORIAL PAGE INTRO
      ───────────────────────────────────────── */}

      <section className="border-b border-border/60">
        <div className="mx-auto max-w-[1600px] px-6 pb-14 pt-12 sm:px-8 lg:px-12 lg:pb-16 lg:pt-16">
          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <div className="mb-6 flex items-center gap-4">
                <span className="h-px w-10 bg-foreground/40" />

                <p className="text-[9px] font-medium uppercase tracking-[0.34em] text-muted-foreground">
                  Property Discovery
                </p>
              </div>

              <h1 className="max-w-4xl font-display text-4xl font-normal leading-[0.95] tracking-[-0.045em] text-foreground sm:text-5xl lg:text-6xl xl:text-7xl">
                Exceptional places.
                <br />
                <span className="text-muted-foreground/60">
                  Considered carefully.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-sm leading-7 text-muted-foreground/70">
                Explore a curated selection of residences, land and commercial
                properties across Dhaka&apos;s most distinguished addresses.
              </p>
            </div>

            <div className="hidden shrink-0 lg:block">
              <div className="flex items-center gap-5">
                <span className="h-px w-16 bg-border" />

                <div className="text-right">
                  <p className="text-[8px] uppercase tracking-[0.28em] text-muted-foreground/50">
                    Private Selection
                  </p>

                  <p className="mt-1 font-mono text-[10px] tabular-nums tracking-[0.16em] text-muted-foreground">
                    {String(allResults.length).padStart(2, "0")} RESIDENCES
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          DISCOVERY AREA
      ───────────────────────────────────────── */}

      <main className="mx-auto max-w-[1600px] px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
          <PropertyFiltersSidebar />
          

          <div className="min-w-0 flex-1">
            <PropertyToolbar resultCount={allResults.length} />

            <div className="mt-8">
              <PropertyGrid properties={pageResults} view={view} />
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              buildHref={buildHref}
            />
          </div>
        </div>
      </main>
    </main>

    <SiteFooter />
  </>
);


}
