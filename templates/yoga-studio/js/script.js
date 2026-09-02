// for the navlink
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    // Remove active class from all links
    navLinks.forEach((lnk) => lnk.classList.remove("active"));
    // Add active class to the clicked link
    this.classList.add("active");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger-toggle");
  const menu = document.getElementById("navbarMenu");
  const navbarSection = document.getElementById("navbarSection");

  const bsCollapse = new bootstrap.Collapse(menu, {
    toggle: false,
  });

  // Toggle hamburger and menu
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("is-active");
    if (menu.classList.contains("show")) {
      bsCollapse.hide();
    } else {
      bsCollapse.show();
      navbarSection.classList.add("nav-dark");
    }
  });

  // Close on link click
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (menu.classList.contains("show")) {
        bsCollapse.hide();
        hamburger.classList.remove("is-active");
        navbarSection.classList.remove("nav-dark");
      }
    });
  });
  // Close on outside click
  document.addEventListener("click", (e) => {
    if (
      !menu.contains(e.target) &&
      !hamburger.contains(e.target) &&
      menu.classList.contains("show")
    ) {
      bsCollapse.hide();
      hamburger.classList.remove("is-active");
      navbarSection.classList.remove("nav-dark");
    }
  });
});

// For adding the navbar background on start scrolling
window.addEventListener("scroll", () => {
  const navRef = document.querySelector(".navbar");
  if (window.scrollY > 0) {
    navRef.classList.add("nav-dark");
  } else {
    navRef.classList.remove("nav-dark");
  }
});

// Expert Section Swiper
var swiper = new Swiper(".expertSwiper", {
  slidesPerView: 3, // Show 3 slides at a time
  spaceBetween: 30, // Gap between slides
  navigation: {
    nextEl: ".custom-next",
    prevEl: ".custom-prev",
  },
  loop: true, // Infinite loop

  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 320px
    250: {
      slidesPerView: 1,
    },
    // when window width is >= 768px
    768: {
      slidesPerView: 2,
    },
    // when window width is >= 1024px
    1200: {
      slidesPerView: 3,
    },
  },
});

// REview Section Swiper
var swiper = new Swiper(".reviewSwiper", {
  slidesPerView: 3, // Show 3 slides at a time
  spaceBetween: 30, // Gap between slides

  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 320px
    250: {
      slidesPerView: 1,
    },
    // when window width is >= 768px
    600: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
    },
    // when window width is >= 1024px
    1200: {
      slidesPerView: 2,
    },
    1400: {
      slidesPerView: 3,
    },
  },

  // Add pagination
  pagination: {
    el: ".swiper-pagination", // Target element
    clickable: true, // Allows clicking on bullets
  },
});

