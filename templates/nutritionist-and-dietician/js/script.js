/* -------------------------------------------------------------------------- */
/*                                   Swiper                                   */
/* -------------------------------------------------------------------------- */

const swiper = new Swiper(".testimonial-swiper", {
    loop: true,
    navigation: {
      nextEl: ".custom-swiper-next",
      prevEl: ".custom-swiper-prev",
    },
    pagination:{
      el:'.swiper-pagination',
      clickable:true,
    }
  });

    new Swiper(".plan-swiper", {
    loop: false,
      pagination:{
      el:'.swiper-pagination',
      clickable:true,
    },
    spaceBetween: 50,
    slidesPerView: 1,
    breakpoints: {
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

 new Swiper(".step-swiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  pagination:{
    el:'.swiper-pagination',
    clickable:true
  },
  breakpoints: {
    576: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 3,
    },
  },
  grabCursor: true,
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

  // thresholds to avoid flicker
  const STICKY_ON  = 120; // add when > 120px
  const STICKY_OFF = 80;  // remove when < 80px

  const applySticky = () => {
    if (isSticky) return;
    nav.classList.add("sticky-navbar"); // your CSS should set position:fixed etc.
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

  // kick once
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


/* -------------------------------------------------------------------------- */
/*                              // GSAP Animation                             */
/* -------------------------------------------------------------------------- */

window.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth >= 768) {
    gsap.registerPlugin(ScrollTrigger);

    // sections
    // Our Value Section
const ourValue = document.querySelector("#our-value");

if (ourValue) {
  // Animate left doctor image
  gsap.from("#our-value .doctor-image", {
    scrollTrigger: {
      trigger: ourValue,
      start: "top 80%",
    },
    duration: 1,
    y: 50,
    opacity: 0,
    ease: "power2.out"
  });

  // Animate star icon
  gsap.from("#our-value .star-icon", {
    scrollTrigger: {
      trigger: ourValue,
      start: "top 80%",
    },
    duration: 1,
    scale: 0.5,
    opacity: 0,
    delay: 0.2,
    ease: "back.out(1.7)"
  });

  // Animate heading
  gsap.from("#our-value h2", {
    scrollTrigger: {
      trigger: ourValue,
      start: "top 75%",
    },
    duration: 1,
    y: -30,
    opacity: 0,
    delay: 0.3,
    ease: "power2.out"
  });

  // Animate paragraph
  gsap.from("#our-value p", {
    scrollTrigger: {
      trigger: ourValue,
      start: "top 75%",
    },
    duration: 1,
    y: 30,
    opacity: 0,
    delay: 0.5,
    ease: "power2.out"
  });

  // Animate Learn More button
  gsap.from("#our-value .primary-btn", {
    scrollTrigger: {
      trigger: ourValue,
      start: "top 75%",
    },
    duration: 1,
    scale: 0.8,
    opacity: 0,
    delay: 0.7,
    ease: "back.out(1.7)"
  });

  // Animate SVG arrow
  gsap.from("#our-value .arrow-image", {
    scrollTrigger: {
      trigger: ourValue,
      start: "top 80%",
    },
    duration: 1,
    x: 50,
    opacity: 0,
    delay: 0.9,
    ease: "power2.out"
  });
}


// Our Best Programs Section
const bestPrograms = document.querySelector("#our-best-programs");

if (bestPrograms) {
  // Animate section heading
  gsap.from("#our-best-programs .main-heading", {
    scrollTrigger: {
      trigger: bestPrograms,
      start: "top 80%",
    },
    duration: 1,
    y: -40,
    opacity: 0,
    ease: "power2.out"
  });

  // Animate section paragraph
  gsap.from("#our-best-programs .muted", {
    scrollTrigger: {
      trigger: bestPrograms,
      start: "top 80%",
    },
    duration: 1,
    y: 30,
    opacity: 0,
    delay: 0.2,
    ease: "power2.out"
  });



  // Animate CTA button
  gsap.from("#our-best-programs .primary-btn", {
    scrollTrigger: {
      trigger: bestPrograms,
      start: "top 75%",
    },
    duration: 1,
    scale: 0.9,
    opacity: 0,
    delay: 1,
    ease: "back.out(1.7)"
  });

  // Animate arrow image
  gsap.from("#our-best-programs .programs-arrow", {
    scrollTrigger: {
      trigger: bestPrograms,
      start: "top 80%",
    },
    duration: 1,
    x: 60,
    opacity: 0,
    delay: 1.2,
    ease: "power2.out"
  });
}

// Testimonials Section
const testimonials = document.querySelector("#testimonials");

if (testimonials) {
  // Animate main heading
  gsap.from("#testimonials .main-heading", {
    scrollTrigger: {
      trigger: testimonials,
      start: "top 85%",
    },
    duration: 1,
    y: -40,
    opacity: 0,
    ease: "power2.out"
  });

  // Animate each testimonial slide (can happen only once per slide)
  const testimonialSlides = document.querySelectorAll(".testimonial-slide");

  testimonialSlides.forEach((slide, index) => {
    gsap.from(slide, {
      scrollTrigger: {
        trigger: slide,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      duration: 1,
      opacity: 0,
      y: 50,
      delay: index * 0.1, // slight delay for staggered reveal if multiple visible
      ease: "power2.out"
    });

    // Optional: Animate image and text inside each slide separately
    const img = slide.querySelector(".testimonial-img");
    const content = slide.querySelector(".testimonial-content");

    gsap.from(img, {
      scrollTrigger: {
        trigger: slide,
        start: "top 85%",
      },
      duration: 1,
      x: -40,
      opacity: 0,
      ease: "power2.out"
    });

    gsap.from(content, {
      scrollTrigger: {
        trigger: slide,
        start: "top 85%",
      },
      duration: 1,
      x: 40,
      opacity: 0,
      delay: 0.2,
      ease: "power2.out"
    });
  });
}

// Plans Section
const plans = document.querySelector("#plans");

if (plans) {
  // Animate section heading
  gsap.from("#plans .main-heading", {
    scrollTrigger: {
      trigger: plans,
      start: "top 85%",
    },
    duration: 1,
    y: -40,
    opacity: 0,
    ease: "power2.out"
  });

  // Animate arrow image
  gsap.from("#plans .plan-arrow", {
    scrollTrigger: {
      trigger: plans,
      start: "top 85%",
    },
    duration: 1,
    x: -30,
    opacity: 0,
    delay: 0.2,
    ease: "power2.out"
  });

  // Animate each plan card
  const planCards = document.querySelectorAll("#plans .plan-card");

  planCards.forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      duration: 1,
      y: 40,
      opacity: 0,
      delay: index * 0.1, // staggered effect for multiple visible
      ease: "power2.out"
    });
  });
}

