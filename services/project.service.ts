import type { Project } from "@/types/project";
import { projects } from "@/data/projects";

export type ProjectSort =
  | "newest"
  | "price-asc"
  | "price-desc"
  | "progress";

export interface ProjectFilters {
  area?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  query?: string;
}

export const projectService = {
  async list(
    filters: ProjectFilters = {},
    sort: ProjectSort = "newest"
  ): Promise<Project[]> {
    let results = [...projects];

    const query = filters.query?.trim().toLowerCase();
    const area = filters.area?.trim().toLowerCase();

    if (query) {
      results = results.filter((project) => {
        const searchableText = [
          project.name,
          project.tagline,
          project.description,
          project.location.area,
          project.location.address,
        ]
          .join(" ")
          .toLowerCase();

        return searchableText.includes(query);
      });
    }

    if (area) {
      results = results.filter((project) =>
        project.location.area.toLowerCase().includes(area)
      );
    }

    if (filters.minPrice !== undefined) {
      results = results.filter(
        (project) => project.startingPrice >= filters.minPrice!
      );
    }

    if (filters.maxPrice !== undefined) {
      results = results.filter(
        (project) => project.startingPrice <= filters.maxPrice!
      );
    }

    if (filters.bedrooms !== undefined) {
      results = results.filter((project) =>
        project.unitTypes.some(
          (unit) => unit.bedrooms >= filters.bedrooms!
        )
      );
    }

    results.sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.startingPrice - b.startingPrice;

        case "price-desc":
          return b.startingPrice - a.startingPrice;

        case "progress":
          return b.constructionProgress - a.constructionProgress;

        case "newest":
        default:
          return (
            Number(b.id.replace(/\D/g, "")) -
            Number(a.id.replace(/\D/g, ""))
          );
      }
    });

    return results;
  },

  async getBySlug(slug: string): Promise<Project | null> {
    return (
      projects.find((project) => project.slug === slug) ?? null
    );
  },
};