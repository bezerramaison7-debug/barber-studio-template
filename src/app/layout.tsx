import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Instrument_Sans } from "next/font/google";
import type { CSSProperties, ReactNode } from "react";
import { siteConfig } from "@/config/site.config";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { WhatsAppFab } from "@/components/layout/whatsapp-fab";
import { getSiteUrl, getWhatsAppUrl, themeToCssVars } from "@/lib/site";
import "./globals.css";

// Display condensado, no espírito dos letreiros de barbearia.
const display = Big_Shoulders({
  variable: "--font-display-face",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
  // O Next não tem métricas de fallback para esta fonte; usamos uma condensada do sistema.
  adjustFontFallback: false,
  fallback: ["Arial Narrow", "sans-serif"],
});

const body = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = getSiteUrl(siteConfig);

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteConfig.seo.title, template: `%s | ${siteConfig.business.name}` },
  description: siteConfig.seo.description,
  keywords: siteConfig.seo.keywords,
  applicationName: siteConfig.business.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: siteConfig.business.name,
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
  },
  twitter: { card: "summary_large_image" },
  // Conteúdo fictício não deve ser indexado pelo Google.
  robots: siteConfig.demo ? { index: false, follow: false } : { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: siteConfig.theme.colors.background,
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${display.variable} ${body.variable} antialiased`}
      style={themeToCssVars(siteConfig.theme.colors) as CSSProperties}
    >
      <body className="flex min-h-dvh flex-col">
        <a
          href="#conteudo"
          className="sr-only z-50 bg-accent px-4 py-3 font-semibold text-accent-foreground focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
        >
          Pular para o conteúdo
        </a>
        <SiteHeader name={siteConfig.business.name} demo={siteConfig.demo} />
        <main id="conteudo" className="flex-1">
          {children}
        </main>
        <SiteFooter config={siteConfig} />
        <WhatsAppFab href={getWhatsAppUrl(siteConfig)} />
      </body>
    </html>
  );
}
