import * as React from "react";
import { cn } from "@/lib/utils";

const variantClasses = {
  neutral: "bg-surface-muted text-foreground",
  accent: "bg-accent-soft text-accent-strong",
  success: "bg-secondary text-secondary-foreground",
  warning: "bg-warning text-warning-foreground",
  danger: "bg-danger text-danger-foreground",
  outline: "border border-border-strong text-muted-foreground bg-transparent",
} as const;

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof variantClasses;
}

export function Badge({ className, variant = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[var(--radius-sm)] px-2.5 py-1 text-[0.6875rem] font-medium uppercase tracking-wide",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}
