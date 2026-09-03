import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";

import { PropertyFacts } from "./property-facts";
import { PropertyPrice } from "./property-price";
import { PropertyStatusBadges } from "./property-status-badges";

import type { Agent } from "@/types/agent";
import type { Property } from "@/types/property";

/**
 * Large single-property showcase with a cinematic video treatment
 * for one signature listing.
 */

// Full-bleed (inset-0) atmosphere layers over the video, in paint order.
// NOTE: the bottom-readability gradient is NOT inset-0 (it's bottom-anchored,
// h-[65%]) so it's kept as its own element below, not in this array.
const VIDEO_OVERLAYS = [
  "bg-linear-to-b from-black/35 via-black/5 to-black/75", // cinematic grade
  "bg-radial-[at_50%_50%] from-transparent from-38% to-black/30", // vignette
  "bg-amber-200/4 mix-blend-overlay", // warm film tone
  "bg-black/0 transition-colors duration-700 group-hover:bg-black/4", // hover atmosphere
] as const;

export function FeaturedPropertyCard({
  property,
  agent,
}: {
  property: Property;
  agent?: Agent;
}) {
  return (
    <article className="group relative overflow-hidden rounded-lg border border-border bg-surface">
      {/* Property */}
      <Link href={`/properties/${property.slug}`} className="block">
        <div
          className="
            relative aspect-4/5 w-full overflow-hidden
            bg-surface-muted
            sm:aspect-video
            lg:aspect-21/9
          "
        >
          {/* Background Video */}
         <video
  autoPlay
  muted
  loop
  playsInline
  preload="metadata"
  poster="/images/property-showcase.png"
  aria-hidden="true"
  className="
    absolute inset-0 size-full
    scale-[1.015]
    object-cover

    brightness-85
    contrast-105
    saturate-90

    transition-transform
    duration-1400ms
    ease-[cubic-bezier(0.22,1,0.36,1)]

    will-change-transform

    group-hover:scale-[1.055]
    group-hover:duration-1800ms
  "
>
  <source
    src="/videos/property-showcase.mp4"
    type="video/mp4"
  />
</video>

          {/* Bottom readability gradient (bottom-anchored, not full-bleed) */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[65%]
              bg-linear-to-t from-black/80 via-black/30 to-transparent
            "
          />

          {/* Full-bleed color/atmosphere overlays */}
          {VIDEO_OVERLAYS.map((overlayClass, i) => (
            <div
              key={i}
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 z-0 ${overlayClass}`}
            />
          ))}

          {/* Status */}
          <div className="absolute left-5 top-5 z-10 sm:left-8 sm:top-8">
            <PropertyStatusBadges property={property} />
          </div>

          {/* Property Information */}
          <div
            className="
              absolute inset-x-5 bottom-5 z-10
              flex flex-wrap items-end justify-between gap-5
              sm:inset-x-8 sm:bottom-8
            "
          >
            {/* Property Details */}
            <div className="max-w-xl">
              <p className="ledger-label text-white/70">Signature Listing</p>

              <h3
                className="
                  mt-1
                  font-display text-2xl leading-tight
                  tracking-[-0.02em] text-white
                  sm:text-4xl
                "
              >
                {property.title}
              </h3>

              <p className="mt-2 flex items-center gap-1.5 text-sm text-white/75">
                <MapPin className="size-4 shrink-0" />
                {property.location.area}
              </p>

              <PropertyFacts property={property} className="mt-4 text-white/90" />
            </div>

            {/* Price & CTA */}
            <div className="flex flex-col items-start gap-3 md:items-end">
              <PropertyPrice
                price={property.price}
                purpose={property.purpose}
                size="lg"
                className="text-white"
              />

              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-white">
                View Property
                <ArrowUpRight
                  className="
                    size-4
                    transition-transform duration-300 ease-out
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                  "
                />
              </span>
            </div>
          </div>
        </div>
      </Link>

      {/* Agent */}
      {agent && <AgentBadge agent={agent} />}
    </article>
  );
}

function AgentBadge({ agent }: { agent: Agent }) {
  return (
    <Link
      href={`/agents/${agent.slug}`}
      aria-label={`View ${agent.name}'s profile`}
      title="Agent Profile"
      className="
        group/agent absolute right-4 top-4 z-20
        inline-flex items-center
        rounded-full
        border border-white/15
        bg-white/5
        p-1
        shadow-lg
        backdrop-blur-xl
        backdrop-saturate-150
        transition-all duration-500 ease-out
        hover:border-white/25
        hover:bg-black/35
        hover:shadow-xl
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-white/60
        sm:right-6 sm:top-6
        sm:p-1 sm:pr-3
        lg:right-8 lg:top-8
      "
    >
      {/* Soft glass highlight */}
      <span
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          rounded-full
          bg-linear-to-b
          from-white/10
          via-white/2
          to-transparent
          opacity-70
        "
      />

      {/* Avatar */}
      <span
        className="
          relative z-10
          size-8 shrink-0
          overflow-hidden rounded-full
          ring-1 ring-white/25
          shadow-[0_2px_12px_rgba(0,0,0,0.25)]
          lg:size-9
        "
      >
        <Image
          src={agent.photo}
          alt=""
          fill
          sizes="36px"
          className="object-cover transition-transform duration-500 group-hover/agent:scale-105"
        />
      </span>

      {/* Mobile hover name — grid-template-columns reveal (smooth, no width "jump") */}
      <span
        className="
          relative z-10 grid
          grid-cols-[0fr]
          transition-[grid-template-columns] duration-500 ease-out
          group-hover/agent:grid-cols-[1fr]
          group-focus-visible/agent:grid-cols-[1fr]
          sm:hidden
        "
      >
        <span
          className="
            overflow-hidden
            whitespace-nowrap
            text-[11px] font-medium leading-none tracking-[-0.01em] text-white/95
            opacity-0
            transition-[opacity,padding] duration-500 ease-out
            group-hover/agent:pl-2.5 group-hover/agent:pr-2 group-hover/agent:opacity-100
            group-focus-visible/agent:pl-2.5 group-focus-visible/agent:pr-2 group-focus-visible/agent:opacity-100
          "
        >
          {agent.name}
        </span>
      </span>

      {/* Desktop / tablet agent information */}
      <span className="relative z-10 hidden min-w-0 flex-col pl-2.5 pr-0.5 sm:flex">
        <span className="max-w-28 truncate text-[11px] font-medium leading-tight tracking-[-0.01em] text-white/95">
          {agent.name}
        </span>

        <span className="mt-0.5 text-[9px] uppercase tracking-[0.14em] text-white/50">
          Agent
        </span>
      </span>
    </Link>
  );
}