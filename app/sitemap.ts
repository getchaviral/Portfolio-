import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://aviralshukla.dev";
  return [{ url: base, changeFrequency: "monthly", priority: 1 }];
}
