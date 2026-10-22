import Link from "next/link";
import type { SiteTexts } from "@/config/texts";
import type { SiteConfig } from "@/config/types";
import { Section } from "@/components/ui/section";
import { formatDuration, formatPrice } from "@/lib/format";

interface ServicesProps {
  config: SiteConfig;
  texts: SiteTexts;
  /** Ids dos serviços que têm página própria (plano premium). */
  pageIds: Set<string>;
}

export function Services({ config, texts, pageIds }: ServicesProps) {
  const featured = config.services.filter((s) => s.featured);

  return (
    <Section id="servicos" title={texts.services.title} intro={texts.services.intro}>
      <ul className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2">
        {featured.map((service) => (
          <li key={service.id} className="flex flex-col bg-background p-7 sm:p-9">
            <h3 className="font-display text-3xl font-bold uppercase sm:text-4xl">{service.name}</h3>
            <p className="mt-3 max-w-sm text-muted">{service.description}</p>
            <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-8 text-sm text-muted">
              <p className="flex items-baseline gap-4">
                <span>{formatDuration(service.durationMinutes)}</span>
                <span className="font-display text-2xl font-bold text-accent">
                  {service.priceFrom && (
                    <span className="mr-1 font-sans text-sm font-normal">{texts.pricing.fromLabel}</span>
                  )}
                  {formatPrice(service.price)}
                </span>
              </p>
              {pageIds.has(service.id) && (
                <Link
                  href={`/servicos/${service.id}`}
                  className="inline-flex min-h-11 items-center font-semibold text-foreground underline decoration-accent underline-offset-4 hover:text-accent"
                >
                  {texts.services.detailsLink}
                  <span className="sr-only">: {service.name}</span>
                </Link>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
