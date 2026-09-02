/* -------------------------------------------------------------------------- */
/*                       Swiper for Case Studies Section                      */
/* -------------------------------------------------------------------------- */
const swiper = new Swiper(".caseStudiesSwiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 3, // Desktop and up
    },
  },
});

/* -------------------------------------------------------------------------- */
/*                            // Back to top button                           */
/* -------------------------------------------------------------------------- */
const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

/* -------------------------------------------------------------------------- */
/*                         // Sticky navbar on scroll                         */
/* -------------------------------------------------------------------------- */
const navbar = document.getElementById("mainNavbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    navbar.classList.add("sticky-navbar");
  } else {
    navbar.classList.remove("sticky-navbar");
  }
});

/* -------------------------------------------------------------------------- */
/*                // Smooth scroll with offset on anchor click                */
/* -------------------------------------------------------------------------- */
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    // Set active manually
    document
      .querySelectorAll(".nav-link")
      .forEach((l) => l.classList.remove("active"));
    link.classList.add("active");

    /* -------------------------------------------------------------------------- */
    /*                          // Close navbar in mobile                         */
    /* -------------------------------------------------------------------------- */
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navbarCollapse = document.querySelector("#navbarContent");

    if (navbarToggler && navbarCollapse.classList.contains("show")) {
      navbarToggler.click();
    }
  });
});

/* -------------------------------------------------------------------------- */
/*                   // Close navbar on link click (mobile)                   */
/* -------------------------------------------------------------------------- */
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navbarCollapse = document.querySelector("#navbarContent");

    if (navbarToggler && navbarCollapse.classList.contains("show")) {
      navbarToggler.click();
    }
  });
});

/* -------------------------------------------------------------------------- */
/*                     // Close navbar if clicking outside                    */
/* -------------------------------------------------------------------------- */
document.addEventListener("click", function (event) {
  const navbar = document.getElementById("mainNavbar");
  const navbarCollapse = document.getElementById("navbarContent");
  const toggler = document.querySelector(".navbar-toggler");

  const isClickInside = navbar.contains(event.target);

  if (!isClickInside && navbarCollapse.classList.contains("show")) {
    toggler.click();
  }
});

/* -------------------------------------------------------------------------- */
/*                         // Hamburger menu animation                        */
/* -------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", function () {
  const toggler = document.querySelector(".navbar-toggler");

  toggler.addEventListener("click", function () {
    toggler.classList.toggle("is-active");
  });
});

/* -------------------------------------------------------------------------- */
/*                     // Update active nav link on scroll                    */
/* -------------------------------------------------------------------------- */
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  navLinks.forEach((link) => {
    const targetSection = document.querySelector(link.getAttribute("href"));

    if (targetSection) {
      const rect = targetSection.getBoundingClientRect();
      const sectionTop = rect.top + scrollY;
      const sectionHeight = targetSection.offsetHeight;

      if (
        scrollY >= sectionTop - 150 &&
        scrollY < sectionTop + sectionHeight - 150
      ) {
        navLinks.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
      }
    }
  });
});

document.querySelectorAll(".zoom-container").forEach((container) => {
  const image = container.querySelector(".card-img-top");

  container.addEventListener("mousemove", (e) => {
    const { left, top, width, height } = container.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    image.style.transformOrigin = `${x}% ${y}%`;
    image.style.transform = "scale(2)";
  });

  container.addEventListener("mouseleave", () => {
    image.style.transform = "scale(1)";
    image.style.transformOrigin = "center center";
  });
});

/* -------------------------------------------------------------------------- */
/*                            // ?? GSAP ANIMATION                            */
/* -------------------------------------------------------------------------- */

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

if (window.innerWidth >= 768) {
  // Hero Section Animation
  gsap.from("#hero .col-lg-6", {
    scrollTrigger: {
      trigger: "#hero",
      start: "top center",
    },
    y: 100,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    stagger: 0.3,
  });

  // About Section Animation
  gsap.from("#about-us .about-text", {
    scrollTrigger: {
      trigger: "#about-us",
      start: "top center",
    },
    x: -100,
    opacity: 0,
    duration: 1,
  });
  gsap.from("#about-us .about-image", {
    scrollTrigger: {
      trigger: "#about-us",
      start: "top center",
    },
    x: 100,
    opacity: 0,
    duration: 1,
  });

  // Partners Section
  // gsap.from("#partners img", {
  //   scrollTrigger: {
  //     trigger: "#partners",
  //     start: "top 80%", // Start when the section hits 80% of viewport
  //     toggleActions: "play none none none",
  //   },
  //   y: 50,
  //   opacity: 0,
  //   duration: 1,
  //   stagger: 0.2,
  //   ease: "power3.out",
  // });

  // Services Section
  gsap.from("#our-services .col-lg-6", {
    scrollTrigger: {
      trigger: "#our-services",
      start: "top center",
    },
    y: 80,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
  });

  // Stats Section
  gsap.from("#stats .col-sm-3", {
    scrollTrigger: {
      trigger: "#stats",
      start: "top 80%",
      toggleActions: "play none none none",
    },
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out",
  });

  // Case Studies Cards
  gsap.from("#case-studies .card", {
    scrollTrigger: {
      trigger: "#case-studies",
      start: "top center",
    },
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
  });

  // Ready to Light Section
  gsap.from("#ready-to-light .col-md-6", {
    scrollTrigger: {
      trigger: "#ready-to-light",
      start: "top center",
    },
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
  });
}
