"use client";

import * as React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { areaOptions, budgetPresets, propertyTypes } from "@/lib/filter-options";

export function PropertyFiltersForm({ onApply }: { onApply?: () => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [area, setArea] = React.useState(searchParams.get("area") ?? "");
  const [type, setType] = React.useState(searchParams.get("type") ?? "");
  const [purpose, setPurpose] = React.useState(searchParams.get("purpose") ?? "");
  const [budget, setBudget] = React.useState(searchParams.get("budget") ?? "0");
  const [bedrooms, setBedrooms] = React.useState(searchParams.get("bedrooms") ?? "");

  function apply() {
    const params = new URLSearchParams(searchParams.toString());
    setOrDelete(params, "area", area);
    setOrDelete(params, "type", type);
    setOrDelete(params, "purpose", purpose);
    setOrDelete(params, "bedrooms", bedrooms);

    const preset = budgetPresets[Number(budget)];
    if (preset?.min !== undefined) params.set("minPrice", String(preset.min));
    else params.delete("minPrice");
    if (preset?.max !== undefined) params.set("maxPrice", String(preset.max));
    else params.delete("maxPrice");
    setOrDelete(params, "budget", budget === "0" ? "" : budget);

    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
    onApply?.();
  }

  function reset() {
    setArea("");
    setType("");
    setPurpose("");
    setBudget("0");
    setBedrooms("");
    router.push(pathname);
    onApply?.();
  }

  return (
    <div className="flex flex-col gap-5 p-5">
      <Field label="Area">
        <Select value={area} onChange={(e) => setArea(e.target.value)}>
          <option value="">All areas</option>
          {areaOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="Property type">
        <Select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">All types</option>
          {propertyTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="Purpose">
        <Select value={purpose} onChange={(e) => setPurpose(e.target.value)}>
          <option value="">Sale or Rent</option>
          <option value="Sale">For Sale</option>
          <option value="Rent">For Rent</option>
        </Select>
      </Field>

      <Field label="Budget">
        <Select value={budget} onChange={(e) => setBudget(e.target.value)}>
          {budgetPresets.map((preset, index) => (
            <option key={preset.label} value={index}>
              {preset.label}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="Minimum bedrooms">
        <Select value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}>
          <option value="">Any</option>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}+
            </option>
          ))}
        </Select>
      </Field>

      <div className="mt-2 flex gap-3">
        <Button variant="outline" className="flex-1" onClick={reset} type="button">
          Reset
        </Button>
        <Button className="flex-1" onClick={apply} type="button">
          Apply Filters
        </Button>
      </div>
    </div>
  );
}

function setOrDelete(params: URLSearchParams, key: string, value: string) {
  if (value) params.set(key, value);
  else params.delete(key);
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="ledger-label mb-2 block">{label}</span>
      {children}
    </label>
  );
}
