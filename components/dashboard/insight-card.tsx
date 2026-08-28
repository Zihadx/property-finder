import { Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

export function InsightCard({ insights }: { insights: string[] }) {
  if (insights.length === 0) return null;
  return (
    <Card className="border-accent/30 bg-accent-soft/40 p-5">
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-accent" strokeWidth={1.75} />
        <p className="font-display text-base text-foreground">Insights this week</p>
      </div>
      <ul className="mt-3 space-y-2">
        {insights.map((insight) => (
          <li key={insight} className="text-sm leading-relaxed text-muted-foreground">
            {insight}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-caption-foreground">
        Calculated from listing and inquiry activity — not a prediction.
      </p>
    </Card>
  );
}
