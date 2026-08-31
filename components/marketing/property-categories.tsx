import { propertyService } from "@/services/property.service";
import { SectionHeading } from "./section-heading";
import { PropertyCategoryCard } from "./property-category-card";
import type { PropertyType } from "@/types/property";

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
    })
  );

  return (
    <section className="relative overflow-hidden border-t border-border bg-background">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-20 h-[420px] w-[420px] rounded-full bg-[#2095AE]/[0.035] blur-[130px]"
      />

      <div className="relative mx-auto max-w-[1600px] px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
        <SectionHeading
          eyebrow="Explore the collection"
          title="Find a space that fits your life."
          description="From private residences to investment-ready commercial spaces, explore properties curated around the way you want to live, work and invest."
        />

        <div className="mt-14 flex gap-3 overflow-x-auto pb-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden lg:mt-16 lg:gap-4">
          {withData.map((category, index) => (
            <PropertyCategoryCard
              key={category.href}
              title={category.title}
              subtitle={category.subtitle}
              href={category.href}
              icon={category.icon}
              count={category.count}
              image={category.image}
              index={index}
            />
          ))}

          <div className="hidden w-[180px] shrink-0 items-end justify-end pb-2 pr-2 lg:flex">
            <div className="max-w-[150px]">
              <p className="text-[9px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
                Curated
              </p>

              <p className="mt-3 font-display text-xl leading-tight tracking-[-0.02em] text-foreground">
                Property, considered differently.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-foreground/30" />

            <span className="text-[9px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
              Four ways to discover
            </span>
          </div>

          <span className="text-xs text-muted-foreground">
            Homes · Investments · Land · Commercial
          </span>
        </div>
      </div>
    </section>
  );
}