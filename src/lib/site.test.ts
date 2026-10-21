import { afterEach, describe, expect, it, vi } from "vitest";
import { siteConfig } from "@/config/site.config";
import { buildLocalBusinessJsonLd, getSiteUrl, themeToCssVars } from "./site";

afterEach(() => vi.unstubAllEnvs());

describe("getSiteUrl", () => {
  it("prefere NEXT_PUBLIC_SITE_URL e remove a barra final", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://cliente.com.br/");
    expect(getSiteUrl(siteConfig)).toBe("https://cliente.com.br");
  });

  it("na Vercel, sem a variável, usa o domínio de produção do projeto", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "barber-studio-template.vercel.app");
    expect(getSiteUrl(siteConfig)).toBe("https://barber-studio-template.vercel.app");
  });

  it("fora da Vercel e sem a variável, usa a URL do config", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "");
    expect(getSiteUrl(siteConfig)).toBe(siteConfig.url);
  });
});

describe("themeToCssVars", () => {
  it("gera variáveis --brand-* em kebab-case", () => {
    const vars = themeToCssVars(siteConfig.theme.colors);
    expect(vars["--brand-accent"]).toBe(siteConfig.theme.colors.accent);
    expect(vars["--brand-surface-raised"]).toBe(siteConfig.theme.colors.surfaceRaised);
  });
});

describe("buildLocalBusinessJsonLd", () => {
  const jsonLd = buildLocalBusinessJsonLd(siteConfig);

  it("descreve uma BarberShop com endereço e horários", () => {
    expect(jsonLd["@type"]).toBe("BarberShop");
    expect(jsonLd.address.addressLocality).toBe(siteConfig.address.city);
    expect(jsonLd.openingHoursSpecification.length).toBe(
      siteConfig.hours.filter((h) => h.open && h.close).length,
    );
  });

  it("nunca inclui avaliações inventadas", () => {
    expect(jsonLd).not.toHaveProperty("aggregateRating");
    expect(jsonLd).not.toHaveProperty("review");
  });

  it("omite o telefone quando não há WhatsApp configurado", () => {
    const withoutPhone = buildLocalBusinessJsonLd({
      ...siteConfig,
      contact: { ...siteConfig.contact, whatsapp: "" },
    });
    expect(withoutPhone).not.toHaveProperty("telephone");
  });
});
