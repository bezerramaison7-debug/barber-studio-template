import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { defaultTexts } from "@/config/texts";
import { BookingForm, type BookingFormProps } from "./booking-form";

const props: BookingFormProps = {
  whatsapp: "5516999990000",
  greeting: "Olá!",
  periods: ["Manhã", "Tarde"],
  demo: false,
  services: [{ id: "degrade", name: "Degradê", price: 50, durationMinutes: 45 }],
  professionals: [{ id: "lucas", name: "Lucas" }],
  labels: defaultTexts.booking,
  fromLabel: defaultTexts.pricing.fromLabel,
};

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("BookingForm", () => {
  it("mostra os erros e não abre o WhatsApp sem nome e serviço", async () => {
    const open = vi.spyOn(window, "open").mockImplementation(() => null);
    render(<BookingForm {...props} />);

    await userEvent.click(screen.getByRole("button", { name: /enviar pelo whatsapp/i }));

    expect(screen.getByText(/escreva seu nome/i)).toBeTruthy();
    expect(screen.getByText(/escolha um serviço\./i)).toBeTruthy();
    expect(screen.getByLabelText(/seu nome/i).getAttribute("aria-invalid")).toBe("true");
    expect(document.activeElement).toBe(screen.getByLabelText(/seu nome/i));
    expect(open).not.toHaveBeenCalled();
  });

  it("abre o WhatsApp com a mensagem montada a partir do formulário", async () => {
    const open = vi.spyOn(window, "open").mockImplementation(() => null);
    render(<BookingForm {...props} />);

    await userEvent.type(screen.getByLabelText(/seu nome/i), "João");
    await userEvent.selectOptions(screen.getByLabelText(/serviço/i), "degrade");
    await userEvent.selectOptions(screen.getByLabelText(/profissional/i), "Lucas");
    await userEvent.click(screen.getByLabelText("Tarde"));
    await userEvent.click(screen.getByRole("button", { name: /enviar pelo whatsapp/i }));

    expect(open).toHaveBeenCalledTimes(1);
    const url = new URL(open.mock.calls[0]![0] as string);
    expect(url.origin + url.pathname).toBe("https://wa.me/5516999990000");
    expect(url.searchParams.get("text")).toBe(
      "Olá!\n\n*Nome:* João\n*Serviço:* Degradê\n*Profissional:* Lucas\n*Período:* Tarde",
    );
    expect(screen.getByRole("link", { name: /abra o whatsapp por aqui/i })).toBeTruthy();
  });

  it("usa 'Sem preferência' quando nenhum profissional é escolhido", async () => {
    const open = vi.spyOn(window, "open").mockImplementation(() => null);
    render(<BookingForm {...props} />);

    await userEvent.type(screen.getByLabelText(/seu nome/i), "Ana");
    await userEvent.selectOptions(screen.getByLabelText(/serviço/i), "degrade");
    await userEvent.click(screen.getByRole("button", { name: /enviar pelo whatsapp/i }));

    const text = new URL(open.mock.calls[0]![0] as string).searchParams.get("text");
    expect(text).toContain("*Profissional:* Sem preferência");
  });

  it("no modo demo não abre o WhatsApp e mostra a mensagem na tela", async () => {
    const open = vi.spyOn(window, "open").mockImplementation(() => null);
    render(<BookingForm {...props} demo whatsapp="5516999990000" />);

    await userEvent.type(screen.getByLabelText(/seu nome/i), "Ana");
    await userEvent.selectOptions(screen.getByLabelText(/serviço/i), "degrade");
    await userEvent.click(screen.getByRole("button", { name: /ver mensagem de teste/i }));

    expect(open).not.toHaveBeenCalled();
    expect(screen.getByText(/demonstração: nada foi enviado/i)).toBeTruthy();
    const test = screen.getByRole("link", { name: /testar no meu whatsapp/i });
    // Mesmo com um número recebido por engano, o link de teste não tem destinatário.
    expect(test.getAttribute("href")).toMatch(/^https:\/\/wa\.me\/\?text=/);
  });
});
