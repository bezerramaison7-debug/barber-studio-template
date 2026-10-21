import Image from "next/image";
import type { SiteTexts } from "@/config/texts";
import type { SiteConfig } from "@/config/types";
import { Section } from "@/components/ui/section";
import { InstagramIcon } from "@/components/ui/icons";
import { initials } from "@/lib/format";

export function Team({ config, texts }: { config: SiteConfig; texts: SiteTexts }) {
  return (
    <Section
      id="equipe"
      tone="graphite"
      title={texts.team.title}
      intro={
        config.demo
          ? "Perfis fictícios, para mostrar como a equipe aparece no site. Na versão final entram os profissionais reais."
          : texts.team.intro
      }
    >
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {config.team.map((member) => (
          <li key={member.id} className="flex flex-col border border-line bg-background">
            <div className="relative aspect-4/3 overflow-hidden bg-surface-raised lg:aspect-4/5">
              {member.photo ? (
                <Image
                  src={member.photo.src}
                  alt={member.photo.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              ) : (
                <div aria-hidden="true" className="flex h-full items-center justify-center">
                  <span className="font-display text-[9rem] leading-none font-extrabold text-accent/80">
                    {initials(member.name)}
                  </span>
                </div>
              )}
              {config.demo && (
                <span className="absolute top-4 left-4 rounded-sm bg-black/80 px-2.5 py-1 text-xs font-semibold text-foreground">
                  Perfil fictício
                </span>
              )}
            </div>

            <div className="flex flex-1 flex-col p-6">
              <h3 className="font-display text-3xl font-bold uppercase">{member.name}</h3>
              <p className="text-accent">{member.role}</p>
              <p className="mt-4 text-muted">{member.bio}</p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label={`Especialidades de ${member.name}`}>
                {member.specialties.map((specialty) => (
                  <li key={specialty} className="rounded-full border border-line px-3 py-1 text-sm">
                    {specialty}
                  </li>
                ))}
              </ul>
              {member.instagram && (
                <a
                  href={member.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 self-start text-sm hover:text-accent"
                >
                  <InstagramIcon /> Instagram de {member.name}
                  <span className="sr-only"> ({texts.newTab})</span>
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
