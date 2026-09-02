
  const swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      992: {
        slidesPerView: 8,
        spaceBetween: 30,
        autoplay: false, // disable autoplay on desktop
        allowTouchMove: false // disable swipe on desktop
      }
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    // on: {
    //   slideChangeTransitionStart: function () {
    //     // Animate only the visible slides (responsive-safe)
    //     this.slides.forEach((slide, index) => {
    //       if (slide.classList.contains("swiper-slide-active") || slide.classList.contains("swiper-slide-visible")) {
    //         gsap.fromTo(
    //           slide.querySelector(".program-card"),
    //           { y: 30, opacity: 0 },
    //           {
    //             y: 0,
    //             opacity: 1,
    //             duration: 0.8,
    //             ease: "power2.out",
    //             overwrite: "auto"
    //           }
    //         );}})}
    // }
  });



  // Our Expert Swiper
  const expertSwiper = new Swiper(".ourExpertsSwiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      }
    }
  });

  // vision and mission swiper
  const visionMissionSwiper = new Swiper(".vision-mission-swiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 1,
      }
    }
  });


/* -------------------------------------------------------------------------- */
/*                         // Sticky navbar on scroll                         */
/* -------------------------------------------------------------------------- */
(() => {
  const navbar = document.getElementById("main-nav");
  if (!navbar) return;

  let spacer = null;
  let isSticky = false;

  // thresholds (smooth hysteresis)
  const STICKY_ON  = 120; // add at > 120px
  const STICKY_OFF = 80;  // remove at < 80px

  const applySticky = () => {
    if (isSticky) return;
    navbar.classList.add("sticky"); // your CSS .sticky should be position:fixed
    // reserve space to avoid layout jump
    spacer = document.createElement("div");
    spacer.style.height = navbar.offsetHeight + "px";
    navbar.after(spacer);
    isSticky = true;
  };

  const removeSticky = () => {
    if (!isSticky) return;
    navbar.classList.remove("sticky");
    if (spacer) { spacer.remove(); spacer = null; }
    isSticky = false;
  };

  const onScroll = () => {
    const y = window.pageYOffset || document.documentElement.scrollTop;
    if (!isSticky && y > STICKY_ON) applySticky();
    else if (isSticky && y < STICKY_OFF) removeSticky();
  };

  // if navbar height changes (resize), keep spacer in sync
  const onResize = () => {
    if (isSticky && spacer) spacer.style.height = navbar.offsetHeight + "px";
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);
  onScroll();
})();


// Close navbar on link click (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('#navbarNav');

    if (navbarToggler && navbarCollapse.classList.contains('show')) {
      navbarToggler.click();
    }
  });
});


// Close navbar if clicking outside
document.addEventListener('click', function (event) {
  const navbar = document.getElementById('main-nav');
  const navbarCollapse = document.getElementById('navbarNav');
  const toggler = document.querySelector('.navbar-toggler');

  const isClickInside = navbar.contains(event.target);

  if (!isClickInside && navbarCollapse.classList.contains('show')) {
    toggler.click();
  }
});
  // Hamburger menu animation
document.addEventListener("DOMContentLoaded", function () {
  const toggler = document.querySelector(".navbar-toggler");

  toggler.addEventListener("click", function () {
    toggler.classList.toggle("is-active");
  });
});


  // Back to top button
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

// Vanilla Tilt js
VanillaTilt.init(document.querySelectorAll(".tilt"), {
  glare: true,
  "max-glare": 0.2,
});