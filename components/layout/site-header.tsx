"use client";

import * as React from "react";
import Link from "next/link";
import { Heart, LayoutDashboard, Menu, Scale } from "lucide-react";
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

/**
 * Milestone 20: the desktop nav only ever showed Properties/Areas/Agents
 * on md+ screens — below that, the header had no way to reach Areas or
 * Agents at all (they were simply hidden, not moved anywhere). Fixed with
 * a real mobile menu, reusing the existing Dialog (bottom-sheet on
 * mobile) instead of building a second modal pattern. The saved-count
 * badge reads live Redux state, same as the rest of the app's counters.
 */
export function SiteHeader() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const savedCount = useAppSelector((state) => state.favorites.propertyIds.length);
  const compareCount = useAppSelector((state) => state.compare.propertyIds.length);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-display text-xl tracking-tight text-foreground">ListEasy</span>
          <span className="ledger-value text-xs tracking-[0.2em] text-accent-strong">BD</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild className="relative hidden sm:inline-flex">
            <Link href="/compare" aria-label={`Compare properties${compareCount > 0 ? ` (${compareCount})` : ""}`}>
              <Scale className="h-4 w-4" />
              {compareCount > 0 && (
                <span className="absolute right-1 top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-accent text-[9px] font-medium text-accent-foreground">
                  {compareCount}
                </span>
              )}
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild className="relative">
            <Link href="/customer/saved" aria-label={`Saved properties${savedCount > 0 ? ` (${savedCount})` : ""}`}>
              <Heart className="h-4 w-4" />
              {savedCount > 0 && (
                <span className="absolute right-1 top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-accent text-[9px] font-medium text-accent-foreground">
                  {savedCount}
                </span>
              )}
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild className="hidden sm:inline-flex">
            <Link href="/dashboard">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Agency Dashboard
            </Link>
          </Button>
          <Button size="sm" asChild className="hidden sm:inline-flex">
            <Link href="/properties">Browse Properties</Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <Dialog open={menuOpen} onClose={() => setMenuOpen(false)} title="Menu">
        <nav className="flex flex-col p-2">
          {menuLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-[var(--radius-sm)] px-3 py-3 text-base text-foreground hover:bg-surface-muted"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </Dialog>
    </header>
  );
}
