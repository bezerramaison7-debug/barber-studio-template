/**
 * Verificações do arquivo de configuração.
 * Rode `npm test` depois de personalizar para um cliente. As mesmas regras rodam no build
 * (src/lib/validate-config.ts), então um config com erro também não é publicado.
 */
import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { validateSiteConfig } from "@/lib/validate-config";
import { siteConfig } from "./site.config";

describe("site.config", () => {
  it("passa na validação usada no build", () => {
    expect(validateSiteConfig(siteConfig).errors).toEqual([]);
  });

  it("todas as imagens locais existem", () => {
    const images = [
      ...Object.values(siteConfig.images),
      ...siteConfig.gallery,
      ...siteConfig.team.flatMap((m) => (m.photo ? [m.photo] : [])),
    ];
    for (const image of images) {
      if (image.src.startsWith("/")) {
        expect(existsSync(join(process.cwd(), "public", image.src)), image.src).toBe(true);
      }
    }
  });

  it("a demonstração não tem afirmações comerciais pendentes de confirmação", () => {
    expect(validateSiteConfig(siteConfig).warnings).toEqual([]);
  });
});
