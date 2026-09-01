import Link from "next/link";
import { SearchX } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";

export default function PropertyNotFound() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto container px-6 py-20">
        <EmptyState
          icon={SearchX}
          title="This listing is no longer available"
          description="It may have been sold, rented, or removed by the agent. Browse similar properties instead."
          action={
            <Button asChild>
              <Link href="/properties">Browse Properties</Link>
            </Button>
          }
        />
      </main>
      <SiteFooter />
    </>
  );
}
