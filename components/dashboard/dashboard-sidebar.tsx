"use client";

import { memo, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Users2,
  MessagesSquare,
  CalendarClock,
  BarChart3,
  Bell,
  ArrowUpRight,
  ArrowLeft,
  Plus,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    href: "/dashboard",
    label: "Overview",
    description: "Portfolio intelligence",
    icon: LayoutDashboard,
  },
  {
    href: "/dashboard/properties",
    label: "Properties",
    description: "Private portfolio",
    icon: Building2,
  },
  {
    href: "/dashboard/leads",
    label: "Leads",
    description: "Client relationships",
    icon: MessagesSquare,
  },
  {
    href: "/dashboard/site-visits",
    label: "Site Visits",
    description: "Private viewings",
    icon: CalendarClock,
  },
  {
    href: "/dashboard/agents",
    label: "Advisors",
    description: "Advisory team",
    icon: Users2,
  },
  {
    href: "/dashboard/analytics",
    label: "Intelligence",
    description: "Market performance",
    icon: BarChart3,
  },
  {
    href: "/dashboard/notifications",
    label: "Activity",
    description: "Recent activity",
    icon: Bell,
  },
];

export { navItems };

const SIDEBAR_EXPANDED = "280px";
const SIDEBAR_COLLAPSED = "84px";
const STORAGE_KEY = "sidebar-collapsed";

/* =====================================================================
   NAV LINK — extracted + memoized so a pathname change only re-renders
   the item whose active state actually flipped, not the whole list.
===================================================================== */

type SidebarNavItem = (typeof navItems)[number];

const NavLink = memo(function NavLink({
  item,
  index,
  active,
  collapsed,
}: {
  item: SidebarNavItem;
  index: number;
  active: boolean;
  collapsed: boolean;
}) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      title={collapsed ? item.label : undefined}
      className={cn(
        "group relative flex min-h-[58px] items-center",
        "rounded-[2px] border",
        collapsed ? "justify-center px-0" : "px-3",
        "transition-all duration-300 ease-out",
        active
          ? "border-accent-strong/25 bg-gradient-to-r from-accent-strong/[0.08] via-surface/60 to-transparent"
          : "border-transparent hover:border-border/60 hover:bg-surface/40",
      )}
    >
      {/* INDEX */}
      {!collapsed && (
        <span
          className={cn(
            "mr-3 w-5 shrink-0 text-center",
            "font-mono text-[10px] font-medium tabular-nums tracking-[0.08em]",
            "transition-colors duration-300",
            active
              ? "text-accent-strong"
              : "text-muted-foreground/60 group-hover:text-muted-foreground/85",
          )}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      )}

      {/* ICON */}
      <span
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center",
          "rounded-[2px] border transition-all duration-300",
          active
            ? "border-accent-strong/30 bg-background shadow-[0_1px_8px_-2px_rgba(0,0,0,0.15)]"
            : "border-transparent group-hover:border-border/70 group-hover:bg-background/60",
        )}
      >
        <Icon
          className={cn(
            "h-4 w-4 transition-colors duration-300",
            active
              ? "text-accent-strong"
              : "text-muted-foreground/75 group-hover:text-foreground",
          )}
          strokeWidth={1.5}
        />
      </span>

      {/* TEXT */}
      {!collapsed && (
        <span className="ml-3 min-w-0">
          <span
            className={cn(
              "block text-[13px] font-semibold leading-tight",
              "tracking-[-0.01em]",
              "transition-colors duration-300",
              active
                ? "text-foreground"
                : "text-foreground/80 group-hover:text-foreground",
            )}
          >
            {item.label}
          </span>

          <span
            className={cn(
              "mt-0.5 block truncate",
              "text-[10.5px] font-medium leading-tight",
              "tracking-[0.02em]",
              "transition-colors duration-300",
              active
                ? "text-muted-foreground/90"
                : "text-muted-foreground/60 group-hover:text-muted-foreground/85",
            )}
          >
            {item.description}
          </span>
        </span>
      )}

      {/* ACTIVE INDICATOR */}
      <span
        className={cn(
          "absolute left-0 top-1/2 -translate-y-1/2",
          "h-8 w-[2.5px] rounded-r-full",
          "transition-all duration-300",
          active
            ? "bg-gradient-to-b from-accent-strong to-accent-strong/40"
            : "bg-transparent",
        )}
      />

      {/* ARROW */}
      {!collapsed && (
        <ArrowUpRight
          className={cn(
            "ml-auto h-3.5 w-3.5 shrink-0",
            "transition-all duration-300",
            active
              ? "text-accent-strong/70"
              : "translate-x-1 text-transparent group-hover:translate-x-0 group-hover:text-muted-foreground/50",
          )}
          strokeWidth={1.6}
        />
      )}
    </Link>
  );
});

