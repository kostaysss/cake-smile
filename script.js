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

  /* ===== Десерты ===== */
  var desserts = [
    { name: "Капкейки", desc: "Кремовая шапочка, разные вкусы" },
    { name: "Макаруны", desc: "Французские macarons" },
    { name: "Пирожные", desc: "Порционные десерты" },
    { name: "Сладкий бокс", desc: "Ассорти в подарок" }
  ];
  var dGrid = document.getElementById("dessertGrid");
  if (dGrid) {
    desserts.forEach(function (d) {
      var card = document.createElement("article");
      card.className = "dessert-card";
      card.innerHTML =
        '<div class="ph ph-dessert"><span>фото</span></div>' +
        '<div class="dessert-info"><h3>' + d.name + "</h3><p>" + d.desc + "</p></div>";
      dGrid.appendChild(card);
    });
  }

  /* ===== Начинки ===== */
  var fillings = [
    { name: "Медовик", desc: "Классические медовые коржи с нежной сметанной прослойкой." },
    { name: "Красный бархат", desc: "Бисквит Red Velvet с фирменным сырным кремом." },
    { name: "Двойной шоколад", desc: "Бельгийский шоколад на воздушном шоколадном бисквите." },
    { name: "Фисташка-малина", desc: "Малиновый конфитюр, сырный крем и натуральная фисташка." },
    { name: "Солёная карамель", desc: "Миндальный бисквит, карамель, морская соль и фундук." },
    { name: "Клубничный чизкейк", desc: "Сырный крем и клубничный конфитюр на шоколадной основе." },
    { name: "Нежная ваниль", desc: "Мадагаскарская ваниль на сливочном бисквите." },
    { name: "Морковный", desc: "Пряный бисквит, апельсиновый конфитюр и грецкий орех." }
  ];
  var fGrid = document.getElementById("fillingsGrid");
  if (fGrid) {
    fillings.forEach(function (f) {
      var row = document.createElement("div");
      row.className = "filling";
      row.innerHTML = '<span class="filling-name">' + f.name + "</span>" +
        '<span class="filling-desc">' + f.desc + "</span>";
      fGrid.appendChild(row);
    });
  }

  /* ===== Галерея (плейсхолдеры) ===== */
  var gGrid = document.getElementById("galleryGrid");
  if (gGrid) {
    var layout = ["tall", "", "", "", "", "tall", "", ""];
    layout.forEach(function (mod) {
      var cell = document.createElement("div");
      cell.className = "ph ph-gal" + (mod ? " " + mod : "");
      cell.innerHTML = "<span>фото</span>";
      gGrid.appendChild(cell);
    });
  }

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
