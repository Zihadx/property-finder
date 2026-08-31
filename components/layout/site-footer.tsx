
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";

import { areaService } from "@/services/area.service";
import { categories } from "@/components/marketing/property-categories";

const discover = [
  { href: "/properties", label: "Properties" },
  { href: "/areas", label: "Areas" },
  { href: "/agents", label: "Agents" },
  { href: "/compare", label: "Compare" },
];

const forAgencies = [
  { href: "/dashboard", label: "Agency Dashboard" },
  { href: "/dashboard/properties/new", label: "List a Property" },
  { href: "/dashboard/leads", label: "Leads" },
  { href: "/dashboard/analytics", label: "Analytics" },
];

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M13.6 21v-7h2.35l.45-2.85H13.6V9.3c0-.83.28-1.4 1.43-1.4h1.53V5.35A20.5 20.5 0 0 0 14.5 5c-2.2 0-3.7 1.34-3.7 3.8v2.35H8.45V14h2.35v7h2.8Z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M6.65 8.1a1.65 1.65 0 1 0 0-3.3 1.65 1.65 0 0 0 0 3.3ZM5.2 10h2.9v9H5.2v-9Zm4.65 0h2.78v1.23h.04c.39-.73 1.33-1.5 2.74-1.5 2.93 0 3.47 1.93 3.47 4.44V19h-2.9v-4.28c0-1.02-.02-2.33-1.42-2.33-1.42 0-1.64 1.11-1.64 2.25V19H9.85v-9Z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
      className={className}
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.45" cy="6.7" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

/**
 * Luxury editorial footer.
 *
 * The footer intentionally avoids a typical SaaS-style multi-column layout.
 * It uses a strong brand statement, restrained navigation, architectural
 * spacing, subtle borders and micro-interactions.
 */
export async function SiteFooter() {
  const areas = await areaService.list();

  const topAreas = [...areas]
    .sort((a, b) => b.propertyCount - a.propertyCount)
    .slice(0, 5);

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="container mx-auto px-6">
        {/* ─────────────────────────────────────────────
            Brand Statement
        ────────────────────────────────────────────── */}
        <div className="border-b border-border py-16 sm:py-20 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-5xl">
              <p className="mb-6 text-[0.6rem] font-medium uppercase tracking-[0.3em] text-muted-foreground">
                ListEasy Bangladesh
              </p>

              <Link
                href="/"
                className="group block w-fit"
                aria-label="ListEasy BD home"
              >
                <span className="font-display text-[clamp(4rem,10vw,9rem)] leading-[0.78] tracking-[-0.065em] text-foreground transition-colors duration-500 group-hover:text-accent">
                  ListEasy
                </span>
              </Link>

              <p className="mt-8 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
                A considered way to discover exceptional property, connect
                with the right people, and move with confidence.
              </p>
            </div>

            <Link
              href="/properties"
              className="group inline-flex w-fit items-center gap-3 border-b border-border pb-2 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-foreground transition-colors duration-300 hover:border-foreground"
            >
              Explore properties

              <span className="flex size-7 items-center justify-center rounded-full border border-border transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-foreground">
                <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
              </span>
            </Link>
          </div>
        </div>

        {/* ─────────────────────────────────────────────
            Navigation
        ────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 border-b border-border py-12 sm:grid-cols-4 lg:grid-cols-6 lg:py-14">
          {/* Discover */}
          <div className="col-span-1">
            <p className="mb-5 text-[0.55rem] font-medium uppercase tracking-[0.25em] text-muted-foreground">
              Discover
            </p>

            <ul className="space-y-3">
              {discover.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center text-sm text-foreground/75 transition-colors duration-300 hover:text-foreground"
                  >
                    <span>{link.label}</span>

                    <ArrowUpRight
                      className="ml-1.5 size-3 -translate-x-1 translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                      strokeWidth={1.5}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="col-span-1">
            <p className="mb-5 text-[0.55rem] font-medium uppercase tracking-[0.25em] text-muted-foreground">
              Property
            </p>

            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.href}>
                  <Link
                    href={category.href}
                    className="group inline-flex items-center text-sm text-foreground/75 transition-colors duration-300 hover:text-foreground"
                  >
                    <span>{category.title}</span>

                    <ArrowUpRight
                      className="ml-1.5 size-3 -translate-x-1 translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                      strokeWidth={1.5}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div className="col-span-1">
            <p className="mb-5 text-[0.55rem] font-medium uppercase tracking-[0.25em] text-muted-foreground">
              Locations
            </p>

            <ul className="space-y-3">
              {topAreas.map((area) => (
                <li key={area.slug}>
                  <Link
                    href={`/areas/${area.slug}`}
                    className="group inline-flex items-center text-sm text-foreground/75 transition-colors duration-300 hover:text-foreground"
                  >
                    <span>{area.name}</span>

                    <ArrowUpRight
                      className="ml-1.5 size-3 -translate-x-1 translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                      strokeWidth={1.5}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Agencies */}
          <div className="col-span-1">
            <p className="mb-5 text-[0.55rem] font-medium uppercase tracking-[0.25em] text-muted-foreground">
              Professionals
            </p>

            <ul className="space-y-3">
              {forAgencies.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center text-sm text-foreground/75 transition-colors duration-300 hover:text-foreground"
                  >
                    <span>{link.label}</span>

                    <ArrowUpRight
                      className="ml-1.5 size-3 -translate-x-1 translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                      strokeWidth={1.5}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 lg:pl-8">
            <p className="mb-5 text-[0.55rem] font-medium uppercase tracking-[0.25em] text-muted-foreground">
              Contact
            </p>

            <div className="space-y-4">
              <a
                href="mailto:hello@listeasybd.com"
                className="group flex items-center gap-3 text-sm text-foreground transition-colors duration-300 hover:text-accent"
              >
                <span className="flex size-8 items-center justify-center rounded-full border border-border">
                  <Mail className="size-3.5" strokeWidth={1.4} />
                </span>

                <span>hello@listeasybd.com</span>

                <ArrowUpRight
                  className="size-3 -translate-x-1 translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                  strokeWidth={1.5}
                />
              </a>

              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex size-8 items-center justify-center rounded-full border border-border">
                  <MapPin className="size-3.5" strokeWidth={1.4} />
                </span>

                <span>Dhaka, Bangladesh</span>
              </div>
            </div>

            {/* Social */}
            <div className="mt-6 flex gap-2">
              <a
                href="#"
                aria-label="Facebook"
                className="group flex size-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground hover:bg-foreground hover:text-background"
              >
                <FacebookIcon className="size-3.5 transition-transform duration-300 group-hover:scale-110" />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="group flex size-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground hover:bg-foreground hover:text-background"
              >
                <LinkedinIcon className="size-3.5 transition-transform duration-300 group-hover:scale-110" />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="group flex size-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground hover:bg-foreground hover:text-background"
              >
                <InstagramIcon className="size-3.5 transition-transform duration-300 group-hover:scale-110" />
              </a>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────
            Closing Line
        ────────────────────────────────────────────── */}
        <div className="relative overflow-hidden py-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.6rem] uppercase tracking-[0.16em] text-muted-foreground">
              <Link
                href="/privacy"
                className="transition-colors hover:text-foreground"
              >
                Privacy
              </Link>

              <span className="h-3 w-px bg-border" />

              <Link
                href="/terms"
                className="transition-colors hover:text-foreground"
              >
                Terms
              </Link>
            </div>

            <p className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-muted-foreground/60">
              © {new Date().getFullYear()} ListEasy BD
            </p>

            <p className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-muted-foreground/60">
              Dhaka · Bangladesh
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

