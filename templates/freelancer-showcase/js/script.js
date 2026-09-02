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
    // register plugin
    gsap.registerPlugin(ScrollTrigger);

    // Timeline for navbar
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Navbar container fades down
    tl.from(".navbar-section .container", {
      y: -80,
      opacity: 0,
      duration: 0.8,
    });

    // Logo
    tl.from(
      ".navbar-section .logo",
      {
        y: -40,
        opacity: 0,
        duration: 0.6,
      },
      "-=0.5"
    );

    // Menu links
    tl.from(
      ".navbar-section .nav-links .menu-link",
      {
        y: -20,
        opacity: 0,
        stagger: 0.15,
        duration: 0.5,
      },
      "-=0.3"
    );

    // Contact button (desktop)
    tl.fromTo(
      ".navbar-section .social-icons .btn-custom",
      {
        scale: 0.7,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
      },
      "-=0.4"
    );

    // Hamburger (mobile)
    tl.from(
      ".navbar-section .hamburger",
      {
        opacity: 0,
        scale: 0.7,
        duration: 0.4,
      },
      "-=0.3"
    );

    // Gsap animation for the hero section WITH ScrollTrigger
    const tlHero = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: {
        trigger: ".hero",
        start: "top 75%", // when top of .hero reaches 75% down the viewport
        end: "bottom 25%", // optional end
        toggleActions: "play none none none", // play only once
        // markers: true, // uncomment for debugging
      },
    });

    // Left side hero text
    tlHero.fromTo(
      ".hero .hero-text .hero-heading",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 }
    );

    tlHero.fromTo(
      ".hero .hero-text p",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      "-=0.4"
    );

    tlHero.fromTo(
      ".hero .hero-text .btn-custom",
      { scale: 0.7, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5 },
      "-=0.3"
    );

    // Right side profile image
    tlHero.fromTo(
      ".hero .hero-image .profile",
      { x: 80, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.9 },
      "-=0.6"
    );

    // Floating elements (emoji, rings, star, badges)
    // Emoji image entrance
    tlHero.fromTo(
      ".hero .hero-image .emoji-image",
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      "-=0.4"
    );

    // Floating yoyo effect (runs after entrance)
    gsap.to(".hero .hero-image .emoji-image", {
      y: -15, // how high it floats
      duration: 2, // speed of float
      repeat: -1, // infinite
      yoyo: true, // goes up & down
      ease: "sine.inOut", // smooth natural floating
      delay: 1, // wait until entrance finishes
    });

    tlHero.fromTo(
      ".hero .hero-image .ring",
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        stagger: 0.15,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
      },
      "-=0.3"
    );

    tlHero.fromTo(
      ".hero .hero-image .star",
      { rotation: -90, opacity: 0, scale: 0.5 },
      {
        rotation: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        repeat: -1,
        yoyo: true,
      },
      "-=0.3"
    );

    tlHero.fromTo(
      ".hero .hero-image .badge",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 0.6 },
      "-=0.2"
    );

    // Entrance (badge pops in naturally)
    gsap.fromTo(
      ".badge.uiux",
      { y: 40, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" }
    );

    // Continuous elegant float + wobble
    gsap.to(".badge.uiux", {
      y: "-=10", // float up a little
      rotation: 3, // soft wobble tilt
      duration: 3.5, // slow & smooth
      repeat: -1, // infinite
      yoyo: true, // reverse back
      ease: "sine.inOut", // natural flow
      delay: 1, // starts after entrance
    });

    // Entrance animation (badge pops in)
    gsap.fromTo(
      ".badge.shopify",
      { y: 40, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: "back.out(1.7)" }
    );

    // Continuous floating animation for the whole badge
    gsap.to(".badge.shopify", {
      y: "-=12", // gentle float
      duration: 3, // slow
      repeat: -1, // infinite
      yoyo: true, // back and forth
      ease: "sine.inOut",
      delay: 1,
    });

    // Shopify image pulse inside circle
    gsap.to(".badge.shopify .image-div img", {
      scale: 1.05,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1.5,
    });

    // Text strips shimmer effect
    gsap.to(".badge.shopify .text-strip", {
      x: 6, // small horizontal shift
      opacity: 0.6, // light shimmer
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      stagger: 0.2, // animate strips one by one
      ease: "sine.inOut",
      delay: 2,
    });

    // Brand logos
    tlHero.fromTo(
      ".hero .brand-logos img",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.15, duration: 0.5 },
      "-=0.3"
    );

    // GSAP animation for the services section with ScrollTrigger
    const tlServices = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: {
        trigger: ".services",
        start: "top 75%", // trigger when section top hits 75% of viewport
        end: "bottom 25%", // optional
        toggleActions: "play none none none", // play once
        // markers: true, // uncomment for debugging
      },
    });

    // Left-side cards stagger in
    tlServices.fromTo(
      ".services .left-side-cards .service-card-border",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.25, duration: 0.6 }
    );

    // Circle with arrow pops in
    tlServices.fromTo(
      ".services .left-side-cards .circle",
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6 },
      "-=0.3"
    );

    // Right-side heading
    tlServices.fromTo(
      ".services .right-side-text .each-section-heading",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 },
      "-=0.2"
    );

    // Right-side paragraphs
    tlServices.fromTo(
      ".services .right-side-text .each-section-description",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 0.5 },
      "-=0.3"
    );

    // Right-side button
    tlServices.fromTo(
      ".services .right-side-text .btn-custom",
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5 },
      "-=0.2"
    );

    // GSAP animation for the works section with ScrollTrigger
    const tlWorks = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: {
        trigger: ".works-section",
        start: "top 75%", // animation starts when section enters 75% of viewport
        end: "bottom 25%", // optional
        toggleActions: "play none none none", // play once
        // markers: true, // enable for debugging
      },
    });

    // Left-side content (heading & description)
    tlWorks.fromTo(
      ".works-section .works-content .each-section-heading",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 }
    );

    tlWorks.fromTo(
      ".works-section .works-content .each-section-description",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      "-=0.3"
    );

    // Right-side main image
    tlWorks.fromTo(
      ".works-section .right-image .works-image img",
      { x: 60, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.9 },
      "-=0.5"
    );

    // Rings pop in with stagger
    tlWorks.fromTo(
      ".works-section .right-image .ring",
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        stagger: 0.2,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
      },
      "-=0.3"
    );

    // Floating card 1 entrance
    tlWorks.fromTo(
      ".works-section .right-image .floating-card1",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
      "-=0.2"
    );

    // Floating card 2 entrance
    tlWorks.fromTo(
      ".works-section .right-image .floating-card2",
      { scale: 0.5, opacity: 0, rotation: -45 },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
      },
      "-=0.3"
    );

    // Floating yoyo loop for card 1 (gentle up & down float)
    gsap.to(".works-section .right-image .floating-card1", {
      y: "+=15", // float distance
      duration: 2.5, // speed
      repeat: -1, // infinite
      yoyo: true, // go back and forth
      ease: "sine.inOut", // smooth easing
      delay: 1.2, // wait until entrance finishes
    });

    // Floating yoyo loop for card 2 (slight rotation + float)
    gsap.to(".works-section .right-image .floating-card2", {
      y: "-=12", // move upward slightly
      rotation: 5, // gentle tilt
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1.4,
    });

    // Bottom list items
    tlWorks.fromTo(
      ".works-section .bottom-div ol li",
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, stagger: 0.2, duration: 0.5 },
      "-=0.2"
    );

    // GSAP animation for the Business Section with ScrollTrigger
    const tlBusiness = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: {
        trigger: ".business-section",
        start: "top 75%", // when section top hits 75% of viewport
        end: "bottom 25%", // optional
        toggleActions: "play none none none", // play once
        // markers: true, // uncomment for debugging
      },
    });

    // Top dark card
    tlBusiness.fromTo(
      ".business-section .graphic-wrapper .dark-card",
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 }
    );

    // Chart bars (scale up from bottom)
    tlBusiness.fromTo(
      ".business-section .graphic-wrapper .chart-bars .bar",
      { scaleY: 0, transformOrigin: "bottom", opacity: 0 },
      { scaleY: 1, opacity: 1, stagger: 0.2, duration: 0.7 },
      "-=0.4"
    );

    // Bottom light card
    tlBusiness.fromTo(
      ".business-section .graphic-wrapper .light-card",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.3"
    );

    // Right-side heading
    tlBusiness.fromTo(
      ".business-section .text-content .each-section-heading",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 },
      "-=0.2"
    );

    // Right-side paragraphs
    tlBusiness.fromTo(
      ".business-section .text-content .each-section-description",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 0.5 },
      "-=0.3"
    );

    // Right-side button
    tlBusiness.fromTo(
      ".business-section .text-content .btn-custom",
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5 },
      "-=0.2"
    );

    // GSAP animation for the Recent Projects with ScrollTrigger
    const tlProjects = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: {
        trigger: ".recent-project-section",
        start: "top 75%", // when top of section hits 75% of viewport
        end: "bottom 25%", // optional
        toggleActions: "play none none none", // play once
        // markers: true, // uncomment for debugging
      },
    });

    // Section heading
    tlProjects.fromTo(
      ".recent-project-section .each-section-heading",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 }
    );

    // Project cards stagger in
    tlProjects.fromTo(
      ".recent-project-section .project-card",
      { y: 50, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, stagger: 0.2, duration: 0.6 },
      "-=0.3"
    );

    // GSAP animation for the Get Started Section/footer with ScrollTrigger
    const tlGetStarted = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: {
        trigger: ".get-started-section",
        start: "top 75%", // when top of section hits 75% of viewport height
        end: "bottom 25%", // optional
        toggleActions: "play none none none", // play once
        // markers: true, // uncomment to debug
      },
    });

    // Heading
    tlGetStarted.fromTo(
      ".get-started-section .each-section-heading",
      { y: 40, opacity: 0, scale: 0.98 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8 }
    );

    // Subtext
    tlGetStarted.fromTo(
      ".get-started-section .sub-text",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      "-=0.4"
    );

    // Message button
    tlGetStarted.fromTo(
      ".get-started-section .message-btn",
      { x: 30, opacity: 0, scale: 0.9 },
      { x: 0, opacity: 1, scale: 1, duration: 0.6 },
      "-=0.45"
    );

    // Button parts (shoot-mess + yellow-box-age)
    tlGetStarted.fromTo(
      ".get-started-section .message-btn .shoot-mess",
      { y: 6, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.35 },
      "-=0.25"
    );
    tlGetStarted.fromTo(
      ".get-started-section .message-btn .yellow-box-age",
      { scale: 0.6, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.35 },
      "-=0.32"
    );

    // Footer brand name
    tlGetStarted.fromTo(
      ".get-started-section .brand-name",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 },
      "-=0.3"
    );

    // Footer nav links
    tlGetStarted.fromTo(
      ".get-started-section .nav-links li a",
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.12, duration: 0.45 },
      "-=0.35"
    );
  }
});
