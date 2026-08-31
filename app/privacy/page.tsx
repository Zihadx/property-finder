import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <p className="ledger-label mb-2">Legal</p>
        <h1 className="font-display text-3xl text-foreground">Privacy Policy</h1>
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
          This page is a placeholder. ListEasy BD is a demo real-estate catalog running on mock data — no
          personal information submitted through this site (inquiries, saved properties, site-visit
          requests) is stored beyond your browser session. A production deployment would replace this
          page with a real privacy policy covering what data is collected, how it&apos;s used, and how to
          request its removal.
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
