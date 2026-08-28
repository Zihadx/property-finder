import type { Metadata } from "next";
import { PropertyForm } from "@/components/dashboard/property-form";

export const metadata: Metadata = { title: "Add Property" };

export default function NewPropertyPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="ledger-label mb-2">Inventory</p>
        <h1 className="font-display text-2xl text-foreground">Add Property</h1>
      </div>
      <div className="max-w-3xl">
        <PropertyForm mode="create" />
      </div>
    </div>
  );
}
