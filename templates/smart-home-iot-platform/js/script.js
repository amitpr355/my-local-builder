// for the navlink
const navLinks = document.querySelectorAll(".btn-custom2");
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
    }
  });

  // Close on link click
  document.querySelectorAll(".btn-custom2").forEach((link) => {
    link.addEventListener("click", () => {
      if (menu.classList.contains("show")) {
        bsCollapse.hide();
        hamburger.classList.remove("is-active");
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
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  new Swiper(".trusted-swiper", {
    slidesPerView: 2,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      480: { slidesPerView: 3 },
      640: { slidesPerView: 4 },
    },
  });
});

document.addEventListener("DOMContentLoaded", function () {
  new Swiper(".customerStorySwiper", {
    spaceBetween: 16,

    // default (mobile first)
    slidesPerView: 1,

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    breakpoints: {
      // >= 480px
      480: {
        slidesPerView: 1.5,
      },

      // >= 640px (small tablets)
      640: {
        slidesPerView: 2,
      },

      // >= 768px (tablets)
      768: {
        slidesPerView: 2.5,
      },

      // >= 1024px (laptops)
      1024: {
        slidesPerView: 3,
      },

      // >= 1280px (large desktop)
      1280: {
        slidesPerView: 4,
      },
    },
  });
});


// for the floating button
// Floating button js
const btn = document.querySelector(".floating-btn");

// Show/hide button on scroll
window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
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

// Bounce animation on hover
btn.addEventListener("mouseenter", () => {
  gsap.to(btn, { scale: 1.1, duration: 0.2, ease: "power1.out" });
});
btn.addEventListener("mouseleave", () => {
  gsap.to(btn, { scale: 1, duration: 0.2, ease: "power1.out" });
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
        threshold: 0.8,
      }
    );

    sections.forEach((section) => observer.observe(section));

    // Navbar Section
    // Navbar initial load animation
    gsap.from("#navbarSection", {
      y: -80,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
    });

    // Menu items stagger animation
    gsap.from("#navbarMenu .nav-item", {
      opacity: 0,
      y: -20,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.1,
      delay: 0.5,
    });

    // home
    // Timeline for hero section animations
    let heroTL = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    // Main hero image animation
    heroTL.from(".hero-image-wrapper img", {
      opacity: 0,
      scale: 0.9,
      duration: 1.2,
    });

    // Floating cards stagger in
    if (window.innerWidth >= 991.98) {
      heroTL.from(
        ".lamp-card",
        {
          x: 80,
          opacity: 1,
          duration: 1,
        },
        "-=0.8"
      );

      heroTL.from(
        ".tv-card",
        {
          y: 40,
          opacity: 1,
          duration: 1,
        },
        "-=0.8"
      );

      // Continuous gentle floating effect
      gsap.to(".floating-card", {
        y: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        duration: 2.5,
      });
    }
    // Smart hero section
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".smart-hero h1", {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".smart-hero",
        start: "top 80%",
      },
    });

    gsap.from(".smart-hero p", {
      opacity: 0,
      y: 40,
      duration: 1,
      delay: 0.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".smart-hero",
        start: "top 75%",
      },
    });

    gsap.from(".smart-hero .email-form", {
      opacity: 0,
      y: 40,
      duration: 1,
      delay: 0.6,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".smart-hero",
        start: "top 70%",
      },
    });

    gsap.from(".smart-hero .rating", {
      opacity: 0,
      scale: 0.8,
      duration: 1,
      delay: 0.9,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".smart-hero",
        start: "top 65%",
      },
    });

    // Trusted section
    gsap.from(".trusted-text", {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".trusted-companies",
        start: "top 80%",
      },
    });

    gsap.from(".trusted-swiper .swiper-slide", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.15,
      delay: 0.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".trusted-companies",
        start: "top 75%",
      },
    });

    gsap.from(".trusted-logos img", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.15,
      delay: 0.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".trusted-companies",
        start: "top 75%",
      },
    });

    // Video section
    gsap.from(".video-section .main-image", {
      opacity: 0,
      y: 50,
      scale: 0.95,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".video-section",
        start: "top 80%",
      },
    });

    gsap.from(".video-section .play-button-main-div", {
      opacity: 0,
      scale: 0.5,
      duration: 0.8,
      delay: 0.3,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".video-section",
        start: "top 75%",
      },
    });

    // Smart Technology section
    // Left side (heading + button)
    gsap.from(".smart-tech-section .left-side-div", {
      opacity: 0,
      x: -50,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".smart-tech-section",
        start: "top 80%",
      },
    });

    // Right side (paragraphs)
    gsap.from(".smart-tech-section .right-side-div p", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.2,
      delay: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".smart-tech-section",
        start: "top 75%",
      },
    });

    // Info boxes pop in
    gsap.from(".smart-tech-section .info-box", {
      opacity: 0,
      scale: 0.8,
      duration: 0.8,
      stagger: 0.2,
      delay: 0.6,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".smart-tech-section",
        start: "top 70%",
      },
    });

    // New features section
    // Badge + heading
    gsap.from(".features-section .update-badge", {
      opacity: 0,
      y: -20,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".features-section",
        start: "top 85%",
      },
    });

    gsap.from(".features-section .section-header h2", {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".features-section",
        start: "top 80%",
      },
    });

    // First main feature card & image
    gsap.from(".features-section .feature-card-div", {
      opacity: 0,
      x: -50,
      duration: 1,
      delay: 0.4,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".features-section",
        start: "top 75%",
      },
    });

    gsap.from(".features-section .feature-image img", {
      opacity: 0,
      x: 50,
      duration: 1,
      delay: 0.4,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".features-section",
        start: "top 75%",
      },
    });

    // Other feature cards
    gsap.from(".features-section .main-feature", {
      opacity: 0,
      y: 40,
      duration: 0.9,
      stagger: 0.2,
      delay: 0.6,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".features-section",
        start: "top 70%",
      },
    });

    // CTA Button
    gsap.from(".features-section .cta-button", {
      opacity: 0,
      scale: 0.85,
      duration: 0.8,
      delay: 0.9,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".features-section",
        start: "top 65%",
      },
    });

    // Comprehensive section
    // Heading
    gsap.from(
      ".ecosystem-section .section-header h2 span, .ecosystem-section .section-header h2 div",
      {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".ecosystem-section",
          start: "top 85%",
        },
      }
    );

    // Top highlight card text
    gsap.from(".ecosystem-section .highlight-card", {
      opacity: 0,
      x: -50,
      duration: 1,
      delay: 0.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".ecosystem-section",
        start: "top 78%",
      },
    });

    // Top highlight card image
    gsap.from(".ecosystem-section .highlight-image img", {
      opacity: 0,
      x: 50,
      duration: 1,
      delay: 0.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".ecosystem-section",
        start: "top 78%",
      },
    });

    // Images inside bottom features
    gsap.from(".ecosystem-section .bottom-features .feature-image img", {
      opacity: 1,
      scale: 0.9,
      duration: 1,
      delay: 0.7,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".ecosystem-section",
        start: "top 65%",
      },
    });

    // Quote section
    // Quote mark pop-in
    gsap.from(".quote-section .quote-mark", {
      opacity: 0,
      scale: 0.5,
      duration: 0.8,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".quote-section",
        start: "top 85%",
      },
    });

    // Gradient text fade-in with upward slide
    gsap.from(".quote-section .gradient-text", {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".quote-section",
        start: "top 80%",
      },
    });

    // Customer story section
    // Heading animation
    gsap.from(".customer-story h2", {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".customer-story",
        start: "top 85%",
      },
    });

    // Mobile swiper cards
    gsap.from(".customer-story .customerStorySwiper .swiper-slide", {
      opacity: 0,
      y: 40,
      duration: 0.9,
      stagger: 0.2,
      delay: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".customer-story",
        start: "top 80%",
      },
    });

    // Desktop grid cards
    gsap.from(".customer-story .row.g-4 .story-card", {
      opacity: 0,
      y: 40,
      duration: 0.9,
      stagger: 0.2,
      delay: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".customer-story",
        start: "top 80%",
      },
    });

    // FAQ section
    // FAQ heading animation
    gsap.from(".faq-section .faq-title", {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".faq-section",
        start: "top 85%",
      },
    });

    // FAQ accordion items animation
    gsap.from(".faq-section .accordion-item", {
      opacity: 0,
      y: 40,
      duration: 0.9,
      stagger: 0.2,
      delay: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".faq-section",
        start: "top 80%",
      },
    });

    // Only text section 2
    // Logo animation
    gsap.from(".quote-section2 .hero-logo", {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".quote-section2",
        start: "top 85%",
      },
    });

    // Text animation
    gsap.from(".quote-section2 .gradient-text", {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".quote-section2",
        start: "top 80%",
      },
    });

    // Footer section
    // Fade in each footer column with stagger
    gsap.from(".footer-section .footer-column", {
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".footer-section",
        start: "top 85%",
      },
    });

    // Footer bottom row slide up
    gsap.from(".footer-section .footer-bottom", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".footer-section",
        start: "top 80%",
      },
    });
  }
});
