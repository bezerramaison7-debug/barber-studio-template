import type { SiteTexts } from "@/config/texts";
import type { SiteConfig } from "@/config/types";
import { LinkButton } from "@/components/ui/button";
import { MailIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { SocialLinks } from "@/components/layout/social-links";
import { groupHours } from "@/lib/hours";
import { getFullAddress, getWhatsAppNumber, getWhatsAppUrl } from "@/lib/site";
import { fillText } from "@/lib/texts";
import { MapEmbed } from "./map-embed";
import { OpenStatus } from "./open-status";

export function Contact({ config, texts }: { config: SiteConfig; texts: SiteTexts }) {
  const { address, contact } = config;
  const t = texts.contact;
  // Telefone clicável só com número válido e fora do modo demo (mesma regra do WhatsApp).
  const phone = getWhatsAppNumber(config);

  return (
    <Section
      id="contato"
      tone="graphite"
      title={t.title}
      intro={fillText(t.intro, config)}
    >
      <div className="grid gap-10 lg:grid-cols-2">
        <MapEmbed
          src={address.mapsEmbedUrl}
          title={fillText(t.mapTitle, config)}
          notice={t.mapNotice}
          buttonLabel={t.mapButton}
        />

        <div className="space-y-10">
          <div>
            <h3 className="flex items-center gap-2 text-xl font-semibold">
              <MapPinIcon className="text-accent" /> {t.addressTitle}
            </h3>
            <address className="mt-3 text-lg text-muted not-italic">{getFullAddress(config)}</address>
            <LinkButton href={address.mapsUrl} external variant="outline" className="mt-5">
              {t.directions}
            </LinkButton>
          </div>

          <div>
            <h3 className="text-xl font-semibold">{t.hoursTitle}</h3>
            <OpenStatus hours={config.hours} timeZone={config.timeZone} className="mt-2 min-h-6 text-sm text-muted" />
            <table className="mt-4 w-full max-w-md text-left">
              <caption className="sr-only">{t.hoursCaption}</caption>
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
            <h3 className="text-xl font-semibold">{t.talkTitle}</h3>
            <ul className="mt-4 space-y-3 text-muted">
              {contact.phoneDisplay && (
                <li className="flex items-center gap-3">
                  <PhoneIcon className="text-accent" />
                  {phone ? (
                    <a href={`tel:+${phone}`} className="hover:text-accent">
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
                <WhatsAppIcon className="text-xl" /> {t.whatsappButton}
              </LinkButton>
              <SocialLinks social={config.social} newTabLabel={texts.newTab} />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
