import Link from "next/link";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/section";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col justify-center pt-32 pb-20">
      <h1 className="font-display text-7xl leading-[0.9] font-extrabold uppercase sm:text-8xl">Página não encontrada</h1>
      <p className="mt-6 max-w-md text-lg text-muted">
        O endereço pode ter mudado. Volte para o início para ver serviços, preços e agendamento.
      </p>
      <Link href="/" className={buttonClasses("primary", "mt-10 self-start")}>
        Voltar para o início
      </Link>
    </Container>
  );
}
