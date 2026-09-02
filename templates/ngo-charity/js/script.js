const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Close nav when any link inside navLinks is clicked
document.querySelectorAll("#navLinks a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

// Close nav when clicking outside of it
document.addEventListener("click", (event) => {
  if (!navLinks.contains(event.target) && !hamburger.contains(event.target)) {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  }
});

// for the nav link to active when we passes through the specific section
const links = document.querySelectorAll(".nav-links .menu-link");

links.forEach((link) => {
  link.addEventListener("click", () => {
    // remove active from all
    links.forEach((l) => l.classList.remove("active"));
    // add active to clicked one
    link.classList.add("active");
  });
});

// Get all donation buttons
const donationButtons = document.querySelectorAll(".donation-btn");

donationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // remove active class from all buttons
    donationButtons.forEach((btn) => btn.classList.remove("active"));

    // add active class to the clicked one
    button.classList.add("active");
  });
});

// For the floating button
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

window.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth >= 767.98) {
    // For the intersection overflow
    // For to active the menu links
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("#navLinks a");
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

    // Navbar section animation
    // Animate nav when page loads
    gsap.from("nav", {
      y: -100, // slide down from top
      opacity: 0, // start invisible
      duration: 1, // animation duration
      ease: "power4.out",
    });

    // Animate logo
    gsap.from("nav .logo", {
      x: -100,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      ease: "power3.out",
    });

    // Animate nav links staggered
    gsap.from("nav .nav-links a", {
      y: -30,
      opacity: 0,
      duration: 0.8,
      delay: 0.6,
      stagger: 0.1,
      ease: "back.out(1.7)",
    });

    // Animate social icons
    gsap.from("nav .social-icons a", {
      scale: 0,
      opacity: 0,
      duration: 0.6,
      delay: 1.2,
      stagger: 0.2,
      ease: "elastic.out(1, 0.5)",
    });

    // Animate Donate Now button
    gsap.from("nav .donate-now-btn", {
      scale: 0.5,
      opacity: 0,
      duration: 0.6,
      delay: 1.5,
      ease: "back.out(2)",
    });

    // Hero section
    // Animate hero section background images
    gsap.from(".hero-section .decor-image1 img", {
      x: -200,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
    });

    gsap.from(".hero-section .decor-image2 img", {
      x: 200,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
    });

    // Animate heading
    gsap.from(".hero-section h1", {
      y: 80,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      ease: "power4.out",
    });

    // Animate subtext
    gsap.from(".hero-section p", {
      y: 40,
      opacity: 0,
      duration: 1,
      delay: 0.6,
      ease: "power3.out",
    });

    // Animate buttons staggered
    gsap.from(".hero-section .hero-buttons a", {
      scale: 0.7,
      opacity: 0,
      duration: 0.8,
      delay: 0.9,
      stagger: 0.2,
      ease: "back.out(1.7)",
    });

    // Animate stats avatars
    gsap.from(".hero-section .avatars img", {
      x: -30,
      opacity: 0,
      duration: 0.6,
      delay: 1.4,
      stagger: 0.2,
      ease: "back.out(1.7)",
    });

    // Animate stats text
    gsap.from(".hero-section .hero-stats span", {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 2,
      ease: "power2.out",
    });

    // Image gallery section
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".image-gallery .gallery-item img", {
      scrollTrigger: {
        trigger: ".image-gallery",
        start: "top 80%", // when section enters viewport
        end: "bottom 60%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      scale: 0.8,
      y: 50,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    });

    // Sponsors section
    // Heading animation
    gsap.fromTo(
      ".sponsors-section .sponsors-heading",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".sponsors-section .sponsors-heading",
          start: "top 85%",
          once: true,
        },
      }
    );

    // Logos staggered fade/scale
    gsap.fromTo(
      ".sponsors-section .sponsor-logo",
      { opacity: 0, scale: 0.8, y: 40 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".sponsors-section .row",
          start: "top 85%",
          once: true,
        },
      }
    );

    // Decorative bulb image floating in
    gsap.fromTo(
      ".sponsors-section .blub-image img",
      { y: -60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".sponsors-section",
          start: "top 90%",
          once: true,
        },
      }
    );

    // Empowering Section
    // Left Image Animation
    gsap.from(".empowering-section .hero-image img", {
      scrollTrigger: {
        trigger: ".empowering-section",
        start: "top 80%",
        toggleActions: "play none none none",
      },
      x: -100,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
    });

    // Right Content Animation (staggered)
    gsap.from(".empowering-section .hero-content > *", {
      scrollTrigger: {
        trigger: ".empowering-section",
        start: "top 80%",
        toggleActions: "play none none none",
      },
      x: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    });

    // Together forward
    gsap.to(".scroll-container .scroll-content", {
      xPercent: -50, // move left
      repeat: -1, // infinite
      duration: 15, // speed of the loop
      ease: "linear", // smooth, no easing
    });

    // Initiative section
    // Section header
    gsap.fromTo(
      ".initiatives-section .section-header",
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".initiatives-section .section-header",
          start: "top 85%",
          once: true,
        },
      }
    );

    // Initiative cards stagger
    gsap.fromTo(
      ".initiatives-section .initiative-card",
      { y: 80, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        stagger: 0.3,
        scrollTrigger: {
          trigger: ".initiatives-section .row.mt-5",
          start: "top 80%",
          once: true,
        },
      }
    );

    // Stats fade-in + number lift
    gsap.fromTo(
      ".initiatives-section .stats .col-md-3",
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".initiatives-section .stats",
          start: "top 85%",
          once: true,
        },
      }
    );

    // Decorative images floating in
    gsap.fromTo(
      ".initiatives-section .first-decor img",
      { x: -80, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".initiatives-section",
          start: "top 90%",
          once: true,
        },
      }
    );
    gsap.fromTo(
      ".initiatives-section .second-decor img",
      { y: -80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".initiatives-section",
          start: "top 90%",
          once: true,
        },
      }
    );
    gsap.fromTo(
      ".initiatives-section .third-decor img",
      { scale: 0.5, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".initiatives-section",
          start: "top 90%",
          once: true,
        },
      }
    );
    gsap.fromTo(
      ".initiatives-section .fourth-decor img",
      { x: 80, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".initiatives-section",
          start: "top 90%",
          once: true,
        },
      }
    );

    // Testimonial section
    gsap.from(".testimonial-section", {
      opacity: 0,
      y: 80,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".testimonial-section",
        start: "top 85%",
      },
    });

    // Stars pop-in
    gsap.from(".testimonial-section .stars i", {
      opacity: 0,
      scale: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".testimonial-section",
        start: "top 80%",
      },
    });

    // Quote text
    gsap.from(".testimonial-section .quote", {
      opacity: 0,
      x: -60,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".testimonial-section",
        start: "top 75%",
      },
    });

    // Author info
    gsap.from(".testimonial-section .author", {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".testimonial-section",
        start: "top 70%",
      },
    });

    // Right image
    gsap.from(".testimonial-section .testimonial-image img", {
      opacity: 0,
      x: 80,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".testimonial-section",
        start: "top 75%",
      },
    });

    // Donation section
    // Section fade-in
    gsap.fromTo(
      ".donation-section",
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".donation-section",
          start: "top 85%",
          once: true,
        },
      }
    );

    // Heading
    gsap.fromTo(
      ".donation-section .donation-header",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".donation-section .donation-header",
          start: "top 80%",
          once: true,
        },
      }
    );

    // Donation card
    gsap.fromTo(
      ".donation-section .donation-card",
      { opacity: 0, scale: 0.85, y: 60 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".donation-section .donation-card",
          start: "top 80%",
          once: true,
        },
      }
    );

    // Buttons stagger
    gsap.fromTo(
      ".donation-section .donation-btn",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: ".donation-section .donation-card",
          start: "top 75%",
          once: true,
        },
      }
    );

    // Decorative images
    gsap.fromTo(
      ".donation-section .decor-image1",
      { x: -80, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".donation-section",
          start: "top 90%",
          once: true,
        },
      }
    );

    gsap.fromTo(
      ".donation-section .decor-image2",
      { y: -80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".donation-section",
          start: "top 90%",
          once: true,
        },
      }
    );

    gsap.fromTo(
      ".donation-section .decor-image3",
      { x: 80, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".donation-section",
          start: "top 90%",
          once: true,
        },
      }
    );

    // Join section
    // Left background side
    gsap.fromTo(
      ".join-section .col-lg-6:first-child",
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".join-section",
          start: "top 85%",
          once: true,
        },
      }
    );

    // Right text content
    gsap.fromTo(
      ".join-section .white-text-div",
      { x: 100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".join-section",
          start: "top 85%",
          once: true,
        },
      }
    );

    // Hero card fade + lift
    gsap.fromTo(
      ".join-section .hero-card",
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".join-section .hero-card",
          start: "top 80%",
          once: true,
        },
      }
    );

    // Button emphasis
    gsap.fromTo(
      ".join-section .hero-btn",
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        delay: 0.4,
        ease: "elastic.out(1, 0.6)",
        scrollTrigger: {
          trigger: ".join-section .hero-btn",
          start: "top 80%",
          once: true,
        },
      }
    );

    // Footer section
    // Whole footer
    gsap.from(".footer", {
      opacity: 0,
      y: 100,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".footer",
        start: "top 85%",
      },
    });

    // Logo & About
    gsap.from(".footer .footer-logo", {
      opacity: 0,
      x: -50,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".footer",
        start: "top 80%",
      },
    });

    // Office Info
    gsap.from(".footer .office-info", {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".footer",
        start: "top 75%",
      },
    });

    // Links + Follow Us
    gsap.from(".footer .links-info li, .footer .follow-us-links li", {
      opacity: 0,
      x: 40,
      duration: 0.6,
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".footer",
        start: "top 70%",
      },
    });

    // Website Company Name
    gsap.from(".footer .website-company-name span", {
      opacity: 0,
      scale: 0.7,
      duration: 0.8,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".footer",
        start: "top 65%",
      },
    });
  }
});
