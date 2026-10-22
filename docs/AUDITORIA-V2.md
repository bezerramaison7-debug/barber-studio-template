# Auditoria profissional V2

Data: 21/10/2026. Alvo: produção em <https://barber-studio-template-iota.vercel.app/> (commit `395af3a`
da `main`) e o build local desta branch. Todas as medições abaixo foram executadas de fato; o que não
pôde ser verificado está marcado como tal.

## Como foi feito

| Verificação | Ferramenta | Onde |
| --- | --- | --- |
| Links e rotas | Playwright 1.56 (Chromium 141) seguindo redirecionamentos | produção e build local |
| Larguras 1440, 768 e 375 px | Playwright: rolagem horizontal, alvos de toque, imagens, erros de console, capturas | produção e build local |
| Lighthouse | Lighthouse 12.8.2, Chromium headless, limitação simulada (padrão) | produção e build local |
| Privacidade | Playwright: cookies, `localStorage`, requisições a terceiros antes e depois do mapa | produção |
| Direitos das imagens | busca na web e navegador automatizado no Unsplash | ver seção 7 |
| Código | leitura completa, `eslint`, `tsc`, Vitest | branch |

Capturas: [`auditoria/antes`](auditoria/antes) (produção) e [`auditoria/depois`](auditoria/depois)
(esta branch). Relatórios Lighthouse completos em [`auditoria/lighthouse`](auditoria/lighthouse).

## 1. Código e arquitetura (antes)

Pontos fortes: dados do cliente centralizados em `site.config.ts`, lógica pura testada em `src/lib`,
páginas 100% estáticas, sem backend, CI com lint/typecheck/testes/build.

Problemas encontrados:

| # | Problema | Gravidade |
| --- | --- | --- |
| A1 | O número de WhatsApp do config ia direto para os links: com `demo: true` e um número preenchido, mensagens de teste iriam para esse número. A proteção dependia só de deixar o campo vazio. | Alta |
| A2 | Nenhuma validação para site real: um cliente podia ir ao ar com WhatsApp inválido, sem confirmação, com textos "fictício" esquecidos. | Alta |
| A3 | Textos de interface fixos nos componentes (títulos, botões, passos do agendamento, rodapé, 404). | Média |
| A4 | Afirmações comerciais não confirmadas na demo e em textos fixos: "Sem fila, sem senha", "Um cliente por vez", "para ninguém esperar", "Leva menos de um minuto", "No centro de…, com atendimento para toda a região". | Média |
| A5 | `robots.txt` com `Disallow: /` junto com meta `noindex`: o bloqueio de rastreamento impede o Google de ler o `noindex`. Previews da Vercel de um site real seriam indexáveis. | Média |
| A6 | Política de privacidade sem responsável (nome/CNPJ), sem citar a Meta (WhatsApp), sem direitos do titular (LGPD art. 18), sem data, e citando "estatísticas agregadas" que o site não coleta. | Média |
| A7 | Um único produto: sem como vender uma versão mais simples. | Produto |

## 2. Links e rotas (produção)

18 de 18 endereços verificados responderam como esperado: âncoras da página, `/privacidade`,
`/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest`, `/opengraph-image`, `/icon.svg` (200),
Google Maps, `wa.me` e Instagram (200 após redirecionamentos) e `/pagina-inexistente` (404).
O `mailto:` não é verificável por HTTP.

Na branch, o premium ganhou 4 páginas de serviço (200) e `/servicos/<inexistente>` responde 404 (ver
seção 9).

## 3. Larguras 1440, 768 e 375 px (produção)

| Verificação | Desktop | Tablet | Mobile |
| --- | --- | --- | --- |
| Rolagem horizontal | não | não | não |
| Erros de console / recursos 4xx-5xx | 0 / 0 | 0 / 0 | 0 / 0 |
| Um único `h1` | sim | sim | sim |
| Alvos de toque < 24 px | 5 (links do menu, 19 px de altura) | 0 | 0 |

