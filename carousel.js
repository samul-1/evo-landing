const prevBtn = document.querySelector("div.prev-arrow");
const nextBtn = document.querySelector("div.next-arrow");
const sectionContainer = document.querySelector("div.carousel-sections");

let gotoHandle = null;

prevBtn.onclick = prev;
nextBtn.onclick = next;

let currentIndex = 0;
let slides = [];
let dots = [];
let anchors = [];

function render() {
  let offset = 0;
  slides.forEach((slide, index) => {
    if (index < currentIndex) {
      offset += slide.offsetWidth;
    }
  });

  sectionContainer.style.transform = `translateX(-${offset}px)`;
  dots.forEach((dot, index) => {
    index === currentIndex
      ? dot.classList.add("active")
      : dot.classList.remove("active");
  });

  anchors.forEach((anchor, index) => {
    index === currentIndex
      ? anchor.classList.add("active")
      : anchor.classList.remove("active");
  });

  clearTimeout(gotoHandle);
  gotoHandle = setTimeout(next, 5000);
}

function mod(n, m) {
  return ((n % m) + m) % m;
}

function prev() {
  console.log(currentIndex);
  currentIndex = mod(currentIndex - 1, slides.length);
  console.log(currentIndex);

  render();
}

function next() {
  currentIndex = mod(currentIndex + 1, slides.length);
  render();
}

function goto(newIndex) {
  if (newIndex < 0 || newIndex > slides.length - 1) return;
  currentIndex = newIndex;
  render();
}

function init() {
  const newSlides = document.querySelectorAll("div.carousel-sections > div");
  slides = newSlides;

  const newDots = document.querySelectorAll("div.carousel-dots > div");
  newDots.forEach((dot, index) => {
    dot.onclick = () => goto(index);
  });
  dots = newDots;

  const newAnchors = document.querySelectorAll(".carousel-anchor");
  console.log(newAnchors);
  newAnchors.forEach((anchor, index) => {
    anchor.onclick = () => goto(index);
  });
  anchors = newAnchors;

  render();
}

init();
