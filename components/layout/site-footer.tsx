import Link from "next/link";
import { areaService } from "@/services/area.service";
import { categories } from "@/components/marketing/property-categories";

const discover = [
  { href: "/properties", label: "All Properties" },
  { href: "/areas", label: "Areas" },
  { href: "/agents", label: "Agents" },
  { href: "/compare", label: "Compare Properties" },
];

const forAgencies = [
  { href: "/dashboard", label: "Agency Dashboard" },
  { href: "/dashboard/properties/new", label: "List a Property" },
  { href: "/dashboard/leads", label: "Leads" },
  { href: "/dashboard/analytics", label: "Analytics" },
];

/**
 * Milestone 19: full information architecture — product nav, categories,
 * locations, agency links, plus contact and legal in the bottom bar.
 * "Locations" and "Categories" reuse the same services/data as their
 * on-page sections (areaService, PropertyCategories' category list)
 * rather than re-declaring a separate link set that could drift out of
 * sync with what those sections actually show.
 */
export async function SiteFooter() {
  const areas = await areaService.list();
  const topAreas = [...areas].sort((a, b) => b.propertyCount - a.propertyCount).slice(0, 5);

  return (
    <footer className="mt-auto border-t border-border bg-surface-muted">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2">
            <span className="font-display text-xl text-foreground">ListEasy BD</span>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Your properties, organized. Your leads, simplified. A professional property catalog for
              Bangladeshi real-estate agents.
            </p>
          </div>

          <div>
            <p className="ledger-label mb-4">Discover</p>
            <ul className="space-y-2.5">
              {discover.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="ledger-label mb-4">Categories</p>
            <ul className="space-y-2.5">
              {categories.map((category) => (
                <li key={category.href}>
                  <Link
                    href={category.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="ledger-label mb-4">Locations</p>
            <ul className="space-y-2.5">
              {topAreas.map((area) => (
                <li key={area.slug}>
                  <Link
                    href={`/areas/${area.slug}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {area.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="ledger-label mb-4">For Agencies</p>
            <ul className="space-y-2.5">
              {forAgencies.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-caption-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} ListEasy BD. All rights reserved.</p>
          <p>
            Dhaka, Bangladesh · <a href="mailto:hello@listeasybd.com" className="hover:text-foreground">hello@listeasybd.com</a>
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
