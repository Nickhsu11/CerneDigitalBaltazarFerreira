/* Carrinho de orçamento: localStorage, chave "carrinho", lista de {id,name,description,image,quantity}. Nunca submete nada. */
(function () {
  var KEY = "carrinho";
  function read() { try { var v = JSON.parse(localStorage.getItem(KEY)); return Array.isArray(v) ? v : []; } catch (e) { return []; } }
  function write(l) { try { localStorage.setItem(KEY, JSON.stringify(l)); } catch (e) {} paint(true); document.dispatchEvent(new CustomEvent("carrinho:change", { detail: l })); }
  function count(l) { return l.reduce(function (n, i) { return n + (Number(i.quantity) || 0); }, 0); }
  function paint(bump) {
    var n = count(read());
    document.querySelectorAll("[data-cart-count]").forEach(function (el) {
      el.textContent = n; el.hidden = n === 0;
      if (bump) { el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump"); }
    });
  }
  window.Carrinho = {
    get: read,
    add: function (p) {
      var l = read(), f = l.find(function (i) { return i.id === p.id; });
      if (f) f.quantity = (Number(f.quantity) || 0) + 1;
      else l.push({ id: p.id, name: p.name, description: p.description || "", image: p.image || "", quantity: 1 });
      write(l);
    },
    remove: function (id) { write(read().filter(function (i) { return i.id !== id; })); }
  };
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-add-cart]"); if (!b) return;
    e.preventDefault();
    window.Carrinho.add({ id: b.dataset.id, name: b.dataset.name, description: b.dataset.description, image: b.dataset.image });
  });
  window.addEventListener("storage", function (e) { if (e.key === KEY) paint(false); });
  document.addEventListener("DOMContentLoaded", function () { paint(false); });
})();
