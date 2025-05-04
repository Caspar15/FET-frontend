/* ===========================================================
   coinExchange.js  – Tab / Banner / Filter
   =========================================================== */
document.addEventListener("DOMContentLoaded", () => {
  /* ---------- 模擬資料 ---------- */
  const data = {
    featured: [
      { img: "續約.png", name: "心生活會員續約送 30 遠傳幣", coin: 1, ori: 1 },
      {
        img: "一日蔬果.png",
        name: "【VIP/四星用戶】波蜜一日蔬果 35元",
        coin: 3,
        ori: 35,
        vip: true,
      },
      {
        img: "波蜜限時好康.png",
        name: "【限時好康】1幣抽波蜜果菜汁/箱",
        coin: 28,
        ori: 388,
      },
      {
        img: "新生活專屬指定空機.png",
        name: "【心生活專屬】指定空機券折 $3,000",
        coin: 300,
        ori: 3000,
      },
    ],
    brands: [
      { img: "遠傳電信.png", name: "遠傳電信" },
      { img: "星巴克.png", name: "星巴克" },
      { img: "friday購物.png", name: "friday購物" },
      { img: "麥當勞.jpg", name: "麥當勞" },
      { img: "肯德基.png", name: "肯德基" },
      { img: "必勝客.png", name: "必勝客" },
      { img: "逐間.jpg", name: "築間餐飲集團" },
      { img: "21.jpg", name: "21風味館" },
      { img: "mister.png", name: "統一多拿滋" },
    ],
  };

  /* ---------- DOM ---------- */
  const tabs = document.querySelectorAll(".tab-btn");
  const sections = document.querySelectorAll(".section");
  const banners = document.querySelectorAll(".banner");
  const filterBar = document.querySelector(".filter-bar");
  const filterSel = document.getElementById("product-filter");
  const tplCard = document.getElementById("tpl-product-card");

  /* ---------- Render ---------- */
  function render(listId) {
    const grid = document.querySelector(`[data-list="${listId}"]`);
    if (grid.dataset.rendered) return; // 不重複產生
    data[listId].forEach((p) => {
      const node = tplCard.content.cloneNode(true);
      node.querySelector(".product-img").src = `../assets/goods/${p.img}`;
      node.querySelector(".product-img").alt = p.name;
      node.querySelector(".product-name").textContent = p.name;
      node.querySelector(".coin-value").textContent = p.coin ?? "";
      node.querySelector(".original-price").textContent = p.ori
        ? `原價 ${p.ori}`
        : "";
      const card = node.querySelector(".product-card");
      if (p.coin <= 1) card.dataset.coin = "1";
      if (p.vip) card.dataset.vip = "1";
      grid.appendChild(node);
    });
    grid.dataset.rendered = "1";
  }
  render("featured");
  render("brands");

  /* ---------- Tab 切換 ---------- */
  tabs.forEach((btn) =>
    btn.addEventListener("click", () => {
      const id = btn.dataset.tab;
      tabs.forEach((b) => {
        const active = b === btn;
        b.classList.toggle("active", active);
        active
          ? b.setAttribute("aria-current", "page")
          : b.removeAttribute("aria-current");
      });
      sections.forEach((s) => s.classList.toggle("active", s.id === id));
      banners.forEach((b) =>
        b.classList.toggle("hidden", b.dataset.banner !== id)
      );
      filterBar.style.display = id === "featured" ? "block" : "none";
    })
  );

  /* ---------- 篩選 ---------- */
  filterSel.addEventListener("change", (e) => {
    const val = e.target.value;
    const cards = document.querySelector(".section.active .product-card");
    document
      .querySelectorAll(".section.active .product-card")
      .forEach((card) => {
        const show =
          val === "all" ||
          (val === "1coin" && card.dataset.coin === "1") ||
          (val === "vip" && card.dataset.vip === "1");
        card.style.display = show ? "" : "none";
      });
  });

  /* ---------- 分享 Demo ---------- */
  document.addEventListener("click", (e) => {
    if (e.target.closest(".share-btn")) alert("分享功能 Demo");
  });
});
