"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ChevronDown,
  Heart,
  LayoutDashboard,
  Menu,
  Scale,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { useAppSelector } from "@/redux/hooks";

const primaryLink = { href: "/properties", label: "Properties" };
const projectLink = {
  href: "/projects",
  label: "Projects",
};

const discoverLinks = [
  {
    href: "/areas",
    label: "Areas",
    desc: "Browse listings by neighborhood",
  },
  {
    href: "/agents",
    label: "Agents",
    desc: "Meet verified local agents",
  },
  {
    href: "/market-insights",
    label: "Market Insights",
    desc: "Prices, trends & data",
  },
  {
    href: "/how-it-works",
    label: "How It Works",
    desc: "Search to move-in, explained",
  },
  {
    href: "/contact",
    label: "Contact",
    desc: "Talk to our property team",
  },
];

const menuLinks = [
  primaryLink,
  ...discoverLinks,
  { href: "/compare", label: "Compare" },
  { href: "/customer/saved", label: "Saved Properties" },
  { href: "/list-your-property", label: "List Your Property" },
  { href: "/dashboard", label: "Agency Dashboard" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [discoverOpen, setDiscoverOpen] = React.useState(false);
  const discoverRef = React.useRef<HTMLDivElement>(null);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const savedCount = useAppSelector(
    (state) => state.favorites.propertyIds.length,
  );

  const compareCount = useAppSelector(
    (state) => state.compare.propertyIds.length,
  );

  // Close the dropdown on outside click (keyboard/mobile-safe)
  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        discoverRef.current &&
        !discoverRef.current.contains(e.target as Node)
      ) {
        setDiscoverOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function openWithIntent() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDiscoverOpen(true);
  }

  function closeWithIntent() {
    closeTimer.current = setTimeout(() => setDiscoverOpen(false), 120);
  }

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

        <Link href="/" className="group relative flex items-baseline gap-2">
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
          <Link
            href={primaryLink.href}
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
            {primaryLink.label}
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
          {/* Projects */}
          <Link
            href={projectLink.href}
            className="
    group relative py-2
    text-[10px]
    font-medium
    uppercase
    tracking-[0.2em]
    text-muted-foreground
    transition-colors duration-300
    hover:text-foreground
  "
          >
            {projectLink.label}

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

          {/* Discover dropdown */}
          <div
            ref={discoverRef}
            className="relative"
            onMouseEnter={openWithIntent}
            onMouseLeave={closeWithIntent}
          >
            <button
              type="button"
              onClick={() => setDiscoverOpen((v) => !v)}
              aria-expanded={discoverOpen}
              className="
                group relative flex items-center gap-1.5
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
              Discover
              <ChevronDown
                className={`h-3 w-3 transition-transform duration-300 ${
                  discoverOpen ? "rotate-180" : ""
                }`}
              />
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
            </button>

            {discoverOpen && (
              <div
                className="
                  absolute left-1/2 top-full
                  mt-3 w-72
                  -translate-x-1/2
                  border border-border/70
                  bg-background/95
                  py-2
                  shadow-xl backdrop-blur-xl
                "
                role="menu"
              >
                {discoverLinks.map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    role="menuitem"
                    onClick={() => setDiscoverOpen(false)}
                    className="
                      group/item flex items-center justify-between
                      px-5 py-3
                      transition-colors duration-200
                      hover:bg-foreground/[0.04]
                    "
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[8px] font-medium tracking-[0.15em] text-muted-foreground/50">
                        0{index + 1}
                      </span>
                      <div>
                        <div className="text-[12px] font-medium text-foreground">
                          {link.label}
                        </div>
                        <div className="text-[10px] text-muted-foreground">
                          {link.desc}
                        </div>
                      </div>
                    </div>
                    <ArrowUpRight
                      className="
                        h-3.5 w-3.5 text-muted-foreground
                        opacity-0
                        transition-all duration-300
                        group-hover/item:translate-x-0.5
                        group-hover/item:-translate-y-0.5
                        group-hover/item:opacity-100
                      "
                    />
                  </Link>
                ))}
              </div>
            )}
          </div>
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

          {/* List Your Property */}
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
            <Link href="/list-your-property">
              <LayoutDashboard
                className="
                  mr-2 h-3.5 w-3.5
                  transition-transform duration-300
                  group-hover:scale-105
                "
              />
              List Your Property
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

      <Dialog open={menuOpen} onClose={() => setMenuOpen(false)}>
        <div className="overflow-hidden">
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
