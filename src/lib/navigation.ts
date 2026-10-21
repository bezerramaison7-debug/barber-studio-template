import type { SiteTexts } from "@/config/texts";
import type { SiteConfig } from "@/config/types";
import { getFeatures } from "./plan";

export interface NavLink {
  href: string;
  label: string;
}

/** Âncora da área de agendamento (formulário no premium, bloco de WhatsApp no essencial). */
export const BOOKING_HREF = "/#agendar";

/** Links do menu de acordo com o plano: seções desligadas não aparecem. */
export function getNavLinks(config: Pick<SiteConfig, "plan">, texts: SiteTexts): NavLink[] {
  const features = getFeatures(config);
  return [
    { href: "/#servicos", label: texts.nav.services },
    { href: "/#precos", label: texts.nav.pricing },
    ...(features.team ? [{ href: "/#equipe", label: texts.nav.team }] : []),
    { href: "/#galeria", label: texts.nav.gallery },
    ...(features.faq ? [{ href: "/#duvidas", label: texts.nav.faq }] : []),
    { href: "/#contato", label: texts.nav.contact },
  ];
}
