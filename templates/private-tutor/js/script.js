/* -------------------------------------------------------------------------- */
/*                                  // Swiper                                 */
/* -------------------------------------------------------------------------- */
  const swiper = new Swiper(".mySwiper", {
    loop: true,
    centeredSlides: true,
    slidesPerView: 3,
    spaceBetween: 30,
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      0: { slidesPerView: 1.2 },
      576: { slidesPerView: 2 },
      768: { slidesPerView: 4.5 },
    }
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

  // thresholds to avoid flicker near top
  const STICKY_ON  = 120; // add sticky when > 120px
  const STICKY_OFF = 80;  // remove sticky when < 80px

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
    if (spacer) { spacer.remove(); spacer = null; }
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

  // keep spacer height correct when mobile menu opens/closes
  const collapse = document.getElementById("navbarContent");
  if (collapse) {
    collapse.addEventListener("shown.bs.collapse", onResize);
    collapse.addEventListener("hidden.bs.collapse", onResize);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);
  onScroll(); // initialize
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
/*                             // GSAP Animations                             */
/* -------------------------------------------------------------------------- */

window.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth >= 768) {
    gsap.registerPlugin(ScrollTrigger);


    // Sections

    // Animate Hero Section
const heroSection = document.querySelector("#hero");

if (heroSection) {
  // Animate subheading
  gsap.from("#hero .hero-subhead", {
    scrollTrigger: {
      trigger: heroSection,
      start: "top 90%",
    },
    duration: 1,
    y: -20,
    opacity: 0,
    ease: "power2.out"
  });

  // Animate main heading
  gsap.from("#hero .hero-head", {
    scrollTrigger: {
      trigger: heroSection,
      start: "top 90%",
    },
    duration: 1,
    y: -30,
    opacity: 0,
    delay: 0.2,
    ease: "power2.out"
  });

  // Animate paragraph
  gsap.from("#hero .hero-subpara", {
    scrollTrigger: {
      trigger: heroSection,
      start: "top 90%",
    },
    duration: 1,
    y: 20,
    opacity: 0,
    delay: 0.4,
    ease: "power2.out"
  });

  // Animate call-to-action button
  gsap.from("#hero .call-now-btn", {
    scrollTrigger: {
      trigger: heroSection,
      start: "top 90%",
    },
    duration: 1,
    scale: 0.8,
    opacity: 0,
    delay: 0.6,
    ease: "back.out(1.7)"
  });

  // Animate tutor image
  gsap.from("#hero .hero-img", {
    scrollTrigger: {
      trigger: heroSection,
      start: "top 85%",
    },
    duration: 1.2,
    scale: 0.9,
    opacity: 0,
    delay: 0.5,
    ease: "power2.out"
  });

  // Animate decorative elements (float + fade in)
  gsap.utils.toArray("#hero .hero-deco").forEach((deco, index) => {
    gsap.from(deco, {
      scrollTrigger: {
        trigger: heroSection,
        start: "top 85%",
      },
      duration: 1,
      opacity: 0,
      y: 20,
      delay: 0.3 + index * 0.2,
      ease: "power2.out"
    });

    // Optional: subtle floating motion
    gsap.to(deco, {
      y: "-=10",
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  });

  // Animate circle background
  gsap.from("#hero .circle-bg", {
    scrollTrigger: {
      trigger: heroSection,
      start: "top 90%",
    },
    duration: 1,
    scale: 0.5,
    opacity: 0,
    delay: 0.3,
    ease: "back.out(1.7)"
  });
}

    // Animate Why Choose Section
const whyChoose = document.querySelector("#why-choose");

if (whyChoose) {
  // Animate section heading
  gsap.from("#why-choose h2", {
    scrollTrigger: {
      trigger: whyChoose,
      start: "top 80%",
    },
    duration: 1,
    y: -30,
    opacity: 0,
    ease: "power2.out"
  });

  // Animate section paragraph
  gsap.from("#why-choose p.main-subpara", {
    scrollTrigger: {
      trigger: whyChoose,
      start: "top 75%",
    },
    duration: 1,
    y: 30,
    opacity: 0,
    delay: 0.2,
    ease: "power2.out"
  });

  // Animate each card icon, title, and text
  document.querySelectorAll("#why-choose .why-choose__card").forEach((card, index) => {
    const delay = 0.3 + index * 0.2;

    gsap.from(card.querySelector(".why-choose__icon"), {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
      },
      duration: 1,
      scale: 0.5,
      opacity: 0,
      delay: delay,
      ease: "back.out(1.7)"
    });

    gsap.from(card.querySelector(".why-choose__card-title"), {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
      },
      duration: 1,
      y: -20,
      opacity: 0,
      delay: delay + 0.1,
      ease: "power2.out"
    });

    gsap.from(card.querySelector(".why-choose__card-text"), {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
      },
      duration: 1,
      y: 20,
      opacity: 0,
      delay: delay + 0.2,
      ease: "power2.out"
    });
  });
}


