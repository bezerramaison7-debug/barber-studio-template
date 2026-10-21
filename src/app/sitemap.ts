import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site.config";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = getSiteUrl(siteConfig);
  return [
    { url, changeFrequency: "monthly", priority: 1 },
    { url: `${url}/privacidade`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
