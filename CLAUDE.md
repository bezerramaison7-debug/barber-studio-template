@AGENTS.md

# Barber Studio: template de sites para barbearias

Template comercial (Next.js 16 + TypeScript + Tailwind 4) personalizado por cliente.
Conteúdo da demo é fictício. Público: barbearias de Araraquara/SP e região. Idioma do site e dos
textos: português do Brasil.

## Comandos

- `npm run dev` · `npm run build` · `npm start`
- `npm run lint` · `npm run typecheck` · `npm test` (Vitest, ambiente happy-dom)
- Rode lint, typecheck, test e build antes de commitar. O CI (`.github/workflows/ci.yml`) roda os quatro.

## Arquitetura

- `src/config/site.config.ts` é a **única fonte de dados do cliente**. Componentes recebem
  `config: SiteConfig` por props; não espalhe dados de cliente em componentes.
  Campo novo → adicione em `src/config/types.ts` (com comentário), no config e, se fizer sentido,
  em `src/config/site.config.test.ts`.
- `src/lib/` contém lógica pura com testes ao lado (`*.test.ts`): WhatsApp, horários, formatação,
  JSON-LD, tema. Lógica nova vai para `lib/` com teste, não para dentro de componentes.
- `src/components/sections/` = uma seção da home por arquivo; `ui/` = primitivas; `layout/` = casca.
- Página única com âncoras (`#servicos`, `#precos`, `#equipe`, `#galeria`, `#agendar`, `#contato`),
  definidas em `components/layout/nav-links.ts`.

## Regras do Next.js desta versão

- `cacheComponents: true`: as páginas são pré-renderizadas. **Não use `new Date()`/`Date.now()`
  em Server Components** (falha no prerender ou congela a hora do build). Hora atual só em Client
  Components, via `useSyncExternalStore` (ver `open-status.tsx` e `booking-form.tsx`).
- Lint do React Compiler proíbe `setState` síncrono dentro de `useEffect`.
- `images.qualities` é obrigatório no `next.config.ts`; imagens remotas precisam de `remotePatterns`.
- Links internos com `next/link`.
- Consulte `node_modules/next/dist/docs/` antes de usar APIs que você não conhece desta versão.

## Estilo

- Tokens de cor em `globals.css` (`@theme inline` → `--brand-*`), alimentados pelo config.
  Use `bg-background`, `bg-surface`, `bg-surface-raised`, `border-line`, `text-muted`, `text-accent`,
  `bg-paper`/`text-ink`. Não use cores fixas nos componentes (exceção: verde oficial do WhatsApp).
- Títulos: `font-display` (Big Shoulders) em caixa alta; texto: Instrument Sans.
- Dourado (`accent`) com moderação. Movimento apenas na entrada do hero; respeite `motion-reduce`.
- Acessibilidade obrigatória: `alt` descritivo, rótulos em campos, foco visível, alvos de toque ≥ 44px.

## Conteúdo e ética

- Nunca invente avaliações, depoimentos, notas, prêmios ou dados de pessoas reais.
- Enquanto `demo: true`, mantenha os avisos de conteúdo fictício e o `noindex`.
- Não adicione `aggregateRating`/`review` ao JSON-LD sem avaliações reais verificáveis.
- O formulário não envia dados a servidor; mantenha assim (LGPD) salvo pedido explícito.

## Dependências

- `.npmrc` usa `legacy-peer-deps=true` por um bug do npm 10 com peers opcionais do Vitest.
- Ambiente de teste é `happy-dom` (o `jsdom` dispara o mesmo bug).
