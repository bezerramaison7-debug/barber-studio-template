import type { SiteConfig } from "@/config/types";
import { Section } from "@/components/ui/section";
import { GalleryGrid } from "./gallery";

export function GallerySection({ config }: { config: SiteConfig }) {
  return (
    <Section
      id="galeria"
      title="Galeria"
      intro={
        config.demo
          ? "Fotos ilustrativas de banco de imagens livre. Na versão final, use fotos do próprio estabelecimento."
          : "Alguns trabalhos e o nosso espaço."
      }
    >
      <GalleryGrid images={config.gallery} />
    </Section>
  );
}
