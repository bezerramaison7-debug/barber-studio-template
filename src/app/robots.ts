import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site.config";
import { getSiteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const url = getSiteUrl(siteConfig);
  // Em modo demonstrativo, nada é indexado.
  if (siteConfig.demo) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${url}/sitemap.xml`, host: url };
}
