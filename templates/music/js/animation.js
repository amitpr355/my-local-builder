window.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth >= 768) { // animations tablet aur desktop par hi dikhenge
      
    gsap.registerPlugin(ScrollTrigger);
    
    // ✅ HERO SECTION
  
    gsap.from(".text-area h1", {
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out"
    });
  
    gsap.from(".text-area p", {
      y: 30,
      opacity: 0,
      delay: 0.4,
      duration: 1,
      ease: "power2.out"
    });
  
   
      
  
   
  
    // ✅ MEDIA GALLERY SECTION
  
    gsap.from("#media-gallery h2", {
      scrollTrigger: "#media-gallery h2",
      y: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });
  
    gsap.from("#media-gallery p", {
      scrollTrigger: "#media-gallery p",
      y: 20,
      opacity: 0,
      delay: 0.2,
      duration: 1,
      ease: "power2.out"
    });
  
    gsap.from(".tall-video", {
      scrollTrigger: ".tall-video",
      scale: 0.9,
      opacity: 0,
      duration: 1,
      ease: "power2.out"
    });
  
    gsap.from("#media-gallery .col-md-5 .ratio-16x9", {
      scrollTrigger: "#media-gallery .col-md-5",
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.3,
      ease: "power2.out"
    });

       // ✅ VISION AND MISSION
 
  gsap.from("#vision-and-mission h2", {
    scrollTrigger: "#vision-and-mission h2",
    y: -40,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
  });

  gsap.from("#vision-and-mission p", {
    scrollTrigger: "#vision-and-mission p",
    y: -20,
    opacity: 0,
    delay: 0.2,
    duration: 1,
    ease: "power2.out"
  });


  gsap.from(".vision-cards-wrapper .vision-card", {
    scrollTrigger: ".vision-cards-wrapper",
    opacity: 0,
    y: 40,
    scale: 0.95,
    duration: 1,
    stagger: 0.2,
    ease: "power2.out"
  });

   // ✅ OUR PROGRAMS

   gsap.from("#our-programs h2", {
    scrollTrigger: "#our-programs h2",
    x: -50,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
  });
  
  gsap.from("#our-programs .primary-btn", {
    scrollTrigger: "#our-programs .primary-btn",
    x: 50,
    opacity: 0,
    delay: 0.3,
    duration: 1,
    ease: "power2.out"
  });
  
  // ✅ CHOOSE US
  gsap.from("#choose-us img", {
    scrollTrigger: "#choose-us img",
    x: -100,
    opacity: 0,
    duration: 1.2,
    ease: "power2.out"
  });


  gsap.from("#choose-us h2", {
    scrollTrigger: "#choose-us h2",
    x: 100,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  });

  gsap.from("#choose-us p", {
    scrollTrigger: "#choose-us p",
    x: 100,
    opacity: 0,
    delay: 0.2,
    duration: 1,
    ease: "power2.out"
  });


  gsap.from("#choose-us .choose-us-list li", {
    scrollTrigger: "#choose-us .choose-us-list",
    y: 30,
    opacity: 0,
   
    ease: "power2.out"
  });

   // ✅ CHOOSE US
   gsap.from("#programs h2", {
    scrollTrigger: "#programs h2",
    y: -50,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  });

  // ✅ Animate Cards (Staggered)
 


// ✅OUR EXPERTS
  gsap.from("#our-experts h2", {
    scrollTrigger: "#our-experts h2",
    x: -50,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  });

 
  gsap.from("#our-experts p", {
    scrollTrigger: "#our-experts p",
    x: 50,
    opacity: 0,
    delay: 0.2,
    duration: 1,
    ease: "power3.out"
  });


  gsap.from("#our-experts .primary-btn", {
    scrollTrigger: "#our-experts .primary-btn",
    y: 30,
    opacity: 0,
    delay: 0.4,
    duration: 0.8,
    ease: "back.out(1.7)"
  });



  gsap.from("#about-us .bg-purple", {
    scrollTrigger: "#about-us .bg-purple",
    x: -100,
    opacity: 0,
    duration: 1.2,
    ease: "power2.out"
  });

  // ✅ Instructor Info (image + name)
  gsap.from("#about-us .bg-purple .d-flex", {
    scrollTrigger: "#about-us .bg-purple .d-flex",
    y: 30,
    opacity: 0,
    delay: 0.3,
    duration: 1,
    ease: "power2.out"
  });

  // ✅ Right Testimonial Card
  gsap.from("#about-us .right-card", {
    scrollTrigger: "#about-us .right-card",
    x: 100,
    opacity: 0,
    duration: 1.2,
    ease: "power2.out"
  });

  // ✅ Card Button
  gsap.from("#about-us .right-card .primary-btn", {
    scrollTrigger: "#about-us .right-card .primary-btn",
    scale: 0.8,
    opacity: 0,
    delay: 0.5,
    duration: 0.8,
    ease: "back.out(1.7)"
  });


  gsap.from("#faq .dashed-purple-border h4", {
    scrollTrigger: "#faq .dashed-purple-border h4",
    x: -50,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  });

  // ✅ Animate Form Fields (staggered)
  gsap.from("#faq form .form-control, #faq form .form-label", {
    scrollTrigger: "#faq form",
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out"
  });

  // ✅ Animate Submit Button
  gsap.from("#faq form .secondary-btn", {
    scrollTrigger: "#faq form .secondary-btn",
    scale: 0.9,
    opacity: 0,
    delay: 0.3,
    duration: 0.8,
    ease: "back.out(1.7)"
  });

  // ✅ Animate FAQ Heading
  gsap.from("#faq h2", {
    scrollTrigger: "#faq h2",
    x: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  });

  // ✅ Animate Accordion Items
  gsap.from("#faq .accordion-item", {
    scrollTrigger: "#faq .accordion",
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out"
  });

  gsap.from("#newsletter img", {
    scrollTrigger: "#newsletter img",
    x: -80,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out"
  });

  // ✅ Heading Animation
  gsap.from("#newsletter h2", {
    scrollTrigger: "#newsletter h2",
    x: 80,
    opacity: 0,
    duration: 1.2,
    delay: 0.2,
    ease: "power3.out"
  });

  // ✅ Input + Button Animation (staggered)
  gsap.from("#newsletter input", {
    scrollTrigger: "#newsletter form",
    y: 30,
    opacity: 0,
    duration: 0.8,
    delay: 0.3,
    stagger: 0.2,
    ease: "power2.out"
  });

  gsap.from("#footer h4, #footer p", {
    scrollTrigger: "#footer h4",
    x: -50,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
  });

  // ✅ Social Icons (staggered)
  gsap.from("#footer .social-icons a", {
    scrollTrigger: "#footer .social-icons",
    opacity: 0,
    scale: 0.8,
    stagger: 0.15,
    duration: 0.6,
    ease: "back.out(1.7)"
  });

  // ✅ All Footer Columns (Quick Links, Courses, Contact)
  gsap.from("#footer .col-md-2, #footer .col-md-3", {
    scrollTrigger: "#footer .col-md-2",
    y: 40,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power2.out"
  });

  // // ✅ Footer Bottom Text
  // gsap.from("#footer .footer-bottom", {
  //   scrollTrigger: "#footer .footer-bottom",
  //   opacity: 0,
  //   y: 20,
  //   duration: 1,
  //   delay: 0.3,
  //   ease: "power2.out"
  // });
  }});
  