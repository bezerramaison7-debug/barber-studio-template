import type { Metadata } from "next";
import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Privacidade",
  description: `Como o site da ${siteConfig.business.name} trata seus dados.`,
  alternates: { canonical: "/privacidade" },
};

export default function PrivacyPage() {
  const { business, contact } = siteConfig;

  return (
    <Container className="max-w-3xl pt-40 pb-24">
      <h1 className="font-display text-6xl leading-[0.9] font-extrabold uppercase">Privacidade</h1>
      <div className="mt-10 space-y-6 text-lg leading-relaxed text-foreground/85">
        <p>
          Este site não tem cadastro, não salva formulários e não usa cookies de publicidade. As informações
          que você escreve no formulário de agendamento ficam só no seu navegador até você tocar em enviar;
          nesse momento elas vão direto para o WhatsApp, em uma conversa com a {business.name}.
        </p>
        <p>
          O mapa da página de contato é fornecido pelo Google Maps e só é carregado quando você toca em
          “Mostrar mapa”. A partir daí valem as regras de privacidade do Google.
        </p>
        <p>
          A hospedagem pode registrar dados técnicos de acesso (como endereço IP e navegador) para segurança e
          estatísticas agregadas, conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
        </p>
        {contact.email && (
          <p>
            Dúvidas ou pedidos sobre seus dados:{" "}
            <a href={`mailto:${contact.email}`} className="text-accent underline underline-offset-4">
              {contact.email}
            </a>
            .
          </p>
        )}
        {siteConfig.demo && (
          <p className="border-l-2 border-accent pl-4 text-base text-muted">
            Texto-modelo para demonstração. Revise com o cliente antes de publicar.
          </p>
        )}
      </div>
    </Container>
  );
}
