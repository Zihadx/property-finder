import { propertyService } from "@/services/property.service";
import { SectionHeading } from "./section-heading";

import type { PropertyType } from "@/types/property";
import { PropertyCategorySlider } from "./property-category-slider";


export const categories: {
  title: string;
  subtitle: string;
  href: string;
  icon: "building" | "layers" | "map" | "store";
  types: PropertyType[];
}[] = [
  {
    title: "Apartments",
    subtitle: "Refined urban living",
    href: "/properties/apartments",
    icon: "building",
    types: ["Apartment", "Luxury Apartment"],
  },
  {
    title: "Duplexes & Penthouses",
    subtitle: "Elevated living",
    href: "/properties/duplexes",
    icon: "layers",
    types: ["Duplex", "Penthouse"],
  },
  {
    title: "Plots & Land",
    subtitle: "Build what comes next",
    href: "/properties/plots",
    icon: "map",
    types: ["Plot", "Land"],
  },
  {
    title: "Commercial",
    subtitle: "Spaces with purpose",
    href: "/properties/commercial",
    icon: "store",
    types: ["Commercial Space", "Office", "Shop"],
  },
];

export async function PropertyCategories() {
  const withData = await Promise.all(
    categories.map(async (category) => {
      const matches = await propertyService.listByTypes(category.types);

      return {
        title: category.title,
        subtitle: category.subtitle,
        href: category.href,
        icon: category.icon,
        count: matches.length,
        image: matches[0]?.images?.[0],
      };
    }),
  );

  return (
    <section className="relative overflow-hidden border-t border-border bg-background">
      {/* Ambient luxury glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -right-40 top-10
          h-125 w-125
          rounded-full
         
          blur-[140px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -left-48 bottom-0
          h-100 w-100
          rounded-full
   
          blur-[120px]
        "
      />

      <div
        className="
          relative mx-auto
          max-w-[1600px]
          px-5 py-16
          sm:px-8 sm:py-20
          lg:px-12 lg:py-28
          xl:px-16
        "
      >
        <SectionHeading
          eyebrow="Explore the collection"
          title="Find a space that fits your life."
          description="From private residences to investment-ready commercial spaces, explore properties curated around the way you want to live, work and invest."
        />

        <div className="mt-10 sm:mt-12 lg:mt-16">
          <PropertyCategorySlider items={withData} />
        </div>

        {/* Bottom editorial metadata */}
        <div
          className="
            mt-8
            flex flex-col gap-4
            border-t border-border
            pt-5
            sm:mt-10
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-7 bg-foreground/30" />

            <span
              className="
                text-[8px]
                font-medium
                uppercase
                tracking-[0.28em]
                text-muted-foreground
              "
            >
              Four ways to discover
            </span>
          </div>

          <span
            className="
              text-[10px]
              uppercase
              tracking-[0.18em]
              text-muted-foreground/70
            "
          >
            Homes · Investments · Land · Commercial
          </span>
        </div>
      </div>
    </section>
  );
}