/**
 * Tipos do arquivo central de configuração.
 * Cada cliente (barbearia) é descrito por um objeto `SiteConfig`.
 */

/** 0 = domingo … 6 = sábado (mesma convenção de `Date.getDay()`). */
export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface ImageAsset {
  /** Caminho a partir de /public (ex.: "/images/hero.jpg") ou URL liberada em next.config.ts. */
  src: string;
  /** Texto alternativo descritivo — obrigatório para acessibilidade e SEO. */
  alt: string;
  width: number;
  height: number;
}

export interface ThemeColors {
  /** Fundo principal (preto). */
  background: string;
  /** Superfícies: faixas e painéis (grafite). */
  surface: string;
  /** Superfícies elevadas: campos e cartões sobre o grafite. */
  surfaceRaised: string;
  /** Linhas e bordas. */
  border: string;
  /** Texto principal. */
  foreground: string;
  /** Texto secundário. */
  muted: string;
  /** Cor de destaque (dourado discreto). Use com moderação. */
  accent: string;
  /** Texto sobre a cor de destaque. */
  accentForeground: string;
  /** Fundo das seções claras (contraste com o preto). */
  paper: string;
  /** Texto sobre as seções claras. */
  ink: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
}

export interface Service {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  /** Duração estimada, em minutos. */
  durationMinutes: number;
  /** Preço em reais (ex.: 45 ou 47.5). */
  price: number;
  /** Mostra "a partir de" antes do preço. */
  priceFrom?: boolean;
  /** Aparece na seção "Serviços" da página inicial. */
  featured?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialties: string[];
  bio: string;
  /** Opcional: sem foto, o cartão mostra as iniciais. */
  photo?: ImageAsset;
  instagram?: string;
}

export interface OpeningHours {
  day: Weekday;
  /** "HH:MM" no fuso do estabelecimento. Omitir `open`/`close` = fechado. */
  open?: string;
  close?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SiteConfig {
  /**
   * Modo demonstrativo: mostra avisos de conteúdo fictício e impede a indexação.
   * Mude para `false` somente com dados reais e aprovados pelo cliente.
   */
  demo: boolean;

  business: {
    name: string;
    /** Usado no ícone/manifest. */
    shortName: string;
    /** Frase curta exibida no topo. */
    tagline: string;
    /** Parágrafo de apresentação. */
    description: string;
    /** Faixa de preço para o Google (ex.: "$$"). */
    priceRange: string;
  };

  /** Seção de apresentação ("Sobre"). */
  about: {
    title: string;
    text: string;
    highlights: { title: string; text: string }[];
  };

  /** URL pública final, sem barra no fim. Pode ser sobrescrita por NEXT_PUBLIC_SITE_URL. */
  url: string;

  theme: { colors: ThemeColors };

  contact: {
    /**
     * Número com DDI + DDD, apenas dígitos (ex.: "5516999999999").
     * Vazio = o WhatsApp abre a mensagem sem destinatário (seguro para demonstração).
     */
    whatsapp: string;
    /** Telefone como deve aparecer na tela. Vazio oculta. */
    phoneDisplay: string;
    email: string;
  };

  address: {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    /** Coordenadas para o mapa e o SEO local. */
    geo: { latitude: number; longitude: number };
    /** Link "Como chegar" (Google Maps). */
    mapsUrl: string;
    /** URL do iframe do mapa (Google Maps → Compartilhar → Incorporar). */
    mapsEmbedUrl: string;
  };

  /** Cidades atendidas — reforça o SEO local. */
  serviceArea: string[];

  /** Fuso horário IANA usado para calcular "aberto agora". */
  timeZone: string;
  hours: OpeningHours[];

  social: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
  };

  images: {
    hero: ImageAsset;
    about: ImageAsset;
    booking: ImageAsset;
  };

  serviceCategories: ServiceCategory[];
  services: Service[];
  team: TeamMember[];
  gallery: ImageAsset[];
  faq: FaqItem[];

  booking: {
    /** Primeira linha da mensagem enviada pelo WhatsApp. */
    greeting: string;
    periods: string[];
  };

  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}
