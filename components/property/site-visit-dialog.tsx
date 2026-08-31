"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { siteVisitSchema, type SiteVisitFormValues } from "@/lib/schemas";
import { siteVisitService } from "@/services/site-visit.service";

const PREFERRED_HOUR: Record<SiteVisitFormValues["preferredTime"], string> = {
  Morning: "10:00:00",
  Afternoon: "14:00:00",
  Evening: "18:00:00",
};

export function SiteVisitDialog({
  open,
  onClose,
  propertyTitle,
  propertyId,
  agentId,
}: {
  open: boolean;
  onClose: () => void;
  propertyTitle: string;
  propertyId: string;
  agentId: string;
}) {
  const [submitted, setSubmitted] = React.useState<{ name: string; time: string } | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SiteVisitFormValues>({ resolver: zodResolver(siteVisitSchema), mode: "onBlur" });

  async function onSubmit(values: SiteVisitFormValues) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    await siteVisitService.create({
      propertyId,
      agentId,
      customerName: values.name,
      customerPhone: values.phone,
      scheduledAt: `${values.preferredDate}T${PREFERRED_HOUR[values.preferredTime]}`,
    });
    toast.success("Site visit requested", {
      description: `We'll confirm a ${values.preferredTime.toLowerCase()} slot with ${values.name}.`,
    });
    setSubmitted({ name: values.name, time: values.preferredTime });
  }

  function handleClose() {
    onClose();
    setTimeout(() => {
      reset();
      setSubmitted(null);
    }, 200);
  }

  return (
    <Dialog open={open} onClose={handleClose} title="Request a Site Visit">
      {submitted ? (
        <VisitSuccess name={submitted.name} time={submitted.time} onDone={handleClose} />
      ) : (
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
            <Input type="date" min={new Date().toISOString().slice(0, 10)} {...register("preferredDate")} />
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
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? "Requesting…" : "Request Visit"}
          </Button>
        </form>
      )}
    </Dialog>
  );
}

function VisitSuccess({ name, time, onDone }: { name: string; time: string; onDone: () => void }) {
  React.useEffect(() => {
    const timer = setTimeout(onDone, 1800);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="flex flex-col items-center gap-3 px-5 py-10 text-center">
      <CheckCircle2 className="h-10 w-10 text-secondary" strokeWidth={1.5} />
      <p className="font-display text-lg text-foreground">Visit requested</p>
      <p className="max-w-xs text-sm text-muted-foreground">
        Thanks, {name.split(" ")[0]} — we&apos;ll confirm your {time.toLowerCase()} slot shortly.
      </p>
    </div>
  );
}