Uma imagem apareceu com largura natural 0 na primeira passada; refeita com rolagem lenta, nenhuma
imagem quebrada: falso positivo do carregamento sob demanda.

## 4. Lighthouse

| Página | Modo | Performance | Acessibilidade | Boas práticas | SEO |
| --- | --- | --- | --- | --- | --- |
| Produção `/` | mobile, 1ª medição | 80 | 100 | 100 | 69 |
| Produção `/` | mobile, 2ª e 3ª medições | 98 / 97 | — | — | — |
| Produção `/` | desktop | 100 | 100 | 100 | 69 |
| Branch `/` | mobile | 98 (2ª: 96) | 100 | 100 | 69 |
| Branch `/` | desktop | 100 | 100 | 100 | 69 |
| Branch `/servicos/degrade` | mobile / desktop | 98 / 100 | 100 | 100 | 66 |
| Branch `/privacidade` | mobile / desktop | 99 / 100 | 100 | 100 | 66 |

Leitura honesta dos números:

- **SEO 66–69 é esperado**: a única auditoria reprovada é `is-crawlable`, porque a demonstração tem
  `noindex` de propósito. Todas as outras auditorias de SEO passam. Num site real (`demo: false`, em
  produção) essa auditoria passa.
- **Performance**: a 1ª medição mobile da produção (80; TBT 630 ms) não se repetiu; as duas seguintes
  deram 98 e 97. Trate como variação do ambiente de medição. As mudanças desta branch **não**
  alteraram a performance de forma mensurável (96–98 no mobile, 100 no desktop).
- Métricas mobile da branch: LCP 2,1–2,7 s, TBT 30–100 ms, CLS 0.
- Oportunidades restantes apontadas: ~26 KB de JavaScript não usado e ~14 KB de JS legado, ambos no
  pacote do framework (React/Next), sem ação razoável no projeto.

## 5. Layout, tipografia, imagens e espaçamento

| Achado | Situação |
| --- | --- |
| Tablet: equipe em 3 colunas estreitas (cartões com texto espremido) | Corrigido: 2 colunas até 1024 px, 3 acima |
| Tablet: hero com grande vazio entre o cabeçalho e o título (altura de tela cheia em 1024 px) | Corrigido: altura limitada em telas médias |
| Desktop: links do menu com 19 px de altura de clique | Corrigido: área de 44 px |
| Prévia da demo mostrava os `*` de negrito do WhatsApp | Corrigido |
| Tipografia: escala consistente (Big Shoulders nos títulos, Instrument Sans no texto), sem quebras indevidas nas 3 larguras | Sem ação |
| Imagens: todas com `alt`, servidas em AVIF/WebP com `sizes`, nenhuma ampliada além do tamanho natural | Sem ação |

## 6. Privacidade × comportamento real (produção)

Medido com o navegador, sem extensões:

| Situação | Cookies | `localStorage` / `sessionStorage` | Domínios de terceiros contatados |
| --- | --- | --- | --- |
| Ao abrir e rolar a página | 0 | vazio / vazio | **nenhum** |
| Ao preencher o formulário (sem enviar) | 0 | vazio | nenhum, e nenhum `POST` |
| Depois de tocar em "Mostrar mapa" | 0 no domínio do site | vazio | 7 do Google (`maps.google.com`, `www.google.com`, `maps.gstatic.com`, `maps.googleapis.com`, `places.googleapis.com`, `fonts.googleapis.com`, `fonts.gstatic.com`) |

O texto antigo era coerente com esse comportamento, mas incompleto (problema A6). A nova política
descreve exatamente o que foi medido; ver `src/app/privacidade/page.tsx`.

## 7. Direitos de uso das imagens

**Não foi possível confirmar a licença foto a foto.** Tentativas feitas:

1. API do Unsplash: exige chave de acesso (HTTP 401).
2. Páginas do Unsplash por `curl`: redirecionadas para uma verificação anti-robôs.
3. Navegador automatizado (Playwright): a busca do Unsplash parou na tela "Making sure you're not a
   bot!". A proteção não foi contornada.
