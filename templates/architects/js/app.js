const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});
// logo animation

const swiper = new Swiper(".logo-swiper", {
  slidesPerView: 4, // show 4 logos on desktop
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    0: { slidesPerView: 2 }, // mobile
    768: { slidesPerView: 3 }, // tablet
    1024: { slidesPerView: 4 }, // desktop
  },
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
// sticky navigation bar

window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");

  if (window.scrollY > 50) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
});

// Register plugin
gsap.registerPlugin(ScrollTrigger);

// Navbar animation (slide down when page loads)
gsap.from("#navbar .nav-wrapper", {
  y: -80,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
});

// Hero subtitle + line animation
gsap.from("#hero .subtitle", {
  scrollTrigger: {
    trigger: "#hero",
    start: "top 80%", // when hero enters viewport
    toggleActions: "play none none",
  },
  y: 40,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
});

gsap.from("#hero .outline", {
  scrollTrigger: {
    trigger: "#hero",
    start: "top 75%",
    toggleActions: "play none none",
  },
  scaleX: 0,
  transformOrigin: "left center",
  duration: 1,
  ease: "power2.out",
  delay: 0.3,
});

// Hero title
gsap.from("#hero h1", {
  scrollTrigger: {
    trigger: "#hero",
    start: "top 70%",
    toggleActions: "play none none",
  },
  y: 50,
  opacity: 0,
  duration: 1,
  delay: 0.5,
  ease: "power3.out",
});

// Hero button (Read More)
gsap.from("#hero .read-more", {
  scrollTrigger: {
    trigger: "#hero",
    start: "top 65%",
    toggleActions: "play none none",
  },
  y: 30,
  opacity: 0,
  duration: 1,
  delay: 0.8,
  ease: "power2.out",
});
// About Section
gsap.from("#about .about-intro", {
  scrollTrigger: {
    trigger: "#about",
    start: "top 80%",
    toggleActions: "play none none none", // no
  },
  x: -80,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out",
});

gsap.from("#about .team-member", {
  scrollTrigger: {
    trigger: "#about",
    start: "top 70%",
    toggleActions: "play none none none",
  },
  y: 60,
  opacity: 0,
  duration: 1,
  stagger: 0.3,
  ease: "power3.out",
});

// Services Section
gsap.from("#services .services-header", {
  scrollTrigger: {
    trigger: "#services",
    start: "top 80%",
    toggleActions: "play none none none",
  },
  y: 50,
  opacity: 0,
  duration: 1,
  ease: "power2.out",
});

gsap.from("#services .service-item", {
  scrollTrigger: {
    trigger: "#services .services-grid",
    start: "top 75%",
    toggleActions: "play none none none",
  },
  y: 70,
  opacity: 0,
  duration: 1,
  stagger: 0.4,
  ease: "power3.out",
});
// Testimonials Section - Left
gsap.from("#testimonials .testimonial-left", {
  scrollTrigger: {
    trigger: "#testimonials",
    start: "top 80%",
    toggleActions: "play none none none", // only play once
  },
  x: -80,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out",
});

// Testimonials Section - Right Items
gsap.from("#testimonials .testimonial-right .testimonial-item", {
  scrollTrigger: {
    trigger: "#testimonials",
    start: "top 70%",
    toggleActions: "play none none none",
  },
  y: 60,
  opacity: 0,
  duration: 1,
  stagger: 0.3,
  ease: "power3.out",
});

// Logo Section
gsap.from("#logo-section .swiper-slide", {
  scrollTrigger: {
    trigger: "#logo-section",
    start: "top 80%",
    toggleActions: "play none none none",
  },
  y: 50,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  ease: "power2.out",
});
// Footer Columns (About, Links, Business, Contact)
gsap.from("#footer-section .footer-wrapper > div", {
  scrollTrigger: {
    trigger: "#footer-section",
    start: "top 85%",
    toggleActions: "play none none none", // only play once
  },
  y: 60,
  opacity: 0,
  duration: 1,
  stagger: 0.3,
  ease: "power3.out",
});

// Footer Social Icons
gsap.from("#footer-section .footer-socials a", {
  scrollTrigger: {
    trigger: "#footer-section",
    start: "top 80%",
    toggleActions: "play none none none",
  },
  scale: 0,
  opacity: 0,
  duration: 0.6,
  stagger: 0.2,
  ease: "back.out(1.7)",
});

// Footer Bottom Text
gsap.from("#footer-section .footer-bottom p", {
  scrollTrigger: {
    trigger: "#footer-section",
    start: "top 90%",
    toggleActions: "play none none none",
  },
  y: 30,
  opacity: 0,
  duration: 0.8,
  stagger: 0.2,
  ease: "power2.out",
});
