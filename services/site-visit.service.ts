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
};
