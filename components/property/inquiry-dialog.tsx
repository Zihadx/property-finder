"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { inquirySchema, type InquiryFormValues } from "@/lib/schemas";

export function InquiryDialog({
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
  } = useForm<InquiryFormValues>({ resolver: zodResolver(inquirySchema) });

  async function onSubmit(values: InquiryFormValues) {
    // Backend not implemented yet — simulate a network round trip.
    await new Promise((resolve) => setTimeout(resolve, 700));
    toast.success("Inquiry sent", {
      description: `The agent will reach out to ${values.name} shortly.`,
    });
    reset();
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose} title="Contact Agent">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-5">
        <p className="text-sm text-muted-foreground">
          Send an inquiry about <span className="text-foreground">{propertyTitle}</span>. The agent
          typically responds within a few hours.
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
          <span className="ledger-label mb-2 block">Message (optional)</span>
          <textarea
            rows={3}
            placeholder="Ask about price, availability, or a good time to visit…"
            className="w-full rounded-[var(--radius-sm)] border border-border-strong bg-surface px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-accent"
            {...register("message")}
          />
          {errors.message && <p className="mt-1.5 text-xs text-danger">{errors.message.message}</p>}
        </label>

        <Button type="submit" disabled={isSubmitting} className="mt-2">
          {isSubmitting ? "Sending…" : "Send Inquiry"}
        </Button>
      </form>
    </Dialog>
  );
}
