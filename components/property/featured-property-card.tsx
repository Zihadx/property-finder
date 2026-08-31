import Link from "next/link";
import Image from "next/image";
import { MapPin, ArrowUpRight } from "lucide-react";
import { PropertyPrice } from "./property-price";
import { PropertyFacts } from "./property-facts";
import { PropertyStatusBadges } from "./property-status-badges";
import type { Property } from "@/types/property";
import type { Agent } from "@/types/agent";

/**
 * Large single-property showcase — the "magazine cover" treatment for one
 * signature listing (homepage featured slot, top-of-area highlight). This
 * is a one-at-a-time hero unit, not a grid tile: pair it with a handful of
 * smaller supporting cards rather than repeating it.
 */
export function FeaturedPropertyCard({
  property,
  agent,
}: {
  property: Property;
  agent?: Agent;
}) {
  return (
    <article className="group relative overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface">
      <Link href={`/properties/${property.slug}`} className="block">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface-muted sm:aspect-[16/9] lg:aspect-[21/9]">
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            sizes="(min-width: 1024px) 90vw, 100vw"
            priority
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[rgba(28,27,25,0.88)] via-[rgba(28,27,25,0.2)] to-transparent" />

          <div className="absolute left-5 top-5 sm:left-8 sm:top-8">
            <PropertyStatusBadges property={property} />
          </div>

          <div className="absolute inset-x-5 bottom-5 flex flex-wrap items-end justify-between gap-4 sm:inset-x-8 sm:bottom-8">
            <div className="max-w-xl">
              <p className="ledger-label text-primary-foreground/70">
                Signature Listing
              </p>
              <h3 className="mt-1 font-display text-2xl leading-tight text-primary-foreground sm:text-4xl">
                {property.title}
              </h3>
              <p className="mt-2 flex items-center gap-1.5 text-sm text-primary-foreground/80">
                <MapPin className="h-4 w-4" />
                {property.location.area}
              </p>
              <PropertyFacts
                property={property}
                className="mt-4 text-primary-foreground/90"
              />
            </div>

            <div className="flex flex-col items-end gap-3">
              <PropertyPrice
                price={property.price}
                purpose={property.purpose}
                size="lg"
                className="text-primary-foreground"
              />
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-foreground">
                View Property
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </div>
        </div>
      </Link>

      {agent && (
        <Link
          href={`/agents/${agent.slug}`}
          className="absolute right-5 top-5 flex items-center gap-2 rounded-full bg-surface/90 py-1.5 pl-1.5 pr-3 backdrop-blur-sm transition-colors hover:bg-surface sm:right-8 sm:top-8"
        >
          <span className="relative block h-7 w-7 overflow-hidden rounded-full">
            <Image
              src={agent.photo}
              alt={agent.name}
              fill
              sizes="28px"
              className="object-cover"
            />
          </span>
          <span className="text-xs font-medium text-foreground">
            {agent.name}
          </span>
        </Link>
      )}
    </article>
  );
}
