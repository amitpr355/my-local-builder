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

var swiper = new Swiper(".latestNewsSwiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  grabCursor: true,
  simulateTouch: true,
  touchRatio: 1,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
    dynamicMainBullets: 5, // ✅ Maximum of 5 bullets
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 2,
    },
    1400: {
      slidesPerView: 4,
    },
  },
});
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  grabCursor: true,
  simulateTouch: true,
  touchRatio: 1,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
    dynamicMainBullets: 5, // ✅ Maximum of 5 bullets
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 2,
    },
    1400: {
      slidesPerView: 4,
    },
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

    ////////////////////////// GSAP animation for the navbar
    const navbar = document.querySelector("#navbarSection");
    const navLinks2 = navbar.querySelectorAll(".nav-link");
    const logo = navbar.querySelector(".navbar-brand-name");
    const buttons = navbar.querySelectorAll(".btn-custom");

    gsap.set(navbar, { y: -100, opacity: 0 });
    gsap.set([logo, ...navLinks2, ...buttons], { opacity: 0, y: -20 });

    // Main navbar animation
    gsap
      .timeline()
      .to(navbar, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      })
      .to(
        logo,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
        },
        "-=0.4"
      )
      .to(
        navLinks2,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.3"
      )
      .to(
        buttons,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "power2.out",
        },
        "-=0.4"
      );

    ///////////////// GSAP animation for the Hero section
    gsap.set(".hero-section h1", { opacity: 0, y: 50 });
    gsap.set(".hero-section p", { opacity: 0, y: 50 });
    gsap.set(".hero-section .start-collaborating", { opacity: 0, y: 50 });
    gsap.set(".hero-section .video-thumb", { opacity: 0, y: 50 });

    gsap
      .timeline({ delay: 0.3 })
      .to(
        ".hero-section h1",
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.3"
      )
      .to(
        ".hero-section p",
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      )
      .to(
        ".hero-section .start-collaborating",
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      )
      .to(
        ".hero-section .video-thumb",
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.5"
      );

    ///////////////// GSAP animation for the About section
    gsap.registerPlugin(ScrollTrigger);

    gsap.set(".about-section .section-name", { opacity: 0, y: 50 });
    gsap.set(".about-section .each-section-heading", { opacity: 0, y: 50 });
    gsap.set(".about-section .highlight-text1", { opacity: 0, x: 50 });
    gsap.set(".about-section .highlight-text2", { opacity: 0, x: 50 });
    gsap.set(".about-section img", { opacity: 0, scale: 0.9 });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".about-section",
          start: "top 80%",
        },
      })
      .to(
        ".about-section .section-name",
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3"
      )
      .to(
        ".about-section .each-section-heading",
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      )
      .to(
        ".about-section .highlight-text1",
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      )
      .to(
        ".about-section .highlight-text2",
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.5"
      )
      .to(
        ".about-section img",
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.5"
      );

    ///////////////// GSAP animation for the Business Segment section
    gsap.set(".our-business-section .section-name", { opacity: 0, y: 30 });
    gsap.set(".our-business-section .each-section-heading", {
      opacity: 0,
      y: 30,
    });
    gsap.set(".our-business-section .business-card", { opacity: 0, y: 50 });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".our-business-section",
          start: "top 80%",
        },
      })
      .to(
        ".our-business-section .section-name",
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.3"
      )
      .to(
        ".our-business-section .each-section-heading",
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.3"
      )
      .to(
        ".our-business-section .business-card",
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.2,
        },
        "-=0.2"
      );

    ///////////////// GSAP animation for the Management section
    gsap.set(".directors-section .section-name", { opacity: 0, y: 30 });
    gsap.set(".directors-section .each-section-heading", { opacity: 0, y: 30 });
    gsap.set(".directors-section .swiper-slide", { opacity: 0, y: 50 });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".directors-section",
          start: "top 80%",
        },
      })
      .to(
        ".directors-section .section-name",
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.3"
      )
      .to(
        ".directors-section .each-section-heading",
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.3"
      )
      .to(
        ".directors-section .swiper-slide",
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.2,
        },
        "-=0.2"
      );

    ///////////////// GSAP animation for the News section
    gsap.set(".latest-news-section .section-name", { opacity: 0, y: 30 });
    gsap.set(".latest-news-section .each-section-heading", {
      opacity: 0,
      y: 30,
    });
    gsap.set(".latest-news-section .swiper-slide", { opacity: 0, y: 50 });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".latest-news-section",
          start: "top 80%",
        },
      })
      .to(
        ".latest-news-section .section-name",
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.3"
      )
      .to(
        ".latest-news-section .each-section-heading",
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.3"
      )
      .to(
        ".latest-news-section .swiper-slide",
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.2,
        },
        "-=0.2"
      );

    ///////////////// GSAP animation for the Infrastructure Loadig section
    gsap.set(".infrastructure-section .person-img", { opacity: 0, x: -100 });
    gsap.set(".infrastructure-section .blue-box", { opacity: 0, x: 100 });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".infrastructure-section",
          start: "top 80%",
        },
      })
      .to(".infrastructure-section .person-img", {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
      })
      .to(
        ".infrastructure-section .blue-box",
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.8"
      );

    ///////////////// GSAP animation for the Footer section
    gsap.set(
      ".footer-section .navbar-brand-name, .footer-section .footer-links-div, .footer-section .contact-div, .footer-section .social-icons, .footer-section .footer-bottom-section",
      {
        opacity: 0,
        y: 50,
      }
    );

    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".footer-section",
          start: "top 85%",
        },
      })
      .to(".footer-section .navbar-brand-name", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      })
      .to(
        ".footer-section .footer-links-div",
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6"
      )
      .to(
        ".footer-section .contact-div",
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6"
      )
      .to(
        ".footer-section .social-icons",
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6"
      )
      .to(
        ".footer-section .footer-bottom-section",
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.4"
      );
  }
});
