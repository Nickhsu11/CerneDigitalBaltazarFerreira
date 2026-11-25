import { createHash } from "node:crypto";
import { existsSync } from "node:fs";

// Resolve a imagem remota do original para a cópia local (nome = md5 do endereço), se existir.
export function localImg(url: string): string | null {
  const h = createHash("md5").update(url).digest("hex");
  const bases = ["public", "astro/public", "clients/baltazarferreira/astro/public", "../site", "site", "clients/baltazarferreira/site"];
  for (const b of bases) {
    if (existsSync(`${b}/assets/img/${h}.webp`)) return `/assets/img/${h}.webp`;
  }
  return null;
}

export interface Artigo {
  slug: string; titulo: string; resumo: string; data: string; min: number; tags: string[]; img: string; pagina: boolean;
}

export const etiquetas: Record<string, string> = {
  guia: "Guia", iniciantes: "Iniciantes", equipamentos: "Equipamentos", atelier: "Atelier", produtos: "Produtos",
  tintas: "Tintas", materiais: "Materiais", tecnicas: "Técnicas", gravacao: "Gravação", quadros: "Quadros",
  servicos: "Serviços", negocio: "Negócio", empreendedorismo: "Empreendedorismo", portugal: "Portugal",
};

export const artigos: Artigo[] = [
  { slug: "o-que-e-serigrafia-guia-completo", titulo: "O Que é Serigrafia? Guia Completo para Iniciantes em Portugal",
    resumo: "Descubra tudo sobre a serigrafia: desde os fundamentos básicos até técnicas avançadas. Guia completo para quem quer começar na serigrafia em Portugal.",
    data: "2026-04-15", min: 8, tags: ["guia", "iniciantes"], pagina: true,
    img: "https://public.readdy.ai/ai/img_res/6ffa9078014b2bf8cd95a4975feff81f.webp" },
  { slug: "equipamentos-serigrafia-essenciais", titulo: "Equipamentos de Serigrafia Essenciais para o Teu Atelier",
    resumo: "Lista completa dos equipamentos indispensáveis para montar um atelier de serigrafia profissional em Portugal, com dicas de onde comprar.",
    data: "2026-04-02", min: 6, tags: ["equipamentos", "atelier", "produtos"], pagina: false,
    img: "https://public.readdy.ai/ai/img_res/88e581f7b76d91c1009247c1fc506b43.webp" },
  { slug: "tintas-serigrafia-como-escolher", titulo: "Como Escolher as Melhores Tintas para Serigrafia",
    resumo: "Guia prático para escolher tintas serigráficas: tipos, características, aplicações em tecido, plástico, papel e outros substratos.",
    data: "2026-03-20", min: 7, tags: ["tintas", "materiais", "tecnicas"], pagina: false,
    img: "https://public.readdy.ai/ai/img_res/ecded6fa6f4f8cf8ddd74d4226c03dc7.webp" },
  { slug: "gravacao-quadros-serigrafia-processo", titulo: "O Processo de Gravação de Quadros em Serigrafia",
    resumo: "Entenda passo a passo como funciona a gravação de quadros serigráficos, desde a preparação da malha até a revelação final da imagem.",
    data: "2026-03-05", min: 5, tags: ["gravacao", "quadros", "servicos"], pagina: false,
    img: "https://public.readdy.ai/ai/img_res/63310470883fe2231feae47cb7c12ee7.webp" },
  { slug: "serigrafia-negocio-lucrativo-portugal", titulo: "A Serigrafia é um Negócio Lucrativo em Portugal?",
    resumo: "Análise completa do mercado de serigrafia em Portugal: investimento inicial, margens de lucro, concorrência e oportunidades de crescimento.",
    data: "2026-02-18", min: 9, tags: ["negocio", "empreendedorismo", "portugal"], pagina: false,
    img: "https://public.readdy.ai/ai/img_res/f6ce7c029568f9b5248b9411f3964f84.webp" },
];

export const dataPt = (d: string) =>
  new Date(d + "T12:00:00").toLocaleDateString("pt-PT", { day: "numeric", month: "long", year: "numeric" });

export const href = (a: Artigo) => (a.pagina ? `/blog/${a.slug}/` : `https://baltazarferreira.com/blog/${a.slug}`);

