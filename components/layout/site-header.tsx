"use client";

import * as React from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  ChevronDown,
  Heart,
  LayoutDashboard,
  Menu,
  Scale,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { useAppSelector } from "@/redux/hooks";

/* =====================================================================
   DATA
===================================================================== */

type NavLinkItem = { href: string; label: string };
type DiscoverLinkItem = NavLinkItem & { desc: string };

const primaryLink: NavLinkItem = { href: "/properties", label: "Properties" };
const projectLink: NavLinkItem = { href: "/projects", label: "Projects" };

const discoverLinks: DiscoverLinkItem[] = [
  { href: "/areas", label: "Areas", desc: "Browse listings by neighborhood" },
  { href: "/agents", label: "Agents", desc: "Meet verified local agents" },
  { href: "/market-insights", label: "Market Insights", desc: "Prices, trends & data" },
  { href: "/how-it-works", label: "How It Works", desc: "Search to move-in, explained" },
  { href: "/contact", label: "Contact", desc: "Talk to our property team" },
];

// Every link that should be reachable from the mobile menu. `projectLink`
// was previously rendered in the desktop nav only and had no mobile
// equivalent — added here so mobile users can actually reach /projects.
const menuLinks: NavLinkItem[] = [
  primaryLink,
  projectLink,
  ...discoverLinks,
  { href: "/compare", label: "Compare" },
  { href: "/customer/saved", label: "Saved Properties" },
  { href: "/list-your-property", label: "List Your Property" },
  { href: "/dashboard", label: "Agency Dashboard" },
];

/* =====================================================================
   NAV LINK — animated-underline link, shared by Properties & Projects
===================================================================== */

function HeaderNavLink({ href, label }: NavLinkItem) {
  return (
    <Link
      href={href}
      className="
        group relative py-2
        text-[11px] font-medium uppercase tracking-[0.18em]
        text-muted-foreground
        transition-colors duration-300
        hover:text-foreground
      "
    >
      {label}
      <span
        className="
          absolute bottom-0 left-1/2 h-px w-0
          -translate-x-1/2 bg-foreground
          transition-all duration-500
          group-hover:w-full
        "
      />
    </Link>
  );
}

/* =====================================================================
   COUNT ICON LINK — shared by Compare & Saved
===================================================================== */

function CountIconLink({
  href,
  icon: Icon,
  count,
  ariaLabel,
  className,
}: {
  href: string;
  icon: LucideIcon;
  count: number;
  ariaLabel: string;
  className?: string;
}) {
  return (
    <Button
      variant="ghost"
      size="icon"
      asChild
      className={`group relative h-10 w-10 rounded-full hover:bg-foreground/[0.06] ${className ?? ""}`}
    >
      <Link href={href} aria-label={count > 0 ? `${ariaLabel} (${count})` : ariaLabel}>
        <Icon
          className="h-[17px] w-[17px] text-muted-foreground transition-transform duration-300 group-hover:scale-105"
        />
        {count > 0 && (
          <span
            className="
              absolute right-0.5 top-0.5
              flex h-4 min-w-4 items-center justify-center
              rounded-full bg-accent px-1
              text-[8px] font-semibold text-accent-foreground
              ring-2 ring-background
            "
          >
            {count}
          </span>
        )}
      </Link>
    </Button>
  );
}

/* =====================================================================
   DISCOVER DROPDOWN — fully self-contained (owns its own open state,
   hover-intent timers, outside-click and Escape handling)
===================================================================== */

