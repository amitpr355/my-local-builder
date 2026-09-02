document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".menu-wrap");
  const links = document.querySelectorAll(".menu .nav-link");
  if (!toggle || !menu) return;

  const open = () => {
    toggle.classList.add("active");
    menu.classList.add("active");
    toggle.setAttribute("aria-expanded", "true");
    document.documentElement.classList.add("no-scroll");
  };

  const close = () => {
    toggle.classList.remove("active");
    menu.classList.remove("active");
    toggle.setAttribute("aria-expanded", "false");
    document.documentElement.classList.remove("no-scroll");
  };

  toggle.addEventListener("click", () => {
    menu.classList.contains("active") ? close() : open();
  });

  links.forEach((a) => a.addEventListener("click", close));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) close();
  });
});
// back to top button
const backToTopBtn = document.getElementById("backToTopBtn");

window.addEventListener("scroll", () => {
  if (document.documentElement.scrollTop > 300) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Register ScrollTrigger
// gsap.registerPlugin(ScrollTrigger);
// if (window.innerWidth > 768) {
//   // Navbar Animation on Load
//   gsap.from("#header nav", {
//     y: -50,
//     opacity: 0,
//     duration: 1,
//     ease: "power3.out",
//   });

//   // Hero Text Animation (Scroll-triggered)
//   gsap.from(".hero-text-box h5", {
//     scrollTrigger: {
//       trigger: "#hero",
//       start: "top center",
//     },
//     y: 50,
//     opacity: 0,
//     duration: 1,
//     ease: "power3.out",
//   });

//   gsap.from(".hero-text-box h1", {
//     scrollTrigger: {
//       trigger: "#hero",
//       start: "top center",
//     },
//     y: 80,
//     opacity: 0,
//     duration: 1.2,
//     delay: 0.2,
//     ease: "power3.out",
//   });

//   gsap.from(".hero-text-box p", {
//     scrollTrigger: {
//       trigger: "#hero",
//       start: "top center",
//     },
//     y: 80,
//     opacity: 0,
//     duration: 1.2,
//     delay: 0.4,
//     ease: "power3.out",
//   });

//   gsap.from(".button-box button", {
//     scrollTrigger: {
//       trigger: "#hero",
//       start: "top center",
//     },
//     y: 60,
//     opacity: 0,
//     duration: 1,
//     delay: 0.6,
//     stagger: 0.2,
//     ease: "power3.out",
//   });

//   // Optional: Hero Background Fade-in
//   gsap.from(".hero-container", {
//     scrollTrigger: {
//       trigger: "#hero",
//       start: "top bottom",
//     },
//     opacity: 0,
//     duration: 1,
//     ease: "power2.out",
//   });
//   // Success Section Left Content Animation
//   gsap.from(".success-section .col-lg-6.bg-yellow", {
//     scrollTrigger: {
//       trigger: ".success-section",
//       start: "top 70%",
//     },
//     x: -100,
//     opacity: 0,
//     duration: 1,
//     ease: "power3.out",
//   });

//   // Success Section Right Stats Boxes Animation (Staggered)
//   gsap.from(".success-section .col-lg-6.bg-white .col-6", {
//     scrollTrigger: {
//       trigger: ".success-section",
//       start: "top 70%",
//     },
//     y: 50,
//     opacity: 0,
//     duration: 1,
//     stagger: 0.2,
//     ease: "power3.out",
//   });

//   // Services Section Heading Animation
//   gsap.from(".service-heading", {
//     scrollTrigger: {
//       trigger: "#services",
//       start: "top 80%",
//     },
//     y: -50,
//     opacity: 0,
//     duration: 1,
//     ease: "power3.out",
//   });

//   // Get in Touch - Left Content Animation
//   gsap.from(".left-content .left-text-box", {
//     scrollTrigger: {
//       trigger: "#get-in-touch",
//       start: "top 70%",
//     },
//     x: -100,
//     opacity: 0,
//     duration: 1,
//     ease: "power3.out",
//   });

//   // Get in Touch - Right Content List Animation
//   gsap.from(".right-content .overlay-content li", {
//     scrollTrigger: {
//       trigger: "#get-in-touch",
//       start: "top 70%",
//     },
//     y: 50,
//     opacity: 0,
//     duration: 0.8,
//     stagger: 0.2,
//     ease: "power3.out",
//   });
//   // About Us Heading Animation
//   gsap.from(".about-heading", {
//     scrollTrigger: {
//       trigger: "#about-us",
//       start: "top 80%",
//     },
//     y: 50,
//     opacity: 0,
//     duration: 1,
//     ease: "power3.out",
//   });

//   // About Us Button Animation
//   gsap.from(".about-us-button", {
//     scrollTrigger: {
//       trigger: ".about-us-button",
//       start: "top 90%",
//     },
//     y: 30,
//     opacity: 0,
//     duration: 1,
//     ease: "power3.out",
//   });

//   // Testimonial Heading Animation
//   gsap.from(".testimonial-heading", {
//     scrollTrigger: {
//       trigger: "#testimonial",
//       start: "top 85%",
//     },
//     y: 50,
//     opacity: 0,
//     duration: 1,
//     ease: "power3.out",
//   });

//   // Testimonial Cards Animation (Scale Up Stagger)
//   gsap.from(".testimonial-card", {
//     scrollTrigger: {
//       trigger: "#testimonial",
//       start: "top 85%",
//     },
//     scale: 0.9,
//     opacity: 0,
//     duration: 1,
//     stagger: 0.2,
//     ease: "power3.out",
//   });

//   // Quote Form Animation (Slide from Left)
//   gsap.from(".quote-form", {
//     scrollTrigger: {
//       trigger: "#quote-faq",
//       start: "top 80%",
//     },
//     y: -100,
//     opacity: 0,
//     duration: 1.2,
//     ease: "power3.out",
//   });

//   // FAQ Heading Animation (Slide from Right)
//   gsap.from(".faq-section h6, .faq-section h3", {
//     scrollTrigger: {
//       trigger: ".faq-section",
//       start: "top 80%",
//     },
//     y: 100,
//     opacity: 0,
//     duration: 1,
//     ease: "power3.out",
//   });

//   // FAQ Items Animation (Stagger Fade-in)
//   gsap.from(".faq-item", {
//     scrollTrigger: {
//       trigger: ".faq-section",
//       start: "top 85%",
//     },
//     y: 30,
//     opacity: 0,
//     stagger: 0.2,
//     duration: 1,
//     ease: "power3.out",
//   });

//   // Footer Columns Animation (Stagger Fade-in)
//   gsap.from("#footer .row > div", {
//     scrollTrigger: {
//       trigger: "#footer",
//       start: "top 85%",
//     },
//     y: 30,
//     opacity: 0,
//     stagger: 0.2,
//     duration: 1,
//     ease: "power3.out",
//   });

//   // Footer Bottom Animation (Copyright + Icons)
//   gsap.from(".footer-bottom", {
//     scrollTrigger: {
//       trigger: ".footer-bottom",
//       start: "top 90%",
//     },
//     y: 20,
//     opacity: 0,
//     duration: 1,
//     ease: "power3.out",
//   });
// }
