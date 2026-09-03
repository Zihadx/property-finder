"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Eye, MapPin } from "lucide-react";
import { motion, type Variants } from "framer-motion";

import { PropertyPrice } from "./property-price";
import { PropertyFacts } from "./property-facts";
import { PropertyStatusBadges } from "./property-status-badges";
import { PropertyFavoriteButton } from "./property-favorite-button";
import { PropertyCompareButton } from "./property-compare-button";
import { PropertyQuickView } from "./property-quick-view";

import type { Property } from "@/types/property";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function PropertyCard({ property }: { property: Property }) {
  const [quickViewOpen, setQuickViewOpen] = React.useState(false);

  /**
   * The property's own reference, e.g. "prp-024" → "024".
   * Shown in place of a generic index so every card carries its
   * real identity rather than its position in the grid.
   */
  const lotNumber = property.id
    .replace(/[^0-9]/g, "")
    .padStart(3, "0")
    .slice(-3);

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -60px 0px" }}
      className="
        group relative flex h-full flex-col
        overflow-hidden
        border border-border/70
        bg-surface
        transition-[border-color,box-shadow]
        duration-500
        hover:border-border
        hover:shadow-xl
      "
    >
      {/* =========================================================
          IMAGE
      ========================================================== */}

      <div className="relative overflow-hidden">
        <Link
          href={`/properties/${property.slug}`}
          className="block"
          aria-label={`View ${property.title}`}
        >
          <div className="relative aspect-4/3 overflow-hidden bg-surface-muted">
            <Image
              src={property.images[0]}
              alt={property.title}
              fill
              sizes="
                (min-width: 1280px) 25vw,
                (min-width: 1024px) 33vw,
                (min-width: 640px) 50vw,
                100vw
              "
              className="
                object-cover
                transition-transform
                duration-1000
                ease-[cubic-bezier(0.22,1,0.36,1)]
                group-hover:scale-[1.05]
              "
            />

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute inset-0
                bg-linear-to-t
                from-black/65
                via-black/5
                to-transparent
              "
            />

            {/* Status */}
            <div className="absolute left-4 top-4 z-10">
              <PropertyStatusBadges property={property} />
            </div>

            {/* Lot stamp — the property's real reference, not a grid index */}
            <div
              className="
                absolute bottom-4 right-4 z-10
                flex flex-col items-end
                border border-white/25
                bg-black/25
                px-2.5 py-1.5
                text-right
                backdrop-blur-md
              "
            >
              <span className="font-display text-[11px] italic leading-none text-white">
                Lot {lotNumber}
              </span>
              {property.images.length > 1 && (
                <span className="mt-0.5 text-[9px] leading-none text-white/60">
                  {property.images.length} photos
                </span>
              )}
            </div>

            {/* Location */}
            <div
              className="
                absolute bottom-4 left-4 z-10
                flex items-center gap-1.5
                text-[11px] text-white/90
              "
            >
              <MapPin className="h-3 w-3 text-white/70" />
              {property.location.area}
            </div>

            {/* Quick View */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setQuickViewOpen(true);
              }}
              className="
                absolute inset-x-4 bottom-16 z-20
                flex h-10
                translate-y-2
                items-center justify-center gap-2
                border border-white/20
                bg-black/30
                text-[11px] font-medium
                text-white
                opacity-0
                backdrop-blur-md
                transition-all duration-400
                group-hover:translate-y-0
                group-hover:opacity-100
                hover:bg-black/45
              "
            >
              <Eye className="h-3.5 w-3.5" />
              Quick view
            </button>
          </div>
        </Link>

        {/* Actions */}
        <div className="absolute right-4 top-4 z-20 flex flex-col gap-2">
          <PropertyFavoriteButton propertyId={property.id} />
          <PropertyCompareButton propertyId={property.id} />
        </div>
      </div>

      {/* =========================================================
          CONTENT
      ========================================================== */}

      <div className="flex flex-1 flex-col p-5 md:p-6">
        {/* Type · purpose */}
        <div className="mb-2.5 flex items-center justify-between">
          <span className="text-[11px] font-medium text-accent-strong">
            {property.type}
          </span>
          <span className="text-[11px] text-muted-foreground/60">
            {property.purpose}
          </span>
        </div>

        {/* Title */}
        <Link href={`/properties/${property.slug}`} className="group/title">
          <h3
            className="
              max-w-[92%]
              font-display
              text-[21px]
              font-normal
              leading-[1.05]
              tracking-[-0.03em]
              text-foreground
              transition-colors
              duration-300
              group-hover/title:text-accent-strong
            "
          >
            {property.title}
          </h3>
        </Link>

        {/* Address */}
        <p className="mt-2 line-clamp-1 text-[12px] leading-5 text-muted-foreground">
          {property.location.address}
        </p>

        <div className="my-5 h-px bg-border/70" />

        <PropertyPrice price={property.price} purpose={property.purpose} />

        <PropertyFacts
          property={property}
          className="mt-5 border-t border-border/60 pt-4"
        />

        {/* Bottom CTA */}
        <Link
          href={`/properties/${property.slug}`}
          className="
            group/details
            mt-6
            flex items-center justify-between
            border-t border-border/60
            pt-4
            text-[12px] font-medium
            text-muted-foreground
            transition-colors duration-300
            hover:text-foreground
          "
        >
          <span>View property</span>

          <span
            className="
              flex h-7 w-7
              items-center justify-center
              border border-border
              transition-all duration-400
              group-hover/details:border-foreground
              group-hover/details:bg-foreground
              group-hover/details:text-background
            "
          >
            <ArrowUpRight
              className="
                h-3.5 w-3.5
                transition-transform duration-400
                group-hover/details:translate-x-0.5
                group-hover/details:-translate-y-0.5
              "
            />
          </span>
        </Link>
      </div>

      <PropertyQuickView
        property={property}
        open={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
      />
    </motion.article>
  );
}