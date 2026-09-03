// components/marketing/listing-final-cta.tsx
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ListingFinalCta() {
  return (
    <section className="border-t border-border bg-surface-muted">
      <div className="mx-auto container flex flex-col items-center gap-6 px-6 py-16 text-center sm:py-20">
        <h2 className="max-w-md font-display text-2xl tracking-tight text-foreground sm:text-3xl">
          Ready to reach serious buyers?
        </h2>
        <Button asChild size="lg" variant="accent">
          <Link href="/dashboard/properties/new">
            List Your Property
            <ArrowUpRight className="ml-2 size-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}