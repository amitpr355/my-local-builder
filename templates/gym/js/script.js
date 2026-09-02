
// Swiper
new Swiper(".testimonial-swiper", {
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    slidesPerView: 1,
    breakpoints: { 
      769: {
        slidesPerView: 2,
      },
    },
    spaceBetween: 20,
  });


  
  // Pricing Data
  const plans = {
  monthly: [
    { title: 'Beginner Plan', price: '₹10/mo',para:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ", features: ['Lorem ipsum dolor sit amet, ','Lorem ipsum dolor sit amet','Lorem ipsum dolor sit amet, '] },
    { title: 'Premium Plan', price: '₹15/mo',para:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ", features: ['Lorem ipsum dolor sit amet, ','Lorem ipsum dolor sit amet','Lorem ipsum dolor sit amet, '] },
    { title: 'Expert Plan', price: '₹20/mo', para:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ",features: ['Lorem ipsum dolor sit amet, ','Lorem ipsum dolor sit amet','Lorem ipsum dolor sit amet, '] },
  ],
  yearly: [
    { title: 'Beginner Plan', price: '₹100/yr',para:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ", features: ['Lorem ipsum dolor sit amet, ','Lorem ipsum dolor sit amet','Lorem ipsum dolor sit amet, '] },
    { title: 'Premium Plan', price: '₹150/yr',para:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ", features: ['Lorem ipsum dolor sit amet, ','Lorem ipsum dolor sit amet','Lorem ipsum dolor sit amet, '] },
    { title: 'Expert Plan', price: '₹200/yr',para:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ", features: ['Lorem ipsum dolor sit amet, ','Lorem ipsum dolor sit amet','Lorem ipsum dolor sit amet, '] },
  ]
};

let currentPlan = 'monthly';
let swiper;

function renderCards() {
  const cardsContainer = document.getElementById('pricingCards');
  const slidesContainer = document.getElementById('swiperSlides');
  cardsContainer.innerHTML = '';
  slidesContainer.innerHTML = '';

  plans[currentPlan].forEach((plan, idx) => {
    const isActive = idx === 1;
    // Desktop card
    cardsContainer.innerHTML += `
      <div class="col-md-4">
        <div class="card p-4 price-card ${isActive ? 'active' : ''}">
          <h5>${plan.title}</h5>
          <h2>${plan.price}</h2>
          <p>${plan.para}</p>
          <ul>${plan.features.map(f => `<li>${f}</li>`).join('')}</ul>
          <a class="btn btn-outline-dark w-100">Choose Plan</a>
        </div>
      </div>
    `;
    // Mobile slide
    slidesContainer.innerHTML += `
      <div class="swiper-slide">
        <div class="card p-4 price-card ${isActive ? 'active' : ''}">
          <h5>${plan.title}</h5>
          <h2>${plan.price}</h2>
            <p>${plan.para}</p>
          <ul>${plan.features.map(f => `<li>${f}</li>`).join('')}</ul>
          <a class="btn btn-outline-dark w-100">Choose Plan</a>
        </div>
      </div>
    `;
  });

  // Refresh/swipe
  if (swiper) swiper.destroy();
  swiper = new Swiper('.mobile-swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
  });
}

document.querySelectorAll('#pricingToggle button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('#pricingToggle .active').classList.remove('active');
    btn.classList.add('active');
    currentPlan = btn.dataset.plan;
    renderCards();
  });
});

renderCards();


// FAQS Toggle 

document.addEventListener('DOMContentLoaded', () => {
  const faqButtons = document.querySelectorAll('#faqAccordion .accordion-button');

  faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      setTimeout(() => {
        faqButtons.forEach(button => {
          const icon = button.querySelector('.icon');
          const contentId = button.getAttribute('data-bs-target');
          const content = document.querySelector(contentId);
          if (icon && content) {
            icon.textContent = content.classList.contains('show') ? 'remove' : 'add';
          }
        });
      }, 200); // Enough delay for Bootstrap collapse to finish
    });
  });
});

 new Swiper(".testimonial-swiper", {
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
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

  // thresholds to avoid flicker
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

  // keep spacer height in sync when mobile menu opens/closes
  const collapse = document.getElementById("navbarContent");
  if (collapse) {
    collapse.addEventListener("shown.bs.collapse", onResize);
    collapse.addEventListener("hidden.bs.collapse", onResize);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);
  onScroll(); // initialize once
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



/* -------------------------------------------------------------------------- */
/*                               GSAP Animation                               */
/* -------------------------------------------------------------------------- */


window.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth >= 768) {
    gsap.registerPlugin(ScrollTrigger);

    // Sections 

    const aboutSection = document.querySelector("#about");

if (aboutSection) {
  // Animate image (from left)
  gsap.from("#about .about-img", {
    scrollTrigger: {
      trigger: aboutSection,
      start: "top 80%", // when top of section hits 80% viewport
    },
    x: -50,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
  });

  // Animate text card (from right)
  gsap.from("#about .about-card", {
    scrollTrigger: {
      trigger: aboutSection,
      start: "top 80%",
    },
    x: 50,
    opacity: 0,
    duration: 1,
    delay: 0.3,
    ease: "power2.out",
  });
}

const programItems = document.querySelectorAll("#programs .program-item");

programItems.forEach((item, index) => {
  gsap.from(item, {
    scrollTrigger: {
      trigger: item,
      start: "top 85%", // animation starts when each item reaches 85% of viewport height
      toggleActions: "play none none none", // play only once
    },
    x: index % 2 === 0 ? -50 : 50, // alternate from left/right
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    delay: index * 0.1, // stagger delay slightly
  });
});

const testimonialSection = document.querySelector("#testimonials");

if (testimonialSection) {
  const testimonialSlides = document.querySelectorAll("#testimonials .swiper-slide");

  testimonialSlides.forEach((slide, index) => {
    const card = slide.querySelector(".testimonial-card");
    const image = slide.querySelector(".testimonial-image");

    // Animate card (left side)
    gsap.from(card, {
      scrollTrigger: {
        trigger: slide,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      x: -50,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });

    // Animate image (right side)
    gsap.from(image, {
      scrollTrigger: {
        trigger: slide,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      x: 50,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      ease: "power2.out",
    });
  });
}

// Animate desktop pricing cards
const pricingCards = document.querySelectorAll("#pricingCards .card"); // Adjust selector if different
pricingCards.forEach((card, index) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 85%",
      toggleActions: "play none none none",
    },
    y: 40,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    delay: index * 0.1,
  });
});

