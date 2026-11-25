# Notas da casca (Baltazar Ferreira)

Ficheiros: `public/assets/style.css`, `carrinho.js`, `site.js`; layout `src/layouts/Base.astro`. Caminhos sempre absolutos (`/assets/...`, `/pagina/`).

## Uso
```astro
import Base from "../../layouts/Base.astro";
<Base title="..." description="..." canonical="https://baltazarferreira.com/x/">
  <section class="hero">...</section> ...
</Base>
```
Base trata cabeçalho, gaveta móvel, rodapé, carrinho e animação. `aria-current` automático pelo URL. Slot opcional `head` para JSON-LD.

## Variáveis (:root)
--ink --ink-2 --blue --blue-soft --sky --cyan --magenta --yellow --accent --bg --paper --text --muted --line; --font-display --font-body; --r-s/-m/-l; --shadow --shadow-up; --max-page --max-text --header-h.

## Classes
- Estrutura: `.wrap` (largura máx.), `.sec` (+ `.sec-tint`, `.sec-ink`), `.sec-head`, `.eyebrow` (rótulo com pontos CMY).
- Herói: `.hero` (escuro, o conteúdo começa abaixo do cabeçalho fixo; páginas sem herói devem pôr `padding-top:calc(var(--header-h) + 2rem)` na 1.ª secção), `.reg` com `figure` (imagens com desalinhamento CMY).
- Botões: `.btn` + `.btn-accent | .btn-ink | .btn-ghost | .btn-sm`.
- Cartões: `.cards` (grelha auto) > `.card` > `.ico` (SVG Lucide 24x24 dentro), h3, p, `.more-link`.
- Números: `.stats > .stat > .num[data-count][data-suffix]`.
- «Ler mais»: `details.more > summary + .more-body`.
- Separadores: `[data-tabs] > .tablist[role=tablist] > button.tab[role=tab][aria-controls]` + `.panel[role=tabpanel][hidden]`; teclado com setas, Home, End. Primeiro painel com classe `on`.
- Faixa final: `.sec.cta`. Pontos: `.dots`, `.dots-dark`.
- Entrada ao scroll: `.rv` (+ `style="--i:n"` para cascata).

## Carrinho (`/assets/carrinho.js`)
localStorage `carrinho`: [{id,name,description,image,quantity}]. Botão de adicionar: `<button data-add-cart data-id data-name data-description data-image>` (soma 1). `window.Carrinho.get()`, `.add(p)`, `.remove(id)` (apaga a linha); evento `carrinho:change` em `document`. Contador `[data-cart-count]` atualizado em todas as páginas. O ícone liga a `/contact/`: a página de contacto pode listar `Carrinho.get()`. Nunca submete.

## Rodapé
Colunas Serviços / Produtos / Empresa, WhatsApp, morada, telefone, email, © 2025.
