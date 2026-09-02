// Toggle mobile nav (span hamburger open/close)
const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");

if (menuToggle && mobileNav) {
  menuToggle.addEventListener("click", (e) => {
    e.preventDefault();
    const isOpen = menuToggle.classList.toggle("is-open");
    mobileNav.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // close on link click
  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("is-open");
      mobileNav.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// back to top button functionality
const backToTopBtn = document.getElementById("backToTopBtn");

window.addEventListener("scroll", () => {
  backToTopBtn.style.display = window.scrollY > 300 ? "flex" : "none";
});

backToTopBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// gsap animation
// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

if (window.innerWidth > 768) {
  // =========================
  // HERO (updated to section-hero BEM)
  // =========================
  gsap.from(".section-hero__title", {
    scrollTrigger: { trigger: ".section-hero", start: "top center" },
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power3.out",
  });

  gsap.from(".section-hero__outline", {
    scrollTrigger: { trigger: ".section-hero", start: "top center+=100" },
    scaleX: 0,
    transformOrigin: "left",
    duration: 1,
    ease: "power2.out",
  });

  gsap.from(".section-hero__text", {
    scrollTrigger: { trigger: ".section-hero", start: "top center+=150" },
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.15,
    ease: "power2.out",
  });

  gsap.from(".section-hero__btn", {
    scrollTrigger: { trigger: ".section-hero", start: "top center+=200" },
    opacity: 0,
    y: 20,
    duration: 0.8,
    delay: 0.25,
    ease: "power1.out",
  });

  // Sticky header animation
  gsap.to("#header", {
    scrollTrigger: {
      trigger: ".section-hero",
      start: "bottom top",
      toggleActions: "play none none reverse",
      scrub: true,
    },
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    duration: 0.3,
  });

  // =========================
  // LAWYER SECTION (updated selectors)
  // =========================
  gsap.from(".lawyer-media", {
    scrollTrigger: { trigger: "#lawyer-section", start: "top 80%" },
    x: -100,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });

  gsap.from(".lawyer-content__title", {
    scrollTrigger: { trigger: "#lawyer-section", start: "top 75%" },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
  });

  gsap.from(".lawyer-content__underline", {
    scrollTrigger: { trigger: ".lawyer-content__title", start: "top 90%" },
    scaleX: 0,
    transformOrigin: "left",
    duration: 1,
    ease: "power2.out",
  });

  gsap.from([".lawyer-content__lead", ".lawyer-content__sublead"], {
    scrollTrigger: { trigger: ".lawyer-content__lead", start: "top 85%" },
    y: 40,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    ease: "power2.out",
  });

  gsap.from(".lawyer-stats__item", {
    scrollTrigger: { trigger: ".lawyer-stats", start: "top 85%" },
    y: 50,
    opacity: 0,
    stagger: 0.25,
    duration: 0.8,
    ease: "power2.out",
  });

  // =========================
  // EXPERIENCE SECTION (updated selectors)
  // =========================
  gsap.from(".experience-section__subtitle", {
    scrollTrigger: { trigger: "#experience", start: "top 80%" },
    y: 30,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
  });

  gsap.from(".experience-section__underline", {
    scrollTrigger: {
      trigger: ".experience-section__subtitle",
      start: "top 90%",
    },
    scaleX: 0,
    transformOrigin: "left",
    duration: 1,
    ease: "power2.out",
  });

  gsap.from(".experience-section__title", {
    scrollTrigger: {
      trigger: ".experience-section__subtitle",
      start: "top 80%",
    },
    y: 40,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
  });

  gsap.from(".experience-section__play", {
    scrollTrigger: { trigger: ".experience-section__title", start: "top 85%" },
    scale: 0,
    opacity: 0,
    duration: 0.8,
    ease: "back.out(1.7)",
  });

  // =========================
  // PRACTICE AREAS (updated to practice-areas-section BEM)
  // =========================
  gsap.from(".practice-areas-section__title", {
    scrollTrigger: { trigger: "#practice-areas", start: "top 80%" },
    y: 40,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
  });

  gsap.from(".practice-areas-section__desc", {
    scrollTrigger: {
      trigger: ".practice-areas-section__title",
      start: "top 90%",
    },
    y: 20,
    opacity: 0,
    duration: 0.8,
    delay: 0.15,
    ease: "power2.out",
  });

  gsap.from(".practice-areas-section__btn", {
    scrollTrigger: {
      trigger: ".practice-areas-section__title",
      start: "top 90%",
    },
    scale: 0.9,
    opacity: 0,
    duration: 0.6,
    delay: 0.25,
    ease: "back.out(1.7)",
  });

  gsap.from(".practice-areas-section__card", {
    scrollTrigger: { trigger: "#practice-areas .row.g-0", start: "top 85%" },
    opacity: 0,
    y: 50,
    stagger: 0.15,
    duration: 0.9,
    ease: "power2.out",
  });

  // =========================
  // MEDIA SECTION (BEM)
  // =========================
  gsap.from(".media-section__title", {
    scrollTrigger: { trigger: "#media-section", start: "top 80%" },
    y: 40,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
  });

  gsap.from(".media-section__underline", {
    scrollTrigger: { trigger: ".media-section__title", start: "top 90%" },
    scaleX: 0,
    transformOrigin: "left",
    duration: 0.8,
    delay: 0.15,
    ease: "power2.out",
  });

  gsap.from(".media-section__card", {
    scrollTrigger: {
      trigger: "#media-section .row:last-child",
      start: "top 85%",
    },
    opacity: 0,
    y: 60,
    stagger: 0.2,
    duration: 0.8,
    ease: "power2.out",
  });

  // =========================
  // LOGO SECTION (new selectors)
  // =========================
  gsap.from(".logo-section__title", {
    scrollTrigger: { trigger: "#logo", start: "top 85%" },
    y: 30,
    opacity: 0,
    duration: 0.9,
    ease: "power2.out",
  });

  gsap.from(".logo-section__img-wrap", {
    scrollTrigger: { trigger: ".logo-section__logos", start: "top 85%" },
    opacity: 0,
    scale: 0.9,
    y: 20,
    duration: 0.7,
    stagger: 0.12,
    ease: "back.out(1.7)",
  });

  // =========================
  // REVIEWS SECTION (BEM)
  // =========================
  gsap.from(".reviews-section__quote", {
    scrollTrigger: { trigger: "#reviews", start: "top 85%" },
    scale: 0,
    opacity: 0,
    duration: 0.6,
    ease: "back.out(1.7)",
  });

  gsap.from(".reviews-section__title", {
    scrollTrigger: { trigger: ".reviews-section__quote", start: "top 90%" },
    y: 40,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
  });

  gsap.from(".reviews-section__box", {
    scrollTrigger: { trigger: ".reviews-section__grid", start: "top 90%" },
    opacity: 0,
    y: 40,
    stagger: 0.18,
    duration: 0.8,
    ease: "power2.out",
  });

  gsap.from(".reviews-section__btn", {
    scrollTrigger: { trigger: ".reviews-section__grid", start: "bottom 90%" },
    scale: 0.95,
    opacity: 0,
    duration: 0.6,
    delay: 0.1,
    ease: "back.out(1.7)",
  });

  // =========================
  // SERVING AREAS (BEM)
  // =========================
  gsap.from(".serving-areas-section__heading", {
    scrollTrigger: { trigger: "#serving-areas", start: "top 85%" },
    y: 40,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
  });

  gsap.from(".serving-areas-section__intro", {
    scrollTrigger: { trigger: "#serving-areas", start: "top 75%" },
    x: -50,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
  });

  gsap.from(".serving-areas-section__list li", {
    scrollTrigger: {
      trigger: ".serving-areas-section__lists",
      start: "top 85%",
    },
    opacity: 0,
    x: 40,
    duration: 0.55,
    ease: "power2.out",
    stagger: 0.08,
  });

  gsap.from(".serving-areas-section__subheading", {
    scrollTrigger: {
      trigger: ".serving-areas-section__associations",
      start: "top 90%",
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
  });

  gsap.from(".serving-areas-section__logo", {
    scrollTrigger: {
      trigger: ".serving-areas-section__logos",
      start: "top 85%",
    },
    opacity: 0,
    scale: 0.9,
    duration: 0.6,
    ease: "back.out(1.7)",
    stagger: 0.1,
  });

  // =========================
  // CONTACT LAWYER SECTION (BEM)
  // =========================
  gsap.from(".contact-lawyer-section__kicker", {
    scrollTrigger: { trigger: "#contact-lawyer", start: "top 80%" },
    y: 25,
    opacity: 0,
    duration: 0.9,
    ease: "power2.out",
  });

  gsap.from(".contact-lawyer-section__underline", {
    scrollTrigger: {
      trigger: ".contact-lawyer-section__kicker",
      start: "top 90%",
    },
    scaleX: 0,
    transformOrigin: "left",
    duration: 0.9,
    ease: "power2.out",
  });

  gsap.from(".contact-lawyer-section__title", {
    scrollTrigger: {
      trigger: ".contact-lawyer-section__kicker",
      start: "top 80%",
    },
    y: 35,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
  });

  gsap.from(".contact-lawyer-section__desc", {
    scrollTrigger: {
      trigger: ".contact-lawyer-section__title",
      start: "top 90%",
    },
    y: 20,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
  });

  gsap.from(".contact-lawyer-section__btn", {
    scrollTrigger: {
      trigger: ".contact-lawyer-section__desc",
      start: "top 95%",
    },
    scale: 0.95,
    opacity: 0,
    duration: 0.7,
    ease: "back.out(1.7)",
  });

  // =========================
  // FOOTER (BEM)
  // =========================
  gsap.from("#site-footer .site-footer__block", {
    scrollTrigger: { trigger: "#site-footer", start: "top 90%" },
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out",
  });

  gsap.from("#site-footer .site-footer__bottom", {
    scrollTrigger: { trigger: "#site-footer", start: "top 85%" },
    opacity: 0,
    y: 20,
    duration: 0.8,
    ease: "power2.out",
  });
}
