document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!navToggle || !navMenu) return;

  function closeMenu() {
    navToggle.classList.remove("active");
    navMenu.classList.remove("active");
  }

  navToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    navToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 992) closeMenu();
  });

  document.addEventListener("click", (e) => {
    if (
      navMenu.classList.contains("active") &&
      !navMenu.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      closeMenu();
    }
  });
});

// back to top btn
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

// GSAP Animations
document.addEventListener("DOMContentLoaded", () => {
  // Respect reduced motion
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (prefersReduced) return;

  gsap.registerPlugin(ScrollTrigger);

  // Easing and defaults
  gsap.defaults({ ease: "power2.out", duration: 0.9 });

  // Helper to create a simple reveal
  const makeReveal = (target, opts = {}) => {
    const defaults = { y: 24, autoAlpha: 0 };
    gsap.from(target, {
      ...defaults,
      ...opts,
      scrollTrigger: {
        trigger: opts.trigger || target,
        start: "top 80%",
        toggleActions: "play none none reverse",
        once: opts.once ?? true,
      },
    });
  };

  // Header on load
  gsap.from(".site-header", {
    y: -40,
    autoAlpha: 0,
    duration: 0.6,
    delay: 0.1,
  });

  // Hero
  makeReveal("#hero .hero-title", { y: 30, duration: 0.9, trigger: "#hero" });
  makeReveal("#hero .text-content p", {
    y: 30,
    duration: 0.9,
    delay: 0.12,
    trigger: "#hero",
  });
  makeReveal("#hero .text-content .btn", {
    y: 26,
    duration: 0.8,
    delay: 0.18,
    trigger: "#hero",
  });
  gsap.from("#hero .hero-img img", {
    x: 40,
    autoAlpha: 0,
    duration: 1,
    scrollTrigger: { trigger: "#hero .hero-img", start: "top 85%", once: true },
  });

  // About: split image and text sides
  gsap.from("#about .about-image img", {
    x: -40,
    autoAlpha: 0,
    scrollTrigger: {
      trigger: "#about .about-image",
      start: "top 85%",
      once: true,
    },
  });
  gsap.from(["#about .about-title", "#about .about-text p"], {
    x: 40,
    autoAlpha: 0,
    stagger: 0.15,
    scrollTrigger: {
      trigger: "#about .about-text",
      start: "top 85%",
      once: true,
    },
  });

  // CTA: subtle scale pop
  gsap.from("#cta .container", {
    scale: 0.97,
    autoAlpha: 0,
    scrollTrigger: { trigger: "#cta", start: "top 85%", once: true },
  });

  // Gallery: stagger cards and add slight image pop
  gsap.from("#gallery .gallery-box", {
    y: 30,
    autoAlpha: 0,
    stagger: 0.08,
    scrollTrigger: { trigger: "#gallery", start: "top 80%", once: true },
  });
  gsap.from("#gallery .gallery-box img", {
    scale: 1.04,
    autoAlpha: 0,
    duration: 0.8,
    stagger: 0.06,
    scrollTrigger: { trigger: "#gallery", start: "top 80%", once: true },
  });

  // Map and contact
  gsap.from("#testimonial .map-wrap", {
    y: 30,
    autoAlpha: 0,
    scrollTrigger: {
      trigger: "#testimonial .map-wrap",
      start: "top 85%",
      once: true,
    },
  });
  gsap.from(
    [
      "#testimonial .contact-title",
      "#testimonial .info-row",
      "#testimonial .location-btn",
    ],
    {
      y: 26,
      autoAlpha: 0,
      stagger: 0.12,
      scrollTrigger: {
        trigger: "#testimonial .contact-box",
        start: "top 85%",
        once: true,
      },
    }
  );

  // Footer
  gsap.from("#footer .footer-grid", {
    y: 24,
    autoAlpha: 0,
    scrollTrigger: { trigger: "#footer", start: "top 90%", once: true },
  });

  // Back to top button show or hide
  const backBtn = document.getElementById("backToTopBtn");
  if (backBtn) {
    ScrollTrigger.create({
      start: 400,
      onEnter: () => backBtn.classList.add("show"),
      onLeaveBack: () => backBtn.classList.remove("show"),
    });
    backBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Optional parallax light touch for hero image
  gsap.to("#hero .hero-img img", {
    yPercent: -6,
    ease: "none",
    scrollTrigger: {
      trigger: "#hero",
      start: "top bottom",
      end: "bottom top",
      scrub: 0.5,
    },
  });
});
