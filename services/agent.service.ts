import { agents } from "@/data/agents";
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
};
