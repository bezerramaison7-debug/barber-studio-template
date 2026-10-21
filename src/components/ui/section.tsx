import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

interface SectionProps {
  id: string;
  /** Título visível (h2). */
  title: string;
  intro?: ReactNode;
  children: ReactNode;
  /** "dark" = preto, "graphite" = grafite, "paper" = seção clara. */
  tone?: "dark" | "graphite" | "paper";
  className?: string;
}

const tones = {
  dark: "bg-background text-foreground",
  graphite: "bg-surface text-foreground",
  paper: "bg-paper text-ink",
};

/** Seção da página com âncora, título e introdução opcionais, rotulada pelo h2. */
export function Section({ id, title, intro, children, tone = "dark", className = "" }: SectionProps) {
  const headingId = `${id}-titulo`;
  return (
    <section id={id} aria-labelledby={headingId} className={`py-20 sm:py-28 ${tones[tone]} ${className}`}>
      <Container>
        <header className="mb-12 max-w-2xl sm:mb-16">
          <h2
            id={headingId}
            className="font-display text-5xl leading-[0.95] font-extrabold tracking-tight uppercase sm:text-6xl"
          >
            {title}
          </h2>
          {intro && (
            <p className={`mt-5 text-lg leading-relaxed ${tone === "paper" ? "text-ink/75" : "text-muted"}`}>
              {intro}
            </p>
          )}
        </header>
        {children}
      </Container>
    </section>
  );
}
