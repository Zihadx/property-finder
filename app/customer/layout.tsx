import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CustomerTabs } from "./customer-tabs";

/**
 * Server component so SiteFooter (now async — it fetches areaService data
 * for the Locations column) can render directly. Only the pathname-aware
 * tab highlighting actually needs the client, so that's split out into
 * CustomerTabs rather than making this whole layout a client component.
 */
export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto container px-6 py-10">
        <p className="ledger-label mb-2">Your Account</p>
        <h1 className="font-display text-3xl text-foreground">My ListEasy</h1>
        <CustomerTabs />
        <div className="mt-8">{children}</div>
      </main>
      <SiteFooter />
    </>
  );
}
