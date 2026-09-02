//////////// For the swiper in the testimonials section///////////
const swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true, // Makes dots clickable
  },
  breakpoints: {
    576: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 3,
    },
  },
});

// for the navlink
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    // Remove active class from all links
    navLinks.forEach((lnk) => lnk.classList.remove("active"));

    // Add active class to the clicked link
    this.classList.add("active");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger-toggle");
  const menu = document.getElementById("navbarMenu");

  const bsCollapse = new bootstrap.Collapse(menu, {
    toggle: false,
  });

  // Toggle hamburger and menu
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("is-active");
    if (menu.classList.contains("show")) {
      bsCollapse.hide();
    } else {
      bsCollapse.show();
    }
  });

  // Close on link click
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (menu.classList.contains("show")) {
        bsCollapse.hide();
        hamburger.classList.remove("is-active");
      }
    });
  });
  // Close on outside click
  document.addEventListener("click", (e) => {
    if (
      !menu.contains(e.target) &&
      !hamburger.contains(e.target) &&
      menu.classList.contains("show")
    ) {
      bsCollapse.hide();
      hamburger.classList.remove("is-active");
    }
  });
});

////// For the scroll effect on the menu buttons
const sections = document.querySelectorAll("section");
const navLinks2 = document.querySelectorAll(".nav-link");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks2.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${entry.target.id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  },
  {
    threshold: 0.3, // Trigger when 30% of section is visible
  }
);
sections.forEach((section) => observer.observe(section));

////////////// for the about us section for the images hover effect
const img1 = document.querySelector(".about-img1");
const img2 = document.querySelector(".about-img2");

// Initially apply hover-effect to img2
img2.classList.add("hover-effect");

// Function to remove default hover
const removeDefaultHover = () => {
  img2.classList.remove("hover-effect");
};

// Function to restore default hover
const restoreDefaultHover = () => {
  if (!img1.matches(":hover") && !img2.matches(":hover")) {
    img2.classList.add("hover-effect");
  }
};

// Remove default hover when hovering over either image
img1.addEventListener("mouseenter", removeDefaultHover);
img2.addEventListener("mouseenter", removeDefaultHover);

// Restore when mouse leaves both
img1.addEventListener("mouseleave", restoreDefaultHover);
img2.addEventListener("mouseleave", restoreDefaultHover);

//////////////  Animation starts from here
/////////// GSAP animation for the floating button
document.addEventListener("DOMContentLoaded", () => {
  const floatingBtn = document.querySelector(".floating-btn");

  // Initial slide-in animation on load
  gsap.to(floatingBtn, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    delay: 0.3,
    ease: "power3.out",
  });

  // Show/hide button based on scroll position
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      gsap.to(floatingBtn, {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.3,
      });
    } else {
      gsap.to(floatingBtn, {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.3,
      });
    }
  });
});

