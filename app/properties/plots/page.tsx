import type { Metadata } from "next";
import { PropertyTypeTemplate } from "@/components/property/property-type-template";

export const metadata: Metadata = {
  title: "Plots & Land for Sale in Dhaka",
  description: "Residential plots and land parcels in Purbachal, Bashundhara, and other developing corridors.",
};

export default function PlotsPage() {
  return (
    <PropertyTypeTemplate
      title="Plots & Land"
      description="Residential plots and land, ideal for custom builds or long-term appreciation."
      types={["Plot", "Land"]}
    />
  );
}
