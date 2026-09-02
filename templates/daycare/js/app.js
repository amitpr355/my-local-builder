// NAV: mobile toggle + sticky + close behaviors
(() => {
  const nav = document.querySelector(".custom-navbar");
  const toggle = document.getElementById("menuToggle");
  const menu = document.getElementById("mainNav");

  if (!nav || !toggle || !menu) return;

  const openMenu = () => {
    toggle.classList.add("active");
    menu.classList.add("active");
    toggle.setAttribute("aria-expanded", "true");
  };

  const closeMenu = () => {
    toggle.classList.remove("active");
    menu.classList.remove("active");
    toggle.setAttribute("aria-expanded", "false");
  };

  // Toggle click
  toggle.addEventListener("click", (e) => {
    e.preventDefault();
    if (menu.classList.contains("active")) closeMenu();
    else openMenu();
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    const isInside = nav.contains(e.target);
    if (!isInside) closeMenu();
  });

  // Close when clicking a link (mobile)
  menu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => closeMenu());
  });

  // Sticky on scroll
  const stickyOffset = 40;
  window.addEventListener("scroll", () => {
    if (window.scrollY > stickyOffset) nav.classList.add("is-sticky");
    else nav.classList.remove("is-sticky");
  });
})();

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

// mouse trail effect
const trailContainer = document.getElementById("mouse-trail");
if (!trailContainer) {
  console.warn("mouse-trail container not found");
}

let lastTime = 0;
document.addEventListener("mousemove", (e) => {
  // throttle to ~60fps (you can raise the ms for fewer dots)
  const now = performance.now();
  if (now - lastTime < 16) return; // 16ms = 60fps
  lastTime = now;

  // compute position relative to the fixed container (handles scrolling)
  const rect = trailContainer.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const dot = document.createElement("div");
  dot.className = "trail-dot";
  dot.style.left = `${x}px`;
  dot.style.top = `${y}px`;

  trailContainer.appendChild(dot);

  // trigger fade/scale next frame for smooth transition
  requestAnimationFrame(() => {
    dot.style.transform = "translate(-50%, -50%) scale(0.5)";
    dot.style.opacity = "0";
  });

  // remove after animation (match the CSS transition duration)
  setTimeout(() => {
    dot.remove();
  }, 700);
});

// gsap animation

gsap.registerPlugin(ScrollTrigger);
if (window.innerWidth > 768) {
  // Navbar Animation on Page Load
  gsap.from(".custom-navbar", {
    y: -50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });

  // Hero Section Animation
  gsap.from(".hero-text", {
    x: -100,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#hero",
      start: "top 80%",
    },
  });

  gsap.from(".hero-images", {
    x: -100,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#hero",
      start: "top 80%",
    },
  });

  // About Section Animation
  gsap.from(".about-image", {
    x: -80,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#about",
      start: "top 80%",
    },
  });

  gsap.from(".about-content", {
    y: 80,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#about",
      start: "top 80%",
    },
  });

  // Testimonial section animation
  gsap.from(".testimonial-image", {
    x: -100,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".testimonial-section",
      start: "top 80%",
    },
  });

  gsap.from(".testimonial-content", {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".testimonial-section",
      start: "top 80%",
    },
  });

  // Daycare schedule cards animation
  gsap.from(".card-boxs", {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".daycare-section",
      start: "top 80%",
    },
  });

  // Heading animations in Daycare section
  gsap.from(".daycare-section .subheading, .daycare-section .heading", {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".daycare-section",
      start: "top 85%",
    },
  });

  /** WHY US SECTION **/
  gsap.from(".why-us-section .left", {
    x: -100,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".why-us-section",
      start: "top 80%",
    },
  });

  /** GALLERY SECTION **/
  gsap.from(".gallery-grid img", {
    scale: 0.8,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".gallery-section",
      start: "top 85%",
    },
  });

  /** DAILY ACTIVITIES **/
  gsap.from(
    ".daily-activities .section-subtitle, .daily-activities .section-title",
    {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".daily-activities",
        start: "top 85%",
      },
    }
  );

  gsap.from(".daily-activities .video-wrapper", {
    scale: 0.9,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".daily-activities .video-wrapper",
      start: "top 85%",
    },
  });

  /** PROGRAM HIGHLIGHTS **/
  gsap.from(".program-highlights .highlight-item", {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".program-highlights",
      start: "top 80%",
    },
  });

  /** MEET THE TEACHERS **/
  gsap.from(".meet-teachers .section-subtitle, .meet-teachers .section-title", {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".meet-teachers",
      start: "top 85%",
    },
  });

  gsap.from(".teachers-grid .teacher-card", {
    scale: 0.9,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".teachers-grid",
      start: "top 80%",
    },
  });

  /** PARENT TESTIMONIAL **/
  gsap.from(".parent-testimonial .section-subtitle", {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".parent-testimonial",
      start: "top 85%",
    },
  });

  /** FOOTER CTA **/
  gsap.from(".footer-cta-title", {
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".footer-cta",
      start: "top 85%",
    },
  });

  gsap.from(".footer-cta-text", {
    y: 30,
    opacity: 0,
    duration: 0.8,
    delay: 0.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".footer-cta",
      start: "top 85%",
    },
  });

  gsap.from(".footer-cta-button", {
    scale: 0.9,
    opacity: 0,
    duration: 0.6,
    delay: 0.4,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: ".footer-cta",
      start: "top 85%",
    },
  });

  /** FOOTER **/
  gsap.from(".footer-copy", {
    x: -50,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".site-footer",
      start: "top 90%",
    },
  });

  gsap.from(".footer-social a", {
    y: 20,
    opacity: 0,
    duration: 0.6,
    stagger: 0.15,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".site-footer",
      start: "top 90%",
    },
  });
}
