// Back to Top Button
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

// Sticky Navbar + ScrollSpy
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links li a");

  // Sticky navbar
  if (window.scrollY > 50) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }

  // Active nav link highlight
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 80; // adjust offset
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Toggle Menu
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  menuToggle.classList.toggle("active");

  // Change toggle button to "X"
  if (menuToggle.classList.contains("active")) {
    menuToggle.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
  } else {
    menuToggle.innerHTML = `<i class="fa-solid fa-bars"></i>`;
  }
});

// Close menu when a link is clicked (on mobile)
document.querySelectorAll(".nav-links li a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuToggle.classList.remove("active");
    menuToggle.innerHTML = `<i class="fa-solid fa-bars"></i>`;
  });
});
// gsap animations start here
if (window.innerWidth > 768) {
  gsap.registerPlugin(ScrollTrigger);

  // Hero section animation
  gsap.from("#hero .hero-content h1", {
    scrollTrigger: {
      trigger: "#hero",
      start: "top 80%", // when top of hero is 80% from top of viewport
      toggleActions: "play none none",
    },
    y: 80,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });

  gsap.from("#hero .hero-content p", {
    scrollTrigger: {
      trigger: "#hero",
      start: "top 70%",
      toggleActions: "play none none",
    },
    y: 60,
    opacity: 0,
    duration: 1,
    delay: 0.3,
    ease: "power3.out",
  });

  gsap.from("#hero .hero-btn", {
    scrollTrigger: {
      trigger: "#hero",
      start: "top 65%",
      toggleActions: "play none none",
    },
    y: 40,
    opacity: 0,
    duration: 1,
    delay: 0.6,
    ease: "power3.out",
  });

  // === Featured Section ===
  gsap.from("#featured .featured-heading h5", {
    scrollTrigger: {
      trigger: "#featured",
      start: "top 80%",
      toggleActions: "play none none",
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });

  gsap.from("#featured .logo-item", {
    scrollTrigger: {
      trigger: "#featured",
      start: "top 75%",
      toggleActions: "play none none",
    },
    y: 40,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    stagger: 0.15, // each logo animates one by one
  });

  // === Topics Section ===
  gsap.from("#topics .topics-heading h2", {
    scrollTrigger: {
      trigger: "#topics",
      start: "top 80%",
      toggleActions: "play none none",
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });

  gsap.from("#topics .topic-item", {
    scrollTrigger: {
      trigger: "#topics",
      start: "top 70%",
      toggleActions: "play none none",
    },
    y: 60,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    stagger: 0.2, // each card fades in with delay
  });
  // === Services Section ===
  gsap.from("#services .services-left h2", {
    scrollTrigger: {
      trigger: "#services",
      start: "top 80%",
      toggleActions: "play none none",
    },
    y: 60,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });

  gsap.from("#services .btn-services", {
    scrollTrigger: {
      trigger: "#services",
      start: "top 75%",
      toggleActions: "play none none",
    },
    y: 40,
    opacity: 0,
    duration: 1,
    delay: 0.3,
    ease: "power3.out",
  });

  gsap.from("#services .services-list li", {
    scrollTrigger: {
      trigger: "#services",
      start: "top 70%",
      toggleActions: "play none none",
    },
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2, // each service item animates in sequence
    ease: "power3.out",
  });

  // === About Section ===
  gsap.from("#about .about-left .subtitle", {
    scrollTrigger: {
      trigger: "#about",
      start: "top 80%",
      toggleActions: "play none none",
    },
    y: 40,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });

  gsap.from("#about .about-left .left-heading", {
    scrollTrigger: {
      trigger: "#about",
      start: "top 75%",
      toggleActions: "play none none",
    },
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.2,
    ease: "power3.out",
  });

  gsap.from("#about .about-left img", {
    scrollTrigger: {
      trigger: "#about",
      start: "top 70%",
      toggleActions: "play none none",
    },
    scale: 0.9,
    opacity: 0,
    duration: 1,
    delay: 0.4,
    ease: "power3.out",
  });

  gsap.from(
    "#about .about-right p, #about .about-right, #about .about-right h5",
    {
      scrollTrigger: {
        trigger: "#about",
        start: "top 65%",
        toggleActions: "play none none",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    }
  );

  // === Client Review Section ===
  gsap.from("#client-review .review-heading", {
    scrollTrigger: {
      trigger: "#client-review",
      start: "top 80%",
      toggleActions: "play none none",
    },
    y: 60,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });

  // === CTA Section ===
  gsap.from("#cta h2", {
    scrollTrigger: {
      trigger: "#cta",
      start: "top 80%",
      toggleActions: "play none none",
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });

  gsap.from("#cta p", {
    scrollTrigger: {
      trigger: "#cta",
      start: "top 75%",
      toggleActions: "play none none",
    },
    y: 40,
    opacity: 0,
    duration: 1,
    delay: 0.3,
    ease: "power3.out",
  });

  gsap.from("#cta .cta-btn", {
    scrollTrigger: {
      trigger: "#cta",
      start: "top 70%",
      toggleActions: "play none none",
    },
    y: 30,
    opacity: 0,
    duration: 1,
    delay: 0.6,
    ease: "power3.out",
  });

  // === Footer Section ===
  gsap.from("#footer .footer-col", {
    scrollTrigger: {
      trigger: "#footer",
      start: "top 85%",
      toggleActions: "play none none",
    },
    y: 70,
    opacity: 0,
    duration: 1,
    stagger: 0.25, // each footer column comes in sequence
    ease: "power3.out",
  });

  gsap.from("#footer .footer-bottom p", {
    scrollTrigger: {
      trigger: "#footer .footer-bottom",
      start: "top 90%",
      toggleActions: "play none none",
    },
    y: 20,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out",
  });
}
