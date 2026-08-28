import type { Metadata } from "next";
import { PropertyTypeTemplate } from "@/components/property/property-type-template";

export const metadata: Metadata = {
  title: "Duplexes & Penthouses in Dhaka",
  description: "Duplex apartments and penthouses for families and executives across Dhaka.",
};

export default function DuplexesPage() {
  return (
    <PropertyTypeTemplate
      title="Duplexes & Penthouses"
      description="Multi-level living for larger families, with private terraces and premium finishes."
      types={["Duplex", "Penthouse"]}
    />
  );
}
