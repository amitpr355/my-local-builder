// nav bar toggle feature
const toggle = document.querySelector(".cw-nav-toggle");
const nav = document.querySelector(".cw-nav");

toggle.addEventListener("click", (e) => {
  e.preventDefault();
  const open = nav.classList.toggle("is-open");
  toggle.classList.toggle("is-open", open);
  toggle.setAttribute("aria-expanded", open ? "true" : "false");
});

// Close when clicking backdrop (outside the drawer list)
nav.addEventListener("click", (e) => {
  const clickedInsidePanel = e.target.closest(".cw-nav__list");
  if (!clickedInsidePanel) {
    nav.classList.remove("is-open");
    toggle.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }
});

// Close on link click
nav.querySelectorAll(".cw-nav__link").forEach((a) => {
  a.addEventListener("click", () => {
    nav.classList.remove("is-open");
    toggle.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  });
});

// back to top button feature
const backToTopBtn = document.getElementById("backToTopBtn");

window.addEventListener("scroll", () => {
  if (document.documentElement.scrollTop > 300) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
// gsap animation start
if (window.innerWidth > 768) {
  gsap.registerPlugin(ScrollTrigger);

  // Hero Section Animation
  gsap.from(".hero-logo", {
    opacity: 0,
    y: -50,
    duration: 1,
    ease: "power3.out",
  });

  gsap.from(".hero-nav ul li", {
    opacity: 0,
    y: -20,
    stagger: 0.2,
    duration: 0.8,
    ease: "power2.out",
  });

  gsap.from(
    ".hero-content h4, .hero-content h2, .hero-content p, .hero-contact",
    {
      scrollTrigger: {
        trigger: ".hero-content",
        start: "top 80%",
      },
      opacity: 0,
      y: 40,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out",
    }
  );

  // Creative Minds Section Animation
  gsap.from("#creative-minds .sub-heading", {
    scrollTrigger: {
      trigger: "#creative-minds",
      start: "top 80%",
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
  });

  gsap.from("#creative-minds .main-heading", {
    scrollTrigger: {
      trigger: "#creative-minds",
      start: "top 75%",
    },
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power3.out",
  });

  gsap.from("#creative-minds .description", {
    scrollTrigger: {
      trigger: "#creative-minds .description",
      start: "top 80%",
    },
    opacity: 0,
    y: 40,
    duration: 1,
    ease: "power2.out",
  });

  gsap.from("#creative-minds .image-box", {
    scrollTrigger: {
      trigger: "#creative-minds .images-wrapper",
      start: "top 80%",
    },
    opacity: 0,
    y: 60,
    stagger: 0.3,
    duration: 1,
    ease: "power3.out",
  });
  // Facilities Section
  gsap.from("#facilities .description", {
    scrollTrigger: {
      trigger: "#facilities .description",
      start: "top 80%",
    },
    opacity: 0,
    y: 40,
    duration: 1,
    ease: "power3.out",
  });

  gsap.from("#facilities .btn-custom", {
    scrollTrigger: {
      trigger: "#facilities .btn-custom",
      start: "top 85%",
    },
    opacity: 0,
    y: 40,
    duration: 0.8,
    ease: "power2.out",
    delay: 0.2,
  });

  gsap.from(
    "#facilities .sub-heading, #facilities .main-heading, #facilities .line",
    {
      scrollTrigger: {
        trigger: "#facilities .facilities-heading",
        start: "top 80%",
      },
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out",
    }
  );

  gsap.from("#features .feature-item .icon", {
    scrollTrigger: {
      trigger: "#features .row",
      start: "top 85%",
    },
    scale: 0,
    opacity: 0,
    stagger: 0.2,
    duration: 0.6,
    ease: "back.out(1.7)", // bounce-like pop effect
  });
  // Gallery Section
  gsap.from("#gallery .gallery-item", {
    scrollTrigger: {
      trigger: "#gallery .row",
      start: "top 85%",
    },
    opacity: 0,
    scale: 0.8,
    y: 50,
    stagger: 0.2,
    duration: 1,
    ease: "power3.out",
  });

  // Membership Section Heading
  gsap.from(
    "#membership .section-heading p, #membership .section-heading h2, #membership .section-heading .outline",
    {
      scrollTrigger: {
        trigger: "#membership .section-heading",
        start: "top 80%",
      },
      opacity: 0,
      y: 40,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out",
    }
  );
  // Testimonial Section
  gsap.from("#testimonial .quote-icon", {
    scrollTrigger: {
      trigger: "#testimonial",
      start: "top 85%",
    },
    opacity: 0,
    y: -30,
    duration: 1,
    ease: "back.out(1.7)",
  });

  gsap.from("#testimonial .testimonial-text", {
    scrollTrigger: {
      trigger: "#testimonial .testimonial-text",
      start: "top 80%",
    },
    opacity: 0,
    y: 40,
    duration: 1,
    ease: "power3.out",
    delay: 0.2,
  });

  gsap.from("#testimonial .testimonial-author", {
    scrollTrigger: {
      trigger: "#testimonial .testimonial-author",
      start: "top 85%",
    },
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power3.out",
    delay: 0.4,
  });

  gsap.from("#testimonial .testimonial-author .author-img", {
    scrollTrigger: {
      trigger: "#testimonial .testimonial-author",
      start: "top 85%",
    },
    scale: 0,
    opacity: 0,
    duration: 0.8,
    ease: "back.out(1.7)",
    delay: 0.6,
  });

  // CTA Section
  gsap.from("#cta .cta-logo", {
    scrollTrigger: {
      trigger: "#cta",
      start: "top 85%",
    },
    opacity: 0,
    scale: 0.5,
    duration: 1,
    ease: "back.out(1.7)",
  });

  gsap.from("#cta .btn-cta", {
    scrollTrigger: {
      trigger: "#cta .btn-cta",
      start: "top 85%",
    },
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power3.out",
    delay: 0.4,
  });
}
