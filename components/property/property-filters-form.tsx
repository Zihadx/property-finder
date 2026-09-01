
"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

import {
  areaOptions,
  budgetPresets,
  propertyTypes,
} from "@/lib/filter-options";

export function PropertyFiltersForm({
  onApply,
}: {
  onApply?: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [area, setArea] = React.useState(searchParams.get("area") ?? "");
  const [type, setType] = React.useState(searchParams.get("type") ?? "");
  const [purpose, setPurpose] = React.useState(
    searchParams.get("purpose") ?? "",
  );
  const [budget, setBudget] = React.useState(
    searchParams.get("budget") ?? "0",
  );
  const [bedrooms, setBedrooms] = React.useState(
    searchParams.get("bedrooms") ?? "",
  );
  const [query, setQuery] = React.useState(searchParams.get("q") ?? "");

  function apply() {
    const params = new URLSearchParams(searchParams.toString());

    setOrDelete(params, "area", area);
    setOrDelete(params, "type", type);
    setOrDelete(params, "purpose", purpose);
    setOrDelete(params, "bedrooms", bedrooms);
    setOrDelete(params, "q", query.trim());

    const preset = budgetPresets[Number(budget)];

    if (preset?.min !== undefined) {
      params.set("minPrice", String(preset.min));
    } else {
      params.delete("minPrice");
    }

    if (preset?.max !== undefined) {
      params.set("maxPrice", String(preset.max));
    } else {
      params.delete("maxPrice");
    }

    setOrDelete(params, "budget", budget === "0" ? "" : budget);

    params.delete("page");

    const queryString = params.toString();

    router.push(
      queryString ? `${pathname}?${queryString}` : pathname,
    );

    onApply?.();
  }

  function reset() {
    setArea("");
    setType("");
    setPurpose("");
    setBudget("0");
    setBedrooms("");
    setQuery("");

    router.push(pathname);

    onApply?.();
  }

  return (
    <div className="flex flex-col gap-7 py-7">
      {/* ─────────────────────────────────────────
          SEARCH
      ───────────────────────────────────────── */}

      <Field label="Keyword">
        <div className="group relative">
          <Input
            placeholder="Title, area or address…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                apply();
              }
            }}
            className="
              h-11
              rounded-none
              border-0
              border-b
              border-border
              bg-transparent
              px-0
              text-[13px]
              shadow-none
              transition-all
              duration-300
              placeholder:text-muted-foreground/30
              focus-visible:border-foreground/60
              focus-visible:ring-0
              focus-visible:ring-offset-0
            "
          />

          <span
            aria-hidden="true"
            className="
              absolute
              bottom-0
              left-0
              h-px
              w-0
              bg-foreground
              transition-all
              duration-500
              group-focus-within:w-full
            "
          />
        </div>
      </Field>

      {/* ─────────────────────────────────────────
          AREA
      ───────────────────────────────────────── */}

      <Field label="Area">
        <Select
          value={area}
          onChange={(e) => setArea(e.target.value)}
          className="
            h-11
            w-full
            rounded-none
            border-0
            border-b
            border-border
            bg-transparent
            px-0
            text-[13px]
            shadow-none
            transition-all
            duration-300
            focus:border-foreground/60
            focus:ring-0
          "
        >
          <option value="">All areas</option>

          {areaOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Select>
      </Field>

      {/* ─────────────────────────────────────────
          PROPERTY TYPE
      ───────────────────────────────────────── */}

      <Field label="Property type">
        <Select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="
            h-11
            w-full
            rounded-none
            border-0
            border-b
            border-border
            bg-transparent
            px-0
            text-[13px]
            shadow-none
            transition-all
            duration-300
            focus:border-foreground/60
            focus:ring-0
          "
        >
          <option value="">All types</option>

          {propertyTypes.map((propertyType) => (
            <option key={propertyType} value={propertyType}>
              {propertyType}
            </option>
          ))}
        </Select>
      </Field>

      {/* ─────────────────────────────────────────
          PURPOSE
      ───────────────────────────────────────── */}

      <Field label="Purpose">
        <Select
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          className="
            h-11
            w-full
            rounded-none
            border-0
            border-b
            border-border
            bg-transparent
            px-0
            text-[13px]
            shadow-none
            transition-all
            duration-300
            focus:border-foreground/60
            focus:ring-0
          "
        >
          <option value="">Sale or Rent</option>
          <option value="Sale">For Sale</option>
          <option value="Rent">For Rent</option>
        </Select>
      </Field>

      {/* ─────────────────────────────────────────
          BUDGET
      ───────────────────────────────────────── */}

      <Field label="Budget">
        <Select
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="
            h-11
            w-full
            rounded-none
            border-0
            border-b
            border-border
            bg-transparent
            px-0
            text-[13px]
            shadow-none
            transition-all
            duration-300
            focus:border-foreground/60
            focus:ring-0
          "
        >
          {budgetPresets.map((preset, index) => (
            <option key={preset.label} value={index}>
              {preset.label}
            </option>
          ))}
        </Select>
      </Field>

      {/* ─────────────────────────────────────────
          BEDROOMS
      ───────────────────────────────────────── */}

      <Field label="Minimum bedrooms">
        <Select
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
          className="
            h-11
            w-full
            rounded-none
            border-0
            border-b
            border-border
            bg-transparent
            px-0
            text-[13px]
            shadow-none
            transition-all
            duration-300
            focus:border-foreground/60
            focus:ring-0
          "
        >
          <option value="">Any</option>

          {[1, 2, 3, 4, 5].map((number) => (
            <option key={number} value={number}>
              {number}+
            </option>
          ))}
        </Select>
      </Field>

      {/* ─────────────────────────────────────────
          ACTIONS
      ───────────────────────────────────────── */}

      <div className="mt-2 flex flex-col gap-3">
        <Button
          type="button"
          onClick={apply}
          className="
            group
            relative
            h-12
            w-full
            overflow-hidden
            rounded-none
            bg-foreground
            px-5
            text-[9px]
            font-medium
            uppercase
            tracking-[0.24em]
            text-background
            shadow-none
            transition-all
            duration-500
            hover:bg-foreground/90
          "
        >
          <span className="relative z-10">
            Apply Selection
          </span>

          <span
            aria-hidden="true"
            className="
              absolute
              inset-y-0
              left-0
              w-0
              bg-[#2095AE]
              transition-all
              duration-500
              ease-[cubic-bezier(0.22,1,0.36,1)]
              group-hover:w-full
            "
          />
        </Button>

        <Button
          type="button"
          variant="ghost"
          onClick={reset}
          className="
            h-10
            w-full
            rounded-none
            px-0
            text-[9px]
            font-medium
            uppercase
            tracking-[0.22em]
            text-muted-foreground/50
            shadow-none
            transition-all
            duration-300
            hover:bg-transparent
            hover:text-foreground
          "
        >
          <span className="mr-3 h-px w-5 bg-border transition-all duration-300 group-hover:w-8" />
          Clear all filters
        </Button>
      </div>

      {/* ─────────────────────────────────────────
          FOOTNOTE
      ───────────────────────────────────────── */}

      <div className="mt-1 flex items-center gap-3 border-t border-border/50 pt-5">
        <span className="size-1 rounded-full bg-[#2095AE]/50" />

        <p className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground/35">
          Refined property search
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */

function setOrDelete(
  params: URLSearchParams,
  key: string,
  value: string,
) {
  if (value) {
    params.set(key, value);
  } else {
    params.delete(key);
  }
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span
        className="
          mb-2
          block
          text-[8px]
          font-medium
          uppercase
          tracking-[0.3em]
          text-muted-foreground/50
        "
      >
        {label}
      </span>

      {children}
    </label>
  );
}