if (window.innerWidth >= 768) {
  /////////// GSAP animation for the top section
  document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // window.addEventListener("load", () => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    // Top bar slide from top
    tl.from(".top-bar", {
      y: -100,
      duration: 0.8,
      opacity: 0,
    })

      // Fade in contact info (email + phone)
      .from(
        ".contact-info > div",
        {
          opacity: 0,
          y: 20,
          stagger: 0.2,
          duration: 0.6,
        },
        "-=0.3"
      )

      // Social icons staggered bounce in
      .from(
        ".social-icons a",
        {
          opacity: 0,
          scale: 0.5,
          y: -10,
          stagger: 0.2,
          duration: 0.5,
        },
        "-=0.5"
      );
    // });

    // Hover animation for social icons
    document.querySelectorAll(".top-bar-social-media-icon").forEach((icon) => {
      icon.addEventListener("mouseenter", () => {
        gsap.to(icon, { scale: 1.2, duration: 0.3, ease: "back.out(1.7)" });
      });
      icon.addEventListener("mouseleave", () => {
        gsap.to(icon, { scale: 1, duration: 0.3 });
      });
    });
  });

  /////////// GSAP animation for the navbar section
  document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // Slide-in navbar on page load
    gsap.from(".sticky-top", {
      y: -30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });

    // Logo + Title Animation
    gsap.from(".sticky-top .d-inline-flex", {
      x: -20,
      opacity: 0,
      duration: 0.8,
      delay: 0.3,
      ease: "power2.out",
    });

    // Animate nav links with subtle upward motion
    gsap.from(".sticky-top .nav-link", {
      opacity: 0,
      y: 10,
      duration: 0.6,
      delay: 0.4,
      stagger: 0.1,
      ease: "power2.out",
    });

    // Add shadow on scroll for sticky navbar (optional)
    const navbar = document.querySelector(".sticky-top");
    window.addEventListener("scroll", () => {
      if (window.scrollY > 20) {
        navbar.classList.add("shadow-sm");
      } else {
        navbar.classList.remove("shadow-sm");
      }
    });
  });

  /////////// GSAP animation for the hero-section
  document.addEventListener("DOMContentLoaded", () => {
    // const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    // Animate hero section elements in sequence
    const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 1 } });

    tl.from(".hero-section .small-text", {
      opacity: 0,
      y: 30,
    })
      .from(
        ".hero-section h1",
        {
          opacity: 0,
          y: 40,
        },
        "-=0.7"
      )
      .from(
        ".hero-section .hero-section-para",
        {
          opacity: 0,
          y: 30,
        },
        "-=0.6"
      )
      .from(
        ".hero-section .hero-section-book-a-service",
        {
          opacity: 1,
          // y: 20,
          scale: 1,
        },
        "-=0.5"
      );
  });

  /////////// GSAP animation for the About us section
  document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    const aboutTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".about-section",
        start: "top 80%", // when the section enters viewport
        toggleActions: "play none none none",
      },
    });

    // Animate left image (image2.jpg)
    aboutTimeline.from(".about-img:nth-child(1)", {
      opacity: 0,
      x: -50,
      duration: 1,
      ease: "power3.out",
    });

    // Animate right image (image3.jpg)
    aboutTimeline.from(
      ".about-img:nth-child(2)",
      {
        opacity: 0,
        x: 50,
        duration: 1,
        ease: "power3.out",
      },
      "-=0.8"
    ); // slight overlap

    // Animate text block
    aboutTimeline.from(
      ".text-div-aboutus h6",
      {
        opacity: 0,
        y: 20,
        duration: 0.6,
      },
      "-=0.4"
    );

    aboutTimeline.from(".text-div-aboutus .section-heading", {
      opacity: 0,
      y: 30,
      duration: 0.6,
    });

    aboutTimeline.from(".text-div-aboutus .p1-aboutus", {
      opacity: 0,
      y: 20,
      duration: 0.5,
    });

    aboutTimeline.from(".text-div-aboutus .p2-aboutus", {
      opacity: 0,
      y: 20,
      duration: 0.5,
    });

    aboutTimeline.from(".explore-aboutus", {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: "back.out(1.7)",
    });

    const exploreBtn = document.querySelector(".explore-aboutus");
  });

  /////////// GSAP for the Our services section
  document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // Animate section headings
    gsap.from("#services .section-names", {
      scrollTrigger: {
        trigger: "#services",
        start: "top 85%",
      },
      opacity: 0,
      y: -40,
      skewY: 5,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from("#services .section-heading", {
      scrollTrigger: {
        trigger: "#services",
        start: "top 80%",
      },
      opacity: 0,
      y: 40,
      skewY: -3,
      duration: 1,
      delay: 0.2,
      ease: "power3.out",
    });

    // Animate each service card (image + content stagger)
    document
      .querySelectorAll("#services .service-card")
      .forEach((card, index) => {
        const image = card.querySelector("img");
        const title = card.querySelector(".service-title");
        const text = card.querySelector(".service-text");

        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
          opacity: 0,
          y: 60,
          duration: 1.1,
          delay: index * 0.15,
          ease: "power3.out",
        });

        // Subtle image zoom reveal
        gsap.from(image, {
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
          },
          scale: 1.2,
          opacity: 0,
          duration: 1,
          delay: index * 0.15 + 0.2,
          ease: "power2.out",
        });

        // Text fade-up
        gsap.from([title, text], {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
          opacity: 0,
          y: 20,
          duration: 1,
          delay: index * 0.15 + 0.3,
          stagger: 0.1,
          ease: "power2.out",
        });
      });

    // Animate See More button
    gsap.from("#services .btn-see-more", {
      scrollTrigger: {
        trigger: "#services .btn-see-more",
        start: "top 95%",
      },
      scale: 0.6,
      opacity: 0,
      duration: 0.9,
      delay: 0.2,
      ease: "elastic.out(1, 0.5)",
    });

    // Hover lift on cards
    document.querySelectorAll(".service-card").forEach((card) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          y: -6,
          scale: 1.015,
          duration: 0.3,
          ease: "power2.out",
        });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, { y: 0, scale: 1, duration: 0.3, ease: "power2.out" });
      });
    });
  });

  /////////// GSAP for the Why choose us
  document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    // Animate heading
    gsap.from("#ourteam .section-names, #ourteam .section-heading", {
      scrollTrigger: {
        trigger: "#ourteam",
        start: "top 85%",
      },
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power2.out",
      stagger: 0.15,
    });

    // Animate each block (image + content)
    gsap.utils
      .toArray("#ourteam .why-choose-us-block")
      .forEach((block, index) => {
        const image = block.querySelector("img");
        const text = block.querySelector("h3");
        const paragraph = block.querySelector("p");
        const link = block.querySelector("a");

        gsap.from([image, text, paragraph, link], {
          scrollTrigger: {
            trigger: block,
            start: "top 85%",
          },
          opacity: 0,
          y: 40,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
        });
      });
  });

  /////////// GSAP for the FAQ section
  document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    // Animate FAQ heading
    gsap.from("#faq .section-names, #faq .section-heading", {
      scrollTrigger: {
        trigger: "#faq",
        start: "top 85%",
      },
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power2.out",
      stagger: 0.15,
    });

    // Animate each FAQ accordion item
    gsap.utils.toArray("#faq .accordion-item").forEach((item, i) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: "top 90%",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: i * 0.1,
        ease: "power2.out",
      });
    });
  });

  /////////// GSAP for the Testimonial section
  document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    // Animate Testimonial Heading
    gsap.from(
      ".testimonial-section .section-names, .testimonial-section .section-heading",
      {
        scrollTrigger: {
          trigger: ".testimonial-section",
          start: "top 85%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.2,
      }
    );

    // Animate each testimonial card (Swiper slides)
    gsap.utils.toArray(".swiper-slide").forEach((slide, index) => {
      gsap.from(slide, {
        scrollTrigger: {
          trigger: slide,
          start: "top 90%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 50,
        duration: 1,
        delay: index * 0.05,
        ease: "power2.out",
      });
    });
  });

  /////////// GSAP for the Get in touch section
  document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    // Animate contact section box
    gsap.from(".contact-box", {
      scrollTrigger: {
        trigger: ".contact-section",
        start: "top 80%",
      },
      y: 80,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
    });

    // Stagger form elements
    gsap.from(
      ".contact-box input, .contact-box select, .contact-box textarea, .contact-box button",
      {
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.15,
        delay: 0.3,
      }
    );

    gsap.from(".contact-section .overlay", {
      scrollTrigger: {
        trigger: ".contact-section",
        start: "top 90%",
      },
      opacity: 0,
      duration: 1,
      ease: "power1.out",
    });

    // Optional subtle scale animation for button hover
    const button = document.querySelector(".get-in-touch-button");
    if (button) {
      button.addEventListener("mouseenter", () => {
        gsap.to(button, { scale: 1.05, duration: 0.3, ease: "power2.out" });
      });
      button.addEventListener("mouseleave", () => {
        gsap.to(button, { scale: 1, duration: 0.3, ease: "power2.out" });
      });
    }
  });

  /////////// GSAP for the footer section
  document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // Animate each footer column on scroll with stagger
    gsap.from(".footer .row > div", {
      scrollTrigger: {
        trigger: ".footer",
        start: "top 90%",
      },
      opacity: 0,
      y: 50,
      duration: 1.2,
      ease: "power3.out",
      stagger: 0.2,
    });

    // Animate bottom copyright row
    gsap.from(".footer hr, .footer .d-md-flex", {
      scrollTrigger: {
        trigger: ".footer",
        start: "top 90%",
      },
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power2.out",
      delay: 0.8,
    });
  });
}
