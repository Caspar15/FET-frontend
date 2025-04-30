/* ===========================================================
   quiz.js － Hero slider + Big card button  (2024-04-07 最終修正版)
   =========================================================== */

/* ---------- DOM 抓取 ---------- */
const track   = document.getElementById("heroTrack");
const slides  = [...document.querySelectorAll(".hero-slide")];
const dots    = [...document.querySelectorAll("#heroDots .dot")];
const btnPrev = document.querySelector(".nav-btn.prev");
const btnNext = document.querySelector(".nav-btn.next");

/* ---------- 基本參數 ---------- */
let current = 0;
const slideWidth = () =>
  track.clientWidth - 24;                  // 100% 寬－左右 padding 12+12

/* ---------- 狀態切換 ---------- */
function setActive(i){
  dots.forEach((d,idx)=>d.classList.toggle("active", idx===i));
  current = i;
}

/* 可平滑滾動就 smooth，否則直接寫 scrollLeft */
function moveTo(x, smooth=true){
  if(smooth && "scrollTo" in track){
    track.scrollTo({ left:x, behavior:"smooth" });
  }else{
    track.scrollLeft = x;
  }
}

function goto(i,smooth=true){
  const target = (i + slides.length) % slides.length;
  moveTo(target * slideWidth(), smooth);
  setActive(target);
}

/* ---------- 事件監聽 ---------- */
dots.forEach((dot,i)=>dot.addEventListener("click",()=>goto(i)));
btnPrev.addEventListener("click",()=>goto(current-1));
btnNext.addEventListener("click",()=>goto(current+1));

track.addEventListener("scroll",()=>{
  const idx=Math.round(track.scrollLeft / slideWidth());
  if(idx!==current) setActive(idx);
});

/* 視窗旋轉 / resize 時校正位置 */
window.addEventListener("resize",()=>goto(current,false));

/* ---------- 自動輪播 ---------- */
let timer=setInterval(()=>goto(current+1),4000);
["pointerdown","click"].forEach(ev=>{
  track.addEventListener(ev,()=>clearInterval(timer));
  btnPrev.addEventListener(ev,()=>clearInterval(timer));
  btnNext.addEventListener(ev,()=>clearInterval(timer));
});

/* ---------- Big card button ---------- */
document.getElementById("start-btn").addEventListener("click",()=>{
  alert("開始作答（Demo）");
});

/* ---------- 初始化 ---------- */
setActive(0);
