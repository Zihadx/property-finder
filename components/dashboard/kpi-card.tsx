import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export function KpiCard({
  label,
  value,
  icon: Icon,
  trend,
  trendLabel,
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: number;
  trendLabel?: string;
}) {
  const isPositive = (trend ?? 0) >= 0;

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <p className="ledger-label">{label}</p>
        <Icon className="h-4 w-4 text-caption-foreground" strokeWidth={1.5} />
      </div>
      <p className="ledger-value mt-3 text-3xl text-foreground">{value}</p>
      {typeof trend === "number" && (
        <p
          className={cn(
            "mt-2 flex items-center gap-1 text-xs",
            isPositive ? "text-secondary" : "text-danger"
          )}
        >
          {isPositive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
          <span className="ledger-value">{Math.abs(trend)}%</span>
          <span className="text-caption-foreground">{trendLabel ?? "vs last week"}</span>
        </p>
      )}
    </Card>
  );
}
