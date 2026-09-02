const menuBtn = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("active");
  navMenu.classList.toggle("active");
});

gsap.registerPlugin(ScrollTrigger);
if (window.innerWidth > 768) {
  // Header
  gsap.from("#header", {
    y: -80,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
  });

  // Hero Section
  gsap.from("#hero h1", {
    scrollTrigger: "#hero",
    y: 50,
    opacity: 0,
    duration: 1,
  });

  gsap.from("#hero p", {
    scrollTrigger: "#hero",
    y: 30,
    opacity: 0,
    delay: 0.2,
    duration: 1,
  });

  gsap.from("#hero a", {
    scrollTrigger: "#hero",
    scale: 0.8,
    opacity: 0,
    delay: 0.4,
    duration: 0.8,
  });

  // About Section
  gsap.from("#about .about-tex", {
    scrollTrigger: "#about",
    x: -100,
    opacity: 0,
    duration: 1,
  });

  gsap.from("#about img", {
    scrollTrigger: "#about",
    y: 100,
    opacity: 0,
    duration: 1,
  });

  // Services Section
  gsap.from("#services h3", {
    scrollTrigger: "#services",
    y: 50,
    opacity: 0,
    duration: 1,
  });

  gsap.from("#services p", {
    scrollTrigger: "#services",
    y: 30,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
  });

  // Contact Section
  gsap.from(".contact-box", {
    scrollTrigger: "#contact",
    x: -50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
  });

  gsap.from(".contact-icon i", {
    scrollTrigger: "#contact",
    opacity: 0,
    scale: 0.5,
    duration: 0.5,
    stagger: 0.2,
    ease: "back.out(1.7)",
  });

  gsap.from(".contact-img-box img", {
    scrollTrigger: "#contact",
    x: 100,
    opacity: 0,
    duration: 1,
  });

  // Footer
  gsap.from("footer p", {
    scrollTrigger: "footer",
    y: 40,
    opacity: 0,
    duration: 1,
  });
}
