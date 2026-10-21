/**
 * Verificações do arquivo de configuração.
 * Rode `npm test` depois de personalizar para um cliente: estes testes pegam
 * os erros mais comuns (ids repetidos, horário inválido, imagem sem alt, etc.).
 */
import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { siteConfig } from "./site.config";

const unique = (values: string[]) => new Set(values).size === values.length;
const publicFile = (src: string) => join(process.cwd(), "public", src);

describe("site.config", () => {
  it("tem ids únicos em categorias, serviços e equipe", () => {
    expect(unique(siteConfig.serviceCategories.map((c) => c.id))).toBe(true);
    expect(unique(siteConfig.services.map((s) => s.id))).toBe(true);
    expect(unique(siteConfig.team.map((m) => m.id))).toBe(true);
  });

  it("cada serviço pertence a uma categoria existente e tem preço e duração válidos", () => {
    const categories = new Set(siteConfig.serviceCategories.map((c) => c.id));
    for (const service of siteConfig.services) {
      expect(categories, service.id).toContain(service.categoryId);
      expect(service.price, service.id).toBeGreaterThan(0);
      expect(service.durationMinutes, service.id).toBeGreaterThan(0);
    }
  });

  it("tem ao menos um serviço em destaque", () => {
    expect(siteConfig.services.some((s) => s.featured)).toBe(true);
  });

  it("horários usam HH:MM e fecham depois de abrir", () => {
    const time = /^([01]\d|2[0-3]):[0-5]\d$/;
    for (const h of siteConfig.hours) {
      if (!h.open && !h.close) continue;
      expect(h.open, `dia ${h.day}`).toMatch(time);
      expect(h.close, `dia ${h.day}`).toMatch(time);
      expect(h.close! > h.open!, `dia ${h.day}`).toBe(true);
    }
  });

  it("WhatsApp, quando preenchido, tem só dígitos com DDI 55", () => {
    const { whatsapp } = siteConfig.contact;
    if (whatsapp) expect(whatsapp).toMatch(/^55\d{10,11}$/);
  });

  it("em modo demonstração, não envia nada para números ou e-mails reais", () => {
    if (!siteConfig.demo) return;
    // Sem número, o WhatsApp abre sem destinatário. Para testar um número real, use demo: false.
    expect(siteConfig.contact.whatsapp).toBe("");
    if (siteConfig.contact.email) expect(siteConfig.contact.email).toMatch(/@example\.(com|org|net)$/);
  });

  it("cores são hexadecimais", () => {
    for (const [name, value] of Object.entries(siteConfig.theme.colors)) {
      expect(value, name).toMatch(/^#[0-9a-f]{6}$/i);
    }
  });

  it("todas as imagens locais existem e têm texto alternativo", () => {
    const images = [
      ...Object.values(siteConfig.images),
      ...siteConfig.gallery,
      ...siteConfig.team.flatMap((m) => (m.photo ? [m.photo] : [])),
    ];
    for (const image of images) {
      expect(image.alt.trim().length, image.src).toBeGreaterThan(10);
      if (image.src.startsWith("/")) expect(existsSync(publicFile(image.src)), image.src).toBe(true);
    }
  });

  it("URL do site é absoluta e sem barra final", () => {
    expect(siteConfig.url).toMatch(/^https:\/\/[^/]+(\/[^/]+)*$/);
  });
});
