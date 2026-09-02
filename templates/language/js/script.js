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

// For to active the menu links
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("#navbarMenu a");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").substring(1) === entry.target.id) {
              link.classList.add("active");
            }
          });
        }
      });
    },
    {
      threshold: 0.6,
    }
  );

  sections.forEach((section) => observer.observe(section));
});

//////// GSAP Animation starts from here
window.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth >= 768) {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    /// Animation for the navbar
    // Animate navbar container
    gsap.from("#navbar", {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
    });

    // Animate logo and heading
    gsap.from(".navbar-logo-image, .footer-and-navbar-heading", {
      x: -50,
      opacity: 0,
      duration: 0.8,
      delay: 0.3,
      stagger: 0.2,
    });

    // Animate nav links
    gsap.from("#navbarMenu li", {
      y: -20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      delay: 0.5,
      ease: "back.out(1.7)",
    });

    // Animate right-side contact button
    gsap.to(".navbar-contactus-btn", {
      x: 10,
      opacity: 1,
      duration: 0.8,
      delay: 0.7,
      ease: "power2.out",
    });

    /// Animation for the section 1(Hero Section)
    gsap.from(".hero-section-main-heading", {
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
    });

    gsap.from(".hero-section p.lead", {
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top 80%",
      },
      y: 30,
      opacity: 0,
      delay: 0.3,
      duration: 0.8,
      ease: "power2.out",
    });

    gsap.from(".section1-image", {
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top 85%",
      },
      scale: 0.9,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      ease: "power4.out",
    });

    gsap.from(".floating-card", {
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top 85%",
      },
      y: 40,
      opacity: 0,
      stagger: 0.2,
      duration: 0.6,
      ease: "back.out(1.7)",
    });

    gsap.to(".section1-get-started-btn, .section1-watch-intro-btn", {
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top 80%",
      },
      y: 20,
      opacity: 1,
      stagger: 0.2,
      delay: 0.6,
      duration: 0.6,
      ease: "power2.out",
    });

    /// Animation for the section 2(About Us)
    // Animate Image and Green Circle
    gsap.from(".section2-image-section img", {
      scrollTrigger: {
        trigger: ".section2",
        start: "top 80%",
      },
      x: -100,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
    });

    gsap.from(".about-section-green-background", {
      scrollTrigger: {
        trigger: ".section2",
        start: "top 85%",
      },
      scale: 0,
      opacity: 0.3,
      duration: 1.2,
      ease: "back.out(1.7)",
    });

    // Animate Text Content (Heading, Paragraph, Button)
    gsap.from(".section2-text-section > *", {
      scrollTrigger: {
        trigger: ".section2-text-section",
        start: "top 85%",
      },
      y: 30,
      opacity: 1,
      stagger: 0.2,
      duration: 0.8,
      ease: "power2.out",
    });

    // Animate Feature Icons
    gsap.from(".feature-row-card", {
      scrollTrigger: {
        trigger: ".feature-row-card",
        start: "top 90%",
      },
      opacity: 0,
      y: 40,
      duration: 0.6,
      stagger: 0.15,
      ease: "back.out(1.5)",
    });

    // Animation frr the Our courses section
    // Animate heading and subheading
    gsap.from(".parent-div-for-the-ourcourses-heading > div", {
      scrollTrigger: {
        trigger: "#ourcourses",
        start: "top 80%",
      },
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.3,
      ease: "power4.out",
    });

    // Animate tabs
    gsap.from("#languageTabs li", {
      scrollTrigger: {
        trigger: "#ourcourses",
        start: "top 75%",
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "back.out(1.7)",
    });

    // Animate dropdown (mobile)
    gsap.from(".choose-your-language-dropdown", {
      scrollTrigger: {
        trigger: "#ourcourses",
        start: "top 75%",
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: 0.5,
      ease: "back.out(1.7)",
    });

    // Animate course cards container and cards when they appear
    gsap.from("#courseContainer", {
      scrollTrigger: {
        trigger: "#courseContainer",
        start: "top 85%",
      },
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power2.out",
    });

    gsap.from("#courseContainer > div", {
      scrollTrigger: {
        trigger: "#courseContainer",
        start: "top 85%",
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      delay: 0.3,
      ease: "back.out(1.7)",
    });

    // Animation for the section 4(Find out Why)
    // Animate the left image and background circle
    gsap.from(".section4", {
      scrollTrigger: {
        trigger: ".section4",
        start: "top 80%",
      },
      scale: 0,
      opacity: 1,
      duration: 1,
      ease: "back.out(1.7)",
    });

    gsap.from(".section4 img", {
      scrollTrigger: {
        trigger: ".section4",
        start: "top 80%",
      },
      x: -100,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      ease: "power4.out",
    });

    // Animate the right text content (heading + paragraph)
    gsap.from(
      ".section4 > .container > .row > .col-lg-6.d-flex > div:first-child > *",
      {
        scrollTrigger: {
          trigger: ".section4",
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        delay: 0.6,
        ease: "power2.out",
      }
    );

    // Animate each icon box with staggered fade & slide up
    gsap.from(".section4 .why-icon-box", {
      scrollTrigger: {
        trigger: ".section4",
        start: "top 80%",
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.25,
      delay: 1,
      ease: "back.out(1.7)",
    });

    // Animation for the Tuturial section
    // Animate heading and paragraph from below with fade-in and stagger
    gsap.from("#tutorial .parent-div-for-the-ourcourses-heading > div > *", {
      scrollTrigger: {
        trigger: "#tutorial",
        start: "top 80%",
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.25,
      ease: "power2.out",
    });

    // Animate the video thumbnail scaling up and fading in
    gsap.from("#tutorial .video-thumbnail", {
      scrollTrigger: {
        trigger: "#tutorial .video-thumbnail",
        start: "top 85%",
      },
      scale: 0.8,
      opacity: 0,
      duration: 1,
      ease: "back.out(1.7)",
      delay: 0.6,
    });

    // Add a subtle infinite pulse/bounce animation to the play button to grab attention
    gsap.to("#tutorial a > div", {
      scale: 1.1,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      duration: 1.2,
      delay: 1.5,
    });

    // Animation for the Testimonial section
    // Animate section heading and description
    gsap.from(
      "#testimonials .parent-div-for-the-ourcourses-heading > div > *",
      {
        scrollTrigger: {
          trigger: "#testimonials",
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.25,
        ease: "power2.out",
      }
    );

    // Animate testimonial slides as they enter viewport
    gsap.utils.toArray("#testimonials .swiper-slide").forEach((slide) => {
      gsap.from(slide, {
        scrollTrigger: {
          trigger: slide,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
      });
    });

    // Animation for the Footer section
    gsap.from("footer.footer-section", {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "footer.footer-section",
        start: "top 90%",
      },
    });

    gsap.from(
      [
        ".footer-section .col-md-3:first-child", // Logo & Social
        ".footer-section .col-md-2", // Quick Links
        ".footer-section .col-md-3:nth-child(3)", // Useful Links
        ".footer-section .col-md-4", // Subscribe
      ],
      {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.3,
        scrollTrigger: {
          trigger: "footer.footer-section",
          start: "top 90%",
        },
      }
    );
  }
});