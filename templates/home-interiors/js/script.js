document.addEventListener("DOMContentLoaded", function () {
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.getElementById("navbarCentered");
  const navLinks = document.querySelectorAll(".nav-link");

  // Collapse navbar when a nav link is clicked
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (
        navbarToggler.offsetParent !== null &&
        navbarCollapse.classList.contains("show")
      ) {
        navbarToggler.click();
      }
    });
  });

  // Collapse navbar if clicked outside
  document.addEventListener("click", function (event) {
    const isClickInsideNavbar =
      navbarCollapse.contains(event.target) ||
      navbarToggler.contains(event.target);
    if (!isClickInsideNavbar && navbarCollapse.classList.contains("show")) {
      navbarToggler.click();
    }
  });
});

// JS for the pagination
window.addEventListener("DOMContentLoaded", () => {
  const pagination = document.getElementById("carouselPagination");
  if (window.innerWidth <= 428) {
    pagination.classList.remove("d-none");
  } else {
    pagination.classList.add("d-none");
  }
});

////////////////////// Our projects images change
const previewImage = document.getElementById("mainPreviewImage");
const imageBlocks = document.querySelectorAll(".image-room1");

// Save the default image URL
const defaultImage = previewImage.src;

imageBlocks.forEach((block) => {
  const hoverImage = block.getAttribute("data-large");

  block.addEventListener("mouseenter", () => {
    previewImage.src = hoverImage;
  });

  block.addEventListener("mouseleave", () => {
    previewImage.src = defaultImage;
  });
});

gsap.registerPlugin(ScrollTrigger);
///////////// Animate floating button in when user scrolls down
gsap.to(".floating-btn", {
  scrollTrigger: {
    trigger: "body",
    start: "top top+=100", // Trigger after 100px scroll
    toggleActions: "play none none reverse",
  },
  opacity: 1,
  y: 0,
  duration: 0.8,
  ease: "power3.out",
});
// Optional: Bounce on hover
const btn = document.querySelector(".floating-btn");
btn.addEventListener("mouseenter", () => {
  gsap.to(btn, { scale: 1.1, duration: 0.2, ease: "power1.out" });
});
btn.addEventListener("mouseleave", () => {
  gsap.to(btn, { scale: 1, duration: 0.2, ease: "power1.out" });
});

