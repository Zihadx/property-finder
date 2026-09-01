"use client";

import * as React from "react";

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

  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);

  const segments = pathname.split("/").filter(Boolean);

  const currentPage =
    segments.length > 0
      ? labels[segments[segments.length - 1]] ??
        segments[segments.length - 1]
      : "Overview";

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border/70 bg-surface/95 backdrop-blur-xl">
      <div className="flex h-full items-center px-4 sm:px-6 lg:px-8">
        {/* =========================================================
            MOBILE MENU
        ========================================================= */}

        <button
          type="button"
          onClick={() => setMobileNavOpen(true)}
          aria-label="Open navigation"
          className="
            flex h-9 w-9 items-center justify-center
            border border-transparent
            text-muted-foreground
            transition-all duration-300
            hover:border-border
            hover:bg-background
            hover:text-foreground
            lg:hidden
          "
        >
          <Menu className="h-[17px] w-[17px]" strokeWidth={1.5} />
        </button>

        {/* =========================================================
            BREADCRUMB
        ========================================================= */}

        <nav
          aria-label="Breadcrumb"
          className="ml-3 hidden items-center sm:flex lg:ml-0"
        >
          <div className="flex items-center gap-2">
            <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-muted-foreground/35">
              Workspace
            </span>

            <ChevronRight className="h-3 w-3 text-muted-foreground/25" />

            <span className="text-[11px] font-medium text-foreground">
              {currentPage}
            </span>
          </div>
        </nav>

        {/* =========================================================
            MOBILE PAGE LABEL
        ========================================================= */}

        <div className="ml-3 sm:hidden">
          <span className="text-[11px] font-medium text-foreground">
            {currentPage}
          </span>
        </div>

        {/* =========================================================
            ACTIONS
        ========================================================= */}

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          {/* Search */}
          <div
            className={`
              relative hidden transition-all duration-300 md:block
              ${searchOpen ? "w-72" : "w-52"}
            `}
          >
            <Search
              className="
                pointer-events-none
                absolute left-3 top-1/2
                h-3.5 w-3.5
                -translate-y-1/2
                text-muted-foreground/45
              "
              strokeWidth={1.5}
            />

            <Input
              placeholder="Search portfolio..."
              className="
                h-9
                w-full
                rounded-none
                border-border/60
                bg-background/60
                pl-9
                text-[11px]
                shadow-none
                placeholder:text-muted-foreground/35
                focus-visible:border-foreground/25
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
            className="
              flex h-9 w-9 items-center justify-center
              border border-transparent
              text-muted-foreground
              transition-all duration-300
              hover:border-border
              hover:bg-background
              hover:text-foreground
              md:hidden
            "
          >
            <Search className="h-4 w-4" strokeWidth={1.5} />
          </button>

          {/* Add Property */}
          <Button
            size="sm"
            asChild
            className="
              hidden
              h-9
              rounded-none
              border
              border-foreground
              bg-foreground
              px-4
              text-[9px]
              font-medium
              uppercase
              tracking-[0.18em]
              text-background
              shadow-none
              transition-all
              duration-300
              hover:bg-foreground/90
              md:inline-flex
            "
          >
            <Link href="/dashboard/properties/new">
              <Plus className="mr-2 h-3.5 w-3.5" strokeWidth={1.5} />
              Add Property
            </Link>
          </Button>

          {/* Notifications */}
          <button
            type="button"
            aria-label="Notifications"
            className="
              relative
              flex h-9 w-9
              items-center justify-center
              border border-transparent
              text-muted-foreground
              transition-all duration-300
              hover:border-border
              hover:bg-background
              hover:text-foreground
            "
          >
            <Bell className="h-[15px] w-[15px]" strokeWidth={1.5} />

            <span className="absolute right-[8px] top-[7px] h-1.5 w-1.5 rounded-full bg-accent-strong" />
          </button>

          {/* Divider */}
          <span className="hidden h-6 w-px bg-border/60 sm:block" />

          {/* Account */}
          <button
            type="button"
            className="
              group
              flex
              items-center
              gap-2.5
              px-1
              py-1
              transition-colors
            "
            aria-label="Account"
          >
            <span className="relative block h-8 w-8 overflow-hidden rounded-full border border-border/70 bg-surface-muted">
              <Image
                src="https://i.pravatar.cc/64?u=agency-owner"
                alt="Account"
                width={32}
                height={32}
                className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
              />
            </span>

            <span className="hidden text-left xl:block">
              <span className="block text-[10px] font-medium text-foreground">
                Agency Owner
              </span>

              <span className="mt-0.5 block text-[7px] uppercase tracking-[0.18em] text-muted-foreground/40">
                Administrator
              </span>
            </span>

            <ArrowUpRight className="hidden h-3 w-3 text-muted-foreground/25 transition-colors group-hover:text-foreground/50 xl:block" />
          </button>
        </div>
      </div>

      {/* =========================================================
          MOBILE NAVIGATION
      ========================================================= */}

      <Sheet
        open={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        title="Navigation"
        side="right"
      >
        <DashboardMobileNav
          onNavigate={() => setMobileNavOpen(false)}
        />
      </Sheet>
    </header>
  );
}