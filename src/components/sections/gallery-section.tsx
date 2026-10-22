import type { SiteTexts } from "@/config/texts";
import type { SiteConfig } from "@/config/types";
import { Section } from "@/components/ui/section";
import { GalleryGrid } from "./gallery";

export function GallerySection({ config, texts }: { config: SiteConfig; texts: SiteTexts }) {
  return (
    <Section
      id="galeria"
      title={texts.gallery.title}
      intro={
        config.demo
          ? "Fotos ilustrativas de banco de imagens livre. Na versão final, use fotos do próprio estabelecimento."
          : texts.gallery.intro
      }
    >
      <GalleryGrid images={config.gallery} labels={texts.gallery} />
    </Section>
  );
}
