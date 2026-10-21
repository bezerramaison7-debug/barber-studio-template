import { describe, expect, it } from "vitest";
import { formatDuration, formatPrice, initials } from "./format";

describe("formatPrice", () => {
  it("omite centavos em valores inteiros", () => {
    expect(formatPrice(45)).toBe("R$ 45");
    expect(formatPrice(150)).toBe("R$ 150");
  });

  it("mostra centavos quando existem", () => {
    expect(formatPrice(47.5)).toBe("R$ 47,50");
  });
});

describe("formatDuration", () => {
  it.each([
    [10, "10 min"],
    [60, "1 h"],
    [70, "1 h 10 min"],
    [150, "2 h 30 min"],
  ])("%i minutos → %s", (minutes, expected) => {
    expect(formatDuration(minutes)).toBe(expected);
  });
});

describe("initials", () => {
  it("usa até duas iniciais", () => {
    expect(initials("Lucas")).toBe("L");
    expect(initials("ana paula souza")).toBe("AP");
  });
});
