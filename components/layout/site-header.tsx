"use client";

import * as React from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  ChevronDown,
  Heart,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Scale,
  Settings,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { useAppSelector } from "@/redux/hooks";

/* =====================================================================
   DATA
===================================================================== */

type NavLinkItem = {
  href: string;
  label: string;
  /** Small tag shown next to the label, e.g. "Preview". */
  badge?: string;
  /** One-line explanation shown under the label (mobile menu + dropdowns). */
  note?: string;
};
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

// Agency Dashboard is normally a private, role-gated route. It's included
// here — with a visible "Preview" badge and explanation — because it's
// temporarily open to the public for evaluation. Remove the badge/note
// once the route goes back to being agency-only.
const dashboardLink: NavLinkItem = {
  href: "/dashboard",
  label: "Agency Dashboard",
  badge: "Preview",
  note: "Normally reserved for verified agencies — open for a public overview while we're in beta.",
};

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
  dashboardLink,
];

/* =====================================================================
   AUTH — this file assumes an `auth` slice shaped like
   `{ user: CurrentUser | null }`. Point the selector below at whatever
   your store actually uses; everything else works off `user` being
   present or null.
===================================================================== */

type CurrentUser = {
  name: string;
  email: string;
  avatarUrl?: string;
  role: "customer" | "agent";
};

