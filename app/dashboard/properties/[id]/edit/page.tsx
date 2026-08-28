import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PropertyForm } from "@/components/dashboard/property-form";
import { properties } from "@/data/properties";

export const metadata: Metadata = { title: "Edit Property" };

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = properties.find((p) => p.id === id);
  if (!property) notFound();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="ledger-label mb-2">Inventory</p>
        <h1 className="font-display text-2xl text-foreground">Edit Property</h1>
      </div>
      <div className="max-w-3xl">
        <PropertyForm
          mode="edit"
          defaultValues={{
            title: property.title,
            type: property.type,
            purpose: property.purpose,
            status: property.status,
            price: property.price,
            area: property.location.areaSlug,
            address: property.location.address,
            bedrooms: property.bedrooms,
            bathrooms: property.bathrooms,
            areaSqft: property.areaSqft,
            agentId: property.agentId,
            amenities: property.amenities.join(", "),
            description: property.description,
            featured: property.featured,
          }}
        />
      </div>
    </div>
  );
}
