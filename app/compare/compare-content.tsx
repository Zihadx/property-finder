
"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Scale, X } from "lucide-react";

import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { PropertyPrice } from "@/components/property/property-price";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  removeFromCompare,
  clearCompare,
} from "@/redux/slices/compareSlice";
import { propertyService } from "@/services/property.service";
import { formatBDT } from "@/lib/utils";
import type { Property } from "@/types/property";

const rows: {
  label: string;
  render: (p: Property) => React.ReactNode;
}[] = [
  {
    label: "Price",
    render: (p) => (
      <PropertyPrice
        price={p.price}
        purpose={p.purpose}
        size="sm"
      />
    ),
  },
  {
    label: "Location",
    render: (p) => p.location.area,
  },
  {
    label: "Bedrooms",
    render: (p) => p.bedrooms || "—",
  },
  {
    label: "Bathrooms",
    render: (p) => p.bathrooms || "—",
  },
  {
    label: "Area",
    render: (p) =>
      `${p.areaSqft.toLocaleString("en-BD")} sqft`,
  },
  {
    label: "Price / sqft",
    render: (p) =>
      formatBDT(Math.round(p.price / p.areaSqft)),
  },
  {
    label: "Parking",
    render: (p) => p.parking || "—",
  },
  {
    label: "Status",
    render: (p) => p.status || "—",
  },
  {
    label: "Amenities",
    render: (p) =>
      p.amenities.slice(0, 4).join(", ") || "—",
  },
];

