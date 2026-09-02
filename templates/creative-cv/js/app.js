document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");
  const navLinks = document.querySelector("#navLinks");
  const menuToggle = document.querySelector("#menuToggle");

  // Mobile nav toggle
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuToggle.classList.toggle("is-open");

    const expanded = menuToggle.classList.contains("is-open");
    menuToggle.setAttribute("aria-expanded", expanded ? "true" : "false");
  });

  // Sticky header
  const headerOffset = header.offsetHeight;
  document.body.style.setProperty("--header-offset", `${headerOffset}px`);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("is-sticky");
      document.body.classList.add("has-sticky-offset");
    } else {
      header.classList.remove("is-sticky");
      document.body.classList.remove("has-sticky-offset");
    }
  });
});
// back to top button
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

// gsap animations start here
if (window.innerWidth > 768) {
  gsap.registerPlugin(ScrollTrigger);

  // Hero Animation
  gsap.from("#hero .hero-heading h1", {
    scrollTrigger: {
      trigger: "#hero",
      start: "top 80%", // when top of hero hits 80% of viewport
      toggleActions: "play none none",
    },
    y: 60,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });

  gsap.from("#hero .hero-image img", {
    scrollTrigger: {
      trigger: "#hero",
      start: "top 75%",
      toggleActions: "play none none",
    },
    scale: 0.8,
    opacity: 0,
    duration: 1.2,
    delay: 0.3,
    ease: "power3.out",
  });

  gsap.from(
    "#hero .hero-text h4, #hero .hero-text p, #hero .hero-text, #hero .hero-text .signature",
    {
      scrollTrigger: {
        trigger: "#hero",
        start: "top 70%",
        toggleActions: "play none none",
      },
      x: 80,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      delay: 0.5,
      ease: "power3.out",
    }
  );
  gsap.registerPlugin(ScrollTrigger);

  // ===== Education Section =====
  gsap.from("#education h2", {
    scrollTrigger: {
      trigger: "#education",
      start: "top 80%",
      toggleActions: "play none none",
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });

  gsap.from("#education .contact-info .info-item", {
    scrollTrigger: {
      trigger: "#education .contact-info",
      start: "top 75%",
      toggleActions: "play none none",
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out",
  });

  gsap.from("#education .edu-item", {
    scrollTrigger: {
      trigger: "#education .education-grid",
      start: "top 70%",
      toggleActions: "play none none",
    },
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out",
  });

  // ===== Experience Section =====
  gsap.from("#experience h2", {
    scrollTrigger: {
      trigger: "#experience",
      start: "top 80%",
      toggleActions: "play none none",
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });

  gsap.from("#experience .experience-item", {
    scrollTrigger: {
      trigger: "#experience .experience-list",
      start: "top 70%",
      toggleActions: "play none none",
    },
    x: -60,
    opacity: 0,
    duration: 0.9,
    stagger: 0.25,
    ease: "power2.out",
  });
  // ===== Services Section =====
  gsap.from("#services h2", {
    scrollTrigger: {
      trigger: "#services",
      start: "top 80%",
      toggleActions: "play none none",
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });

  gsap.from("#services .services-desc", {
    scrollTrigger: {
      trigger: "#services .services-desc",
      start: "top 85%",
      toggleActions: "play none none",
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
  });

  // ===== Portfolio Section =====
  gsap.from("#portfolio h2", {
    scrollTrigger: {
      trigger: "#portfolio",
      start: "top 80%",
      toggleActions: "play none none",
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });
  // ===== Endorsements Section =====
  gsap.from("#endorsements h2", {
    scrollTrigger: {
      trigger: "#endorsements",
      start: "top 80%",
      toggleActions: "play none none",
    },
    y: 40,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });

  gsap.from("#endorsements p", {
    scrollTrigger: {
      trigger: "#endorsements p",
      start: "top 85%",
      toggleActions: "play none none",
    },
    y: 20,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
  });

  // ===== Clients Section =====
  gsap.from("#clients h3", {
    scrollTrigger: {
      trigger: "#clients",
      start: "top 80%",
      toggleActions: "play none none",
    },
    y: 40,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });

  gsap.from("#clients .clients-logos img", {
    scrollTrigger: {
      trigger: "#clients .clients-logos",
      start: "top 75%",
      toggleActions: "play none none",
    },
    scale: 0.8,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "back.out(1.7)",
  });

  // ===== Footer Section =====
  gsap.from("#footer .footer-info", {
    scrollTrigger: {
      trigger: "#footer",
      start: "top 80%",
      toggleActions: "play none none",
    },
    x: -50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });

  gsap.from("#footer .footer-form", {
    scrollTrigger: {
      trigger: "#footer",
      start: "top 80%",
      toggleActions: "play none none",
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });

  gsap.from("#footer .footer-bottom", {
    scrollTrigger: {
      trigger: "#footer .footer-bottom",
      start: "top 85%",
      toggleActions: "play none none",
    },
    y: 40,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
  });
}
