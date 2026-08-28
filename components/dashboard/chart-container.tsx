import { Card } from "@/components/ui/card";

export function ChartContainer({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <Card className="p-5">
      <p className="font-display text-base text-foreground">{title}</p>
      {description && <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>}
      <div className="mt-4">{children}</div>
    </Card>
  );
}
