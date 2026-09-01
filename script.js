/* ===== cake.smile — script ===== */
(function () {
  "use strict";

  // --- Menu data ---
  var menu = [
    { emoji: "🎂", name: "Праздничный торт", desc: "Бисквит на выбор, нежный крем и авторский декор под ваш повод.", price: "от 1800 ₽", unit: "/ кг" },
    { emoji: "🧁", name: "Капкейки", desc: "Воздушные кексы с кремовой шапочкой. Набор из 6 или 12 штук.", price: "от 150 ₽", unit: "/ шт" },
    { emoji: "🍬", name: "Макаруны", desc: "Хрустящие французские макаронс с разными начинками.", price: "от 90 ₽", unit: "/ шт" },
    { emoji: "🍮", name: "Чизкейк", desc: "Классический нью-йоркский или с ягодным соусом.", price: "от 1400 ₽", unit: "/ кг" },
    { emoji: "🍩", name: "Пончики", desc: "Домашние глазированные пончики с яркими посыпками.", price: "от 120 ₽", unit: "/ шт" },
    { emoji: "🎁", name: "Сладкий бокс", desc: "Ассорти десертов в красивой коробке — идеальный подарок.", price: "от 990 ₽", unit: "/ бокс" }
  ];

  var grid = document.getElementById("menuGrid");
  if (grid) {
    menu.forEach(function (item) {
      var card = document.createElement("article");
      card.className = "menu-card";
      card.innerHTML =
        '<div class="menu-emoji">' + item.emoji + "</div>" +
        "<h3>" + item.name + "</h3>" +
        "<p>" + item.desc + "</p>" +
        '<div class="menu-foot">' +
          '<span class="price">' + item.price + " <small>" + item.unit + "</small></span>" +
          '<button class="add-btn" type="button" data-name="' + item.name + '">Заказать</button>' +
        "</div>";
      grid.appendChild(card);
    });

    // Clicking "Заказать" on a card preselects it in the order form
    grid.addEventListener("click", function (e) {
      var btn = e.target.closest(".add-btn");
      if (!btn) return;
      var select = document.getElementById("dessert");
      if (select) {
        var name = btn.getAttribute("data-name");
        for (var i = 0; i < select.options.length; i++) {
          if (name.indexOf(select.options[i].value) !== -1 || select.options[i].value.indexOf(name) !== -1) {
            select.selectedIndex = i;
            break;
          }
        }
      }
      var order = document.getElementById("order");
      if (order) order.scrollIntoView({ behavior: "smooth" });
    });
  }

  // --- Mobile nav ---
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

  // --- Order form (demo, no backend) ---
  var form = document.getElementById("orderForm");
  var note = document.getElementById("formNote");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.querySelector("#name");
      var phone = form.querySelector("#phone");
      if (!name.value.trim() || !phone.value.trim()) {
        (name.value.trim() ? phone : name).focus();
        return;
      }
      if (note) note.hidden = false;
      form.reset();
    });
  }

  // --- Footer year ---
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