window.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth >= 768) {
    // ////////////////Animation starts from here

    ////////////// Section 1(animation)
    // Text content animation
    gsap.from(".section1-text-content", {
      scrollTrigger: {
        trigger: ".section1-text-content",
        start: "top 80%",
      },
      opacity: 0,
      y: 50,
      duration: 1.2,
      ease: "power3.out",
    });
    // Image 1 animation (left)
    gsap.from(".image1", {
      scrollTrigger: {
        trigger: ".image1",
        start: "top 80%",
      },
      opacity: 0,
      x: -100,
      duration: 1.2,
      ease: "power3.out",
    });
    // Image 2 animation (right)
    gsap.from(".image2", {
      scrollTrigger: {
        trigger: ".image2",
        start: "top 80%",
      },
      opacity: 0,
      x: 100,
      duration: 1.2,
      ease: "power3.out",
    });

    ////////////// Section 2(About US section)
    // Image animation (from left)
    gsap.from(".aboutus-image", {
      scrollTrigger: {
        trigger: ".aboutus-image",
        start: "top 80%",
      },
      opacity: 0,
      x: -100,
      duration: 1.2,
      ease: "power3.out",
    });
    // Heading and paragraph (from right)
    gsap.from(".aboutus-heading, .aboutus-para", {
      scrollTrigger: {
        trigger: ".aboutus-heading",
        start: "top 80%",
      },
      opacity: 0,
      x: 100,
      duration: 1.2,
      stagger: 0.2,
      ease: "power3.out",
    });
    // Director name and title (fade in with delay)
    gsap.from(".director-name, .director-title", {
      scrollTrigger: {
        trigger: ".director-name",
        start: "top 85%",
      },
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.3,
      stagger: 0.2,
      ease: "power2.out",
    });

    //////////// Section 3(What we offer animation)
    // Animate heading
    gsap.from(".section3-heading", {
      scrollTrigger: {
        trigger: ".section3-heading",
        start: "top 80%",
      },
      opacity: 0,
      scale: 0.8,
      duration: 1,
      ease: "power2.out",
    });
    // Animate cards one-by-one
    gsap.from(".section3-card", {
      scrollTrigger: {
        trigger: ".section3",
        start: "top 80%",
      },
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out",
    });
    // Optional: Animate text overlays
    gsap.from(".text-over-image", {
      scrollTrigger: {
        trigger: ".section3",
        start: "top 80%",
      },
      opacity: 0,
      y: 20,
      delay: 0.3,
      duration: 1,
      stagger: 0.2,
      ease: "power1.out",
    });

    // ///////////Section 4(Our Projects)
    // Animate Heading
    gsap.from(".section4 h2", {
      scrollTrigger: {
        trigger: ".section4",
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });
    // Animate small yellow text
    gsap.from(".our-projects-small-text", {
      scrollTrigger: {
        trigger: ".section4",
        start: "top 80%",
      },
      y: 30,
      opacity: 0,
      delay: 0.2,
      duration: 0.8,
      ease: "power2.out",
    });
    // Animate paragraph
    gsap.from(".section4 p.text-justify", {
      scrollTrigger: {
        trigger: ".section4",
        start: "top 80%",
      },
      y: 30,
      opacity: 0,
      delay: 0.4,
      duration: 0.8,
      ease: "power2.out",
    });
    // Animate image-room1 items with stagger
    gsap.from(".image-room1", {
      scrollTrigger: {
        trigger: ".section4",
        start: "top 85%",
      },
      scale: 0.7,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "back.out(1.7)",
    });
    // Animate kitchen image
    gsap.from(".image-kitchen1", {
      scrollTrigger: {
        trigger: ".section4",
        start: "top 80%",
      },
      x: 100,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });

    //////////////// Section 5(Big numbers section)
    // Animate each box in Section 5
    gsap.from(".section5-each-box", {
      scrollTrigger: {
        trigger: ".section5",
        start: "top 80%",
      },
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out",
    });
    // Optional: Number counter animation
    const counters = document.querySelectorAll(".section5-number");
    counters.forEach((counter) => {
      const endValue = parseInt(counter.textContent.trim());
      gsap.fromTo(
        counter,
        { textContent: 0 },
        {
          textContent: endValue,
          duration: 2,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: counter,
            start: "top 90%",
          },
          snap: { textContent: 1 },
          onUpdate: function () {
            counter.textContent = Math.floor(counter.textContent);
          },
        }
      );
    });

    /////////////// Section 6(Testimonials section)
    // Animate testimonials on large screens (non-carousel)
    gsap.from(".section6 .boxes-text", {
      scrollTrigger: {
        trigger: ".section6",
        start: "top 80%",
      },
      opacity: 0,
      scale: 0.8,
      y: 50,
      duration: 1,
      ease: "power2.out",
      stagger: 0.3,
    });
    // Optional: Fade in heading smoothly
    gsap.from(".section6 h1", {
      scrollTrigger: {
        trigger: ".section6 h1",
        start: "top 90%",
      },
      opacity: 0,
      y: -30,
      duration: 1,
      ease: "power2.out",
    });
    gsap.from("#testimonialCarousel", {
      scrollTrigger: {
        trigger: "#testimonialCarousel",
        start: "top 90%",
      },
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power2.out",
    });

    ////////////////////////Section 7(Contact us )
    // Animate heading and underline
    gsap.from(".section7 h1, .section7 hr", {
      scrollTrigger: {
        trigger: ".section7 h1",
        start: "top 90%",
      },
      opacity: 0,
      y: -30,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out",
    });
    // Animate form inputs
    gsap.from(".section7 .form-control", {
      scrollTrigger: {
        trigger: ".form-of-section7",
        start: "top 85%",
      },
      opacity: 0,
      x: -50,
      duration: 0.7,
      stagger: 0.2,
      ease: "power2.out",
    });
    // Animate checkbox and label
    gsap.from(".section7 .form-check", {
      scrollTrigger: {
        trigger: ".form-of-section7",
        start: "top 85%",
      },
      opacity: 0,
      y: 30,
      duration: 0.6,
      delay: 0.6,
      ease: "power2.out",
    });
    // Animate submit button
    gsap.from(".section7 .submit-button-contactus", {
      scrollTrigger: {
        trigger: ".form-of-section7",
        start: "top 85%",
      },
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
      delay: 0.9,
      ease: "back.out(1.7)",
    });
  }
});
