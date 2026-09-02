/* -------------------------------------------------------------------------- */
/*                                  // Swiper                                 */
/* -------------------------------------------------------------------------- */
const swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    // Mobile
    0: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      grid: {
        rows: 1,
      },
    },
    // Tablet
    768: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      grid: {
        rows: 2,
        fill: "row",
      },
    },
    // Desktop
    1200: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      grid: {
        rows: 2,
        fill: "row",
      },
    },
  },
});

const testimonialSwiper = new Swiper(".testimonial-swiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 2,
    },
  },
});

const serviceSwiper = new Swiper(".service-swiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 3,
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
(() => {
  const nav = document.getElementById("mainNavbar");
  if (!nav) return;

  let spacer = null;
  let isSticky = false;

  // thresholds to avoid flicker near the top
  const STICKY_ON  = 120; // add sticky when scroll > 120px
  const STICKY_OFF = 80;  // remove sticky when scroll < 80px

  const applySticky = () => {
    if (isSticky) return;
    nav.classList.add("sticky-navbar"); // your CSS controls fixed styles
    spacer = document.createElement("div");
    spacer.style.height = nav.offsetHeight + "px";
    nav.after(spacer);
    isSticky = true;
  };

  const removeSticky = () => {
    if (!isSticky) return;
    nav.classList.remove("sticky-navbar");
    if (spacer) { spacer.remove(); spacer = null; }
    isSticky = false;
  };

  const onScroll = () => {
    const y = window.pageYOffset || document.documentElement.scrollTop;
    if (!isSticky && y > STICKY_ON) applySticky();
    else if (isSticky && y < STICKY_OFF) removeSticky();
  };

  const onResize = () => {
    if (isSticky && spacer) spacer.style.height = nav.offsetHeight + "px";
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);

  // run once on load in case page opens mid-scroll
  onScroll();
})();

/* -------------------------------------------------------------------------- */
/*                // Smooth scroll with offset on anchor click                */
/* -------------------------------------------------------------------------- */
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    // Set active manually
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');

    /* -------------------------------------------------------------------------- */
    /*                          // Close navbar in mobile                         */
    /* -------------------------------------------------------------------------- */
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('#navbarContent');

    if (navbarToggler && navbarCollapse.classList.contains('show')) {
      navbarToggler.click();
    }
  });
});

/* -------------------------------------------------------------------------- */
/*                   // Close navbar on link click (mobile)                   */
/* -------------------------------------------------------------------------- */
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('#navbarContent');

    if (navbarToggler && navbarCollapse.classList.contains('show')) {
      navbarToggler.click();
    }
  });
});

/* -------------------------------------------------------------------------- */
/*                     // Close navbar if clicking outside                    */
/* -------------------------------------------------------------------------- */
document.addEventListener('click', function (event) {
  const navbar = document.getElementById('mainNavbar');
  const navbarCollapse = document.getElementById('navbarContent');
  const toggler = document.querySelector('.navbar-toggler');

  const isClickInside = navbar.contains(event.target);

  if (!isClickInside && navbarCollapse.classList.contains('show')) {
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
/*                              // GSAP Animation                             */
/* -------------------------------------------------------------------------- */


window.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth >= 768) {
    gsap.registerPlugin(ScrollTrigger);

    //? Hero section
    const hero = document.querySelector("#hero");
    if (hero) {
      gsap.from("#hero .bg-rect-tall", {
        duration: 1,
        opacity: 0,
        y: 50,
        ease: "power2.out"
      });

      gsap.from("#hero .foreground-image", {
        duration: 1,
        opacity: 0,
        x: -50,
        delay: 0.3,
        ease: "power2.out"
      });

      gsap.from("#hero .display-2", {
        duration: 1,
        opacity: 0,
        y: -30,
        delay: 0.6,
        ease: "power2.out"
      });

      gsap.from("#hero .hero-text-box", {
        duration: 1,
        opacity: 0,
        y: 30,
        delay: 0.9,
        ease: "power2.out"
      });

      gsap.from("#hero .hero-experience-box", {
        duration: 1,
        scale: 0,
        opacity: 0,
        delay: 1.2,
        ease: "back.out(1.7)"
      });
    }

    //? About section (triggered on scroll)
    const about = document.querySelector("#about-1");
    if (about) {
      gsap.from("#about-1 .display-2", {
        scrollTrigger: {
          trigger: "#about-1",
          start: "top 80%", // Trigger when top of section hits 80% of viewport
        },
        duration: 1,
        opacity: 0,
        y: -40,
        ease: "power2.out"
      });

      gsap.from("#about-1 .highlight-number", {
        scrollTrigger: {
          trigger: "#about-1",
          start: "top 80%",
        },
        duration: 1,
        opacity: 0,
        scale: 0.8,
        delay: 0.3,
        stagger: 0.2,
        ease: "back.out(1.7)"
      });

      gsap.from("#about-1 .text-description, #about-1 .text-link", {
        scrollTrigger: {
          trigger: "#about-1",
          start: "top 80%",
        },
        duration: 1,
        opacity: 0,
        y: 30,
        delay: 0.5,
        stagger: 0.2,
        ease: "power2.out"
      });

      gsap.from("#about-1 .bg-rect-tall", {
        scrollTrigger: {
          trigger: "#about-1",
          start: "top 80%",
        },
        duration: 1,
        opacity: 0,
        y: 50,
        delay: 0.8,
        ease: "power2.out"
      });

      gsap.from("#about-1 .foreground-image", {
        scrollTrigger: {
          trigger: "#about-1",
          start: "top 80%",
        },
        duration: 1,
        opacity: 0,
        x: 50,
        delay: 1,
        ease: "power2.out"
      });
    }

   //? Service section (ScrollTrigger on visible cards)
const service = document.querySelector("#service-1");

if (service) {
  // Animate heading
  gsap.from("#service-1 .display-2", {
    scrollTrigger: {
      trigger: "#service-1",
      start: "top 80%",
    },
    duration: 1,
    y: 40,
    opacity: 0,
    ease: "power2.out"
  });

  // Animate cards inside Swiper
  gsap.utils.toArray("#service-1 .service-card").forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
      },
      duration: 0.8,
      opacity: 0,
      y: 30,
      delay: i * 0.05, // Optional slight delay per card
      ease: "power2.out"
    });
  });
}