export const artigoCompleto = {
  slug: "o-que-e-serigrafia-guia-completo",
  titulo: "O Que é Serigrafia? Guia Completo para Iniciantes em Portugal | Baltazar Ferreira Blog",
  meta: "Guia completo sobre serigrafia em Portugal. Aprenda o que é, como funciona, técnicas e equipamentos necessários para começar na serigrafia profissional.",
  h1: "O Que é Serigrafia? Guia Completo para Iniciantes em Portugal",
  abertura: "A serigrafia é uma das técnicas de impressão mais antigas e versáteis do mundo. Em Portugal, esta arte gráfica continua a ser fundamental para a indústria têxtil, publicitária e de decoração. Mas afinal, o que é serigrafia e porque é que tantos negócios em Portugal dependem desta técnica?",
  definicao: [
    "A serigrafia, também conhecida como impressão serigráfica ou silkscreen, é um processo de impressão onde a tinta é forçada através de uma malha fina (tela) que está esticada num quadro. As áreas que não devem ser impressas são bloqueadas com uma emulsão especial, deixando apenas a imagem desejada passar a tinta para o substrato.",
    "Este método permite imprimir em praticamente qualquer superfície: tecidos, plásticos, metais, papel, vidro, cerâmica e muito mais. Em Portugal, a serigrafia é usada para t-shirts, sinalização, embalagens, decoração de interiores e artigos promocionais.",
  ],
  passos: [
    ["Preparação do design", "Cria-se o desenho ou fotolito com a imagem pretendida."],
    ["Gravação do quadro", "Aplica-se emulsão fotossensível na tela e expõe-se à luz com o fotolito."],
    ["Revelação", "Lava-se a emulsão não exposta, criando a imagem na malha."],
    ["Impressão", "Coloca-se o substrato sob o quadro, aplica-se tinta e puxa-se com o rodo."],
    ["Secagem", "A peça é aquecida para fixar permanentemente a tinta."],
  ],
  vantagens: [
    ["Alta durabilidade", "As impressões serigráficas resistem a lavagens e desgaste.", "shield"],
    ["Cores vibrantes", "A tinta serigráfica oferece opacidade e brilho superiores.", "palette"],
    ["Versatilidade de substratos", "Imprime em tecido, plástico, metal, madeira, vidro.", "layers"],
    ["Custo baixo em grandes tiragens", "Quanto mais peças, mais barato fica por unidade.", "coins"],
    ["Tinta ecológica", "Tintas base água são amigas do ambiente e em conformidade com legislação portuguesa.", "leaf"],
  ],
  equipamentos: "Para montar um atelier básico de serigrafia em Portugal precisas de: quadros de alumínio com malha, emulsão fotossensível, lâmpada de revelação, tintas adequadas ao substrato, rodos de borracha, mesa de impressão e estufa de secagem. A Baltazar Ferreira fornece todos estes materiais com qualidade profissional.",
  hoje: [
    "O mercado português de serigrafia é robusto e em crescimento. Com a valorização de produtos locais e sustentáveis, muitas marcas portuguesas recorrem à serigrafia para personalizar tecidos e artigos promocionais. Cidades como Lisboa, Porto, Braga e Coimbra concentram os maiores atelies do país.",
    "Se procuras serviços de serigrafia em Portugal ou queres montar o teu próprio atelier, a Baltazar Ferreira é o parceiro ideal, oferecendo desde materiais até serviços profissionais de gravação e impressão.",
  ],
  autor: ["Baltazar Ferreira", "Especialista em Serigrafia | Baltazar Ferreira"],
  relacionados: ["equipamentos-serigrafia-essenciais", "tintas-serigrafia-como-escolher", "gravacao-quadros-serigrafia-processo"],
};

const P = {
  shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
  palette: '<circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.93 0 1.5-.67 1.5-1.5 0-.4-.15-.75-.39-1.04-.23-.29-.38-.63-.38-1.02 0-.83.67-1.5 1.5-1.5H16c3.31 0 6-2.69 6-6 0-4.96-4.49-9-10-9z"/>',
  layers: '<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
  coins: '<circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/>',
  leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  cal: '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
  arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
};
export const icon = (k: keyof typeof P) =>
  `<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${P[k]}</svg>`;
