const brlWhole = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

const brlCents = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
});

/** 45 → "R$ 45" · 47.5 → "R$ 47,50". Espaço comum no lugar do NBSP do Intl. */
export function formatPrice(value: number): string {
  const formatter = Number.isInteger(value) ? brlWhole : brlCents;
  return formatter.format(value).replace(/ /g, " ");
}

/** 40 → "40 min" · 60 → "1 h" · 150 → "2 h 30 min". */
export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (hours === 0) return `${rest} min`;
  if (rest === 0) return `${hours} h`;
  return `${hours} h ${rest} min`;
}

/** Iniciais para avatares sem foto: "Lucas" → "L" · "Ana Paula" → "AP". */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join("");
}

export const WEEKDAY_NAMES = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
] as const;
