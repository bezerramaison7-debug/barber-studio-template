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

/** DDDs em uso no Brasil (plano de numeração da Anatel). */
const VALID_DDD = new Set([
  11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34, 35, 37, 38, 41, 42, 43, 44,
  45, 46, 47, 48, 49, 51, 53, 54, 55, 61, 62, 63, 64, 65, 66, 67, 68, 69, 71, 73, 74, 75, 77, 79, 81,
  82, 83, 84, 85, 86, 87, 88, 89, 91, 92, 93, 94, 95, 96, 97, 98, 99,
]);

/**
 * Número que parece de exemplo: assinante com todos os dígitos iguais, só zeros depois do 9,
 * ou sequência crescente/decrescente ("(16) 99999-9999", "90000-0000", "91234-5678").
 */
export function looksFictitious(subscriber: string): boolean {
  const rest = subscriber.replace(/^9(?=\d{8}$)/, "");
  if (/^(\d)\1+$/.test(rest)) return true;
  const ascending = "0123456789012345";
  const descending = "9876543210987654";
  return ascending.includes(rest) || descending.includes(rest);
}

/**
 * Valida um número brasileiro para WhatsApp no formato só dígitos com DDI:
 * 55 + DDD + celular (9 + 8 dígitos) ou fixo (8 dígitos começando em 2 a 5, comum no WhatsApp Business).
 * Rejeita DDD inexistente e números com cara de fictícios.
 */
export function isValidBrazilianWhatsApp(phone: string): boolean {
  const match = /^55(\d{2})(9\d{8}|[2-5]\d{7})$/.exec(phone);
  if (!match) return false;
  const [, ddd, subscriber] = match;
  return VALID_DDD.has(Number(ddd)) && !looksFictitious(subscriber!);
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
