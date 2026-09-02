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
        threshold: 0.4,
      }
    );

    sections.forEach((section) => observer.observe(section));

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

    // Register plugin
    gsap.registerPlugin(ScrollTrigger);

    // Bounce animation on hover
    btn.addEventListener("mouseenter", () => {
      gsap.to(btn, { scale: 1.1, duration: 0.2, ease: "power1.out" });
    });
    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, { scale: 1, duration: 0.2, ease: "power1.out" });
    });

    // Animate the navbar
    gsap.from("#navbarSection", {
      scrollTrigger: {
        trigger: "#navbarSection",
        start: "top top+=100", // when the navbar is 100px from the top
        toggleActions: "play none none none",
      },
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    // Hero Text Animation
    gsap.from(
      ".hero-sectin-main-heading, .hero-section-para, .get-started-btn, .try-for-free-btn",
      {
        scrollTrigger: {
          trigger: "#home",
          start: "top center+=50", // When top of hero section hits center
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 50,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
      }
    );

    // Hero Image Animation
    gsap.from(".main-img", {
      scrollTrigger: {
        trigger: "#home",
        start: "top center+=50",
        toggleActions: "play none none none",
      },
      opacity: 0,
      x: 100,
      duration: 1.4,
      ease: "power3.out",
    });

    // For section 2
    gsap.from(".open-your-mind-section .hero-heading", {
      scrollTrigger: {
        trigger: ".open-your-mind-section",
        start: "top 80%", // When section top reaches 80% of viewport
        toggleActions: "play none none none", // Animate only once
      },
      opacity: 0,
      y: 50, // Slide up slightly
      duration: 1.2,
      ease: "power3.out",
    });

    // For section 3
    // Right column animation
    gsap.from(".analytics-help .col-lg-4", {
      scrollTrigger: {
        trigger: ".analytics-help",
        start: "top 80%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      x: 50,
      duration: 1.2,
      delay: 0.2,
      ease: "power3.out",
    });

    /// Section 4
    gsap.from(".tools-section .tool-card", {
      scrollTrigger: {
        trigger: ".tools-section",
        start: "top 80%", // Trigger when section top hits 80% of viewport
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 50,
      duration: 1.2,
      stagger: 0.3, // Animate one after another
      ease: "power2.out",
    });

    /// Section 5
    // Animate image column
    gsap.from(".podcast-stats-section .image-wrapper", {
      scrollTrigger: {
        trigger: ".podcast-stats-section",
        start: "top 80%",
        toggleActions: "play none none none",
      },
      x: -80,
      opacity: 0,
      duration: 1.2,
      ease: "power2.out",
    });

    // Animate text column items
    gsap.from(
      [
        ".podcast-stats-section .section-heading",
        ".podcast-stats-section .section-description",
        ".podcast-stats-section .learn-more-button",
      ],
      {
        scrollTrigger: {
          trigger: ".podcast-stats-section",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        x: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power2.out",
      }
    );

    /// Section 6
    // Animate heading
    gsap.from(".testimonials-section .section-heading", {
      scrollTrigger: {
        trigger: ".testimonials-section",
        start: "top 80%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power2.out",
    });

    // Animate Client 1 - image from left, text from right
    gsap.from(
      ".testimonials-section .row:nth-of-type(2) .testimonial-img-wrapper",
      {
        scrollTrigger: {
          trigger: ".testimonials-section .row:nth-of-type(2)",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        x: -80,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
      }
    );

    gsap.from(
      ".testimonials-section .row:nth-of-type(2) .testimonial-text, .testimonials-section .row:nth-of-type(2) .testimonial-author, .testimonials-section .row:nth-of-type(2) .testimonial-role",
      {
        scrollTrigger: {
          trigger: ".testimonials-section .row:nth-of-type(2)",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        x: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power2.out",
      }
    );

    // Animate Client 2 - image from right, text from left
    // Animate Learn More button
    gsap.from(".testimonials-section .learn-more-button", {
      scrollTrigger: {
        trigger: ".testimonials-section .learn-more-button",
        start: "top 90%",
        toggleActions: "play none none none",
      },
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
    });

    /// Section 7
    // Animate Section Heading
    gsap.from(".articles-section .section-heading", {
      scrollTrigger: {
        trigger: ".articles-section",
        start: "top 85%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power2.out",
    });

    // Animate Each Article Card
    gsap.utils
      .toArray(".articles-section .article-card")
      .forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 50,
          duration: 1.1,
          delay: index * 0.2, // Stagger each card based on index
          ease: "power2.out",
        });
      });

    // Animate Learn More Button
    gsap.from(".articles-section .learn-more-button", {
      scrollTrigger: {
        trigger: ".articles-section .learn-more-button",
        start: "top 90%",
        toggleActions: "play none none none",
      },
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
    });

    /// Section 8
    // Animate Text Column (Heading, Paragraph, Button)
    gsap.from(
      [
        ".promo-section .section-heading",
        ".promo-section .section-description",
        ".promo-section .learn-more-button",
      ],
      {
        scrollTrigger: {
          trigger: ".promo-section",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        x: -80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power2.out",
      }
    );

    // Animate Image
    gsap.from(".promo-section .promo-image-wrapper", {
      scrollTrigger: {
        trigger: ".promo-section",
        start: "top 80%",
        toggleActions: "play none none none",
      },
      x: 80,
      opacity: 0,
      duration: 1.2,
      ease: "power2.out",
    });

    /// Footer section
    // Animate logo
    gsap.from(".footer-section .navbar-brand-name", {
      scrollTrigger: {
        trigger: ".footer-section",
        start: "top 90%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power2.out",
    });

    // Animate footer link columns
    gsap.from(".footer-section .footer-menu-divs", {
      scrollTrigger: {
        trigger: ".footer-section",
        start: "top 90%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 40,
      duration: 1.2,
      ease: "power2.out",
      stagger: 0.2,
    });

    // Animate social icons
    gsap.from(".footer-section .footer-icons a", {
      scrollTrigger: {
        trigger: ".footer-section .footer-icons",
        start: "top 95%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      scale: 0.5,
      duration: 0.8,
      ease: "back.out(1.7)",
      stagger: 0.15,
    });

    // Animate burst rays (if you want visual flair)
    gsap.from(".footer-section .burst-ray", {
      scrollTrigger: {
        trigger: ".footer-section",
        start: "top 95%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      rotate: 60,
      duration: 1,
      ease: "power2.out",
      stagger: 0.1,
    });

    // Animate copyright line
    gsap.from(".footer-section .text-center", {
      scrollTrigger: {
        trigger: ".footer-section",
        start: "top 95%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 20,
      duration: 1,
      delay: 0.5,
      ease: "power2.out",
    });
  }
});
