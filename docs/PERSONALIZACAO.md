# Guia de personalização

Como transformar o template Barber Studio no site de uma barbearia real. Tempo estimado:
1 a 2 horas, com os dados e as fotos do cliente em mãos.

## 1. Antes de começar: o que pedir ao cliente

- [ ] Nome do estabelecimento e uma frase curta de apresentação
- [ ] Número do WhatsApp que vai receber os agendamentos
- [ ] Endereço completo, CEP e link do Google Maps (o da ficha do Google Meu Negócio, se houver)
- [ ] Horários de cada dia da semana
- [ ] Tabela de serviços: nome, descrição curta, duração e preço
- [ ] Profissionais: nome, especialidades, uma frase e foto (com autorização de uso de imagem)
- [ ] 8 a 12 fotos do espaço e de trabalhos (de preferência na horizontal e na vertical)
- [ ] Links de Instagram, Facebook e TikTok
- [ ] Cores da marca, se existirem (logo, fachada, uniforme)
- [ ] Domínio desejado (ex.: `barbeariadocliente.com.br`)
- [ ] Formas de pagamento e políticas de atraso/cancelamento para as dúvidas frequentes

## 2. Crie uma cópia para o cliente

Recomendado: um repositório por cliente, criado a partir deste template
(no GitHub: **Use this template**, ou faça um fork). Assim correções no template podem ser
trazidas depois sem misturar dados de clientes.

## 3. Edite `src/config/site.config.ts`

Todos os campos estão documentados em `src/config/types.ts`. Os principais:

| Campo                  | O que é                                                                                      |
| ---------------------- | -------------------------------------------------------------------------------------------- |
| `demo`                 | `true` mostra avisos de conteúdo fictício e bloqueia o Google. **Mude para `false` só no final.** |
| `business`             | nome, frase de topo (`tagline`), descrição e faixa de preço (`$`, `$$`, `$$$`)              |
| `about`                | título, texto e três destaques da seção "Sobre"                                              |
| `url`                  | domínio final, sem barra no fim. A variável `NEXT_PUBLIC_SITE_URL` tem prioridade           |
| `theme.colors`         | cores em hexadecimal (ver seção 5)                                                           |
| `contact.whatsapp`     | só dígitos com país e DDD: `5516991234567`                                                   |
| `contact.phoneDisplay` | como o telefone aparece na tela: `(16) 99123-4567`                                           |
| `address`              | endereço, coordenadas, link "Como chegar" e link do mapa incorporado                         |
| `serviceArea`          | cidades atendidas (aparecem no rodapé e no SEO)                                              |
| `hours`                | um item por dia (`0` = domingo … `6` = sábado). Sem `open`/`close` = fechado                 |
| `social`               | URLs completas. Redes sem URL não aparecem                                                   |
| `serviceCategories`    | grupos da tabela de preços, na ordem em que aparecem                                        |
| `services`             | serviços; `featured: true` coloca na seção "Serviços"; `priceFrom: true` mostra "a partir de" |
| `team`                 | profissionais; sem `photo`, o cartão mostra as iniciais                                      |
| `gallery`              | fotos da galeria, com largura e altura reais                                                 |
| `faq`                  | perguntas e respostas (também viram dados estruturados para o Google)                        |
| `booking`              | primeira linha da mensagem do WhatsApp e períodos do formulário                              |
| `seo`                  | título, descrição e palavras-chave. Use "barbearia em <cidade>" e o bairro                   |

### Endereço e mapa

1. No Google Maps, procure o estabelecimento.
2. **Compartilhar → Enviar um link**: cole em `address.mapsUrl`.
3. **Compartilhar → Incorporar um mapa**: copie só o valor de `src="…"` do iframe e cole em
   `address.mapsEmbedUrl`.
4. Clique com o botão direito no ponto do mapa para copiar latitude e longitude para
   `address.geo`.

## 4. Troque as imagens

Coloque as fotos em `public/images/` e atualize `src`, `alt`, `width` e `height` no config.

- **Tamanho**: 1600 a 2000 px de largura para o topo; 1200 px para a galeria. JPG com qualidade
  70 a 80 basta: o Next.js converte para AVIF/WebP automaticamente.
- **Texto alternativo (`alt`)**: descreva o que aparece ("Barbeiro fazendo degradê na máquina"),
  não "foto1". É obrigatório para acessibilidade e ajuda no SEO.
- **Largura e altura**: veja nas propriedades do arquivo, ou rode
  `identify public/images/arquivo.jpg` (ImageMagick).
- **Equipe**: fotos na vertical (4:5) ficam melhores. Inclua em `team[].photo`.
- Ícone da aba: edite `src/app/icon.svg` (ou troque por `icon.png` 512×512).

A imagem de compartilhamento (aparece ao mandar o link no WhatsApp) é gerada automaticamente
a partir da foto do topo e do nome.

## 5. Cores

A paleta padrão é preto, grafite, branco e dourado discreto. Para adaptar à marca:

- Troque principalmente `accent` (cor de destaque). Mantenha o restante escuro para não perder
  o acabamento.
- `accentForeground` é a cor do texto sobre o destaque: preto para cores claras, branco para
  escuras.
- Confira o contraste em https://webaim.org/resources/contrastchecker/ (mínimo 4.5:1 para texto).

As cores viram variáveis CSS (`--brand-*`) usadas pelo Tailwind (`bg-accent`, `text-muted`,
etc.). Não é preciso editar classes dos componentes.

## 6. Textos fixos

Alguns textos que não variam muito ficam nos componentes, em `src/components/sections/`:
os passos do agendamento (`booking.tsx`) e as introduções das seções. Ajuste se o cliente pedir.
A página de privacidade é `src/app/privacidade/page.tsx`: revise com o cliente.

## 7. Confira e publique

```bash
npm test          # valida o config: ids, horários, WhatsApp, cores, imagens
npm run lint
npm run build
npm start         # revise em http://localhost:3000, no celular e no computador
```

Checklist final:

- [ ] `demo: false`
- [ ] Nenhum texto "fictício" ou "demonstrativo" sobrando (procure por essas palavras)
- [ ] WhatsApp testado: o formulário abre a conversa com o número certo
- [ ] Endereço, mapa e "Como chegar" apontam para o lugar certo
- [ ] Horários conferidos com o cliente
- [ ] Fotos próprias, com autorização de uso de imagem
- [ ] `NEXT_PUBLIC_SITE_URL` definido na Vercel com o domínio final
- [ ] Domínio configurado e com HTTPS
- [ ] Ficha do Google Meu Negócio com o link do site (ajuda muito no SEO local)
- [ ] Cliente aprovou a versão final

Publicação na Vercel: veja a seção "Publicar na Vercel" do `README.md`.

## Sobre avaliações de clientes

O template **não** inclui depoimentos nem notas de propósito. Se o cliente quiser exibir
avaliações, use apenas avaliações reais e verificáveis (por exemplo, com link para o perfil no
Google), e só então considere adicionar `aggregateRating` aos dados estruturados em
`src/lib/site.ts`. Avaliações inventadas violam as regras do Google e o Código de Defesa do
Consumidor.
