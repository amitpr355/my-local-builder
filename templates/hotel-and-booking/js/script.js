document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const drawer = document.getElementById("drawer");
  const closeBtn = document.getElementById("closeDrawer");

  // Open drawer
  hamburger.addEventListener("click", function (e) {
    e.stopPropagation();
    drawer.classList.add("active");
  });

  // Close drawer by clicking on X
  closeBtn.addEventListener("click", function () {
    drawer.classList.remove("active");
  });

  // Close drawer on outside click
  document.addEventListener("click", function (e) {
    if (!drawer.contains(e.target) && !hamburger.contains(e.target)) {
      drawer.classList.remove("active");
    }
  });
});

// Swiper for the review section
document.addEventListener("DOMContentLoaded", function () {
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: "auto",
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
});

// // navbar hiding and showing
let lastScrollTop = 0;
const navbar = document.querySelector(".navbar");
const navbarSection = document.querySelector(".navbar-section");
const reserveBtn = document.querySelector(".reserve-now-btn");

function handleNavbarScroll() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;

  if (scrollTop === 0) {
    navbarSection.classList.add("transparent-navbar");
  } else {
    navbarSection.classList.remove("transparent-navbar");
  }

  if (scrollTop > lastScrollTop) {
    // Scrolling down
    navbar.style.top = "-100px";
    navbarSection.classList.remove("scrolled-up");
  } else {
    // Scrolling up
    navbar.style.top = "0";
    navbarSection.classList.add("scrolled-up");
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}

// Apply on scroll
window.addEventListener("scroll", handleNavbarScroll);

// Apply on page load
window.addEventListener("load", handleNavbarScroll);

// For mouse drag
const scrollContainer = document.querySelector(".scroll-container");
let isDown = false;
let startX;
let scrollLeft;

scrollContainer.addEventListener("mousedown", (e) => {
  isDown = true;
  scrollContainer.classList.add("active");
  startX = e.pageX - scrollContainer.offsetLeft;
  scrollLeft = scrollContainer.scrollLeft;
});
scrollContainer.addEventListener("mouseleave", () => {
  isDown = false;
  scrollContainer.classList.remove("active");
});
scrollContainer.addEventListener("mouseup", () => {
  isDown = false;
  scrollContainer.classList.remove("active");
});
scrollContainer.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - scrollContainer.offsetLeft;
  const walk = (x - startX) * 1.5; // scroll speed
  scrollContainer.scrollLeft = scrollLeft - walk;
});

// Floating button js
const btn = document.querySelector(".floating-btn");

// Show/hide button on scroll
window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    // Show button
    btn.style.opacity = 1;
    btn.style.transform = "translateY(0)";
    btn.style.pointerEvents = "auto";
  } else {
    // Hide button
    btn.style.opacity = 0;
    btn.style.transform = "translateY(50px)";
    btn.style.pointerEvents = "none";
  }
});

