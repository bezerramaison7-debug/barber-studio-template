export interface BookingRequest {
  name: string;
  serviceName?: string;
  professionalName?: string;
  /** Data em "AAAA-MM-DD", como vem do <input type="date">. */
  date?: string;
  period?: string;
  notes?: string;
}

/** Mantém apenas dígitos: "+55 (16) 99999-0000" → "5516999990000". */
export function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, "");
}

/**
 * Link oficial de clique para conversar (wa.me).
 * Sem número, o WhatsApp abre a mensagem e deixa a pessoa escolher o contato —
 * é o comportamento usado no modo demonstrativo.
 */
export function buildWhatsAppUrl(phone: string, message?: string): string {
  const digits = normalizePhone(phone);
  const base = `https://wa.me/${digits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** "2026-10-23" → "23/10/2026". Retorna o texto original se não for uma data ISO. */
export function formatIsoDate(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  return match ? `${match[3]}/${match[2]}/${match[1]}` : iso;
}

/** Monta a mensagem de agendamento, uma informação por linha, omitindo campos vazios. */
export function buildBookingMessage(greeting: string, request: BookingRequest): string {
  const lines: string[] = [greeting, ""];
  const add = (label: string, value?: string) => {
    const trimmed = value?.trim();
    if (trimmed) lines.push(`*${label}:* ${trimmed}`);
  };

  add("Nome", request.name);
  add("Serviço", request.serviceName);
  add("Profissional", request.professionalName);
  add("Data", request.date ? formatIsoDate(request.date) : undefined);
  add("Período", request.period);
  add("Observações", request.notes);

  return lines.join("\n");
}
