import { siteConfig } from "@/config/site.config";
import type { SiteConfig } from "@/config/types";

/** Troca, em todas as strings, os restos de conteúdo de demonstração por texto neutro. */
function scrub<T>(value: T): T {
  if (typeof value === "string") {
    return value
      .replace(/fictíci\w*|demonstrativ\w*/gi, "real")
      .replace(/Rua Exemplo/g, "Rua Voluntários da Pátria")
      .replace(/Exemplo de política: /g, "")
      .replace(/@example\.com/g, "@barbeariareal.com.br") as T;
  }
  if (Array.isArray(value)) return value.map(scrub) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, scrub(v)])) as T;
  }
  return value;
}

/** Um config de cliente real que passa em todas as validações. */
export function makeRealConfig(overrides: Partial<SiteConfig> = {}): SiteConfig {
  const base = scrub(structuredClone(siteConfig));
  return {
    ...base,
    demo: false,
    url: "https://www.barbeariareal.com.br",
    contact: {
      ...base.contact,
      whatsapp: "5516991234567",
      whatsappConfirmedAt: "2026-11-05",
      phoneDisplay: "(16) 99123-4567",
    },
    legal: {
      controllerName: "Barbearia Real Ltda.",
      document: "CNPJ 00.000.000/0001-91",
      privacyEmail: "privacidade@barbeariareal.com.br",
      privacyUpdatedAt: "2026-11-05",
    },
    imageRights: {
      status: "confirmados",
      notes: "Fotos feitas pelo próprio estabelecimento, com autorização de imagem dos barbeiros.",
      confirmedAt: "2026-11-05",
    },
    ...overrides,
  };
}
