"use client";

import { useSyncExternalStore } from "react";
import type { OpeningHours } from "@/config/types";
import { describeOpenStatus, getOpenStatus, zonedNow } from "@/lib/hours";

// O "relógio" muda uma vez por minuto; no servidor não há hora (evita divergência na hidratação).
const subscribe = (onChange: () => void) => {
  const id = setInterval(onChange, 30_000);
  return () => clearInterval(id);
};
const getMinute = () => Math.floor(Date.now() / 60_000);
const getServerMinute = () => null;

interface OpenStatusProps {
  hours: OpeningHours[];
  timeZone: string;
  className?: string;
}

/** "Aberto agora, fecha às 20:00", calculado no fuso do estabelecimento. */
export function OpenStatus({ hours, timeZone, className = "" }: OpenStatusProps) {
  const minute = useSyncExternalStore(subscribe, getMinute, getServerMinute);
  if (minute === null) return <span className={className} aria-hidden="true" />;

  const now = new Date(minute * 60_000);
  const status = getOpenStatus(hours, now, timeZone);
  const { day } = zonedNow(now, timeZone);

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span
        aria-hidden="true"
        className={`size-2 rounded-full ${status.isOpen ? "bg-emerald-400" : "bg-muted"}`}
      />
      {describeOpenStatus(status, day)}
    </span>
  );
}
