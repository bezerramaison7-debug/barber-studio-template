import Image from "next/image";
import type { SiteConfig } from "@/config/types";
import { Container } from "@/components/ui/section";
import { BookingForm } from "./booking-form";

const STEPS = [
  "Preencha o serviço, o profissional e o melhor período.",
  "Toque em enviar: o WhatsApp abre com a mensagem pronta.",
  "A barbearia responde na conversa confirmando o horário.",
];

export function Booking({ config }: { config: SiteConfig }) {
  return (
    <section id="agendar" aria-labelledby="agendar-titulo" className="bg-surface py-20 sm:py-28">
      <Container className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <h2
            id="agendar-titulo"
            className="font-display text-5xl leading-[0.95] font-extrabold tracking-tight uppercase sm:text-6xl"
          >
            Agende seu horário
          </h2>
          <p className="mt-5 max-w-md text-lg text-muted">Leva menos de um minuto e não precisa de cadastro.</p>

          <ol className="mt-10 space-y-6">
            {STEPS.map((step, i) => (
              <li key={step} className="flex gap-5">
                <span
                  aria-hidden="true"
                  className="flex size-10 shrink-0 items-center justify-center rounded-full border border-accent font-display text-xl font-bold text-accent"
                >
                  {i + 1}
                </span>
                <p className="pt-1.5">{step}</p>
              </li>
            ))}
          </ol>

          <div className="relative mt-12 hidden aspect-3/2 overflow-hidden rounded-sm lg:block">
            <Image
              src={config.images.booking.src}
              alt={config.images.booking.alt}
              fill
              sizes="40vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="rounded-sm border border-line bg-background p-6 sm:p-10">
          <BookingForm
            whatsapp={config.contact.whatsapp}
            greeting={config.booking.greeting}
            periods={config.booking.periods}
            demo={config.demo}
            services={config.services.map(({ id, name, price, priceFrom, durationMinutes }) => ({
              id,
              name,
              price,
              priceFrom,
              durationMinutes,
            }))}
            professionals={config.team.map(({ id, name }) => ({ id, name }))}
          />
        </div>
      </Container>
    </section>
  );
}
