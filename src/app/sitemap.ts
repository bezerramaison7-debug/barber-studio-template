import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site.config";
import { getServicesWithPage } from "@/lib/plan";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = getSiteUrl(siteConfig);
  return [
    { url, changeFrequency: "monthly", priority: 1 },
    ...getServicesWithPage(siteConfig).map((service) => ({
      url: `${url}/servicos/${service.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: `${url}/privacidade`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
