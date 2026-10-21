import Image from "next/image";
import type { SiteConfig } from "@/config/types";
import { Container } from "@/components/ui/section";

export function About({ config }: { config: SiteConfig }) {
  const { about, images } = config;

  return (
    <section id="estudio" aria-labelledby="estudio-titulo" className="bg-surface py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="relative aspect-4/3 overflow-hidden rounded-sm lg:aspect-4/5">
          <Image
            src={images.about.src}
            alt={images.about.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div>
          <h2
            id="estudio-titulo"
            className="font-display text-5xl leading-[0.95] font-extrabold tracking-tight uppercase sm:text-6xl"
          >
            {about.title}
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted">{about.text}</p>

          <ul className="mt-10 divide-y divide-line border-y border-line">
            {about.highlights.map((item) => (
              <li key={item.title} className="py-6">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-1.5 text-muted">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
