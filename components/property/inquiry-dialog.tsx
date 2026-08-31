"use client";

import * as React from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { inquirySchema, type InquiryFormValues } from "@/lib/schemas";
import { inquiryService } from "@/services/inquiry.service";

const MESSAGE_MAX = 500;

export function InquiryDialog({
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
  const [submitted, setSubmitted] = React.useState<{ name: string } | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<InquiryFormValues>({ resolver: zodResolver(inquirySchema), mode: "onBlur" });

  const message = useWatch({ control, name: "message" });
  const messageLength = message?.length ?? 0;

  async function onSubmit(values: InquiryFormValues) {
    // Brief delay for perceived responsiveness — the create() call below
    // does the real work (previously this just simulated one and threw
    // the data away).
    await new Promise((resolve) => setTimeout(resolve, 400));
    await inquiryService.create({
      propertyId,
      agentId,
      customerName: values.name,
      customerPhone: values.phone,
      message: values.message ?? "",
    });
    toast.success("Inquiry sent", {
      description: `The agent will reach out to ${values.name} shortly.`,
    });
    setSubmitted({ name: values.name });
  }

  function handleClose() {
    onClose();
    // Wait for the close transition before resetting, so the form doesn't
    // visibly flash back to empty while the dialog is still fading out.
    setTimeout(() => {
      reset();
      setSubmitted(null);
    }, 200);
  }

  return (
    <Dialog open={open} onClose={handleClose} title="Contact Agent">
      {submitted ? (
        <InquirySuccess name={submitted.name} onDone={handleClose} />
      ) : (
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
            <div className="mb-2 flex items-baseline justify-between">
              <span className="ledger-label">Message (optional)</span>
              <span className="ledger-value text-xs text-caption-foreground">
                {messageLength}/{MESSAGE_MAX}
              </span>
            </div>
            <textarea
              rows={3}
              maxLength={MESSAGE_MAX}
              placeholder="Ask about price, availability, or a good time to visit…"
              className="w-full rounded-[var(--radius-sm)] border border-border-strong bg-surface px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-accent"
              {...register("message")}
            />
            {errors.message && <p className="mt-1.5 text-xs text-danger">{errors.message.message}</p>}
          </label>

          <Button type="submit" disabled={isSubmitting} className="mt-2">
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? "Sending…" : "Send Inquiry"}
          </Button>
        </form>
      )}
    </Dialog>
  );
}

function InquirySuccess({ name, onDone }: { name: string; onDone: () => void }) {
  React.useEffect(() => {
    const timer = setTimeout(onDone, 1800);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="flex flex-col items-center gap-3 px-5 py-10 text-center">
      <CheckCircle2 className="h-10 w-10 text-secondary" strokeWidth={1.5} />
      <p className="font-display text-lg text-foreground">Inquiry sent</p>
      <p className="max-w-xs text-sm text-muted-foreground">
        Thanks, {name.split(" ")[0]} — the agent has been notified and will reach out shortly.
      </p>
    </div>
  );
}
