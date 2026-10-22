import type { Plan, SiteConfig } from "@/config/types";

export interface Features {
  team: boolean;
  faq: boolean;
  /** Formulário de solicitação de horário. No essencial, um bloco com botão de WhatsApp. */
  bookingForm: boolean;
  servicePages: boolean;
  /** Ajuste de cores além do preset. */
  customColors: boolean;
}

const FEATURES: Record<Plan, Features> = {
  essencial: { team: false, faq: false, bookingForm: false, servicePages: false, customColors: false },
  premium: { team: true, faq: true, bookingForm: true, servicePages: true, customColors: true },
};

/**
 * Plano efetivo. A variável SITE_PLAN (lida no build) permite publicar a mesma demonstração
 * nas duas versões, por exemplo em dois projetos da Vercel.
 */
export function getPlan(config: Pick<SiteConfig, "plan">): Plan {
  const fromEnv = process.env.SITE_PLAN?.trim();
  return fromEnv === "essencial" || fromEnv === "premium" ? fromEnv : config.plan;
}

export function getFeatures(config: Pick<SiteConfig, "plan">): Features {
  return FEATURES[getPlan(config)];
}

/** Serviços que ganham página própria: só no premium e só se houver conteúdo. */
export function getServicesWithPage(config: Pick<SiteConfig, "plan" | "services">) {
  if (!getFeatures(config).servicePages) return [];
  return config.services.filter((s) => s.page && s.page.body.length > 0);
}
