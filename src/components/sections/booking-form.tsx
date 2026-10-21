"use client";

import { useId, useState, useSyncExternalStore, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { formatDuration, formatPrice } from "@/lib/format";
import { buildBookingMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

export interface BookingFormProps {
  whatsapp: string;
  greeting: string;
  periods: string[];
  services: { id: string; name: string; price: number; priceFrom?: boolean; durationMinutes: number }[];
  professionals: { id: string; name: string }[];
  demo: boolean;
}

type Errors = Partial<Record<"name" | "service", string>>;

const NO_PREFERENCE = "Sem preferência";

const fieldClasses =
  "mt-2 block w-full rounded-sm border border-line bg-surface-raised px-4 py-3 text-base text-foreground placeholder:text-muted/70 focus:border-accent focus:outline-none aria-invalid:border-red-400";

/** Data local de hoje em "AAAA-MM-DD", para o mínimo do campo de data. */
function todayIso() {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

const noopSubscribe = () => () => {};

export function BookingForm({ whatsapp, greeting, periods, services, professionals, demo }: BookingFormProps) {
  const id = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [sentUrl, setSentUrl] = useState<string | null>(null);
  // Calculado só no navegador: no prerender não existe "hoje".
  const minDate = useSyncExternalStore(noopSubscribe, todayIso, () => undefined);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (key: string) => String(data.get(key) ?? "").trim();

    const nextErrors: Errors = {};
    if (!value("name")) nextErrors.name = "Escreva seu nome para o barbeiro saber quem vai chegar.";
    if (!value("service")) nextErrors.service = "Escolha um serviço.";
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = event.currentTarget.querySelector<HTMLElement>(
        `[name="${Object.keys(nextErrors)[0]}"]`,
      );
      firstInvalid?.focus();
      return;
    }

    const service = services.find((s) => s.id === value("service"));
    const message = buildBookingMessage(greeting, {
      name: value("name"),
      serviceName: service?.name,
      professionalName: value("professional") || NO_PREFERENCE,
      date: value("date"),
      period: value("period"),
      notes: value("notes"),
    });

    const url = buildWhatsAppUrl(whatsapp, message);
    setSentUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const errorId = (field: keyof Errors) => `${id}-${field}-erro`;

  return (
    <form noValidate onSubmit={handleSubmit} className="grid gap-6" aria-describedby={`${id}-ajuda`}>
      <p id={`${id}-ajuda`} className="text-sm text-muted">
        Campos com * são obrigatórios. Nada é salvo neste site: a mensagem vai direto para o WhatsApp.
      </p>

      <div>
        <label htmlFor={`${id}-name`} className="font-semibold">
          Seu nome *
        </label>
        <input
          id={`${id}-name`}
          name="name"
          type="text"
          autoComplete="given-name"
          className={fieldClasses}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? errorId("name") : undefined}
        />
        {errors.name && (
          <p id={errorId("name")} className="mt-2 text-sm text-red-300">
            {errors.name}
          </p>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-service`} className="font-semibold">
            Serviço *
          </label>
          <select
            id={`${id}-service`}
            name="service"
            defaultValue=""
            className={fieldClasses}
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? errorId("service") : undefined}
          >
            <option value="" disabled>
              Escolha um serviço
            </option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name} · {service.priceFrom ? "a partir de " : ""}
                {formatPrice(service.price)} · {formatDuration(service.durationMinutes)}
              </option>
            ))}
          </select>
          {errors.service && (
            <p id={errorId("service")} className="mt-2 text-sm text-red-300">
              {errors.service}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${id}-professional`} className="font-semibold">
            Profissional
          </label>
          <select id={`${id}-professional`} name="professional" defaultValue="" className={fieldClasses}>
            <option value="">{NO_PREFERENCE}</option>
            {professionals.map((p) => (
              <option key={p.id} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-date`} className="font-semibold">
            Data preferida
          </label>
          <input id={`${id}-date`} name="date" type="date" min={minDate} className={fieldClasses} />
        </div>

        <fieldset>
          <legend className="font-semibold">Período</legend>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {periods.map((period) => (
              <label
                key={period}
                className="flex min-h-12 cursor-pointer items-center justify-center rounded-sm border border-line bg-surface-raised px-2 text-sm has-checked:border-accent has-checked:text-accent has-focus-visible:outline-2 has-focus-visible:outline-accent"
              >
                <input type="radio" name="period" value={period} className="sr-only" />
                {period}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div>
        <label htmlFor={`${id}-notes`} className="font-semibold">
          Observações
        </label>
        <textarea
          id={`${id}-notes`}
          name="notes"
          rows={3}
          placeholder="Ex.: quero manter o comprimento em cima"
          className={fieldClasses}
        />
      </div>

      <Button type="submit" className="w-full sm:w-auto sm:justify-self-start">
        <WhatsAppIcon className="text-xl" />
        Enviar pelo WhatsApp
      </Button>

      <div aria-live="polite">
        {sentUrl && (
          <p className="rounded-sm border border-line bg-surface-raised p-4 text-sm">
            Mensagem pronta. Se o WhatsApp não abriu,{" "}
            <a
              href={sentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-accent underline underline-offset-4"
            >
              abra o WhatsApp por aqui
            </a>
            .
            {demo && !whatsapp && " Nesta demonstração não há número cadastrado: escolha um contato para testar."}
          </p>
        )}
      </div>
    </form>
  );
}
