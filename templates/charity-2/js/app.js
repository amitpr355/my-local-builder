(function () {
  const navbar = document.querySelector(".zg-navbar");
  const toggle = document.querySelector(".zg-navbar__toggle");
  const mobileNav = document.getElementById("zgMobileNav");

  if (!navbar || !toggle || !mobileNav) return;

  function closeMenu() {
    navbar.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", (e) => {
    e.preventDefault();
    const isOpen = navbar.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // close when clicking a link
  mobileNav.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (a) closeMenu();
  });

  // close on outside click
  document.addEventListener("click", (e) => {
    if (!navbar.contains(e.target)) closeMenu();
  });

  // close on escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
})();
// sticky navbar

(function () {
  const navbar = document.querySelector(".zg-navbar");
  if (!navbar) return;

  const stickyAfter = 80; // px after which it becomes sticky

  function onScroll() {
    if (window.scrollY > stickyAfter) navbar.classList.add("is-sticky");
    else navbar.classList.remove("is-sticky");
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();

// back to top btn
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
// gsap animation start heare
if (window.innerWidth > 768) {
  gsap.registerPlugin(ScrollTrigger);

  // Animate Left Text
  gsap.from(".hero-left", {
    x: -100,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#hero",
      start: "top 80%",
      end: "bottom 60%",
      toggleActions: "play none none reverse",
    },
  });

  // Animate Right Text
  gsap.from(".hero-right", {
    x: 100,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#hero",
      start: "top 80%",
      end: "bottom 60%",
      toggleActions: "play none none reverse",
    },
  });

  // Animate Join Us Right (text)
  gsap.from(".join-right", {
    y: 100,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#join-us",
      start: "top 80%",
      end: "bottom 60%",
      toggleActions: "play none none",
    },
  });
  // Mission Header Animation
  gsap.from(".mission-header", {
    y: -50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#mission",
      start: "top 85%",
      toggleActions: "play none none",
    },
  });

  // Mission Items Animation (staggered)
  gsap.from(".mission-item", {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    stagger: 0.2,
    scrollTrigger: {
      trigger: ".mission-wrapper",
      start: "top 80%",
      toggleActions: "play none none",
    },
  });

  // Mission Button Animation
  gsap.from(".mission-btn", {
    scale: 0.8,
    opacity: 0,
    duration: 1,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: ".mission-btn",
      start: "top 90%",
      toggleActions: "play none none",
    },
  });

  // Project Heading Animation
  gsap.from(".project-heading", {
    y: -50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#projects",
      start: "top 85%",
      toggleActions: "play none none",
    },
  });

  // Project Cards Animation (staggered)
  gsap.from(".project-card", {
    y: 120,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
    stagger: 0.25,
    scrollTrigger: {
      trigger: ".card-wraper",
      start: "top 80%",
      toggleActions: "play none none",
    },
  });

  // Partners Section
  gsap.from(".partners-text", {
    x: -100,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#partners",
      start: "top 80%",
      toggleActions: "play none none",
    },
  });

  gsap.from(".partners-logos img", {
    y: 80,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    stagger: 0.2,
    scrollTrigger: {
      trigger: ".partners-logos",
      start: "top 85%",
      toggleActions: "play none none",
    },
  });

  // Testimonial Section
  gsap.from(".testimonial-content", {
    scale: 0.8,
    opacity: 0,
    duration: 1.2,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: "#testimonial",
      start: "top 85%",
      toggleActions: "play none none",
    },
  });

  // Footer Section
  gsap.from(".footer-col", {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    stagger: 0.25,
    scrollTrigger: {
      trigger: "#footer",
      start: "top 90%",
      toggleActions: "play none none ",
    },
  });

  gsap.from(".footer-bottom", {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    delay: 0.3,
    scrollTrigger: {
      trigger: ".footer-bottom",
      start: "top 95%",
      toggleActions: "play none none",
    },
  });
}
