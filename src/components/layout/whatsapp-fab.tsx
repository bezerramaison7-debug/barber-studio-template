import { WhatsAppIcon } from "@/components/ui/icons";

/** Botão flutuante de WhatsApp, sempre ao alcance do polegar no celular. */
export function WhatsAppFab({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-4 bottom-4 z-30 inline-flex size-14 items-center justify-center rounded-full bg-[#25d366] text-3xl text-black shadow-lg shadow-black/40 transition-transform hover:scale-105 sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon />
      <span className="sr-only">Conversar no WhatsApp (abre em nova aba)</span>
    </a>
  );
}
