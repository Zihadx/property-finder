import { properties } from "@/data/properties";
import type { Property, PropertyStatus, PropertyType } from "@/types/property";

export interface PropertyFilters {
  area?: string;
  type?: PropertyType;
  status?: PropertyStatus;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  purpose?: "Sale" | "Rent";
  featured?: boolean;
  query?: string;
}

export type PropertySort = "newest" | "price-asc" | "price-desc" | "most-viewed";

/**
 * All property reads go through this service. Today it reads the mock
 * dataset; swapping to a real API later means changing only this file.
 */
export const propertyService = {
  async list(filters: PropertyFilters = {}, sort: PropertySort = "newest"): Promise<Property[]> {
    let result = [...properties];

    if (filters.area) {
      result = result.filter((p) => p.location.areaSlug === filters.area);
    }
    if (filters.type) {
      result = result.filter((p) => p.type === filters.type);
    }
    if (filters.status) {
      result = result.filter((p) => p.status === filters.status);
    }
    if (filters.purpose) {
      result = result.filter((p) => p.purpose === filters.purpose);
    }
    if (typeof filters.minPrice === "number") {
      result = result.filter((p) => p.price >= filters.minPrice!);
    }
    if (typeof filters.maxPrice === "number") {
      result = result.filter((p) => p.price <= filters.maxPrice!);
    }
    if (typeof filters.bedrooms === "number") {
      result = result.filter((p) => p.bedrooms >= filters.bedrooms!);
    }
    if (typeof filters.featured === "boolean") {
      result = result.filter((p) => p.featured === filters.featured);
    }
    if (filters.query) {
      const q = filters.query.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.area.toLowerCase().includes(q) ||
          p.location.address.toLowerCase().includes(q)
      );
    }

    return sortProperties(result, sort);
  },

  async getBySlug(slug: string): Promise<Property | undefined> {
    return properties.find((p) => p.slug === slug);
  },

  async getFeatured(limit = 6): Promise<Property[]> {
    return properties.filter((p) => p.featured).slice(0, limit);
  },

  async getSimilar(property: Property, limit = 3): Promise<Property[]> {
    return properties
      .filter(
        (p) =>
          p.id !== property.id &&
          (p.location.areaSlug === property.location.areaSlug || p.type === property.type)
      )
      .slice(0, limit);
  },

  async getByArea(areaSlug: string): Promise<Property[]> {
    return properties.filter((p) => p.location.areaSlug === areaSlug);
  },

  async getByAgent(agentId: string): Promise<Property[]> {
    return properties.filter((p) => p.agentId === agentId);
  },

  async getByIds(ids: string[]): Promise<Property[]> {
    const idSet = new Set(ids);
    return properties.filter((p) => idSet.has(p.id));
  },
};

function sortProperties(list: Property[], sort: PropertySort): Property[] {
  const sorted = [...list];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "most-viewed":
      return sorted.sort((a, b) => b.views - a.views);
    case "newest":
    default:
      return sorted.sort((a, b) => new Date(b.listedAt).getTime() - new Date(a.listedAt).getTime());
  }
}
