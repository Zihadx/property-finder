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
  hidden: { opacity: 0, y: 45, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};
const imageVariants: Variants = {
  hidden: { scale: 1.08, opacity: 0.7 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
  },
};
const contentContainer: Variants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.15, staggerChildren: 0.07 } },
};
const contentItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};
export function PropertyCard({ property }: { property: Property }) {
  const [quickViewOpen, setQuickViewOpen] = React.useState(false);

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.18,
        margin: "0px 0px -60px 0px",
      }}
      whileHover={{
        y: -6,
        transition: {
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        },
      }}
      className="
      
        group relative flex h-full flex-col
        overflow-hidden
        border border-border/70
        bg-surface
        transition-[box-shadow,border-color]
        duration-700
        hover:border-border
        hover:shadow-[0_30px_80px_-35px_rgba(0,0,0,0.3)]
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
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="
              relative
              aspect-[4/3]
              overflow-hidden
              bg-surface-muted
            "
          >
            <motion.div variants={imageVariants} className="absolute inset-0">
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
                  duration-[1400ms]
                  ease-[cubic-bezier(0.22,1,0.36,1)]
                  group-hover:scale-[1.055]
                "
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0.45 }}
              whileInView={{ opacity: 0.8 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              aria-hidden="true"
              className="
                pointer-events-none
                absolute inset-0
                bg-gradient-to-t
                from-black/70
                via-black/10
                to-black/5
              "
            />

            {/* Top highlight */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute inset-0
                bg-gradient-to-br
                from-white/[0.1]
                via-transparent
                to-transparent
              "
            />

            {/* Status */}
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.25,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute left-4 top-4 z-10"
            >
              <PropertyStatusBadges property={property} />
            </motion.div>

            {/* Image counter */}
            {property.images.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.35,
                  duration: 0.5,
                }}
                className="
                  absolute bottom-4 right-4 z-10
                  border border-white/20
                  bg-black/20
                  px-2.5 py-1.5
                  text-[8px]
                  font-medium
                  uppercase
                  tracking-[0.2em]
                  text-white/80
                  backdrop-blur-xl
                "
              >
                01 / {String(property.images.length).padStart(2, "0")}
              </motion.div>
            )}

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.4,
                duration: 0.55,
              }}
              className="
                absolute bottom-4 left-4 z-10
                flex items-center gap-2
                text-[9px]
                font-medium
                uppercase
                tracking-[0.18em]
                text-white/85
              "
            >
              <MapPin className="h-3 w-3 text-white/70" />

              {property.location.area}
            </motion.div>

            {/* Quick View */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setQuickViewOpen(true);
              }}
              className="
                absolute
                inset-x-4
                bottom-4
                z-20
                flex
                h-10
                translate-y-3
                items-center
                justify-center
                gap-2
                border
                border-white/20
                bg-black/25
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-white
                opacity-0
                backdrop-blur-xl
                transition-all
                duration-500
                group-hover:translate-y-0
                group-hover:opacity-100
                hover:bg-black/40
              "
            >
              <Eye className="h-3.5 w-3.5" />
              Quick View
              <ArrowUpRight className="ml-1 h-3 w-3" />
            </button>
          </motion.div>
        </Link>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.3,
            duration: 0.55,
          }}
          className="
            absolute
            right-4
            top-4
            z-20
            flex
            flex-col
            gap-2
          "
        >
          <PropertyFavoriteButton propertyId={property.id} />

          <PropertyCompareButton propertyId={property.id} />
        </motion.div>
      </div>

      {/* =========================================================
          CONTENT
      ========================================================== */}

      <motion.div
        variants={contentContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.15,
          margin: "0px 0px -40px 0px",
        }}
        className="flex flex-1 flex-col p-5 md:p-6"
      >
        {/* Type */}
        <motion.div
          variants={contentItem}
          className="mb-3 flex items-center justify-between"
        >
          <span
            className="
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.24em]
              text-accent-strong
            "
          >
            {property.type}
          </span>

          <span
            className="
              text-[8px]
              uppercase
              tracking-[0.18em]
              text-muted-foreground/45
            "
          >
            {property.purpose}
          </span>
        </motion.div>

        {/* Title */}
        <motion.div variants={contentItem}>
          <Link href={`/properties/${property.slug}`} className="group/title">
            <h3
              className="
                max-w-[92%]
                font-display
                text-[21px]
                font-normal
                leading-[1.05]
                tracking-[-0.04em]
                text-foreground
                transition-colors
                duration-300
                group-hover/title:text-accent-strong
              "
            >
              {property.title}
            </h3>
          </Link>
        </motion.div>

        {/* Address */}
        <motion.p
          variants={contentItem}
          className="
            mt-2
            line-clamp-1
            text-[11px]
            leading-5
            text-muted-foreground
          "
        >
          {property.location.address}
        </motion.p>

        {/* Divider */}
        <motion.div variants={contentItem} className="my-5 h-px bg-border/70" />

        {/* Price */}
        <motion.div variants={contentItem}>
          <PropertyPrice price={property.price} purpose={property.purpose} />
        </motion.div>

        {/* Facts */}
        <motion.div variants={contentItem}>
          <PropertyFacts
            property={property}
            className="
              mt-5
              border-t
              border-border/60
              pt-4
            "
          />
        </motion.div>

        {/* Bottom CTA */}
        <motion.div variants={contentItem}>
          <Link
            href={`/properties/${property.slug}`}
            className="
              group/details
              mt-6
              flex
              items-center
              justify-between
              border-t
              border-border/60
              pt-4
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.2em]
              text-muted-foreground
              transition-colors
              duration-300
              hover:text-foreground
            "
          >
            <span>View property</span>

            <span
              className="
                flex
                h-7
                w-7
                items-center
                justify-center
                border
                border-border
                transition-all
                duration-500
                group-hover/details:border-foreground
                group-hover/details:bg-foreground
                group-hover/details:text-background
              "
            >
              <ArrowUpRight
                className="
                  h-3.5
                  w-3.5
                  transition-transform
                  duration-500
                  group-hover/details:translate-x-0.5
                  group-hover/details:-translate-y-0.5
                "
              />
            </span>
          </Link>
        </motion.div>
      </motion.div>

      <PropertyQuickView
        property={property}
        open={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
      />
    </motion.article>
  );
}
