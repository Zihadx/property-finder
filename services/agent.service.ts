import { agents } from "@/data/agents";
import { propertyService } from "@/services/property.service";
import type { Agent } from "@/types/agent";

export const agentService = {
  async list(): Promise<Agent[]> {
    return agents;
  },
  async getBySlug(slug: string): Promise<Agent | undefined> {
    return agents.find((a) => a.slug === slug);
  },
  async getById(id: string): Promise<Agent | undefined> {
    return agents.find((a) => a.id === id);
  },
  /** Every agent paired with their count of currently-available listings. */
  async listWithActiveCounts(): Promise<{ agent: Agent; listingCount: number }[]> {
    return Promise.all(
      agents.map(async (agent) => ({
        agent,
        listingCount: (await propertyService.getByAgent(agent.id)).filter((p) => p.status === "Available").length,
      }))
    );
  },
};
