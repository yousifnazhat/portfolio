import type { MetadataRoute } from "next";
import { collection } from "../data/portfolioData";

const SITE_URL = "https://yousifsportfolio.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...collection.map((a) => ({
      url: `${SITE_URL}/exhibit/${a.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
