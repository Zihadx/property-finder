"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, Bell, Menu, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet } from "@/components/ui/sheet";
import { DashboardMobileNav } from "./dashboard-mobile-nav";

const labels: Record<string, string> = {
  dashboard: "Dashboard",
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
  const segments = pathname.split("/").filter(Boolean);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-surface px-4 lg:px-6">
      <button
        type="button"
        className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] hover:bg-surface-muted lg:hidden"
        onClick={() => setMobileNavOpen(true)}
        aria-label="Open navigation"
      >
        <Menu className="h-5 w-5" />
      </button>

      <nav aria-label="Breadcrumb" className="hidden items-center gap-1.5 text-sm text-muted-foreground sm:flex">
        {segments.map((segment, index) => (
          <span key={segment} className="flex items-center gap-1.5">
            {index > 0 && <span>/</span>}
            <span className={index === segments.length - 1 ? "text-foreground" : ""}>
              {labels[segment] ?? segment}
            </span>
          </span>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-3">
        <div className="relative hidden sm:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search listings, leads…" className="w-56 pl-9" />
        </div>
        <Button size="sm" asChild className="hidden md:inline-flex">
          <Link href="/dashboard/properties/new">
            <Plus className="mr-1.5 h-4 w-4" />
            Add Property
          </Link>
        </Button>
        <button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center rounded-full hover:bg-surface-muted"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-danger" />
        </button>
        <div className="h-8 w-8 overflow-hidden rounded-full border border-border bg-surface-muted">
          <Image src="https://i.pravatar.cc/64?u=agency-owner" alt="Account" width={32} height={32} className="h-full w-full object-cover" />
        </div>
      </div>

      <Sheet open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} title="Menu" side="right">
        <DashboardMobileNav onNavigate={() => setMobileNavOpen(false)} />
      </Sheet>
    </header>
  );
}
