"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ImagePlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { propertyFormSchema, type PropertyFormValues } from "@/lib/schemas";
import { propertyTypes, areaOptions } from "@/lib/filter-options";
import { agents } from "@/data/agents";

export function PropertyForm({
  mode,
  defaultValues,
}: {
  mode: "create" | "edit";
  defaultValues?: Partial<PropertyFormValues>;
}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PropertyFormValues>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      purpose: "Sale",
      status: "Available",
      bedrooms: 0,
      bathrooms: 0,
      ...defaultValues,
    },
  });

  async function onSubmit(values: PropertyFormValues) {
    // No backend yet — simulate the save so the flow feels real.
    await new Promise((resolve) => setTimeout(resolve, 900));
    console.log("Property form submitted (mock):", values);
    toast.success(mode === "create" ? "Property created" : "Property updated", {
      description: `"${values.title}" has been saved to your mock inventory.`,
    });
    router.push("/dashboard/properties");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <p className="font-display text-base text-foreground">Basic information</p>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Title" error={errors.title?.message} className="sm:col-span-2">
            <Input placeholder="e.g. Riverview Residency, Gulshan 2" {...register("title")} />
          </Field>
          <Field label="Property type" error={errors.type?.message}>
            <Select {...register("type")} defaultValue="">
              <option value="" disabled>
                Select type
              </option>
              {propertyTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Purpose" error={errors.purpose?.message}>
            <Select {...register("purpose")}>
              <option value="Sale">For Sale</option>
              <option value="Rent">For Rent</option>
            </Select>
          </Field>
          <Field label="Status" error={errors.status?.message}>
            <Select {...register("status")}>
              <option value="Available">Available</option>
              <option value="Under Offer">Under Offer</option>
              <option value="Sold">Sold</option>
              <option value="Rented">Rented</option>
            </Select>
          </Field>
          <Field label="Price (BDT)" error={errors.price?.message}>
            <Input type="number" placeholder="8500000" {...register("price", { valueAsNumber: true })} />
          </Field>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <p className="font-display text-base text-foreground">Location</p>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Area" error={errors.area?.message}>
            <Select {...register("area")} defaultValue="">
              <option value="" disabled>
                Select area
              </option>
              {areaOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Full address" error={errors.address?.message}>
            <Input placeholder="Road 90, Gulshan 2, Dhaka" {...register("address")} />
          </Field>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <p className="font-display text-base text-foreground">Specs &amp; amenities</p>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Field label="Bedrooms" error={errors.bedrooms?.message}>
            <Input type="number" min={0} {...register("bedrooms", { valueAsNumber: true })} />
          </Field>
          <Field label="Bathrooms" error={errors.bathrooms?.message}>
            <Input type="number" min={0} {...register("bathrooms", { valueAsNumber: true })} />
          </Field>
          <Field label="Area (sqft)" error={errors.areaSqft?.message}>
            <Input type="number" placeholder="1500" {...register("areaSqft", { valueAsNumber: true })} />
          </Field>
          <Field label="Amenities (comma-separated)" className="sm:col-span-3">
            <Input placeholder="Lift, Generator Backup, 24/7 Security" {...register("amenities")} />
          </Field>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <p className="font-display text-base text-foreground">Photos</p>
        </CardHeader>
        <CardContent>
          <div className="flex aspect-[3/1] flex-col items-center justify-center gap-2 rounded-[var(--radius-sm)] border border-dashed border-border-strong text-center text-sm text-muted-foreground">
            <ImagePlus className="h-6 w-6" strokeWidth={1.5} />
            Image upload isn&apos;t wired to storage yet — connect Cloudinary/S3 here when the backend lands.
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <p className="font-display text-base text-foreground">Description &amp; assignment</p>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Field label="Description" error={errors.description?.message}>
            <textarea
              rows={4}
              placeholder="Describe the property, finishes, and what makes it stand out…"
              className="w-full rounded-[var(--radius-sm)] border border-border-strong bg-surface px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-accent"
              {...register("description")}
            />
          </Field>
          <Field label="Assigned agent" error={errors.agentId?.message}>
            <Select {...register("agentId")} defaultValue="">
              <option value="" disabled>
                Select agent
              </option>
              {agents.map((agent) => (
                <option key={agent.id} value={agent.id}>
                  {agent.name}
                </option>
              ))}
            </Select>
          </Field>
          <label className="flex items-center gap-2.5 text-sm text-foreground">
            <input type="checkbox" className="h-4 w-4 rounded border-border-strong accent-accent" {...register("featured")} />
            Feature this property on the homepage
          </label>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={() => router.push("/dashboard/properties")}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving…" : mode === "create" ? "Create Property" : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  className,
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={className}>
      <span className="ledger-label mb-2 block">{label}</span>
      {children}
      {error && <p className="mt-1.5 text-xs text-danger">{error}</p>}
    </label>
  );
}
