"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { projectAreaOptions, projectBudgetPresets, projectHandoverOptions, projectStatuses, projectTypes } from "./project-filter-options";



const fieldClass = `
  h-11 w-full rounded-none border-0 border-b border-border bg-transparent
  px-0 text-[13px] shadow-none transition-colors duration-300
  focus-visible:border-foreground focus-visible:ring-0 focus-visible:ring-offset-0
`;

interface ProjectFiltersFormProps {
  onApply?: () => void;
}

export function ProjectFiltersForm({
  onApply,
}: ProjectFiltersFormProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [area, setArea] = React.useState(
    searchParams.get("area") ?? ""
  );

  const [type, setType] = React.useState(
    searchParams.get("type") ?? ""
  );

  const [status, setStatus] = React.useState(
    searchParams.get("status") ?? ""
  );

  const [budget, setBudget] = React.useState(
    searchParams.get("budget") ?? "0"
  );

  const [bedrooms, setBedrooms] = React.useState(
    searchParams.get("bedrooms") ?? ""
  );

  const [handover, setHandover] = React.useState(
    searchParams.get("handover") ?? ""
  );

  const [query, setQuery] = React.useState(
    searchParams.get("q") ?? ""
  );

  function apply() {
    const params = new URLSearchParams(searchParams.toString());

    setOrDelete(params, "area", area);
    setOrDelete(params, "type", type);
    setOrDelete(params, "status", status);
    setOrDelete(params, "bedrooms", bedrooms);
    setOrDelete(params, "handover", handover);
    setOrDelete(params, "q", query.trim());

    const preset = projectBudgetPresets[Number(budget)];

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

    setOrDelete(
      params,
      "budget",
      budget === "0" ? "" : budget
    );

    params.delete("page");

    const queryString = params.toString();

    router.push(
      queryString
        ? `${pathname}?${queryString}`
        : pathname
    );

    onApply?.();
  }

  function reset() {
    setArea("");
    setType("");
    setStatus("");
    setBudget("0");
    setBedrooms("");
    setHandover("");
    setQuery("");

    router.push(pathname);

    onApply?.();
  }

  return (
    <div className="flex flex-col gap-6 py-6">

      {/* Keyword */}
      <Field label="Keyword">
        <Input
          placeholder="Project, developer or area"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              apply();
            }
          }}
          className={fieldClass}
        />
      </Field>

      {/* Area */}
      <Field label="Area">
        <Select
          value={area}
          onChange={(e) => setArea(e.target.value)}
          className={fieldClass}
        >
          <option value="">All areas</option>

          {projectAreaOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </Select>
      </Field>

      {/* Project type */}
      <Field label="Project type">
        <Select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className={fieldClass}
        >
          <option value="">All types</option>

          {projectTypes.map((projectType) => (
            <option
              key={projectType}
              value={projectType}
            >
              {projectType}
            </option>
          ))}
        </Select>
      </Field>

      {/* Status */}
      <Field label="Project status">
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={fieldClass}
        >
          <option value="">All statuses</option>

          {projectStatuses.map((projectStatus) => (
            <option
              key={projectStatus.value}
              value={projectStatus.value}
            >
              {projectStatus.label}
            </option>
          ))}
        </Select>
      </Field>

      {/* Budget */}
      <Field label="Starting budget">
        <Select
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className={fieldClass}
        >
          {projectBudgetPresets.map((preset, index) => (
            <option
              key={preset.label}
              value={index}
            >
              {preset.label}
            </option>
          ))}
        </Select>
      </Field>

      {/* Bedrooms */}
      <Field label="Minimum bedrooms">
        <Select
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
          className={fieldClass}
        >
          <option value="">Any</option>

          {[1, 2, 3, 4, 5].map((number) => (
            <option
              key={number}
              value={number}
            >
              {number}+
            </option>
          ))}
        </Select>
      </Field>

      {/* Handover */}
      <Field label="Expected handover">
        <Select
          value={handover}
          onChange={(e) => setHandover(e.target.value)}
          className={fieldClass}
        >
          <option value="">Any year</option>

          {projectHandoverOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </Select>
      </Field>

      {/* Actions */}
      <div className="mt-2 flex flex-col gap-3">
        <Button
          type="button"
          onClick={apply}
          className="
            h-12 w-full rounded-none
            bg-foreground text-sm font-medium text-background
            shadow-none transition-colors duration-300
            hover:bg-foreground/90
          "
        >
          Apply filters
        </Button>

        <Button
          type="button"
          variant="ghost"
          onClick={reset}
          className="
            h-10 w-full rounded-none px-0
            text-sm font-medium text-muted-foreground
            shadow-none transition-colors duration-300
            hover:bg-transparent hover:text-foreground
          "
        >
          Clear all filters
        </Button>
      </div>
    </div>
  );
}

function setOrDelete(
  params: URLSearchParams,
  key: string,
  value: string
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
      <span className="mb-2 block text-xs font-medium text-muted-foreground">
        {label}
      </span>

      {children}
    </label>
  );
}