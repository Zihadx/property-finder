import { siteVisits } from "@/data/site-visits";
import type { SiteVisit } from "@/types/inquiry";

export const siteVisitService = {
  async list(): Promise<SiteVisit[]> {
    return [...siteVisits].sort(
      (a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime()
    );
  },
  async getUpcoming(limit = 5): Promise<SiteVisit[]> {
    return (await this.list()).filter((v) => v.status !== "Completed" && v.status !== "Cancelled").slice(0, limit);
  },
  /** Same mock-persistence pattern as inquiryService.create() — mutates the in-memory array list()/getUpcoming() read from. */
  async create(input: {
    propertyId: string;
    agentId: string;
    customerName: string;
    customerPhone: string;
    scheduledAt: string;
  }): Promise<SiteVisit> {
    const visit: SiteVisit = {
      id: `vst-${Date.now()}`,
      propertyId: input.propertyId,
      agentId: input.agentId,
      customerName: input.customerName,
      customerPhone: input.customerPhone,
      scheduledAt: input.scheduledAt,
      status: "Pending",
    };
    siteVisits.unshift(visit);
    return visit;
  },
};
