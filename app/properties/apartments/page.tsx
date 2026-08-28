import type { Metadata } from "next";
import { PropertyTypeTemplate } from "@/components/property/property-type-template";

export const metadata: Metadata = {
  title: "Apartments for Sale & Rent in Dhaka",
  description: "Browse apartments and luxury apartments across Gulshan, Banani, Dhanmondi, Bashundhara, and more.",
};

export default function ApartmentsPage() {
  return (
    <PropertyTypeTemplate
      title="Apartments"
      description="Standard and luxury apartments across Dhaka's most-searched neighbourhoods."
      types={["Apartment", "Luxury Apartment"]}
    />
  );
}
