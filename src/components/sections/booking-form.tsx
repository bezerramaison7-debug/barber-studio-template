"use client";

import { useId, useState, useSyncExternalStore, type FormEvent } from "react";
import type { SiteTexts } from "@/config/texts";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { formatDuration, formatPrice } from "@/lib/format";
import { buildBookingMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

export interface BookingFormProps {
  /** Número já validado no servidor (vazio no modo demo). Ver getWhatsAppNumber. */
  whatsapp: string;
  greeting: string;
  periods: string[];
  services: { id: string; name: string; price: number; priceFrom?: boolean; durationMinutes: number }[];
  professionals: { id: string; name: string }[];
  /** No modo demo a mensagem é só mostrada na tela; o WhatsApp não abre sozinho. */
  demo: boolean;
  labels: SiteTexts["booking"];
  fromLabel: string;
}

type Errors = Partial<Record<"name" | "service", string>>;
type Result = { url: string; message: string } | null;

const fieldClasses =
  "mt-2 block w-full rounded-sm border border-line bg-surface-raised px-4 py-3 text-base text-foreground placeholder:text-muted/70 focus:border-accent focus:outline-none aria-invalid:border-red-400";

/** Data local de hoje em "AAAA-MM-DD", para o mínimo do campo de data. */
function todayIso() {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

const noopSubscribe = () => () => {};

export function BookingForm({ whatsapp, greeting, periods, services, professionals, demo, labels, fromLabel }: BookingFormProps) {
  const id = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [result, setResult] = useState<Result>(null);
  // Calculado só no navegador: no prerender não existe "hoje".
  const minDate = useSyncExternalStore(noopSubscribe, todayIso, () => undefined);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (key: string) => String(data.get(key) ?? "").trim();

    const nextErrors: Errors = {};
    if (!value("name")) nextErrors.name = labels.nameError;
    if (!value("service")) nextErrors.service = labels.serviceError;
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
      professionalName: value("professional") || labels.noPreference,
      date: value("date"),
      period: value("period"),
      notes: value("notes"),
    });

    // Sem número válido (demo) o link não tem destinatário: nunca chega a um número fictício.
    const url = buildWhatsAppUrl(demo ? "" : whatsapp, message);
    setResult({ url, message });
    if (!demo) window.open(url, "_blank", "noopener,noreferrer");
  }

  const errorId = (field: keyof Errors) => `${id}-${field}-erro`;

  return (
    <form noValidate onSubmit={handleSubmit} className="grid gap-6" aria-describedby={`${id}-ajuda`}>
      <p id={`${id}-ajuda`} className="text-sm text-muted">
        {labels.requiredHint}
      </p>

      <div>
        <label htmlFor={`${id}-name`} className="font-semibold">
          {labels.nameLabel} *
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
            {labels.serviceLabel} *
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
              {labels.servicePlaceholder}
            </option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name} · {service.priceFrom ? `${fromLabel} ` : ""}
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

        {professionals.length > 0 && (
          <div>
            <label htmlFor={`${id}-professional`} className="font-semibold">
              {labels.professionalLabel}
            </label>
            <select id={`${id}-professional`} name="professional" defaultValue="" className={fieldClasses}>
              <option value="">{labels.noPreference}</option>
              {professionals.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-date`} className="font-semibold">
            {labels.dateLabel}
          </label>
          <input id={`${id}-date`} name="date" type="date" min={minDate} className={fieldClasses} />
        </div>

        <fieldset>
          <legend className="font-semibold">{labels.periodLabel}</legend>
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
          {labels.notesLabel}
        </label>
        <textarea
          id={`${id}-notes`}
          name="notes"
          rows={3}
          placeholder={labels.notesPlaceholder}
          className={fieldClasses}
        />
      </div>

      <Button type="submit" className="w-full sm:w-auto sm:justify-self-start">
        <WhatsAppIcon className="text-xl" />
        {demo ? "Ver mensagem de teste" : labels.submit}
      </Button>

      <div aria-live="polite">
        {result && demo && (
          <div className="rounded-sm border border-accent/60 bg-surface-raised p-4 text-sm">
            <p className="font-semibold">Demonstração: nada foi enviado.</p>
            <p className="mt-1 text-muted">
              No site de uma barbearia real, esta mensagem abriria o WhatsApp do estabelecimento:
            </p>
            {/* Sem os asteriscos de negrito, que só fazem sentido dentro do WhatsApp. */}
            <pre className="mt-3 font-sans whitespace-pre-wrap text-foreground">{result.message.replace(/\*/g, "")}</pre>
            <a
              href={result.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex min-h-11 items-center font-semibold text-accent underline underline-offset-4"
            >
              Testar no meu WhatsApp, escolhendo o contato
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          </div>
        )}
        {result && !demo && (
          <p className="rounded-sm border border-line bg-surface-raised p-4 text-sm">
            {labels.sent}{" "}
            <a
              href={result.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-accent underline underline-offset-4"
            >
              {labels.sentLink}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
