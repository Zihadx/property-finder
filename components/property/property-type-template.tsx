import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PropertyGrid } from "@/components/property/property-grid";
import { Button } from "@/components/ui/button";
import { propertyService } from "@/services/property.service";
import type { PropertyType } from "@/types/property";

export async function PropertyTypeTemplate({
  title,
  description,
  types,
}: {
  title: string;
  description: string;
  types: PropertyType[];
}) {
  const properties = await propertyService.listByTypes(types);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-6 py-10">
        <p className="ledger-label mb-2">Property Type</p>
        <h1 className="font-display text-3xl text-foreground">{title}</h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">{description}</p>

        <div className="mt-4 flex items-center justify-between border-b border-border pb-5">
          <p className="text-sm text-muted-foreground">
            <span className="ledger-value text-foreground">{properties.length}</span> listings
          </p>
          <Button variant="link" asChild>
            <Link href={`/properties?type=${encodeURIComponent(types[0])}`}>Refine in full search →</Link>
          </Button>
        </div>

        <div className="mt-6">
          <PropertyGrid properties={properties} view="grid" />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
