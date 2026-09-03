"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import { motion } from "framer-motion";

import { PropertyPrice } from "./property-price";
import { PropertyStatusBadges } from "./property-status-badges";
import { formatDate } from "@/lib/utils";
import type { Property } from "@/types/property";

interface EditorialPropertyCardProps {
  property: Property;
  showListedDate?: boolean;
  index?: number;
}

export function EditorialPropertyCard({
  property,
  showListedDate = false,
  index = 0,
}: EditorialPropertyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.55,
        delay: Math.min(index * 0.06, 0.35),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="shrink-0 py-10"
    >
      <Link
        href={`/properties/${property.slug}`}
        draggable={false}
        onDragStart={(event) => event.preventDefault()}
        className="
    group relative block
    aspect-3/4
    w-60
    shrink-0
    overflow-hidden
    rounded-2xl
    bg-muted
    ring-1 ring-black/5
    transition-all duration-500
    hover:-translate-y-1
    hover:shadow-xl
    hover:shadow-black/10
    sm:w-64
    lg:w-68
   
  "
      >
        {/* Image */}
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          sizes="(min-width: 1024px) 272px, 256px"
          className="
            object-cover
            transition-transform
            duration-1000
            ease-[cubic-bezier(0.22,1,0.36,1)]
            group-hover:scale-[1.055]
          "
        />

        {/* Image treatment */}
        <div
          aria-hidden="true"
          className="
            absolute inset-0
            bg-linear-to-b
            from-black/10
            via-black/0
            to-black/85
            transition-opacity
            duration-500
            group-hover:opacity-95
          "
        />

        {/* Soft highlight */}
        <div
          aria-hidden="true"
          className="
            absolute inset-x-0 top-0 h-32
            bg-linear-to-b from-white/10 to-transparent
            opacity-70
          "
        />

        {/* Status */}
        <div className="absolute left-3.5 top-3.5">
          <div
            className="
              rounded-full
              border border-white/20
              bg-black/20
              px-2.5 py-1
              shadow-sm
              backdrop-blur-md
            "
          >
            <PropertyStatusBadges property={property} />
          </div>
        </div>

        {/* Arrow */}
        <div
          className="
            absolute right-3.5 top-3.5
            flex size-9
            translate-y-1
            items-center justify-center
            rounded-full
            border border-white/20
            bg-white/10
            text-white
            opacity-0
            backdrop-blur-md
            transition-all duration-400
            group-hover:translate-y-0
            group-hover:opacity-100
          "
        >
          <ArrowUpRight className="size-4" />
        </div>

        {/* Content */}
        <div className="absolute inset-x-4 bottom-4 text-white">
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-white/70">
            <MapPin className="size-3.25 shrink-0" />
            <span className="truncate">{property.location.area}</span>
          </div>

          <h3
            className="
              mt-1.5
              line-clamp-2
              font-display
              text-lg
              leading-[1.05]
              tracking-[-0.02em]
              text-white
            "
          >
            {property.title}
          </h3>

          <div className="mt-2">
            <PropertyPrice
              price={property.price}
              purpose={property.purpose}
              size="sm"
              className="text-white"
            />
          </div>

          {showListedDate && (
            <div className="mt-2 flex items-center justify-between border-t border-white/15 pt-2.5">
              <p className="text-[10px] uppercase tracking-[0.14em] text-white/55">
                Listed {formatDate(property.listedAt)}
              </p>

              <span className="text-[10px] uppercase tracking-[0.14em] text-white/45 transition-colors duration-300 group-hover:text-white/80">
                View
              </span>
            </div>
          )}
        </div>

        {/* Bottom glass edge */}
        <div
          aria-hidden="true"
          className="
            absolute inset-x-0 bottom-0 h-px
            bg-linear-to-r
            from-transparent
            via-white/30
            to-transparent
            opacity-50
          "
        />
      </Link>
    </motion.div>
  );
}
