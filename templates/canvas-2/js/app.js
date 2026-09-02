(function () {
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMobile");

  if (!toggle || !menu) return;

  const setOpen = (open) => {
    menu.classList.toggle("active", open);
    toggle.classList.toggle("active", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  };

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.contains("active");
    setOpen(!isOpen);
  });

  // close when clicking any menu link
  menu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => setOpen(false));
  });

  // close on resize to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) setOpen(false);
  });
})();

// Back to Top Button
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
// GSAP Animations

gsap.registerPlugin(ScrollTrigger);
if (window.innerWidth > 768) {
  // Header Animation
  gsap.from("#header", {
    y: -100,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
  });

  // Hero Section
  gsap.from("#hero .text-content", {
    scrollTrigger: "#hero",
    y: -100,
    opacity: 0,
    duration: 1,
  });

  gsap.from("#hero .hero-img", {
    scrollTrigger: "#hero",
    y: 100,
    opacity: 0,
    duration: 1,
  });

  // About Section
  gsap.from("#about img", {
    scrollTrigger: "#about",
    y: -100,
    opacity: 0,
    duration: 1,
  });

  gsap.from("#about .ps-lg-5", {
    scrollTrigger: "#about",
    y: 100,
    opacity: 0,
    duration: 1,
  });

  // CTA Section
  gsap.from("#cta", {
    scrollTrigger: "#cta",
    scale: 0.8,
    opacity: 0,
    duration: 1,
  });

  // Gallery Items
  gsap.from(".gallery-box", {
    scrollTrigger: "#gallery",
    opacity: 0,
    y: 50,
    duration: 0.5,
    stagger: 0.2,
  });

  // Testimonials
  gsap.from("#testimonial .p-3", {
    scrollTrigger: "#testimonial",
    opacity: 0,
    y: 50,
    duration: 0.6,
    stagger: 0.2,
  });

  // Footer
  gsap.from("#footer", {
    scrollTrigger: "#footer",
    opacity: 0,
    y: 50,
    duration: 1,
  });
}
