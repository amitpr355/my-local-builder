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
/*                               GSAP Animation                               */
/* -------------------------------------------------------------------------- */

window.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth >= 768) {
    gsap.registerPlugin(ScrollTrigger);


    // Hero 
    const hero = document.querySelector("#hero");

    if (hero) {
      // Animate left background image
      gsap.from("#hero img.d-lg-flex", {
        scrollTrigger: {
          trigger: hero,
          start: "top 80%",
        },
        duration: 1,
        opacity: 0,
        y: 60,
        ease: "power2.out"
      });

      // Animate right stacked images
      gsap.from("#hero .col-2 img", {
        scrollTrigger: {
          trigger: hero,
          start: "top 80%",
        },
        duration: 1,
        opacity: 0,
        x: -50,
        stagger: 0.2,
        ease: "power2.out"
      });

      // Animate heading inside .hero-text
      gsap.from("#hero .hero-text h2", {
        scrollTrigger: {
          trigger: hero,
          start: "top 75%",
        },
        duration: 1,
        opacity: 0,
        y: -30,
        delay: 0.2,
        ease: "power2.out"
      });

      // Animate paragraph inside .hero-text
      gsap.from("#hero .hero-text p", {
        scrollTrigger: {
          trigger: hero,
          start: "top 75%",
        },
        duration: 1,
        opacity: 0,
        y: 30,
        delay: 0.4,
        ease: "power2.out"
      });

      // Animate CTA button inside .hero-text
      gsap.from("#hero .hero-text .primary-btn", {
        scrollTrigger: {
          trigger: hero,
          start: "top 75%",
        },
        duration: 1,
        scale: 0.8,
        opacity: 0,
        delay: 0.6,
        ease: "back.out(1.7)"
      });
    }


        // Popular Destinations
    const popDest = document.querySelector("#popular-destinations");

    if (popDest) {
      // Animate image card from left
      gsap.from("#popular-destinations .local-card", {
        scrollTrigger: {
          trigger: popDest,
          start: "top 80%",
        },
        duration: 1,
        opacity: 0,
        x: -60,
        ease: "power2.out"
      });

      // Animate heading
      gsap.from("#popular-destinations h2", {
        scrollTrigger: {
          trigger: popDest,
          start: "top 80%",
        },
        duration: 1,
        opacity: 0,
        y: -30,
        delay: 0.2,
        ease: "power2.out"
      });

      // Animate guide info lines (paragraphs)
      gsap.from("#popular-destinations p", {
        scrollTrigger: {
          trigger: popDest,
          start: "top 80%",
        },
        duration: 1,
        opacity: 0,
        y: 20,
        delay: 0.4,
        stagger: 0.15,
        ease: "power2.out"
      });

      // Animate CTA button
      gsap.from("#popular-destinations .primary-btn", {
        scrollTrigger: {
          trigger: popDest,
          start: "top 80%",
        },
        duration: 1,
        scale: 0.85,
        opacity: 0,
        delay: 0.6,
        ease: "back.out(1.7)"
      });
    }


        // Top Categories
    const topCategories = document.querySelector("#top-categories");

    if (topCategories) {
      // Animate section heading
      gsap.from("#top-categories h2", {
        scrollTrigger: {
          trigger: topCategories,
          start: "top 80%",
        },
        duration: 1,
        opacity: 0,
        y: -30,
        ease: "power2.out"
      });

      // Animate each card
      gsap.from("#top-categories .local-card", {
        scrollTrigger: {
          trigger: topCategories,
          start: "top 85%",
        },
        duration: 1,
        opacity: 0,
        y: 40,
        stagger: 0.2,
        ease: "power2.out"
      });
    }

        // Featured Locals
    const featuredLocals = document.querySelector("#featured-locals");

    if (featuredLocals) {
      // Animate heading
      gsap.from("#featured-locals h2", {
        scrollTrigger: {
          trigger: featuredLocals,
          start: "top 80%",
        },
        duration: 1,
        opacity: 0,
        y: -30,
        ease: "power2.out"
      });

      // Animate cards
      gsap.from("#featured-locals .local-card", {
        scrollTrigger: {
          trigger: featuredLocals,
          start: "top 85%",
        },
        duration: 1,
        opacity: 0,
        y: 40,
        stagger: 0.2,
        ease: "power2.out"
      });
    }

        // Review Highlight
    const reviewHighlight = document.querySelector("#review-highlight");

    if (reviewHighlight) {
     
  

      // Animate the testimonial box on the right
      gsap.from("#review-highlight .border-round", {
        scrollTrigger: {
          trigger: reviewHighlight,
          start: "top 85%",
        },
        duration: 1,
        opacity: 0,
        x: 50,
        delay: 0.2,
        ease: "power2.out"
      });

      // Animate heading inside testimonial
      gsap.from("#review-highlight h3", {
        scrollTrigger: {
          trigger: reviewHighlight,
          start: "top 85%",
        },
        duration: 1,
        opacity: 0,
        y: -20,
        delay: 0.4,
        ease: "power2.out"
      });

      // Animate paragraph content
      gsap.from("#review-highlight p", {
        scrollTrigger: {
          trigger: reviewHighlight,
          start: "top 85%",
        },
        duration: 1,
        opacity: 0,
        y: 20,
        delay: 0.5,
        stagger: 0.15,
        ease: "power2.out"
      });
    }

    // Travel Stories
    const travelStories = document.querySelector("#travel-stories");

    if (travelStories) {
      // Animate heading
      gsap.from("#travel-stories h2", {
        scrollTrigger: {
          trigger: travelStories,
          start: "top 85%",
        },
        duration: 1,
        opacity: 0,
        y: -40,
        ease: "power2.out"
      });

      // Animate all text cards (excluding image-only containers)
      gsap.utils.toArray("#travel-stories .col-lg-5 .border-round").forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
          duration: 1,
          opacity: 0,
          x: i % 2 === 0 ? 60 : -60, // Alternate direction
          ease: "power2.out",
          delay: 0.1 * i
        });
      });

      // Animate all large image cards (col-lg-7)
      gsap.utils.toArray("#travel-stories .col-lg-7 img").forEach((img, i) => {
        gsap.from(img, {
          scrollTrigger: {
            trigger: img,
            start: "top 85%",
          },
          duration: 1,
          opacity: 0,
          x: i % 2 === 0 ? -60 : 60,
          ease: "power2.out",
          delay: 0.1 * i
        });
      });
    }

    // FAQ Section
    const faqSection = document.querySelector("#faq");

    if (faqSection) {
      // Animate heading and arrow
      gsap.from("#faq .col-12 h2, #faq .arrow-btn", {
        scrollTrigger: {
          trigger: faqSection,
          start: "top 85%",
        },
        duration: 1,
        opacity: 0,
        y: -40,
        stagger: 0.1,
        ease: "power2.out"
      });

      // Animate accordion items
      gsap.utils.toArray("#faq .faq-item").forEach((item, i) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
          },
          duration: 1,
          opacity: 0,
          y: 30,
          delay: i * 0.1,
          ease: "power2.out"
        });
      });

      // Animate illustration image
      gsap.from("#faq img", {
        scrollTrigger: {
          trigger: faqSection,
          start: "top 85%",
        },
        duration: 1,
        opacity: 0,
        scale: 0.9,
        ease: "back.out(1.7)"
      });
    }


        // App Promo Section
    const appPromo = document.querySelector("#app-promo");

    if (appPromo) {
      // Animate section heading
      gsap.from("#app-promo h2", {
        scrollTrigger: {
          trigger: appPromo,
          start: "top 85%",
        },
        duration: 1,
        opacity: 0,
        y: -30,
        ease: "power2.out"
      });

      // Animate cards (images)
      gsap.utils.toArray("#app-promo .local-card").forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
          },
          duration: 1,
          opacity: 0,
          y: 40,
          delay: i * 0.1,
          ease: "power2.out"
        });
      });

      // Animate card titles and paragraphs
      gsap.utils.toArray("#app-promo h4, #app-promo p").forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
          },
          duration: 1,
          opacity: 0,
          y: 20,
          delay: i * 0.05,
          ease: "power2.out"
        });
      });
    }
    // Plan Your Journey
    const planSection = document.querySelector("#plan-your-journey");

    if (planSection) {
      // Animate heading and arrow
      gsap.from("#plan-your-journey h2, #plan-your-journey .arrow-btn", {
        scrollTrigger: {
          trigger: planSection,
          start: "top 85%",
        },
        duration: 1,
        opacity: 0,
        y: -30,
        stagger: 0.1,
        ease: "power2.out"
      });

      // Animate form inputs
      gsap.utils.toArray("#plan-your-journey form .form-control").forEach((input, i) => {
        gsap.from(input, {
          scrollTrigger: {
            trigger: planSection,
            start: "top 90%",
          },
          duration: 0.8,
          opacity: 0,
          y: 20,
          delay: i * 0.1,
          ease: "power2.out"
        });
      });

      // Animate image on the right
      gsap.from("#plan-your-journey img", {
        scrollTrigger: {
          trigger: planSection,
          start: "top 85%",
        },
        duration: 1,
        opacity: 0,
        scale: 0.9,
        ease: "back.out(1.7)"
      });
    }
    // Footer Logo Animation
    const footer = document.querySelector("#footer");

    if (footer) {
      gsap.from("#footer .footer-logo-circle", {
        scrollTrigger: {
          trigger: footer,
          start: "top 95%", // Fires as the footer comes into view
        },
        duration: 1,
        opacity: 0,
        scale: 0.5,
        ease: "back.out(1.7)"
      });
    }


  }
});
