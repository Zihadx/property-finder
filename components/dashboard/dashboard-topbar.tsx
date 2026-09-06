"use client";

import { useCallback, useMemo, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import {
  Search,
  Bell,
  Menu,
  Plus,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

import { DashboardMobileNav } from "./dashboard-mobile-nav";

const labels: Record<string, string> = {
  dashboard: "Overview",
  properties: "Properties",
  leads: "Leads",
  "site-visits": "Site Visits",
  agents: "Agents",
  analytics: "Analytics",
  notifications: "Notifications",
  new: "New",
  edit: "Edit",
};

export function DashboardTopbar() {
  const pathname = usePathname();

  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Only re-derive the breadcrumb label when the route actually changes.
  const currentPage = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    const last = segments[segments.length - 1];
    return last ? (labels[last] ?? last) : "Overview";
  }, [pathname]);

  const closeMobileNav = useCallback(() => setMobileNavOpen(false), []);
  const openMobileNav = useCallback(() => setMobileNavOpen(true), []);

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border/70 bg-surface/95 backdrop-blur-xl">
      <div className="flex h-full items-center px-4 sm:px-6 lg:px-8">
        {/* =========================================================
            MOBILE MENU
        ========================================================= */}

        <button
          type="button"
          onClick={openMobileNav}
          aria-label="Open navigation"
          title="Open navigation"
          className="
            flex h-9 w-9 items-center justify-center
            rounded-[2px] border border-transparent
            text-muted-foreground/80
            transition-all duration-300
            hover:border-border
            hover:bg-background
            hover:text-foreground
            lg:hidden
          "
        >
          <Menu className="h-[18px] w-[18px]" strokeWidth={1.6} />
        </button>

        {/* =========================================================
            BREADCRUMB
        ========================================================= */}

        <nav
          aria-label="Breadcrumb"
          className="ml-3 hidden items-center sm:flex lg:ml-0"
        >
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] font-medium uppercase tracking-[0.22em] text-muted-foreground/55">
              Workspace
            </span>

            <ChevronRight className="h-3 w-3 text-muted-foreground/40" strokeWidth={1.6} />

            <span className="text-[13px] font-semibold tracking-[-0.005em] text-foreground">
              {currentPage}
            </span>
          </div>
        </nav>

        {/* =========================================================
            MOBILE PAGE LABEL
        ========================================================= */}

        <div className="ml-3 sm:hidden">
          <span className="text-[13px] font-semibold text-foreground">
            {currentPage}
          </span>
        </div>

        {/* =========================================================
            ACTIONS
        ========================================================= */}

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          {/* Search */}
          <div
            className={cn(
              "relative hidden transition-all duration-300 md:block",
              searchOpen ? "w-72" : "w-52",
            )}
          >
            <Search
              className="
                pointer-events-none
                absolute left-3 top-1/2
                h-3.5 w-3.5
                -translate-y-1/2
                text-muted-foreground/60
              "
              strokeWidth={1.6}
            />

            <Input
              aria-label="Search portfolio"
              placeholder="Search portfolio..."
              className="
                h-9
                w-full
                rounded-[2px]
                border-border/60
                bg-background/60
                pl-9
                text-[12px]
                font-medium
                shadow-none
                placeholder:text-muted-foreground/50
                focus-visible:border-accent-strong/50
                focus-visible:ring-0
              "
              onFocus={() => setSearchOpen(true)}
              onBlur={() => setSearchOpen(false)}
            />
          </div>

          {/* Mobile search */}
          <button
            type="button"
            aria-label="Search"
            title="Search"
            className="
              flex h-9 w-9 items-center justify-center
              rounded-[2px] border border-transparent
              text-muted-foreground/80
              transition-all duration-300
              hover:border-border
              hover:bg-background
              hover:text-foreground
              md:hidden
            "
          >
            <Search className="h-4 w-4" strokeWidth={1.6} />
          </button>

          {/* Add Property */}
          <Button
            size="sm"
            asChild
            className="
              hidden
              h-9
              rounded-[2px]
              border
              border-foreground
              bg-foreground
              px-4
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.16em]
              text-background
              shadow-none
              transition-all
              duration-300
              hover:bg-accent-strong
              hover:border-accent-strong
              md:inline-flex
            "
          >
            <Link href="/dashboard/properties/new">
              <Plus className="mr-2 h-3.5 w-3.5" strokeWidth={1.6} />
              Add Property
            </Link>
          </Button>

          {/* Notifications */}
          <button
            type="button"
            aria-label="Notifications"
            title="Notifications"
            className="
              relative
              flex h-9 w-9
              items-center justify-center
              rounded-[2px] border border-transparent
              text-muted-foreground/80
              transition-all duration-300
              hover:border-border
              hover:bg-background
              hover:text-foreground
            "
          >
            <Bell className="h-[16px] w-[16px]" strokeWidth={1.6} />

            <span className="absolute right-[8px] top-[7px] h-1.5 w-1.5 rounded-full bg-accent-strong ring-2 ring-surface" />
          </button>

          {/* Divider */}
          <span className="hidden h-6 w-px bg-border/60 sm:block" />

          {/* Account */}
          <button
            type="button"
            className="group flex items-center gap-2.5 rounded-[2px] px-1 py-1 transition-colors"
            aria-label="Account"
            title="Account"
          >
            <span className="relative block h-8 w-8 overflow-hidden rounded-full border border-border/70 bg-surface-muted transition-colors duration-300 group-hover:border-accent-strong/50">
              <Image
                src="https://i.pravatar.cc/64?u=agency-owner"
                alt="Account"
                width={32}
                height={32}
                className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
              />
            </span>

            <span className="hidden text-left xl:block">
              <span className="block text-[11px] font-semibold text-foreground">
                Agency Owner
              </span>

              <span className="mt-0.5 block text-[8px] font-medium uppercase tracking-[0.16em] text-muted-foreground/55">
                Administrator
              </span>
            </span>

            <ArrowUpRight className="hidden h-3 w-3 text-muted-foreground/40 transition-colors group-hover:text-accent-strong xl:block" />
          </button>
        </div>
      </div>

      {/* =========================================================
          MOBILE NAVIGATION
      ========================================================= */}

      <Sheet
        open={mobileNavOpen}
        onClose={closeMobileNav}
        title="Navigation"
        side="right"
      >
        <DashboardMobileNav onNavigate={closeMobileNav} />
      </Sheet>
    </header>
  );
}