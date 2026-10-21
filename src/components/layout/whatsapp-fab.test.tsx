import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { WhatsAppFab } from "./whatsapp-fab";

function scrollTo(y: number) {
  Object.defineProperty(window, "scrollY", { value: y, configurable: true });
  act(() => {
    window.dispatchEvent(new Event("scroll"));
  });
}

afterEach(() => {
  cleanup();
  scrollTo(0);
});

describe("WhatsAppFab", () => {
  it("fica oculto e fora da navegação por teclado no topo da página", () => {
    scrollTo(0);
    render(<WhatsAppFab href="https://wa.me/?text=Oi" label="Conversar no WhatsApp (abre em nova aba)" />);
    const link = screen.getByText(/conversar no whatsapp/i).closest("a")!;
    expect(link.hasAttribute("inert")).toBe(true);
    expect(link.className).toContain("opacity-0");
  });

  it("aparece depois que a pessoa rola a página", () => {
    render(<WhatsAppFab href="https://wa.me/?text=Oi" label="Conversar no WhatsApp (abre em nova aba)" />);
    scrollTo(window.innerHeight);
    const link = screen.getByText(/conversar no whatsapp/i).closest("a")!;
    expect(link.hasAttribute("inert")).toBe(false);
    expect(link.className).toContain("opacity-100");
    expect(link.getAttribute("href")).toBe("https://wa.me/?text=Oi");
  });
});
