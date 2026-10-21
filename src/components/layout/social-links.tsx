import type { SiteConfig } from "@/config/types";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "@/components/ui/icons";

const NETWORKS = [
  { key: "instagram", label: "Instagram", Icon: InstagramIcon },
  { key: "facebook", label: "Facebook", Icon: FacebookIcon },
  { key: "tiktok", label: "TikTok", Icon: TikTokIcon },
] as const;

/** Ícones das redes configuradas; redes sem URL não aparecem. */
interface SocialLinksProps {
  social: SiteConfig["social"];
  newTabLabel?: string;
  className?: string;
}

export function SocialLinks({ social, newTabLabel = "abre em nova aba", className = "" }: SocialLinksProps) {
  const available = NETWORKS.filter(({ key }) => social[key]);
  if (available.length === 0) return null;

  return (
    <ul className={`flex gap-2 ${className}`}>
      {available.map(({ key, label, Icon }) => (
        <li key={key}>
          <a
            href={social[key]}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex size-11 items-center justify-center rounded-full border border-line text-xl transition-colors hover:border-accent hover:text-accent"
          >
            <Icon />
            <span className="sr-only">{`${label} (${newTabLabel})`}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
