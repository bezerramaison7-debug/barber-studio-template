import { describe, expect, it } from "vitest";
import type { OpeningHours } from "@/config/types";
import { describeOpenStatus, getOpenStatus, groupHours, zonedNow } from "./hours";

const TZ = "America/Sao_Paulo"; // UTC-3, sem horário de verão desde 2019

const hours: OpeningHours[] = [
  { day: 0 },
  { day: 1 },
  { day: 2, open: "09:00", close: "20:00" },
  { day: 3, open: "09:00", close: "20:00" },
  { day: 4, open: "09:00", close: "20:00" },
  { day: 5, open: "09:00", close: "20:00" },
  { day: 6, open: "08:00", close: "17:00" },
];

// 21/10/2026 é uma quarta-feira.
const at = (isoLocal: string) => new Date(`${isoLocal}-03:00`);

describe("zonedNow", () => {
  it("converte o instante para o fuso do estabelecimento", () => {
    // 02:30 UTC de quinta = 23:30 de quarta em São Paulo
    expect(zonedNow(new Date("2026-10-22T02:30:00Z"), TZ)).toEqual({ day: 3, minutes: 23 * 60 + 30 });
  });
});

describe("getOpenStatus", () => {
  it("aberto durante o expediente", () => {
    expect(getOpenStatus(hours, at("2026-10-21T10:00"), TZ)).toEqual({ isOpen: true, closesAt: "20:00" });
  });

  it("fecha exatamente no horário de fechamento", () => {
    const status = getOpenStatus(hours, at("2026-10-21T20:00"), TZ);
    expect(status).toEqual({ isOpen: false, nextOpening: { day: 4, time: "09:00", isToday: false } });
  });

  it("antes de abrir, indica que abre hoje", () => {
    const status = getOpenStatus(hours, at("2026-10-21T07:30"), TZ);
    expect(status).toEqual({ isOpen: false, nextOpening: { day: 3, time: "09:00", isToday: true } });
  });

  it("pula os dias fechados (sábado à noite → terça)", () => {
    const status = getOpenStatus(hours, at("2026-10-24T18:00"), TZ);
    expect(status).toEqual({ isOpen: false, nextOpening: { day: 2, time: "09:00", isToday: false } });
  });

  it("sem nenhum horário cadastrado, retorna fechado sem previsão", () => {
    expect(getOpenStatus([{ day: 1 }], at("2026-10-21T10:00"), TZ)).toEqual({ isOpen: false, nextOpening: null });
  });
});

describe("describeOpenStatus", () => {
  it("descreve cada situação em português", () => {
    expect(describeOpenStatus({ isOpen: true, closesAt: "20:00" }, 3)).toBe("Aberto agora, fecha às 20:00");
    expect(describeOpenStatus({ isOpen: false, nextOpening: { day: 4, time: "09:00", isToday: false } }, 3)).toBe(
      "Fechado, abre amanhã às 09:00",
    );
    expect(describeOpenStatus({ isOpen: false, nextOpening: { day: 2, time: "09:00", isToday: false } }, 6)).toBe(
      "Fechado, abre terça às 09:00",
    );
    expect(describeOpenStatus({ isOpen: false, nextOpening: null }, 6)).toBe("Fechado");
  });
});

describe("groupHours", () => {
  it("agrupa dias consecutivos com o mesmo horário", () => {
    expect(groupHours(hours).map(({ label, value }) => ({ label, value }))).toEqual([
      { label: "Segunda", value: "Fechado" },
      { label: "Terça a sexta", value: "09:00–20:00" },
      { label: "Sábado", value: "08:00–17:00" },
      { label: "Domingo", value: "Fechado" },
    ]);
  });
});
