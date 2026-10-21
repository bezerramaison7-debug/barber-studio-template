import type { OpeningHours, Weekday } from "@/config/types";
import { WEEKDAY_NAMES } from "./format";

export type OpenStatus =
  | { isOpen: true; closesAt: string }
  | { isOpen: false; nextOpening: { day: Weekday; time: string; isToday: boolean } | null };

function toMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h! * 60 + m!;
}

/** Dia da semana e minutos do dia em um fuso horário específico. */
export function zonedNow(date: Date, timeZone: string): { day: Weekday; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday")) as Weekday;
  return { day, minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

/** Calcula se o estabelecimento está aberto e, se não, quando abre. */
export function getOpenStatus(hours: OpeningHours[], date: Date, timeZone: string): OpenStatus {
  const { day, minutes } = zonedNow(date, timeZone);
  const byDay = new Map(hours.map((h) => [h.day, h]));

  const today = byDay.get(day);
  if (today?.open && today.close) {
    const open = toMinutes(today.open);
    const close = toMinutes(today.close);
    if (minutes >= open && minutes < close) return { isOpen: true, closesAt: today.close };
    if (minutes < open) return { isOpen: false, nextOpening: { day, time: today.open, isToday: true } };
  }

  for (let offset = 1; offset <= 7; offset++) {
    const next = ((day + offset) % 7) as Weekday;
    const entry = byDay.get(next);
    if (entry?.open && entry.close) {
      return { isOpen: false, nextOpening: { day: next, time: entry.open, isToday: false } };
    }
  }
  return { isOpen: false, nextOpening: null };
}

/** Texto curto para a interface: "Aberto agora · fecha às 20:00". */
export function describeOpenStatus(status: OpenStatus, today: Weekday): string {
  if (status.isOpen) return `Aberto agora, fecha às ${status.closesAt}`;
  if (!status.nextOpening) return "Fechado";
  const { day, time, isToday } = status.nextOpening;
  if (isToday) return `Fechado, abre hoje às ${time}`;
  if (day === (today + 1) % 7) return `Fechado, abre amanhã às ${time}`;
  return `Fechado, abre ${WEEKDAY_NAMES[day].toLowerCase()} às ${time}`;
}

/** Agrupa dias consecutivos com o mesmo horário: "Terça a sexta: 09:00–20:00". */
export function groupHours(hours: OpeningHours[]): { label: string; value: string; days: Weekday[] }[] {
  // Semana começando na segunda, como o brasileiro costuma ler.
  const order: Weekday[] = [1, 2, 3, 4, 5, 6, 0];
  const byDay = new Map(hours.map((h) => [h.day, h]));
  const valueFor = (d: Weekday) => {
    const h = byDay.get(d);
    return h?.open && h.close ? `${h.open}–${h.close}` : "Fechado";
  };

  const groups: { days: Weekday[]; value: string }[] = [];
  for (const d of order) {
    const value = valueFor(d);
    const last = groups.at(-1);
    if (last && last.value === value) last.days.push(d);
    else groups.push({ days: [d], value });
  }

  return groups.map(({ days, value }) => {
    const first = WEEKDAY_NAMES[days[0]!];
    const last = WEEKDAY_NAMES[days.at(-1)!].toLowerCase();
    const label =
      days.length === 1 ? first : days.length === 2 ? `${first} e ${last}` : `${first} a ${last}`;
    return { label, value, days };
  });
}

/** Nome do dia no formato do schema.org (`dayOfWeek`): 2 → "Tuesday". */
export function toSchemaDay(day: Weekday): string {
  return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][day]!;
}