window.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth >= 767.98) {
    // Bounce animation on hover
    btn.addEventListener("mouseenter", () => {
      gsap.to(btn, { scale: 1.1, duration: 0.2, ease: "power1.out" });
    });
    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, { scale: 1, duration: 0.2, ease: "power1.out" });
    });

    // Always enable this regardless of screen size
    gsap.registerPlugin(ScrollTrigger);

    // Navbar animation
    // Animate navbar on page load
    gsap.from(".navbar-section", {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
    });

    // Drawer Animation Timeline (initially paused)
    const drawerTimeline = gsap.timeline({ paused: true });

    drawerTimeline
      .set(".drawer", { display: "block" }) // Make it visible first
      .fromTo(
        ".drawer",
        { x: "100%" },
        { x: "0%", duration: 0.5, ease: "power3.out" }
      )
      .from(
        ".drawer-contents",
        { opacity: 0, y: 50, duration: 0.3, ease: "power2.out" },
        "-=0.3"
      );

    // Show drawer on click
    document.getElementById("hamburger").addEventListener("click", () => {
      drawerTimeline.play();
    });

    // Hide drawer on cross click
    document.getElementById("closeDrawer").addEventListener("click", () => {
      drawerTimeline.reverse();
    });
    // Hero section
    // Animate overlay fade-in
    gsap.from(".hero-overlay", {
      opacity: 0,
      duration: 1.2,
      ease: "power2.out",
    });

    // Animate hero heading
    gsap.from(".hero-heading", {
      y: 60,
      opacity: 0,
      duration: 1.2,
      delay: 0.3,
      ease: "power3.out",
    });

    // Animate Get Started button
    gsap.from(".get-started-btn", {
      y: 40,
      opacity: 0,
      duration: 1.1,
      delay: 0.6,
      ease: "power3.out",
    });

    // Coordinates animation (slide from left)
    gsap.from(".coordinates", {
      x: -50,
      opacity: 0,
      duration: 1,
      delay: 1,
      ease: "power2.out",
    });

    // Scroll-down icon animation (bounce in from bottom)
    gsap.from(".scroll-down-icon", {
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 1.2,
      ease: "bounce.out",
    });

    // Royal Heritage section
    // Main heading fade-in from top
    gsap.from(".main-text", {
      scrollTrigger: {
        trigger: ".heritage-section",
        start: "top 80%",
        toggleActions: "play none none none",
      },
      y: 40,
      opacity: 0,
      duration: 1.2,
      ease: "power2.out",
    });

    // Image fade-in from left
    gsap.from(".royal-heritage-image-div", {
      scrollTrigger: {
        trigger: ".heritage-section",
        start: "top 75%",
        toggleActions: "play none none none",
      },
      x: -60,
      opacity: 0,
      duration: 1.2,
      delay: 0.2,
      ease: "power3.out",
    });

    // Text section fade-in from right
    gsap.from(".text-section", {
      scrollTrigger: {
        trigger: ".heritage-section",
        start: "top 75%",
        toggleActions: "play none none none",
      },
      x: 60,
      opacity: 0,
      duration: 1.2,
      delay: 0.4,
      ease: "power3.out",
    });

    // Button fade-up
    gsap.from(".learn-more-btn", {
      scrollTrigger: {
        trigger: ".heritage-section",
        start: "top 75%",
        toggleActions: "play none none none",
      },
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 0.7,
      ease: "power2.out",
    });

    // Royal Experience Section
    // Animate section heading
    gsap.from(".experience-text-div", {
      scrollTrigger: {
        trigger: ".experience-section",
        start: "top 80%",
        toggleActions: "play none none none",
      },
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: "power2.out",
    });

    // Animate cards with stagger
    gsap.from(".experience-card", {
      scrollTrigger: {
        trigger: ".experience-section",
        start: "top 75%",
        toggleActions: "play none none none",
      },
      y: 60,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "power3.out",
    });

    // Animate buttons inside cards
    gsap.from(".view-more-btn", {
      scrollTrigger: {
        trigger: ".experience-section",
        start: "top 75%",
        toggleActions: "play none none none",
      },
      y: 20,
      opacity: 0,
      duration: 1,
      delay: 0.6,
      ease: "power2.out",
    });

    // Room and suits
    // Animate Room section heading
    gsap.from(".room-text-div", {
      scrollTrigger: {
        trigger: ".rooms-section",
        start: "top 80%",
        toggleActions: "play none none none",
      },
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: "power2.out",
    });

    // Animate all room cards with stagger
    gsap.from(".room-card", {
      scrollTrigger: {
        trigger: ".rooms-section",
        start: "top 75%",
        toggleActions: "play none none none",
      },
      y: 60,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      stagger: {
        amount: 1,
        from: "start",
      },
    });

    // Royal Culture Section
    // Animate heading
    // Animate all feature cards with stagger
    gsap.from(".feature-card", {
      scrollTrigger: {
        trigger: ".culture-section",
        start: "top 75%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      stagger: {
        amount: 0.8,
        from: "start",
      },
    });

    // Royal Values
    // Animate Left Text
    gsap.from(".royal-value-section .left-text-div", {
      scrollTrigger: {
        trigger: ".royal-value-section",
        start: "top 80%",
        toggleActions: "play none none none",
      },
      x: -80,
      opacity: 0,
      duration: 1.2,
      ease: "power2.out",
    });

    // Animate Right Image
    gsap.from(".royal-value-section .right-image-div", {
      scrollTrigger: {
        trigger: ".royal-value-section",
        start: "top 80%",
        toggleActions: "play none none none",
      },
      x: 80,
      opacity: 0,
      duration: 1.2,
      ease: "power2.out",
    });

    // Video Section
    // Animate video preview image
    gsap.from(".video-preview-section .video-wrapper-div img", {
      scrollTrigger: {
        trigger: ".video-preview-section",
        start: "top 80%",
        toggleActions: "play none none none",
      },
      scale: 0.9,
      opacity: 0,
      duration: 1.2,
      ease: "power2.out",
    });

    // Animate play button with slight delay
    gsap.from(".video-preview-section .play-btn", {
      scrollTrigger: {
        trigger: ".video-preview-section",
        start: "top 80%",
        toggleActions: "play none none none",
      },
      scale: 0,
      opacity: 0,
      duration: 0.8,
      delay: 0.3,
      ease: "back.out(1.7)",
    });

    // Royal Experience
    // Animate the heading text
    gsap.from(".royal-experience-section .each-section-heading", {
      scrollTrigger: {
        trigger: ".royal-experience-section .each-section-heading",
        start: "top 80%",
        toggleActions: "play none none none",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });

    // Animate each testimonial card (swiper-slide)
    gsap.utils
      .toArray(".royal-experience-section .swiper-slide")
      .forEach(function (slide, index) {
        gsap.from(slide, {
          scrollTrigger: {
            trigger: slide,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: index * 0.2, // stagger based on slide index
        });
      });

    // Follow us on Instagram
    // Animate section heading and button
    // Animate Instagram images
    gsap.utils.toArray(".instagram-section .col-md-4").forEach((col, i) => {
      gsap.from(col, {
        scrollTrigger: {
          trigger: col,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: i * 0.2,
      });
    });

    // Footer Section
    // Animate the entire footer section once it comes into view
    gsap.from(".footer-section .footer-logo, .footer-section img[alt='Map']", {
      scrollTrigger: {
        trigger: ".footer-section",
        start: "top 85%",
        toggleActions: "play none none none",
      },
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      stagger: 0.3,
    });

    // Animate each footer column with stagger
    gsap.from(
      ".footer-section .col-sm-6, .footer-section .col-md-3, .footer-section .col-md-2",
      {
        scrollTrigger: {
          trigger: ".footer-section",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.2,
      }
    );

    // Animate bottom copyright and policy links
    gsap.from(".footer-section .bottom-text > div", {
      scrollTrigger: {
        trigger: ".footer-section .bottom-text",
        start: "top 90%",
        toggleActions: "play none none none",
      },
      y: 20,
      opacity: 0,
      duration: 0.7,
      ease: "power2.out",
      stagger: 0.2,
    });
  }
});
