
"use client";

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

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="
        fixed inset-y-0 left-0 z-40 hidden w-[272px]
        border-r border-border/60
        bg-background
        lg:flex lg:flex-col
      "
    >
      {/* =========================================================
          BRAND
      ========================================================= */}

      <div className="relative shrink-0 px-7 pt-8 pb-7">
        <Link
          href="/dashboard"
          className="group block"
          aria-label="ListEasy BD Private Office"
        >
          <div className="flex items-baseline gap-2">
            <span
              className="
                font-display
                text-[23px]
                font-normal
                leading-none
                tracking-[-0.045em]
                text-foreground
              "
            >
              ListEasy
            </span>

            <span
              className="
                font-mono
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.3em]
                text-accent-strong
              "
            >
              BD
            </span>
          </div>

          <div className="mt-3 flex items-center gap-3">
            <span className="h-px w-7 bg-accent-strong/70" />

            <span
              className="
                text-[8px]
                font-medium
                uppercase
                tracking-[0.3em]
                text-muted-foreground/65
              "
            >
              Private Property Office
            </span>
          </div>
        </Link>

        <div
          className="
            absolute
            right-0
            top-7
            h-10
            w-px
            bg-border/70
          "
        />
      </div>

      {/* =========================================================
          NAVIGATION
      ========================================================= */}

      <div className="flex-1 overflow-y-auto px-4 pb-6">
        <div className="mb-5 px-3">
          <div className="flex items-center justify-between">
            <span
              className="
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.32em]
                text-muted-foreground/60
              "
            >
              Private Office
            </span>

            <span
              className="
                font-mono
                text-[8px]
                font-medium
                tracking-[0.18em]
                text-muted-foreground/50
              "
            >
              01
            </span>
          </div>

          <div className="mt-3 h-px w-full bg-border/50" />
        </div>

        <nav
          className="space-y-[3px]"
          aria-label="Dashboard navigation"
        >
          {navItems.map((item, index) => {
            const active =
              item.href === "/dashboard"
                ? pathname === item.href
                : pathname.startsWith(item.href);

            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative flex min-h-[61px] items-center",
                  "border px-3",
                  "transition-all duration-500",
                  active
                    ? "border-border/70 bg-surface/70"
                    : "border-transparent hover:border-border/50 hover:bg-surface/40",
                )}
              >
                {/* INDEX */}

                <span
                  className={cn(
                    "mr-3 w-5 shrink-0",
                    "font-mono text-[8px] font-medium tabular-nums",
                    "tracking-[0.12em]",
                    "transition-colors duration-500",
                    active
                      ? "text-accent-strong"
                      : "text-muted-foreground/50 group-hover:text-muted-foreground/75",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* ICON */}

                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center",
                    "border transition-all duration-500",
                    active
                      ? "border-border bg-background"
                      : "border-transparent group-hover:border-border/60",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-[15px] w-[15px] transition-colors duration-500",
                      active
                        ? "text-foreground"
                        : "text-muted-foreground/65 group-hover:text-foreground",
                    )}
                    strokeWidth={1.4}
                  />
                </span>

                {/* TEXT */}

                <span className="ml-3 min-w-0">
                  <span
                    className={cn(
                      "block text-[12px] font-medium",
                      "tracking-[-0.005em]",
                      "transition-colors duration-500",
                      active
                        ? "text-foreground"
                        : "text-muted-foreground group-hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </span>

                  <span
                    className={cn(
                      "mt-1 block truncate",
                      "text-[8px] font-medium",
                      "uppercase tracking-[0.14em]",
                      "transition-colors duration-500",
                      active
                        ? "text-muted-foreground/70"
                        : "text-muted-foreground/50 group-hover:text-muted-foreground/70",
                    )}
                  >
                    {item.description}
                  </span>
                </span>

                {/* ACTIVE LINE */}

                <span
                  className={cn(
                    "absolute right-0 top-1/2",
                    "h-7 w-[2px]",
                    "-translate-y-1/2",
                    "transition-all duration-500",
                    active
                      ? "bg-accent-strong"
                      : "bg-transparent group-hover:bg-border",
                  )}
                />

                {/* ARROW */}

                <ArrowUpRight
                  className={cn(
                    "ml-auto h-3.5 w-3.5",
                    "transition-all duration-500",
                    active
                      ? "text-muted-foreground/55"
                      : "translate-x-1 text-transparent group-hover:translate-x-0 group-hover:text-muted-foreground/40",
                  )}
                  strokeWidth={1.4}
                />
              </Link>
            );
          })}
        </nav>

        {/* =========================================================
            QUICK ACTION
        ========================================================= */}

        <div className="mt-8 px-3">
          <div className="mb-3 flex items-center gap-3">
            <span className="h-px flex-1 bg-border/50" />

            <span
              className="
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.28em]
                text-muted-foreground/55
              "
            >
              Action
            </span>
          </div>

          <Link
            href="/dashboard/properties/new"
            className="
              group
              flex
              h-11
              items-center
              justify-between
              border
              border-border/60
              px-3
              transition-all
              duration-500
              hover:border-accent-strong/60
              hover:bg-surface/50
            "
          >
            <span className="flex items-center gap-3">
              <span
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  border
                  border-border/70
                  transition-colors
                  duration-500
                  group-hover:border-accent-strong/50
                "
              >
                <Plus
                  className="
                    h-3.5
                    w-3.5
                    text-muted-foreground/65
                    transition-colors
                    group-hover:text-foreground
                  "
                  strokeWidth={1.5}
                />
              </span>

              <span
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.19em]
                  text-muted-foreground/70
                  transition-colors
                  group-hover:text-foreground
                "
              >
                Add Residence
              </span>
            </span>

            <ArrowUpRight
              className="
                h-3.5
                w-3.5
                text-muted-foreground/40
                transition-all
                duration-500
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
                group-hover:text-foreground/70
              "
              strokeWidth={1.4}
            />
          </Link>
        </div>
      </div>

      {/* =========================================================
          FOOTER
      ========================================================= */}

      <div className="shrink-0 border-t border-border/60 px-4 py-5">
        <Link
          href="/"
          className="
            group
            flex
            items-center
            justify-between
            px-3
            py-2.5
            transition-colors
            duration-500
            hover:bg-surface/40
          "
        >
          <span className="flex items-center gap-3">
            <span
              className="
                flex
                h-7
                w-7
                items-center
                justify-center
                border
                border-border/70
              "
            >
              <ArrowLeft
                className="
                  h-3.5
                  w-3.5
                  text-muted-foreground/60
                  transition-all
                  duration-500
                  group-hover:-translate-x-0.5
                  group-hover:text-foreground
                "
                strokeWidth={1.4}
              />
            </span>

            <span
              className="
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-muted-foreground/65
                transition-colors
                duration-500
                group-hover:text-foreground
              "
            >
              Return to ListEasy
            </span>
          </span>

          <ArrowUpRight
            className="
              h-3.5
              w-3.5
              text-muted-foreground/35
              transition-colors
              group-hover:text-foreground/60
            "
            strokeWidth={1.4}
          />
        </Link>

        <div className="mt-5 flex items-center justify-between px-3">
          <div>
            <p
              className="
                font-mono
                text-[7px]
                font-medium
                uppercase
                tracking-[0.24em]
                text-muted-foreground/45
              "
            >
              Confidential
            </p>

            <p
              className="
                mt-1
                text-[7px]
                font-medium
                uppercase
                tracking-[0.18em]
                text-muted-foreground/50
              "
            >
              Executive Workspace
            </p>
          </div>

          <span
            className="
              font-mono
              text-[8px]
              font-medium
              tabular-nums
              tracking-[0.18em]
              text-muted-foreground/45
            "
          >
            BD / 01
          </span>
        </div>
      </div>
    </aside>
  );
}

