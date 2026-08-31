
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

import { propertyService } from "@/services/property.service";
import { agentService } from "@/services/agent.service";
import {
  PropertyCard,
  FeaturedPropertyCard,
} from "@/components/property";
import { SectionHeading } from "./section-heading";
import { Button } from "@/components/ui/button";

/**
 * Featured Properties
 *
 * Premium editorial composition:
 * - One signature property receives the hero treatment.
 * - Supporting properties form a curated collection underneath.
 * - Existing services and property components remain unchanged.
 */
export async function FeaturedProperties() {
  const featured = await propertyService.getFeatured(5);

  const [signature, ...supporting] = featured;

  if (!signature) return null;

  const agent = await agentService.getById(signature.agentId);

  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-28 lg:py-32">
      {/* =========================================================
          AMBIENT BACKGROUND DETAIL
      ========================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute right-0 top-0
          h-[420px] w-[420px]
          translate-x-1/3
          -translate-y-1/3
          rounded-full
          bg-accent/5
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute left-0 top-[45%]
          h-px w-full
          bg-gradient-to-r
          from-transparent
          via-border/60
          to-transparent
        "
      />

      <div className="relative mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-12">
        {/* =======================================================
            SECTION INTRO
        ======================================================== */}

        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            {/* Editorial eyebrow */}
            <div className="mb-5 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-10 bg-accent-strong"
              />

              <span
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.3em]
                  text-accent-strong
                "
              >
                Curated collection
              </span>
            </div>

            {/* Heading */}
            <h2
              className="
                font-display
                text-[clamp(2.7rem,5vw,5rem)]
                font-normal
                leading-[0.9]
                tracking-[-0.065em]
                text-foreground
              "
            >
              Properties worth
              <br />
              <span className="text-muted-foreground/45">
                looking twice.
              </span>
            </h2>

            <p
              className="
                mt-6
                max-w-xl
                text-sm
                leading-7
                text-muted-foreground
                md:text-[15px]
              "
            >
              A considered selection of distinctive residences,
              investment opportunities, and developments currently
              receiving our closest attention.
            </p>
          </div>

          {/* Collection meta */}
          <div className="flex items-end justify-between gap-8 lg:pb-1">
            <div className="hidden sm:block">
              <p className="text-[8px] uppercase tracking-[0.28em] text-muted-foreground/50">
                Collection
              </p>

              <p className="mt-2 font-display text-xl tracking-[-0.03em]">
                01 / 05
              </p>
            </div>

            <Button
              variant="link"
              asChild
              className="
                group
                h-auto
                p-0
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-foreground
                no-underline
                hover:no-underline
              "
            >
              <Link href="/properties?featured=true">
                View all featured

                <span
                  className="
                    ml-3
                    flex h-7 w-7
                    items-center justify-center
                    border border-border
                    transition-all duration-500
                    group-hover:border-foreground
                    group-hover:bg-foreground
                    group-hover:text-background
                  "
                >
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </Button>
          </div>
        </div>

        {/* =======================================================
            SIGNATURE PROPERTY
        ======================================================== */}

        <div className="relative mt-14 md:mt-16 lg:mt-20">
          {/* Signature label */}
          <div
            className="
              absolute
              left-10
              -top-4
              z-10
              hidden
              items-center
              gap-2
              border
              border-white/20
              bg-black/20
              px-3
              py-2
              backdrop-blur-md
              sm:flex
            "
          >
            <Sparkles className="h-3 w-3 text-white/70" />

            <span className="text-[8px] font-medium uppercase tracking-[0.24em] text-white/75">
              Signature listing
            </span>
          </div>

          {/* Main feature */}
          <div className="relative overflow-hidden">
            <FeaturedPropertyCard
              property={signature}
              agent={agent}
            />
          </div>
        </div>

        {/* =======================================================
            SUPPORTING COLLECTION
        ======================================================== */}

        {supporting.length > 0 && (
          <div className="mt-16 md:mt-20">
            {/* Collection divider */}
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-[9px] font-semibold uppercase tracking-[0.28em] text-muted-foreground/50">
                  More from the collection
                </span>

                <span className="h-px w-16 bg-border" />
              </div>

              <span className="text-[9px] tabular-nums tracking-[0.15em] text-muted-foreground/40">
                {String(supporting.length).padStart(2, "0")} LISTINGS
              </span>
            </div>

            {/* Supporting cards */}
            <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {supporting.map((property, index) => (
                <div
                  key={property.id}
                  className="group relative"
                >
                  {/* Editorial index */}
                  <div
                    className="
                      mb-3
                      flex
                      items-center
                      justify-between
                    "
                  >
                    <span className="text-[8px] font-medium tracking-[0.2em] text-muted-foreground/40">
                      0{index + 2}
                    </span>

                    <span className="h-px flex-1 bg-border/60 ml-3" />
                  </div>

                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =======================================================
            BOTTOM STATEMENT
        ======================================================== */}

        <div className="mt-20 border-t border-border pt-8 md:mt-28">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-lg text-[11px] leading-5 text-muted-foreground">
              We dont believe in listing everything.
              We believe in presenting the right properties,
              with the right context, at the right time.
            </p>

            <Link
              href="/properties"
              className="
                group
                inline-flex
                items-center
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-foreground
              "
            >
              Explore the full catalog

              <ArrowUpRight
                className="
                  ml-3
                  h-3.5 w-3.5
                  transition-transform duration-500
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

