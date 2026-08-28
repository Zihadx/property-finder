import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { inquiryService } from "@/services/inquiry.service";
import { properties } from "@/data/properties";
import { agents } from "@/data/agents";
import type { Inquiry } from "@/types/inquiry";

export const metadata: Metadata = { title: "Leads" };

const statusVariant: Record<Inquiry["status"], "warning" | "accent" | "success" | "neutral"> = {
  New: "warning",
  Contacted: "accent",
  "Site Visit Scheduled": "success",
  Closed: "neutral",
};

const priorityVariant: Record<Inquiry["priority"], "danger" | "warning" | "neutral"> = {
  High: "danger",
  Medium: "warning",
  Low: "neutral",
};

export default async function DashboardLeadsPage() {
  const leads = await inquiryService.list();
  const propertyMap = Object.fromEntries(properties.map((p) => [p.id, p]));
  const agentMap = Object.fromEntries(agents.map((a) => [a.id, a]));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="ledger-label mb-2">Customer Inquiries</p>
        <h1 className="font-display text-2xl text-foreground">Leads</h1>
      </div>

      <div className="hidden overflow-x-auto rounded-[var(--radius-md)] border border-border bg-surface lg:block">
        <table className="w-full min-w-[820px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-caption-foreground">
              <th className="p-3 font-medium">Customer</th>
              <th className="p-3 font-medium">Property</th>
              <th className="p-3 font-medium">Agent</th>
              <th className="p-3 font-medium">Source</th>
              <th className="p-3 font-medium">Priority</th>
              <th className="p-3 font-medium">Status</th>
              <th className="p-3 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-b border-border last:border-0 hover:bg-surface-muted/50">
                <td className="p-3">
                  <p className="font-medium text-foreground">{lead.customerName}</p>
                  <p className="text-xs text-muted-foreground">{lead.customerPhone}</p>
                </td>
                <td className="p-3 text-muted-foreground">
                  {propertyMap[lead.propertyId]?.title ?? "—"}
                </td>
                <td className="p-3 text-muted-foreground">{agentMap[lead.agentId]?.name ?? "—"}</td>
                <td className="p-3 text-muted-foreground">{lead.source}</td>
                <td className="p-3">
                  <Badge variant={priorityVariant[lead.priority]}>{lead.priority}</Badge>
                </td>
                <td className="p-3">
                  <Badge variant={statusVariant[lead.status]}>{lead.status}</Badge>
                </td>
                <td className="p-3 text-muted-foreground">
                  {new Date(lead.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 lg:hidden">
        {leads.map((lead) => (
          <div key={lead.id} className="rounded-[var(--radius-md)] border border-border bg-surface p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-foreground">{lead.customerName}</p>
                <p className="text-xs text-muted-foreground">{lead.customerPhone}</p>
              </div>
              <Badge variant={statusVariant[lead.status]}>{lead.status}</Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{propertyMap[lead.propertyId]?.title ?? "—"}</p>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-3 text-xs text-muted-foreground">
              <span>Agent: {agentMap[lead.agentId]?.name ?? "—"}</span>
              <span>{lead.source}</span>
              <Badge variant={priorityVariant[lead.priority]}>{lead.priority}</Badge>
              <span className="ml-auto">
                {new Date(lead.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
