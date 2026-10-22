import type { SiteTexts } from "@/config/texts";
import type { SiteConfig } from "@/config/types";
import { ChevronIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";

export function Faq({ config, texts }: { config: SiteConfig; texts: SiteTexts }) {
  return (
    <Section id="duvidas" title={texts.faq.title}>
      <div className="max-w-3xl divide-y divide-line border-y border-line">
        {config.faq.map((item) => (
          <details key={item.question} className="group py-2">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-3 text-lg font-semibold [&::-webkit-details-marker]:hidden">
              {item.question}
              <ChevronIcon className="shrink-0 text-xl text-accent transition-transform group-open:rotate-90 motion-reduce:transition-none" />
            </summary>
            <p className="pb-5 text-muted">{item.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