const reveal = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function CompareContent() {
  const dispatch = useAppDispatch();

  const compareIds = useAppSelector(
    (state) => state.compare.propertyIds
  );

  const [properties, setProperties] =
    React.useState<Property[] | null>(null);

  React.useEffect(() => {
    let cancelled = false;

    propertyService.getByIds(compareIds).then((result) => {
      if (!cancelled) {
        setProperties(result);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [compareIds]);

  const isEmpty =
    properties !== null && properties.length === 0;

  return (
    <main className="relative min-h-[70vh] overflow-hidden bg-[#f6f5f1] text-stone-950">
      {/* ───────────────── Atmospheric background ───────────────── */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 top-20 size-[34rem] rounded-full bg-cyan-700/[0.025] blur-[120px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/3 top-0 size-[24rem] rounded-full bg-white/70 blur-[110px]"
      />

      <div className="relative mx-auto max-w-[1500px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12 xl:px-16">
        {/* ───────────────── Header ───────────────── */}

        <div className="flex flex-col gap-8 border-b border-stone-300/80 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-8 bg-cyan-700"
              />

              <p className="text-[9px] font-medium uppercase tracking-[0.36em] text-stone-500">
                Property Intelligence
              </p>
            </div>

            <h1 className="mt-5 font-display text-[2.3rem] leading-[0.98] tracking-[-0.045em] text-stone-950 sm:text-4xl lg:text-5xl">
              Compare
              <br />
              <span className="text-stone-400">
                with clarity.
              </span>
            </h1>

            <p className="mt-5 max-w-md text-[11px] leading-[1.8] text-stone-500">
              A considered view of the properties you&lsquo;ve
              shortlisted — designed to make the right
              decision feel effortless.
            </p>
          </div>

          {properties && properties.length > 0 && (
            <div className="flex items-center justify-between gap-5 sm:justify-end">
              <div className="text-right">
                <p className="font-mono text-[10px] tracking-[0.18em] text-stone-400">
                  {String(properties.length).padStart(2, "0")} / 03
                </p>

                <p className="mt-1 text-[8px] uppercase tracking-[0.25em] text-stone-400">
                  Properties selected
                </p>
              </div>

              <button
                type="button"
                onClick={() => dispatch(clearCompare())}
                className="group flex items-center gap-2 border-b border-stone-300 pb-1.5 text-[9px] uppercase tracking-[0.2em] text-stone-500 transition-colors hover:border-cyan-700 hover:text-cyan-700"
              >
                Clear selection
                <X className="size-3 transition-transform duration-300 group-hover:rotate-90" />
              </button>
            </div>
          )}
        </div>

        {/* ───────────────── Content ───────────────── */}

        <div className="mt-10 sm:mt-12">
          {properties === null ? (
            <div className="h-72 animate-pulse rounded-sm bg-stone-200/40" />
          ) : isEmpty ? (
            <EmptyState
              icon={Scale}
              title="Nothing to compare yet"
              description="Select the scale icon on up to 3 property cards to compare them side by side."
              action={
                <Button asChild>
                  <Link href="/properties">
                    Browse Properties
                  </Link>
                </Button>
              }
            />
          ) : (
            <div className="relative">
              {/* Mobile scroll hint */}

              <div className="mb-4 flex items-center justify-between md:hidden">
                <span className="text-[8px] uppercase tracking-[0.25em] text-stone-400">
                  Swipe to explore
                </span>

                <ArrowUpRight className="size-3 text-cyan-700" />
              </div>

              {/* Comparison canvas */}

              <div className="overflow-x-auto overscroll-x-contain pb-5 [scrollbar-width:thin]">
                <table className="w-full min-w-[900px] border-collapse">
                  {/* ───────────────── Property headers ───────────────── */}

                  <thead>
                    <tr>
                      {/* Sticky label column */}

                      <th className="sticky left-0 z-30 w-[145px] min-w-[145px] border-b border-stone-300 bg-[#f6f5f1] p-0 text-left sm:w-[190px] sm:min-w-[190px]">
                        <div className="flex h-full items-end pb-5 pr-5">
                          <span className="text-[8px] font-medium uppercase tracking-[0.28em] text-stone-400">
                            Property
                          </span>
                        </div>
                      </th>

                      {properties.map((property, index) => (
                        <th
                          key={property.id}
                          className="w-[260px] min-w-[260px] border-b border-stone-300 p-0 px-2 text-left align-top first:pl-0 last:pr-0 sm:w-[310px] sm:min-w-[310px] sm:px-3"
                        >
                          <div className="group relative">
                            {/* Image */}

                            <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-200">
                              <Image
                                src={property.images[0]}
                                alt={property.title}
                                fill
                                sizes="(max-width: 640px) 260px, 310px"
                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                              />

                              {/* Image atmosphere */}

                              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/[0.03] to-transparent" />

                              {/* Number */}

                              <span className="absolute left-4 top-4 font-mono text-[9px] tracking-[0.2em] text-white/80">
                                {String(index + 1).padStart(2, "0")}
                              </span>

                              {/* Remove */}

                              <button
                                type="button"
                                onClick={() =>
                                  dispatch(
                                    removeFromCompare(property.id)
                                  )
                                }
                                aria-label={`Remove ${property.title} from comparison`}
                                className="absolute right-3 top-3 flex size-8 items-center justify-center border border-white/20 bg-black/20 text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-stone-950"
                              >
                                <X className="size-3.5" />
                              </button>

                              {/* Image bottom label */}

                              <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                                <span className="text-[8px] uppercase tracking-[0.24em] text-white/75">
                                  Selected property
                                </span>

                                <span className="font-mono text-[8px] tracking-[0.18em] text-white/60">
                                  {String(index + 1).padStart(2, "0")}
                                </span>
                              </div>
                            </div>

                            {/* Property identity */}

                            <div className="pt-5">
                              <Link
                                href={`/properties/${property.slug}`}
                                className="group/title inline-flex max-w-full items-start gap-2"
                              >
                                <span className="font-display text-[1.1rem] leading-tight tracking-[-0.02em] text-stone-900 transition-colors duration-300 group-hover/title:text-cyan-700 sm:text-xl">
                                  {property.title}
                                </span>

                                <ArrowUpRight className="mt-0.5 size-3.5 shrink-0 text-stone-400 transition-all duration-300 group-hover/title:-translate-y-0.5 group-hover/title:translate-x-0.5 group-hover/title:text-cyan-700" />
                              </Link>

                              <p className="mt-2 text-[9px] uppercase tracking-[0.2em] text-stone-400">
                                {property.location.area}
                              </p>
                            </div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>

                  {/* ───────────────── Comparison rows ───────────────── */}

                  <tbody>
                    {rows.map((row, rowIndex) => (
                      <tr
                        key={row.label}
                        className="group/row"
                      >
                        {/* Sticky label */}

                        <th
                          scope="row"
                          className="sticky left-0 z-20 border-b border-stone-300/80 bg-[#f6f5f1] p-0 text-left"
                        >
                          <div className="flex min-h-[62px] items-center pr-5">
                            <span
                              className={`text-[8px] uppercase tracking-[0.22em] ${
                                rowIndex === 0
                                  ? "font-semibold text-cyan-700"
                                  : "text-stone-400"
                              }`}
                            >
                              {row.label}
                            </span>
                          </div>
                        </th>

                        {properties.map((property) => (
                          <td
                            key={property.id}
                            className="border-b border-stone-300/80 px-3 py-0 text-[11px] text-stone-700 first:pl-0 last:pr-0"
                          >
                            <div className="flex min-h-[62px] items-center leading-relaxed transition-transform duration-300 group-hover/row:translate-x-0.5">
                              {row.render(property)}
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* ───────────────── Bottom note ───────────────── */}

              <div className="mt-6 flex flex-col gap-3 border-t border-stone-300/70 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <span className="size-1 rounded-full bg-cyan-700" />

                  <span className="text-[8px] uppercase tracking-[0.27em] text-stone-400">
                    Curated comparison
                  </span>
                </div>

                <span className="font-mono text-[8px] tracking-[0.2em] text-stone-300">
                  LISTEASY / COMPARE
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

