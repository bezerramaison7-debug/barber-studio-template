import Link from "next/link";
import type { SiteConfig } from "@/config/types";
import { Container } from "@/components/ui/section";
import { getFullAddress } from "@/lib/site";
import { NAV_LINKS } from "./nav-links";
import { SocialLinks } from "./social-links";

export function SiteFooter({ config }: { config: SiteConfig }) {
  return (
    <footer className="border-t border-line bg-background pt-16 pb-28 sm:pb-16">
      <Container className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-4xl font-extrabold uppercase">{config.business.name}</p>
          <p className="mt-3 max-w-sm text-muted">{config.business.tagline}</p>
          <SocialLinks social={config.social} className="mt-6" />
        </div>

        <nav aria-label="Rodapé">
          <p className="font-semibold">Navegação</p>
          <ul className="mt-4 space-y-2 text-muted">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-accent">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/privacidade" className="hover:text-accent">
                Privacidade
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <p className="font-semibold">Endereço</p>
          <address className="mt-4 text-muted not-italic">{getFullAddress(config)}</address>
          <p className="mt-4 text-sm text-muted">
            Atendemos {config.serviceArea.slice(0, -1).join(", ")} e {config.serviceArea.at(-1)}.
          </p>
        </div>
      </Container>

      <Container className="mt-14 flex flex-col gap-2 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:justify-between">
        <p>
          © {config.business.name}
          {config.demo && ". Conteúdo demonstrativo e fictício."}
        </p>
        {config.demo && <p>Fotos ilustrativas: Unsplash.</p>}
      </Container>
    </footer>
  );
}
