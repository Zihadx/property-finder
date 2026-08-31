import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <p className="ledger-label mb-2">Legal</p>
        <h1 className="font-display text-3xl text-foreground">Terms of Service</h1>
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
          This page is a placeholder. ListEasy BD is a demo real-estate catalog — the listings, agents,
          and pricing shown throughout this site are illustrative mock data, not real properties for
          sale or rent. A production deployment would replace this page with real terms covering listing
          accuracy, agent conduct, and platform use.
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
