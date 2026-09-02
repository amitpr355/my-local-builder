(function () {
  const header = document.getElementById("main-header");
  const nav = document.getElementById("navbar");
  const toggle = document.getElementById("nav-toggle");

  if (!header || !nav || !toggle) return;

  // Sticky after scroll
  function onScroll() {
    if (window.scrollY > 10) header.classList.add("is-sticky");
    else header.classList.remove("is-sticky");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Toggle
  toggle.addEventListener("click", function (e) {
    e.preventDefault();
    const isOpen = nav.classList.toggle("open");
    toggle.classList.toggle("active", isOpen);
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Close on nav click
  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("open");
      toggle.classList.remove("active");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
})();

// back to top button functionality
const backToTop = document.getElementById("backToTopBtn");

window.addEventListener("scroll", () => {
  backToTop.style.display = window.scrollY > 300 ? "block" : "none";
});

backToTop.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// gsap animation start heare
gsap.registerPlugin(ScrollTrigger);
if (window.innerWidth > 768) {
  // Hero Section animation
  gsap.from("#hero .tagline", {
    scrollTrigger: {
      trigger: "#hero",
      start: "top 80%", // when hero enters viewport
      toggleActions: "play none none reverse",
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });

  gsap.from("#hero .hero-title", {
    scrollTrigger: {
      trigger: "#hero",
      start: "top 75%",
      toggleActions: "play none none reverse",
    },
    y: 60,
    opacity: 0,
    duration: 1.2,
    delay: 0.2,
    ease: "power3.out",
  });

  gsap.from("#hero .hero-subtext", {
    scrollTrigger: {
      trigger: "#hero",
      start: "top 70%",
      toggleActions: "play none none reverse",
    },
    y: 40,
    opacity: 0,
    duration: 1,
    delay: 0.4,
    ease: "power3.out",
  });

  gsap.from("#hero .vertical-rule", {
    scrollTrigger: {
      trigger: "#hero",
      start: "top 65%",
      toggleActions: "play none none reverse",
    },
    scaleY: 0,
    opacity: 0,
    transformOrigin: "top center",
    duration: 1,
    delay: 0.6,
    ease: "power3.out",
  });

  gsap.from("#hero .scroll-down", {
    scrollTrigger: {
      trigger: "#hero",
      start: "top 60%",
      toggleActions: "play none none reverse",
    },
    y: 30,
    opacity: 0,
    duration: 1,
    delay: 0.8,
    ease: "power3.out",
  });

  let atmosphereTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#atmosphere",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });

  atmosphereTl
    .from("#atmosphere h2", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })
    .from(
      "#atmosphere .intro-text",
      {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.5"
    );
  /* ------------------------------
   MENU SECTION
--------------------------------*/
  gsap.from("#menu-section .menu-header .subtitle", {
    y: 30,
    opacity: 0,
    duration: 0.6,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#menu-section",
      start: "top 85%",
    },
  });

  gsap.from("#menu-section .menu-header h2", {
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#menu-section",
      start: "top 80%",
    },
  });

  gsap.from("#menu-section .menu-header p", {
    y: 50,
    opacity: 0,
    duration: 0.9,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#menu-section",
      start: "top 75%",
    },
  });

  gsap.from("#menu-section .menu-item", {
    y: 60,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    stagger: 0.2,
    scrollTrigger: {
      trigger: "#menu-section .menu-grid",
      start: "top 70%",
    },
  });

  gsap.from("#menu-section .menu-button", {
    scale: 0.8,
    opacity: 0,
    duration: 0.8,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: "#menu-section",
      start: "top 65%",
    },
  });

  /* ------------------------------
   SIGNATURE SECTION
--------------------------------*/
  gsap.from("#signature-menu .signature-content .subtitle", {
    y: 30,
    opacity: 0,
    duration: 0.6,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#signature-menu",
      start: "top 85%",
    },
  });

  gsap.from("#signature-menu .signature-content h2", {
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#signature-menu",
      start: "top 80%",
    },
  });

  gsap.from("#signature-menu .signature-content p", {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#signature-menu",
      start: "top 75%",
    },
  });

  /* ------------------------------
   GALLERY SECTION
--------------------------------*/
  gsap.from("#gallery .gallery-item", {
    scale: 0.8,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    stagger: 0.2,
    scrollTrigger: {
      trigger: "#gallery",
      start: "top 80%",
    },
  });
  /* ------------------------------
   TEAM SECTION
--------------------------------*/
  gsap.from("#team .team-left h2", {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#team",
      start: "top 80%",
    },
  });

  gsap.from("#team .team-left p", {
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#team",
      start: "top 75%",
    },
  });

  gsap.from("#team .team-left img", {
    y: -60,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#team",
      start: "top 70%",
    },
  });

  gsap.from("#team .team-right .team-member-1", {
    y: 60,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#team",
      start: "top 70%",
    },
  });

  gsap.from("#team .team-right .team-member-2", {
    y: 80,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#team",
      start: "top 65%",
    },
  });

  /* ------------------------------
   RESERVATION SECTION
--------------------------------*/
  gsap.from("#reservation .reservation-content h2", {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#reservation",
      start: "top 80%",
    },
  });

  gsap.from("#reservation .reservation-content p", {
    y: 60,
    opacity: 0,
    duration: 0.9,
    delay: 0.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#reservation",
      start: "top 75%",
    },
  });

  gsap.from("#reservation .reservation-btn", {
    scale: 0.8,
    opacity: 0,
    duration: 0.7,
    delay: 0.4,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: "#reservation",
      start: "top 70%",
    },
  });

  gsap.from("#reservation .reservation-phone", {
    y: 40,
    opacity: 0,
    duration: 0.8,
    delay: 0.6,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#reservation",
      start: "top 65%",
    },
  });

  gsap.from("#reservation img", {
    x: 80,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#reservation",
      start: "top 75%",
    },
  });

  /* ------------------------------
   FOOTER SECTION
--------------------------------*/
  gsap.from("#footer .footer-column", {
    y: 60,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    stagger: 0.3,
    scrollTrigger: {
      trigger: "#footer .footer-top",
      start: "top 80%",
    },
  });

  gsap.from("#footer .footer-bottom p", {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#footer .footer-bottom",
      start: "top 85%",
    },
  });
}
// gsap animation end here
