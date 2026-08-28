import type { Metadata } from "next";
import { PropertyTypeTemplate } from "@/components/property/property-type-template";

export const metadata: Metadata = {
  title: "Commercial Spaces, Offices & Shops in Dhaka",
  description: "Retail shops, office suites, and commercial spaces for rent or sale across Dhaka.",
};

export default function CommercialPage() {
  return (
    <PropertyTypeTemplate
      title="Commercial Spaces"
      description="Retail shops, offices, and commercial units suited to businesses of every size."
      types={["Commercial Space", "Office", "Shop"]}
    />
  );
}
