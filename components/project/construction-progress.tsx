import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ConstructionMilestone } from "@/types/project";

export function ConstructionProgress({
  percentComplete,
  milestones,
}: {
  percentComplete: number;
  milestones: ConstructionMilestone[];
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-sm text-muted-foreground">Overall progress</span>
        <span className="font-display text-3xl text-foreground">
          {percentComplete}%
        </span>
      </div>

      <div className="mt-3 h-2 w-full bg-muted">
        <div
          className="h-full bg-foreground transition-all"
          style={{ width: `${percentComplete}%` }}
        />
      </div>

      <ol className="mt-10 grid grid-cols-2 gap-y-8 sm:grid-cols-4">
        {milestones.map((milestone) => (
          <li key={milestone.label} className="flex flex-col items-start gap-3">
            <span
              className={cn(
                "flex size-8 items-center justify-center rounded-full border",
                milestone.complete
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground"
              )}
            >
              {milestone.complete ? (
                <Check className="size-4" />
              ) : (
                <span className="size-1.5 rounded-full bg-current" />
              )}
            </span>
            <div>
              <p className="text-sm font-medium text-foreground">
                {milestone.label}
              </p>
              <p className="text-xs text-muted-foreground">{milestone.month}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}