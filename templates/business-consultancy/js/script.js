// const backToTopBtn = document.getElementById("backToTopBtn");

// window.onscroll = () => {
//   if (document.documentElement.scrollTop > 300) {
//     backToTopBtn.style.display = "block";
//   } else {
//     backToTopBtn.style.display = "none";
//   }
// };

// backToTopBtn.onclick = () => {
//   window.scrollTo({ top: 0, behavior: "smooth" });
// };
// // navigation bar animation
// const toggleBtn = document.getElementById("nav-toggle");
// const nav = document.getElementById("navbar");

// toggleBtn.addEventListener("click", () => {
//   nav.classList.toggle("show");
// });
// // GSAP animations for different sections

// if (window.innerWidth > 768) {
//   let tl = gsap.timeline();
//   tl.from("#nav-icon", {
//     opacity: 0,
//     dusration: 1,
//     y: -40,
//     delay: 0.5,
//   });
//   tl.from(".nav-item", {
//     opacity: 0,
//     dusration: 0.2,
//     y: -40,
//     // delay:.2,
//     stagger: 0.1,
//   });

//   // hero section
//   gsap.from("#hero-text-container > *", {
//     scrollTrigger: {
//       trigger: "#hero-text-container",
//       start: "top 80%",
//       toggleActions: "play none none none", // play once
//     },
//     opacity: 0,
//     y: 60,
//     duration: 1.2,
//     stagger: 0.2,
//     ease: "power2.out",
//   });

//   gsap.from(".hero-container .bg-dark", {
//     scrollTrigger: {
//       trigger: ".hero-container",
//       start: "top 100%",
//     },
//     opacity: 0,
//     duration: 1.5,
//     ease: "power1.out",
//   });

//   // about section
//   gsap.registerPlugin(ScrollTrigger);

//   gsap.from(".about-img-box", {
//     scrollTrigger: {
//       trigger: ".about-container",
//       start: "top 80%",
//     },
//     x: -100,
//     opacity: 0,
//     duration: 1.5,
//     ease: "power2.out",
//   });

//   gsap.from(".about-text-box", {
//     scrollTrigger: {
//       trigger: ".about-container",
//       start: "top 80%",
//     },
//     y: 100,
//     opacity: 0,
//     duration: 1.5,
//     delay: 0.2,
//     ease: "power2.out",
//   });

//   // service section

//   gsap.from(".what-we-do-text span, .what-we-do-text h1", {
//     scrollTrigger: {
//       trigger: ".service-section",
//       start: "top 80%",
//     },
//     opacity: 0,
//     y: 50,
//     duration: 1,
//     stagger: 0.2,
//     ease: "power2.out",
//   });

//   gsap.from(".service-card", {
//     scrollTrigger: {
//       trigger: ".service-card-container",
//       start: "top 85%",
//     },
//     opacity: 0,
//     y: 60,
//     duration: 1.2,
//     stagger: 0.2,
//     ease: "power2.out",
//   });
//   // case study section

//   gsap.from(".case-study-img-box", {
//     scrollTrigger: {
//       trigger: ".case-study-container",
//       start: "top 80%",
//     },
//     x: -100,
//     opacity: 0,
//     duration: 1.5,
//     ease: "power2.out",
//   });

//   gsap.from(".case-study-text-box > *", {
//     scrollTrigger: {
//       trigger: ".case-study-container",
//       start: "top 80%",
//     },
//     y: 60,
//     opacity: 0,
//     duration: 1.2,
//     stagger: 0.2,
//     ease: "power2.out",
//   });

//   // reviews section

//   gsap.from(".reviews-text-box > div", {
//     scrollTrigger: {
//       trigger: ".review-section",
//       start: "top 60%",
//     },
//     opacity: 0,
//     y: 50,
//     duration: 1.2,
//     stagger: 0.2,
//     ease: "power2.out",
//   });

//   gsap.from(".review-section .bg-dark", {
//     scrollTrigger: {
//       trigger: ".review-section",
//       start: "top 70%",
//     },
//     opacity: 0,
//     duration: 1.5,
//     ease: "power1.out",
//   });
//   // help section

//   gsap.from(".help-section img", {
//     scrollTrigger: {
//       trigger: ".help-section",
//       start: "top 80%",
//     },
//     x: -100,
//     opacity: 0,
//     duration: 1.2,
//     ease: "power2.out",
//   });

//   gsap.from(".help-text-section > *", {
//     scrollTrigger: {
//       trigger: ".help-section",
//       start: "top 80%",
//     },
//     y: 100,
//     opacity: 0,
//     duration: 1.2,
//     stagger: 0.2,
//     ease: "power2.out",
//   });

//   // footar section

//   gsap.from(".footer-section .col-md-6:first-child .contact-box > *", {
//     scrollTrigger: {
//       trigger: ".footer-section",
//       start: "top 90%",
//     },
//     opacity: 0,
//     y: 40,
//     duration: 1,
//     stagger: 0.2,
//     ease: "power2.out",
//   });

//   gsap.from(".footer-section .col-md-6:last-child .contact-box > *", {
//     scrollTrigger: {
//       trigger: ".footer-section",
//       start: "top 90%",
//     },
//     opacity: 0,
//     y: 40,
//     duration: 1,
//     delay: 0.2,
//     stagger: 0.2,
//     ease: "power2.out",
//   });

//   gsap.from(".footer-section .fab", {
//     scrollTrigger: {
//       trigger: ".footer-section",
//       start: "top 90%",
//     },
//     opacity: 0,
//     scale: 0.5,
//     duration: 0.8,
//     stagger: 0.1,
//     ease: "back.out(1.7)",
//   });
// }

// mobile nav
document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("navbar");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      const isOpen = nav.classList.toggle("is-open");
      toggle.classList.toggle("is-active", isOpen);
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }
});

// back to top
const backBtn = document.getElementById("backToTopBtn");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) backBtn?.classList.add("show");
  else backBtn?.classList.remove("show");
});
backBtn?.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" })
);
