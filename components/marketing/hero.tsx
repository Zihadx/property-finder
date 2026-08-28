import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HeroSearch } from "./hero-search";

export function Hero() {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-24">
        <div className="flex flex-col justify-center">
          <p className="ledger-label mb-5">Property catalog · Dhaka, Bangladesh</p>
          <h1 className="font-display text-4xl leading-[1.1] text-foreground md:text-6xl">
            Your properties,
            <br />
            organized.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
            One professional link instead of twenty WhatsApp messages. ListEasy BD centralizes
            your listings, leads, and site visits into a single catalog your customers actually
            trust.
          </p>

          <HeroSearch />

          <div className="mt-6 flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link href="/properties">Browse Properties</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/dashboard">See the Dashboard</Link>
            </Button>
          </div>

          <dl className="mt-14 grid grid-cols-3 gap-6 border-t border-border pt-6">
            <div>
              <dt className="ledger-label">Listings</dt>
              <dd className="ledger-value mt-1 text-2xl text-foreground">246</dd>
            </div>
            <div>
              <dt className="ledger-label">Areas Covered</dt>
              <dd className="ledger-value mt-1 text-2xl text-foreground">14</dd>
            </div>
            <div>
              <dt className="ledger-label">Active Agents</dt>
              <dd className="ledger-value mt-1 text-2xl text-foreground">4</dd>
            </div>
          </dl>
        </div>

        <div className="relative hidden overflow-hidden rounded-[var(--radius-md)] border border-border md:block">
          <Image
            src="https://picsum.photos/seed/listeasy-hero/900/1100"
            alt="A premium apartment interior in Dhaka"
            fill
            sizes="45vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-x-4 bottom-4 rounded-[var(--radius-sm)] border border-border bg-surface/95 p-4 backdrop-blur-sm">
            <p className="ledger-label">Featured today</p>
            <p className="font-display text-lg text-foreground">Riverview Residency, Gulshan 2</p>
            <p className="ledger-value mt-1 text-xl text-accent">৳ 2.80 Crore</p>
          </div>
        </div>
      </div>
    </section>
  );
}
