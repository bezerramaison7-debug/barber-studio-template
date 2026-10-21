import { siteConfig } from "@/config/site.config";
import { About } from "@/components/sections/about";
import { Booking } from "@/components/sections/booking";
import { Contact } from "@/components/sections/contact";
import { Faq } from "@/components/sections/faq";
import { GallerySection } from "@/components/sections/gallery-section";
import { Hero } from "@/components/sections/hero";
import { Pricing } from "@/components/sections/pricing";
import { Services } from "@/components/sections/services";
import { Team } from "@/components/sections/team";
import { buildLocalBusinessJsonLd } from "@/lib/site";

/** Serializa JSON-LD escapando "<" para impedir injeção de HTML. */
function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export default function HomePage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: siteConfig.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <JsonLd data={buildLocalBusinessJsonLd(siteConfig)} />
      <JsonLd data={faqJsonLd} />
      <Hero config={siteConfig} />
      <About config={siteConfig} />
      <Services config={siteConfig} />
      <Pricing config={siteConfig} />
      <Team config={siteConfig} />
      <GallerySection config={siteConfig} />
      <Booking config={siteConfig} />
      <Faq config={siteConfig} />
      <Contact config={siteConfig} />
    </>
  );
}
