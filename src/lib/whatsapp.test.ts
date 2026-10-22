import { describe, expect, it } from "vitest";
import {
  buildBookingMessage,
  buildWhatsAppUrl,
  formatIsoDate,
  isValidBrazilianWhatsApp,
  looksFictitious,
  normalizePhone,
} from "./whatsapp";

describe("normalizePhone", () => {
  it("remove tudo que não é dígito", () => {
    expect(normalizePhone("+55 (16) 99999-0000")).toBe("5516999990000");
  });
});

describe("buildWhatsAppUrl", () => {
  it("monta o link wa.me com a mensagem codificada", () => {
    expect(buildWhatsAppUrl("5516999990000", "Olá! Corte & barba")).toBe(
      "https://wa.me/5516999990000?text=Ol%C3%A1!%20Corte%20%26%20barba",
    );
  });

  it("sem número, gera link que deixa a pessoa escolher o contato", () => {
    expect(buildWhatsAppUrl("", "Oi")).toBe("https://wa.me/?text=Oi");
  });

  it("sem mensagem, gera só o link do número", () => {
    expect(buildWhatsAppUrl("16 99999-0000")).toBe("https://wa.me/16999990000");
  });
});

describe("formatIsoDate", () => {
  it("converte para o formato brasileiro", () => {
    expect(formatIsoDate("2026-10-23")).toBe("23/10/2026");
  });

  it("devolve o texto original se não for ISO", () => {
    expect(formatIsoDate("amanhã")).toBe("amanhã");
  });
});

describe("buildBookingMessage", () => {
  it("lista os campos preenchidos, um por linha", () => {
    const message = buildBookingMessage("Olá!", {
      name: " João ",
      serviceName: "Degradê",
      professionalName: "Sem preferência",
      date: "2026-10-23",
      period: "Tarde",
    });

    expect(message).toBe(
      [
        "Olá!",
        "",
        "*Nome:* João",
        "*Serviço:* Degradê",
        "*Profissional:* Sem preferência",
        "*Data:* 23/10/2026",
        "*Período:* Tarde",
      ].join("\n"),
    );
  });

  it("omite campos vazios ou só com espaços", () => {
    const message = buildBookingMessage("Olá!", { name: "Ana", notes: "   " });
    expect(message).toBe("Olá!\n\n*Nome:* Ana");
  });
});

describe("isValidBrazilianWhatsApp", () => {
  it.each(["5516991234567", "5511958342716", "551633334444"])("aceita %s", (phone) => {
    expect(isValidBrazilianWhatsApp(phone)).toBe(true);
  });

  it.each([
    ["sem DDI", "16991234567"],
    ["DDI de outro país", "1416991234567"],
    ["DDD inexistente", "5523991234567"],
    ["celular sem o 9", "551681234567"],
    ["fixo começando com 7", "551673334444"],
    ["com máscara", "+55 (16) 99123-4567"],
    ["todos iguais", "5516999999999"],
    ["só zeros", "5516900000000"],
    ["sequência", "5516912345678"],
  ])("recusa %s", (_, phone) => {
    expect(isValidBrazilianWhatsApp(phone)).toBe(false);
  });
});

describe("looksFictitious", () => {
  it("identifica padrões de número de exemplo", () => {
    expect(looksFictitious("900000000")).toBe(true);
    expect(looksFictitious("987654321")).toBe(true);
    expect(looksFictitious("991234567")).toBe(false);
  });
});
