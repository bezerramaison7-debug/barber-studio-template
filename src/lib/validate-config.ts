import type { SiteConfig } from "@/config/types";
import { getFeatures } from "./plan";
import { isValidBrazilianWhatsApp, normalizePhone } from "./whatsapp";

export interface ValidationResult {
  /** Impedem o build. */
  errors: string[];
  /** Aparecem no log do build, mas não impedem. */
  warnings: string[];
}

const ISO_DATE = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;
const HEX = /^#[0-9a-f]{6}$/i;

/** Restos do conteúdo de demonstração que não podem ir para um site real. */
const PLACEHOLDER = /fictíci|demonstrativ|rua exemplo|example\.(com|org|net)|\bexemplo de política\b/i;

/**
 * Afirmações comerciais que exigem confirmação do cliente (Código de Defesa do Consumidor,
 * art. 37: publicidade enganosa). Geram aviso para revisão humana, não erro.
 */
const RISKY_CLAIMS = [
  /\bmelhor(es)?\b/i,
  /\bn[º°o]\.?\s?1\b|\bnúmero 1\b/i,
  /\bgarantid[oa]s?\b|\bgarantia\b/i,
  /\b100\s?%/i,
  /\bsem (fila|espera)\b/i,
  /\bpremiad[oa]s?\b|\bprêmio\b/i,
  /\blíder\b/i,
  /\bavalia(ção|ções|do)\b|\bestrelas\b|\bdepoimento/i,
  /\bmais (procurad|famos|tradicional|antig)/i,
];

/** Percorre o objeto devolvendo [caminho, texto] de cada string. */
function strings(value: unknown, path = "config"): [string, string][] {
  if (typeof value === "string") return [[path, value]];
  if (Array.isArray(value)) return value.flatMap((v, i) => strings(v, `${path}[${i}]`));
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([k, v]) => strings(v, `${path}.${k}`));
  }
  return [];
}

const duplicates = (values: string[]) => values.filter((v, i) => values.indexOf(v) !== i);

