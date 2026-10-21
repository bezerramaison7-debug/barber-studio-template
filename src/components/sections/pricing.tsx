import type { SiteTexts } from "@/config/texts";
import type { SiteConfig } from "@/config/types";
import { Container } from "@/components/ui/section";
import { formatDuration, formatPrice } from "@/lib/format";

/**
 * Tabela de preços no formato de um quadro clássico de barbearia:
 * nome do serviço, linha pontilhada e valor.
 */
export function Pricing({ config, texts }: { config: SiteConfig; texts: SiteTexts }) {
  const groups = config.serviceCategories
    .map((category) => ({
      category,
      services: config.services.filter((s) => s.categoryId === category.id),
    }))
    .filter((group) => group.services.length > 0);

  return (
    <section id="precos" aria-labelledby="precos-titulo" className="bg-paper py-20 text-ink sm:py-28">
      <Container>
        <div className="border-4 border-double border-ink/80 p-5 sm:p-12 lg:p-16">
          <header className="flex flex-col gap-4 border-b border-ink/20 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <h2
              id="precos-titulo"
              className="font-display text-6xl leading-[0.85] font-extrabold tracking-tight uppercase sm:text-8xl"
            >
              {texts.pricing.title}
            </h2>
            {config.demo && (
              <p className="max-w-56 text-sm text-ink/70 sm:text-right">
                Valores demonstrativos, apenas para apresentação do modelo.
              </p>
            )}
          </header>

          <div className="mt-10 grid gap-x-16 gap-y-12 md:grid-cols-2">
            {groups.map(({ category, services }) => (
              <section key={category.id} aria-labelledby={`preco-${category.id}`}>
                <h3
                  id={`preco-${category.id}`}
                  className="font-display text-2xl font-bold tracking-wide text-ink/60 uppercase"
                >
                  {category.name}
                </h3>
                <ul className="mt-4 space-y-5">
                  {services.map((service) => (
                    <li key={service.id}>
                      <p className="flex items-baseline gap-3 text-lg font-semibold sm:text-xl">
                        <span>{service.name}</span>
                        <span aria-hidden="true" className="price-leader" />
                        <span className="shrink-0 text-right font-display text-2xl font-extrabold tabular-nums">
                          {/* Em telas estreitas, "a partir de" vai para cima do valor para não estourar a moldura. */}
                          {service.priceFrom && (
                            <span className="block font-sans text-xs leading-none font-normal text-ink/70 sm:mr-1 sm:inline sm:text-sm">
                              {texts.pricing.fromLabel}
                            </span>
                          )}
                          {formatPrice(service.price)}
                        </span>
                      </p>
                      <p className="mt-1 text-sm text-ink/65">
                        {formatDuration(service.durationMinutes)}. {service.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
