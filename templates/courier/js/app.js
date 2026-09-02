(function () {
  const navWrap = document.querySelector("#header .nav-wrap");
  const btn = document.getElementById("hamburger");
  const menu = document.getElementById("mobile-menu");
  const backdrop = document.getElementById("menu-backdrop");

  if (!navWrap || !btn || !menu || !backdrop) return;

  function openMenu() {
    navWrap.classList.add("is-open");
    btn.setAttribute("aria-expanded", "true");
    menu.setAttribute("aria-hidden", "false");
  }

  function closeMenu() {
    navWrap.classList.remove("is-open");
    btn.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-hidden", "true");
  }

  function toggleMenu() {
    navWrap.classList.contains("is-open") ? closeMenu() : openMenu();
  }

  btn.addEventListener("click", function (e) {
    e.stopPropagation();
    toggleMenu();
  });

  backdrop.addEventListener("click", closeMenu);

  // Close on link click (mobile)
  menu.addEventListener("click", function (e) {
    const a = e.target.closest("a");
    if (a) closeMenu();
  });

  // Close on ESC
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });

  // Close if clicking outside
  document.addEventListener("click", function (e) {
    if (!navWrap.contains(e.target)) closeMenu();
  });
})();
// sticky nav
(function () {
  const header = document.querySelector(".header");
  if (!header) return;

  // Create spacer to avoid content jump when header turns fixed
  const spacer = document.createElement("div");
  spacer.className = "header-spacer";
  header.parentNode.insertBefore(spacer, header.nextSibling);

  function setSpacerHeight() {
    const h = header.offsetHeight || 0;
    spacer.style.height = header.classList.contains("is-sticky")
      ? h + "px"
      : "0px";
  }

  function onScroll() {
    if (window.scrollY > 80) {
      if (!header.classList.contains("is-sticky"))
        header.classList.add("is-sticky");
    } else {
      header.classList.remove("is-sticky");
    }
    setSpacerHeight();
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", setSpacerHeight);

  // initial
  onScroll();
})();

// back to top button functionality
(function () {
  const btn = document.querySelector(".back-to-top");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      btn.classList.add("is-visible");
    } else {
      btn.classList.remove("is-visible");
    }
  });

  btn.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();

// gsap animation

gsap.registerPlugin(ScrollTrigger);
if (window.innerWidth > 768) {
  gsap.from("#hero .hero-text h1", {
    scrollTrigger: {
      trigger: "#hero",
      start: "top 80%",
      toggleActions: "play none none none",
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });

  gsap.from("#hero .hero-text p", {
    scrollTrigger: {
      trigger: "#hero",
      start: "top 75%",
      toggleActions: "play none none none",
    },
    y: 30,
    opacity: 0,
    duration: 1,
    delay: 0.3,
    ease: "power3.out",
  });

  gsap.from("#hero .hero-text a", {
    scrollTrigger: {
      trigger: "#hero",
      start: "top 70%",
      toggleActions: "play none none none",
    },
    y: 20,
    opacity: 0,
    duration: 1,
    delay: 0.6,
    ease: "power3.out",
  });

  // About Text Animation
  gsap.from(".about-text", {
    scrollTrigger: {
      trigger: "#about-section",
      start: "top 80%",
      toggleActions: "play none none none",
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });

  // Industry Sectors Animation
  gsap.from(".industry-sectors", {
    scrollTrigger: {
      trigger: "#about-section",
      start: "top 70%",
      toggleActions: "play none none none",
    },
    y: -100,
    opacity: 0,
    duration: 1,
    delay: 0.3,
    ease: "power3.out",
  });

  // Testimonial Content Animation (Left Side)
  gsap.from(".testimonial-content", {
    scrollTrigger: {
      trigger: ".testimonial",
      start: "top 80%",
      toggleActions: "play none none none",
    },
    y: -100,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });

  // Testimonial Image Animation (Right Side)
  gsap.from(".testimonial-image", {
    scrollTrigger: {
      trigger: ".testimonial",
      start: "top 80%",
      toggleActions: "play none none none",
    },
    y: 100,
    opacity: 0,
    duration: 1,
    delay: 0.3,
    ease: "power3.out",
  });

  // Footer Columns Animation
  gsap.from(".footer-section .row > div", {
    scrollTrigger: {
      trigger: ".footer-section",
      start: "top 80%",
      toggleActions: "play none none none",
    },
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.3,
    ease: "power3.out",
  });

  // Social Icons Animation
  gsap.from(".social-icons a", {
    scrollTrigger: {
      trigger: ".footer-section",
      start: "top 80%",
      toggleActions: "play none none none",
    },
    opacity: 0,
    y: 20,
    duration: 0.5,
    stagger: 0.1,
    delay: 0.8,
  });
}
