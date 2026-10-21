import { defaultTexts, type SiteTexts } from "@/config/texts";
import type { SiteConfig } from "@/config/types";

/** Textos padrão com as substituições do cliente aplicadas (seção a seção). */
export function getTexts(config: Pick<SiteConfig, "texts">): SiteTexts {
  const merged = { ...defaultTexts } as Record<string, unknown>;
  for (const [section, override] of Object.entries(config.texts ?? {})) {
    const base = defaultTexts[section as keyof SiteTexts];
    merged[section] =
      base && typeof base === "object" && !Array.isArray(base) ? { ...base, ...(override as object) } : override;
  }
  return merged as SiteTexts;
}

/** Troca {cidade}, {bairro} e {nome} pelos dados do config. Marcadores desconhecidos ficam como estão. */
export function fillText(template: string, config: Pick<SiteConfig, "address" | "business">): string {
  const values: Record<string, string> = {
    cidade: config.address.city,
    bairro: config.address.neighborhood,
    nome: config.business.name,
  };
  return template.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);
}