export function validateSiteConfig(config: SiteConfig): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const features = getFeatures(config);

  // ---------- Estrutura (vale para demo e para sites reais) ----------
  for (const [label, list] of [
    ["serviceCategories", config.serviceCategories.map((c) => c.id)],
    ["services", config.services.map((s) => s.id)],
    ["team", config.team.map((m) => m.id)],
  ] as const) {
    for (const id of new Set(duplicates([...list]))) errors.push(`${label}: id repetido "${id}".`);
  }

  const categories = new Set(config.serviceCategories.map((c) => c.id));
  for (const s of config.services) {
    if (!categories.has(s.categoryId)) errors.push(`services.${s.id}: categoria "${s.categoryId}" não existe.`);
    if (!(s.price > 0)) errors.push(`services.${s.id}: preço deve ser maior que zero.`);
    if (!(s.durationMinutes > 0)) errors.push(`services.${s.id}: duração deve ser maior que zero.`);
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(s.id)) errors.push(`services.${s.id}: id deve ter só letras minúsculas, números e hífens (vira o endereço da página).`);
  }
  if (!config.services.some((s) => s.featured)) errors.push("services: marque ao menos um serviço com featured: true.");

  for (const h of config.hours) {
    if (!h.open && !h.close) continue;
    if (!TIME.test(h.open ?? "") || !TIME.test(h.close ?? "")) errors.push(`hours: dia ${h.day} precisa de open e close no formato HH:MM.`);
    else if (h.close! <= h.open!) errors.push(`hours: dia ${h.day} fecha antes de abrir.`);
  }

  for (const [name, value] of Object.entries(config.theme.colors ?? {})) {
    if (!HEX.test(value)) errors.push(`theme.colors.${name}: use hexadecimal de 6 dígitos (ex.: #b39257).`);
  }
  if (config.theme.colors && Object.keys(config.theme.colors).length > 0 && !features.customColors) {
    warnings.push("theme.colors é ignorado no plano essencial: só o preset é aplicado.");
  }

  const images = [
    ...Object.values(config.images),
    ...config.gallery,
    ...config.team.flatMap((m) => (m.photo ? [m.photo] : [])),
  ];
  for (const image of images) {
    if (image.alt.trim().length < 10) errors.push(`imagem ${image.src}: texto alternativo (alt) muito curto ou vazio.`);
  }

  if (!/^https:\/\/[^/\s]+(\/[^/\s]+)*$/.test(config.url)) errors.push("url: use https:// e sem barra no final.");
  if (config.serviceArea.length === 0) errors.push("serviceArea: informe ao menos uma cidade.");

  // ---------- WhatsApp ----------
  const whatsapp = normalizePhone(config.contact.whatsapp);
  if (config.demo) {
    if (whatsapp) {
      errors.push(
        "contact.whatsapp: em modo demo o número deve ficar vazio. Para testar um número real, use demo: false com um número confirmado.",
      );
    }
    if (normalizePhone(config.contact.phoneDisplay).length >= 8) {
      errors.push("contact.phoneDisplay: em modo demo não exiba telefone (alguém pode ligar para um número de terceiros).");
    }
    const email = config.contact.email;
    if (email && !/@example\.(com|org|net)$/.test(email)) {
      errors.push("contact.email: em modo demo use um endereço @example.com (domínio que nunca entrega e-mail).");
    }
  } else {
    if (!isValidBrazilianWhatsApp(whatsapp)) {
      errors.push(
        `contact.whatsapp: "${config.contact.whatsapp}" não é um WhatsApp brasileiro válido. Use 55 + DDD + número, só dígitos (ex.: 5516991234567).`,
      );
    }
    if (!ISO_DATE.test(config.contact.whatsappConfirmedAt ?? "")) {
      errors.push(
        "contact.whatsappConfirmedAt: informe a data (AAAA-MM-DD) em que uma mensagem de teste foi recebida e confirmada pelo cliente.",
      );
    }
  }

  // ---------- Exigências para site real ----------
  if (!config.demo) {
    if (/example\.|\.vercel\.app$/.test(config.url)) warnings.push("url: ainda não é o domínio final do cliente.");
    if (!config.legal.controllerName.trim()) errors.push("legal.controllerName: informe o responsável pelo site (LGPD).");
    if (!config.legal.privacyEmail.trim()) errors.push("legal.privacyEmail: informe um e-mail para pedidos sobre dados pessoais.");
    if (!ISO_DATE.test(config.legal.privacyUpdatedAt)) errors.push("legal.privacyUpdatedAt: use a data da revisão da política (AAAA-MM-DD).");
    if (config.imageRights.status !== "confirmados" || !ISO_DATE.test(config.imageRights.confirmedAt ?? "")) {
      errors.push(
        "imageRights: confirme os direitos de uso de todas as fotos (status: \"confirmados\" e confirmedAt: AAAA-MM-DD).",
      );
    }
    for (const [path, text] of strings(config)) {
      if (PLACEHOLDER.test(text)) errors.push(`${path}: ainda contém texto de demonstração ("${text.slice(0, 60)}").`);
    }
  }

  // ---------- Afirmações comerciais (aviso nos dois modos) ----------
  for (const [path, text] of strings({ business: config.business, about: config.about, services: config.services, team: config.team, faq: config.faq, seo: config.seo, texts: config.texts })) {
    const hit = RISKY_CLAIMS.find((re) => re.test(text));
    if (hit) warnings.push(`${path.replace(/^config\./, "")}: confirme com o cliente a afirmação "${text.match(hit)![0]}".`);
  }

  return { errors, warnings };
}

/** Usado no build: interrompe a publicação de um config com erro e mostra os avisos. */
export function assertValidSiteConfig(config: SiteConfig): void {
  const { errors, warnings } = validateSiteConfig(config);
  for (const w of warnings) console.warn(`[site.config] aviso: ${w}`);
  if (errors.length > 0) {
    throw new Error(
      `site.config.ts tem ${errors.length} problema(s) a corrigir antes de publicar:\n- ${errors.join("\n- ")}`,
    );
  }
}
