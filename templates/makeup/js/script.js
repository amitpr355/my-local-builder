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
      // Remove nav-dark2 after 300 milliseconds
      setTimeout(() => {
        navbarSection.classList.remove("nav-dark2");
      }, 300);
    } else {
      bsCollapse.show();
      navbarSection.classList.add("nav-dark2");
    }
  });

  // Close on link click
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (menu.classList.contains("show")) {
        bsCollapse.hide();
        hamburger.classList.remove("is-active");
        navbarSection.classList.remove("nav-dark2");
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
      navbarSection.classList.remove("nav-dark2");
    }
  });
});

// For adding the navbar background on start scrolling
window.addEventListener("scroll", () => {
  const navRef = document.querySelector(".navbar");
  if (window.scrollY >= 80) {
    navRef.classList.add("nav-dark");
  } else {
    navRef.classList.remove("nav-dark");
  }
});

// For the swiper js
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 10,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
    dynamicMainBullets: 5, // ✅ Maximum of 5 bullets
  },
  breakpoints: {
    640: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
  },
});

var swiper = new Swiper(".review-swiper", {
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

    // Bounce animation on hover
    btn.addEventListener("mouseenter", () => {
      gsap.to(btn, { scale: 1.1, duration: 0.2, ease: "power1.out" });
    });
    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, { scale: 1, duration: 0.2, ease: "power1.out" });
    });

    /// Section Navbar
    // Register plugin
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".navbar-section", {
      scrollTrigger: {
        trigger: ".navbar-section",
        start: "top top", // triggers when navbar hits the top
        toggleActions: "play none none none",
        // markers: true // Uncomment to debug
      },
      duration: 1,
      y: -100, // Slide in from above
      opacity: 0,
      ease: "power4.out",
    });

    /// Section 1(hero section)
    gsap.from(".hero-section .small-text-of-content", {
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top 80%", // starts when section enters the viewport
        toggleActions: "play none none none",
      },
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(".hero-section .hero-section-main-heading", {
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top 75%",
        toggleActions: "play none none none",
      },
      y: 50,
      opacity: 0,
      duration: 1.2,
      delay: 0.2,
      ease: "power3.out",
    });

    gsap.from(".hero-section .btn-custom", {
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top 70%",
        toggleActions: "play none none none",
      },
      y: 40,
      opacity: 0,
      duration: 1,
      delay: 0.4,
      ease: "power3.out",
    });

    gsap.from(".hero-section .whatsapp-icon", {
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top 65%",
        toggleActions: "play none none none",
      },
      scale: 0,
      opacity: 0,
      duration: 0.8,
      delay: 0.6,
      ease: "back.out(1.7)",
    });

    /// Section 2(Meet Kanika Section)
    const kanikaTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".meet-kanika-section",
        start: "top 80%", // starts when section enters viewport
        toggleActions: "play none none none",
      },
    });

    kanikaTimeline
      .from(".each-section-name-outline", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power2.out",
      })
      .from(
        ".each-section-name",
        {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.6"
      )
      .from(
        ".meet-section-para",
        {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.5"
      )
      .from(
        ".stats-div > div",
        {
          opacity: 0,
          y: 20,
          stagger: 0.2,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      )
      .from(
        ".service-pill",
        {
          opacity: 0,
          scale: 0.9,
          stagger: 0.15,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        "-=0.4"
      )
      .from(
        ".certification-text",
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.3"
      )
      .from(
        ".meet-kanika-section p:last-of-type",
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.5"
      )
      .from(
        ".meet-kanika-section img",
        {
          opacity: 0,
          x: 80,
          duration: 1,
          ease: "power3.out",
        },
        "-=1"
      );

    /// Section 3(Services Section)
    const servicesTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".services-section",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    servicesTimeline
      .from(
        ".services-section .card-div",
        {
          opacity: 0,
          y: 50,
          stagger: 0.3,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.2"
      )
      .from(
        ".services-section .custom-btn",
        {
          scale: 0.9,
          opacity: 0,
          stagger: 0.3,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        "-=1"
      );

    /// Section 4(Instagram Gallery Section)
    const instagramTL = gsap.timeline({
      scrollTrigger: {
        trigger: ".instagram-gallery-section",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    instagramTL
      // Photos Subheading
      .from(
        ".gallery-section-subheading:first-of-type",
        {
          opacity: 0,
          x: -40,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.2"
      )

      // Images
      .from(
        ".gallery-img",
        {
          opacity: 0,
          scale: 0.9,
          stagger: 0.2,
          duration: 0.6,
          ease: "back.out(1.7)",
        },
        "-=0.3"
      )

      // Videos Subheading
      .from(
        ".gallery-section-subheading:nth-of-type(2)",
        {
          opacity: 0,
          x: 40,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.2"
      )

      // Swiper slides
      .from(
        ".videos-swiper .swiper-slide",
        {
          opacity: 0,
          y: 50,
          stagger: 0.15,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.2"
      );

    /// Section 5(Customer Reviews Section)
    // Animate Customer Reviews Section
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".customer-reviews-section",
          start: "top 80%", // trigger when top of section hits 80% of viewport
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      })
      .from(
        ".customer-reviews-section .dual-quote",
        {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          stagger: 0.2,
          ease: "back.out(1.7)",
        },
        "-=0.4"
      )
      .from(
        ".customer-reviews-section .swiper-slide",
        {
          y: 50,
          opacity: 0,
          duration: 0.7,
          stagger: 0.2,
          ease: "power2.out",
        },
        "-=0.3"
      );

    /// Section 6(Beauty Packages Section)
    // Animation for Beauty Packages Section
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".beauty-packages-section",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      })
      .from(
        ".beauty-packages-section .package-card",
        {
          y: 60,
          opacity: 0,
          duration: 0.6,
          stagger: 0.3,
          ease: "power2.out",
        },
        "-=0.3"
      );

    /// Section 7(Contact Section)
    // Animation for Contact Section
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      })
      .from(".contact-section .contactus-cards", {
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.out",
      });

    /// Section Footer
    // Footer Animation
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".footer-section",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      })
      .from(".footer-section .contact-info p", {
        y: 40,
        opacity: 0,
        duration: 0.5,
        stagger: 0.2,
        ease: "power2.out",
      })
      .from(
        ".footer-section .footer-heading",
        {
          x: -30,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.4"
      )
      .from(
        ".footer-section ul li",
        {
          x: 30,
          opacity: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.4"
      )
      .from(
        ".footer-section .footer-social a",
        {
          scale: 0,
          opacity: 0,
          duration: 0.4,
          stagger: 0.15,
          ease: "back.out(1.7)",
        },
        "-=0.3"
      )
      .from(
        ".footer-section .address-of-footer",
        {
          y: 30,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.4"
      )
      .from(
        ".footer-section .copyright-div",
        {
          opacity: 0,
          scale: 0.9,
          duration: 0.4,
          ease: "power1.out",
        },
        "-=0.3"
      );
  }
});
