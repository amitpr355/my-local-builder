const el = document.getElementById("typewriter");
const cursor = document.querySelector(".cursor");
const words = [
  "your business",
  "your audience",
  "social impact",
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const current = words[wordIndex];
  if (!isDeleting) {
    el.textContent = current.slice(0, ++charIndex);
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(type, 1500); // pause before deleting
      return;
    }
  } else {
    el.textContent = current.slice(0, --charIndex);
    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }
  setTimeout(type, isDeleting ? 50 : 80);
}

document.addEventListener("DOMContentLoaded", type);
