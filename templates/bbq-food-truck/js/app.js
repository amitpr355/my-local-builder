const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("is-active");
  navLinks.classList.toggle("is-open");
});

// back to top botton functionality
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

  // Animate the heading + text
  gsap.from("#daily-specials .specials-text", {
    scrollTrigger: {
      trigger: "#daily-specials",
      start: "top 80%", // when section enters 80% of viewport
      end: "bottom 60%",
      toggleActions: "play none none",
    },
    x: -100,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });

  // Animate each card one by one
  gsap.from("#daily-specials .special-item", {
    scrollTrigger: {
      trigger: "#daily-specials",
      start: "top 75%",
      toggleActions: "play none none",
    },
    y: 100,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    stagger: 0.3, // delay between items
  });

  // 🔹 MENU SECTION
  gsap.from("#menu .menu-header", {
    scrollTrigger: {
      trigger: "#menu",
      start: "top 80%",
      toggleActions: "play none none",
    },
    y: -50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });

  // 🔹 LOCATION & SCHEDULE SECTION
  gsap.from("#location-schedule .location-text", {
    scrollTrigger: {
      trigger: "#location-schedule",
      start: "top 80%",
      toggleActions: "play none none",
    },
    y: -100,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });

  gsap.from("#location-schedule .location-map", {
    scrollTrigger: {
      trigger: "#location-schedule",
      start: "top 80%",
      toggleActions: "play none none",
    },
    y: 100,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });

  // 🔹 ABOUT SECTION
  gsap.from("#about .about-header", {
    scrollTrigger: {
      trigger: "#about",
      start: "top 80%",
      toggleActions: "play none none",
    },
    y: -50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });

  gsap.from("#about .about-text", {
    scrollTrigger: {
      trigger: "#about",
      start: "top 75%",
      toggleActions: "play none none",
    },
    y: -100,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });

  gsap.from("#about .about-image", {
    scrollTrigger: {
      trigger: "#about",
      start: "top 75%",
      toggleActions: "play none none",
    },
    y: 100,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });

  // 🔹 CONTACT SECTION
  gsap.from("#contact .contact-info", {
    scrollTrigger: {
      trigger: "#contact",
      start: "top 80%",
      toggleActions: "play none none",
    },
    y: -100,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });

  gsap.from("#contact .contact-form", {
    scrollTrigger: {
      trigger: "#contact",
      start: "top 80%",
      toggleActions: "play none none",
    },
    y: 100,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });

  // 🔹 FOOTER SECTION
  gsap.from("#footer .footer-truck", {
    scrollTrigger: {
      trigger: "#footer",
      start: "top 85%",
      toggleActions: "play none none",
    },
    y: 100,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
  });

  gsap.from("#footer .footer-text", {
    scrollTrigger: {
      trigger: "#footer",
      start: "top 85%",
      toggleActions: "play none none",
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    delay: 0.2,
  });

  gsap.from("#footer .footer-socials", {
    scrollTrigger: {
      trigger: "#footer",
      start: "top 85%",
      toggleActions: "play none none",
    },
    scale: 0,
    opacity: 0,
    duration: 0.6,
    ease: "back.out(1.7)",
    stagger: 0.2, // icons appear one by one
    // delay: 0.4,
  });

  gsap.from("#footer .footer-bottom", {
    scrollTrigger: {
      trigger: "#footer",
      start: "top 85%",
      toggleActions: "play none none",
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
    delay: 0.6,
  });
}
