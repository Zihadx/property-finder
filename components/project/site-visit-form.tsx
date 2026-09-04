"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SiteVisitForm({ projectName }: { projectName: string }) {
  const [status, setStatus] = React.useState<"idle" | "submitting" | "done">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    // TODO: wire to the real lead-capture endpoint / CRM.
    const formData = new FormData(e.currentTarget);
    console.log("Site visit request", Object.fromEntries(formData));

    await new Promise((resolve) => setTimeout(resolve, 600));
    setStatus("done");
  }

  if (status === "done") {
    return (
      <div className="border border-border/70 bg-card p-8 text-center">
        <p className="font-display text-xl text-foreground">
          Request received
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          An advisor will call you shortly to confirm your visit to{" "}
          {projectName}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
      <Field label="Full name" name="name" required className="sm:col-span-2" />
      <Field label="Phone number" name="phone" type="tel" required />
      <Field label="Preferred date" name="preferredDate" type="date" />
      <div className="sm:col-span-2">
        <span className="mb-2 block text-sm font-medium text-foreground">
          Message (optional)
        </span>
        <textarea
          name="message"
          rows={3}
          placeholder="Any specific unit or floor you'd like to see?"
          className="w-full rounded-none border border-border bg-transparent p-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-foreground focus-visible:outline-none"
        />
      </div>

      <Button
        type="submit"
        disabled={status === "submitting"}
        className="h-12 rounded-none px-8 sm:col-span-2 sm:w-fit"
      >
        {status === "submitting" ? "Sending…" : "Schedule a private site visit"}
      </Button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  className,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <label className={className}>
      <span className="mb-2 block text-sm font-medium text-foreground">
        {label}
      </span>
      <Input
        name={name}
        type={type}
        required={required}
        className="h-11 rounded-none border-border bg-transparent"
      />
    </label>
  );
}