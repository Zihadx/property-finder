import Link from "next/link";
import Image from "next/image";
import { Building2, Layers, MapPinned, Store } from "lucide-react";
import { propertyService } from "@/services/property.service";
import { SectionHeading } from "./section-heading";
import type { PropertyType } from "@/types/property";

const categories: {
  title: string;
  href: string;
  icon: typeof Building2;
  types: PropertyType[];
}[] = [
  { title: "Apartments", href: "/properties/apartments", icon: Building2, types: ["Apartment", "Luxury Apartment"] },
  { title: "Duplexes & Penthouses", href: "/properties/duplexes", icon: Layers, types: ["Duplex", "Penthouse"] },
  { title: "Plots & Land", href: "/properties/plots", icon: MapPinned, types: ["Plot", "Land"] },
  { title: "Commercial", href: "/properties/commercial", icon: Store, types: ["Commercial Space", "Office", "Shop"] },
];

/**
 * Milestone 08: a horizontal editorial rail rather than a uniform icon
 * grid — each tile carries a representative photo and a live listing
 * count pulled through propertyService, so it reads as discovery rather
 * than static iconography.
 */
export async function PropertyCategories() {
  const withData = await Promise.all(
    categories.map(async (category) => {
      const matches = await propertyService.listByTypes(category.types);
      return { ...category, count: matches.length, image: matches[0]?.images[0] };
    })
  );

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
      <SectionHeading
        eyebrow="Browse by category"
        title="What are you looking for?"
        description="Every listing sorted into the categories customers actually ask for."
      />
      <div className="mt-10 flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {withData.map(({ title, href, icon: Icon, count, image }) => (
          <Link
            key={href}
            href={href}
            className="group relative block aspect-[3/4] w-56 shrink-0 overflow-hidden rounded-[var(--radius-md)] bg-surface-muted"
          >
            {image && (
              <Image
                src={image}
                alt={title}
                fill
                sizes="224px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-surface/90 backdrop-blur-sm">
              <Icon className="h-4 w-4 text-foreground" />
            </div>
            <div className="absolute inset-x-4 bottom-4">
              <p className="font-display text-lg leading-snug text-white">{title}</p>
              <p className="ledger-value mt-1 text-xs text-white/80">{count} listings</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
