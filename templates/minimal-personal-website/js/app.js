// navbar functionality
const cb = document.getElementById("nav-toggle");
const btn = document.querySelector("#site-header .menu-btn");
if (cb && btn) {
  const sync = () =>
    btn.setAttribute("aria-expanded", cb.checked ? "true" : "false");
  cb.addEventListener("change", sync);
  sync();
}
const header = document.getElementById("site-header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
// back to top button functionality
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

// about tab functionality
const tabs = document.querySelectorAll(".tab");

tabs.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    e.preventDefault();

    tabs.forEach((t) => {
      t.classList.remove("is-active");
      t.setAttribute("aria-selected", "false");
    });

    tab.classList.add("is-active");
    tab.setAttribute("aria-selected", "true");
  });
});

// testimonial slider functionality
const testimonialSwiper = new Swiper(".testimonials-swiper", {
  slidesPerView: 1,
  spaceBetween: 24,
  speed: 500,
  loop: true,
  autoHeight: true,
  navigation: {
    nextEl: ".testimonials-next",
    prevEl: ".testimonials-prev",
  },
});
// gsap animation
if (window.innerWidth > 768) {
  document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    /* ======================
       HERO SECTION
    ====================== */
    // Left Copy
    gsap.from("#hero .copy-left", {
      opacity: 0,
      x: -80,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#hero .copy-left",
        start: "top 80%",
      },
    });

    // Right Copy
    gsap.from("#hero .copy-right", {
      opacity: 0,
      x: 80,
      duration: 1,
      delay: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#hero .copy-right",
        start: "top 80%",
      },
    });

    // Gallery Cards (stagger)
    gsap.from("#hero .gallery .card", {
      opacity: 0,
      y: 60,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#hero .gallery",
        start: "top 80%",
      },
    });

    // Scroll Indicator bounce-in
    gsap.from("#hero .scroll-indicator", {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: "#hero .scroll-indicator",
        start: "top 90%",
      },
    });

    /* ======================
       ABOUT SECTION
    ====================== */
    // About Head
    gsap.from("#about .about-head", {
      opacity: 0,
      y: 60,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#about .about-head",
        start: "top 85%",
      },
    });

    // Timeline rows
    gsap.from("#about .t-row", {
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.25,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#about .timeline",
        start: "top 80%",
      },
    });

    // Intro Card (image + text)
    gsap.from("#about .intro-card", {
      opacity: 0,
      x: 80,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#about .intro-card",
        start: "top 85%",
      },
    });
    /* ======================
       SERVICES SECTION
    ====================== */
    // Header animation
    gsap.from("#services .services-head", {
      opacity: 0,
      y: 60,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#services .services-head",
        start: "top 85%",
      },
    });

    // Each service card (accordion details)
    gsap.from("#services .service", {
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#services .service-list",
        start: "top 80%",
      },
    });

    // Images inside service panels
    gsap.from("#services .service .media img", {
      opacity: 0,
      scale: 0.85,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#services .service .media",
        start: "top 85%",
      },
    });

    /* ======================
       PROJECTS SECTION
    ====================== */
    // Projects header
    gsap.from("#projects .projects-head", {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#projects .projects-head",
        start: "top 85%",
      },
    });

    // Each case grid (staggered fade-in)
    gsap.from("#projects .case-grid", {
      opacity: 0,
      y: 60,
      duration: 1,
      stagger: 0.3,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#projects .container",
        start: "top 80%",
      },
    });

    // Case card text slides from left
    gsap.from("#projects .case-card", {
      opacity: 0,
      x: -80,
      duration: 1,
      stagger: 0.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#projects .case-grid",
        start: "top 80%",
      },
    });

    // Case visuals (images) slide from right
    gsap.from("#projects .case-visual img", {
      opacity: 0,
      x: 80,
      duration: 1,
      stagger: 0.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#projects .case-grid",
        start: "top 80%",
      },
    });
    /* ======================
       TESTIMONIALS SECTION
    ====================== */
    // Header
    gsap.from("#testimonials .t-head", {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#testimonials .t-head",
        start: "top 85%",
      },
    });

    // Quote block
    gsap.from("#testimonials .quote", {
      opacity: 0,
      y: 60,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#testimonials .quote",
        start: "top 80%",
      },
    });

    // Controls fade in
    gsap.from("#testimonials .controls button", {
      opacity: 0,
      scale: 0.8,
      stagger: 0.2,
      duration: 0.8,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: "#testimonials .controls",
        start: "top 85%",
      },
    });

    /* ======================
       FAQ SECTION
    ====================== */
    // FAQ intro
    gsap.from("#faq .intro", {
      opacity: 0,
      x: -80,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#faq .intro",
        start: "top 85%",
      },
    });

    // FAQ accordion items
    gsap.from("#faq .accordion .item", {
      opacity: 0,
      y: 40,
      stagger: 0.2,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#faq .accordion",
        start: "top 80%",
      },
    });

    /* ======================
       CTA + FOOTER SECTION
    ====================== */
    // CTA eyebrow
    gsap.from("#cta-footer .cta-eyebrow", {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#cta-footer .cta-eyebrow",
        start: "top 85%",
      },
    });

    // Marquee CTA
    gsap.from("#cta-footer .marquee-cta", {
      opacity: 0,
      scale: 0.9,
      duration: 1,
      ease: "elastic.out(1, 0.6)",
      scrollTrigger: {
        trigger: "#cta-footer .marquee-cta",
        start: "top 85%",
      },
    });

    // Footer links (staggered columns)
    gsap.from("#cta-footer .footer-grid .col", {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#cta-footer .footer-grid",
        start: "top 80%",
      },
    });
  });
}