function DiscoverMenu() {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  // Clear any pending close timer on unmount to avoid a stray setState
  // firing after the component is gone.
  React.useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const openWithIntent = React.useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }, []);

  const closeWithIntent = React.useCallback(() => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={openWithIntent}
      onMouseLeave={closeWithIntent}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls="discover-menu-panel"
        className="
          group relative flex items-center gap-1.5 py-2
          text-[11px] font-medium uppercase tracking-[0.18em]
          text-muted-foreground
          transition-colors duration-300
          hover:text-foreground
        "
      >
        Discover
        <ChevronDown
          className={`h-3 w-3 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
        <span
          className="
            absolute bottom-0 left-1/2 h-px w-0
            -translate-x-1/2 bg-foreground
            transition-all duration-500
            group-hover:w-full
          "
        />
      </button>

      <div
        id="discover-menu-panel"
        role="menu"
        aria-hidden={!open}
        className={`
          absolute left-1/2 top-full mt-3 w-72 -translate-x-1/2
          border border-border/70 bg-background/95 py-2
          shadow-xl backdrop-blur-xl
          transition-all duration-200 ease-out
          ${open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"}
        `}
      >
        {discoverLinks.map((link, index) => (
          <Link
            key={link.href}
            href={link.href}
            role="menuitem"
            onClick={() => setOpen(false)}
            className="
              group/item flex items-center justify-between
              px-5 py-3
              transition-colors duration-200
              hover:bg-foreground/[0.04]
            "
          >
            <div className="flex items-center gap-3">
              <span className="text-[9px] font-medium tracking-[0.15em] text-muted-foreground/65">
                0{index + 1}
              </span>
              <div>
                <div className="text-[13px] font-medium text-foreground">{link.label}</div>
                <div className="text-[10.5px] text-muted-foreground">{link.desc}</div>
              </div>
            </div>
            <ArrowUpRight
              className="
                h-3.5 w-3.5 text-muted-foreground opacity-0
                transition-all duration-300
                group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 group-hover/item:opacity-100
              "
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

/* =====================================================================
   MOBILE MENU — dialog content, isolated so SiteHeader stays readable
===================================================================== */

function MobileMenu({
  open,
  onClose,
  savedCount,
  compareCount,
}: {
  open: boolean;
  onClose: () => void;
  savedCount: number;
  compareCount: number;
}) {
  const countFor = (href: string) =>
    href === "/customer/saved" ? savedCount : href === "/compare" ? compareCount : 0;

  return (
    <Dialog open={open} onClose={onClose}>
      <div className="overflow-hidden">
        <nav className="p-3">
          {menuLinks.map((link, index) => {
            const count = countFor(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="
                  group flex items-center justify-between
                  border-b border-border/50 px-4 py-4
                  transition-colors duration-300
                  last:border-b-0
                  hover:bg-surface-muted
                "
              >
                <div className="flex items-center gap-4">
                  <span className="text-[9px] font-medium tracking-[0.15em] text-muted-foreground/60">
                    0{index + 1}
                  </span>
                  <span className="text-sm font-medium text-foreground">{link.label}</span>
                  {count > 0 && (
                    <span
                      className="
                        flex h-5 min-w-5 items-center justify-center
                        rounded-full bg-accent px-1.5
                        text-[9px] font-semibold text-accent-foreground
                      "
                    >
                      {count}
                    </span>
                  )}
                </div>

                <ArrowUpRight
                  className="
                    h-4 w-4 text-muted-foreground opacity-0
                    transition-all duration-300
                    group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100
                  "
                />
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border p-4">
          <Link
            href="/properties"
            onClick={onClose}
            className="
              flex h-12 items-center justify-center
              bg-foreground text-[9px] font-semibold uppercase tracking-[0.2em] text-background
              transition-opacity hover:opacity-90
            "
          >
            Explore Properties
            <ArrowUpRight className="ml-3 h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="flex items-center justify-between border-t border-border px-5 py-4">
          <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground/60">
            Dhaka · Bangladesh
          </span>
          <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground/60">
            2026
          </span>
        </div>
      </div>
    </Dialog>
  );
}

/* =====================================================================
   SITE HEADER
===================================================================== */

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const savedCount = useAppSelector((state) => state.favorites.propertyIds.length);
  const compareCount = useAppSelector((state) => state.compare.propertyIds.length);

  const closeMenu = React.useCallback(() => setMenuOpen(false), []);
  const openMenu = React.useCallback(() => setMenuOpen(true), []);

  return (
    <header
      className="
        sticky top-0 z-50
        border-b border-white/[0.08]
        bg-background/80 backdrop-blur-xl
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
        {/* BRAND */}
        <Link href="/" className="group relative flex items-baseline gap-2">
          <span className="font-display text-[22px] font-medium tracking-[-0.035em] text-foreground transition-opacity duration-300 group-hover:opacity-80">
            ListEasy
          </span>
          <span className="text-[9px] font-medium uppercase tracking-[0.28em] text-accent-strong">
            BD
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 md:flex">
          <HeaderNavLink {...primaryLink} />
          <HeaderNavLink {...projectLink} />
          <DiscoverMenu />
        </nav>

        {/* ACTIONS */}
        <div className="ml-auto flex items-center gap-1.5">
          <CountIconLink
            href="/compare"
            icon={Scale}
            count={compareCount}
            ariaLabel="Compare properties"
            className="hidden sm:inline-flex"
          />

          <CountIconLink
            href="/customer/saved"
            icon={Heart}
            count={savedCount}
            ariaLabel="Saved properties"
          />

          <div className="mx-2 hidden h-7 w-px bg-border/70 sm:block" />

          <Button
            variant="ghost"
            size="sm"
            asChild
            className="
              group hidden h-10 px-4
              text-[9px] font-medium uppercase tracking-[0.16em]
              text-muted-foreground
              hover:bg-foreground/[0.05] hover:text-foreground
              sm:inline-flex
            "
          >
            <Link href="/list-your-property">
              <LayoutDashboard className="mr-2 h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-105" />
              List Your Property
            </Link>
          </Button>

          <Button
            size="sm"
            asChild
            className="
              group hidden h-10 rounded-none px-5
              text-[9px] font-semibold uppercase tracking-[0.18em]
              bg-foreground text-background
              transition-all duration-500
              hover:bg-foreground/90
              sm:inline-flex
            "
          >
            <Link href="/properties">
              Browse Properties
              <ArrowUpRight className="ml-3 h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="ml-1 h-10 w-10 rounded-full hover:bg-foreground/[0.06] md:hidden"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={openMenu}
          >
            <Menu className="h-[19px] w-[19px]" />
          </Button>
        </div>
      </div>

      <MobileMenu
        open={menuOpen}
        onClose={closeMenu}
        savedCount={savedCount}
        compareCount={compareCount}
      />
    </header>
  );
}