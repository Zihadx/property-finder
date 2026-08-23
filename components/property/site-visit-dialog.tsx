"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { siteVisitSchema, type SiteVisitFormValues } from "@/lib/schemas";

export function SiteVisitDialog({
  open,
  onClose,
  propertyTitle,
}: {
  open: boolean;
  onClose: () => void;
  propertyTitle: string;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SiteVisitFormValues>({ resolver: zodResolver(siteVisitSchema) });

  async function onSubmit(values: SiteVisitFormValues) {
    await new Promise((resolve) => setTimeout(resolve, 700));
    toast.success("Site visit requested", {
      description: `We'll confirm a ${values.preferredTime.toLowerCase()} slot with ${values.name}.`,
    });
    reset();
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose} title="Request a Site Visit">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-5">
        <p className="text-sm text-muted-foreground">
          Schedule a visit to <span className="text-foreground">{propertyTitle}</span>.
        </p>

        <label className="block">
          <span className="ledger-label mb-2 block">Full name</span>
          <Input placeholder="Your name" {...register("name")} />
          {errors.name && <p className="mt-1.5 text-xs text-danger">{errors.name.message}</p>}
        </label>

        <label className="block">
          <span className="ledger-label mb-2 block">Phone number</span>
          <Input placeholder="01XXXXXXXXX" {...register("phone")} />
          {errors.phone && <p className="mt-1.5 text-xs text-danger">{errors.phone.message}</p>}
        </label>

        <label className="block">
          <span className="ledger-label mb-2 block">Preferred date</span>
          <Input type="date" {...register("preferredDate")} />
          {errors.preferredDate && <p className="mt-1.5 text-xs text-danger">{errors.preferredDate.message}</p>}
        </label>

        <label className="block">
          <span className="ledger-label mb-2 block">Preferred time</span>
          <Select {...register("preferredTime")} defaultValue="Morning">
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Evening">Evening</option>
          </Select>
        </label>

        <Button type="submit" disabled={isSubmitting} className="mt-2">
          {isSubmitting ? "Requesting…" : "Request Visit"}
        </Button>
      </form>
    </Dialog>
  );
}
