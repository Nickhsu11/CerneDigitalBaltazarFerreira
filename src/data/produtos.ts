import { createHash } from "node:crypto";
import raw from "./produtos.json";

export const local = (url: string) => `/assets/img/${createHash("md5").update(url).digest("hex")}.webp`;

export type Bloco = [string, string];
export interface Produto {
  slug: string; nome: string; desc: string; categoria: string; img: string; alt: string;
  titulo: string; meta: string; h1: string; blocos: Bloco[];
}

const cartoes = new Map<string, { nome: string; desc: string }>();
for (const c of raw.cartoes as any[]) {
  const antigo = cartoes.get(c.slug);
  if (!antigo || (!antigo.nome && c.nome)) cartoes.set(c.slug, { nome: c.nome, desc: c.desc });
}

export const produtos: Produto[] = (raw.produtos as any[]).map((p) => {
  const c = cartoes.get(p.slug)!;
  const [, alt] = p.imgs[0];
  // As imagens originais dos produtos não foram descarregadas: reutilizam-se as 4 locais por categoria.
  const loc = (h: string) => `/assets/img/${h}.webp`;
  const porCat: Record<string, string> = { "Emulsões": "f20b694487fbdc0b9294ca5652470ed5", "Tintas": "723694ad9521a024a376a5e50bbb878a", "Preparação e Limpeza": "f20b694487fbdc0b9294ca5652470ed5", "Consumíveis de Impressão": "83a92eff4be4a8986e351c0e19f4d076" };
  const h = p.slug === "telas-serigraficas" ? "f4cd813b525d318ac20955b9ea0f3b40" : porCat[p.categoria[0]];
  return {
    slug: p.slug, nome: c.nome || p.h1, desc: c.desc, categoria: p.categoria[0],
    img: loc(h), alt, titulo: p.titulo, meta: p.meta, h1: p.h1, blocos: p.blocos as Bloco[],
  };
});

export const categorias = ["Emulsões", "Tintas", "Preparação e Limpeza", "Consumíveis de Impressão"];
export const rotulo: Record<string, string> = { "Consumíveis de Impressão": "Consumíveis" };
