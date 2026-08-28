import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { propertyService } from "@/services/property.service";
import { formatBDT } from "@/lib/utils";
import type { PropertyStatus } from "@/types/property";

export const metadata: Metadata = { title: "Properties" };

const statusVariant: Record<PropertyStatus, "success" | "danger" | "warning" | "neutral"> = {
  Available: "success",
  Sold: "danger",
  Rented: "neutral",
  "Under Offer": "warning",
};

export default async function DashboardPropertiesPage() {
  const properties = await propertyService.list({}, "newest");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="ledger-label mb-2">Inventory</p>
          <h1 className="font-display text-2xl text-foreground">Properties</h1>
        </div>
        <Button asChild>
          <Link href="/dashboard/properties/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Property
          </Link>
        </Button>
      </div>

      <div className="overflow-x-auto rounded-[var(--radius-md)] border border-border bg-surface">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-caption-foreground">
              <th className="p-3 font-medium">Property</th>
              <th className="p-3 font-medium">Area</th>
              <th className="p-3 font-medium">Price</th>
              <th className="p-3 font-medium">Status</th>
              <th className="p-3 font-medium">Featured</th>
              <th className="p-3 font-medium">Views</th>
              <th className="p-3 font-medium">Inquiries</th>
              <th className="p-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property.id} className="border-b border-border last:border-0 hover:bg-surface-muted/50">
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-14 shrink-0 overflow-hidden rounded-[var(--radius-sm)]">
                      <Image src={property.images[0]} alt="" fill sizes="56px" className="object-cover" />
                    </div>
                    <Link href={`/properties/${property.slug}`} className="truncate font-medium text-foreground hover:text-accent">
                      {property.title}
                    </Link>
                  </div>
                </td>
                <td className="p-3 text-muted-foreground">{property.location.area}</td>
                <td className="p-3">
                  <span className="ledger-value">{formatBDT(property.price)}</span>
                </td>
                <td className="p-3">
                  <Badge variant={statusVariant[property.status]}>{property.status}</Badge>
                </td>
                <td className="p-3 text-muted-foreground">{property.featured ? "Yes" : "—"}</td>
                <td className="p-3">
                  <span className="ledger-value">{property.views}</span>
                </td>
                <td className="p-3">
                  <span className="ledger-value">{property.inquiries}</span>
                </td>
                <td className="p-3">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/properties/${property.slug}`}
                      className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] hover:bg-surface-muted"
                      aria-label="View"
                    >
                      <Eye className="h-3.5 w-3.5" />
                    </Link>
                    <Link
                      href={`/dashboard/properties/${property.id}/edit`}
                      className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] hover:bg-surface-muted"
                      aria-label="Edit"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
