document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  // Toggle menu on hamburger click
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuToggle.classList.toggle("open");
  });

  // Optional: close menu when a link is clicked (mobile UX)
  const navItems = navLinks.querySelectorAll("a");
  navItems.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 992) {
        navLinks.classList.remove("active");
        menuToggle.classList.remove("open");
      }
    });
  });
});

// Sticky navbar on scroll
window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
});

// back to top button
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

gsap.registerPlugin(ScrollTrigger);

// Navbar load animation
gsap.from("#navbar", {
  y: -100,
  opacity: 0,
  duration: 1,
  ease: "power4.out",
});

// Hero section animations
gsap.from(".hero-content h1", {
  scrollTrigger: {
    trigger: "#hero",
    start: "top 80%", // start when hero enters viewport
    toggleActions: "play none none none",
  },
  y: 50,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
});

gsap.from(".hero-content p", {
  scrollTrigger: {
    trigger: "#hero",
    start: "top 75%",
    toggleActions: "play none none none",
  },
  y: 50,
  opacity: 0,
  duration: 1,
  delay: 0.3,
  ease: "power3.out",
});

gsap.from(".donate-now-btn", {
  scrollTrigger: {
    trigger: "#hero",
    start: "top 70%",
    toggleActions: "play none none none",
  },
  scale: 0.8,
  opacity: 0,
  duration: 0.8,
  delay: 0.6,
  ease: "back.out(1.7)",
});

// About Us text content
gsap.from(".about-content .section-subtitle", {
  scrollTrigger: {
    trigger: "#about-us",
    start: "top 85%",
    toggleActions: "play none none none",
  },
  x: -50,
  opacity: 0,
  duration: 0.8,
  ease: "power2.out",
});

gsap.from(".about-content .section-title", {
  scrollTrigger: {
    trigger: "#about-us",
    start: "top 80%",
    toggleActions: "play none none none",
  },
  x: -50,
  opacity: 0,
  duration: 1,
  delay: 0.2,
  ease: "power2.out",
});

gsap.from(".about-content .section-text", {
  scrollTrigger: {
    trigger: "#about-us",
    start: "top 75%",
    toggleActions: "play none none none",
  },
  y: 40,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  delay: 0.4,
  ease: "power3.out",
});

gsap.from(".about-content .read-more-btn", {
  scrollTrigger: {
    trigger: "#about-us",
    start: "top 70%",
    toggleActions: "play none none none",
  },
  scale: 0.8,
  opacity: 0,
  duration: 0.8,
  delay: 0.8,
  ease: "back.out(1.7)",
});

// About Us images
gsap.from(".about-images .about-img", {
  scrollTrigger: {
    trigger: "#about-us",
    start: "top 70%",
    toggleActions: "play none none none",
  },
  scale: 0.8,
  opacity: 0,
  y: 50,
  duration: 1,
  stagger: 0.2,
  ease: "power3.out",
});

// Impact header
gsap.from(".impact-header .section-subtitle", {
  scrollTrigger: {
    trigger: "#impact",
    start: "top 85%",
    toggleActions: "play none none none",
  },
  x: -50,
  opacity: 0,
  duration: 0.8,
  ease: "power2.out",
});

gsap.from(".impact-header .section-title", {
  scrollTrigger: {
    trigger: "#impact",
    start: "top 80%",
    toggleActions: "play none none none",
  },
  x: -50,
  opacity: 0,
  duration: 1,
  delay: 0.2,
  ease: "power2.out",
});

gsap.from(".impact-description p", {
  scrollTrigger: {
    trigger: "#impact",
    start: "top 75%",
    toggleActions: "play none none none",
  },
  y: 40,
  opacity: 0,
  duration: 1,
  delay: 0.4,
  ease: "power3.out",
});

// Stats animation
gsap.from(".impact-stats .stat-box", {
  scrollTrigger: {
    trigger: ".impact-stats",
    start: "top 80%",
    toggleActions: "play none none none",
  },
  y: 60,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  ease: "power3.out",
});

// Impact CTA
gsap.from(".impact-cta", {
  scrollTrigger: {
    trigger: ".impact-cta",
    start: "top 85%",
    toggleActions: "play none none none",
  },
  scale: 0.9,
  opacity: 0,
  duration: 1,
  ease: "back.out(1.7)",
});

// Movement section
gsap.from(".movement-image img", {
  scrollTrigger: {
    trigger: "#movement",
    start: "top 80%",
    toggleActions: "play none none none",
  },
  y: -80,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
});

