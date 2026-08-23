import Link from "next/link";

const columns = [
  {
    title: "Discover",
    links: [
      { href: "/properties", label: "All Properties" },
      { href: "/areas", label: "Areas" },
      { href: "/agents", label: "Agents" },
    ],
  },
  {
    title: "Property Types",
    links: [
      { href: "/properties?type=Apartment", label: "Apartments" },
      { href: "/properties?type=Plot", label: "Plots" },
      { href: "/properties?type=Commercial+Space", label: "Commercial" },
    ],
  },
  {
    title: "Agency",
    links: [
      { href: "/dashboard", label: "Agency Dashboard" },
      { href: "/dashboard/leads", label: "Leads" },
      { href: "/dashboard/analytics", label: "Analytics" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-surface-muted">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <span className="font-display text-xl text-foreground">ListEasy BD</span>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Your properties, organized. Your leads, simplified. A professional property
              catalog for Bangladeshi real-estate agents.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <p className="ledger-label mb-4">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-caption-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} ListEasy BD. All rights reserved.</p>
          <p>Dhaka, Bangladesh</p>
        </div>
      </div>
    </footer>
  );
}
