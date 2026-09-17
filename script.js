/* ===== cake.smile — script ===== */
(function () {
  "use strict";

  /* --------------------------------------------------------------
     НАСТРОЙКА: укажите ваш Telegram-логин (без @).
     Все кнопки «Написать/Заказать» ведут сюда.
  ---------------------------------------------------------------- */
  var TELEGRAM_USERNAME = "cakesmilee"; // Telegram-логин кондитерской
  var TG_LINK = "https://t.me/" + TELEGRAM_USERNAME;

  // Проставляем ссылку на всех кнопках .js-tg
  document.querySelectorAll(".js-tg").forEach(function (el) {
    el.setAttribute("href", TG_LINK);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });

  /* ===== Мобильное меню ===== */
  var burger = document.getElementById("burger");
  var nav = document.getElementById("nav");
  if (burger && nav) {
    burger.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      burger.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("open");
        burger.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ===== Расчёт за 3 вопроса ===== */
  var calcForm = document.getElementById("calcForm");
  if (calcForm) {
    // Выбор чипов (по одному в группе)
    calcForm.querySelectorAll(".chips").forEach(function (group) {
      group.addEventListener("click", function (e) {
        var chip = e.target.closest(".chip");
        if (!chip) return;
        group.querySelectorAll(".chip").forEach(function (c) { c.classList.remove("active"); });
        chip.classList.add("active");
        // Живая сводка «Ваша заявка»
        var key = group.getAttribute("data-key");
        if (key) {
          var line = document.querySelector('.cs-line[data-k="' + key + '"] .v');
          if (line) { line.textContent = chip.textContent.trim(); line.classList.remove("empty"); }
        }
      });
    });

    calcForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var pick = function (name) {
        var g = calcForm.querySelector('.chips[data-name="' + name + '"] .chip.active');
        return g ? g.getAttribute("data-val") : "—";
      };
      var msg =
        "Здравствуйте! Хочу заказать торт в cake.smile:\n" +
        "• Формат: " + pick("format") + "\n" +
        "• Повод: " + pick("occasion") + "\n" +
        "• Вкус: " + pick("taste") + "\n" +
        "Подскажите, пожалуйста, по стоимости и срокам.";

      var note = document.getElementById("calcNote");
      var openTg = function () { window.open(TG_LINK, "_blank", "noopener"); };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(msg).then(function () {
          if (note) note.hidden = false;
          openTg();
        }).catch(function () {
          if (note) { note.hidden = false; note.textContent = "Скопируйте текст заявки и отправьте нам в Telegram."; }
          openTg();
        });
      } else {
        if (note) note.hidden = false;
        openTg();
      }
    });
  }

  /* ===== Соц-иконки в футере (бренд-колонка) ===== */
  var brandCol = document.querySelector(".site-footer .footer-col");
  if (brandCol && !brandCol.querySelector(".footer-social")) {
    var tg = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212-.07-.062-.174-.041-.249-.024-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>';
    var ig = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>';
    var soc = document.createElement("div");
    soc.className = "footer-social";
    soc.innerHTML =
      '<a href="' + TG_LINK + '" target="_blank" rel="noopener" aria-label="Telegram">' + tg + "</a>" +
      '<a href="https://instagram.com/cake.smile" target="_blank" rel="noopener" aria-label="Instagram">' + ig + "</a>";
    brandCol.appendChild(soc);
  }

  /* ===== Кнопка «Написать в Telegram» в мобильном меню ===== */
  var navMenu = document.getElementById("nav");
  if (navMenu && !navMenu.querySelector(".nav-mobile-cta")) {
    var plane = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.9 4.3 2.6 11.3c-1 .4-1 1.3 0 1.6l4.8 1.5 1.8 5.7c.2.6.8.7 1.2.3l2.7-2.5 4.7 3.4c.6.4 1.3.1 1.5-.6L23.4 5.2c.2-.8-.5-1.4-1.5-.9z" fill="currentColor"/></svg>';
    var mcta = document.createElement("a");
    mcta.className = "nav-mobile-cta";
    mcta.setAttribute("href", TG_LINK);
    mcta.setAttribute("target", "_blank");
    mcta.setAttribute("rel", "noopener");
    mcta.innerHTML = plane + "Написать в Telegram";
    navMenu.appendChild(mcta);
  }

  /* ===== Год в подвале ===== */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ===== Появление блоков при прокрутке (хаотичный порядок) ===== */
  (function () {
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    var sel = [
      ".section-head", ".hero-split-text", ".hero-photo-card",
      ".tasting", ".showcase", ".subhero",
      ".contacts-hero", ".cl-row", ".calc-fields", ".calc-summary",
      "[class*='-card']", "[class*='-grid'] > *",
      ".pricebox", ".info-note", ".info-card", ".step",
      ".ph-gal", ".ag-pol", ".about-polaroid",
      ".footer-col"
    ].join(",");

    var all = Array.prototype.slice.call(document.querySelectorAll(sel));
    // только внешние элементы (без отмеченного предка) — чтобы не было вложенных анимаций
    var nodes = all.filter(function (n) {
      return !all.some(function (m) { return m !== n && m.contains(n); });
    });

    var variants = ["rv-up", "rv-down", "rv-left", "rv-right", "rv-scale", "rv-tilt"];
    var vh = window.innerHeight || document.documentElement.clientHeight;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -7% 0px" });

    nodes.forEach(function (el) {
      if (el.getBoundingClientRect().top < vh) return; // уже видно при загрузке — не прячем (без мигания)
      el.classList.add("reveal", variants[(Math.random() * variants.length) | 0]);
      el.style.transitionDelay = (Math.random() * 0.14).toFixed(2) + "s";
      io.observe(el);
    });
  })();
})();