4. Busca na web pelos identificadores: nenhuma página correspondente encontrada.

O que se sabe: todas as fotos vieram de endereços `images.unsplash.com/photo-…` (formato das fotos
gratuitas; as pagas usam `premium_photo-…`), e a Licença Unsplash permite uso comercial, mas não cobre
marcas nem direito de imagem das pessoas fotografadas.

Medida tomada: o config agora registra a situação das imagens (`imageRights`), e **o build de um site
real é recusado** enquanto ela não estiver como `"confirmados"` com data. Para a demonstração, a
recomendação é conferir manualmente as 13 fotos no Unsplash (lista em [`CREDITOS.md`](CREDITOS.md))
antes de usá-la em material de venda.

## 8. Correções implementadas

| Problema | Correção |
| --- | --- |
| A1 | `getWhatsAppNumber` é a única saída para o WhatsApp: em modo demo devolve vazio **mesmo com número no config**; fora da demo só aceita número brasileiro válido (DDD existente, celular ou fixo, sem padrões de exemplo como `99999-9999` ou sequências). Na demo, o formulário não abre o WhatsApp: mostra a mensagem na tela e oferece um link de teste sem destinatário. Telefone clicável (`tel:`) segue a mesma regra. |
| A2 | `validateSiteConfig` roda no build (`layout.tsx`) e nos testes. Com `demo: false` exige WhatsApp válido, data de confirmação do número, responsável e e-mail da LGPD, data da política, direitos das imagens confirmados e nenhum resto de texto de demonstração. Com `demo: true` exige WhatsApp vazio, nenhum telefone na tela e e-mail `@example.com`. |
| A3 | Todos os textos de interface em `src/config/texts.ts`, substituíveis por cliente via `texts` no config; endereços, horários e regiões já vinham do config. |
| A4 | Textos reescritos sem promessas. O build emite aviso para termos que exigem confirmação ("melhor", "garantia", "sem fila", "nº 1", "avaliações"…). |
| A5 | `robots.txt` permite rastreamento; o bloqueio é feito por meta `noindex` e cabeçalho `X-Robots-Tag`. Regra única (`isIndexable`): demo nunca; site real só em `VERCEL_ENV=production`; `SITE_NOINDEX=1` força o bloqueio. Sitemap inclui as páginas de serviço. |
| A6 | Política reescrita a partir do comportamento medido, com responsável, Meta/WhatsApp, Google Maps sob demanda, hospedagem, direitos do art. 18 e data. |
| A7 | Planos Essencial e Premium no mesmo código (ver [`PLANOS.md`](PLANOS.md)). |
| Layout | Itens da seção 5. |
| 404 | `/servicos/<inexistente>` respondia 200 (casca pré-renderizada); agora o `proxy` devolve 404 real. |

## 9. Testes desta branch

| Verificação | Resultado |
| --- | --- |
| `npm run lint` | sem erros |
| `npm run typecheck` | sem erros |
| `npm test` (Vitest) | 82 testes, todos passando |
| `npm run build` (premium) | sucesso; 4 páginas de serviço pré-renderizadas |
| `SITE_PLAN=essencial npm run build` | sucesso |
| Testes funcionais no navegador, premium | 26/26 |
| Testes funcionais no navegador, essencial | 17/17 |
| Larguras 1440/768/375, premium e essencial | sem rolagem horizontal, sem alvos < 24 px, sem erros de console |

Os testes funcionais no navegador (scripts Playwright) foram executados durante a auditoria e não
fazem parte do CI; o CI roda lint, typecheck, Vitest e build.

## 10. Pendências

1. Confirmar manualmente a licença das 13 fotos (seção 7) ou substituí-las.
2. Revisar a política de privacidade com o primeiro cliente real (texto-modelo, não é parecer jurídico).
3. As páginas de serviço da demo são exemplos; num cliente, só crie páginas com conteúdo real.
4. Medir de novo com Lighthouse depois do deploy de produção desta branch.
