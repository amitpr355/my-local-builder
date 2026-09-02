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
    }
  });

  // Close on link click
  document.querySelectorAll(".nav-link").forEach((link) => {
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

// our products swiper js
document.addEventListener("DOMContentLoaded", function () {
  if (window.innerWidth < 768) {
    new Swiper(".our-products-swiper", {
      slidesPerView: 1,
      spaceBetween: 16,
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }
});

// For Swiper JS
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

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

// Animation starts here
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
        threshold: 0.3,
      }
    );

    sections.forEach((section) => observer.observe(section));

    // Register plugin
    gsap.registerPlugin(ScrollTrigger);

    // Bounce animation on hover
    btn.addEventListener("mouseenter", () => {
      gsap.to(btn, { scale: 1.1, duration: 0.2, ease: "power1.out" });
    });
    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, { scale: 1, duration: 0.2, ease: "power1.out" });
    });

    // Navbar section
    // Animate navbar container
    gsap.from("#navbarSection", {
      y: -80,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
    });

    // Animate brand logo
    gsap.from("#navbarSection .navbar-brand-name", {
      opacity: 0,
      scale: 0.8,
      duration: 1,
      delay: 0.3,
      ease: "back.out(1.7)",
    });

    // Animate menu items one by one
    gsap.from("#navbarSection .nav-item", {
      opacity: 0,
      y: -20,
      duration: 0.6,
      stagger: 0.15,
      delay: 0.5,
      ease: "power2.out",
    });

    // Animate right side icons
    gsap.from("#navbarSection .navbar-right-div .right-nav-icons", {
      opacity: 0,
      x: 30,
      duration: 0.6,
      stagger: 0.2,
      delay: 1,
      ease: "power2.out",
    });

    // Home section
    // Hero text (main heading)
    gsap.from("#home .hero-heading", {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power3.out",
    });

    // Hero subheading
    gsap.from("#home .hero-subheading", {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.3,
      ease: "power2.out",
    });

    // Hero buttons (staggered)
    gsap.from("#home .hero-buttons a", {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 0.6,
      stagger: 0.2,
      ease: "power2.out",
    });

    // Hero image (slide + fade)
    gsap.from("#home .hero-image", {
      opacity: 0,
      x: 60,
      duration: 1.2,
      delay: 0.8,
      ease: "power3.out",
    });

    // Section 2(Your Plants Deserves Best Section)
    // Left image
    gsap.from("#growlights .left-image-div img", {
      opacity: 0,
      x: -80,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#growlights",
        start: "top 80%", // animation starts when section is 80% into viewport
        toggleActions: "play none none reverse",
      },
    });

    // Heading
    gsap.from("#growlights .section-heading", {
      opacity: 0,
      y: 40,
      duration: 1,
      delay: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#growlights",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Paragraphs (staggered)
    gsap.from("#growlights .section-para span", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.4,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#growlights",
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    });

    // Grass graphic (subtle fade up)
    gsap.from("#growlights .deserves-section-graphic", {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#growlights",
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    });

    // Section 3: Our Products
    // Top grass graphic
    gsap.from("#growequipments .product-section-graphic", {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#growequipments",
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    });

    // Section heading
    gsap.from("#growequipments .section-heading", {
      opacity: 0,
      y: -40,
      duration: 1,
      delay: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#growequipments",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    // Product cards (staggered)
    gsap.from(".product-card", {
      opacity: 0,
      // y: 60,
      // scale: 0.9,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#growequipments",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Bottom grass graphic
    gsap.from("#growequipments .product-section-graphics2", {
      opacity: 0,
      y: 50,
      duration: 1,
      delay: 0.3,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#growequipments",
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    });

    // Section 4(Official Distributors)
    // Heading
    gsap.from(".distributors-section .section-heading", {
      opacity: 0,
      y: -40,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".distributors-section",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    // Swiper container
    gsap.from(".distributors-section .swiper", {
      opacity: 0,
      y: 60,
      duration: 1,
      delay: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".distributors-section",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Logos (staggered inside swiper)
    gsap.from(".distributors-section .collaborator img", {
      opacity: 0,
      scale: 0.7,
      duration: 0.8,
      stagger: 0.2,
      delay: 0.4,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".distributors-section",
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    });

    // Section 5(Reducing our Carbon Footprint)
    // Heading
    gsap.from(".carbon-footprint-section .section-heading", {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".carbon-footprint-section",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Paragraph
    gsap.from(".carbon-footprint-section .section-para", {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.3,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".carbon-footprint-section",
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    });

    // Image
    gsap.from(".carbon-footprint-section .image-div img", {
      opacity: 0,
      x: 80,
      scale: 0.9,
      duration: 1.2,
      delay: 0.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".carbon-footprint-section",
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });

    // Section 6(Catalogue)
    gsap.from(".download-section .card-div", {
      opacity: 0,
      y: 80,
      scale: 0.9,
      duration: 1,
      ease: "power3.out",
      stagger: 0.3,
      scrollTrigger: {
        trigger: ".download-section",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    gsap.from(
      ".download-section .card-title, .download-section .card-text, .download-section .download-button",
      {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        delay: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".download-section",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Section 7(Need Help)
    // Heading + Para Animation
    gsap.from(".help-section .section-heading, .help-section .section-para", {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: "power3.out",
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".help-section",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Cards Animation
    gsap.from(".help-section .card", {
      opacity: 0,
      y: 100,
      scale: 0.9,
      duration: 1,
      ease: "power3.out",
      stagger: 0.3,
      scrollTrigger: {
        trigger: ".help-section",
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    });

    // Section 8(Footer Section)
    // Logo + Info Animation
    gsap.from(
      ".footer-section .navbar-brand-name, .footer-section .footer-para, .footer-section .footer-get-a-quote",
      {
        opacity: 0,
        x: -60,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".footer-section",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Footer Columns
    gsap.from(
      ".footer-section .footer-links-heading, .footer-section .footer-div-links li",
      {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".footer-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Bottom Footer
    gsap.from(
      ".footer-section .border-top, .footer-section .footer-social-div a",
      {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".footer-section",
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }
});
