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

// For the intersection overflow
// For to active the menu links
window.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth >= 768) {
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
        threshold: 0.4,
      }
    );
    sections.forEach((section) => observer.observe(section));
  }
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
      navbarSection.classList.remove("on-click-hamburger-button-navbar"); // 🔻 Remove background
      navbarSection.classList.add("navbar-color"); // 🔺 Add background
    } else {
      bsCollapse.show();
      navbarSection.classList.add("on-click-hamburger-button-navbar"); // 🔺 Add background
      navbarSection.classList.remove("navbar-color"); // 🔻 Remove background
    }
  });

  // Close on link click
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (menu.classList.contains("show")) {
        bsCollapse.hide();
        hamburger.classList.remove("is-active");
        navbarSection.classList.remove("on-click-hamburger-button-navbar"); // 🔻 Remove background
        navbarSection.classList.add("navbar-color"); // 🔺 Add background
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
      navbarSection.classList.remove("on-click-hamburger-button-navbar"); // 🔻 Remove background
      navbarSection.classList.add("navbar-color"); // 🔺 Add background
    }
  });
});

// For the testimonials section
const swiper = new Swiper(".testimonial-swiper", {
  loop: true,
  spaceBetween: 24,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    576: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 3,
    },
  },
});

// Animation starts here
window.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth >= 991.98) {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Animation for the floating button
    gsap.to(".floating-btn", {
      scrollTrigger: {
        trigger: "body",
        start: "top top+=100", // Trigger after 100px scroll
        toggleActions: "play none none reverse",
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    });
    // Bounce on hover
    const btn = document.querySelector(".floating-btn");
    btn.addEventListener("mouseenter", () => {
      gsap.to(btn, { scale: 1.1, duration: 0.2, ease: "power1.out" });
    });
    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, { scale: 1, duration: 0.2, ease: "power1.out" });
    });

    /////////////// Animation for the navbar section
    const navbarTimeline = gsap.timeline();

    // Animate the whole navbar
    navbarTimeline.from(".navbar-animate", {
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });

    // Animate logo and hamburger icon
    navbarTimeline.from(
      [".navbar-animate .navbar-brand", ".navbar-animate .js-hamburger"],
      {
        opacity: 0,
        x: -20,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1,
      },
      "-=0.5" // start before previous animation ends
    );

    // Animate nav links one by one
    navbarTimeline.from(
      ".navbar-animate .nav-link",
      {
        opacity: 0,
        y: 15,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.07,
      },
      "-=0.4"
    );

    /////////////// Animation for the Hero section
    const heroTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-animate",
        start: "top 75%", // when top of section hits 75% of viewport
        toggleActions: "play none none none",
      },
    });

    // Animate left content
    heroTimeline
      .from(".hero-animate .each-section-name", {
        opacity: 0,
        y: -20,
        duration: 0.6,
        ease: "power2.out",
      })
      .from(
        ".hero-animate .hero-section-heading",
        {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.3"
      )
      .from(
        ".hero-animate .each-section-para",
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.3"
      );

    // Animate right image section
    heroTimeline
      .from(
        ".hero-animate .img-container",
        {
          opacity: 0,
          x: 50,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.6"
      )
      .from(
        ".hero-animate .bi-stars-of-hero-section",
        {
          opacity: 0,
          scale: 0,
          rotate: 45,
          duration: 0.6,
          ease: "elastic.out(1, 0.5)",
        },
        "-=0.6"
      )
      .from(
        ".hero-animate .bg-shape",
        {
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.5"
      );

    /////////////// Animation for the Number section
    // Fade-up + stagger each stat card
    gsap.from(".stats-section .col-md-3", {
      scrollTrigger: {
        trigger: ".stats-section",
        start: "top 80%",
        toggleActions: "play none none none",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out",
    });

    // Number count-up animation
    const counters = document.querySelectorAll(".stats-section h2");

    counters.forEach((counter) => {
      const finalText = counter.textContent.trim();
      const hasPercent = finalText.includes("%");
      const hasK = finalText.toLowerCase().includes("k");
      const numberOnly = parseInt(finalText.replace(/[^\d]/g, ""), 10);

      ScrollTrigger.create({
        trigger: counter,
        start: "top 90%",
        once: true,
        onEnter: () => {
          const obj = { value: 0 };
          gsap.to(obj, {
            value: numberOnly,
            duration: 2,
            ease: "power1.out",
            onUpdate: () => {
              let suffix = "";
              if (hasPercent) suffix = " %";
              else if (hasK) suffix = "K +";
              else suffix = " +";

              counter.textContent = `${Math.round(obj.value)}${suffix}`;
            },
          });
        },
      });
    });

    /////////////// Animation for the About Us section
    const aboutTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".about-animate",
        start: "top 80%", // when section top hits 80% viewport height
        toggleActions: "play none none none",
      },
    });

    // Animate Left Image
    aboutTimeline.from(".about-animate .why-choose-us-image-div", {
      opacity: 0,
      x: -60,
      duration: 1,
      ease: "power3.out",
    });

    // Animate Right Content
    aboutTimeline.from(
      ".about-animate .each-section-name",
      {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=0.6"
    );

    aboutTimeline.from(
      ".about-animate .each-section-heading",
      {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.4"
    );

    aboutTimeline.from(
      ".about-animate .aboutus-para",
      {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.2,
      },
      "-=0.5"
    );

    aboutTimeline.from(
      ".about-animate .about-section-stats-section .div-150, .about-animate .about-section-stats-section .div-300",
      {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        ease: "back.out(1.7)",
        stagger: 0.2,
      },
      "-=0.4"
    );

    /////////////// Animation for the Our Process section
    const tlProcess = gsap.timeline({
      scrollTrigger: {
        trigger: ".process-section",
        start: "top 70%",
      },
    });

    // Animate heading
    tlProcess.from(
      ".process-section .each-section-name, .process-section .each-section-heading",
      {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.2,
      }
    );

    // Animate each step + divider one by one
    const steps = document.querySelectorAll(".process-section .step");
    const dividers = document.querySelectorAll(
      ".process-section .divider-line"
    );

    // Animate step → divider → step → divider → ...
    steps.forEach((step, i) => {
      tlProcess.from(step, {
        opacity: 0,
        y: 50,
        duration: 0.6,
        ease: "power2.out",
      });

      if (dividers[i]) {
        tlProcess.from(dividers[i], {
          scaleX: 0,
          opacity: 0,
          transformOrigin: "left center",
          duration: 0.4,
          ease: "power1.out",
        });
      }
    });

    /////////////// Animation for the Our Services section
    const servicesTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".services-animate",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // Animate heading and paragraph
    servicesTimeline.from(".services-animate .each-section-name", {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: "power2.out",
    });

    servicesTimeline.from(
      ".services-animate .each-section-heading",
      {
        opacity: 0,
        y: 30,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=0.3"
    );

    servicesTimeline.from(
      ".services-animate .each-section-para",
      {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=0.4"
    );

    // Animate service cards one by one
    servicesTimeline.from(
      ".services-animate .service-item",
      {
        opacity: 0,
        y: 40,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.2,
      },
      "-=0.2"
    );
    /////////////// Animation for the Why Choose Us section
    const whyChooseTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".why-choose-animate",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // Animate left image
    whyChooseTimeline.from(".why-choose-animate .why-choose-us-image-div", {
      x: -100,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });

    // Animate section title and heading
    whyChooseTimeline.from(
      ".why-choose-animate .each-section-name",
      {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: "power2.out",
      },
      "-=0.5"
    );

    whyChooseTimeline.from(
      ".why-choose-animate .each-section-heading",
      {
        opacity: 0,
        y: 30,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=0.4"
    );

    whyChooseTimeline.from(
      ".why-choose-animate .each-section-para",
      {
        opacity: 0,
        y: 20,
        duration: 0.4,
        ease: "power2.out",
      },
      "-=0.4"
    );

    // Animate feature cards one by one
    whyChooseTimeline.from(
      ".why-choose-animate .feature-card",
      {
        opacity: 0,
        y: 40,
        duration: 0.5,
        stagger: 0.2,
        ease: "power2.out",
      },
      "-=0.3"
    );

    /////////////// Animation for the Pricing Table  section
    // Animate the entire pricing section container
    gsap.from(
      "#pricing .each-section-name, #pricing .each-section-heading, #pricing p.text-muted",
      {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#pricing",
          start: "top 80%", // when top of section hits 80% of viewport
          toggleActions: "play none none none",
        },
      }
    );

    // Animate the pricing cards with a stagger
    gsap.from("#pricing .plans-card", {
      opacity: 0,
      y: 80,
      duration: 1,
      ease: "power3.out",
      stagger: 0.3,
      scrollTrigger: {
        trigger: "#pricing",
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });

    /////////////// Animation for the FAQs  section
    // Animate Accordion Items
    gsap.from(".section8 .accordion-item", {
      scrollTrigger: {
        trigger: ".section8",
        start: "top 80%",
      },
      y: 30,
      opacity: 0,
      duration: 0.7,
      ease: "power2.out",
      stagger: 0.2,
    });

    /////////////// Animation for the Testimonial section
    const testimonialTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".testimonial-section",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    testimonialTimeline
      .from(
        ".testimonial-section p.text-muted",
        {
          y: 30,
          opacity: 0,
          duration: 0.5,
        },
        "-=0.3"
      )
      .from(
        ".testimonial-swiper .swiper-slide",
        {
          scale: 0.8,
          opacity: 0,
          stagger: 0.2,
          duration: 0.6,
          ease: "back.out(1.4)",
        },
        "-=0.3"
      )
      .from(
        ".testimonial-section .trusted-by-div, .testimonial-section .review-star, .testimonial-section .fw-semibold",
        {
          opacity: 0,
          y: 30,
          stagger: 0.1,
          duration: 0.4,
        },
        "-=0.4"
      );

    /////////////// Animation for the Contact Us section
    const contactTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".contactus-outer",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // Left Section animation
    contactTimeline
      .from(".contactus-outer .each-section-name", {
        x: -50,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      })
      .from(
        ".contactus-outer .contactus-section-heading",
        {
          x: -50,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      )
      .from(
        ".contactus-outer .each-section-para",
        {
          x: -30,
          opacity: 0,
          duration: 0.5,
        },
        "-=0.3"
      )
      .from(
        ".contactus-outer .contact-info li",
        {
          x: -30,
          opacity: 0,
          stagger: 0.2,
          duration: 0.4,
        },
        "-=0.4"
      );

    /////////////// Animation for the Footer section
    const footerTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".footer-outer",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // Animate footer columns (logo, nav, services, contact)
    footerTimeline.from(".footer-outer .col-md-3", {
      y: 50,
      opacity: 0,
      stagger: 0.3,
      duration: 0.8,
      ease: "power2.out",
    });

    // Animate bottom bar text
    footerTimeline.from(
      ".footer-outer .bottom-bar div",
      {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.out",
      },
      "-=0.5"
    );
  }
});
