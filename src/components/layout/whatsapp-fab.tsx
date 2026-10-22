"use client";

import { useSyncExternalStore } from "react";
import { WhatsAppIcon } from "@/components/ui/icons";

// Aparece depois que a pessoa rola além de boa parte da primeira tela,
// para não cobrir o botão "Agendar horário" do topo no celular.
const subscribe = (onChange: () => void) => {
  window.addEventListener("scroll", onChange, { passive: true });
  window.addEventListener("resize", onChange);
  return () => {
    window.removeEventListener("scroll", onChange);
    window.removeEventListener("resize", onChange);
  };
};
const getVisible = () => window.scrollY > window.innerHeight * 0.6;
const getServerVisible = () => false;

/** Botão flutuante de WhatsApp, sempre ao alcance do polegar no celular. */
export function WhatsAppFab({ href, label }: { href: string; label: string }) {
  const visible = useSyncExternalStore(subscribe, getVisible, getServerVisible);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      inert={!visible}
      className={`fixed right-4 bottom-4 z-30 inline-flex size-14 items-center justify-center rounded-full bg-[#25d366] text-3xl text-black shadow-lg shadow-black/40 transition-[opacity,translate,scale] duration-300 hover:scale-105 motion-reduce:transition-none sm:right-6 sm:bottom-6 ${
        visible ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <WhatsAppIcon />
      <span className="sr-only">{label}</span>
    </a>
  );
}
