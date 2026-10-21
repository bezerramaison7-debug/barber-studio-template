import { describe, expect, it } from "vitest";
import { buildBookingMessage, buildWhatsAppUrl, formatIsoDate, normalizePhone } from "./whatsapp";

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
