import { Product, LookbookItem, Testimonial } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Blazer Estruturado em Linho Cru',
    category: 'alfaiataria',
    subcategory: 'Casacos & Blazers',
    price: 489.00,
    originalPrice: 559.00,
    rating: 4.9,
    reviewsCount: 38,
    isNew: true,
    isBestSeller: true,
    isSustainable: true,
    description: 'Blazer de corte reto contemporâneo confeccionado em linho puro misto com algodão sustentável. Lapela clássica, bolsos frontais embutidos e forro acetinado macio. Caimento impecável para transitar entre o casual chic e o profissional.',
    details: [
      'Modelagem relaxed fit atemporal',
      'Botões resinados foscos ecológicos',
      'Forro 100% viscose respirável',
      'Costuras internas com acabamento francês'
    ],
    composition: '70% Linho Puro Certificado, 30% Algodão Orgânico BCI',
    sizes: ['PP', 'P', 'M', 'G', 'GG'],
    colors: [
      { name: 'Cru Natural', hex: '#E6DFD5', tailwindBg: 'bg-[#E6DFD5]' },
      { name: 'Preto Carvão', hex: '#232323', tailwindBg: 'bg-[#232323]' },
      { name: 'Terracota Suave', hex: '#B87258', tailwindBg: 'bg-[#B87258]' }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1000&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1548624149-f9b1859aa9d0?auto=format&fit=crop&w=1000&q=80',
    tag: 'Edição Limitada'
  },
  {
    id: 'prod-2',
    name: 'Vestido Midi Plissado Botânico',
    category: 'feminino',
    subcategory: 'Vestidos',
    price: 379.00,
    rating: 4.8,
    reviewsCount: 52,
    isNew: true,
    isSustainable: true,
    description: 'Vestido com comprimento midi, decote em V sutil e saia fluida com drapeado leve. Confeccionado em viscose de reflorestamento com toque de seda. Ideal para eventos solares ou noites sofisticadas.',
    details: [
      'Faixa removível na cintura para ajuste personalizado',
      'Fechamento posterior por zíper invisível',
      'Mangas 3/4 com punho elástico suave',
      'Tecido fluido que não amarrota facilmente'
    ],
    composition: '100% Viscose de Reflorestamento FSC',
    sizes: ['PP', 'P', 'M', 'G'],
    colors: [
      { name: 'Oliva Terroso', hex: '#6B705C', tailwindBg: 'bg-[#6B705C]' },
      { name: 'Areia Off-White', hex: '#F0EAD6', tailwindBg: 'bg-[#F0EAD6]' },
      { name: 'Caramelo', hex: '#A67B5B', tailwindBg: 'bg-[#A67B5B]' }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80',
    tag: 'Destaque Primavera'
  },
  {
    id: 'prod-3',
    name: 'Camisa Masculina Linho Puro',
    category: 'masculino',
    subcategory: 'Camisas',
    price: 299.90,
    originalPrice: 349.90,
    rating: 5.0,
    reviewsCount: 64,
    isBestSeller: true,
    isSustainable: true,
    description: 'Camisa de mangas longas em puro linho europeu pré-lavado, garantindo toque aveludado desde o primeiro uso. Gola italiana moderna e corte que valoriza a silhueta sem prender movimentos.',
    details: [
      'Pré-encolhida artesanalmente para manter medidas',
      'Costuras reforçadas nos pontos de tensão',
      'Botões de madrepérola natural',
      'Gola entretelada leve'
    ],
    composition: '100% Linho Europeu Amaciado',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [
      { name: 'Azul Brisa', hex: '#9BB8CD', tailwindBg: 'bg-[#9BB8CD]' },
      { name: 'Branco Puro', hex: '#FDFDFD', tailwindBg: 'bg-[#FDFDFD]' },
      { name: 'Verde Sálvia', hex: '#87A987', tailwindBg: 'bg-[#87A987]' }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1000&q=80',
    tag: 'Mais Vendida'
  },
  {
    id: 'prod-4',
    name: 'Calça Alfaiataria Wide Leg Pregas',
    category: 'alfaiataria',
    subcategory: 'Calças',
    price: 349.00,
    rating: 4.9,
    reviewsCount: 47,
    isBestSeller: true,
    description: 'Calça de cintura alta com corte wide leg refinado, pregas duplas frontais e caimento fluido impecável. Bolsos faca laterais e cós estruturado que alonga a postura.',
    details: [
      'Cós anatômico com passantes de cinto',
      'Bainha larga que permite ajuste fácil de comprimento',
      'Bolsos traseiros embutidos falsos decorativos',
      'Tecido com toque de crepe encorpado'
    ],
    composition: '78% Poliéster Reciclado, 18% Viscose, 4% Elastano',
    sizes: ['PP', 'P', 'M', 'G', 'GG'],
    colors: [
      { name: 'Off-White Crepe', hex: '#EDE8E1', tailwindBg: 'bg-[#EDE8E1]' },
      { name: 'Preto Absoluto', hex: '#1C1C1C', tailwindBg: 'bg-[#1C1C1C]' },
      { name: 'Cacau Escuro', hex: '#4A3525', tailwindBg: 'bg-[#4A3525]' }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
    tag: 'Clássico Essencial'
  },
  {
    id: 'prod-5',
    name: 'Tricô Oversized Algodão Orgânico',
    category: 'unissex',
    subcategory: 'Malhas & Tricôs',
    price: 329.00,
    rating: 4.7,
    reviewsCount: 29,
    isNew: true,
    isSustainable: true,
    description: 'Suéter de tricot encorpado em ponto pérola amplo com gola redonda canelada. Feito 100% com fios de algodão brasileiro cultivado sem pesticidas químicos.',
    details: [
      'Gola, punhos e barra com acabamento canelado duplo',
      'Cava deslocada para proposta relaxed moderna',
      'Toque ultra macio e térmico respirável',
      'Tingimento atóxico com corantes minerais'
    ],
    composition: '100% Algodão Orgânico Certificado GOTS',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [
      { name: 'Aveia Melange', hex: '#D8CFBC', tailwindBg: 'bg-[#D8CFBC]' },
      { name: 'Cinza Mineral', hex: '#7A8084', tailwindBg: 'bg-[#7A8084]' },
      { name: 'Mostarda Suave', hex: '#D4A373', tailwindBg: 'bg-[#D4A373]' }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1000&q=80',
    tag: 'Novo Lançamento'
  },
  {
    id: 'prod-6',
    name: 'Trench Coat Clássico Impermeável',
    category: 'feminino',
    subcategory: 'Casacos & Blazers',
    price: 649.00,
    originalPrice: 720.00,
    rating: 5.0,
    reviewsCount: 31,
    isBestSeller: true,
    description: 'Casaco clássico inspirado nos arquivos londrinos, atualizado com corte minimalista e tecido impermeabilizado de alta resistência. Cinto fivela forrada e pala traseira de proteção.',
    details: [
      'Tratamento resistente à água ecológico livre de PFC',
      'Abotoamento duplo cruzado com botões de chifre sintético',
      'Fenda posterior para mobilidade ao caminhar',
      'Bolsos profundos com abas de proteção'
    ],
    composition: '65% Algodão Encerado Leve, 35% Poliéster',
    sizes: ['PP', 'P', 'M', 'G'],
    colors: [
      { name: 'Areia Tradicional', hex: '#D1C2A5', tailwindBg: 'bg-[#D1C2A5]' },
      { name: 'Verde Oliva Escuro', hex: '#404537', tailwindBg: 'bg-[#404537]' },
      { name: 'Preto', hex: '#111111', tailwindBg: 'bg-[#111111]' }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=80',
    tag: 'Alta Alfaiataria'
  },
  {
    id: 'prod-7',
    name: 'Camiseta Básica Heavyweight Pima',
    category: 'masculino',
    subcategory: 'Camisetas',
    price: 169.00,
    rating: 4.9,
    reviewsCount: 112,
    isBestSeller: true,
    isSustainable: true,
    description: 'A camiseta definitiva. Confeccionada em algodão Pima peruano de gramatura 220g/m², conferindo peso nobre, caimento reto e durabilidade incomparável após sucessivas lavagens.',
    details: [
      'Gola canelada de 2.5cm com reforço ombro a ombro',
      'Não desbota e não forma peeling (bolinhas)',
      'Sem etiquetas que incomodam a nuca',
      'Algodão de fibra extralonga com toque sedoso'
    ],
    composition: '100% Algodão Pima Peruano Extra Longo',
    sizes: ['PP', 'P', 'M', 'G', 'GG'],
    colors: [
      { name: 'Branco Óptico', hex: '#FAFAFA', tailwindBg: 'bg-[#FAFAFA]' },
      { name: 'Preto Noite', hex: '#1A1A1A', tailwindBg: 'bg-[#1A1A1A]' },
      { name: 'Verde Floresta', hex: '#2D3A2F', tailwindBg: 'bg-[#2D3A2F]' },
      { name: 'Cinza Chumbo', hex: '#4B5154', tailwindBg: 'bg-[#4B5154]' }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=1000&q=80',
    tag: 'Básico Premium'
  },
  {
    id: 'prod-8',
    name: 'Saia Midi Evasê em Linho Puro',
    category: 'linho',
    subcategory: 'Saias',
    price: 289.00,
    rating: 4.8,
    reviewsCount: 26,
    isNew: true,
    isSustainable: true,
    description: 'Saia feminina corte evasê que une o frescor do linho com a praticidade do cós traseiro elástico. Botões frontais decorativos em coco natural e bolsos utilitários discretos.',
    details: [
      'Bolsos laterais funcionais embutidos',
      'Cós frontal liso elegante com elástico traseiro confortável',
      'Comprimento abaixo do joelho',
      'Tecido pré-lavado de fibra nobre'
    ],
    composition: '100% Linho Cru Sustentável',
    sizes: ['PP', 'P', 'M', 'G'],
    colors: [
      { name: 'Terracota Queimado', hex: '#C15C3D', tailwindBg: 'bg-[#C15C3D]' },
      { name: 'Areia Natural', hex: '#E2DACB', tailwindBg: 'bg-[#E2DACB]' },
      { name: 'Azul Índigo', hex: '#2C3E50', tailwindBg: 'bg-[#2C3E50]' }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=1000&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=1000&q=80',
    tag: 'Linho Puro'
  },
  {
    id: 'prod-9',
    name: 'Camisa Oversized Popeline Algodão',
    category: 'feminino',
    subcategory: 'Camisas',
    price: 279.00,
    rating: 4.9,
    reviewsCount: 44,
    isBestSeller: true,
    description: 'Camisa boyfriend com volume deliberado e proporções sofisticadas. Popeline 100% algodão de alta densidade com acabamento acetinado leve.',
    details: [
      'Ombro caído com mangas amplas e punho com dois botões',
      'Barra arredondada mais longa nas costas',
      'Gola pontuda estruturada',
      'Fácil de usar por dentro da calça ou solta como sobreposição'
    ],
    composition: '100% Algodão Popeline Fio 80',
    sizes: ['PP', 'P', 'M', 'G'],
    colors: [
      { name: 'Listrado Azul & Branco', hex: '#A3C1DA', tailwindBg: 'bg-[#A3C1DA]' },
      { name: 'Branco Algodão', hex: '#FFFFFF', tailwindBg: 'bg-[#FFFFFF]' },
      { name: 'Rosa Pálido', hex: '#E8D3CE', tailwindBg: 'bg-[#E8D3CE]' }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=1000&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1000&q=80',
    tag: 'Must Have'
  },
  {
    id: 'prod-10',
    name: 'Bermuda Alfaiataria Linho Misto',
    category: 'masculino',
    subcategory: 'Bermudas',
    price: 249.00,
    rating: 4.7,
    reviewsCount: 19,
    isSustainable: true,
    description: 'Bermuda com inspiração na Riviera mediterrânea. Comprimento acima dos joelhos com barra italiana discreta, bolso faca e cordão interno para ajuste seguro.',
    details: [
      'Cós alfaiatado com passadores e elástico embutido discreto',
      'Dois bolsos traseiros embutidos com botão',
      'Tecido fresco que permite ventilação natural',
      'Toque macio pré-lavado com amaciante natural'
    ],
    composition: '55% Linho Puro, 45% Algodão Orgânico',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [
      { name: 'Kaki Deserto', hex: '#C2B280', tailwindBg: 'bg-[#C2B280]' },
      { name: 'Azul Marinho', hex: '#1B263B', tailwindBg: 'bg-[#1B263B]' },
      { name: 'Verde Musgo', hex: '#4A5320', tailwindBg: 'bg-[#4A5320]' }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=80',
    tag: 'Verão Refinado'
  },
  {
    id: 'prod-11',
    name: 'Macacão Utilitário Manga Curta',
    category: 'feminino',
    subcategory: 'Macacões',
    price: 419.00,
    originalPrice: 479.00,
    rating: 4.8,
    reviewsCount: 35,
    isNew: true,
    description: 'Macacão one-piece contemporâneo com bolsos utilitários frontais, gola camiseira e amarração com cinto no mesmo tecido. Prático, imponente e incrivelmente confortável.',
    details: [
      'Abotoamento frontal oculto até o quadril',
      'Pernas afuniladas com opção de dobra na barra',
      'Bolsos cargo discretos na altura do peito',
      'Cinto de amarrar removível'
    ],
    composition: '60% Tencel Lyocell, 40% Linho',
    sizes: ['PP', 'P', 'M', 'G'],
    colors: [
      { name: 'Verde Militar Suave', hex: '#586249', tailwindBg: 'bg-[#586249]' },
      { name: 'Areia Duna', hex: '#D8CAB8', tailwindBg: 'bg-[#D8CAB8]' }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
    tag: 'One Piece'
  },
  {
    id: 'prod-12',
    name: 'Cardigan Canelado Fios Nobres',
    category: 'unissex',
    subcategory: 'Malhas & Tricôs',
    price: 310.00,
    rating: 4.9,
    reviewsCount: 42,
    isSustainable: true,
    description: 'Cardigan de toque sedoso e trama canelada vertical com decote em V clássico. Botões em tom âmbar e comprimento pensado para composições em camadas.',
    details: [
      'Tricotado em maquinário fino de alta precisão',
      'Corte reto equilibrado para qualquer gênero',
      'Resistente a deformações térmicas',
      'Sensação de aconchego térmico imediato'
    ],
    composition: '50% Algodão Pima, 50% Modal Sustentável',
    sizes: ['PP', 'P', 'M', 'G', 'GG'],
    colors: [
      { name: 'Preto Noite', hex: '#1E1E1E', tailwindBg: 'bg-[#1E1E1E]' },
      { name: 'Nude Avelã', hex: '#C9B39B', tailwindBg: 'bg-[#C9B39B]' },
      { name: 'Vinho Bordô', hex: '#5C1D24', tailwindBg: 'bg-[#5C1D24]' }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1000&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80',
    tag: 'Atemporal'
  }
];

export const LOOKBOOK_ITEMS: LookbookItem[] = [
  {
    id: 'look-1',
    title: 'Minimalismo Solar',
    subtitle: 'Tons neutros de linho cru e modelagens que respiram ao vento.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
    season: 'Alto Verão / Outono 2026',
    productIds: ['prod-1', 'prod-4']
  },
  {
    id: 'look-2',
    title: 'Alfaiataria Descontraída',
    subtitle: 'Linhas retas que equilibram elegância formal e leveza do cotidiano.',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=80',
    season: 'Coleção Permanente',
    productIds: ['prod-3', 'prod-10']
  },
  {
    id: 'look-3',
    title: 'Fluidos e Texturas Botânicas',
    subtitle: 'Fibras certificadas com drapeados delicados para ocasiões especiais.',
    image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1200&q=80',
    season: 'Série Autoral',
    productIds: ['prod-2', 'prod-8']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Helena Vasconcelos',
    city: 'São Paulo, SP',
    rating: 5,
    comment: 'O Blazer de Linho Cru superou todas as expectativas. O acabamento das costuras internas e o caimento nos ombros são dignos de alta costura internacional. Já é minha terceira compra!',
    purchasedItem: 'Blazer Estruturado em Linho Cru',
    date: 'Há 3 dias',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'test-2',
    name: 'Rodrigo Sampaio',
    city: 'Curitiba, PR',
    rating: 5,
    comment: 'A camisa de linho europeu é impecável. Fresca para os dias quentes e estruturada o suficiente para reuniões de trabalho. O atendimento e a embalagem cheia de cuidado fizeram a diferença.',
    purchasedItem: 'Camisa Masculina Linho Puro',
    date: 'Há 1 semana',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'test-3',
    name: 'Marina Bittencourt',
    city: 'Rio de Janeiro, RJ',
    rating: 5,
    comment: 'O provador virtual acertou em cheio o meu tamanho M na calça wide leg. Não precisei fazer nenhuma bainha. O tecido tem um peso maravilhoso que não amassa fácil.',
    purchasedItem: 'Calça Alfaiataria Wide Leg',
    date: 'Há 2 semanas',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80'
  }
];

export const FAQS = [
  {
    question: 'Como funciona a primeira troca gratuita?',
    answer: 'A primeira troca na nossa loja é 100% gratuita no prazo de até 30 dias após o recebimento. Você solicita pelo site, recebe o código de postagem dos Correios ou coleta domiciliar, e escolhe um novo tamanho ou peça sem nenhum custo adicional de frete.'
  },
  {
    question: 'De onde vêm os tecidos e como é feita a produção?',
    answer: 'Todas as nossas peças são confeccionadas artesanalmente no Brasil por oficinas auditadas com remuneração justa. Nossos linhos têm certificação europeia de procedência e nosso algodão possui selo BCI e certificação orgânica GOTS.'
  },
  {
    question: 'Quais são as opções e prazos de entrega?',
    answer: 'Oferecemos entrega Expressa (receba em até 2 dias úteis nas capitais) e Padrão rastreável para todo o Brasil. O frete é gratuito para compras a partir de R$ 299,00.'
  },
  {
    question: 'Quais formas de pagamento são aceitas?',
    answer: 'Aceitamos Pix com 5% de desconto automático na hora da finalização, Cartões de Crédito em até 6x sem juros (Visa, Mastercard, Elo, Amex) e Boleto Bancário.'
  }
];
