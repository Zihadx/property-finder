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
      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <p className="ledger-label mb-2">Property Discovery</p>
          <h1 className="font-display text-3xl text-foreground">Properties for Sale &amp; Rent</h1>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          <PropertyFiltersSidebar />

          <div className="min-w-0 flex-1">
            <PropertyToolbar resultCount={allResults.length} />
            <div className="mt-6">
              <PropertyGrid properties={pageResults} view={view} />
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} buildHref={buildHref} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
