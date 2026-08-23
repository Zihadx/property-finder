import { areas } from "@/data/areas";
import type { Area } from "@/types/area";

export const areaService = {
  async list(): Promise<Area[]> {
    return areas;
  },
  async getBySlug(slug: string): Promise<Area | undefined> {
    return areas.find((a) => a.slug === slug);
  },
};
