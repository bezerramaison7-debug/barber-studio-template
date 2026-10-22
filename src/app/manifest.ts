import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site.config";
import { resolveThemeColors } from "@/lib/theme";

export default function manifest(): MetadataRoute.Manifest {
  const colors = resolveThemeColors(siteConfig);
  return {
    name: siteConfig.business.name,
    short_name: siteConfig.business.shortName,
    description: siteConfig.seo.description,
    lang: "pt-BR",
    start_url: "/",
    display: "standalone",
    background_color: colors.background,
    theme_color: colors.background,
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
