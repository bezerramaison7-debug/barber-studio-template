import type { Metadata } from "next";
import type { ReactNode } from "react";
import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/ui/section";
import { getFeatures } from "@/lib/plan";
import { formatIsoDate } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Privacidade",
  description: `Como o site da ${siteConfig.business.name} trata dados pessoais.`,
  alternates: { canonical: "/privacidade" },
};

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="font-display text-3xl font-bold uppercase">{title}</h2>
      {children}
    </section>
  );
}

/**
 * Política de privacidade montada a partir do comportamento real do site:
 * sem cadastro, sem cookies, sem armazenamento no navegador e sem ferramentas de análise
 * ou publicidade. Se algum desses recursos for adicionado, esta página precisa ser revista.
 */
export default function PrivacyPage() {
  const { business, legal } = siteConfig;
  const features = getFeatures(siteConfig);
  const hosting = legal.hostingProvider ?? "Vercel";

  return (
    <Container className="max-w-3xl pt-40 pb-24">
      <h1 className="font-display text-6xl leading-[0.9] font-extrabold uppercase">Privacidade</h1>
      <p className="mt-4 text-muted">Atualizada em {formatIsoDate(legal.privacyUpdatedAt)}.</p>

      {siteConfig.demo && (
        <p className="mt-8 border-l-2 border-accent pl-4 text-muted">
          Texto-modelo de demonstração. Para um cliente real, revise com o responsável pelo estabelecimento
          antes de publicar.
        </p>
      )}

      <div className="mt-12 space-y-12 text-lg leading-relaxed text-foreground/85">
        <Block title="Quem é o responsável">
          <p>
            Este site é da {business.name}. O responsável pelo tratamento de dados pessoais é{" "}
            {legal.controllerName}
            {legal.document ? `, ${legal.document}` : ""}.
          </p>
        </Block>

        <Block title="O que o site coleta">
          <p>
            Nada é coletado pelo próprio site: não há cadastro, login, cookies, armazenamento no seu
            navegador nem ferramentas de estatística ou publicidade.
          </p>
        </Block>

        <Block title="WhatsApp">
          <p>
            {features.bookingForm
              ? "O formulário de agendamento não envia nada para este site. O que você escreve fica no seu navegador até você tocar em enviar; nesse momento o WhatsApp abre com a mensagem pronta, e você decide se envia."
              : "Os botões de WhatsApp abrem o aplicativo com uma mensagem pronta, e você decide se envia."}{" "}
            O WhatsApp é um serviço da Meta, com política de privacidade própria. As mensagens recebidas são
            usadas pela {business.name} apenas para responder e agendar o atendimento que você pediu (LGPD,
            art. 7º, V).
          </p>
        </Block>

        <Block title="Mapa">
          <p>
            O mapa da página de contato vem do Google Maps e só é carregado quando você toca em “Mostrar mapa”.
            Antes disso, o site não se conecta ao Google. Depois, valem as regras de privacidade do Google.
          </p>
        </Block>

        <Block title="Hospedagem e links externos">
          <p>
            O site é hospedado pela {hosting}, que registra dados técnicos de acesso (como endereço IP,
            navegador e página visitada) para manter o serviço funcionando e seguro. Links para redes sociais
            levam a sites de terceiros, com políticas próprias.
          </p>
        </Block>

        <Block title="Seus direitos">
          <p>
            Pela Lei Geral de Proteção de Dados (Lei nº 13.709/2018, art. 18), você pode pedir a confirmação
            de que tratamos seus dados, acesso, correção, anonimização ou eliminação, e informações sobre
            com quem eles são compartilhados.
          </p>
          <p>
            Pedidos e dúvidas:{" "}
            <a href={`mailto:${legal.privacyEmail}`} className="text-accent underline underline-offset-4">
              {legal.privacyEmail}
            </a>
            .
          </p>
        </Block>

        {legal.extraPrivacyNotes?.map((note) => (
          <p key={note}>{note}</p>
        ))}
      </div>
    </Container>
  );
}
