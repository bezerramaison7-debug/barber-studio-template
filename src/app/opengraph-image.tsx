import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site.config";
import { resolveThemeColors } from "@/lib/theme";

export const alt = siteConfig.seo.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Lida no topo do módulo para a imagem ser gerada uma única vez, no build.
const hero = await readFile(join(process.cwd(), "public", siteConfig.images.hero.src));
const heroSrc = `data:image/jpeg;base64,${hero.toString("base64")}`;

/** Imagem de compartilhamento (WhatsApp, Instagram, Facebook) gerada no build. */
export default async function OpenGraphImage() {
  const colors = resolveThemeColors(siteConfig);

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", position: "relative", background: colors.background }}>
        <img src={heroSrc} alt="" width={1200} height={630} style={{ position: "absolute", objectFit: "cover", opacity: 0.55 }} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: 72,
            width: "100%",
            color: colors.foreground,
            backgroundImage: "linear-gradient(90deg, rgba(0,0,0,0.92), rgba(0,0,0,0.2))",
          }}
        >
          <div style={{ fontSize: 34, color: colors.accent }}>{siteConfig.business.tagline}</div>
          <div style={{ fontSize: 132, fontWeight: 800, letterSpacing: -4, textTransform: "uppercase", lineHeight: 1 }}>
            {siteConfig.business.name}
          </div>
          <div style={{ marginTop: 28, fontSize: 30, opacity: 0.85 }}>Agende pelo WhatsApp</div>
        </div>
      </div>
    ),
    size,
  );
}
