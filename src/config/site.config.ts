import type { SiteConfig } from "./types";

/**
 * ARQUIVO CENTRAL DE CONFIGURAÇÃO
 * --------------------------------
 * Tudo o que muda de um cliente para outro está aqui: nome, cores, imagens,
 * serviços, preços, equipe, endereço, horários, WhatsApp e redes sociais.
 * Veja docs/PERSONALIZACAO.md para o passo a passo.
 *
 * ATENÇÃO: todo o conteúdo abaixo é FICTÍCIO e serve apenas para demonstração.
 * Não há avaliações, profissionais, endereço ou telefone reais.
 */
export const siteConfig: SiteConfig = {
  demo: true,

  business: {
    name: "Barber Studio",
    shortName: "Barber Studio",
    tagline: "Barbearia com hora marcada em Araraquara/SP",
    description:
      "Corte, barba e acabamento feitos com calma, em um ambiente reservado. Você escolhe o horário pelo WhatsApp e é atendido na hora combinada.",
    priceRange: "$$",
  },

  about: {
    title: "Feito sem pressa",
    text: "Um estúdio pequeno no centro de Araraquara, pensado para quem quer sair com o corte certo e não perder a tarde esperando.",
    highlights: [
      {
        title: "Hora marcada de verdade",
        text: "Você chega no horário combinado e senta na cadeira. Sem fila, sem senha.",
      },
      {
        title: "Toalha quente e navalha",
        text: "A barba é feita do jeito tradicional, com produtos que cuidam da pele.",
      },
      {
        title: "Um cliente por vez",
        text: "Cada profissional atende uma pessoa de cada vez, com o tempo que o corte pede.",
      },
    ],
  },

  // Domínio reservado para exemplos. Troque pelo domínio do cliente (ou defina NEXT_PUBLIC_SITE_URL).
  url: "https://example.com",

  theme: {
    colors: {
      background: "#000000",
      surface: "#17181a",
      surfaceRaised: "#232427",
      border: "#34353a",
      foreground: "#f5f4f0",
      muted: "#a3a29c",
      accent: "#b39257",
      accentForeground: "#000000",
      paper: "#f5f4f0",
      ink: "#17181a",
    },
  },

  contact: {
    // Demonstração: vazio de propósito. Coloque o número real do cliente, só dígitos.
    whatsapp: "",
    phoneDisplay: "(16) 90000-0000 · fictício",
    email: "contato@example.com", // domínio reservado para exemplos (RFC 2606): nunca entrega e-mail
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
    },
    {
      id: "degrade",
      categoryId: "cabelo",
      name: "Degradê",
      description: "Transição baixa, média ou alta, com navalha no acabamento.",
      durationMinutes: 45,
      price: 50,
      featured: true,
    },
    {
      id: "corte-infantil",
      categoryId: "cabelo",
      name: "Corte infantil",
      description: "Para crianças até 10 anos, com tempo extra para elas se acostumarem.",
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
      description: "Disfarça falhas na barba ou no cabelo. Dura até a próxima lavagem.",
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
      alt: "Máquinas, tesoura, pente e pomadas sobre uma bancada de madeira",
      width: 1200,
      height: 800,
    },
    {
      src: "/images/gallery/galeria-04.jpg",
      alt: "Acabamento na nuca com máquina, cliente com tatuagens e barba cheia",
      width: 1200,
      height: 1798,
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
        "O atendimento é com hora marcada, para ninguém esperar. Se houver horário livre, encaixamos quem chegar.",
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
      "Barbearia com hora marcada em Araraquara/SP: corte masculino, degradê, barba com toalha quente e combos. Agende pelo WhatsApp. Site demonstrativo.",
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
