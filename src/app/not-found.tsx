import Link from "next/link";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { siteConfig } from "@/config/site.config";
import { getTexts } from "@/lib/texts";

export default function NotFound() {
  const t = getTexts(siteConfig).notFound;
  return (
    <Container className="flex min-h-[70vh] flex-col justify-center pt-32 pb-20">
      <h1 className="font-display text-7xl leading-[0.9] font-extrabold uppercase sm:text-8xl">{t.title}</h1>
      <p className="mt-6 max-w-md text-lg text-muted">
        {t.text}
      </p>
      <Link href="/" className={buttonClasses("primary", "mt-10 self-start")}>
        {t.back}
      </Link>
    </Container>
  );
}
