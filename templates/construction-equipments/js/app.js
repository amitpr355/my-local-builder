// back to top btn
(function () {
  const btn = document.getElementById("backToTopBtn");
  if (!btn) return;

  // Show / hide button on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      btn.classList.add("is-visible");
    } else {
      btn.classList.remove("is-visible");
    }
  });

  // Smooth scroll to top
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
})();

// hamburger menu + sticky nav
document.addEventListener("DOMContentLoaded", () => {
  const headerWrapper = document.querySelector(".header-wrapper"); // <header>
  const siteHeader = document.querySelector(".site-header"); // inner header
  const btn = document.getElementById("hamburger");

  if (!headerWrapper || !siteHeader || !btn) return;

  // ✅ hamburger toggle
  btn.addEventListener("click", () => {
    headerWrapper.classList.toggle("nav-open");
  });

  // ✅ close menu on nav click (mobile)
  document.querySelectorAll(".nav-ul a").forEach((link) => {
    link.addEventListener("click", () =>
      headerWrapper.classList.remove("nav-open")
    );
  });

  // ✅ sticky nav on scroll
  const stickyOffset = headerWrapper.offsetTop;

  const handleSticky = () => {
    if (window.scrollY > stickyOffset + 10) {
      headerWrapper.classList.add("is-sticky");
    } else {
      headerWrapper.classList.remove("is-sticky");
    }
  };

  handleSticky();
  window.addEventListener("scroll", handleSticky, { passive: true });
});

gsap.registerPlugin(ScrollTrigger);
// ✅ GSAP Animations (Updated for your latest HTML structure)
if (window.innerWidth > 768) {
  gsap.registerPlugin(ScrollTrigger);

  // helper: fade up
  const fadeUp = (target, trigger, delay = 0, y = 50, duration = 1) => {
    gsap.from(target, {
      scrollTrigger: {
        trigger,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y,
      duration,
      delay,
      ease: "power3.out",
    });
  };

  // helper: stagger fade up
  const fadeUpStagger = (
    target,
    trigger,
    stagger = 0.2,
    y = 50,
    duration = 1
  ) => {
    gsap.from(target, {
      scrollTrigger: {
        trigger,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y,
      duration,
      stagger,
      ease: "power3.out",
    });
  };

  /* =========================
     HERO
     ========================= */
  fadeUp("#hero .hero-title", "#hero", 0);
  fadeUp("#hero .hero-desc", "#hero", 0.25);
  fadeUp("#hero .hero-btn", "#hero", 0.5, 30);

  /* =========================
     IMPACT (Overlapping white box)
     ========================= */
  fadeUp("#impact .impact-title", "#impact", 0);
  fadeUpStagger("#impact .impact-count", "#impact", 0.2, 30);

  /* =========================
     SERVICE SECTION (Cards)
     ========================= */
  fadeUp("#service .service-heading", "#service", 0);
  fadeUp("#service .service-subtext", "#service", 0.2);
  fadeUpStagger("#service .service-card", "#service .service-row", 0.25, 50);

  /* =========================
     WHY SECTION
     ========================= */
  fadeUp("#why-us .why-left .why-tag", "#why-us", 0, 30);
  fadeUp("#why-us .why-left .why-title", "#why-us", 0.2);
  fadeUp("#why-us .why-left .why-desc", "#why-us", 0.4);
  fadeUp("#why-us .why-left .why-img", "#why-us", 0.6);

  fadeUp("#why-us .why-right .why-img", "#why-us .why-right", 0.2);
  fadeUp("#why-us .why-right .why-stat", "#why-us .why-right", 0.45, 30);
  fadeUp("#why-us .why-right .why-desc", "#why-us .why-right", 0.65);

  /* =========================
     BRANDS
     ========================= */
  fadeUp("#brands .brands-tag", "#brands", 0, 30);
  fadeUp("#brands .brands-title", "#brands", 0.2);
  fadeUp("#brands .brands-desc", "#brands", 0.4);

  fadeUpStagger(
    "#brands .brand-logo-item",
    "#brands .brands-logos",
    0.2,
    25,
    0.9
  );

  /* =========================
     QUALITY SECTION
     ========================= */
  gsap.from("#quality .quality-overlay", {
    scrollTrigger: {
      trigger: "#quality",
      start: "top 80%",
      toggleActions: "play none none none",
    },
    opacity: 0,
    duration: 1.2,
    ease: "power2.out",
  });

  fadeUp("#quality .quality-card", "#quality", 0.15, 40);

  /* =========================
     TESTIMONIALS
     ========================= */
  fadeUp("#testimonial .testimonial-title", "#testimonial", 0);
  fadeUp("#testimonial .testimonial-subtitle", "#testimonial", 0.2);

  fadeUpStagger(
    "#testimonial .testimonial-card",
    "#testimonial .testimonial-row",
    0.25,
    45
  );

  /* =========================
     HELP SECTION
     ========================= */
  gsap.from("#help-sec .help-bg, #help-sec .help-overlay", {
    scrollTrigger: {
      trigger: "#help-sec",
      start: "top 80%",
      toggleActions: "play none none none",
    },
    opacity: 0,
    duration: 1.2,
    ease: "power2.out",
    stagger: 0.2,
  });

  fadeUp("#help-sec .help-title", "#help-sec", 0.2);
  fadeUp("#help-sec .help-text", "#help-sec", 0.4);
  fadeUp("#help-sec .help-btn", "#help-sec", 0.6, 30);

  /* =========================
     FOOTER
     ========================= */
  fadeUp("#footer .footer-brand", "#footer", 0, 40);

  fadeUpStagger("#footer .footer-item", "#footer", 0.12, 25, 0.9);

  fadeUpStagger("#footer .footer-social-link", "#footer", 0.12, 20, 0.9);

  fadeUpStagger("#footer .footer-bottom-row p", "#footer", 0.18, 18, 0.9);
}