function useCurrentUser(): CurrentUser | null {
  // TODO: no `auth` slice exists on RootState yet (it currently only has
  // favorites/compare/filters). Once you add one, swap this for:
  //   return useAppSelector((state) => state.auth.user);
  // Returning null keeps the header in its signed-out (Log In / Sign Up) state.
  return null;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function Avatar({
  name,
  avatarUrl,
  size = 34,
}: {
  name: string;
  avatarUrl?: string;
  size?: number;
}) {
  if (avatarUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={avatarUrl}
        alt={name}
        className="shrink-0 rounded-full object-cover ring-1 ring-border/70"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full bg-foreground ring-1 ring-border/70"
      style={{ width: size, height: size }}
    >
      <span className="text-[11px] font-semibold tracking-wide text-background">
        {getInitials(name)}
      </span>
    </div>
  );
}

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

function useDropdown() {
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

  return { open, setOpen, rootRef, openWithIntent, closeWithIntent };
}

function DiscoverMenu() {
  const { open, setOpen, rootRef, openWithIntent, closeWithIntent } = useDropdown();

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
   ACCOUNT MENU — a single trigger for both signed-in and signed-out
   states. Signed out: Sign In / Sign Up. Signed in: account links +
   Log Out. The Agency Dashboard entry (with its preview badge/note)
   always appears, since the route itself is open to everyone right now.
===================================================================== */

function AccountMenuLink({
  href,
  icon: Icon,
  label,
  onSelect,
}: {
  href: string;
  icon: LucideIcon;
  label: string;
  onSelect: () => void;
}) {
  return (
    <Link
      href={href}
      role="menuitem"
      onClick={onSelect}
      className="flex items-center gap-3 px-5 py-2.5 transition-colors duration-200 hover:bg-foreground/[0.04]"
    >
      <Icon className="h-4 w-4 text-muted-foreground" />
      <span className="text-[13px] font-medium text-foreground">{label}</span>
    </Link>
  );
}

function AccountMenu({ user, onLogOut }: { user: CurrentUser | null; onLogOut: () => void }) {
  const { open, setOpen, rootRef, openWithIntent, closeWithIntent } = useDropdown();
  const close = React.useCallback(() => setOpen(false), [setOpen]);

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
        aria-controls="account-menu-panel"
        aria-label="Account menu"
        className="
          group flex items-center gap-2 rounded-full py-1 pl-1 pr-2.5
          transition-colors duration-300
          hover:bg-foreground/[0.06]
        "
      >
        {user ? (
          <Avatar name={user.name} avatarUrl={user.avatarUrl} />
        ) : (
          <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-border/70 text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
            <User className="h-4 w-4" />
          </span>
        )}
        <ChevronDown
          className={`h-3 w-3 text-muted-foreground transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <div
        id="account-menu-panel"
        role="menu"
        aria-hidden={!open}
        className={`
          absolute right-0 top-full mt-3 w-80 origin-top-right
          border border-border/70 bg-background/95
          shadow-xl backdrop-blur-xl
          transition-all duration-200 ease-out
          ${open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"}
        `}
      >
        {user ? (
          <>
            <div className="flex items-center gap-3 border-b border-border/70 px-5 py-4">
              <Avatar name={user.name} avatarUrl={user.avatarUrl} size={42} />
              <div className="min-w-0">
                <div className="truncate text-[13px] font-medium text-foreground">{user.name}</div>
                <div className="truncate text-[11px] text-muted-foreground">{user.email}</div>
              </div>
            </div>

            <div className="py-2">
              <AccountMenuLink href="/account" icon={User} label="Account" onSelect={close} />
              <AccountMenuLink href="/account/settings" icon={Settings} label="Settings" onSelect={close} />
              <AccountMenuLink href="/customer/saved" icon={Heart} label="Saved Properties" onSelect={close} />
              <AccountMenuLink href="/customer/inquiries" icon={MessageSquare} label="My Inquiries" onSelect={close} />
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-2 border-b border-border/70 px-5 py-4">
            <Link
              href="/login"
              role="menuitem"
              onClick={close}
              className="flex h-10 items-center justify-center border border-border text-[10px] font-medium uppercase tracking-[0.16em] text-foreground transition-colors duration-300 hover:bg-foreground/[0.04]"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              role="menuitem"
              onClick={close}
              className="flex h-10 items-center justify-center bg-foreground text-[10px] font-semibold uppercase tracking-[0.16em] text-background transition-opacity hover:opacity-90"
            >
              Sign Up
            </Link>
          </div>
        )}

        <div className="border-t border-border/70 py-2">
          <Link
            href={dashboardLink.href}
            role="menuitem"
            onClick={close}
            className="group/item flex items-start gap-3 px-5 py-3 transition-colors duration-200 hover:bg-foreground/[0.04]"
          >
            <LayoutDashboard className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-medium text-foreground">{dashboardLink.label}</span>
                {dashboardLink.badge && (
                  <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.12em] text-accent-strong">
                    {dashboardLink.badge}
                  </span>
                )}
              </div>
              {dashboardLink.note && (
                <p className="mt-0.5 text-[10.5px] leading-relaxed text-muted-foreground">
                  {dashboardLink.note}
                </p>
              )}
            </div>
          </Link>
        </div>

        {user && (
          <div className="border-t border-border/70 py-2">
            <button
              type="button"
              onClick={() => {
                close();
                onLogOut();
              }}
              className="flex w-full items-center gap-3 px-5 py-3 text-left transition-colors duration-200 hover:bg-foreground/[0.04]"
            >
              <LogOut className="h-4 w-4 text-muted-foreground" />
              <span className="text-[13px] font-medium text-foreground">Log Out</span>
            </button>
          </div>
        )}
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
  user,
  savedCount,
  compareCount,
  onLogOut,
}: {
  open: boolean;
  onClose: () => void;
  user: CurrentUser | null;
  savedCount: number;
  compareCount: number;
  onLogOut: () => void;
}) {
  const countFor = (href: string) =>
    href === "/customer/saved" ? savedCount : href === "/compare" ? compareCount : 0;

  return (
    <Dialog open={open} onClose={onClose}>
      <div className="overflow-hidden">
        {user ? (
          <div className="flex items-center gap-3 border-b border-border px-5 py-4">
            <Avatar name={user.name} avatarUrl={user.avatarUrl} size={42} />
            <div className="min-w-0">
              <div className="truncate text-[13px] font-medium text-foreground">{user.name}</div>
              <div className="truncate text-[11px] text-muted-foreground">{user.email}</div>
            </div>
            <button
              type="button"
              onClick={() => {
                onClose();
                onLogOut();
              }}
              className="ml-auto flex items-center gap-1.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              <LogOut className="h-3.5 w-3.5" />
              Log Out
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 border-b border-border px-5 py-4">
            <Link
              href="/login"
              onClick={onClose}
              className="flex-1 border border-border py-2.5 text-center text-[10px] font-medium uppercase tracking-[0.16em] text-foreground transition-colors duration-300 hover:bg-surface-muted"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              onClick={onClose}
              className="flex-1 bg-foreground py-2.5 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-background transition-opacity hover:opacity-90"
            >
              Sign Up
            </Link>
          </div>
        )}

        <nav className="p-3">
          {menuLinks.map((link, index) => {
            const count = countFor(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="
                  group flex items-center justify-between gap-3
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
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">{link.label}</span>
                      {link.badge && (
                        <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.12em] text-accent-strong">
                          {link.badge}
                        </span>
                      )}
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
                    {link.note && (
                      <p className="mt-1 max-w-[220px] text-[10.5px] leading-relaxed text-muted-foreground">
                        {link.note}
                      </p>
                    )}
                  </div>
                </div>

                <ArrowUpRight
                  className="
                    h-4 w-4 shrink-0 text-muted-foreground opacity-0
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
  const user = useCurrentUser();

  const closeMenu = React.useCallback(() => setMenuOpen(false), []);
  const openMenu = React.useCallback(() => setMenuOpen(true), []);

  const handleLogOut = React.useCallback(() => {
    // Wire this up to your real sign-out action/thunk.
  }, []);

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
              lg:inline-flex
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

          <div className="mx-1 hidden h-7 w-px bg-border/70 sm:block" />

          <div className="hidden sm:block">
            <AccountMenu user={user} onLogOut={handleLogOut} />
          </div>

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
        user={user}
        savedCount={savedCount}
        compareCount={compareCount}
        onLogOut={handleLogOut}
      />
    </header>
  );
}