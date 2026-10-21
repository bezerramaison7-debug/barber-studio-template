import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site.config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.business.name,
    short_name: siteConfig.business.shortName,
    description: siteConfig.seo.description,
    lang: "pt-BR",
    start_url: "/",
    display: "standalone",
    background_color: siteConfig.theme.colors.background,
    theme_color: siteConfig.theme.colors.background,
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