// Animate mobile swiper slides
const pricingSlides = document.querySelectorAll("#swiperSlides .swiper-slide"); // again, adjust if needed
pricingSlides.forEach((slide, index) => {
  gsap.from(slide, {
    scrollTrigger: {
      trigger: slide,
      start: "top 85%",
      toggleActions: "play none none none",
    },
    y: 40,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    delay: index * 0.1,
  });
});


const faqItems = document.querySelectorAll("#faqs .accordion-item");

faqItems.forEach((item, index) => {
  gsap.from(item, {
    scrollTrigger: {
      trigger: item,
      start: "top 85%",
      toggleActions: "play none none none",
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
    delay: index * 0.1,
  });
});

const contactSection = document.querySelector("#contact");

if (contactSection) {
  const leftContact = contactSection.querySelector(".left-contact");
  const contactForm = contactSection.querySelector("form");

  // Animate left (contact info)
  gsap.from(leftContact, {
    scrollTrigger: {
      trigger: contactSection,
      start: "top 85%",
      toggleActions: "play none none none",
    },
    x: -50,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
  });

  // Animate right (form)
  gsap.from(contactForm, {
    scrollTrigger: {
      trigger: contactSection,
      start: "top 85%",
      toggleActions: "play none none none",
    },
    x: 50,
    opacity: 0,
    duration: 1,
    delay: 0.2,
    ease: "power2.out",
  });
}
const heroSection = document.querySelector("#hero");

if (heroSection) {
  // Animate title
  gsap.from(".hero-title", {
    y: -50,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
  });

  // Animate subtitle
  gsap.from(".hero-subtitle", {
    y: 30,
    opacity: 0,
    duration: 1,
    delay: 0.3,
    ease: "power2.out",
  });



  // Animate right-side image
  gsap.from(".hero-image", {
    x: 50,
    opacity: 0,
    duration: 1,
    delay: 0.8,
    ease: "power2.out",
  });

  // Animate background text (optional)
  gsap.from(".bg-text", {
    scale: 0.95,
    opacity: 0,
    duration: 1,
    delay: 1,
    ease: "power2.out",
  });
}

      }
});