/* =====================================================================
   SIDEBAR
===================================================================== */

export function DashboardSidebar() {
  const pathname = usePathname();

  const [collapsed, setCollapsed] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(STORAGE_KEY) === "true";
  });

  // Publish the current width as a CSS variable so the layout's content
  // pane (which offsets itself with padding-left) can track it without
  // needing shared state or prop-drilling through the layout tree.
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--sidebar-w",
      collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED,
    );
    window.localStorage.setItem(STORAGE_KEY, String(collapsed));
  }, [collapsed]);

  const items = navItems.map((item) => ({
    item,
    active:
      item.href === "/dashboard"
        ? pathname === item.href
        : pathname.startsWith(item.href),
  }));

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 hidden h-screen flex-col",
        "border-r border-border/60 bg-background",
        "transition-[width] duration-300 ease-in-out",
        "lg:flex",
      )}
      style={{ width: collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED }}
    >
      {/* =========================================================
          COLLAPSE TOGGLE
      ========================================================= */}
      <button
        type="button"
        onClick={() => setCollapsed((prev) => !prev)}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className={cn(
          "absolute -right-3 top-8 z-50",
          "flex h-6 w-6 items-center justify-center",
          "rounded-full border border-border/70 bg-background",
          "text-muted-foreground/70 shadow-[0_1px_6px_-1px_rgba(0,0,0,0.2)]",
          "transition-all duration-300 hover:border-accent-strong/50 hover:text-accent-strong",
        )}
      >
        {collapsed ? (
          <PanelLeftOpen className="h-3 w-3" strokeWidth={1.8} />
        ) : (
          <PanelLeftClose className="h-3 w-3" strokeWidth={1.8} />
        )}
      </button>

      {/* =========================================================
          BRAND
      ========================================================= */}
      <div
        className={cn(
          "relative shrink-0 pt-8 pb-7",
          collapsed ? "px-0" : "px-7",
        )}
      >
        <Link
          href="/dashboard"
          className={cn("group block", collapsed && "flex justify-center")}
          aria-label="ListEasy BD Private Office"
          title={collapsed ? "ListEasy BD" : undefined}
        >
          {collapsed ? (
            <span
              className="
                flex h-10 w-10 items-center justify-center
                rounded-[2px] border border-border/70
                font-display text-[19px] text-foreground
              "
            >
              L
            </span>
          ) : (
            <>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-[25px] font-normal leading-none tracking-[-0.045em] text-foreground">
                  ListEasy
                </span>
                <span className="font-mono text-[9px] font-semibold tracking-[0.3em] text-accent-strong">
                  BD
                </span>
              </div>

              <div className="mt-3 flex items-center gap-3">
                <span className="h-px w-7 bg-gradient-to-r from-accent-strong to-accent-strong/20" />
                <span className="text-[9px] font-semibold tracking-[0.24em] text-muted-foreground/75">
                  Private Property Office
                </span>
              </div>
            </>
          )}
        </Link>

        {!collapsed && (
          <div className="absolute right-0 top-7 h-10 w-px bg-border/70" />
        )}
      </div>

      {/* =========================================================
          NAVIGATION
      ========================================================= */}
      <div className={cn("flex-1 overflow-y-auto pb-6", collapsed ? "px-2" : "px-4")}>
        {!collapsed && (
          <div className="mb-4 px-3">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-semibold tracking-[0.26em] text-muted-foreground/70">
                Private Office
              </span>
              <span className="font-mono text-[9px] font-medium tracking-[0.16em] text-muted-foreground/55">
                {String(navItems.length).padStart(2, "0")} sections
              </span>
            </div>
            <div className="mt-3 h-px w-full bg-border/50" />
          </div>
        )}

        <nav className="space-y-[3px]" aria-label="Dashboard navigation">
          {items.map(({ item, active }, index) => (
            <NavLink
              key={item.href}
              item={item}
              index={index}
              active={active}
              collapsed={collapsed}
            />
          ))}
        </nav>

        {/* =========================================================
            QUICK ACTION
        ========================================================= */}
        <div className={cn("mt-8", collapsed ? "px-0" : "px-3")}>
          {!collapsed && (
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px flex-1 bg-border/50" />
              <span className="text-[9px] font-semibold tracking-[0.24em] text-muted-foreground/65">
                Action
              </span>
            </div>
          )}

          <Link
            href="/dashboard/properties/new"
            title={collapsed ? "Add Residence" : undefined}
            className={cn(
              "group flex h-12 items-center rounded-[2px] border border-border/60",
              "transition-all duration-300",
              "hover:border-accent-strong/50 hover:bg-accent-strong/[0.06]",
              collapsed ? "justify-center" : "justify-between px-3",
            )}
          >
            <span className={cn("flex items-center", !collapsed && "gap-3")}>
              <span
                className={cn(
                  "flex h-7 w-7 items-center justify-center",
                  "rounded-[2px] border border-border/70",
                  "transition-colors duration-300",
                  "group-hover:border-accent-strong/50",
                )}
              >
                <Plus
                  className="h-3.5 w-3.5 text-muted-foreground/75 transition-colors group-hover:text-accent-strong"
                  strokeWidth={1.6}
                />
              </span>
              {!collapsed && (
                <span className="text-[10.5px] font-semibold tracking-[0.14em] text-foreground/85 transition-colors group-hover:text-foreground">
                  Add Residence
                </span>
              )}
            </span>

            {!collapsed && (
              <ArrowUpRight
                className="h-3.5 w-3.5 text-muted-foreground/45 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-strong"
                strokeWidth={1.5}
              />
            )}
          </Link>
        </div>
      </div>

      {/* =========================================================
          FOOTER
      ========================================================= */}
      <div className={cn("shrink-0 border-t border-border/60 py-5", collapsed ? "px-2" : "px-4")}>
        <Link
          href="/"
          title={collapsed ? "Return to ListEasy" : undefined}
          className={cn(
            "group flex items-center rounded-[2px] py-2.5 transition-colors duration-300 hover:bg-surface/40",
            collapsed ? "justify-center" : "justify-between px-3",
          )}
        >
          <span className={cn("flex items-center", !collapsed && "gap-3")}>
            <span className="flex h-7 w-7 items-center justify-center rounded-[2px] border border-border/70">
              <ArrowLeft
                className="h-3.5 w-3.5 text-muted-foreground/70 transition-all duration-300 group-hover:-translate-x-0.5 group-hover:text-foreground"
                strokeWidth={1.5}
              />
            </span>
            {!collapsed && (
              <span className="text-[10.5px] font-semibold tracking-[0.14em] text-muted-foreground/75 transition-colors duration-300 group-hover:text-foreground">
                Return to ListEasy
              </span>
            )}
          </span>

          {!collapsed && (
            <ArrowUpRight
              className="h-3.5 w-3.5 text-muted-foreground/40 transition-colors group-hover:text-foreground/70"
              strokeWidth={1.5}
            />
          )}
        </Link>

        {!collapsed && (
          <div className="mt-5 flex items-center justify-between px-3">
            <div>
              <p className="font-mono text-[8px] font-medium tracking-[0.22em] text-muted-foreground/55">
                Confidential
              </p>
              <p className="mt-1 text-[8px] font-medium tracking-[0.16em] text-muted-foreground/60">
                Executive Workspace
              </p>
            </div>
            <span className="font-mono text-[9px] font-medium tabular-nums tracking-[0.16em] text-muted-foreground/55">
              BD / {String(navItems.length).padStart(2, "0")}
            </span>
          </div>
        )}
      </div>
    </aside>
  );
}