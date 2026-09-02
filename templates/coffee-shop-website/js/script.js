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

// For the intersection overflow
// For to active the menu links
const sections = document.querySelectorAll("section");
const navLinks2 = document.querySelectorAll("#navLinks a");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks2.forEach((link) => {
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

window.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth >= 767.98) {
    // Navbar section
    // Animate only the navbar section
    gsap.from("nav", {
      duration: 1,
      y: -100, // slide down from top
      opacity: 0, // fade in
      ease: "power4.out",
    });

    // Animate logo & name
    gsap.from(".logo, .logo-name", {
      duration: 1,
      opacity: 0,
      x: -50, // slide from left
      delay: 0.5,
      stagger: 0.2,
      ease: "power3.out",
    });

    // Animate nav links
    gsap.from(".nav-links a", {
      duration: 0.8,
      opacity: 0,
      y: -30, // slide up
      delay: 0.8,
      stagger: 0.15, // each link comes one by one
      ease: "back.out(1.7)",
    });

    // Animate social icons
    gsap.from(".navbar-section .social-icons a", {
      duration: 0.8,
      opacity: 0,
      scale: 0.5, // zoom in effect
      delay: 1.5,
      stagger: 0.2,
      ease: "elastic.out(1, 0.5)",
    });

    // Home section
    // Animate whole section entry
    gsap.from("#home", {
      duration: 1,
      opacity: 0,
      y: 50, // fade up
      ease: "power3.out",
    });

    // Animate Hero Heading
    gsap.from("#home .hero-text h1", {
      duration: 1,
      opacity: 0,
      x: -100, // slide from left
      delay: 0.3,
      ease: "power3.out",
    });

    // Animate Images inside heading
    gsap.from("#home .hero-text h1 img", {
      duration: 0.8,
      opacity: 0,
      scale: 0.5, // pop in
      delay: 0.6,
      stagger: 0.2,
      ease: "back.out(1.7)",
    });

    // Animate Right Description
    gsap.from("#home .right-description", {
      duration: 1,
      opacity: 0,
      x: 100, // slide from right
      delay: 0.8,
      ease: "power3.out",
    });

    // Animate Button
    gsap.from("#home .right-description .custom-btn", {
      duration: 0.8,
      opacity: 0,
      y: 30,
      delay: 1.2,
      ease: "back.out(1.7)",
    });

    // Animate Video
    gsap.from("#home .hero-video video", {
      duration: 1,
      opacity: 0,
      scale: 0.9, // zoom in
      delay: 1.5,
      ease: "power2.out",
    });

    // Animate Coffee Beans Icons
    gsap.from("#home .hero-icons img", {
      duration: 1,
      opacity: 0,
      y: 30,
      delay: 2,
      ease: "elastic.out(1, 0.5)",
    });

    // Crafting Community with Coffee Section
    gsap.registerPlugin(ScrollTrigger);

    // Animate heading & span
    gsap.from(
      ".coffee-story .each-section-name, .coffee-story .each-section-heading",
      {
        scrollTrigger: {
          trigger: ".coffee-story",
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
      }
    );

    // Animate paragraphs
    gsap.from(".coffee-story .each-section-description", {
      scrollTrigger: {
        trigger: ".coffee-story",
        start: "top 75%",
        end: "bottom 70%",
        toggleActions: "play none none reverse",
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.15,
    });

    // Animate left image
    gsap.from(".coffee-story .coffee-image1 img", {
      scrollTrigger: {
        trigger: ".coffee-story",
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
      x: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    // Animate right image
    gsap.from(".coffee-story .coffee-image2 img", {
      scrollTrigger: {
        trigger: ".coffee-story",
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
      x: 100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    // Animate coffee beans decor
    gsap.fromTo(
      ".coffee-story .coffee-beans-decor img",
      {
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: ".coffee-story",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "back.out(1.7)",
      }
    );

    // Menu Section
    // Title marquee effect
    gsap.to(".menu-section .scroll-content", {
      xPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: ".menu-section",
        start: "top 80%",
        end: "bottom top",
        scrub: true,
      },
    });

    // Animate each menu item
    gsap.from(".menu-section .menu-item", {
      scrollTrigger: {
        trigger: ".menu-section",
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.2,
    });

    // Animate button
    gsap.from(".menu-section .custom-btn", {
      scrollTrigger: {
        trigger: ".menu-section",
        start: "top 65%",
        toggleActions: "play none none reverse",
      },
      scale: 0.5,
      opacity: 0,
      duration: 0.6,
      ease: "back.out(1.7)",
    });

    // Offer Section
    // Cup image animation
    gsap.from(".offer-section .top-cup-of-coffee img", {
      scrollTrigger: {
        trigger: ".offer-section",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    // Left column text
    gsap.from(".offer-section .offer-text", {
      scrollTrigger: {
        trigger: ".offer-section",
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
      x: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    // Right column cards
    gsap.from(".offer-section .right-column-cards .offer-card", {
      scrollTrigger: {
        trigger: ".offer-section",
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
      y: 80,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.25,
    });

    // Button animation
    gsap.from(".offer-section .custom-btn", {
      scrollTrigger: {
        trigger: ".offer-section",
        start: "top 65%",
        toggleActions: "play none none reverse",
      },
      scale: 0.5,
      opacity: 0,
      duration: 0.7,
      ease: "back.out(1.7)",
    });

    // Team Section
    // Animate intro text
    gsap.from(".team-section .team-intro", {
      scrollTrigger: {
        trigger: ".team-section",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      x: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    // Animate team cards
    gsap.from(".team-section .team-card", {
      scrollTrigger: {
        trigger: ".team-section",
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
      y: 80,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.25,
    });

    // Animate images inside team cards
    gsap.from(".team-section .team-card img", {
      scrollTrigger: {
        trigger: ".team-section",
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
      stagger: 0.25,
    });

    // Testimonial Section
    // Partner logos
    gsap.from(".partners-testimonial .logo-item", {
      scrollTrigger: {
        trigger: ".partners-testimonial",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.15,
    });

    // Partners title
    gsap.from(".partners-testimonial .partners-title", {
      scrollTrigger: {
        trigger: ".partners-testimonial",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      x: 80,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    // Testimonial text
    gsap.from(".partners-testimonial .testimonial-text", {
      scrollTrigger: {
        trigger: ".partners-testimonial",
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
      x: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    // Testimonial image
    gsap.from(".partners-testimonial .testimonial-media img", {
      scrollTrigger: {
        trigger: ".partners-testimonial",
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
      x: 100,
      scale: 0.9,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    // Stars animation
    gsap.from(".partners-testimonial .stars i", {
      scrollTrigger: {
        trigger: ".partners-testimonial",
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
      scale: 0,
      opacity: 0,
      duration: 0.4,
      ease: "back.out(2)",
      stagger: 0.1,
    });

    // Office location section
    // Heading animation
    gsap.from(".office-locations .section-title h2", {
      scrollTrigger: {
        trigger: ".office-locations",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      y: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    // Office rows
    gsap.from(".office-locations .location-row", {
      scrollTrigger: {
        trigger: ".office-locations",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      y: 50,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.25,
    });

    // Beans image
    gsap.from(".office-locations .beans-media img", {
      scrollTrigger: {
        trigger: ".office-locations",
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
      y: 60,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
    });

    // Phone number
    gsap.from(".office-locations .phone-number h2", {
      scrollTrigger: {
        trigger: ".office-locations",
        start: "top 65%",
        toggleActions: "play none none reverse",
      },
      scale: 0.5,
      opacity: 0,
      duration: 1,
      ease: "back.out(2)",
    });

    // Footer Section
    // Footer about/logo
    gsap.from(".site-footer .footer-about", {
      scrollTrigger: {
        trigger: ".site-footer",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    // Contact, Links, Social (staggered)
    gsap.from(
      ".site-footer .footer-contact, .site-footer .footer-links, .site-footer .footer-social",
      {
        scrollTrigger: {
          trigger: ".site-footer",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.3,
      }
    );

    // Footer bottom (copyright + credits)
    gsap.from(".site-footer .footer-bottom", {
      scrollTrigger: {
        trigger: ".site-footer",
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });
  }
});
