/* ===========================================================
   setting.js － 服務設定頁
   =========================================================== */

/* ---------- 返回上一頁 ---------- */
document.getElementById("btn-back").addEventListener("click", () => {
  // 若沒有上一頁紀錄，則改為跳回 quiz.html
  if (history.length > 1) {
    history.back();
  } else {
    location.href = "quiz.html";
  }
});

/* ---------- 開 / 關 切換 ---------- */
document.querySelectorAll(".button-group").forEach((group) => {
  group.addEventListener("click", (e) => {
    const btn = e.target.closest(".toggle-button");
    if (!btn) return;
    group
      .querySelectorAll(".toggle-button")
      .forEach((b) => b.classList.toggle("active", b === btn));
  });
});
