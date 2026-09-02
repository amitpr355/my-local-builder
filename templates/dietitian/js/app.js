const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

// Toggle mobile menu
menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// Sticky navbar after scroll
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    // adjust scroll distance
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
});
// navigation animation of booder
// Grab all sections and nav links
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("#navbar .nav-menu ul li a");

function setActiveLink() {
  let scrollY = window.scrollY;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 120; // offset for navbar height
    const sectionId = section.getAttribute("id");

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", setActiveLink);

// back to top btn
const backToTopBtn = document.getElementById("backToTopBtn");

window.onscroll = () => {
  if (document.documentElement.scrollTop > 300) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
};

backToTopBtn.onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
// gsap animation start heare
// Register plugin
gsap.registerPlugin(ScrollTrigger);
if (window.innerWidth > 768) {
  // Hero content animation on page load
  gsap.from(".hero-content", {
    y: 80,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
  });

  // Animate elements individually with stagger
  gsap.from(".hero-content h1, .hero-content p", {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out",
  });

  //  ABOUT SECTION ANIMATION

  gsap.from(".about-text", {
    scrollTrigger: {
      trigger: "#about",
      start: "top 80%",
      toggleActions: "play none none",
    },
    x: -100,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });

  gsap.from(".about-image", {
    scrollTrigger: {
      trigger: "#about",
      start: "top 80%",
      toggleActions: "play none none",
    },
    y: 100,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });
  //  HOW IT WORKS SECTION ANIMATION

  gsap.from("#how-it-works .section-header", {
    scrollTrigger: {
      trigger: "#how-it-works",
      start: "top 80%",
      toggleActions: "play none none",
    },
    y: -50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });
  //  APPOINTMENT SECTION
  gsap.from(".appointment-content", {
    scrollTrigger: {
      trigger: "#appointment",
      start: "top 80%",
      toggleActions: "play none none",
    },
    x: -100,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });

  // Right content (form)
  gsap.from(".appointment-form", {
    scrollTrigger: {
      trigger: "#appointment",
      start: "top 80%",
      toggleActions: "play none none",
    },
    y: 100,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });
  //  TESTIMONIAL SECTION

  gsap.from(".testimonial-img", {
    scrollTrigger: {
      trigger: "#testimonial",
      start: "top 80%",
      toggleActions: "play none none",
    },
    scale: 0.8,
    opacity: 0,
    duration: 1,
    ease: "back.out(1.7)", // nice pop effect
  });

  // Testimonial text
  gsap.from(".testimonial-text", {
    scrollTrigger: {
      trigger: "#testimonial",
      start: "top 75%",
      toggleActions: "play none none",
    },
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.3,
    ease: "power3.out",
  });

  // Testimonial name
  gsap.from(".testimonial-name", {
    scrollTrigger: {
      trigger: "#testimonial",
      start: "top 70%",
      toggleActions: "play none none",
    },
    y: 30,
    opacity: 0,
    duration: 1,
    delay: 0.6,
    ease: "power3.out",
  });

  //  FEATURED SECTION

  gsap.from(".featured-title", {
    scrollTrigger: {
      trigger: "#featured",
      start: "top 85%",
      toggleActions: "play none none",
    },
    y: -30,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });

  //  FOOTER SECTION

  gsap.from("#footer .logo", {
    scrollTrigger: {
      trigger: "#footer",
      start: "top 85%",
      toggleActions: "play none none",
    },
    scale: 0.8,
    opacity: 0,
    duration: 1,
    ease: "back.out(1.7)",
  });

  gsap.from("#footer .tagline", {
    scrollTrigger: {
      trigger: "#footer",
      start: "top 80%",
      toggleActions: "play none none",
    },
    y: 30,
    opacity: 0,
    duration: 1,
    delay: 0.2,
    ease: "power3.out",
  });

  gsap.from("#footer .footer-nav a", {
    scrollTrigger: {
      trigger: "#footer",
      start: "top 75%",
      toggleActions: "play none none",
    },
    opacity: 0,
    y: 20,
    duration: 1,
    stagger: 0.1,
    delay: 0.4,
    ease: "power3.out",
  });
}
