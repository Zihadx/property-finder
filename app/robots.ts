import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/customer", "/compare"],
      },
    ],
    sitemap: "https://listeasy.example.com/sitemap.xml",
  };
}
