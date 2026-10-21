import type { SiteConfig } from "@/config/types";
import { Section } from "@/components/ui/section";
import { formatDuration, formatPrice } from "@/lib/format";

export function Services({ config }: { config: SiteConfig }) {
  const featured = config.services.filter((s) => s.featured);

  return (
    <Section
      id="servicos"
      title="Serviços"
      intro="Os atendimentos mais pedidos. A tabela completa, com todos os valores, está logo abaixo."
    >
      <ul className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2">
        {featured.map((service) => (
          <li key={service.id} className="flex flex-col bg-background p-7 sm:p-9">
            <h3 className="font-display text-3xl font-bold uppercase sm:text-4xl">{service.name}</h3>
            <p className="mt-3 max-w-sm text-muted">{service.description}</p>
            <p className="mt-auto flex items-baseline justify-between gap-4 pt-8 text-sm text-muted">
              <span>{formatDuration(service.durationMinutes)}</span>
              <span className="font-display text-2xl font-bold text-accent">
                {service.priceFrom && <span className="mr-1 font-sans text-sm font-normal">a partir de</span>}
                {formatPrice(service.price)}
              </span>
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
