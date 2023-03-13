function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

let animated = false;

function animateValues() {
  if (animated) {
    return;
  }
  animateValue(document.getElementById("number-1"), 1000, 1691, 1500);
  animateValue(document.getElementById("number-2"), 1000, 2285, 1500);
  animateValue(document.getElementById("number-3"), 10000, 30248, 1500);
  animateValue(document.getElementById("number-4"), 10, 81, 1500);
  animated = true;
}

const options = {
  root: null,
  threshold: 0.25, // 0 - 1 this works as a trigger.
  rootMargin: "0px",
};

const target = document.querySelector("#numbers-section");
const observer = new IntersectionObserver((entries) => {
  console.log("INTERS", entries);
  // each entry checks if the element is the view or not and if yes trigger the function accordingly
  entries.filter((e) => e.isIntersecting).forEach(() => animateValues());
}, options);
observer.observe(target);
