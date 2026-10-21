# Barber Studio: template de site para barbearias

Modelo de site profissional para barbearias de Araraquara/SP e região, pensado para ser
personalizado e vendido para estabelecimentos reais. A demonstração usa a marca fictícia
**Barber Studio**.

> **Todo o conteúdo da demonstração é fictício**: nomes, preços, endereço, telefone e perfis da
> equipe. Não existem avaliações nem profissionais reais. As fotos são ilustrativas (Unsplash).

## O que o site tem

- **Página inicial** com foto em tela cheia, indicador "aberto agora" e endereço
- **Sobre**, **Serviços** em destaque e **tabela de preços** no estilo dos quadros de barbearia
- **Equipe** (com foto ou iniciais), **Galeria** com visualização ampliada, **Dúvidas frequentes**
- **Agendamento pelo WhatsApp**: formulário que monta a mensagem e abre a conversa, sem backend
- **Contato e localização**: mapa (carregado só quando a pessoa pede), horários, "Como chegar"
- Botão flutuante de WhatsApp e página de **Privacidade** (texto-modelo LGPD)

Qualidade:

- **SEO local**: metadados, Open Graph com imagem gerada, `sitemap.xml`, `robots.txt`,
  dados estruturados `BarberShop` e `FAQPage` (schema.org), área de atendimento por cidade
- **Acessibilidade**: HTML semântico, link "pular para o conteúdo", foco visível, rótulos e
  mensagens de erro ligados aos campos, `prefers-reduced-motion` respeitado
- **Performance**: páginas 100% estáticas, imagens otimizadas (AVIF/WebP) com `next/image`,
  fontes auto-hospedadas com `next/font`, mapa do Google sob demanda
- **Modo demonstração**: faixa de aviso, rótulos "fictício" e `noindex` para o Google não indexar
  dados falsos

## Tecnologias

Next.js 16 (App Router, Turbopack, Cache Components) · React 19 · TypeScript · Tailwind CSS 4 ·
Vitest + Testing Library · ESLint

## Como rodar

Requer Node.js 20.9 ou superior.

```bash
npm install
npm run dev        # http://localhost:3000
```

| Comando             | O que faz                                    |
| ------------------- | -------------------------------------------- |
| `npm run dev`       | servidor de desenvolvimento                  |
| `npm run build`     | build de produção                            |
| `npm start`         | serve o build de produção                    |
| `npm run lint`      | ESLint                                       |
| `npm run typecheck` | checagem de tipos do TypeScript              |
| `npm test`          | testes (lógica, config e formulário)         |

## Personalizar para um cliente

Quase tudo está em **um arquivo**: [`src/config/site.config.ts`](src/config/site.config.ts).
O passo a passo completo, com checklist de entrega, está em
[`docs/PERSONALIZACAO.md`](docs/PERSONALIZACAO.md).

Resumo:

1. Edite nome, textos, cores, serviços, preços, equipe, endereço, horários e redes no config.
2. Troque as fotos em `public/images/` (mantenha os nomes ou atualize os caminhos no config).
3. Preencha `contact.whatsapp` com o número real (só dígitos, com 55 e DDD).
4. Mude `demo` para `false` quando todos os dados forem reais e aprovados.
5. Rode `npm test`: os testes do config apontam ids repetidos, horários inválidos, imagens
   faltando e outros erros comuns.

## Publicar na Vercel

O projeto já está pronto para a Vercel (detecção automática de Next.js, sem configuração extra).

1. Em [vercel.com/new](https://vercel.com/new), importe este repositório do GitHub.
2. Em **Environment Variables**, defina `NEXT_PUBLIC_SITE_URL` com o domínio final
   (ex.: `https://www.barbeariadocliente.com.br`). Veja `.env.example`. Enquanto o site usar o
   endereço `*.vercel.app`, a variável é opcional: o código usa o domínio de produção que a
   Vercel informa automaticamente.
3. Clique em **Deploy**. Cada push na branch principal gera um novo deploy; cada pull request
   ganha uma URL de pré-visualização.
4. Para um domínio próprio: **Settings → Domains**.

O `.npmrc` contém `legacy-peer-deps=true` para contornar um bug do npm 10 ao instalar o Vitest;
não remova sem testar `npm install` do zero.

## Estrutura

```
src/
  app/                 rotas, layout, SEO (sitemap, robots, manifest, imagem OG)
  components/
    layout/            cabeçalho, rodapé, botão de WhatsApp, redes sociais
    sections/          seções da página inicial
    ui/                botões, seções, ícones
  config/
    site.config.ts     ← dados do cliente
    types.ts           formato do config, documentado campo a campo
  lib/                 lógica pura e testada: WhatsApp, horários, formatação, SEO
public/images/         fotos
docs/                  guia de personalização e créditos
```

## Licença

Código sob licença MIT (ver `LICENSE`). As fotos seguem a [Licença Unsplash](https://unsplash.com/license);
veja [`docs/CREDITOS.md`](docs/CREDITOS.md).
