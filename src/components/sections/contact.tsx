import type { SiteConfig } from "@/config/types";
import { LinkButton } from "@/components/ui/button";
import { MailIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { SocialLinks } from "@/components/layout/social-links";
import { groupHours } from "@/lib/hours";
import { getFullAddress, getWhatsAppUrl } from "@/lib/site";
import { MapEmbed } from "./map-embed";
import { OpenStatus } from "./open-status";

export function Contact({ config }: { config: SiteConfig }) {
  const { address, contact } = config;

  return (
    <Section
      id="contato"
      tone="graphite"
      title="Contato e localização"
      intro={`No centro de ${address.city}, com atendimento para toda a região.`}
    >
      <div className="grid gap-10 lg:grid-cols-2">
        <MapEmbed src={address.mapsEmbedUrl} title={`Mapa com a localização da ${config.business.name}`} />

        <div className="space-y-10">
          <div>
            <h3 className="flex items-center gap-2 text-xl font-semibold">
              <MapPinIcon className="text-accent" /> Endereço
            </h3>
            <address className="mt-3 text-lg text-muted not-italic">{getFullAddress(config)}</address>
            <LinkButton href={address.mapsUrl} external variant="outline" className="mt-5">
              Como chegar
            </LinkButton>
          </div>

          <div>
            <h3 className="text-xl font-semibold">Horário de funcionamento</h3>
            <OpenStatus hours={config.hours} timeZone={config.timeZone} className="mt-2 min-h-6 text-sm text-muted" />
            <table className="mt-4 w-full max-w-md text-left">
              <caption className="sr-only">Horários de atendimento por dia da semana</caption>
              <tbody className="divide-y divide-line">
                {groupHours(config.hours).map((row) => (
                  <tr key={row.label}>
                    <th scope="row" className="py-3 font-normal">
                      {row.label}
                    </th>
                    <td
                      className={`py-3 text-right tabular-nums ${row.value === "Fechado" ? "text-muted" : "text-foreground"}`}
                    >
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <h3 className="text-xl font-semibold">Fale com a gente</h3>
            <ul className="mt-4 space-y-3 text-muted">
              {contact.phoneDisplay && (
                <li className="flex items-center gap-3">
                  <PhoneIcon className="text-accent" />
                  {contact.whatsapp ? (
                    <a href={`tel:+${contact.whatsapp}`} className="hover:text-accent">
                      {contact.phoneDisplay}
                    </a>
                  ) : (
                    <span>{contact.phoneDisplay}</span>
                  )}
                </li>
              )}
              {contact.email && (
                <li className="flex items-center gap-3">
                  <MailIcon className="text-accent" />
                  <a href={`mailto:${contact.email}`} className="inline-flex min-h-11 items-center hover:text-accent">
                    {contact.email}
                  </a>
                </li>
              )}
            </ul>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <LinkButton href={getWhatsAppUrl(config)} external>
                <WhatsAppIcon className="text-xl" /> Chamar no WhatsApp
              </LinkButton>
              <SocialLinks social={config.social} />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
