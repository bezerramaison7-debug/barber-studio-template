import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site.config";
import { isIndexable } from "@/lib/indexing";
import { getSiteUrl } from "@/lib/site";

/**
 * Rastreamento sempre permitido: quando o site não deve aparecer no Google (demo, preview),
 * o bloqueio é feito por `noindex` (meta tag + cabeçalho X-Robots-Tag). Bloquear aqui com
 * "Disallow: /" impediria o Google de ler o noindex.
 */
export default function robots(): MetadataRoute.Robots {
  const url = getSiteUrl(siteConfig);
  if (!isIndexable(siteConfig.demo)) return { rules: { userAgent: "*", allow: "/" } };
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${url}/sitemap.xml`, host: url };
}
