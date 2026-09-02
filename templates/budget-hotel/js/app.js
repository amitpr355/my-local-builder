// Toggle Nav
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// Sticky Navbar after scroll 50px
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
});
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
//
// gsap animation start heare
// Register plugin
gsap.registerPlugin(ScrollTrigger);

/* =========================
     Hero Section Animation
     ========================= */
gsap.from("#hero .hero-content > *", {
  y: 60,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "#hero",
    start: "top 80%", // when hero is 80% visible
    toggleActions: "play none none reverse",
  },
});

/* =========================
     About Section Animation
     ========================= */
gsap.from("#about .about-image", {
  x: -80,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "#about",
    start: "top 85%",
    toggleActions: "play none none",
  },
});

gsap.from("#about .about-content", {
  y: 80,
  opacity: 0,
  duration: 1.2,
  delay: 0.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "#about",
    start: "top 85%",
    toggleActions: "play none none",
  },
});
// Data Section Animation
gsap.from("#data .data-card", {
  y: 60,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "#data",
    start: "top 85%",
    toggleActions: "play none none",
  },
});

// Reach Section Animation
gsap.from("#reach .reach-heading", {
  y: 40,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "#reach",
    start: "top 85%",
    toggleActions: "play none none",
  },
});

gsap.from("#reach .map-box", {
  scale: 0.9,
  opacity: 0,
  duration: 1.2,
  delay: 0.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "#reach",
    start: "top 80%",
    toggleActions: "play none none",
  },
});
// Facilities Section Animation
gsap.from("#facilities .facilities-heading", {
  y: 40,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "#facilities",
    start: "top 85%",
    toggleActions: "play none none",
  },
});

// Best of San Francisco Section Animation
gsap.from("#best-of-sf .section-header", {
  y: 40,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "#best-of-sf",
    start: "top 85%",
    toggleActions: "play none none",
  },
});

// Special Offers Section
gsap.from("#special-offers .section-header", {
  x: -40,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "#special-offers",
    start: "top 85%",
    toggleActions: "play none none",
  },
});

// Guest Reviews Section
gsap.from("#guest-reviews .reviews-header", {
  x: -40,
  opacity: 0,
  duration: 1.1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "#guest-reviews",
    start: "top 85%",
    toggleActions: "play none none",
  },
});
// Hotel Information Section

gsap.from("#hotel-info .hotel-info-heading", {
  y: 40,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "#hotel-info",
    start: "top 85%",
    toggleActions: "play none none",
  },
});

gsap.from("#hotel-info .hotel-info-item", {
  y: 60,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "#hotel-info .hotel-info-grid",
    start: "top 90%",
    toggleActions: "play none none",
  },
});

// Gallery Section
gsap.from("#gallery .gallery-heading", {
  y: 40,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "#gallery",
    start: "top 85%",
    toggleActions: "play none none",
  },
});

gsap.from("#gallery .gallery-col img", {
  scale: 0.8,
  opacity: 0,
  duration: 1,
  stagger: 0.15,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "#gallery .gallery-wrapper",
    start: "top 90%",
    toggleActions: "play none none",
  },
});
// Reservation Section
gsap.from("#reservation .reservation-content span", {
  y: 30,
  opacity: 0,
  duration: 0.8,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "#reservation",
    start: "top 85%",
    toggleActions: "play none none",
  },
});

gsap.from("#reservation .reservation-content h2", {
  y: 40,
  opacity: 0,
  duration: 1,
  delay: 0.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "#reservation",
    start: "top 80%",
    toggleActions: "play none none",
  },
});

gsap.from(
  "#reservation .reservation-content .call-text, #reservation .phone-box",
  {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.4,
    stagger: 0.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#reservation",
      start: "top 75%",
      toggleActions: "play none none ",
    },
  }
);

// Footer Section
gsap.from("#footer .footer-col", {
  y: 60,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "#footer",
    start: "top 85%",
    toggleActions: "play none none",
  },
});

gsap.from("#footer .footer-bottom", {
  y: 30,
  opacity: 0,
  duration: 1,
  delay: 0.6,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "#footer",
    start: "top 90%",
    toggleActions: "play none none",
  },
});
