import { afterEach, describe, expect, it, vi } from "vitest";
import { siteConfig } from "@/config/site.config";
import { makeRealConfig } from "@/test/fixtures";
import { assertValidSiteConfig, validateSiteConfig } from "./validate-config";

afterEach(() => vi.restoreAllMocks());

const errorsOf = (config: Parameters<typeof validateSiteConfig>[0]) => validateSiteConfig(config).errors.join("\n");

describe("modo demonstração", () => {
  it("recusa número de WhatsApp preenchido", () => {
    const config = { ...siteConfig, contact: { ...siteConfig.contact, whatsapp: "5516991234567" } };
    expect(errorsOf(config)).toMatch(/contact\.whatsapp: em modo demo/);
  });

  it("recusa telefone visível na tela", () => {
    const config = { ...siteConfig, contact: { ...siteConfig.contact, phoneDisplay: "(16) 3333-4444" } };
    expect(errorsOf(config)).toMatch(/phoneDisplay/);
  });

  it("recusa e-mail fora do domínio reservado de exemplo", () => {
    const config = { ...siteConfig, contact: { ...siteConfig.contact, email: "contato@exemplo.com.br" } };
    expect(errorsOf(config)).toMatch(/contact\.email/);
  });
});

describe("cliente real (demo: false)", () => {
  it("a fixture de cliente real é válida", () => {
    expect(validateSiteConfig(makeRealConfig()).errors).toEqual([]);
  });

  it.each([
    ["vazio", ""],
    ["sem DDI", "16991234567"],
    ["DDD inexistente", "5520991234567"],
    ["número de exemplo", "5516999999999"],
    ["sequência", "5516912345678"],
  ])("recusa WhatsApp %s", (_, whatsapp) => {
    const real = makeRealConfig();
    expect(errorsOf({ ...real, contact: { ...real.contact, whatsapp } })).toMatch(/não é um WhatsApp brasileiro válido/);
  });

  it("exige a data de confirmação do número", () => {
    const real = makeRealConfig();
    expect(errorsOf({ ...real, contact: { ...real.contact, whatsappConfirmedAt: undefined } })).toMatch(
      /whatsappConfirmedAt/,
    );
  });

  it("exige dados da LGPD e direitos das imagens", () => {
    const errors = errorsOf(
      makeRealConfig({
        legal: { controllerName: "", privacyEmail: "", privacyUpdatedAt: "ontem" },
        imageRights: { status: "ilustrativas-demo", notes: "" },
      }),
    );
    expect(errors).toMatch(/legal\.controllerName/);
    expect(errors).toMatch(/legal\.privacyEmail/);
    expect(errors).toMatch(/legal\.privacyUpdatedAt/);
    expect(errors).toMatch(/imageRights/);
  });

  it("aponta textos de demonstração esquecidos, com o caminho do campo", () => {
    const real = makeRealConfig();
    const config = { ...real, about: { ...real.about, text: "Texto fictício de exemplo." } };
    expect(errorsOf(config)).toMatch(/config\.about\.text: ainda contém texto de demonstração/);
  });
});

describe("estrutura", () => {
  it("aponta ids repetidos, categoria inexistente e horário invertido", () => {
    const errors = errorsOf({
      ...siteConfig,
      services: [...siteConfig.services, { ...siteConfig.services[0]!, categoryId: "nao-existe" }],
      hours: [{ day: 1, open: "18:00", close: "09:00" }],
    });
    expect(errors).toMatch(/id repetido "corte-classico"/);
    expect(errors).toMatch(/categoria "nao-existe" não existe/);
    expect(errors).toMatch(/dia 1 fecha antes de abrir/);
  });

  it("recusa id de serviço que não serve como endereço", () => {
    const errors = errorsOf({ ...siteConfig, services: [{ ...siteConfig.services[0]!, id: "Corte Clássico" }] });
    expect(errors).toMatch(/letras minúsculas/);
  });
});

describe("afirmações comerciais", () => {
  it("gera aviso para promessas que precisam de confirmação", () => {
    const config = { ...siteConfig, business: { ...siteConfig.business, description: "A melhor barbearia, sem fila." } };
    const { warnings, errors } = validateSiteConfig(config);
    expect(errors).toEqual([]);
    expect(warnings.join("\n")).toMatch(/business\.description: confirme com o cliente a afirmação "melhor"/);
  });
});

describe("assertValidSiteConfig", () => {
  it("interrompe o build com a lista de problemas", () => {
    const real = makeRealConfig();
    expect(() => assertValidSiteConfig({ ...real, contact: { ...real.contact, whatsapp: "" } })).toThrow(
      /problema\(s\) a corrigir antes de publicar/,
    );
  });

  it("deixa passar e só registra avisos", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const config = { ...siteConfig, business: { ...siteConfig.business, tagline: "Garantia de satisfação" } };
    expect(() => assertValidSiteConfig(config)).not.toThrow();
    expect(warn).toHaveBeenCalled();
  });
});
