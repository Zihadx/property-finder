import type { Metadata } from "next";
import { CalendarClock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { siteVisitService } from "@/services/site-visit.service";
import { properties } from "@/data/properties";
import { agents } from "@/data/agents";
import type { SiteVisit } from "@/types/inquiry";

export const metadata: Metadata = { title: "Site Visits" };

const statusVariant: Record<SiteVisit["status"], "warning" | "success" | "neutral" | "danger"> = {
  Pending: "warning",
  Confirmed: "success",
  Completed: "neutral",
  Cancelled: "danger",
};

export default async function DashboardSiteVisitsPage() {
  const visits = await siteVisitService.list();
  const propertyMap = Object.fromEntries(properties.map((p) => [p.id, p]));
  const agentMap = Object.fromEntries(agents.map((a) => [a.id, a]));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="ledger-label mb-2">Scheduling</p>
        <h1 className="font-display text-2xl text-foreground">Site Visits</h1>
      </div>

      {visits.length === 0 ? (
        <EmptyState icon={CalendarClock} title="No site visits yet" description="Requests from property pages will appear here." />
      ) : (
        <div className="flex flex-col gap-3">
          {visits.map((visit) => {
            const property = propertyMap[visit.propertyId];
            const agent = agentMap[visit.agentId];
            const date = new Date(visit.scheduledAt);
            return (
              <Card key={visit.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-[var(--radius-sm)] bg-surface-muted">
                    <span className="ledger-value text-xs text-muted-foreground">
                      {date.toLocaleDateString("en-GB", { month: "short" })}
                    </span>
                    <span className="ledger-value text-base text-foreground">{date.getDate()}</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{property?.title ?? "Unknown property"}</p>
                    <p className="text-xs text-muted-foreground">
                      {visit.customerName} · {visit.customerPhone} · Agent: {agent?.name ?? "Unassigned"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="ledger-value text-sm text-muted-foreground">
                    {date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                  </span>
                  <Badge variant={statusVariant[visit.status]}>{visit.status}</Badge>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
