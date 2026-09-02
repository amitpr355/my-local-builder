document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  if (!header || !toggle) return;

  toggle.addEventListener("click", () => {
    header.classList.toggle("is-open");
  });
});
// sticky header
const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    header.classList.add("is-sticky");
  } else {
    header.classList.remove("is-sticky");
  }
});
// GSAP Animations
// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);
if (window.innerWidth > 768) {
  gsap.from("nav", {
    y: -50,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
  });

  gsap.from("#hero .container", {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 0.5,
    ease: "power2.out",
  });

  gsap.from("#Advice-section .col-md-4", {
    scrollTrigger: {
      trigger: "#Advice-section",
      start: "top 80%",
    },
    opacity: 0,
    y: -100,
    duration: 0.8,
    ease: "power2.out",
  });

  gsap.from("#Advice-section .col-md-8", {
    scrollTrigger: {
      trigger: "#Advice-section",
      start: "top 80%",
    },
    opacity: 0,
    y: 100,
    duration: 0.8,
    ease: "power2.out",
    delay: 0.3,
  });

  gsap.from("#testimonial .col-md-6:nth-child(1)", {
    scrollTrigger: {
      trigger: "#testimonial",
      start: "top 80%",
    },
    opacity: 0,
    y: -100,
    duration: 0.8,
    ease: "power2.out",
  });

  gsap.from("#testimonial .testimonial-text", {
    scrollTrigger: {
      trigger: "#testimonial",
      start: "top 80%",
    },
    opacity: 0,
    y: 100,
    duration: 0.8,
    ease: "power2.out",
    delay: 0.3,
  });

  gsap.from("#my-story .col-md-6:nth-child(1)", {
    scrollTrigger: {
      trigger: "#my-story",
      start: "top 80%",
    },
    opacity: 0,
    y: -100,
    duration: 0.8,
    ease: "power2.out",
  });

  gsap.from("#my-story .col-md-6:nth-child(2)", {
    scrollTrigger: {
      trigger: "#my-story",
      start: "top 80%",
    },
    opacity: 0,
    y: 100,
    duration: 0.8,
    ease: "power2.out",
    delay: 0.3,
  });

  gsap.from("#help .help-box", {
    scrollTrigger: {
      trigger: "#help",
      start: "top 80%",
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    ease: "power2.out",
  });

  gsap.from("#footer", {
    scrollTrigger: {
      trigger: "#footer",
      start: "top 90%",
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    ease: "power2.out",
  });
}
