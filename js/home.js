/* ——— Quick-Link 點擊提示 ——— */
document.querySelectorAll(".link-item").forEach((el) => {
  el.addEventListener("click", (e) => {
    const text = el.querySelector("span").textContent.trim();
    if (text === "打詐考古題") {
      return;
    } // 交給 href
    alert("你點擊了：「" + text + "」");
  });
});

/* ——— Banner 輪播 ——— */
const track = document.getElementById("bannerTrack");
const dots = [...document.querySelectorAll("#bannerDots .dot")];
const idx = () => Math.round(track.scrollLeft / track.offsetWidth);
const set = (i) =>
  dots.forEach((d, n) => d.classList.toggle("active", n === i));

track.addEventListener("scroll", () => set(idx()));
dots.forEach((d, i) =>
  d.addEventListener("click", () =>
    track.scrollTo({ left: i * track.offsetWidth, behavior: "smooth" })
  )
);

let timer = setInterval(next, 5000);
track.addEventListener("pointerdown", () => clearInterval(timer));
function next() {
  const n = (idx() + 1) % dots.length;
  track.scrollTo({ left: n * track.offsetWidth, behavior: "smooth" });
}
