import type { SiteConfig, ThemeColors, ThemePreset } from "@/config/types";
import { getFeatures } from "./plan";

/** Paletas prontas. Todas mantêm contraste ≥ 4.5:1 entre texto e fundo. */
export const THEME_PRESETS: Record<ThemePreset, ThemeColors> = {
  // Preto, grafite, branco e dourado discreto (identidade da demonstração).
  classico: {
    background: "#000000",
    surface: "#17181a",
    surfaceRaised: "#232427",
    border: "#34353a",
    foreground: "#f5f4f0",
    muted: "#a3a29c",
    accent: "#b39257",
    accentForeground: "#000000",
    paper: "#f5f4f0",
    ink: "#17181a",
  },
  // Grafite frio com destaque prata.
  grafite: {
    background: "#0e0f11",
    surface: "#1b1d21",
    surfaceRaised: "#272a2f",
    border: "#3a3e45",
    foreground: "#f2f3f5",
    muted: "#a2a7af",
    accent: "#c2c7cf",
    accentForeground: "#0e0f11",
    paper: "#eef0f2",
    ink: "#1b1d21",
  },
  // Marrom escuro com destaque cobre.
  carvalho: {
    background: "#120d0a",
    surface: "#1e1713",
    surfaceRaised: "#2a211b",
    border: "#40332a",
    foreground: "#f6f1ea",
    muted: "#b3a79a",
    accent: "#c0844f",
    accentForeground: "#120d0a",
    paper: "#f4ede3",
    ink: "#1e1713",
  },
};

/** Cores finais: preset do config + ajustes cor a cor (somente no premium). */
export function resolveThemeColors(config: Pick<SiteConfig, "theme" | "plan">): ThemeColors {
  const base = THEME_PRESETS[config.theme.preset];
  const overrides = getFeatures(config).customColors ? config.theme.colors : undefined;
  return { ...base, ...overrides };
}

/** Converte as cores em variáveis CSS lidas pelo Tailwind (ver globals.css). */
export function themeToCssVars(colors: ThemeColors): Record<string, string> {
  const toKebab = (key: string) => key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
  return Object.fromEntries(
    Object.entries(colors).map(([key, value]) => [`--brand-${toKebab(key)}`, value]),
  );
}

/** Razão de contraste WCAG entre duas cores hexadecimais (1 a 21). */
export function contrastRatio(a: string, b: string): number {
  const luminance = (hex: string) => {
    const [r, g, bl] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
    const lin = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
    return 0.2126 * lin(r!) + 0.7152 * lin(g!) + 0.0722 * lin(bl!);
  };
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi! + 0.05) / (lo! + 0.05);
}