window.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth >= 767.98) {
    // For the intersection overflow
    // For to active the menu links
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("#navbarMenu a");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((link) => {
              link.classList.remove("active");
              const href = link.getAttribute("href");
              if (!href) return;
              if (href.substring(1) === entry.target.id) {
                link.classList.add("active");
              }
            });
          }
        });
      },
      {
        threshold: 0.4,
      }
    );
    sections.forEach((section) => observer.observe(section));

    // Floating button js
    const btn = document.querySelector(".floating-btn");

    // Show/hide button on scroll
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 10) {
        // Show button
        btn.style.opacity = 1;
        btn.style.transform = "translateY(0)";
        btn.style.pointerEvents = "auto";
      } else {
        // Hide button
        btn.style.opacity = 0;
        btn.style.transform = "translateY(50px)";
        btn.style.pointerEvents = "none";
      }
    });

    // Navbar section
    // Animate nav links one by one
    gsap.from("#navbarSection .nav-link", {
      y: -20,
      opacity: 0,
      stagger: 0.15, // delay between each link
      duration: 0.8,
      ease: "power2.out",
      delay: 0.5, // after navbar appears
    });

    // Animate Contact Us button (desktop)
    gsap.from("#navbarSection .custom-btn", {
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
      delay: 1.2,
    });

    // Hero section
    // Hero Title
    gsap.from("#home .hero-title", {
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
    });

    // Hero Texts (staggered)
    gsap.from("#home .hero-text", {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      stagger: 0.3,
      delay: 0.6,
    });

    // Button + Play Icon
    gsap.from("#home .button-div", {
      y: 20,
      opacity: 0,
      duration: 1,
      ease: "back.out(1.5)",
      delay: 1.2,
    });

    // Hero Image
    gsap.from("#home .hero-image", {
      scale: 0.9,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      delay: 1.0,
    });

    // "As seen on"
    gsap.from("#home .as-seen-on", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: 1.6,
    });

    // Logos (staggered)
    gsap.from("#home .logo-list img", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.15,
      delay: 1.8,
    });

    // Classes & Why Choose Us Section
    gsap.registerPlugin(ScrollTrigger);

    // In-Person & Virtual Classes Cards
    gsap.from(".class-card", {
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      stagger: 0.3,
      scrollTrigger: {
        trigger: ".classes-section",
        start: "top 80%",
      },
    });

    // "Why Choose Us?" Heading & Description
    gsap.from(".why-choose-us h2, .why-choose-us p", {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".why-choose-us",
        start: "top 85%",
      },
    });

    // Feature Boxes (Expert, Diverse, Community)
    gsap.from(".feature-box", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      stagger: 0.25,
      scrollTrigger: {
        trigger: ".why-choose-us",
        start: "top 70%",
      },
    });

    // Wellness Section
    // Left Image
    gsap.from(".wellness-section .image-wrapper img", {
      x: -80,
      opacity: 0,
      duration: 1.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".wellness-section",
        start: "top 80%",
      },
    });

    // Right Content (heading, text, link)
    gsap.from(".wellness-section .content-wrapper > *", {
      x: 80,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      stagger: 0.25,
      scrollTrigger: {
        trigger: ".wellness-section",
        start: "top 75%",
      },
    });

    // Book your spot section
    // Animate CTA card container
    gsap.from(".cta-section .cta-card", {
      y: 80,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".cta-section",
        start: "top 80%",
      },
    });

    // Animate inside content (heading, text, buttons)
    gsap.from(".cta-section .cta-card > *", {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".cta-section",
        start: "top 75%",
      },
    });

    // Yoga Experts Section
    // Animate left content
    gsap.from(".experts-section .experts-content", {
      x: -80,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".experts-section",
        start: "top 80%",
      },
    });

    // Animate expert cards (swiper slides)
    gsap.from(".experts-section .swiper-slide", {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.25,
      scrollTrigger: {
        trigger: ".experts-section .swiper",
        start: "top 75%",
      },
    });

    // Client Reviews Section
    // Animate heading
    gsap.from(".reviews-section .each-section-heading", {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".reviews-section",
        start: "top 85%",
      },
    });

    // Animate review cards
    gsap.from(".reviews-section .swiper-slide", {
      y: 70,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.3,
      scrollTrigger: {
        trigger: ".reviews-section .reviewSwiper",
        start: "top 80%",
      },
    });

    // Animate "View All Reviews" link
    gsap.from(".reviews-section .a-with-arrow", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".reviews-section .a-with-arrow",
        start: "top 90%",
      },
    });

    // Services Section
    // Heading + description
    gsap.from(
      ".yoga-section .each-section-heading, .yoga-section .each-section-description:first-of-type",
      {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".yoga-section",
          start: "top 80%",
        },
      }
    );

    // Second paragraph + button
    gsap.from(
      ".yoga-section .each-section-description:last-of-type, .yoga-section .custom-btn",
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.3,
        scrollTrigger: {
          trigger: ".yoga-section .custom-btn",
          start: "top 90%",
        },
      }
    );

    // Image (fade in from right)
    gsap.from(".yoga-section img", {
      x: 80,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".yoga-section img",
        start: "top 85%",
      },
    });

    // FAQ Section
    // FAQ Header
    gsap.from(".faq-section .faq-header", {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".faq-section",
        start: "top 80%",
      },
    });

    // Left Column FAQs
    gsap.from(".faq-section .col-md-6:first-child .faq-item", {
      x: -60,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".faq-section .col-md-6:first-child",
        start: "top 85%",
      },
    });

    // Right Column FAQs
    gsap.from(".faq-section .col-md-6:last-child .faq-item", {
      x: 60,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".faq-section .col-md-6:last-child",
        start: "top 85%",
      },
    });

    // Illustration
    gsap.from(".faq-section .faq-illustration img", {
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".faq-section .faq-illustration",
        start: "top 90%",
      },
    });

    // Footer Section
    // Footer Logo
    gsap.from(".site-footer .footer-logo", {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".site-footer",
        start: "top 90%",
      },
    });

    // Footer Buttons
    gsap.from(".site-footer .footer-buttons a", {
      // y: 30,
      opacity: 1,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".site-footer .footer-buttons",
        start: "top 90%",
      },
    });

    // Nav Links
    gsap.from(".site-footer .footer-nav li", {
      x: -40,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.15,
      scrollTrigger: {
        trigger: ".site-footer .footer-nav",
        start: "top 90%",
      },
    });

    // Social Icons
    gsap.from(".site-footer .footer-social a", {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      ease: "back.out(1.7)",
      stagger: 0.15,
      scrollTrigger: {
        trigger: ".site-footer .footer-social",
        start: "top 95%",
      },
    });

    // Newsletter Section
    gsap.from(".site-footer .newsletter", {
      x: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".site-footer .newsletter",
        start: "top 90%",
      },
    });

    // Bottom Bar
    gsap.from(".site-footer .footer-bottom", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".site-footer .footer-bottom",
        start: "top 95%",
      },
    });
  }
});
