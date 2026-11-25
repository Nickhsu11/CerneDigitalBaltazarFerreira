/* Menu móvel, cabeçalho sólido, entrada ao scroll, contadores e separadores. Só melhoria: o conteúdo já está no HTML. */
(function () {
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hd = document.querySelector(".site-header");
  function sc() { if (hd) hd.classList.toggle("is-solid", scrollY > 8); }
  sc(); addEventListener("scroll", sc, { passive: true });

  var mb = document.querySelector(".menu-btn"), dr = document.getElementById("drawer");
  if (mb && dr) {
    function set(o) { mb.setAttribute("aria-expanded", o); dr.classList.toggle("open", o); document.body.style.overflow = o ? "hidden" : ""; }
    mb.addEventListener("click", function () { set(mb.getAttribute("aria-expanded") !== "true"); });
    dr.addEventListener("click", function (e) { if (e.target.closest("a")) set(false); });
    addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
  }

  function count(el) {
    var end = parseFloat(el.dataset.count), suf = el.dataset.suffix || "", t0 = null;
    if (reduce) return;
    function step(t) { if (!t0) t0 = t; var p = Math.min((t - t0) / 1200, 1), v = Math.round(end * (1 - Math.pow(1 - p, 3))); el.textContent = v + suf; if (p < 1) requestAnimationFrame(step); }
    el.textContent = "0" + suf; requestAnimationFrame(step);
  }
  var els = document.querySelectorAll(".rv,.reg,[data-count]");
  if (!("IntersectionObserver" in window)) els.forEach(function (e) { e.classList.add("in"); });
  else {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (x) { if (!x.isIntersecting) return; x.target.classList.add("in"); if (x.target.dataset.count) count(x.target); io.unobserve(x.target); });
    }, { threshold: .15 });
    els.forEach(function (e) { io.observe(e); });
  }

  document.querySelectorAll("[data-tabs]").forEach(function (box) {
    var tabs = [].slice.call(box.querySelectorAll('[role="tab"]')), panels = tabs.map(function (t) { return document.getElementById(t.getAttribute("aria-controls")); });
    function sel(i, focus) {
      tabs.forEach(function (t, j) { var on = i === j; t.setAttribute("aria-selected", on); t.tabIndex = on ? 0 : -1; panels[j].classList.toggle("on", on); panels[j].hidden = !on; });
      if (focus) tabs[i].focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () { sel(i); });
      t.addEventListener("keydown", function (e) {
        var k = e.key, n = tabs.length;
        if (k === "ArrowRight") { e.preventDefault(); sel((i + 1) % n, true); }
        else if (k === "ArrowLeft") { e.preventDefault(); sel((i + n - 1) % n, true); }
        else if (k === "Home") { e.preventDefault(); sel(0, true); }
        else if (k === "End") { e.preventDefault(); sel(n - 1, true); }
      });
    });
  });
})();
