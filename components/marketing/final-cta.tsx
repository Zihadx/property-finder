import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

/**
 * Milestone 18: the closing statement, not a generic "ready to find your
 * dream home?" banner. Full-bleed image + centered type deliberately
 * echoes the Hero's premium photographic treatment — a visual bookend for
 * the page rather than a repeat of any section in between.
 */
export function FinalCta() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative aspect-[3/4] w-full sm:aspect-[16/9] lg:aspect-[21/9]">
        <Image
          src="https://picsum.photos/seed/listeasy-final-cta/1800/900"
          alt="A Dhaka skyline at dusk"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(28,27,25,0.9)] via-[rgba(28,27,25,0.55)] to-[rgba(28,27,25,0.25)]" />

        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <div className="max-w-2xl">
            <p className="ledger-label text-primary-foreground/70">Start today</p>
            <h2 className="mt-3 font-display text-3xl leading-tight text-primary-foreground sm:text-5xl">
              Your next property is probably closer than you think
            </h2>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" variant="accent">
                <Link href="/properties">Explore Properties</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Link href="/dashboard/properties/new">List a Property</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
