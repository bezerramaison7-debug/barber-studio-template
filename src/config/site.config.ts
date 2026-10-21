import type { SiteConfig } from "./types";

/**
 * ARQUIVO CENTRAL DE CONFIGURAÇÃO
 * --------------------------------
 * Tudo o que muda de um cliente para outro está aqui: plano, nome, textos, cores,
 * imagens, serviços, preços, equipe, endereço, horários, regiões, WhatsApp e redes.
 * Veja docs/PERSONALIZACAO.md para o passo a passo e docs/PLANOS.md para os planos.
 *
 * O build valida este arquivo (src/lib/validate-config.ts). Com demo: false, ele exige
 * WhatsApp válido e confirmado, dados da LGPD e direitos das imagens.
 *
 * ATENÇÃO: todo o conteúdo abaixo é FICTÍCIO e serve apenas para demonstração.
 * Não há avaliações, profissionais, endereço ou telefone reais.
 */
export const siteConfig: SiteConfig = {
  demo: true,

  // A demonstração mostra o plano completo. Para ver o essencial: SITE_PLAN=essencial npm run build
  plan: "premium",

  business: {
    name: "Barber Studio",
    shortName: "Barber Studio",
    tagline: "Barbearia em Araraquara/SP",
    description:
      "Corte de cabelo, barba e acabamento masculino no centro de Araraquara. Escolha o serviço e combine o horário pelo WhatsApp.",
    priceRange: "$$",
  },

  about: {
    title: "O estúdio",
    text: "Um espaço de barbearia no centro de Araraquara para corte de cabelo, barba e acabamento.",
    highlights: [
      {
        title: "Tesoura e máquina",
        text: "Cortes clássicos e degradês, com acabamento na navalha.",
      },
      {
        title: "Barba com toalha quente",
        text: "Contorno na máquina e na navalha, com óleo para os fios.",
      },
      {
        title: "Agendamento pelo WhatsApp",
        text: "Você escolhe o serviço e combina o horário direto com a barbearia.",
      },
    ],
  },

  // Domínio reservado para exemplos. Troque pelo domínio do cliente (ou defina NEXT_PUBLIC_SITE_URL).
  url: "https://example.com",

  theme: {
    // Paletas: "classico" (preto e dourado), "grafite" (prata) ou "carvalho" (cobre).
    preset: "classico",
    // Premium: ajuste cor a cor sobre o preset, ex.: colors: { accent: "#c9a46a" }.
  },

  contact: {
    // Demonstração: vazio de propósito (o build recusa número com demo: true).
    // Cliente real: só dígitos, com 55 e DDD, e a data em que o número foi testado.
    whatsapp: "",
    phoneDisplay: "",
    email: "contato@example.com", // domínio reservado para exemplos (RFC 2606): nunca entrega e-mail
  },

  legal: {
    controllerName: "Barber Studio (marca fictícia de demonstração)",
    privacyEmail: "privacidade@example.com",
    privacyUpdatedAt: "2026-10-21",
  },

  imageRights: {
    status: "ilustrativas-demo",
    notes:
      "Fotos ilustrativas do Unsplash (ver docs/CREDITOS.md). A licença de cada foto não pôde ser conferida automaticamente.",
  },

  address: {
    street: "Rua Exemplo, 1000",
    neighborhood: "Centro",
    city: "Araraquara",
    state: "SP",
    postalCode: "14800-000",
    country: "BR",
    geo: { latitude: -21.7948, longitude: -48.1758 },
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Centro%2C+Araraquara+-+SP",
    mapsEmbedUrl: "https://maps.google.com/maps?q=Centro%2C%20Araraquara%20-%20SP&z=15&output=embed",
  },

  serviceArea: ["Araraquara", "Américo Brasiliense", "São Carlos", "Matão", "Ibaté"],

  timeZone: "America/Sao_Paulo",
  hours: [
    { day: 0 },
    { day: 1 },
    { day: 2, open: "09:00", close: "20:00" },
    { day: 3, open: "09:00", close: "20:00" },
    { day: 4, open: "09:00", close: "20:00" },
    { day: 5, open: "09:00", close: "20:00" },
    { day: 6, open: "08:00", close: "17:00" },
  ],

  social: {
    instagram: "https://www.instagram.com/",
  },

  images: {
    hero: {
      src: "/images/hero.jpg",
      alt: "Barbeiro fazendo a barba de um cliente com navalha, em ambiente com luz baixa",
      width: 2000,
      height: 1333,
    },
    about: {
      src: "/images/ambiente.jpg",
      alt: "Salão de barbearia com paredes de tijolo, espelhos e três cadeiras de couro preto",
      width: 1600,
      height: 1063,
    },
    booking: {
      src: "/images/cadeira.jpg",
      alt: "Cadeira de barbeiro clássica em couro marrom",
      width: 1400,
      height: 933,
    },
  },

  serviceCategories: [
    { id: "cabelo", name: "Cabelo" },
    { id: "barba", name: "Barba" },
    { id: "combos", name: "Combos" },
    { id: "extras", name: "Extras" },
  ],

  // Preços DEMONSTRATIVOS — substitua pela tabela real do cliente.
  services: [
    {
      id: "corte-classico",
      categoryId: "cabelo",
      name: "Corte clássico",
      description: "Tesoura e máquina, finalizado com lavagem e pomada.",
      durationMinutes: 40,
      price: 45,
      featured: true,
      page: {
        summary: "Corte masculino na tesoura e na máquina, finalizado com lavagem e pomada.",
        body: [
          "O corte clássico combina tesoura em cima e máquina nas laterais, no comprimento que você escolher. Antes de começar, o barbeiro confirma com você o formato e o acabamento.",
          "No fim, o cabelo é lavado e finalizado com pomada, para você ver como o corte fica no dia a dia.",
        ],
        includes: ["Conversa sobre o formato desejado", "Corte na tesoura e na máquina", "Lavagem", "Finalização com pomada"],
      },
    },
    {
      id: "degrade",
      categoryId: "cabelo",
      name: "Degradê",
      description: "Transição baixa, média ou alta, com navalha no acabamento.",
      durationMinutes: 45,
      price: 50,
      featured: true,
      page: {
        summary: "Degradê baixo, médio ou alto, com transição feita na máquina e acabamento na navalha.",
        body: [
          "No degradê, as laterais e a nuca vão ficando mais curtas aos poucos. A altura da transição (baixa, média ou alta) é combinada antes do corte.",
          "O contorno é finalizado na navalha. A parte de cima pode ser mantida mais longa ou acompanhar o degradê.",
        ],
        includes: ["Escolha da altura da transição", "Degradê na máquina", "Contorno na navalha"],
      },
    },
    {
      id: "corte-infantil",
      categoryId: "cabelo",
      name: "Corte infantil",
      description: "Para crianças até 10 anos.",
      durationMinutes: 35,
      price: 40,
    },
    {
      id: "barba-toalha",
      categoryId: "barba",
      name: "Barba com toalha quente",
      description: "Toalha quente, navalha e óleo hidratante para pele e fios.",
      durationMinutes: 30,
      price: 35,
      featured: true,
      page: {
        summary: "Barba feita com toalha quente, navalha e óleo para os fios.",
        body: [
          "A toalha quente amolece os fios antes do corte. Depois vem o contorno na máquina e o acabamento na navalha, no desenho que você preferir.",
          "No fim é aplicado óleo nos fios da barba.",
        ],
        includes: ["Toalha quente", "Contorno na máquina", "Acabamento na navalha", "Óleo para a barba"],
      },
    },
    {
      id: "barba-desenhada",
      categoryId: "barba",
      name: "Barba desenhada",
      description: "Contorno definido na máquina e na navalha, sem alterar o volume.",
      durationMinutes: 20,
      price: 25,
    },
    {
      id: "corte-barba",
      categoryId: "combos",
      name: "Corte + barba",
      description: "O atendimento completo, com toalha quente.",
      durationMinutes: 70,
      price: 75,
      featured: true,
      page: {
        summary: "Corte de cabelo e barba com toalha quente no mesmo atendimento.",
        body: [
          "O combo junta o corte de cabelo à escolha e a barba com toalha quente, em um único horário.",
          "É a opção para quem quer resolver cabelo e barba de uma vez.",
        ],
        includes: ["Corte à escolha", "Barba com toalha quente", "Finalização"],
      },
    },
    {
      id: "corte-sobrancelha",
      categoryId: "combos",
      name: "Corte + sobrancelha",
      description: "Corte à escolha com limpeza de sobrancelha na navalha.",
      durationMinutes: 50,
      price: 55,
    },
    {
      id: "sobrancelha",
      categoryId: "extras",
      name: "Sobrancelha",
      description: "Limpeza e alinhamento na navalha.",
      durationMinutes: 10,
      price: 15,
    },
    {
      id: "pigmentacao",
      categoryId: "extras",
      name: "Pigmentação",
      description: "Disfarça falhas na barba ou no cabelo. Efeito temporário.",
      durationMinutes: 20,
      price: 30,
    },
    {
      id: "platinado",
      categoryId: "extras",
      name: "Platinado",
      description: "Descoloração completa. Valor final depende do comprimento.",
      durationMinutes: 150,
      price: 150,
      priceFrom: true,
    },
  ],

  // Perfis FICTÍCIOS. Substitua pelos profissionais reais, com autorização de uso de nome e foto.
  team: [
    {
      id: "lucas",
      name: "Lucas",
      role: "Barbeiro",
      specialties: ["Degradê", "Corte na tesoura"],
      bio: "Perfil demonstrativo. Aqui entra uma frase curta sobre o estilo de trabalho do profissional.",
    },
    {
      id: "henrique",
      name: "Henrique",
      role: "Barbeiro",
      specialties: ["Barba", "Toalha quente"],
      bio: "Perfil demonstrativo. Use este espaço para contar o que o cliente pode esperar do atendimento.",
    },
    {
      id: "diego",
      name: "Diego",
      role: "Barbeiro",
      specialties: ["Platinado", "Pigmentação"],
      bio: "Perfil demonstrativo. Mantenha o texto em uma ou duas frases, sem exageros.",
    },
  ],

  gallery: [
    {
      src: "/images/gallery/galeria-01.jpg",
      alt: "Barba sendo aparada com tesoura, em preto e branco",
      width: 1200,
      height: 1807,
    },
    {
      src: "/images/gallery/galeria-02.jpg",
      alt: "Degradê sendo feito na máquina na lateral da cabeça",
      width: 1200,
      height: 800,
    },
    {
      src: "/images/gallery/galeria-03.jpg",
      alt: "Acabamento com máquina na nuca de um cliente de costas, barbeiro com braços tatuados",
      width: 1200,
      height: 800,
    },
    {
      src: "/images/gallery/galeria-04.jpg",
      alt: "Cadeira de barbeiro vermelha em salão de madeira escura com quadros antigos na parede",
      width: 1200,
      height: 830,
    },
    {
      src: "/images/gallery/galeria-05.jpg",
      alt: "Espuma de barbear aplicada com pincel, em preto e branco",
      width: 1200,
      height: 800,
    },
    {
      src: "/images/gallery/galeria-06.jpg",
      alt: "Corte texturizado em fase de acabamento",
      width: 1200,
      height: 800,
    },
    {
      src: "/images/gallery/galeria-07.jpg",
      alt: "Barba sendo feita na navalha com o cliente reclinado",
      width: 1200,
      height: 798,
    },
    {
      src: "/images/gallery/galeria-08.jpg",
      alt: "Acabamento com máquina em corte degradê com cachos no topo",
      width: 1200,
      height: 1596,
    },
    {
      src: "/images/gallery/galeria-09.jpg",
      alt: "Acabamento com máquina na nuca, em luz baixa",
      width: 1200,
      height: 800,
    },
    {
      src: "/images/gallery/galeria-10.jpg",
      alt: "Barbeiro de óculos cortando o cabelo de um cliente",
      width: 1200,
      height: 800,
    },
  ],

  faq: [
    {
      question: "Preciso agendar ou posso chegar sem horário?",
      answer:
        "Prefira agendar pelo WhatsApp. Se houver horário livre, dá para ser atendido sem agendamento.",
    },
    {
      question: "Como funciona o agendamento pelo WhatsApp?",
      answer:
        "Você escolhe o serviço, o profissional e o período no formulário. O site monta a mensagem e abre o WhatsApp; a confirmação do horário vem na conversa.",
    },
    {
      question: "E se eu me atrasar ou precisar desmarcar?",
      answer:
        "Avise pelo WhatsApp assim que puder. Exemplo de política: atrasos de até 10 minutos são tolerados; depois disso o horário pode ser remarcado.",
    },
    {
      question: "Quais formas de pagamento são aceitas?",
      answer: "Exemplo demonstrativo: Pix, cartões de débito e crédito e dinheiro.",
    },
  ],

  booking: {
    greeting: "Olá! Vim pelo site e gostaria de agendar um horário.",
    periods: ["Manhã", "Tarde", "Noite"],
  },

  seo: {
    title: "Barber Studio | Barbearia em Araraquara/SP",
    description:
      "Barbearia em Araraquara/SP: corte masculino, degradê, barba com toalha quente e combos. Agende pelo WhatsApp. Site demonstrativo.",
    keywords: [
      "barbearia em Araraquara",
      "barbeiro Araraquara",
      "corte masculino Araraquara",
      "degradê Araraquara",
      "barba Araraquara",
      "barbearia centro Araraquara",
    ],
  },
};
