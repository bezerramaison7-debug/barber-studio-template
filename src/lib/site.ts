import type { SiteConfig, ThemeColors } from "@/config/types";
import { toSchemaDay } from "./hours";
import { buildWhatsAppUrl } from "./whatsapp";

/**
 * URL pública, em ordem de prioridade:
 * 1. NEXT_PUBLIC_SITE_URL (definida por nós na Vercel);
 * 2. VERCEL_PROJECT_PRODUCTION_URL (injetada pela própria Vercel, sem "https://");
 * 3. `url` do config.
 */
export function getSiteUrl(config: SiteConfig): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  const url = explicit || (vercel ? `https://${vercel}` : config.url);
  return url.replace(/\/+$/, "");
}

export function getFullAddress(config: SiteConfig): string {
  const { street, neighborhood, city, state, postalCode } = config.address;
  return `${street}, ${neighborhood}, ${city}/${state}, CEP ${postalCode}`;
}

export function getWhatsAppUrl(config: SiteConfig, message?: string): string {
  return buildWhatsAppUrl(config.contact.whatsapp, message ?? config.booking.greeting);
}

/** Converte as cores do config em variáveis CSS lidas pelo Tailwind (ver globals.css). */
export function themeToCssVars(colors: ThemeColors): Record<string, string> {
  const toKebab = (key: string) => key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
  return Object.fromEntries(
    Object.entries(colors).map(([key, value]) => [`--brand-${toKebab(key)}`, value]),
  );
}

/**
 * Dados estruturados (schema.org/BarberShop) para SEO local.
 * Propositalmente sem avaliações (`aggregateRating`/`review`): só devem existir
 * quando houver avaliações reais e verificáveis.
 */
export function buildLocalBusinessJsonLd(config: SiteConfig) {
  const url = getSiteUrl(config);
  const { address, contact, business } = config;
  const sameAs = Object.values(config.social).filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "BarberShop",
    "@id": `${url}/#barbearia`,
    name: business.name,
    description: business.description,
    url,
    image: `${url}${config.images.hero.src}`,
    priceRange: business.priceRange,
    ...(contact.whatsapp ? { telephone: `+${contact.whatsapp}` } : {}),
    ...(contact.email ? { email: contact.email } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.state,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: address.geo.latitude,
      longitude: address.geo.longitude,
    },
    hasMap: address.mapsUrl,
    areaServed: config.serviceArea.map((name) => ({ "@type": "City", name })),
    openingHoursSpecification: config.hours
      .filter((h) => h.open && h.close)
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: toSchemaDay(h.day),
        opens: h.open,
        closes: h.close,
      })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Serviços",
      itemListElement: config.services.map((service) => ({
        "@type": "Offer",
        priceCurrency: "BRL",
        price: service.price.toFixed(2),
        itemOffered: { "@type": "Service", name: service.name, description: service.description },
      })),
    },
    ...(sameAs.length ? { sameAs } : {}),
  };
}