// Animate Expertise Section
const expertiseSection = document.querySelector("#expertise-section");

if (expertiseSection) {
  // Animate section heading
  gsap.from("#expertise-section h2", {
    scrollTrigger: {
      trigger: expertiseSection,
      start: "top 80%",
    },
    duration: 1,
    y: -30,
    opacity: 0,
    ease: "power2.out"
  });

  // Animate section paragraph
  gsap.from("#expertise-section .main-subpara", {
    scrollTrigger: {
      trigger: expertiseSection,
      start: "top 75%",
    },
    duration: 1,
    y: 30,
    opacity: 0,
    delay: 0.2,
    ease: "power2.out"
  });

  // Animate each expertise card
  document.querySelectorAll("#expertise-section .expertise-card").forEach((card, index) => {
    const delay = 0.3 + index * 0.2;

    // Animate rotating image
    gsap.from(card.querySelector(".rotating-img"), {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
      },
      duration: 1,
      scale: 0.5,
      opacity: 0,
      delay: delay,
      ease: "back.out(1.7)"
    });

    // Animate heading
    gsap.from(card.querySelector(".card-heading"), {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
      },
      duration: 1,
      y: -20,
      opacity: 0,
      delay: delay + 0.1,
      ease: "power2.out"
    });

    // Animate paragraph
    gsap.from(card.querySelector(".card-para"), {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
      },
      duration: 1,
      y: 20,
      opacity: 0,
      delay: delay + 0.2,
      ease: "power2.out"
    });

    // Animate button
    gsap.from(card.querySelector(".primary-btn"), {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
      },
      duration: 1,
      scale: 0.8,
      opacity: 0,
      delay: delay + 0.3,
      ease: "back.out(1.7)"
    });
  });
}

// Animate Features Section
const featuresSection = document.querySelector("#features");

if (featuresSection) {
  // Animate section heading
  gsap.from("#features h2", {
    scrollTrigger: {
      trigger: featuresSection,
      start: "top 80%",
    },
    duration: 1,
    y: -30,
    opacity: 0,
    ease: "power2.out"
  });

  // Animate section paragraph
  gsap.from("#features .main-subpara", {
    scrollTrigger: {
      trigger: featuresSection,
      start: "top 75%",
    },
    duration: 1,
    y: 30,
    opacity: 0,
    delay: 0.2,
    ease: "power2.out"
  });

  // Animate each feature card
  document.querySelectorAll("#features .feature-card").forEach((card, index) => {
    const delay = 0.3 + index * 0.2;

    // Animate card image
    gsap.from(card.querySelector("img"), {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
      },
      duration: 1,
      x: card.classList.contains("flex-md-row-reverse") ? 50 : -50,
      opacity: 0,
      delay: delay,
      ease: "power2.out"
    });

    // Animate card heading
    gsap.from(card.querySelector("h5"), {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
      },
      duration: 1,
      y: -20,
      opacity: 0,
      delay: delay + 0.1,
      ease: "power2.out"
    });

    // Animate paragraph
    gsap.from(card.querySelector("p"), {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
      },
      duration: 1,
      y: 20,
      opacity: 0,
      delay: delay + 0.2,
      ease: "power2.out"
    });

    // Animate button
    gsap.from(card.querySelector(".secondary-btn"), {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
      },
      duration: 1,
      scale: 0.8,
      opacity: 0,
      delay: delay + 0.3,
      ease: "back.out(1.7)"
    });
  });
}

// Animate Highlight Program Section
const highlightProgram = document.querySelector("#highlight-program");