// gsap.from(".movement-content .section-subtitle", {
//   scrollTrigger: {
//     trigger: "#movement",
//     start: "top 80%",
//     toggleActions: "play none none none",
//   },
//   y: 80,
//   opacity: 0,
//   duration: 0.8,
//   ease: "power2.out",
// });

gsap.from(".movement-content .section-title", {
  scrollTrigger: {
    trigger: "#movement",
    start: "top 75%",
    toggleActions: "play none none none",
  },
  y: 80,
  opacity: 0,
  duration: 1,
  delay: 0.2,
  ease: "power2.out",
});

gsap.from(".movement-content p", {
  scrollTrigger: {
    trigger: "#movement",
    start: "top 70%",
    toggleActions: "play none none none",
  },
  y: 40,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  delay: 0.4,
  ease: "power3.out",
});

gsap.from(".movement-content .movement-btn", {
  scrollTrigger: {
    trigger: "#movement",
    start: "top 65%",
    toggleActions: "play none none none",
  },
  scale: 0.8,
  opacity: 0,
  duration: 0.8,
  delay: 0.8,
  ease: "back.out(1.7)",
});

// === Stories Section ===
gsap.from(".stories-header .section-title", {
  scrollTrigger: {
    trigger: "#stories",
    start: "top 85%",
    toggleActions: "play none none none",
  },
  y: 40,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
});

gsap.from(".stories-header .section-subtitle", {
  scrollTrigger: {
    trigger: "#stories",
    start: "top 80%",
    toggleActions: "play none none none",
  },
  y: 40,
  opacity: 0,
  duration: 1,
  delay: 0.2,
  ease: "power3.out",
});

// gsap.from(".story-card", {
//   scrollTrigger: {
//     trigger: ".stories-grid",
//     start: "top 80%",
//     toggleActions: "play none none none",
//   },
//   y: 60,
//   opacity: 0,
//   duration: 1,
//   stagger: 0.3,
//   ease: "power3.out",
// });

gsap.from(".story-card img", {
  scrollTrigger: {
    trigger: ".stories-grid",
    start: "top 75%",
    toggleActions: "play none none none",
  },
  scale: 0.9,
  opacity: 0,
  duration: 1,
  stagger: 0.3,
  ease: "power2.out",
});

gsap.from(".story-card .story-content", {
  scrollTrigger: {
    trigger: ".stories-grid",
    start: "top 70%",
    toggleActions: "play none none none",
  },
  y: 30,
  opacity: 0,
  duration: 1,
  stagger: 0.3,
  delay: 0.3,
  ease: "power3.out",
});

// === Donation CTA ===
gsap.from("#donation-cta h2", {
  scrollTrigger: {
    trigger: "#donation-cta",
    start: "top 85%",
    toggleActions: "play none none none",
  },
  y: 40,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
});

gsap.from("#donation-cta p", {
  scrollTrigger: {
    trigger: "#donation-cta",
    start: "top 80%",
    toggleActions: "play none none none",
  },
  y: 40,
  opacity: 0,
  duration: 1,
  delay: 0.2,
  ease: "power3.out",
});

gsap.from("#donation-cta .cta-btn", {
  scrollTrigger: {
    trigger: "#donation-cta",
    start: "top 75%",
    toggleActions: "play none none none",
  },
  scale: 0.85,
  opacity: 0,
  duration: 0.8,
  delay: 0.4,
  ease: "back.out(1.7)",
});

gsap.from("#site-footer .footer-col", {
  scrollTrigger: {
    trigger: "#site-footer",
    start: "top 80%",
    toggleActions: "play none none none",
  },
  y: 50,
  opacity: 0,
  duration: 1,
  stagger: 0.3,
  ease: "power3.out",
});

gsap.from("#site-footer .footer-bottom p", {
  scrollTrigger: {
    trigger: "#site-footer",
    start: "top 75%",
    toggleActions: "play none none none",
  },
  y: 30,
  opacity: 0,
  duration: 1,
  ease: "power2.out",
});

gsap.from("#site-footer .social-links a", {
  scrollTrigger: {
    trigger: "#site-footer",
    start: "top 70%",
    toggleActions: "play none none none",
  },
  scale: 0.5,
  opacity: 0,
  duration: 0.6,
  stagger: 0.2,
  ease: "back.out(1.7)",
});
