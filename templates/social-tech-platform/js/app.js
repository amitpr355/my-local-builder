// nav secition toggle
const _cb = document.getElementById("nav-toggle");
const _btn = document.querySelector("#site-nav .menu-btn");
if (_cb && _btn) {
  const sync = () =>
    _btn.setAttribute("aria-expanded", _cb.checked ? "true" : "false");
  _cb.addEventListener("change", sync);
  sync();
}
// sticky nav functionality
(function () {
  const nav = document.querySelector(".site-nav");
  if (!nav) return;

  const threshold = 10; // px

  function onScroll() {
    if (window.scrollY > threshold) nav.classList.add("is-sticky");
    else nav.classList.remove("is-sticky");
  }

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
})();
// toggle typeing mode
(function () {
  const el = document.getElementById("hero-typer");
  const caret = document.querySelector("#social-hero .caret");
  if (!el) return;

  // Add more phrases to loop through if you like
  const phrases = [" Analytics", "Specialist", "Manager"];
  const typeSpeed = 150; // ms per character when typing
  const backSpeed = 55; // ms per character when deleting
  const holdFull = 1100; // pause when word is complete
  const holdEmpty = 500; // pause when cleared before next word

  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (mq.matches) {
    el.textContent = phrases[0];
    caret?.remove();
    return;
  }

  let p = 0; // phrase index
  let i = 0; // character index
  let deleting = false;

  function tick() {
    const word = phrases[p];
    el.textContent = word.slice(0, i);

    if (!deleting && i < word.length) {
      i++;
      return setTimeout(tick, typeSpeed);
    }

    if (!deleting && i === word.length) {
      deleting = true;
      return setTimeout(tick, holdFull);
    }

    if (deleting && i > 0) {
      i--;
      return setTimeout(tick, backSpeed);
    }

    // i === 0 and deleting finished → next phrase
    deleting = false;
    p = (p + 1) % phrases.length;
    setTimeout(tick, holdEmpty);
  }

  tick();

  // If user toggles reduced-motion after load
  mq.addEventListener?.("change", (e) => {
    if (e.matches) {
      el.textContent = phrases[p] || phrases[0];
      caret?.remove();
    }
  });
})();
// FAQ accordion behavior
(function () {
  const group = document.querySelector("#faq .faq-list");
  if (!group) return;

  // Ensure only one <details> is open at a time
  group.addEventListener(
    "toggle",
    function (ev) {
      const current = ev.target;
      if (!(current instanceof HTMLDetailsElement)) return;
      if (!current.open) return; // only act when an item is being opened

      group.querySelectorAll("details.faq[open]").forEach((d) => {
        if (d !== current) d.open = false; // close the others
      });
    },
    true
  ); // use capture to catch the event reliably

  // Optional: normalize on load (if multiple are marked open in HTML)
  const opened = group.querySelectorAll("details.faq[open]");
  if (opened.length > 1) {
    opened.forEach((d, i) => {
      if (i) d.open = false;
    });
  }
})();
// back to top btn
const backToTopBtn = document.getElementById("backToTopBtn");

