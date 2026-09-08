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

  /* ===== Верхняя контактная панель (на всех страницах) ===== */
  var PHONE = "+7 (000) 000-00-00";      // <-- ЗАМЕНИТЬ на реальный номер
  var PHONE_TEL = "+70000000000";        // <-- ЗАМЕНИТЬ (в формате tel:)
  var WHATSAPP = "https://wa.me/70000000000"; // <-- ЗАМЕНИТЬ на реальный
  (function () {
    var header = document.querySelector(".site-header");
    if (!header || document.querySelector(".topbar")) return;
    var tb = document.createElement("div");
    tb.className = "topbar";
    tb.innerHTML =
      '<div class="container topbar-inner">' +
        '<div class="topbar-contacts">' +
          '<a href="tel:' + PHONE_TEL + '">' +
            '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:6px"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.6a2 2 0 01-.5 2.1L8.1 9.6a16 16 0 006 6l1.2-1.2a2 2 0 012.1-.4c.8.3 1.7.5 2.6.6a2 2 0 011.7 2z"/></svg>' +
            PHONE + "</a>" +
          '<span class="topbar-hours">Менеджер на связи · ежедневно 9:00–20:00</span>' +
        "</div>" +
        '<div class="topbar-msg">' +
          '<a href="' + TG_LINK + '" target="_blank" rel="noopener">Telegram</a>' +
          '<a href="' + WHATSAPP + '" target="_blank" rel="noopener">WhatsApp</a>' +
        "</div>" +
      "</div>";
    header.parentNode.insertBefore(tb, header);
  })();

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

  /* ===== Год в подвале ===== */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
