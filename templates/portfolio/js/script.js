/* -------------------------------------------------------------------------- */
/*                        // Swiper js in Testimonials                        */
/* -------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".mySwiper", {
    loop: true,
    spaceBetween: 30,
    slidesPerView: 1,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
});

/* -------------------------------------------------------------------------- */
/*                         // Sticky navbar on scroll                         */
/* -------------------------------------------------------------------------- */
(() => {
  const nav = document.getElementById("mainNavbar");
  if (!nav) return;

  let spacer = null;
  let isSticky = false;

  // thresholds to avoid flicker
  const STICKY_ON = 120; // add at >120px
  const STICKY_OFF = 80; // remove at <80px

  const addSticky = () => {
    if (isSticky) return;
    nav.classList.add("sticky-navbar");
    spacer = document.createElement("div");
    spacer.style.height = nav.offsetHeight + "px";
    nav.after(spacer);
    isSticky = true;
  };

  const removeSticky = () => {
    if (!isSticky) return;
    nav.classList.remove("sticky-navbar");
    if (spacer) {
      spacer.remove();
      spacer = null;
    }
    isSticky = false;
  };

  const onScroll = () => {
    const y = window.pageYOffset || document.documentElement.scrollTop;
    if (!isSticky && y > STICKY_ON) addSticky();
    else if (isSticky && y < STICKY_OFF) removeSticky();
  };

  const onResize = () => {
    if (isSticky && spacer) spacer.style.height = nav.offsetHeight + "px";
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);
  onScroll(); // init in case page loads mid-scroll
})();

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
const toggler = document.querySelector(".navbar-toggler");
const menu = document.getElementById("navbarContent");

toggler.addEventListener("click", (e) => {
  e.preventDefault();
  const isOpen = menu.classList.toggle("is-open");
  toggler.setAttribute("aria-expanded", isOpen ? "true" : "false");
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
/*                               Gsap Animation                               */
/* -------------------------------------------------------------------------- */

gsap.registerPlugin(ScrollTrigger);
if (window.innerWidth >= 768) {
  // Animate vertical text
  gsap.from(".rotate-text-small", {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".rotate-text-small",
      start: "top 80%",
    },
  });

  // Animate headline
  gsap.from("h1", {
    x: -100,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "h1",
      start: "top 80%",
    },
  });

  // Animate social icons
  // gsap.from(".social a", {
  //   y: 20,
  //   opacity: 0,
  //   stagger: 0.1,
  //   duration: 0.8,
  //   ease: "power2.out",
  //   scrollTrigger: {
  //     trigger: ".social",
  //     start: "top 85%",
  //   },
  // });

  // Animate image
  gsap.from(".position-relative img", {
    scale: 0.9,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".position-relative img",
      start: "top 85%",
    },
  });

  // Animate logo pills
  // gsap.from(".logo-pill", {
  //   y: 30,
  //   opacity: 0,
  //   stagger: 0.15,
  //   duration: 1,
  //   ease: "power2.out",
  //   scrollTrigger: {
  //     trigger: ".logo-pill",
  //     start: "top 90%",
  //   }
  // });

  gsap.from("#about h2", {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#about h2",
      start: "top 85%",
    },
  });

  // Animate paragraph
  gsap.from("#about p.text-muted", {
    y: 30,
    opacity: 0,
    duration: 1,
    delay: 0.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#about p.text-muted",
      start: "top 85%",
    },
  });

  // Animate play icon
  gsap.from("#about a i", {
    scale: 0,
    opacity: 0,
    duration: 0.5,
    delay: 0.3,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: "#about img",
      start: "top 85%",
    },
  });

  // Animate stats one by one
  gsap.from("#about .col-md-4 > div", {
    y: 30,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#about .col-md-4",
      start: "top 85%",
    },
  });

  gsap.from("#experience h2", {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#experience h2",
      start: "top 90%",
    },
  });

  // Animate each experience item
  gsap.utils.toArray("#experience .col-12").forEach((item, i) => {
    gsap.from(item, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      delay: i * 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: item,
        start: "top 90%",
      },
    });
  });
  gsap.from("#experience .section-heading", {
    opacity: 0,
    y: -10,
    duration: 0.6,
    stagger: 0.1,
    ease: "power1.out",
    scrollTrigger: {
      trigger: "#experience",
      start: "top 90%",
    },
  });

  gsap.from("#portfolio h2", {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#portfolio h2",
      start: "top 90%",
    },
  });

  // Animate each portfolio item with stagger
  gsap.utils.toArray(".portfolio-item").forEach((item, i) => {
    gsap.from(item, {
      scale: 0.9,
      opacity: 0,
      duration: 0.8,
      delay: i * 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: item,
        start: "top 90%",
      },
    });
  });

  // Animate the entire testimonial section
  gsap.from("#testimonials .swiper", {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#testimonials",
      start: "top 85%",
    },
  });

  // Animate each slide on load (optional, works once)
  gsap.utils.toArray(".swiper-slide").forEach((slide, i) => {
    gsap.from(slide, {
      opacity: 0,
      scale: 0.95,
      duration: 0.8,
      delay: i * 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: slide,
        start: "top 90%",
        toggleActions: "play none none none",
      },
    });
  });
}
