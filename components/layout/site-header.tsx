
"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Heart,
  LayoutDashboard,
  Menu,
  Scale,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { useAppSelector } from "@/redux/hooks";

const navLinks = [
  { href: "/properties", label: "Properties" },
  { href: "/areas", label: "Areas" },
  { href: "/agents", label: "Agents" },
];

const menuLinks = [
  ...navLinks,
  { href: "/compare", label: "Compare" },
  { href: "/customer/saved", label: "Saved Properties" },
  { href: "/dashboard", label: "Agency Dashboard" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const savedCount = useAppSelector(
    (state) => state.favorites.propertyIds.length,
  );

  const compareCount = useAppSelector(
    (state) => state.compare.propertyIds.length,
  );

  return (
    <header
      className="
        sticky top-0 z-50
        border-b border-white/[0.08]
        bg-background/80
        backdrop-blur-xl
        supports-[backdrop-filter]:bg-background/65
      "
    >
      <div
        className="
          mx-auto flex h-[76px] max-w-[1600px]
          items-center justify-between
          px-6 sm:px-8 lg:px-12
        "
      >
        {/* =========================================================
            BRAND
        ========================================================== */}

        <Link
          href="/"
          className="group relative flex items-baseline gap-2"
        >
          <span
            className="
              font-display text-[22px] font-medium
              tracking-[-0.035em]
              text-foreground
              transition-opacity duration-300
              group-hover:opacity-80
            "
          >
            ListEasy
          </span>

          <span
            className="
              text-[9px] font-medium
              uppercase tracking-[0.28em]
              text-accent-strong
            "
          >
            BD
          </span>
        </Link>

        {/* =========================================================
            DESKTOP NAV
        ========================================================== */}

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="
                group relative
                py-2
                text-[10px]
                font-medium
                uppercase
                tracking-[0.2em]
                text-muted-foreground
                transition-colors duration-300
                hover:text-foreground
              "
            >
              {link.label}

              <span
                className="
                  absolute bottom-0 left-1/2
                  h-px w-0
                  -translate-x-1/2
                  bg-foreground
                  transition-all duration-500
                  group-hover:w-full
                "
              />
            </Link>
          ))}
        </nav>

        {/* =========================================================
            ACTIONS
        ========================================================== */}

        <div className="ml-auto flex items-center gap-1.5">
          {/* Compare */}
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="
              group relative hidden
              h-10 w-10
              rounded-full
              sm:inline-flex
              hover:bg-foreground/[0.06]
            "
          >
            <Link
              href="/compare"
              aria-label={`Compare properties${
                compareCount > 0 ? ` (${compareCount})` : ""
              }`}
            >
              <Scale
                className="
                  h-[17px] w-[17px]
                  text-muted-foreground
                  transition-transform duration-300
                  group-hover:scale-105
                "
              />

              {compareCount > 0 && (
                <span
                  className="
                    absolute right-0.5 top-0.5
                    flex h-4 min-w-4
                    items-center justify-center
                    rounded-full
                    bg-accent
                    px-1
                    text-[8px]
                    font-semibold
                    text-accent-foreground
                    ring-2 ring-background
                  "
                >
                  {compareCount}
                </span>
              )}
            </Link>
          </Button>

          {/* Saved */}
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="
              group relative
              h-10 w-10
              rounded-full
              hover:bg-foreground/[0.06]
            "
          >
            <Link
              href="/customer/saved"
              aria-label={`Saved properties${
                savedCount > 0 ? ` (${savedCount})` : ""
              }`}
            >
              <Heart
                className="
                  h-[17px] w-[17px]
                  text-muted-foreground
                  transition-all duration-300
                  group-hover:scale-105
                "
              />

              {savedCount > 0 && (
                <span
                  className="
                    absolute right-0.5 top-0.5
                    flex h-4 min-w-4
                    items-center justify-center
                    rounded-full
                    bg-accent
                    px-1
                    text-[8px]
                    font-semibold
                    text-accent-foreground
                    ring-2 ring-background
                  "
                >
                  {savedCount}
                </span>
              )}
            </Link>
          </Button>

          {/* Divider */}
          <div className="mx-2 hidden h-7 w-px bg-border/70 sm:block" />

          {/* Agency Dashboard */}
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="
              group hidden
              h-10
              px-4
              text-[9px]
              font-medium
              uppercase
              tracking-[0.16em]
              text-muted-foreground
              hover:bg-foreground/[0.05]
              hover:text-foreground
              sm:inline-flex
            "
          >
            <Link href="/dashboard">
              <LayoutDashboard
                className="
                  mr-2 h-3.5 w-3.5
                  transition-transform duration-300
                  group-hover:scale-105
                "
              />
              Agency
            </Link>
          </Button>

          {/* Primary CTA */}
          <Button
            size="sm"
            asChild
            className="
              group hidden
              h-10
              rounded-none
              bg-foreground
              px-5
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.18em]
              text-background
              transition-all duration-500
              hover:bg-foreground/90
              sm:inline-flex
            "
          >
            <Link href="/properties">
              Browse Properties

              <ArrowUpRight
                className="
                  ml-3 h-3.5 w-3.5
                  transition-transform duration-500
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                "
              />
            </Link>
          </Button>

          {/* Mobile Menu */}
          <Button
            variant="ghost"
            size="icon"
            className="
              ml-1
              h-10 w-10
              rounded-full
              hover:bg-foreground/[0.06]
              md:hidden
            "
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="h-[19px] w-[19px]" />
          </Button>
        </div>
      </div>

      {/* =========================================================
          MOBILE MENU
      ========================================================== */}

      <Dialog
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        title="Navigation"
      >
        <div className="overflow-hidden">
          {/* Mobile header */}
          <div className="flex items-center justify-between border-b border-border px-5 py-5">
            <div>
              <p className="font-display text-xl tracking-[-0.03em]">
                ListEasy
              </p>

              <p className="mt-1 text-[8px] uppercase tracking-[0.25em] text-muted-foreground">
                Premium Real Estate
              </p>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Main links */}
          <nav className="p-3">
            {menuLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="
                  group flex
                  items-center justify-between
                  border-b border-border/50
                  px-4 py-4
                  transition-colors duration-300
                  last:border-b-0
                  hover:bg-surface-muted
                "
              >
                <div className="flex items-center gap-4">
                  <span
                    className="
                      text-[8px]
                      font-medium
                      tracking-[0.15em]
                      text-muted-foreground/50
                    "
                  >
                    0{index + 1}
                  </span>

                  <span
                    className="
                      text-sm
                      font-medium
                      text-foreground
                    "
                  >
                    {link.label}
                  </span>
                </div>

                <ArrowUpRight
                  className="
                    h-4 w-4
                    text-muted-foreground
                    opacity-0
                    transition-all duration-300
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                    group-hover:opacity-100
                  "
                />
              </Link>
            ))}
          </nav>

          {/* Mobile CTA */}
          <div className="border-t border-border p-4">
            <Link
              href="/properties"
              onClick={() => setMenuOpen(false)}
              className="
                flex h-12
                items-center justify-center
                bg-foreground
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-background
                transition-opacity
                hover:opacity-90
              "
            >
              Explore Properties
              <ArrowUpRight className="ml-3 h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Footer metadata */}
          <div className="flex items-center justify-between border-t border-border px-5 py-4">
            <span className="text-[8px] uppercase tracking-[0.22em] text-muted-foreground/50">
              Dhaka · Bangladesh
            </span>

            <span className="text-[8px] uppercase tracking-[0.22em] text-muted-foreground/50">
              2026
            </span>
          </div>
        </div>
      </Dialog>
    </header>
  );
}

