
"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Heart, Scale } from "lucide-react";

import { useAppSelector } from "@/redux/hooks";
import {
  CompactPropertyCard,
  PropertyFavoriteButton,
  PropertyCompareButton,
} from "@/components/property";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./section-heading";
import type { Property } from "@/types/property";

const reveal = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export function ShortlistPreviewClient({
  suggestions,
}: {
  suggestions: Property[];
}) {
  const savedCount = useAppSelector(
    (state) => state.favorites.propertyIds.length,
  );

  const compareIds = useAppSelector(
    (state) => state.compare.propertyIds,
  );

  const comparingCount = compareIds.length;

  return (
    <section className="relative bg-background">
      <div className="mx-auto container px-6 py-16 md:py-20">
        {/* Section introduction */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={reveal}
        >
          <div className="flex items-end justify-between gap-8">
            <div className="max-w-2xl">
              <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                Your selection
              </p>

              <h2 className="font-display text-3xl leading-[0.95] tracking-[-0.045em] text-foreground sm:text-4xl md:text-5xl">
                Properties worth
                <br />
                <span className="text-muted-foreground">
                  keeping close.
                </span>
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-6 text-muted-foreground">
                Save properties as you explore. When the shortlist takes
                shape, compare your strongest choices before arranging a
                viewing.
              </p>
            </div>

            <Link
              href="/customer/saved"
              className="group hidden items-center gap-2 pb-1 text-xs font-medium uppercase tracking-[0.14em] text-foreground sm:flex"
            >
              View shortlist
              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </motion.div>

        {/* Main composition */}
        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_240px]">
          {/* Property rail */}
          <div>
            <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Recommended for you
              </p>

              <span className="font-mono text-[10px] tabular-nums text-muted-foreground">
                {String(suggestions.length).padStart(2, "0")} listings
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {suggestions.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  variants={reveal}
                  transition={{
                    delay: index * 0.07,
                  }}
                  className="group relative"
                >
                  <div className="overflow-hidden border border-border bg-card transition-all duration-500 group-hover:border-foreground/20 group-hover:shadow-lg">
                    <CompactPropertyCard property={property} />
                  </div>

                  <div className="absolute right-3 top-3 flex gap-1.5">
                    <PropertyFavoriteButton
                      propertyId={property.id}
                      size="sm"
                    />

                    <PropertyCompareButton
                      propertyId={property.id}
                      size="sm"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Selection index */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={reveal}
            className="relative flex flex-col border-l border-border pl-6 lg:min-h-full"
          >
            {/* Saved */}
            <div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Heart className="size-3.5" />

                <span className="text-[10px] font-medium uppercase tracking-[0.18em]">
                  Saved
                </span>
              </div>

              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-mono text-5xl font-medium tracking-[-0.06em] text-foreground">
                  {String(savedCount).padStart(2, "0")}
                </span>

                <span className="text-xs text-muted-foreground">
                  {savedCount === 1 ? "property" : "properties"}
                </span>
              </div>
            </div>

            <div className="my-7 h-px bg-border" />

            {/* Compare */}
            <div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Scale className="size-3.5" />

                <span className="text-[10px] font-medium uppercase tracking-[0.18em]">
                  Compare
                </span>
              </div>

              <div className="mt-3 flex items-baseline gap-1">
                <span className="font-mono text-4xl font-medium tracking-[-0.05em] text-foreground">
                  {comparingCount}
                </span>

                <span className="font-mono text-sm text-muted-foreground">
                  / 3
                </span>
              </div>

              <p className="mt-2 max-w-[180px] text-xs leading-5 text-muted-foreground">
                {comparingCount > 0
                  ? "Your comparison is ready."
                  : "Select up to three properties."}
              </p>
            </div>

            {/* Bottom action */}
            <div className="mt-auto pt-10">
              {comparingCount > 0 ? (
                <Button
                  asChild
                  size="sm"
                  className="group h-10 w-full justify-between rounded-none px-3"
                >
                  <Link href="/compare">
                    <span className="flex items-center gap-2">
                      <Scale className="size-3.5" />
                      Compare selection
                    </span>

                    <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </Button>
              ) : (
                <Button
                  disabled
                  size="sm"
                  className="h-10 w-full justify-start rounded-none px-3"
                >
                  <Scale className="mr-2 size-3.5" />
                  Compare selection
                </Button>
              )}

              <Link
                href="/customer/saved"
                className="group mt-3 flex items-center justify-between border-b border-border py-3 text-xs text-muted-foreground transition-colors hover:text-foreground sm:hidden"
              >
                View all saved properties
                <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