if (highlightProgram) {
  // Animate image
  gsap.from("#highlight-program img.img-fluid", {
    scrollTrigger: {
      trigger: highlightProgram,
      start: "top 80%",
    },
    duration: 1,
    x: -50,
    opacity: 0,
    ease: "power2.out"
  });

  // Animate heading
  gsap.from("#highlight-program h2", {
    scrollTrigger: {
      trigger: highlightProgram,
      start: "top 75%",
    },
    duration: 1,
    y: -30,
    opacity: 0,
    delay: 0.2,
    ease: "power2.out"
  });

  // Animate paragraph
  gsap.from("#highlight-program .main-subpara", {
    scrollTrigger: {
      trigger: highlightProgram,
      start: "top 75%",
    },
    duration: 1,
    y: 30,
    opacity: 0,
    delay: 0.4,
    ease: "power2.out"
  });

  // Animate list items (icons + text blocks)
  const listItems = highlightProgram.querySelectorAll(".d-flex.align-items-start");
  listItems.forEach((item, index) => {
    const delay = 0.6 + index * 0.2;

    // Icon
    gsap.from(item.querySelector("img"), {
      scrollTrigger: {
        trigger: item,
        start: "top 85%",
      },
      duration: 1,
      scale: 0.5,
      opacity: 0,
      delay: delay,
      ease: "back.out(1.7)"
    });

    // Text block (h6 + p)
    gsap.from(item.querySelector("div"), {
      scrollTrigger: {
        trigger: item,
        start: "top 85%",
      },
      duration: 1,
      x: 30,
      opacity: 0,
      delay: delay + 0.1,
      ease: "power2.out"
    });
  });
}

// Animate Reviews Section
const reviewsSection = document.querySelector("#reviews");

if (reviewsSection) {
  // Animate heading
  gsap.from("#reviews h2", {
    scrollTrigger: {
      trigger: reviewsSection,
      start: "top 80%",
    },
    duration: 1,
    y: -30,
    opacity: 0,
    ease: "power2.out"
  });

  // Animate sub-paragraph
  gsap.from("#reviews .main-subpara", {
    scrollTrigger: {
      trigger: reviewsSection,
      start: "top 75%",
    },
    duration: 1,
    y: 30,
    opacity: 0,
    delay: 0.2,
    ease: "power2.out"
  });

  // Animate quote icon image
  gsap.from("#reviews .quote-img", {
    scrollTrigger: {
      trigger: reviewsSection,
      start: "top 75%",
    },
    duration: 1,
    scale: 0.7,
    opacity: 0,
    delay: 0.4,
    ease: "back.out(1.7)"
  });

  // Animate main review text
  gsap.from("#reviews .review-text", {
    scrollTrigger: {
      trigger: reviewsSection,
      start: "top 70%",
    },
    duration: 1,
    y: 20,
    opacity: 0,
    delay: 0.6,
    ease: "power2.out"
  });

  // Animate each swiper slide (visible on load)
  gsap.utils.toArray("#reviews .swiper-slide").forEach((slide, index) => {
    gsap.from(slide, {
      scrollTrigger: {
        trigger: slide,
        start: "top 85%",
        toggleActions: "play none none none"
      },
      duration: 1,
      y: 30,
      opacity: 0,
      delay: 0.8 + index * 0.1,
      ease: "power2.out"
    });
  });
}

// Animate Contact Section
const contactSection = document.querySelector("#contact");

if (contactSection) {
  // Animate "Contact Information" heading
  gsap.from("#contact .left-contact h5", {
    scrollTrigger: {
      trigger: contactSection,
      start: "top 80%",
    },
    duration: 1,
    x: -30,
    opacity: 0,
    ease: "power2.out"
  });

  // Animate contact info list items
  gsap.utils.toArray("#contact .left-contact ul li").forEach((item, index) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: contactSection,
        start: "top 75%",
      },
      duration: 1,
      x: -20,
      opacity: 0,
      delay: 0.2 + index * 0.2,
      ease: "power2.out"
    });
  });

  // Animate social icons
  gsap.from("#contact .left-contact div a", {
    scrollTrigger: {
      trigger: contactSection,
      start: "top 75%",
    },
    duration: 1,
    scale: 0.8,
    opacity: 0,
    delay: 1,
    stagger: 0.1,
    ease: "back.out(1.7)"
  });

  // Animate form fields
  gsap.utils.toArray("#contact form .form-custom").forEach((field, index) => {
    gsap.from(field, {
      scrollTrigger: {
        trigger: contactSection,
        start: "top 75%",
      },
      duration: 1,
      y: 20,
      opacity: 0,
      delay: 0.3 + index * 0.2,
      ease: "power2.out"
    });
  });

  // Animate submit button
  gsap.from("#contact form button", {
    scrollTrigger: {
      trigger: contactSection,
      start: "top 75%",
    },
    duration: 1,
    scale: 0.9,
    opacity: 0,
    delay: 1.5,
    ease: "back.out(1.7)"
  });

  // Animate map (optional)
  gsap.from("#contact iframe", {
    scrollTrigger: {
      trigger: contactSection,
      start: "top 80%",
    },
    duration: 1,
    x: 30,
    opacity: 0,
    ease: "power2.out"
  });
}



      }
})