// Popular Meals Section
const popularMeals = document.querySelector("#popular-meals");

if (popularMeals) {
  // Animate decorative arrow
  gsap.from("#popular-meals .social-arrow", {
    scrollTrigger: {
      trigger: popularMeals,
      start: "top 85%",
    },
    duration: 1,
    x: -30,
    opacity: 0,
    ease: "power2.out"
  });

  // Animate section heading
  gsap.from("#popular-meals .main-heading:first-of-type", {
    scrollTrigger: {
      trigger: popularMeals,
      start: "top 80%",
    },
    duration: 1,
    y: -40,
    opacity: 0,
    delay: 0.1,
    ease: "power2.out"
  });

  // Animate muted paragraph
  gsap.from("#popular-meals .muted", {
    scrollTrigger: {
      trigger: popularMeals,
      start: "top 80%",
    },
    duration: 1,
    y: 30,
    opacity: 0,
    delay: 0.3,
    ease: "power2.out"
  });

  // Animate video image and play button
  gsap.from("#popular-meals .video-wrapper", {
    scrollTrigger: {
      trigger: popularMeals,
      start: "top 75%",
    },
    duration: 1,
    scale: 0.95,
    opacity: 0,
    delay: 0.5,
    ease: "power2.out"
  });

  // Animate right text block (heading, icons, button)
  gsap.from("#popular-meals .col-md-4", {
    scrollTrigger: {
      trigger: popularMeals,
      start: "top 75%",
    },
    duration: 1,
    x: 40,
    opacity: 0,
    delay: 0.7,
    ease: "power2.out"
  });
}

// Steps Section
const steps = document.querySelector("#steps");

if (steps) {
  // Animate main heading
  gsap.from("#steps .main-heading", {
    scrollTrigger: {
      trigger: steps,
      start: "top 85%",
    },
    duration: 1,
    y: -40,
    opacity: 0,
    ease: "power2.out"
  });

  // Animate muted paragraph
  gsap.from("#steps .muted", {
    scrollTrigger: {
      trigger: steps,
      start: "top 85%",
    },
    duration: 1,
    y: 30,
    opacity: 0,
    delay: 0.2,
    ease: "power2.out"
  });

  // Animate each step card
  const stepCards = document.querySelectorAll("#steps .step-card");

  stepCards.forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      duration: 1,
      y: 40,
      opacity: 0,
      delay: index * 0.1,
      ease: "power2.out"
    });
  });

  // Animate CTA button
  gsap.from("#steps .primary-btn", {
    scrollTrigger: {
      trigger: "#steps .primary-btn",
      start: "top 85%",
    },
    duration: 1,
    scale: 0.9,
    opacity: 0,
    delay: 0.4,
    ease: "back.out(1.7)"
  });
}

// Footer Section
const footer = document.querySelector("#footer");

if (footer) {
  // Animate intro heading and paragraph
  gsap.from("#footer .col-md-6 h5, #footer .col-md-6 p", {
    scrollTrigger: {
      trigger: footer,
      start: "top 85%",
    },
    duration: 1,
    y: 30,
    opacity: 0,
    stagger: 0.2,
    ease: "power2.out"
  });

  // Animate footer links
  gsap.from("#footer .col-md-2", {
    scrollTrigger: {
      trigger: footer,
      start: "top 85%",
    },
    duration: 1,
    y: 40,
    opacity: 0,
    delay: 0.3,
    stagger: 0.2,
    ease: "power2.out"
  });

 
}

// Hero Section
const hero = document.querySelector("#hero");

if (hero) {
  // Animate heading
  gsap.from("#hero h1", {
    scrollTrigger: {
      trigger: hero,
      start: "top 80%",
    },
    duration: 1,
    y: 60,
    opacity: 0,
    ease: "power4.out"
  });

  // Animate paragraph
  gsap.from("#hero p", {
    scrollTrigger: {
      trigger: hero,
      start: "top 80%",
    },
    duration: 1,
    y: 40,
    opacity: 0,
    delay: 0.2,
    ease: "power4.out"
  });

  // Animate button
  gsap.from("#hero .secondary-btn", {
    scrollTrigger: {
      trigger: hero,
      start: "top 80%",
    },
    duration: 1,
    scale: 0.9,
    opacity: 0,
    delay: 0.4,
    ease: "back.out(1.7)"
  });

  // Animate hero image
  gsap.from("#hero .hero-image-wrapper img", {
    scrollTrigger: {
      trigger: hero,
      start: "top 80%",
    },
    duration: 1.2,
    x: 100,
    opacity: 0,
    delay: 0.1,
    ease: "power3.out"
  });
}


  }
})