//? About-2 section
const about2 = document.querySelector("#about-2");

if (about2) {
  // Heading
  gsap.from("#about-2 .display-2", {
    scrollTrigger: {
      trigger: "#about-2",
      start: "top 80%",
    },
    duration: 1,
    y: 40,
    opacity: 0,
    ease: "power2.out"
  });

  // Left tall image block
  gsap.from("#about-2 .col-lg-6 .position-relative", {
    scrollTrigger: {
      trigger: "#about-2",
      start: "top 80%",
    },
    x: -60,
    opacity: 0,
    duration: 1,
    delay: 0.2,
    ease: "power2.out"
  });

  // Right stacked image blocks
  gsap.utils.toArray("#about-2 .right-side .position-relative").forEach((block, i) => {
    gsap.from(block, {
      scrollTrigger: {
        trigger: block,
        start: "top 85%",
      },
      x: 60,
      opacity: 0,
      duration: 1,
      delay: 0.3 + i * 0.2,
      ease: "power2.out"
    });
  });

  // Optional: Divider line (fade-in & scale)
  gsap.from("#about-2 .divider-line", {
    scrollTrigger: {
      trigger: "#about-2",
      start: "top 80%",
    },
    scaleX: 0,
    opacity: 0,
    transformOrigin: "center",
    duration: 1,
    delay: 0.5,
    ease: "power2.out"
  });
}

//? Testimonials section
const testimonials = document.querySelector("#testimonials");

if (testimonials) {
  // Animate heading
  gsap.from("#testimonials .display-2", {
    scrollTrigger: {
      trigger: "#testimonials",
      start: "top 80%",
    },
    y: 40,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
  });

  // Animate testimonial cards (Swiper visible slides only)
  gsap.utils.toArray("#testimonials .testimonial-card").forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: i * 0.1,
      ease: "power2.out"
    });
  });
}

//? Service-2 section
const service2 = document.querySelector("#service-2");

if (service2) {
  // Animate heading
  gsap.from("#service-2 .display-2", {
    scrollTrigger: {
      trigger: "#service-2",
      start: "top 80%",
    },
    y: 40,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
  });

  // Animate each service card
  gsap.utils.toArray("#service-2 .service-card").forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: i * 0.1,
      ease: "power2.out"
    });
  });
}

//? Contact Form section
const contactForm = document.querySelector("#contact-form");

if (contactForm) {
  // Animate heading
  gsap.from("#contact-form .display-2", {
    scrollTrigger: {
      trigger: "#contact-form",
      start: "top 80%",
    },
    y: 40,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
  });

  // Left image block
  gsap.from("#contact-form .col-md-5 .position-relative", {
    scrollTrigger: {
      trigger: "#contact-form",
      start: "top 80%",
    },
    x: -60,
    opacity: 0,
    duration: 1,
    delay: 0.2,
    ease: "power2.out"
  });

  // Right form section
  gsap.from("#contact-form .form-wrapper", {
    scrollTrigger: {
      trigger: "#contact-form",
      start: "top 80%",
    },
    x: 60,
    opacity: 0,
    duration: 1,
    delay: 0.4,
    ease: "power2.out"
  });

  // Orange divider (optional)
  gsap.from("#contact-form .orange-divider", {
    scrollTrigger: {
      trigger: "#contact-form",
      start: "top 80%",
    },
    scaleY: 0,
    transformOrigin: "center top",
    opacity: 0,
    duration: 1,
    delay: 0.3,
    ease: "power2.out"
  });
}


//? FAQ section
const faq = document.querySelector("#faq");

if (faq) {
  // Animate heading
  gsap.from("#faq .display-2", {
    scrollTrigger: {
      trigger: "#faq",
      start: "top 80%",
    },
    y: 40,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
  });

  // Animate all accordion cards
  gsap.utils.toArray("#faq .faq-card").forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
      },
      opacity: 0,
      y: 30,
      duration: 0.7,
      delay: i * 0.05,
      ease: "power2.out"
    });
  });
}


  }
});
