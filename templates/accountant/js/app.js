const toggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

toggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  toggle.classList.toggle("open");
});

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// back to top btn functinality
const backToTopBtn = document.getElementById("backToTopBtn");

window.onscroll = () => {
  if (document.documentElement.scrollTop > 300) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
};

backToTopBtn.onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
// gsap animation
gsap.registerPlugin(ScrollTrigger);

// Hero text animation
gsap.from(".hero-text h1", {
  scrollTrigger: {
    trigger: "#hero",
    start: "top 80%", // when hero enters viewport
  },
  y: 80,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
});

gsap.from(".hero-text .subtitle", {
  scrollTrigger: {
    trigger: "#hero",
    start: "top 75%",
  },
  y: 40,
  opacity: 0,
  duration: 0.8,
  delay: 0.2,
  ease: "power2.out",
});

gsap.from(".hero-text .desc", {
  scrollTrigger: {
    trigger: "#hero",
    start: "top 70%",
  },
  y: 40,
  opacity: 0,
  duration: 0.8,
  delay: 0.4,
  ease: "power2.out",
});

gsap.from(".hero-btns", {
  scrollTrigger: {
    trigger: "#hero",
    start: "top 65%",
  },
  y: 30,
  opacity: 0,
  duration: 0.7,
  delay: 0.6,
  stagger: 0.2,
  ease: "power2.out",
});

gsap.from(".hero-tags span", {
  scrollTrigger: {
    trigger: "#hero",
    start: "top 60%",
  },
  y: 20,
  opacity: 0,
  duration: 0.6,
  delay: 0.8,
  stagger: 0.15,
  ease: "power1.out",
});

// Hero image animation
gsap.from(".hero-img img", {
  scrollTrigger: {
    trigger: "#hero",
    start: "top 70%",
  },
  x: 100,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out",
});
// SERVICES SECTION
gsap.from("#services .section-title", {
  scrollTrigger: {
    trigger: "#services",
    start: "top 80%",
  },
  y: 60,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
});

gsap.from("#services .service-item", {
  scrollTrigger: {
    trigger: "#services",
    start: "top 70%",
  },
  y: 50,
  opacity: 0,
  duration: 1,
  stagger: 0.3, // each item comes in one after another
  ease: "power2.out",
});

gsap.from("#services .service-item img", {
  scrollTrigger: {
    trigger: "#services",
    start: "top 70%",
  },
  x: 80,
  opacity: 0,
  duration: 1,
  stagger: 0.3,
  ease: "power2.out",
});

// WHY CHOOSE ME SECTION
gsap.from("#why-choose-me .section-title", {
  scrollTrigger: {
    trigger: "#why-choose-me",
    start: "top 80%",
  },
  y: 60,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
});

gsap.from("#why-choose-me .feature-icon", {
  scrollTrigger: {
    trigger: "#why-choose-me",
    start: "top 65%",
  },
  scale: 0.5,
  opacity: 0,
  duration: 0.6,
  delay: 0.2,
  stagger: 0.2,
  ease: "back.out(1.7)",
});
// TESTIMONIALS SECTION
gsap.from("#testimonials .section-title", {
  scrollTrigger: {
    trigger: "#testimonials",
    start: "top 80%",
  },
  y: 60,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
});

gsap.from("#testimonials", {
  scrollTrigger: {
    trigger: "#testimonials",
    start: "top 70%",
  },
  y: 50,
  opacity: 0,
  duration: 0.9,
  stagger: 0.25,
  ease: "power2.out",
});

gsap.from("#testimonials .testimonials-logos", {
  scrollTrigger: {
    trigger: "#testimonials",
    start: "top 65%",
  },
  scale: 0.5,
  opacity: 0,
  duration: 0.8,
  stagger: 0.2,
  ease: "back.out(1.7)",
});

// QUOTE SECTION
gsap.from("#quote .quote-image img", {
  scrollTrigger: {
    trigger: "#quote",
    start: "top 80%",
  },
  y: -80,
  opacity: 0,
  duration: 1,
  ease: "power2.out",
});

gsap.from("#quote .quote-form", {
  scrollTrigger: {
    trigger: "#quote",
    start: "top 75%",
  },
  y: 80,
  opacity: 0,
  duration: 1,
  ease: "power2.out",
});

gsap.from("#quote .quote-form input, #quote .quote-form button", {
  scrollTrigger: {
    trigger: "#quote",
    start: "top 70%",
  },
  y: 30,
  opacity: 0,
  duration: 0.6,
  stagger: 0.15,
  ease: "power2.out",
});

// FOOTER SECTION
gsap.from("#footer .footer-box", {
  scrollTrigger: {
    trigger: "#footer",
    start: "top 85%",
  },
  y: 50,
  opacity: 0,
  duration: 0.9,
  stagger: 0.3,
  ease: "power2.out",
});

gsap.from("#footer .footer-bottom", {
  scrollTrigger: {
    trigger: "#footer",
    start: "top 90%",
  },
  y: 20,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
});
