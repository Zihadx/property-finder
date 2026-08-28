"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/customer/saved", label: "Saved Properties" },
  { href: "/compare", label: "Compare" },
  { href: "/customer/profile", label: "Profile" },
];

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-6 py-10">
        <p className="ledger-label mb-2">Your Account</p>
        <h1 className="font-display text-3xl text-foreground">My ListEasy</h1>

        <div className="mt-8 flex gap-1 border-b border-border">
          {tabs.map((tab) => {
            const active = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "border-b-2 px-4 py-2.5 text-sm transition-colors",
                  active
                    ? "border-accent text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>

        <div className="mt-8">{children}</div>
      </main>
      <SiteFooter />
    </>
  );
}