window.addEventListener(
  "scroll",
  () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  },
  { passive: true }
);
// gsap animation
if (window.innerWidth > 768) {
  document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // Social Hero headline animation
    gsap.from("#social-hero .hero-head", {
      opacity: 0,
      y: 80,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#social-hero .hero-head",
        start: "top 80%",
      },
    });

    // Cards + person image stagger
    gsap.from("#social-hero .visual-grid > *", {
      opacity: 0,
      y: 60,
      duration: 1,
      ease: "power2.out",
      stagger: 0.2,
      scrollTrigger: {
        trigger: "#social-hero .visual-grid",
        start: "top 85%",
      },
    });

    // Floating icons animation
    gsap.from("#social-hero .icon, #social-hero .icon-2", {
      opacity: 0,
      scale: 0.5,
      rotation: 45,
      duration: 0.8,
      ease: "back.out(1.7)",
      stagger: 0.2,
      scrollTrigger: {
        trigger: "#social-hero",
        start: "top 70%",
      },
    });

    // Social icons fade-up
    gsap.from("#social-hero .socials-icon li", {
      opacity: 0,
      y: 40,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#social-hero .socials-icon",
        start: "top 90%",
      },
    });

    // Trusted brands text
    gsap.from("#trusted-brands .trusted-text", {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#trusted-brands .trusted-text",
        start: "top 85%",
      },
    });

    // Brand logos scale-in stagger
    gsap.from("#trusted-brands .brand-item", {
      opacity: 0,
      scale: 0.5,
      duration: 0.8,
      ease: "back.out(1.7)",
      stagger: 0.15,
      scrollTrigger: {
        trigger: "#trusted-brands .brands-grid",
        start: "top 80%",
      },
    });
  });

  /* ======================
       SERVICES SECTION
    ====================== */
  // Services heading
  gsap.from("#services .services-head", {
    opacity: 0,
    y: 60,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#services .services-head",
      start: "top 85%",
    },
  });

  // Service cards stagger
  gsap.from("#services .svc-card", {
    opacity: 0,
    y: 50,
    duration: 0.9,
    ease: "power2.out",
    stagger: 0.2,
    scrollTrigger: {
      trigger: "#services .cards",
      start: "top 80%",
    },
  });

  /* ======================
       HISTORY SECTION
    ====================== */
  // Arrow image
  gsap.from("#history .arrow-img img", {
    opacity: 0,
    x: -80,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#history .arrow-img",
      start: "top 85%",
    },
  });

  // Left rail
  gsap.from("#history .left-rail", {
    opacity: 0,
    x: -60,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#history .left-rail",
      start: "top 85%",
    },
  });

  // Right copy
  gsap.from("#history .copy", {
    opacity: 0,
    x: 60,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#history .copy",
      start: "top 85%",
    },
  });

  /* ======================
       INSIGHT DEMO SECTION
    ====================== */
  // Stage person
  gsap.from("#insight-demo .person", {
    opacity: 0,
    x: -80,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#insight-demo .person",
      start: "top 85%",
    },
  });

  // Chart plate
  gsap.from("#insight-demo .plate", {
    opacity: 0,
    x: 80,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#insight-demo .plate",
      start: "top 85%",
    },
  });

  // Floating KPI card
  gsap.from("#insight-demo .kpi", {
    opacity: 0,
    y: -50,
    duration: 1,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: "#insight-demo .kpi",
      start: "top 85%",
    },
  });

  // Floating social icons (Twitter, TikTok)
  gsap.from("#insight-demo .fa-brands", {
    opacity: 0,
    scale: 0.5,
    rotation: 90,
    duration: 0.8,
    stagger: 0.2,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: "#insight-demo .stage",
      start: "top 85%",
    },
  });

  // Tiny note
  gsap.from("#insight-demo .tiny-note", {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#insight-demo .tiny-note",
      start: "top 90%",
    },
  });

  // Testimonial card
  gsap.from("#reach .quote-card", {
    opacity: 0,
    x: -80,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#reach .quote-card",
      start: "top 85%",
    },
  });

  // Person image
  gsap.from("#reach .person img", {
    opacity: 0,
    x: 80,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#reach .person",
      start: "top 85%",
    },
  });

  // Floating social icons
  gsap.from("#reach .person .fa-brands", {
    opacity: 0,
    scale: 0.5,
    rotation: 90,
    duration: 0.8,
    stagger: 0.2,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: "#reach .person",
      start: "top 85%",
    },
  });

  // Tiny note
  gsap.from("#reach .tiny-note", {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#reach .tiny-note",
      start: "top 90%",
    },
  });

  /* ======================
       FAQ SECTION
    ====================== */
  gsap.from("#faq .faq-head", {
    opacity: 0,
    y: 60,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#faq .faq-head",
      start: "top 85%",
    },
  });

  gsap.from("#faq .faq", {
    opacity: 0,
    y: 40,
    duration: 0.8,
    stagger: 0.15,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#faq .faq-list",
      start: "top 85%",
    },
  });

  /* ======================
       FOOTER SECTION
    ====================== */
  // Left block (brand + newsletter)
  gsap.from("#footer .footer-left", {
    opacity: 0,
    y: -80,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#footer .footer-left",
      start: "top 90%",
    },
  });

  // Right block (heading + links)
  gsap.from("#footer .footer-right", {
    opacity: 0,
    y: 80,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#footer .footer-right",
      start: "top 90%",
    },
  });

  // Bottom strip
  gsap.from("#footer .foot-bottom", {
    opacity: 0,
    y: 40,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#footer .foot-bottom",
      start: "top 95%",
    },
  });

  // Footer socials stagger
  gsap.from("#footer .socials li", {
    opacity: 0,
    scale: 0.5,
    duration: 0.7,
    stagger: 0.15,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: "#footer .socials",
      start: "top 95%",
    },
  });
}
