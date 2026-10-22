import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site.config";
import { LinkButton } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Container } from "@/components/ui/section";
import { JsonLd } from "@/components/seo/json-ld";
import { formatDuration, formatPrice } from "@/lib/format";
import { getServicesWithPage } from "@/lib/plan";
import { buildServicePageJsonLd, getWhatsAppUrl } from "@/lib/site";
import { getTexts } from "@/lib/texts";

/**
 * Com Cache Components, generateStaticParams não pode devolver lista vazia. No plano essencial
 * (sem páginas de serviço) devolvemos um marcador que responde 404, como orienta a documentação.
 */
const NO_PAGES = "__sem-paginas__";

type ServicePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  const services = getServicesWithPage(siteConfig);
  return services.length > 0 ? services.map((s) => ({ slug: s.id })) : [{ slug: NO_PAGES }];
}

function findService(slug: string) {
  return getServicesWithPage(siteConfig).find((s) => s.id === slug);
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) return {};
  const city = siteConfig.address.city;
  return {
    title: `${service.name} em ${city}`,
    description: service.page!.summary,
    alternates: { canonical: `/servicos/${service.id}` },
    openGraph: { url: `/servicos/${service.id}`, title: `${service.name} | ${siteConfig.business.name}` },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) notFound();

  const texts = getTexts(siteConfig);
  const t = texts.servicePage;
  const page = service.page!;
  const others = getServicesWithPage(siteConfig).filter((s) => s.id !== service.id);
  const message = `${siteConfig.booking.greeting}\n\n*Serviço:* ${service.name}`;

  return (
    <>
      <JsonLd data={buildServicePageJsonLd(siteConfig, service)} />
      <Container className="max-w-3xl pt-36 pb-20 sm:pt-44">
        <nav aria-label="Trilha de navegação" className="text-sm text-muted">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="inline-flex min-h-11 items-center hover:text-accent">
                {t.breadcrumbHome}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/#servicos" className="inline-flex min-h-11 items-center hover:text-accent">
                {t.breadcrumbServices}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">
              {service.name}
            </li>
          </ol>
        </nav>

        <h1 className="mt-6 font-display text-6xl leading-[0.9] font-extrabold tracking-tight uppercase sm:text-7xl">
          {service.name}
        </h1>
        <p className="mt-6 text-xl leading-relaxed text-foreground/85">{page.summary}</p>

        <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-line bg-line">
          <div className="bg-surface p-5">
            <dt className="text-sm text-muted">{t.duration}</dt>
            <dd className="mt-1 font-display text-3xl font-bold">{formatDuration(service.durationMinutes)}</dd>
          </div>
          <div className="bg-surface p-5">
            <dt className="text-sm text-muted">{t.price}</dt>
            <dd className="mt-1 font-display text-3xl font-bold text-accent">
              {service.priceFrom && <span className="mr-1 font-sans text-sm font-normal">{texts.pricing.fromLabel}</span>}
              {formatPrice(service.price)}
            </dd>
          </div>
        </dl>
        {siteConfig.demo && (
          <p className="mt-3 text-sm text-muted">Valor e duração demonstrativos, apenas para apresentação do modelo.</p>
        )}

        <div className="mt-12 space-y-5 text-lg leading-relaxed text-foreground/85">
          {page.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        {page.includes && page.includes.length > 0 && (
          <section aria-labelledby="inclui-titulo" className="mt-12">
            <h2 id="inclui-titulo" className="font-display text-3xl font-bold uppercase">
              {t.includesTitle}
            </h2>
            <ul className="mt-5 divide-y divide-line border-y border-line">
              {page.includes.map((item) => (
                <li key={item} className="py-3">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section aria-labelledby="agendar-servico" className="mt-14 rounded-sm border border-line bg-surface p-6 sm:p-8">
          <h2 id="agendar-servico" className="font-display text-3xl font-bold uppercase">
            {t.ctaTitle}
          </h2>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <LinkButton href={getWhatsAppUrl(siteConfig, message)} external>
              <WhatsAppIcon className="text-xl" /> {t.ctaButton}
            </LinkButton>
            <Link href="/#servicos" className="inline-flex min-h-11 items-center underline decoration-accent underline-offset-4 hover:text-accent">
              {t.backToServices}
            </Link>
          </div>
        </section>

        {others.length > 0 && (
          <nav aria-label="Outros serviços" className="mt-14">
            <ul className="flex flex-wrap gap-3">
              {others.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/servicos/${s.id}`}
                    className="inline-flex min-h-11 items-center rounded-full border border-line px-4 hover:border-accent hover:text-accent"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </Container>
    </>
  );
}
