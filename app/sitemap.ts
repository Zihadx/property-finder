import type { MetadataRoute } from "next";
import { properties } from "@/data/properties";
import { agents } from "@/data/agents";
import { areas } from "@/data/areas";

const BASE_URL = "https://listeasy.example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/properties`, changeFrequency: "hourly", priority: 0.9 },
    { url: `${BASE_URL}/properties/apartments`, changeFrequency: "daily", priority: 0.7 },
    { url: `${BASE_URL}/properties/plots`, changeFrequency: "daily", priority: 0.7 },
    { url: `${BASE_URL}/properties/commercial`, changeFrequency: "daily", priority: 0.7 },
    { url: `${BASE_URL}/properties/duplexes`, changeFrequency: "daily", priority: 0.7 },
    { url: `${BASE_URL}/agents`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE_URL}/areas`, changeFrequency: "weekly", priority: 0.8 },
  ];

  const propertyRoutes: MetadataRoute.Sitemap = properties.map((p) => ({
    url: `${BASE_URL}/properties/${p.slug}`,
    lastModified: p.listedAt,
    changeFrequency: "daily",
    priority: p.featured ? 0.8 : 0.6,
  }));

  const agentRoutes: MetadataRoute.Sitemap = agents.map((a) => ({
    url: `${BASE_URL}/agents/${a.slug}`,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  const areaRoutes: MetadataRoute.Sitemap = areas.map((a) => ({
    url: `${BASE_URL}/areas/${a.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...propertyRoutes, ...agentRoutes, ...areaRoutes];
}
