/*
Copyright 2017 Ziadin Givan

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

https://github.com/givanz/Vvvebjs
*/

//Snippets from https://bootsnipp.com/license

Vvveb.BlocksGroup["Bootstrap"] = [
    "bootstrap4/zigrow-cta-1",
    "bootstrap4/zigrow-cta-2",
    "bootstrap4/zigrow-cta-3",
    "bootstrap4/zigrow-contact-1",
    "bootstrap4/zigrow-contact-2",
    "bootstrap4/zigrow-contact-3",
    "bootstrap4/zigrow-contact-4",
    "bootstrap4/zigrow-contact-5",
    "bootstrap4/zigrow-contact-6",
    "bootstrap4/zigrow-contact-7",
    "bootstrap4/zigrow-contact-8",
    "bootstrap4/zigrow-portfolio-1",
    "bootstrap4/zigrow-portfolio-2",
    "bootstrap4/zigrow-portfolio-3",
    "bootstrap4/zigrow-portfolio-4",
    "bootstrap4/zigrow-portfolio-5",
    "bootstrap4/zigrow-about-1",
    "bootstrap4/zigrow-about-2",
    "bootstrap4/zigrow-about-3",
    "bootstrap4/zigrow-client-1",
    "bootstrap4/zigrow-client-2",
    "bootstrap4/zigrow-client-3",
    "bootstrap4/zigrow-faq-1",
    "bootstrap4/zigrow-faq-2",
    "bootstrap4/zigrow-faq-3",
    "bootstrap4/zigrow-hero-1",
    "bootstrap4/zigrow-hero-2",
    "bootstrap4/zigrow-hero-3",
    "bootstrap4/zigrow-hero-4",
    "bootstrap4/zigrow-hero-5",
    "bootstrap4/zigrow-pricing-1",
    "bootstrap4/zigrow-pricing-2",
    "bootstrap4/zigrow-pricing-3",
    "bootstrap4/zigrow-pricing-4",
    "bootstrap4/zigrow-team-1",
    "bootstrap4/zigrow-team-2",
    "bootstrap4/zigrow-team-3",
    "bootstrap4/zigrow-team-4",
    "bootstrap4/zigrow-team-5",
    "bootstrap4/zigrow-product-1",
    "bootstrap4/zigrow-product-2",
    "bootstrap4/zigrow-product-3",
    "bootstrap4/zigrow-product-4",
    "bootstrap4/zigrow-footer-1",
    "bootstrap4/zigrow-footer-2",
    "bootstrap4/zigrow-footer-3",
    "bootstrap4/zigrow-parallax-1",
    "bootstrap4/zigrow-parallax-2",
    "bootstrap4/zigrow-design-1",
    "bootstrap4/zigrow-design-2",
    "bootstrap4/zigrow-design-3",
    "bootstrap4/zigrow-service-1",
    "bootstrap4/zigrow-service-2",
    "bootstrap4/zigrow-service-3",
    "bootstrap4/zigrow-service-4",
];

// CTA Blocks
Vvveb.Blocks.add("bootstrap4/zigrow-cta-1", {
    name: "Cta",
    category: "cta",
    image: "https://i.postimg.cc/Ss47Vz3q/Screenshot-2025-11-13-182413.png",
    html: ` <section id="zigrow-cta-1" data-section="zigrow-cta-1" class="zigrow-cta-1 py-6">
      <div class="help-box">
        <h1 class="mb-5">
          Let Me Help You Overshoot Your Goals in the Right Ways.
        </h1>
        <a href="#" class="rounded-0 btn-cta" data-btn="cta">Start Now</a>
      </div>
       <style>
      .py-6 {
        padding: 3rem 0;
      }
      .zigrow-cta-1{
        background-color: var(--primary-colors, #76b86b);
        color: white;
        height: 50vh;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .zigrow-cta-1 .help-box {
        max-width: 600px;
        text-align: center;
      }
      .zigrow-cta-1 .help-box .btn-cta {
        border-radius: 0%;
        background-color: var(--primary-colors, #76b86b);
        color: white;
        padding: 0.5rem 1.5rem;
        font-weight: 400;
        border: 1px solid white;
        text-decoration: none;
      }
      .zigrow-cta-1 .help-box .btn-cta:hover {
        background-color: white;
        color: var(--primary-colors, #76b86b);
      }
    </style>
    </section>`,
});

Vvveb.Blocks.add("bootstrap4/zigrow-cta-2", {
    name: "Cta",
    category: "cta",
    image: "https://i.postimg.cc/8CSyrXRv/Screenshot-2025-11-13-183415.png",
    html: `   <section id="zigrow-cta-2" data-section="zigrow-cta-2" class="zigrow-cta-2  py-6">
      <div class="bg-img"></div>
      <div class="overlay"></div>

      <div class="container">
        <div class="help-text-box">
          <h1>Precision-Driven Manufacturing for Every Industry.</h1>
          <p>
            We deliver high-quality components, engineered with accuracy, speed,
            and unmatched craftsmanship— built to support your production goals.
          </p>
          <a href="tel:+9123456789">Get in touch</a>
        </div>
      </div>
        <style>
      .py-6{
        padding: 3rem 0;
      }
      .zigrow-cta-2  {
        position: relative;
        width: 100%;
        height: 90vh;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }
      .zigrow-cta-2  .bg-img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
       background: url(https://i.postimg.cc/MG9V0r7m/2.webp) no-repeat center center/cover;
        z-index: 1;
        pointer-events: none;
      }
      .zigrow-cta-2  .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        z-index: 2;
        pointer-events: none;
      }
      .zigrow-cta-2  .container {
        position: relative;
        z-index: 3;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
      }
      .zigrow-cta-2  .help-text-box {
        color: #fff;
        text-align: center;
        max-width: 800px;
        max-width: 780px;
        margin: 0 auto;
        pointer-events: painted;
      }
      .zigrow-cta-2  .help-text-box h1 {
        font-size: 2.5rem;
        font-weight: 700;
        line-height: 1.3;
        margin-bottom: 20px;
      }
      .zigrow-cta-2  .help-text-box p {
        font-size: 1.1rem;
        margin-bottom: 30px;
        color: #ddd;
      }
      .zigrow-cta-2  .help-text-box a {
        background-color:var(--primary-colors, #facc15);
        border-radius: 20px;
        border: none;
        text-decoration: none;
        color: black;
        padding: 0.5rem 1.6rem;
      }
      .zigrow-cta-2  .help-text-box a:hover {
        background-color: var(--primary-colors, #facc15);
      }
      @media (max-width: 991.98px) {
        .zigrow-cta-2  .help-text-box h1 {
          font-size: 2rem;
        }
        .zigrow-cta-2  .help-text-box p {
          font-size: 1rem;
        }
      }
      @media (max-width: 575.98px) {
        .zigrow-cta-2  .help-text-box {
          padding: 0 15px;
        }
        .zigrow-cta-2  .help-text-box h1 {
          font-size: 1.6rem;
        }
        .zigrow-cta-2  .help-text-box p {
          font-size: 0.95rem;
        }
        .zigrow-cta-2  .help-text-box a {
          padding: 10px 25px;
          font-size: 0.95rem;
        }
      }
    </style>
    </section>`,
});
Vvveb.Blocks.add("bootstrap4/zigrow-cta-3", {
    name: "Cta",
    category: "cta",
    image: "https://i.postimg.cc/d3kX9kDz/Screenshot-2025-11-13-184057.png",
    html: ` <section class="zigrow-cta-3 " data-section="zigrow-cta-3" id="zigrow-cta-3">
      <div class="zigrow-cta-3-overlay">
        <div class="container">
          <div class="footer-container-cta-3 py-6">
            <h2 class="zigrow-cta-3-title">Ready to Take the Next Step?</h2>
            <p class="zigrow-cta-3-text">
              We’re here to support you with reliable solutions crafted for your
              goals.
            </p>
            <a href="#contact" class="zigrow-cta-3-button" data-btn="cta">Contact Us</a>
          </div>
        </div>
      </div>
       <style>
      .py-6 {
        padding: 3rem 0;
      }
      .zigrow-cta-3  {
        background: url(https://i.postimg.cc/v8r548PN/12.webp) center center/cover no-repeat;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        height: 80vh;
      }
      .footer-container-cta-3 {
        text-align: center;
        pointer-events: painted;
      }
      .zigrow-cta-3  .zigrow-cta-3-overlay {
        background: rgba(0, 0, 0, 0.4);
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        text-align: center;
        pointer-events: none;
      }
      .zigrow-cta-3  .zigrow-cta-3-title {
        font-size: 1.8rem;
        font-weight: 700;
        color: #fff;
        margin-bottom: 1rem;
      }
      @media (min-width: 768px) {
        .zigrow-cta-3  .zigrow-cta-3-title {
          font-size: 2.5rem;
        }
      }
      .zigrow-cta-3 .zigrow-cta-3-text {
        font-size: 1rem;
        color: #f5f5f5;
        max-width: 600px;
        margin: 0 auto 2rem;
      }
      @media (min-width: 768px) {
        .zigrow-cta-3 .zigrow-cta-3-text {
          font-size: 1.1rem;
        }
      }
      .zigrow-cta-3 .zigrow-cta-3-button {
        display: inline-block;
        background-color: var(--primary-colors, #ff7f32);
        color: #fff;
        padding: 0.75rem 1.75rem;
        border-radius: 2rem;
        font-size: 1rem;
        font-weight: 600;
        text-decoration: none;
        transition: all 0.3s ease;
      }
      .zigrow-cta-3 .zigrow-cta-3-button:hover {
        box-shadow: 0 0 20px var(--primary-colors, #ff7f32);
      }
    </style>
    </section>`,
});

// Contact Form
Vvveb.Blocks.add("bootstrap4/zigrow-contact-1", {
    name: "Contact-1",
    category: "contact",
    image: "https://i.postimg.cc/762jKSJ4/Screenshot-2025-11-15-161322.png",

    html: `
<section
  class="zigrow-contact-1 py-6"
  id="zigrow-contact-1"
  data-section="zigrow-contact-1"
>
  <div class="container">
    <div class="newsletter-wrap text-center">
      <p class="newsletter-subtitle">LET'S KEEP IN TOUCH</p>
      <h2 class="newsletter-title">Subscribe to our newsletter</h2>
      <p class="newsletter-text">
        Stay updated with our latest news, offers, and helpful insights.
      </p>

      <form
        action="http://127.0.0.1:8000/api/forms/submit"
        method="post"
        data-zigrow-form
        class="newsletter-form"
      >
        <input type="hidden" name="domain" value="" />
        <input type="hidden" name="form_key" value="newsletter" />
        <input type="hidden" name="page_url" value="" />
        <input type="hidden" name="_company" value="" />

        <div form-question-zigrow>
          <label>Email Address</label>
          <input
            type="email"
            name="newsletter_email"
            placeholder="Enter your email address"
            required
          />
        </div>

        <button type="submit">Subscribe</button>
      </form>
    </div>
  </div>

  <style>
    .zigrow-contact-1 {
      background: #f8f8f8;
    }

    .py-6 {
      padding: 3rem 0;
    }

    .zigrow-contact-1 .newsletter-wrap {
      max-width: 640px;
      margin: 0 auto;
    }

    .zigrow-contact-1 .newsletter-subtitle {
      font-size: 0.9rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      color: var(--primary-colors, #111111);
      margin-bottom: 0.5rem;
    }

    .zigrow-contact-1 .newsletter-title {
      font-size: clamp(1.8rem, 1.5rem + 1vw, 2.5rem);
      line-height: 1.2;
      color: #111111;
      margin-bottom: 0.75rem;
    }

    .zigrow-contact-1 .newsletter-text {
      color: var(--secondary-colors, #666666);
      margin-bottom: 1.5rem;
    }

    .zigrow-contact-1 .newsletter-form {
      display: grid;
      gap: 1rem;
      max-width: 520px;
      margin: 0 auto;
    }

    .zigrow-contact-1 .newsletter-form div[form-question-zigrow] {
      display: grid;
      gap: 0.35rem;
      text-align: left;
    }

    .zigrow-contact-1 .newsletter-form label {
      font-size: 0.92rem;
      font-weight: 600;
      color: #222222;
      margin: 0;
    }

    .zigrow-contact-1 .newsletter-form input {
      width: 100%;
      border: 1px solid #dddddd;
      border-radius: 6px;
      padding: 0.85rem 1rem;
      font-size: 0.95rem;
      outline: none;
      background: #ffffff;
    }

    .zigrow-contact-1 .newsletter-form input:focus {
      border-color: #999999;
    }

    .zigrow-contact-1 .newsletter-form button {
      width: fit-content;
      justify-self: center;
      border: 0;
      padding: 0.8rem 1.5rem;
      border-radius: 999px;
      background: var(--primary-colors, #111111);
      color: #ffffff;
      font-weight: 600;
      cursor: pointer;
    }
  </style>

  <script>
    (function () {
      const forms = Array.from(document.querySelectorAll("[data-zigrow-form]"));
      if (!forms.length) return;

      function serializeForm(form) {
        const fd = new FormData(form);
        const raw = {};
        for (const [name, value] of fd.entries()) {
          const el = form.elements[name];
          const isGroup = el && el.length && el[0] && el[0].type === "checkbox";
          if (isGroup) {
            if (!raw[name]) raw[name] = [];
            raw[name].push(value === "" ? true : value);
          } else {
            raw[name] = value;
          }
        }
        return raw;
      }

      function pickPrimaryValue(raw) {
        if (raw.newsletter_email && String(raw.newsletter_email).trim()) {
          return String(raw.newsletter_email).trim();
        }
        if (raw.email && String(raw.email).trim()) {
          return String(raw.email).trim();
        }
        return "";
      }

      forms.forEach((form) => {
        const domainInput = form.querySelector('input[name="domain"]');
        const pageUrlInput = form.querySelector('input[name="page_url"]');
        if (domainInput) domainInput.value = location.host;
        if (pageUrlInput) pageUrlInput.value = location.href;

        let msgContainer = form.querySelector(".form-submit-message");
        if (!msgContainer) {
          msgContainer = document.createElement("div");
          msgContainer.className = "form-submit-message mt-2 text-sm";
          form.appendChild(msgContainer);
        }

        form.addEventListener("submit", async (e) => {
          e.preventDefault();

          const submitBtn = form.querySelector('[type="submit"]');
          if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.dataset._oldText = submitBtn.innerText;
            submitBtn.innerText = "Submitting...";
          }

          msgContainer.innerText = "";
          msgContainer.style.color = "";

          try {
            const raw = serializeForm(form);
            const body = new URLSearchParams();
            body.set(
              "domain",
              form.querySelector('input[name="domain"]')?.value || location.host
            );
            body.set(
              "form_key",
              form.querySelector('input[name="form_key"]')?.value || "newsletter"
            );
            body.set(
              "page_url",
              form.querySelector('input[name="page_url"]')?.value || location.href
            );
            body.set("payload", JSON.stringify(raw));

            const primary = pickPrimaryValue(raw);
            if (primary) body.set("value", primary);

            if (raw._company) body.set("_company", raw._company);

            const res = await fetch(form.action, {
              method: "POST",
              headers: { Accept: "application/json" },
              body,
            });

            const data = await res.json().catch(() => ({}));
            if (res.ok && (data.ok ?? true)) {
              form.reset();
              msgContainer.innerText = "✅ Thanks! Your request has been submitted.";
              msgContainer.style.color = "#28a745";
            } else {
              msgContainer.innerText =
                "❌ " + (data.message || ("Failed (HTTP " + res.status + ")"));
              msgContainer.style.color = "#dc3545";
            }
          } catch (err) {
            console.error(err);
            msgContainer.innerText = "❌ Something went wrong. Please try again.";
            msgContainer.style.color = "#dc3545";
          } finally {
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.innerText = submitBtn.dataset._oldText || "Subscribe";
            }
          }
        });
      });
    })();
  </script>
</section>
`,
});
Vvveb.Blocks.add("bootstrap4/zigrow-contact-2", {
    name: "Contact-2",
    category: "contact",
    image: "https://i.postimg.cc/SNfRZMcW/Screenshot-2025-11-15-162121.png",
    html: `    <section id="zigrow-contact-2" data-section="zigrow-contact-2" class="zigrow-contact-2 py-6">
      <div class="container">
        <!-- Heading Section -->
        <div class="row g-4 zigrow-contact-2-head">
          <div class="col-12 col-lg-6 left">
            <h5>Sustainability</h5>
            <h1>Transform Communities<br />Across the Globe</h1>
          </div>

          <div class="col-12 col-lg-6 right">
            <p>
              Your content will appear here Add relevant text to complete this
              section A short description Customize it based on your needs This
              area is reserved for your real content Replace it with your
              message.
            </p>
          </div>
        </div>

        <!-- Offices Cards Grid -->
        <div class="row g-4">
          <div class="col-12 col-md-6 col-lg-4">
            <div class="office-card">
              <h4>New Delhi</h4>
              <p class="address">
                E-123, ABC Plaza, XYZ Street, New Delhi - 110077
              </p>
              <a href="#" class="direction">
                Direction <i class="bi bi-arrow-right" data-icon="arrow-right"></i>
              </a>
            </div>
          </div>

          <div class="col-12 col-md-6 col-lg-4">
            <div class="office-card">
              <h4>Bengaluru</h4>
              <p class="address">E-123, ABC Plaza, 110077</p>
              <a href="#" class="direction">
                Direction <i class="bi bi-arrow-right" data-icon="arrow-right"></i>
              </a>
            </div>
          </div>

          <div class="col-12 col-md-6 col-lg-4">
            <div class="office-card">
              <h4>Haryana</h4>
              <p class="address">E-123, XYZ Street, New Delhi - 110077</p>
              <a href="#" class="direction">
                Direction <i class="bi bi-arrow-right" data-icon="arrow-right"></i>
              </a>
            </div>
          </div>
        </div>

        <!-- CTA Button -->
        <div class="cta-wrap">
          <a href="#" class="cta-btn" data-btn="cta">View Our Offices</a>
        </div>
      </div>
        <style>
      .py-6 {
        padding: 3rem 0;
      }
      /* SECTION BASE --------------------------*/
      .zigrow-contact-2 {
        background: var(--text-light, #ffffff);
        color: #1c2b45;
      }

      /* HEADINGS ------------------------------*/
      .zigrow-contact-2 .zigrow-contact-2-head {
        margin-bottom: clamp(24px, 6vw, 56px);
      }

      .zigrow-contact-2 .zigrow-contact-2-head h5 {
        margin: 0 0 10px;
        font-size: 1rem;
        font-weight: 700;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        color: var(--primary-colors, #feb909);
        opacity: 0.9;
      }

      .zigrow-contact-2 .zigrow-contact-2-head h1 {
        margin: 0;
        font-weight: 800;
        line-height: 1.1;
        font-size: clamp(1.5rem, 5vw, 2.5rem);
        color: #1c2b45;
      }

      .zigrow-contact-2 .zigrow-contact-2-head .right p {
        margin: 0;
        font-size: clamp(14px, 1.6vw, 16px);
        line-height: 1.8;
        color: var(--secondary-colors, #595f6b);
      }

      /* OFFICE CARD ----------------------------*/
      .zigrow-contact-2 .office-card {
        background: #fff;
        border: 1px solid rgba(0, 0, 0, 0.08);
        border-radius: 6px;
        padding: clamp(20px, 3.2vw, 40px);
        min-height: 220px;
        display: grid;
        align-content: start;
        row-gap: 10px;
        transition: box-shadow 180ms ease, transform 180ms ease;
      }

      .zigrow-contact-2 .office-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 28px rgba(0, 0, 0, 0.08);
      }

      .zigrow-contact-2 .office-card h4 {
        margin: 0 0 2px;
        font-size: clamp(18px, 2.4vw, 22px);
        font-weight: 800;
        color: #1c2b45;
      }

      .zigrow-contact-2 .office-card .address {
        margin: 0;
        color: var(--secondary-colors, #595f6b);
        font-size: clamp(14px, 1.6vw, 16px);
      }

      .zigrow-contact-2 .office-card .direction {
        margin-top: 18px;
        display: inline-flex;
        align-items: center;
        gap: 10px;
        font-weight: 700;
        text-transform: uppercase;
        font-size: 13px;
        letter-spacing: 0.4px;
        text-decoration: none;
        color: rgba(28, 43, 69, 0.9);
      }

      .zigrow-contact-2 .office-card .direction:hover {
        color: var(--territory-colors, #1c2b45);
      }

      /* CTA BUTTON ------------------------------*/
      .zigrow-contact-2 .cta-wrap {
        display: grid;
        place-items: center;
        margin-top: clamp(28px, 6vw, 60px);
      }

      .zigrow-contact-2 .cta-btn {
        display: inline-block;
        padding: 12px 28px;
        background: var(--primary-colors, #feb909);
        color: #1b1b1b;
        border-radius: 4px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        text-decoration: none;
        transition: transform 140ms ease, box-shadow 140ms ease;
      }

      .zigrow-contact-2 .cta-btn:hover {
        transform: translateY(-1px);
        box-shadow: 0 10px 22px rgba(254, 185, 9, 0.35);
      }

      /* MOBILE ADJUSTMENTS ----------------------*/
      @media (max-width: 576px) {
        .zigrow-contact-2 .zigrow-contact-2-head h1 {
          font-size: 32px;
        }
      }
    </style>
    </section>`,
});

Vvveb.Blocks.add("bootstrap4/zigrow-contact-3", {
    name: "Contact-3",
    category: "contact",
    image: "https://i.postimg.cc/nLTDSSjw/Screenshot-2025-11-20-155027.png",

    html: `  <section id="zigrow-contact-3" data-section="zigrow-contact-3" class="zigrow-contact-3 py-6">
      <div class="container">
        <div class="row g-4 grid">
          <!-- Left: Quote Form -->
          <div class="faq-left col-12 col-lg-6">
            <div class="quote-form">
              <h3>Request a Quote</h3>
              <p>Ready to Work Together? Build a project with us!</p>

              <form
                action="http://127.0.0.1:8000/api/forms/submit"
                method="post"
                data-zigrow-form
                class="contact-form"
              >
                <input type="hidden" name="domain" value="" />
                <input type="hidden" name="form_key" value="contact" />
                <input type="hidden" name="page_url" value="" />
                <input type="hidden" name="_company" value="" />

                <div form-question-zigrow>
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div form-question-zigrow>
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                <div form-question-zigrow>
                  <label>Subject</label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Enter the subject"
                  />
                </div>

                <div form-question-zigrow>
                  <label>Message</label>
                  <textarea
                    name="message"
                    placeholder="Enter your message"
                    rows="5"
                  ></textarea>
                </div>

                <button type="submit">Send Message</button>
              </form>
            </div>
          </div>

          <!-- Right: FAQ -->
          <div class="faq-right col-12 col-lg-6">
            <div class="faq-section">
              <h6 class="sub-title">Learn More From</h6>
              <h3>Frequently Asked Questions</h3>

              <div class="faq-item">
                <h6>1. How to create cities and communities that solve?</h6>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus
                  leo.
                </p>
              </div>

              <div class="faq-item">
                <h6>2. Construction of the winning ₹374.4 crore?</h6>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus
                  leo.
                </p>
              </div>

              <div class="faq-item">
                <h6>3. How to create cities and communities that solve?</h6>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus
                  leo.
                </p>
              </div>

              <div class="faq-item">
                <h6>4. How to create cities and communities that solve?</h6>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus
                  leo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>
        .zigrow-contact-3 {
          background-color: #f0eeee;
          margin-top: 5rem;
        }

        .py-6 {
          padding: 3rem 0;
        }

        @media (min-width: 768px) {
          .zigrow-contact-3 .grid {
            align-items: center;
          }
        }

        .zigrow-contact-3 .faq-left {
          position: relative;
        }

        .zigrow-contact-3 .quote-form {
          background-color: var(--territory-colors, #1c2b45);
          color: var(--text-light, #ffffff);
          padding: 2rem 1.5rem;
          border-radius: 6px;
          width: 100%;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        }

        @media (min-width: 768px) {
          .zigrow-contact-3 .quote-form {
            padding: 3rem 2.5rem;
            width: 95%;
            position: relative;
            top: -5rem;
          }
        }

        .zigrow-contact-3 .quote-form h3 {
          font-size: clamp(1.5rem, 1.2rem + 1vw, 2rem);
          margin-bottom: 0.5rem;
        }

        .zigrow-contact-3 .quote-form p {
          opacity: 0.9;
          margin-bottom: 1.25rem;
        }

        .zigrow-contact-3 .quote-form form {
          display: grid;
          gap: 1rem;
        }

        .zigrow-contact-3 .quote-form div[form-question-zigrow] {
          display: grid;
          gap: 0.45rem;
        }

        .zigrow-contact-3 .quote-form form label {
          font-size: 0.95rem;
          font-weight: 600;
          color: #ffffff;
          margin: 0;
        }

        .zigrow-contact-3 .quote-form form input,
        .zigrow-contact-3 .quote-form form textarea {
          width: 100%;
          background-color: #fff;
          border: 0;
          border-radius: 4px;
          padding: 0.9rem 1rem;
          font-size: 0.95rem;
          color: #111827;
          outline: none;
          transition: box-shadow 0.15s ease, transform 0.02s ease;
        }

        .zigrow-contact-3 .quote-form form input:focus,
        .zigrow-contact-3 .quote-form form textarea:focus {
          box-shadow: 0 0 0 3px rgba(254, 185, 9, 0.35);
        }

        .zigrow-contact-3 .quote-form form textarea {
          resize: vertical;
          min-height: 80px;
        }

        .zigrow-contact-3 .quote-form form button {
          display: inline-block;
          width: fit-content;
          background-color: var(--primary-colors, #feb909);
          color: var(--territory-colors, #1c2b45);
          border: 0;
          border-radius: 0.2rem;
          padding: 0.7rem 2rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          cursor: pointer;
          transition: filter 0.15s ease, transform 0.05s ease;
        }

        .zigrow-contact-3 .quote-form form button:hover {
          filter: brightness(0.95);
        }

        .zigrow-contact-3 .quote-form form button:active {
          transform: translateY(1px);
        }

        .zigrow-contact-3 .faq-right .faq-section {
          padding-inline: 0;
        }

        .zigrow-contact-3 .faq-right .faq-section .sub-title {
          color: var(--primary-colors, #feb909);
          font-weight: 600;
          letter-spacing: 0.5px;
          margin-bottom: 0.25rem;
        }

        .zigrow-contact-3 .faq-right .faq-section h3 {
          font-size: clamp(1.6rem, 1.2rem + 1.2vw, 2.2rem);
          font-weight: 800;
          margin-bottom: 1.25rem;
          color: #0f172a;
        }

        .zigrow-contact-3 .faq-right .faq-section .faq-item {
          margin-bottom: 1.25rem;
        }

        .zigrow-contact-3 .faq-right .faq-section .faq-item h6 {
          font-size: 1rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 0.35rem;
        }

        .zigrow-contact-3 .faq-right .faq-section .faq-item p {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--secondary-colors, #595f6b);
        }

        @media (max-width: 768px) {
          .zigrow-contact-3 {
            margin-top: 0;
            padding: 0;
          }

          .zigrow-contact-3 .quote-form {
            position: static;
            top: 0;
            border-radius: 0;
            box-shadow: none;
          }
        }
      </style>

      <script>
        (function () {
          const forms = Array.from(
            document.querySelectorAll("[data-zigrow-form]")
          );
          if (!forms.length) return;

          function serializeForm(form) {
            const fd = new FormData(form);
            const raw = {};
            for (const [name, value] of fd.entries()) {
              const el = form.elements[name];
              const isGroup =
                el && el.length && el[0] && el[0].type === "checkbox";
              if (isGroup) {
                if (!raw[name]) raw[name] = [];
                raw[name].push(value === "" ? true : value);
              } else {
                raw[name] = value;
              }
            }
            return raw;
          }

          function pickPrimaryValue(raw) {
            if (raw.email && String(raw.email).trim())
              return String(raw.email).trim();
            if (raw.phone && String(raw.phone).trim())
              return String(raw.phone).trim();
            if (raw.name && String(raw.name).trim())
              return String(raw.name).trim();
            if (raw.message && String(raw.message).trim())
              return String(raw.message).trim();
            return "";
          }

          forms.forEach((form) => {
            const domainInput = form.querySelector('input[name="domain"]');
            const pageUrlInput = form.querySelector('input[name="page_url"]');
            if (domainInput) domainInput.value = location.host;
            if (pageUrlInput) pageUrlInput.value = location.href;

            let msgContainer = form.querySelector(".form-submit-message");
            if (!msgContainer) {
              msgContainer = document.createElement("div");
              msgContainer.className = "form-submit-message";
              msgContainer.style.marginTop = "10px";
              form.appendChild(msgContainer);
            }

            form.addEventListener("submit", async (e) => {
              e.preventDefault();

              const submitBtn = form.querySelector('button[type="submit"]');
              const originalBtnText = submitBtn ? submitBtn.textContent : "";
              if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = "Submitting...";
              }

              msgContainer.textContent = "";
              msgContainer.style.color = "";

              const raw = serializeForm(form);
              const primaryValue = pickPrimaryValue(raw);

              const payload = {
                domain: raw.domain || location.host,
                form_key: raw.form_key || "contact",
                page_url: raw.page_url || location.href,
                primary_value: primaryValue,
                form_data: raw,
              };

              try {
                const res = await fetch(form.action, {
                  method: form.method || "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(payload),
                });

                const data = await res.json().catch(() => ({}));

                if (!res.ok) {
                  throw new Error(
                    data.message || "Something went wrong while submitting."
                  );
                }

                msgContainer.textContent =
                  data.message || "Form submitted successfully!";
                msgContainer.style.color = "green";
                form.reset();

                const d = form.querySelector('input[name="domain"]');
                const p = form.querySelector('input[name="page_url"]');
                if (d) d.value = location.host;
                if (p) p.value = location.href;
              } catch (err) {
                msgContainer.textContent =
                  err.message || "Failed to submit form.";
                msgContainer.style.color = "red";
              } finally {
                if (submitBtn) {
                  submitBtn.disabled = false;
                  submitBtn.textContent = originalBtnText;
                }
              }
            });
          });
        })();
      </script>
    </section>`,
});

Vvveb.Blocks.add("bootstrap4/zigrow-contact-4", {
    name: "Contact-4",
    category: "contact",
    image: "https://i.postimg.cc/ht9Rc9pR/contact-4.png",
    html: `  <section
      id="zigrow-contact-4"
      data-section="zigrow-contact-4"
      class="zigrow-contact-4 py-6"
    >
      <div class="container">
        <div class="row g-4 location-wrapper">
          <!-- Left Content -->
          <div class="location-text col-12 col-lg-6">
            <h2>LOCATION <br />& SCHEDULE</h2>
            <span class="divider"></span>
            <p>
              Donec ultricies urna vitae risus vehicula bibendum. Morbi interdum
              odio id sapien pharetra, vel auctor velit accumsan.
            </p>
          </div>

          <!-- Right Map -->
          <div class="map-container text-center location-map col-12 col-lg-6">
            <a
              href="https://www.google.com/maps/search/?api=1&query=12.894370090902344%2C77.6343217148211"
              target="_blank"
              class="btn btn-directions mb-3" data-btn="directions"
            >
              GET DIRECTIONS <i class="bi bi-arrow-right-short" data-icon="arrow-right-short"></i>
            </a>

            <div data-component-maps style="width: 100%; height: 350px">
              <iframe
                frameborder="0"
                src="https://maps.google.com/maps?q=12.894370090902344%2C77.6343217148211&z=14&t=q&output=embed"
                width="100%"
                height="100%"
                style="width: 100%; height: 100%; left: 0"
                loading="lazy"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
         <style>
      .py-6 {
        padding: 3rem 0;
      }
      .zigrow-contact-4 {
        background-color: var(--primary-colors, #9b2c2c);
        color: #fff;
      }
      .zigrow-contact-4 .location-wrapper {
        align-items: center;
      }
      @media (max-width: 768px) {
        .zigrow-contact-4 .location-wrapper {
          grid-template-columns: 1fr;
          text-align: center;
        }
      }
      .zigrow-contact-4 .location-text h2 {
        font-size: 3rem;
        font-weight: 700;
        line-height: 1.2;
      }
      .zigrow-contact-4 .location-text .divider {
        width: 50px;
        height: 4px;
        background-color: var(--territory-colors, #d4b24d);
        margin: 1rem 0;
      }
      .zigrow-contact-4 .location-text p {
        font-size: 1rem;
        line-height: 1.6;
        max-width: 500px;
      }

      .btn-directions{
        color: white ;
      }
      @media (max-width: 768px) {
        .zigrow-contact-4 .location-text p {
          margin: 0 auto;
        }
      }
      @media (max-width: 768px) {
        .zigrow-contact-4 .location-text h2 {
          font-size: 2rem;
        }
        .zigrow-contact-4 .location-text .divider {
          margin: 1rem auto;
        }
      }
      .zigrow-contact-4 .location-map iframe {
        width: 100%;
        height: 350px;
        border-radius: 8px;
        box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.25);
      }
    </style>
    </section>`,
});

Vvveb.Blocks.add("bootstrap4/zigrow-contact-5", {
    name: "Contact-5",
    category: "contact",
    image: "https://i.postimg.cc/9XgmBcfQ/contact-1.png",

    html: `<section
  class="zigrow-contact-5 py-6"
  data-section="zigrow-contact-5"
  id="zigrow-contact-5"
>
  <div class="container">
    <!-- Heading -->
    <div class="contact-heading">
      <h2 class="contact-title">WANT TO TRAIN WITH ME?</h2>
      <p class="contact-subtitle">
        Feel free to contact me if you want to train with me.
      </p>
    </div>

    <!-- Card -->
    <div class="contact-card">
      <div class="row g-0">
        <!-- Left panel -->
        <div class="col-12 col-lg-4">
          <div class="contact-left">
            <div class="contact-left-inner">
              <div class="contact-left-content">
                <p class="contact-left-title">Contact Information</p>

                <p class="contact-info-item">
                  <i class="bi bi-telephone-fill" data-icon="phone"></i>
                  +91-9123456789
                </p>

                <p class="contact-info-item">
                  <i class="bi bi-envelope-fill" data-icon="email"></i>
                  yourname@domainname.com
                </p>

                <p class="contact-info-item">
                  <i class="bi bi-geo-alt-fill" data-icon="location"></i>
                  E-123, ABC Plaza, XYZ Street, New Delhi - 110077
                </p>

                <div class="contact-social">
                  <a href="#"
                    ><i class="bi bi-twitter-x" data-icon="twitter"></i
                  ></a>
                  <a href="#"
                    ><i class="bi bi-facebook" data-icon="facebook"></i
                  ></a>
                  <a href="#"
                    ><i class="bi bi-instagram" data-icon="instagram"></i
                  ></a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right panel -->
        <div class="col-12 col-lg-8">
          <div class="contact-right">
            <form
              action="http://127.0.0.1:8000/api/forms/submit"
              method="post"
              data-zigrow-form
              class="contact-form"
            >
              <input type="hidden" name="domain" value="" />
              <input type="hidden" name="form_key" value="contact" />
              <input type="hidden" name="page_url" value="" />
              <input type="hidden" name="_company" value="" />

              <div form-question-zigrow>
                <label>First Name</label>
                <input
                  type="text"
                  name="first_name"
                  placeholder="Enter your first name"
                  required
                />
              </div>

              <div form-question-zigrow>
                <label>Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  placeholder="Enter your last name"
                  required
                />
              </div>

              <div form-question-zigrow>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div form-question-zigrow>
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  inputmode="tel"
                  pattern="^\\+?[0-9\\s\\-]{7,15}$"
                  placeholder="Enter your phone number here"
                  required
                />
              </div>

              <div form-question-zigrow>
                <label>Meeting Date</label>
                <input
                  type="date"
                  name="meeting_date"
                  required
                />
              </div>

              <div form-question-zigrow>
                <label>Meeting Time</label>
                <input
                  type="time"
                  name="meeting_time"
                  required
                />
              </div>

              <div form-question-zigrow>
                <label>Message</label>
                <textarea
                  name="message"
                  rows="3"
                  placeholder="Enter your message"
                  required
                ></textarea>
              </div>

              <button type="submit">Book a Call</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

  <style>
    .zigrow-contact-5 {
      background-color: #f5f5f5;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
        sans-serif;
    }

    .py-6 {
      padding: 3rem 0;
    }

    .zigrow-contact-5 .contact-heading {
      margin-bottom: 2rem;
    }

    .zigrow-contact-5 .contact-title {
      font-size: 2rem;
      font-weight: 700;
      letter-spacing: 0.03em;
    }

    .zigrow-contact-5 .contact-subtitle {
      color: var(--secondary-colors, #777);
      margin-top: 0.3rem;
      font-size: 0.95rem;
    }

    .zigrow-contact-5 .contact-card {
      background-color: #ffffff;
      box-shadow: 0 10px 35px rgba(0, 0, 0, 0.08);
      border-radius: 0;
      overflow: hidden;
    }

    .zigrow-contact-5 .contact-left {
      background-color: var(--primary-colors, #111111);
      color: #ffffff;
      height: 100%;
      min-height: 320px;
    }

    .zigrow-contact-5 .contact-left-inner {
      display: table;
      width: 100%;
      height: 100%;
      padding: 2.5rem 2.5rem 2.5rem 2.5rem;
    }

    .zigrow-contact-5 .contact-left-content {
      display: table-cell;
      vertical-align: middle;
    }

    .zigrow-contact-5 .contact-left-title {
      font-size: 1.2rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
    }

    .zigrow-contact-5 .contact-info-item {
      margin-bottom: 0.5rem;
      font-size: 0.95rem;
    }

    .zigrow-contact-5 .contact-info-item i {
      margin-right: 0.6rem;
    }

    .zigrow-contact-5 .contact-social {
      margin-top: 1.8rem;
    }

    .zigrow-contact-5 .contact-social a {
      color: #ffffff;
      text-decoration: none;
      font-size: 1.1rem;
      margin-right: 0.9rem;
      transition: color 0.3s ease;
    }

    .zigrow-contact-5 .contact-social a:hover {
      color: #bbbbbb;
    }

    .zigrow-contact-5 .contact-right {
      padding: 2.5rem 2.75rem;
      background-color: #ffffff;
    }

    .zigrow-contact-5 .contact-right form {
      display: grid;
      gap: 1rem;
    }

    .zigrow-contact-5 .contact-right div[form-question-zigrow] {
      display: grid;
      gap: 0.35rem;
    }

    .zigrow-contact-5 .contact-right form label {
      display: block;
      font-size: 0.9rem;
      color: #999999;
      margin: 0;
    }

    .zigrow-contact-5 .contact-right form input,
    .zigrow-contact-5 .contact-right form textarea {
      width: 100%;
      border: none;
      border-bottom: 1px solid #d3d3d3;
      border-radius: 0;
      padding: 0.55rem 0;
      font-size: 0.9rem;
      box-shadow: none;
      background: transparent;
      outline: none;
    }

    .zigrow-contact-5 .contact-right form input:focus,
    .zigrow-contact-5 .contact-right form textarea:focus {
      border-bottom-color: #000000;
      box-shadow: none;
      outline: none;
    }

    .zigrow-contact-5 .contact-right form textarea {
      resize: vertical;
      min-height: 90px;
    }

    .zigrow-contact-5 .contact-right form button {
      display: inline-block;
      justify-self: end;
      padding: 0.7rem 2.5rem;
      background: var(
        --primary-colors,
        linear-gradient(135deg, #000000, #333333)
      );
      color: #ffffff;
      border: none;
      font-size: 0.9rem;
      text-transform: none;
      box-shadow: 0 6px 16px var(--primary-colors, rgba(0, 0, 0, 0.3));
      cursor: pointer;
    }

    .zigrow-contact-5 .contact-right form button:hover {
      background: var(
        --primary-colors,
        linear-gradient(135deg, #111111, #444444)
      );
    }

    @media (max-width: 991.98px) {
      .zigrow-contact-5 .contact-right {
        padding: 2rem 1.75rem;
      }
    }

    @media (max-width: 767.98px) {
      .zigrow-contact-5 .contact-left-inner {
        padding: 2rem 1.5rem;
      }

      .zigrow-contact-5 .contact-right {
        padding: 2rem 1.25rem 2.25rem;
      }

      .zigrow-contact-5 .contact-right form button {
        justify-self: start;
      }

      .zigrow-contact-5 .contact-title {
        font-size: 1.8rem;
      }
    }
  </style>

  <script>
    (function () {
      const forms = Array.from(document.querySelectorAll("[data-zigrow-form]"));
      if (!forms.length) return;

      function serializeForm(form) {
        const fd = new FormData(form);
        const raw = {};
        for (const [name, value] of fd.entries()) {
          const el = form.elements[name];
          const isGroup = el && el.length && el[0] && el[0].type === "checkbox";
          if (isGroup) {
            if (!raw[name]) raw[name] = [];
            raw[name].push(value === "" ? true : value);
          } else {
            raw[name] = value;
          }
        }
        return raw;
      }

      function pickPrimaryValue(raw) {
        if (raw.email && String(raw.email).trim()) {
          return String(raw.email).trim();
        }
        if (raw.phone && String(raw.phone).trim()) {
          return String(raw.phone).trim();
        }
        const nameCombo = [raw.first_name, raw.last_name]
          .filter(Boolean)
          .join(" ")
          .trim();
        if (raw.name && String(raw.name).trim()) {
          return String(raw.name).trim();
        }
        if (nameCombo) {
          return nameCombo;
        }
        if (raw.message && String(raw.message).trim()) {
          return String(raw.message).trim();
        }
        return "";
      }

      forms.forEach((form) => {
        const domainInput = form.querySelector('input[name="domain"]');
        const pageUrlInput = form.querySelector('input[name="page_url"]');
        if (domainInput) domainInput.value = location.host;
        if (pageUrlInput) pageUrlInput.value = location.href;

        let msgContainer = form.querySelector(".form-submit-message");
        if (!msgContainer) {
          msgContainer = document.createElement("div");
          msgContainer.className = "form-submit-message mt-2 text-sm";
          form.appendChild(msgContainer);
        }

        form.addEventListener("submit", async (e) => {
          e.preventDefault();

          const submitBtn = form.querySelector('[type="submit"]');
          if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.dataset._oldText = submitBtn.innerText;
            submitBtn.innerText = "Submitting...";
          }

          msgContainer.innerText = "";
          msgContainer.style.color = "";

          try {
            const raw = serializeForm(form);
            const body = new URLSearchParams();
            body.set(
              "domain",
              form.querySelector('input[name="domain"]')?.value || location.host
            );
            body.set(
              "form_key",
              form.querySelector('input[name="form_key"]')?.value || "contact"
            );
            body.set(
              "page_url",
              form.querySelector('input[name="page_url"]')?.value || location.href
            );
            body.set("payload", JSON.stringify(raw));

            const primary = pickPrimaryValue(raw);
            if (primary) body.set("value", primary);

            if (raw._company) body.set("_company", raw._company);

            const res = await fetch(form.action, {
              method: "POST",
              headers: { Accept: "application/json" },
              body,
            });

            const data = await res.json().catch(() => ({}));
            if (res.ok && (data.ok ?? true)) {
              form.reset();
              msgContainer.innerText = "✅ Thanks! Your request has been submitted.";
              msgContainer.style.color = "#28a745";
            } else {
              msgContainer.innerText =
                "❌ " + (data.message || ("Failed (HTTP " + res.status + ")"));
              msgContainer.style.color = "#dc3545";
            }
          } catch (err) {
            console.error(err);
            msgContainer.innerText = "❌ Something went wrong. Please try again.";
            msgContainer.style.color = "#dc3545";
          } finally {
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.innerText = submitBtn.dataset._oldText || "Send";
            }
          }
        });
      });
    })();
  </script>
</section>
`,
});

Vvveb.Blocks.add("bootstrap4/zigrow-contact-6", {
    name: "Contact-6",
    category: "contact",
    image: "https://i.postimg.cc/qMtkbWtp/contact-2.png",

    html: `
<section
  class="zigrow-contact-6 py-6"
  id="zigrow-contact-6"
  data-section="zigrow-contact-6"
>
  <div class="container">
    <div class="row inner-row">
      <div class="col-12 col-lg-6">
        <div class="contact-left">
          <p class="eyebrow">+ CONTACT US</p>

          <h2 class="title">Let’s discuss your cleaning needs</h2>

          <p class="lead-text">
            Faucibus commodo a aenean et sit quisque ipsum. Consequat eu id ut
            dolor felis quis. Sagittis a sapien pulvinar etiam.
          </p>

          <div class="info-list">
            <div class="row info-item">
              <div class="col-auto">
                <i
                  class="bi bi-telephone-fill info-item-icon"
                  data-icon="phone"
                ></i>
              </div>
              <div class="col info-item-text"><p>+91 12345 67859</p></div>
            </div>

            <div class="row info-item">
              <div class="col-auto">
                <i
                  class="bi bi-envelope-fill info-item-icon"
                  data-icon="email"
                ></i>
              </div>
              <div class="col info-item-text">
                <p>yourname@domainname.com</p>
              </div>
            </div>

            <div class="row info-item">
              <div class="col-auto">
                <i
                  class="bi bi-geo-alt-fill info-item-icon"
                  data-icon="location"
                ></i>
              </div>
              <div class="col info-item-text">
                <p>E-123, ABC Plaza, XYZ Street, New Delhi - 110077</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-lg-6">
        <div class="contact-form-wrapper">
          <form
            class="contact-form"
            action="http://127.0.0.1:8000/api/forms/submit"
            method="post"
            data-zigrow-form
          >
            <input type="hidden" name="domain" value="" />
            <input type="hidden" name="form_key" value="contact" />
            <input type="hidden" name="page_url" value="" />
            <input type="hidden" name="_company" value="" />

            <div form-question-zigrow>
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                required
              />
            </div>

            <div form-question-zigrow>
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
            </div>

            <div form-question-zigrow>
              <label>Country Code</label>
              <select name="country_code" required>
                <option value="IN" selected>IN</option>
                <option value="US">US</option>
                <option value="UK">UK</option>
                <option value="AU">AU</option>
              </select>
            </div>

            <div form-question-zigrow>
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                inputmode="tel"
                pattern="^\\+?[0-9\\s\\-]{7,15}$"
                placeholder="Enter your phone number here"
                required
              />
            </div>

            <div form-question-zigrow>
              <label>How can we help?</label>
              <textarea
                name="message"
                placeholder="Tell us a little about the project..."
                required
              ></textarea>
            </div>

            <button type="submit">Get In Touch</button>
          </form>
        </div>
      </div>
    </div>
  </div>

  <style>
    .zigrow-contact-6 {
      background-color: #f6f6f6;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
        sans-serif;
    }

    .py-6 {
      padding: 3rem 0;
    }

    .zigrow-contact-6 .inner-row {
      background-color: #f6f6f6;
    }

    .zigrow-contact-6 .contact-left {
      padding-right: 2.5rem;
    }

    .zigrow-contact-6 .eyebrow {
      font-size: 0.9rem;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: var(--primary-colors, #1b6042);
      font-weight: 600;
      margin-bottom: 0.4rem;
    }

    .zigrow-contact-6 .title {
      font-size: 2.1rem;
      font-weight: 700;
      color: #17163a;
      margin-bottom: 0.75rem;
    }

    .zigrow-contact-6 .lead-text {
      font-size: 1rem;
      color: var(--secondary-colors, #666a73);
      max-width: 420px;
      margin-bottom: 1.8rem;
    }

    .zigrow-contact-6 .info-list {
      margin-top: 1.25rem;
    }

    .zigrow-contact-6 .info-item {
      font-size: 0.95rem;
      color: var(--secondary-colors, #333);
      margin-bottom: 0.65rem;
    }

    .zigrow-contact-6 .info-item-icon {
      color: #17163a;
      font-size: 1.2rem;
    }

    .zigrow-contact-6 .info-item-text {
      padding-left: 0.5rem;
    }

    .zigrow-contact-6 .contact-form-wrapper {
      background-color: #f6f6f6;
    }

    .zigrow-contact-6 .contact-form {
      background-color: #f6f6f6;
      padding-left: 1.5rem;
      display: grid;
      gap: 1rem;
    }

    .zigrow-contact-6 .contact-form div[form-question-zigrow] {
      display: grid;
      gap: 0.35rem;
    }

    .zigrow-contact-6 .contact-form label {
      display: block;
      font-size: 0.86rem;
      color: #868a93;
      margin: 0;
    }

    .zigrow-contact-6 .contact-form input,
    .zigrow-contact-6 .contact-form textarea,
    .zigrow-contact-6 .contact-form select {
      width: 100%;
      border-radius: 0;
      border: 1px solid #e0e0e0;
      padding: 0.55rem 0.7rem;
      font-size: 0.9rem;
      box-shadow: none;
      background-color: #ffffff;
      outline: none;
    }

    .zigrow-contact-6 .contact-form input:focus,
    .zigrow-contact-6 .contact-form textarea:focus,
    .zigrow-contact-6 .contact-form select:focus {
      box-shadow: none;
      border-color: #1b7b55;
    }

    .zigrow-contact-6 .contact-form textarea {
      min-height: 120px;
      resize: vertical;
    }

    .zigrow-contact-6 .contact-form button {
      width: fit-content;
      padding: 0.75rem 1.5rem;
      border: 0;
      border-radius: 999px;
      background-color: var(--primary-colors, #17163a);
      color: #ffffff;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      transition: opacity 0.2s ease;
    }

    .zigrow-contact-6 .contact-form button:hover {
      opacity: 0.92;
    }

    @media (max-width: 991.98px) {
      .zigrow-contact-6 .contact-left {
        padding-right: 0;
        margin-bottom: 2rem;
      }

      .zigrow-contact-6 .contact-form {
        padding-left: 0;
      }
    }

    @media (max-width: 767.98px) {
      .zigrow-contact-6 .title {
        font-size: 1.8rem;
      }
    }
  </style>

  <script>
    (function () {
      const forms = Array.from(document.querySelectorAll("[data-zigrow-form]"));
      if (!forms.length) return;

      function serializeForm(form) {
        const fd = new FormData(form);
        const raw = {};
        for (const [name, value] of fd.entries()) {
          const el = form.elements[name];
          const isGroup = el && el.length && el[0] && el[0].type === "checkbox";
          if (isGroup) {
            if (!raw[name]) raw[name] = [];
            raw[name].push(value === "" ? true : value);
          } else {
            raw[name] = value;
          }
        }
        return raw;
      }

      function pickPrimaryValue(raw) {
        if (raw.email && String(raw.email).trim()) {
          return String(raw.email).trim();
        }
        if (raw.phone && String(raw.phone).trim()) {
          return String(raw.phone).trim();
        }
        if (raw.name && String(raw.name).trim()) {
          return String(raw.name).trim();
        }
        if (raw.message && String(raw.message).trim()) {
          return String(raw.message).trim();
        }
        return "";
      }

      forms.forEach((form) => {
        const domainInput = form.querySelector('input[name="domain"]');
        const pageUrlInput = form.querySelector('input[name="page_url"]');
        if (domainInput) domainInput.value = location.host;
        if (pageUrlInput) pageUrlInput.value = location.href;

        let msgContainer = form.querySelector(".form-submit-message");
        if (!msgContainer) {
          msgContainer = document.createElement("div");
          msgContainer.className = "form-submit-message mt-2 text-sm";
          form.appendChild(msgContainer);
        }

        form.addEventListener("submit", async (e) => {
          e.preventDefault();

          const submitBtn = form.querySelector('[type="submit"]');
          if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.dataset._oldText = submitBtn.innerText;
            submitBtn.innerText = "Submitting...";
          }

          msgContainer.innerText = "";
          msgContainer.style.color = "";

          try {
            const raw = serializeForm(form);
            const body = new URLSearchParams();
            body.set(
              "domain",
              form.querySelector('input[name="domain"]')?.value || location.host
            );
            body.set(
              "form_key",
              form.querySelector('input[name="form_key"]')?.value || "contact"
            );
            body.set(
              "page_url",
              form.querySelector('input[name="page_url"]')?.value || location.href
            );
            body.set("payload", JSON.stringify(raw));

            const primary = pickPrimaryValue(raw);
            if (primary) body.set("value", primary);

            if (raw._company) body.set("_company", raw._company);

            const res = await fetch(form.action, {
              method: "POST",
              headers: { Accept: "application/json" },
              body,
            });

            const data = await res.json().catch(() => ({}));
            if (res.ok && (data.ok ?? true)) {
              form.reset();
              msgContainer.innerText = "✅ Thanks! Your request has been submitted.";
              msgContainer.style.color = "#28a745";
            } else {
              msgContainer.innerText =
                "❌ " + (data.message || ("Failed (HTTP " + res.status + ")"));
              msgContainer.style.color = "#dc3545";
            }
          } catch (err) {
            console.error(err);
            msgContainer.innerText = "❌ Something went wrong. Please try again.";
            msgContainer.style.color = "#dc3545";
          } finally {
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.innerText = submitBtn.dataset._oldText || "Send";
            }
          }
        });
      });
    })();
  </script>
</section>
`,
});

Vvveb.Blocks.add("bootstrap4/zigrow-contact-7", {
    name: "Contact-7",
    category: "contact",
    image: "https://i.postimg.cc/28qzcgqL/contact-3.png",

    html: `
<section id="zigrow-contact-7" data-section="zigrow-contact-7" class="zigrow-contact-7 py-6">
  <div class="container">
    <div class="row align-items-center g-4">
      <!-- LEFT CONTENT -->
      <div class="col-12 col-lg-6">
        <div class="contact-copy">
          <p class="contact-eyebrow">GET IN TOUCH</p>
          <h2 class="contact-title">We’d love to hear from you</h2>
          <p class="contact-text">
            Have a question, project idea, or just want to say hello? Fill out the form and our team will get back to you.
          </p>

          <div class="contact-info-list">
            <p class="contact-info-item">
              <i class="bi bi-telephone-fill" data-icon="phone"></i>
              +91 91234 56789
            </p>
            <p class="contact-info-item">
              <i class="bi bi-envelope-fill" data-icon="email"></i>
              yourname@domainname.com
            </p>
            <p class="contact-info-item">
              <i class="bi bi-geo-alt-fill" data-icon="location"></i>
              E-123, ABC Plaza, XYZ Street, New Delhi - 110077
            </p>
          </div>
        </div>
      </div>

      <!-- RIGHT FORM -->
      <div class="col-12 col-lg-6">
        <div class="contact-form-panel">
          <form
            action="http://127.0.0.1:8000/api/forms/submit"
            method="post"
            data-zigrow-form
            class="contact-form"
          >
            <input type="hidden" name="domain" value="" />
            <input type="hidden" name="form_key" value="contact" />
            <input type="hidden" name="page_url" value="" />
            <input type="hidden" name="_company" value="" />

            <div form-question-zigrow>
              <label>Full Name</label>
              <input
                type="text"
                name="full_name"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div form-question-zigrow>
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
            </div>

            <div form-question-zigrow>
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                inputmode="tel"
                pattern="^\\+?[0-9\\s\\-]{7,15}$"
                placeholder="Enter your phone number here"
              />
            </div>

            <div form-question-zigrow>
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="Enter the subject"
              />
            </div>

            <div form-question-zigrow>
              <label>Message</label>
              <textarea
                name="message"
                placeholder="Enter your message"
                rows="5"
                required
              ></textarea>
            </div>

            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-12">
        <div class="map-container text-center location-map">
          <a
            href="https://www.google.com/maps/search/?api=1&query=12.894370090902344%2C77.6343217148211"
            target="_blank"
            class="btn btn-directions mb-3"
            data-btn="directions"
          >
            GET DIRECTIONS <i class="bi bi-arrow-right-short" data-icon="arrow-right-short"></i>
          </a>

          <div data-component-maps style="width:100%; height:350px;">
            <iframe
              frameborder="0"
              src="https://maps.google.com/maps?q=12.894370090902344%2C77.6343217148211&z=14&t=q&output=embed"
              width="100%"
              height="100%"
              style="width:100%; height:100%; left:0"
              loading="lazy"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>

  <style>
    .zigrow-contact-7 {
      background: #f7f7f7;
    }

    .zigrow-contact-7 .contact-copy {
      padding-right: 1rem;
    }

    .zigrow-contact-7 .contact-eyebrow {
      font-size: 0.9rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      color: var(--primary-colors, #111111);
      margin-bottom: 0.5rem;
    }

    .zigrow-contact-7 .contact-title {
      font-size: clamp(1.9rem, 1.5rem + 1vw, 2.7rem);
      line-height: 1.2;
      margin-bottom: 0.75rem;
      color: #111111;
    }

    .zigrow-contact-7 .contact-text {
      color: var(--secondary-colors, #666666);
      margin-bottom: 1.25rem;
      max-width: 540px;
    }

    .zigrow-contact-7 .contact-info-list {
      display: grid;
      gap: 0.75rem;
    }

    .zigrow-contact-7 .contact-info-item {
      margin: 0;
      color: #222222;
      font-size: 0.98rem;
    }

    .zigrow-contact-7 .contact-info-item i {
      margin-right: 0.6rem;
    }

    .zigrow-contact-7 .contact-form-panel {
      background: #ffffff;
      border-radius: 10px;
      padding: 1.5rem;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    }

    .zigrow-contact-7 .contact-form {
      display: grid;
      gap: 1rem;
    }

    .zigrow-contact-7 .contact-form div[form-question-zigrow] {
      display: grid;
      gap: 0.35rem;
    }

    .zigrow-contact-7 .contact-form label {
      font-size: 0.92rem;
      font-weight: 600;
      color: #222222;
      margin: 0;
    }

    .zigrow-contact-7 .contact-form input,
    .zigrow-contact-7 .contact-form textarea {
      width: 100%;
      border: 1px solid #dddddd;
      border-radius: 6px;
      padding: 0.85rem 1rem;
      font-size: 0.95rem;
      outline: none;
      background: #ffffff;
    }

    .zigrow-contact-7 .contact-form input:focus,
    .zigrow-contact-7 .contact-form textarea:focus {
      border-color: #999999;
    }

    .zigrow-contact-7 .contact-form textarea {
      min-height: 120px;
      resize: vertical;
    }

    .zigrow-contact-7 .contact-form button {
      width: fit-content;
      border: 0;
      padding: 0.8rem 1.5rem;
      border-radius: 999px;
      background: var(--primary-colors, #111111);
      color: #ffffff;
      font-weight: 600;
      cursor: pointer;
    }

    .zigrow-contact-7 .map-container {
      width: 100%;
    }

    .zigrow-contact-7 .btn-directions {
      color: inherit;
    }

    .zigrow-contact-7 .location-map iframe {
      width: 100%;
      height: 350px;
      border-radius: 8px;
      box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
      display: block;
    }

    @media (max-width: 991.98px) {
      .zigrow-contact-7 .contact-copy {
        padding-right: 0;
      }
    }
  </style>

  <script>
    (function () {
      const forms = Array.from(document.querySelectorAll("[data-zigrow-form]"));
      if (!forms.length) return;

      function serializeForm(form) {
        const fd = new FormData(form);
        const raw = {};
        for (const [name, value] of fd.entries()) {
          const el = form.elements[name];
          const isGroup = el && el.length && el[0] && el[0].type === "checkbox";
          if (isGroup) {
            if (!raw[name]) raw[name] = [];
            raw[name].push(value === "" ? true : value);
          } else {
            raw[name] = value;
          }
        }
        return raw;
      }

      function pickPrimaryValue(raw) {
        if (raw.email && String(raw.email).trim()) {
          return String(raw.email).trim();
        }
        if (raw.phone && String(raw.phone).trim()) {
          return String(raw.phone).trim();
        }
        if (raw.full_name && String(raw.full_name).trim()) {
          return String(raw.full_name).trim();
        }
        if (raw.message && String(raw.message).trim()) {
          return String(raw.message).trim();
        }
        return "";
      }

      forms.forEach((form) => {
        const domainInput = form.querySelector('input[name="domain"]');
        const pageUrlInput = form.querySelector('input[name="page_url"]');
        if (domainInput) domainInput.value = location.host;
        if (pageUrlInput) pageUrlInput.value = location.href;

        let msgContainer = form.querySelector(".form-submit-message");
        if (!msgContainer) {
          msgContainer = document.createElement("div");
          msgContainer.className = "form-submit-message mt-2 text-sm";
          form.appendChild(msgContainer);
        }

        form.addEventListener("submit", async (e) => {
          e.preventDefault();

          const submitBtn = form.querySelector('[type="submit"]');
          if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.dataset._oldText = submitBtn.innerText;
            submitBtn.innerText = "Submitting...";
          }

          msgContainer.innerText = "";
          msgContainer.style.color = "";

          try {
            const raw = serializeForm(form);
            const body = new URLSearchParams();
            body.set(
              "domain",
              form.querySelector('input[name="domain"]')?.value || location.host
            );
            body.set(
              "form_key",
              form.querySelector('input[name="form_key"]')?.value || "contact"
            );
            body.set(
              "page_url",
              form.querySelector('input[name="page_url"]')?.value || location.href
            );
            body.set("payload", JSON.stringify(raw));

            const primary = pickPrimaryValue(raw);
            if (primary) body.set("value", primary);

            if (raw._company) body.set("_company", raw._company);

            const res = await fetch(form.action, {
              method: "POST",
              headers: { Accept: "application/json" },
              body,
            });

            const data = await res.json().catch(() => ({}));
            if (res.ok && (data.ok ?? true)) {
              form.reset();
              msgContainer.innerText = "✅ Thanks! Your request has been submitted.";
              msgContainer.style.color = "#28a745";
            } else {
              msgContainer.innerText =
                "❌ " + (data.message || ("Failed (HTTP " + res.status + ")"));
              msgContainer.style.color = "#dc3545";
            }
          } catch (err) {
            console.error(err);
            msgContainer.innerText = "❌ Something went wrong. Please try again.";
            msgContainer.style.color = "#dc3545";
          } finally {
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.innerText = submitBtn.dataset._oldText || "Send Message";
            }
          }
        });
      });
    })();
  </script>
</section>
`,
});

Vvveb.Blocks.add("bootstrap4/zigrow-contact-8", {
    name: "Contact-8",
    category: "contact",
    image: "https://i.postimg.cc/0268Wh6s/contact-4.png",

    html: `
<section
  class="zigrow-contact-8 py-6"
  data-section="zigrow-contact-8"
  id="zigrow-contact-8"
>
  <div class="container">
    <div class="row unsure-row">
      <!-- LEFT: TEXT -->
      <div class="col-12 col-lg-6 mb-4 mb-lg-0">
        <div class="unsure-text-block">
          <h2 class="unsure-heading">Are you unsure about your choice?</h2>
          <p class="unsure-subtext">
            Fill out the form and our specialists will help you figure it out.
          </p>
        </div>
      </div>

      <!-- RIGHT: FORM -->
      <div class="col-12 col-lg-6">
        <div class="unsure-form-block">
          <form
            action="http://127.0.0.1:8000/api/forms/submit"
            class="unsure-form"
            method="post"
            data-zigrow-form
          >
            <input type="hidden" name="domain" value="" />
            <input type="hidden" name="page_url" value="" />
            <input type="hidden" name="form_key" value="unsure-choice" />
            <input type="hidden" name="_company" value="" />

            <div form-question-zigrow>
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                required
              />
            </div>

            <div form-question-zigrow>
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
            </div>

            <div form-question-zigrow>
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                inputmode="tel"
                pattern="^\\+?[0-9\\s\\-]{7,15}$"
                placeholder="Enter your phone number here"
                required
              />
            </div>

            <div form-question-zigrow>
              <label>Consent</label>
              <label>
                <input type="checkbox" name="consent_terms" required />
                I agree to Terms of Use and Privacy Policy
              </label>
            </div>

            <button type="submit">Send request</button>
          </form>
        </div>
      </div>
    </div>
  </div>

  <style>
    .zigrow-contact-8 {
      background-color: #fbfbfb;
    }

    .py-6 {
      padding: 3rem 0;
    }

    .zigrow-contact-8 .unsure-row {
      align-items: center;
    }

    .zigrow-contact-8 .unsure-text-block {
      max-width: 480px;
    }

    .zigrow-contact-8 .unsure-heading {
      font-size: 2.2rem;
      line-height: 1.25;
      font-weight: 600;
      margin-bottom: 0.75rem;
      color: #111111;
    }

    .zigrow-contact-8 .unsure-subtext {
      font-size: 0.98rem;
      line-height: 1.6;
      color: #666666;
    }

    .zigrow-contact-8 .unsure-form-block {
      max-width: 420px;
      margin-left: auto;
    }

    .zigrow-contact-8 .unsure-form {
      display: grid;
      gap: 1rem;
    }

    .zigrow-contact-8 .unsure-form div[form-question-zigrow] {
      display: grid;
      gap: 0.45rem;
    }

    .zigrow-contact-8 .unsure-form label {
      font-size: 0.92rem;
      color: #222222;
      margin: 0;
    }

    .zigrow-contact-8 .unsure-form input {
      width: 100%;
      padding: 0.7rem 0.85rem;
      border-radius: 0;
      border: 1px solid #e0e0e0;
      background-color: #ffffff;
      font-size: 0.95rem;
      outline: none;
      transition: border-color 0.15s ease, box-shadow 0.15s ease;
    }

    .zigrow-contact-8 .unsure-form input::placeholder {
      color: #9a9a9a;
    }

    .zigrow-contact-8 .unsure-form input:focus {
      border-color: #333333;
      box-shadow: 0 0 0 1px rgba(51, 51, 51, 0.06);
    }

    .zigrow-contact-8 .unsure-form input[type="checkbox"] {
      width: auto;
      padding: 0;
      margin-right: 0.5rem;
      vertical-align: middle;
    }

    .zigrow-contact-8 .unsure-form button {
      margin-top: 0.25rem;
      width: 100%;
      padding: 0.75rem 1rem;
      border-radius: 0;
      border: none;
      background-color: var(--primary-colors, #202326);
      color: #ffffff;
      font-size: 0.95rem;
      font-weight: 500;
      letter-spacing: 0.02em;
      text-transform: none;
      cursor: pointer;
      transition: background-color 0.15s ease, transform 0.1s ease;
    }

    .zigrow-contact-8 .unsure-form button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 14px var(--primary-colors, #202326);
    }

    .zigrow-contact-8 .unsure-form button:active {
      transform: translateY(1px);
    }

    @media (max-width: 991.98px) {
      .zigrow-contact-8 {
        padding: 3rem 0;
      }

      .zigrow-contact-8 .unsure-text-block {
        margin-bottom: 1.75rem;
      }

      .zigrow-contact-8 .unsure-heading {
        font-size: 1.9rem;
      }

      .zigrow-contact-8 .unsure-form-block {
        margin-left: 0;
      }
    }

    @media (max-width: 575.98px) {
      .zigrow-contact-8 {
        padding: 2.5rem 0;
      }

      .zigrow-contact-8 .unsure-heading {
        font-size: 1.7rem;
      }
    }
  </style>

  <script>
    (function () {
      const forms = Array.from(document.querySelectorAll("[data-zigrow-form]"));
      if (!forms.length) return;

      function serializeForm(form) {
        const fd = new FormData(form);
        const raw = {};
        for (const [name, value] of fd.entries()) {
          const el = form.elements[name];
          const isGroup = el && el.length && el[0] && el[0].type === "checkbox";
          if (isGroup) {
            if (!raw[name]) raw[name] = [];
            raw[name].push(value === "" ? true : value);
          } else {
            raw[name] = value;
          }
        }
        return raw;
      }

      function pickPrimaryValue(raw) {
        if (raw.email && String(raw.email).trim()) {
          return String(raw.email).trim();
        }
        if (raw.phone && String(raw.phone).trim()) {
          return String(raw.phone).trim();
        }
        if (raw.name && String(raw.name).trim()) {
          return String(raw.name).trim();
        }
        return "";
      }

      forms.forEach((form) => {
        const domainInput = form.querySelector('input[name="domain"]');
        const pageUrlInput = form.querySelector('input[name="page_url"]');
        if (domainInput) domainInput.value = location.host;
        if (pageUrlInput) pageUrlInput.value = location.href;

        let msgContainer = form.querySelector(".form-submit-message");
        if (!msgContainer) {
          msgContainer = document.createElement("div");
          msgContainer.className = "form-submit-message mt-2 text-sm";
          form.appendChild(msgContainer);
        }

        form.addEventListener("submit", async (e) => {
          e.preventDefault();

          const submitBtn = form.querySelector('[type="submit"]');
          if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.dataset._oldText = submitBtn.innerText;
            submitBtn.innerText = "Submitting...";
          }

          msgContainer.innerText = "";
          msgContainer.style.color = "";

          try {
            const raw = serializeForm(form);
            const body = new URLSearchParams();
            body.set(
              "domain",
              form.querySelector('input[name="domain"]')?.value || location.host
            );
            body.set(
              "form_key",
              form.querySelector('input[name="form_key"]')?.value || "unsure-choice"
            );
            body.set(
              "page_url",
              form.querySelector('input[name="page_url"]')?.value || location.href
            );
            body.set("payload", JSON.stringify(raw));

            const primary = pickPrimaryValue(raw);
            if (primary) body.set("value", primary);

            if (raw._company) body.set("_company", raw._company);

            const res = await fetch(form.action, {
              method: "POST",
              headers: { Accept: "application/json" },
              body,
            });

            const data = await res.json().catch(() => ({}));
            if (res.ok && (data.ok ?? true)) {
              form.reset();
              msgContainer.innerText = "✅ Thanks! Your request has been submitted.";
              msgContainer.style.color = "#28a745";
            } else {
              msgContainer.innerText =
                "❌ " + (data.message || ("Failed (HTTP " + res.status + ")"));
              msgContainer.style.color = "#dc3545";
            }
          } catch (err) {
            console.error(err);
            msgContainer.innerText = "❌ Something went wrong. Please try again.";
            msgContainer.style.color = "#dc3545";
          } finally {
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.innerText = submitBtn.dataset._oldText || "Send request";
            }
          }
        });
      });
    })();
  </script>
</section>
`,
});

// Portfolio Blocks
Vvveb.Blocks.add("bootstrap4/zigrow-portfolio-1", {
    name: "Portfolio-1",
    category: "portfolio",
    image: "https://i.postimg.cc/tTzRr0xp/Screenshot-2025-11-15-163043.png",
    html: `  <section id="zigrow-portfolio-1" data-section="zigrow-portfolio-1" class="zigrow-portfolio-1 py-6">
      <div class="container">
        <div class="zigrow-portfolio-1__inner">
          <!-- HEADER USING BOOTSTRAP GRID -->
          <div class="row zigrow-portfolio-1__header">
            <div class="col-12 col-lg-8">
              <div class="zigrow-portfolio-1__titles">
                <p class="zigrow-portfolio-1__eyebrow">About Founder</p>
                <h2 class="zigrow-portfolio-1__title">Our Latest Works</h2>
              </div>
            </div>
            <div class="col-12 col-lg-4 text-lg-end mt-3 mt-lg-0">
              <a href="#" class="zigrow-portfolio-1__btn" data-btn="portfolio"> View Projects </a>
            </div>
          </div>

          <!-- CARDS USING BOOTSTRAP ROW + COLS -->
          <div class="row g-3 g-md-0 zigrow-portfolio-1__grid">
            <!-- 1 card per row on mobile, 2 on sm, 4 on lg -->
            <div class="col-12 col-sm-6 col-lg-3">
              <article class="project-card">
                <div class="project-card__image-wrapper">
                  <div class="project-img-box">
                     <img
               src="/builder/img/zigrow-portfolio-images/1.webp" 
                alt="Delhi City"
                class="project-card__image"
              />
                  </div>
                  <div class="project-card__details">
                    <h5 class="project-card__name">Delhi City</h5>
                    <p class="project-card__location">India</p>
                  </div>
                </div>
              </article>
            </div>

            <div class="col-12 col-sm-6 col-lg-3">
              <article class="project-card">
                <div class="project-card__image-wrapper">
                  <div class="project-img-box">
                    <img
                src="/builder/img/zigrow-portfolio-images/2.webp" 
                alt="Mumbai City"
                class="project-card__image"
              />
                  </div>
                  <div class="project-card__details">
                    <h5 class="project-card__name">Mumbai City</h5>
                    <p class="project-card__location">India</p>
                  </div>
                </div>
              </article>
            </div>

            <div class="col-12 col-sm-6 col-lg-3">
              <article class="project-card">
                <div class="project-card__image-wrapper">
                  <div class="project-img-box">
                     <img
               src="/builder/img/zigrow-portfolio-images/3.webp" 
                alt="Ahmedabad City"
                class="project-card__image"
              />
                  </div>
                  <div class="project-card__details">
                    <h5 class="project-card__name">Ahmedabad City</h5>
                    <p class="project-card__location">India</p>
                  </div>
                </div>
              </article>
            </div>

            <div class="col-12 col-sm-6 col-lg-3">
              <article class="project-card">
                <div class="project-card__image-wrapper">
                  <div class="project-img-box">
                    <img
                src="/builder/img/zigrow-portfolio-images/4.webp" 
                alt="Bengaluru City"
                class="project-card__image"
              />
                  </div>
                  <div class="project-card__details">
                    <h5 class="project-card__name">Bengaluru City</h5>
                    <p class="project-card__location">India</p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
          <style>
      .py-6 {
        padding: 3rem 0;
      }
      :root {
        --text-light: #ffffff;
      }

      .zigrow-portfolio-1 * {
        box-sizing: border-box;
      }

      /* SECTION WRAPPER */
      .zigrow-portfolio-1 {
        /* padding: 60px 0; */
        background-color: #ffffff;
      }

      /* HEADER (no flex here, Bootstrap handles layout) */
      .zigrow-portfolio-1__header {
        padding-bottom: 32px;
        align-items: center;
      }

      .zigrow-portfolio-1__eyebrow {
        font-size: 14px;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--secondary-colors, #595f6b);
        margin: 0 0 4px;
      }

      .zigrow-portfolio-1__title {
        font-size: 32px;
        font-weight: 700;
        color: var(--territory-colors, #1c2b45);
        margin: 0;
      }

      /* BUTTON */
      .zigrow-portfolio-1__btn {
        display: inline-block;
        padding: 10px 26px;
        border-radius: 3px;
        background-color: var(--primary-colors, #feb909);
        color: var(--text-light, #ffffff);
        font-size: 13px;
        font-weight: 600;
        text-transform: uppercase;
        text-decoration: none;
        letter-spacing: 0.08em;
        border: none;
        cursor: pointer;
        transition: all 0.2s ease, transform 0.2s ease;
      }

      .zigrow-portfolio-1__btn:hover {
        transform: translateY(-1px);
        box-shadow: 0 8px 20px var(--primary-colors, #feb909);
      }

      /* GRID WRAPPER (spacing only, layout via Bootstrap row/col) */
      /* .zigrow-portfolio-1__grid {
        padding: 0;
      } */

      /* CARD */
      .project-card {
        width: 100%;
      }

      .project-card__image-wrapper {
        position: relative;
        overflow: hidden;
      }
      .project-img-box {
        text-align: center;
        width: auto;
      }
      .project-card__image {
        /* display: block; */
        height: 260px;
        max-width: 100%;
        max-height: 100%;
        object-fit: cover;
        transition: transform 0.4s ease;
      }

      /* GRADIENT OVERLAY */
      .project-card__image-wrapper::after {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(
          to top,
          rgba(0, 0, 0, 0.85),
          rgba(0, 0, 0, 0.05)
        );
        pointer-events: none;
      }

      /* TEXT OVERLAY */
      .project-card__details {
        position: absolute;
        left: 20px;
        bottom: 18px;
        color: var(--text-light, #ffffff);
        z-index: 2;
      }

      .project-card__name {
        margin: 0 0 4px;
        font-size: 18px;
        font-weight: 700;
      }

      .project-card__location {
        margin: 0;
        font-size: 13px;
        opacity: 0.9;
      }

      /* HOVER EFFECT */
      .project-card__image-wrapper:hover .project-card__image {
        transform: scale(1.06);
      }

      /* Desktop tweak: let image height auto if you want taller cards */
      @media (min-width: 992px) {
        .project-card__image {
          height: auto;
        }
      }
    </style>
    </section>`,
});
Vvveb.Blocks.add("bootstrap4/zigrow-portfolio-2", {
    name: "Portfolio-2",
    category: "portfolio",
    image: "https://i.postimg.cc/pXBWRMGT/Screenshot-2025-11-15-163941.png",
    html: ` <section class="zigrow-portfolio-2 py-6" data-section="zigrow-portfolio-2" id="zigrow-portfolio-2">
      <div class="container">
        <div class="row g-3">
          <!-- Image 1 (span 2 cols like grid-column:span 2) -->
          <div class="image-box col-12 col-md-6">
           <img
          src="/builder/img/zigrow-portfolio-images/5.webp" 
            alt="Children playing"
            class="img-1"
          />
          </div>
          <!-- Image 2 -->
          <div class="image-box col-6 col-md-3">
            <img
            src="/builder/img/zigrow-portfolio-images/6.webp"
            alt="Child in snow"
            class="img-2"
          />
          </div>
          <!-- Image 3 -->
          <div class="image-box col-6 col-md-3">
           <img
            src="/builder/img/zigrow-portfolio-images/7.webp"
            alt="Child stacking blocks"
            class="img-3"
          />
          </div>
          <!-- Image 4 -->
          <div class="image-box col-6 col-md-3">
           <img
            src="/builder/img/zigrow-portfolio-images/8.webp"
            alt="Coloring activity"
            class="img-4"
          />
          </div>
          <!-- Image 5 -->
          <div class="image-box col-6 col-md-3">
             <img
            src="/builder/img/zigrow-portfolio-images/9.webp"
            alt="Smiling child"
            class="img-5"
          />
          </div>
          <!-- Image 6 (big bottom image spanning 2 cols) -->
          <div class="image-box col-12 col-md-6">
             <img
            src="/builder/img/zigrow-portfolio-images/10.webp"
            alt="Kids with letter blocks"
            class="img-6"
          />
          </div>
        </div>
      </div>
       <style>
      .py-6{
        padding: 3rem 0;
      }
      .zigrow-portfolio-2 {
        background-color: #f3f8fb;
      }

      .gallery-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 12px;
        display: block;
      }

      /* Keep height ratio similar to grid version */
      .image-box{
        text-align: center;
      }
      .image-box img{
        max-width: 100%;
        max-height: 100%;
        object-fit: cover;
      }
      .tall,
      .normal {
        height: 100%;
      }

      @media (max-width: 768px) {
        .tall,
        .normal {
          height: auto;
        }
      }
    </style>
    </section>`,
});
Vvveb.Blocks.add("bootstrap4/zigrow-portfolio-3", {
    name: "Portfolio-3",
    category: "portfolio",
    image: "https://i.postimg.cc/DzTtxx3n/Screenshot-2025-11-15-165122.png",
    html: `  <section id="zigrow-portfolio-3" data-section="zigrow-portfolio-3" class="zigrow-portfolio-3 py-6">
      <div class="container">
        <!-- Bootstrap grid instead of CSS grid -->
        <div class="zigrow-portfolio-3-grid">
          <div class="row g-md-3">
            <div class="col-12 col-sm-6 col-lg-4 clonable-card">
              <div class="zigrow-portfolio-3-item">
                <img  src="/builder/img/zigrow-portfolio-images/11.jpg"  alt="Fine Dining" />
              </div>
            </div>

            <div class="col-12 col-sm-6 col-lg-4 clonable-card">
              <div class="zigrow-portfolio-3-item">
                <img  src="/builder/img/zigrow-portfolio-images/12.jpg"  alt="Group Eating" />
              </div>
            </div>

            <div class="col-12 col-sm-6 col-lg-4 clonable-card">
              <div class="zigrow-portfolio-3-item">
              <img
              src="/builder/img/zigrow-portfolio-images/13.jpg"
              alt="Friends Toasting"
            />
              </div>
            </div>

            <div class="col-12 col-sm-6 col-lg-4 clonable-card">
              <div class="zigrow-portfolio-3-item">
                 <img
              src="/builder/img/zigrow-portfolio-images/14.jpg"
              alt="Outdoor Dining"
            />
              </div>
            </div>

            <div class="col-12 col-sm-6 col-lg-4 clonable-card">
              <div class="zigrow-portfolio-3-item">
                <img src="/builder/img/zigrow-portfolio-images/15.jpg" alt="Korean Food" />
              </div>
            </div>

            <div class="col-12 col-sm-6 col-lg-4 clonable-card">
              <div class="zigrow-portfolio-3-item">
              <img
              src="/builder/img/zigrow-portfolio-images/16.jpg"
              alt="Restaurant Kitchen"
            />
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>
      .py-6 {
        padding: 3rem 0;
      }
      .zigrow-portfolio-3 {
        background-color: #fff;
      }

      /* Wrapper – no grid/flex here, Bootstrap handles layout */

      .zigrow-portfolio-3 .zigrow-portfolio-3-item {
        text-align: center;
        overflow: hidden;
      }

      .zigrow-portfolio-3 .zigrow-portfolio-3-item img {
        max-width: 100%;
        max-height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }

      .zigrow-portfolio-3 .zigrow-portfolio-3-item img:hover {
        transform: scale(1.05);
      }
    </style>
    </section>`,
});
Vvveb.Blocks.add("bootstrap4/zigrow-portfolio-4", {
    name: "Portfolio-4",
    category: "portfolio",
    image: "https://i.postimg.cc/Mptt7HGG/portfolio-4.png",
    html: `  <section id="zigrow-portfolio-4" data-section="zigrow-portfolio-4" class="zigrow-portfolio-4 py-6">
      <div class="container">
        <!-- Header -->
        <div class="zigrow-portfolio-4-header">
          <p class="section-top-btn">Portfolio</p>
          <h2 class="zigrow-portfolio-4-title">
            Explore my portfolio of creative Solutions
          </h2>
        </div>

        <!-- Grid using Bootstrap -->
        <div class="row g-3">
          <!-- Item 1 -->
          <div class="col-12 col-md-6 col-lg-4 clonable-card">
            <div class="zigrow-portfolio-4-wrapper">
              <img
                 src="/builder/img/zigrow-portfolio-images/17.webp"
              class="zigrow-portfolio-4-image"
              alt="zigrow-portfolio-4 item"
            />
              <div class="overlay">
                  <img
              src="/builder/img/zigrow-icon-images/zigrow-portfolio-4-portfolio-arrow-icon.svg"
                  class="arrow"
                  alt="Open project"
                />
              </div>
            </div>
          </div>

          <!-- Item 2 -->
          <div class="col-12 col-md-6 col-lg-4 clonable-card">
            <div class="zigrow-portfolio-4-wrapper">
              <img
                src="/builder/img/zigrow-portfolio-images/18.webp"
              class="zigrow-portfolio-4-image"
              alt="zigrow-portfolio-4 item"
            />
              <div class="overlay">
                 <img
                 src="/builder/img/zigrow-icon-images/zigrow-portfolio-4-portfolio-arrow-icon.svg"
                  class="arrow"
                  alt="Open project"
                />
              </div>
            </div>
          </div>

          <!-- Item 3 -->
          <div class="col-12 col-md-6 col-lg-4 clonable-card">
            <div class="zigrow-portfolio-4-wrapper">
             <img
              src="/builder/img/zigrow-portfolio-images/19.webp"
              class="zigrow-portfolio-4-image"
              alt="zigrow-portfolio-4 item"
            />
              <div class="overlay">
                 <img
                   src="/builder/img/zigrow-icon-images/zigrow-portfolio-4-portfolio-arrow-icon.svg"
                  class="arrow"
                  alt="Open project"
                />
              </div>
            </div>
          </div>

          <!-- Item 4 -->
          <div class="col-12 col-md-6 col-lg-4 clonable-card">
            <div class="zigrow-portfolio-4-wrapper">
             <img
             src="/builder/img/zigrow-portfolio-images/20.webp"
              class="zigrow-portfolio-4-image"
              alt="zigrow-portfolio-4 item"
            />
              <div class="overlay">
                 <img
              src="/builder/img/zigrow-icon-images/zigrow-portfolio-4-portfolio-arrow-icon.svg"
                    class="arrow"
                  alt="Open project"
                />
              </div>
            </div>
          </div>

          <!-- Item 5 -->
          <div class="col-12 col-md-6 col-lg-4 clonable-card">
            <div class="zigrow-portfolio-4-wrapper">
                <img
                  src="/builder/img/zigrow-portfolio-images/21.webp"
              class="zigrow-portfolio-4-image"
              alt="zigrow-portfolio-4 item"
            />
              <div class="overlay">
               <img
                     src="/builder/img/zigrow-icon-images/zigrow-portfolio-4-portfolio-arrow-icon.svg"
                  class="arrow"
                  alt="Open project"
                />
              </div>
            </div>
          </div>

          <!-- Item 6 -->
          <div class="col-12 col-md-6 col-lg-4 clonable-card">
            <div class="zigrow-portfolio-4-wrapper">
              <img
              src="/builder/img/zigrow-portfolio-images/22.webp"
              class="zigrow-portfolio-4-image"
              alt="zigrow-portfolio-4 item"
            />
              <div class="overlay">
                <img
                 src="/builder/img/zigrow-icon-images/zigrow-portfolio-4-portfolio-arrow-icon.svg"
                  class="arrow"
                  alt="Open project"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
         <style>
      .py-6 {
        padding: 3rem 0;
      }
      .zigrow-portfolio-4 {
        background-color: #ffffff;
      }

      .zigrow-portfolio-4 .zigrow-portfolio-4-header {
        margin-bottom: 1.5rem;
      }

      .zigrow-portfolio-4 .section-top-btn {
        display: inline-block;
        padding: 0.35rem 0.9rem;
        border-radius: 999px;
        font-size: 0.85rem;
        font-weight: 500;
        background-color: var(--primary-colors, #f8f9fa);
        box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.08);
        color: #222;
      }

      .zigrow-portfolio-4 .zigrow-portfolio-4-title {
        margin-top: 0.75rem;
        margin-bottom: 0;
        font-weight: 600;
        line-height: 1.4;
        font-size: clamp(1.8rem, 3vw, 2.5rem);
        color: #20252b;
      }

      /* IMAGE CARD */
      .zigrow-portfolio-4-wrapper {
        text-align: center;
        position: relative;
        overflow: hidden;
        border-radius: 0.8rem;
      }

      .zigrow-portfolio-4-image {
        max-width: 100%;
        max-height: 100%;
        object-fit: cover;
        border-radius: 0.8rem;
      }

      .overlay {
        position: absolute;
        right: 1rem;
        bottom: 1rem;
        z-index: 2;
      }

      .arrow {
        width: 80px;
        transition: transform 0.4s ease;
      }

      .arrow:hover {
        transform: scale(1.08);
      }
    </style>
    </section>`,
});
Vvveb.Blocks.add("bootstrap4/zigrow-portfolio-5", {
    name: "Portfolio-5",
    category: "portfolio",
    image: "https://i.postimg.cc/q7Rwjrhf/portfolio-5.png",
    html: ` <section id="zigrow-portfolio-5" data-section="zigrow-portfolio-5" class="zigrow-portfolio-5 py-6">
      <div class="container">
        <div class="row g-2">
          <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="zigrow-portfolio-5-wrapper">
              <div class="zigrow-portfolio-5-item">
                <img src="/builder/img/zigrow-portfolio-images/23.webp" alt="Office 1" />
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="zigrow-portfolio-5-wrapper">
              <div class="zigrow-portfolio-5-item">
                <img src="/builder/img/zigrow-portfolio-images/24.webp" alt="Office 2" />
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="zigrow-portfolio-5-wrapper">
              <div class="zigrow-portfolio-5-item">
                <img src="/builder/img/zigrow-portfolio-images/25.webp" alt="Office 3" />
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="zigrow-portfolio-5-wrapper">
              <div class="zigrow-portfolio-5-item">
                <img src="/builder/img/zigrow-portfolio-images/26.webp" alt="Office 4" />
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="zigrow-portfolio-5-wrapper">
              <div class="zigrow-portfolio-5-item">
                <img src="/builder/img/zigrow-portfolio-images/27.webp" alt="Office 5" />
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="zigrow-portfolio-5-wrapper">
              <div class="zigrow-portfolio-5-item">
                <img src="/builder/img/zigrow-portfolio-images/28.webp" alt="Office 6" />
              </div>
            </div>
          </div>
        </div>
      </div>
       <style>
      .py-6{
        padding: 3rem 0;
      }
      .zigrow-portfolio-5 {
        background-color: #f9f9f9;
      }

      /* Each image card */

      .zigrow-portfolio-5 .zigrow-portfolio-5-item {
        text-align: center;
        overflow: hidden;
        max-height: 240px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        border-radius: 8px;
      }

      .zigrow-portfolio-5 .zigrow-portfolio-5-item img {
        max-width: 100%;
        max-height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }

      .zigrow-portfolio-5 .zigrow-portfolio-5-item:hover img {
        transform: scale(1.05);
      }
    </style>
    </section>`,
});

// About Section Blocks
Vvveb.Blocks.add("bootstrap4/zigrow-about-1", {
    name: "About-1",
    category: "about-us",
    image: "https://i.postimg.cc/rprcdB8v/about1.png",
    html: `    <section id="zigrow-about-1" data-section="zigrow-about-1" class=" zigrow-about-1 py-6">
      <div class="container">
        <!-- About Me Button -->
        <p class="section-top-btn zigrow-about-1-badge">About me</p>

        <!-- Heading & Paragraph -->
        <h2 class="zigrow-about-1-title">
          Design is not just a job for me, it’s a passion that drives me
        </h2>

        <p class="zigrow-about-1-text">
          I’m Rohit, a self-taught product designer based in Boston. Four years
          ago, during my final year of university, I co-founded a mobile
          marketplace and created its entire front-end myself, teaching me how
          products are built from scratch. I build websites, mobile-first UIs,
          emails, and internal tools — all designed around everything I’d want.
        </p>

        <!-- Image + Stats Row -->
        <div class="zigrow-about-1-layout row">
          <!-- Left: Video Thumbnail -->
          <div class="zigrow-about-1-media col-lg-8 col-12">
            <div class="zigrow-about-1-media-inner">
              <div class="zigrow-about-1-img-box">
                <img
            src="/builder/img/zigrow-about-images/1.webp"
                  alt="Video thumbnail"
                  class="about-image"
                />
              </div>
              <a href="#" class="zigrow-about-1-play-btn">
                <i class="fas fa-play-circle" data-icon="play-btn"></i>
              </a>
            </div>
          </div>

          <!-- Right: Stats -->
          <div class="zigrow-about-1-stats col-lg-4 col-12">
            <div class="zigrow-about-1-stat">
              <h5 class="zigrow-about-1-stat-number">12 startups</h5>
              <small class="zigrow-about-1-stat-label">worked with</small>
            </div>
            <div class="zigrow-about-1-stat">
              <h5 class="zigrow-about-1-stat-number">5+ years</h5>
              <small class="zigrow-about-1-stat-label">experience</small>
            </div>
            <div class="zigrow-about-1-stat">
              <h5 class="zigrow-about-1-stat-number">20+ projects</h5>
              <small class="zigrow-about-1-stat-label">completed successfully</small>
            </div>
          </div>
        </div>
      </div>
          <style>
      .zigrow-about-1 {
        background-color: #ffffff;
      }
      .py-6 {
        padding: 3rem 0rem;
      }

      /* Top badge */
      .zigrow-about-1 .zigrow-about-1-badge {
        display: inline-block;
        margin-bottom: 0.75rem;
        padding: 0.35rem 0.9rem;
        border-radius: 999px;
        font-size: 0.85rem;
        font-weight: 500;
        background-color: #f8f9fa;
        box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.08);
        color: #222;
      }

      /* Heading */
      .zigrow-about-1 .zigrow-about-1-title {
        margin: 0 0 0.75rem;
        font-weight: 600;
        line-height: 1.4;
        font-size: clamp(1.8rem, 3vw, 2.5rem); /* similar to display-6 */
        color: #20252b;
      }

      /* Intro paragraph */
      .zigrow-about-1 .zigrow-about-1-text {
        max-width: 700px;
        margin: 0 0 2.5rem;
        color: #6c757d;
        font-size: 0.98rem;
        line-height: 1.7;
      }

      /* Layout: image + stats */
      .zigrow-about-1 .zigrow-about-1-layout {
        /* display: flex;
        flex-direction: column; */
        gap: 2rem;
      }
      .zigrow-about-1 .zigrow-about-1-media-inner {
        position: relative;
        border-radius: 0.8rem;
        overflow: hidden;
        box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.08);
      }
      .zigrow-about-1 .zigrow-about-1-media-inner .zigrow-about-1-img-box {
        text-align: center;
        border-radius: 0.4rem;
      }

      .zigrow-about-1 .zigrow-about-1-image {
        /* display: block; */
        max-width: 100%;
        max-height: 100%;
        object-fit: cover;
        border-radius: 0.4rem;
      }

      .zigrow-about-1 .zigrow-about-1-play-btn {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 3rem;
        color: #ffffff;
        text-decoration: none;
      }

      /* Right stats */
      .zigrow-about-1 .zigrow-about-1-stats {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 1.75rem;
        padding-left: 0.75rem; /* like ps-3 on mobile */
      }

      .zigrow-about-1 .zigrow-about-1-stat-number {
        margin: 0;
        font-weight: 600;
        font-size: clamp(1.8rem, 3vw, 2.3rem); /* similar to display-6 */
        color: #20252b;
      }

      .zigrow-about-1 .zigrow-about-1-stat-label {
        display: block;
        margin-top: 0.3rem;
        font-size: 0.75rem;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: #6c757d;
      }

      /* Media queries */
      @media (min-width: 768px) {
        .zigrow-about-1 .zigrow-about-1-layout {
          /* flex-direction: row; like align-items-center row */
          align-items: center;
          justify-content: space-between;
          gap: 3rem;
        }

        .zigrow-about-1 .zigrow-about-1-stats {
          padding-left: 2.5rem; /* like ps-md-5 */
        }
      }
    </style>
    </section>`,
});
Vvveb.Blocks.add("bootstrap4/zigrow-about-2", {
    name: "About-2",
    category: "about-us",
    image: "https://i.postimg.cc/Pxbjy1vp/about2.png",
    html: `   <section  id="zigrow-about-2" data-section="zigrow-about-2" class="zigrow-about-2 py-6">
      <div class="container">
        <!-- Background grid image -->
        <div class="bg-img-box">
          <img src="/builder/img/zigrow-icon-images/our-value-bg.png"  alt="" class="grid-bg-img" />
        </div>

        <!-- Row uses Bootstrap grid; no custom flex in CSS -->
        <div class="row g-4 zigrow-about-2-wraper">
          <!-- Left Image -->
          <div class="col-12 col-lg-5">
            <div class="zigrow-about-2-left">
              <div class="doctor-img-box">
                <img
                 src="/builder/img/zigrow-about-images/2.webp"
                  alt="Dr"
                  class="doctor-image"
                />
                <div class="star-img-box">
                  <img  src="/builder/img/zigrow-icon-images/our-value icon-a.png" alt="star-img" />
                </div>
              </div>
            </div>
          </div>

          <!-- Right Content -->
          <div class="col-12 col-lg-7">
            <div class="zigrow-about-2-right ms-lg-4">
              <h2 class="main-heading">
                Meet Dr Meera, Your <br />Certified Nutritionist
              </h2>

              <p class="zigrow-about-2-text">
                With 9+ years of experience, I specialize in designing
                science-backed nutrition plans for Weight Loss, PCOS, Diabetes,
                and Lifestyle Improvement. Holding certifications from
                [Institute Name], I help individuals build sustainable, healthy
                habits that fit their lifestyle.
              </p>

              <a href="#" class="primary-btn" data-btn="about-2">Learn More</a>

              <div class="arrow-img-box">
                <img
                  src="/builder/img/zigrow-icon-images/our-value svg.svg" 
                  alt="Arrow"
                  class="arrow-image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
       <style>
      .py-6 {
        padding: 3rem 0;
      }

      /* Section wrapper */
      .zigrow-about-2 {
        background-color: #fff;
        position: relative;
        overflow: hidden;
      }

      /* Background grid image */
      .zigrow-about-2 .bg-img-box {
        position: absolute;
        right: 15%;
        bottom: 15%;
        text-align: center;
        width: 45%;
        /* max-width: 420px; */
        pointer-events: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
        z-index: 0;
      }

      .zigrow-about-2 .grid-bg-img {
        max-width: 100%;
        max-height: 100%;
        object-fit: cover;
      }
      .zigrow-about-2 .zigrow-about-2-wraper {
        align-items: center;
      }

      /* Left: doctor image block */
      .zigrow-about-2 .zigrow-about-2-left {
        text-align: center;
        position: relative;
        z-index: 1;
      }

      .zigrow-about-2 .doctor-img-box {
        text-align: center;
        max-width: 400px;
        height: auto;
        margin: 0 auto 1.5rem;
        border-radius: 50%;
        position: relative;
      }

      .zigrow-about-2 .doctor-image {
        max-width: 100%;
        max-height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }

      /* Star icon overlay */
      .zigrow-about-2 .star-img-box {
        text-align: center;
        position: absolute;
        top: 15%;
        right: 8%;
        width: 55px;
        z-index: 2;
      }

      .zigrow-about-2 .star-img-box img {
        max-width: 100%;
        max-height: 100%;
        object-fit: cover;
      }

      /* Right: text content */
      .zigrow-about-2 .zigrow-about-2-right {
        position: relative;
        text-align: center;
        max-width: 550px;
        z-index: 1;
        margin: 0 auto;
      }

      @media (min-width: 992px) {
        .zigrow-about-2 .zigrow-about-2-right {
          text-align: start;
          margin-left: auto;
        }
      }

      .zigrow-about-2 .main-heading {
        color: #000;
        font-size: clamp(2rem, 4vw, 3.4rem);
        line-height: 1.4;
        font-weight: 700;
        margin-bottom: 1rem;
      }

      .zigrow-about-2 .zigrow-about-2-text {
        color: var(--secondary-colors, #555);
        font-size: 1.05rem;
        line-height: 1.7;
        margin-top: 0.75rem;
        margin-bottom: 2.2rem;
      }

      /* CTA button */
      .zigrow-about-2 .primary-btn {
        background: var(
          --primary-colors,
          linear-gradient(135deg, #4285f4, rgb(17.805, 101.89, 241.195))
        );
        color: #fff;
        border-radius: 28px;
        padding: 0.8rem 1.4rem;
        outline: none;
        cursor: pointer;
        border: 0;
        transition: all 0.35s ease-in-out;
        box-shadow: 0 4px 12px rgba(66, 133, 244, 0.25);
        position: relative;
        overflow: hidden;
        letter-spacing: 0.06em;
        text-decoration: none;
        font-weight: 500;
        display: inline-block;
      }

      .zigrow-about-2 .primary-btn::before {
        content: "";
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.15);
        transform: skewX(-20deg);
        transition: all 0.6s ease-in-out;
      }

      .zigrow-about-2 .primary-btn:hover::before {
        left: 100%;
      }

      .zigrow-about-2 .primary-btn:hover {
        box-shadow: 0 6px 16px rgba(66, 133, 244, 0.35);
      }

      /* Arrow illustration */
      .zigrow-about-2 .arrow-img-box {
        /* position: relative; */
        position: absolute;
        bottom: -20%;
        right: 40%;
        width: 120px;
        text-align: center;
        transform: rotate(10deg);
        z-index: 0;
        margin-top: 2rem;
      }

      .zigrow-about-2 .arrow-image {
        max-width: 100%;
        max-height: 100%;
        object-fit: cover;
      }

      @media (max-width: 992px) {
        .zigrow-about-2 .arrow-image {
          display: none;
        }
      }
    </style>
    </section>`,
});
Vvveb.Blocks.add("bootstrap4/zigrow-about-3", {
    name: "About-3",
    category: "about-us",
    image: "https://i.postimg.cc/ZRzm6wnp/about3.png",
    html: ` <section class="zigrow-about-3 py-6" data-section="zigrow-about-3" id="zigrow-about-3">
      <div class="container">
        <div class="row about-inner g-4">
          <!-- Left: Text -->
          <div class="col-12 col-lg-6">
            <div class="about-text">
              <h2 class="about-title font-montserrat">About Us</h2>

              <p class="about-description">
                to help businesses like yours succeed in the digital world.
                Whether you're looking to boost website traffic, improve lead
                generation, or build a strong online brand, we provide expert
                solutions that drive long-term success.
              </p>

              <p class="about-description">
                Our mission is simple: to help businesses like yours succeed in
                the digital world. Whether you're looking to boost website
                traffic, improve lead generation, or build a strong online
                brand, we provide expert solutions that drive long-term success.
              </p>
            </div>
          </div>

          <!-- Right: Image card with purple strip -->
          <div class="col-12 col-lg-6">
            <div class="about-media">
              <div class="about-image-card">
                <img src="/builder/img/zigrow-about-images/3.webp" alt="Team Image" class="about-image" />
                <div class="about-image-accent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
         <style>
      .zigrow-about-3 {
        background-color: #f7f3fb;
      }

      .py-6 {
        padding: 3rem 0;
      }

      /* Wrapper – no flex now, only spacing */
      .about-inner {
        padding-bottom: 3rem;
        align-items: center;
      }

      /* Left text column */
      .about-text {
        max-width: 640px;
      }

      .about-title {
        margin-bottom: 1.5rem;
        font-size: 2.5rem;
        font-weight: 700;
        color: #000;
      }

      .about-description {
        font-size: 1rem;
        line-height: 1.7;
        /* var() with fallback */
        color: var(--secondary-colors, #5f6473);
        margin-bottom: 1rem;
        text-transform: capitalize;
      }

      /* Right image column */
      .about-media {
        width: 100%;
        display: block;
      }

      .about-image-card {
        position: relative;
        max-width: 520px;
        width: 100%;
        border-radius: 6px;
        margin-left: auto; /* align to right on large screens */
        margin-right: auto; /* center on small screens */
      }

      /* Main image */
      .about-image {
        max-width: 100%;
        max-height: 100%;
        border-radius: 6px;
        position: relative;
        object-fit: cover;
        z-index: 2;
      }

      /* Full-size purple box behind image */
      .about-image-accent {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--primary-colors);
        border-radius: 6px;
        z-index: 1;
        transform: rotate(-5deg);
        transform-origin: top right;
      }

      /* Optional: small-screen text alignment */
      @media (max-width: 575.98px) {
        .about-text {
          text-align: left;
        }
      }
    </style>
    </section>`,
});

// client Section Blocks
Vvveb.Blocks.add("bootstrap4/zigrow-client-1", {
    name: "Client-1",
    category: "client",
    image: "https://i.postimg.cc/Pxbjy1vJ/client1.png",
    html: `    <section id="zigrow-client-1" data-section="zigrow-client-1" aria-label="Boost Social Reach" class="zigrow-client-1 py-6">
      <div class="container">
        <!-- Header -->
        <div class="zigrow-client-1-head">
          <span class="label">
            <i
              class="fa-solid fa-sparkles"
              data-icon="sparkles"
              aria-hidden="true"
            ></i>
            Expand Your Influence
          </span>

          <h2 class="title">
            Unlock wider and
            <span class="accent">create fresh content</span>
            for your client
          </h2>

           <p class="sub">
            Help your brand stay active, relevant, and memorable with content that connects better with your audience.
          </p>
        </div>

        <!-- Features -->
        <div class="features row row-cols-1 row-cols-md-2 g-4">
          <div class="col">
            <div class="f-card">
              <div class="icon">
                <i class="fa-regular fa-bell" data-icon="bell"></i>
              </div>
              <div class="description">
                <h3 class="f-title">Stay Ahead With Ideas</h3>
               <p class="f-desc">
                  Keep your content pipeline active with fresh ideas that help your brand stay visible and relevant.
                </p>
              </div>
              </div>
              <span class="badge-pill">Trusted By Many</span>
            </div>
          </div>

          <div class="col">
            <div class="f-card">
              <div class="icon">
                <i class="fa-regular fa-square-check" data-icon="check"></i>
              </div>
              <div class="description">
                 <h3 class="f-title">Create Posts That Get Noticed</h3>
                <p class="f-desc">
                  Design content that looks polished, feels consistent, and stands out across every platform.
                </p>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="f-card">
              <div class="icon">
                <i class="fa-regular fa-message" data-icon="message"></i>
              </div>
              <div class="description">
                 <h3 class="f-title">Responsive Support When Needed</h3>
                <p class="f-desc">
                  Get dependable guidance and quick help whenever you need support with your content workflow.
                </p>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="f-card">
              <div class="icon">
                <i class="fa-regular fa-square-check" data-icon="check"></i>
              </div>
              <div class="description">
                <h3 class="f-title">Keep Your Brand Consistent</h3>
                <p class="f-desc">
                  Maintain a unified look and voice across your content so your brand feels clear and professional.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Arrow between grid & testimonial -->
        <div class="arrow-wrap">
          <img  src="/builder/img/zigrow-icon-images/arrow.webp"alt="Arrow" />
        </div>

        <!-- Bottom Stage -->
        <div class="stage">
          <div class="row align-items-center">
            <!-- Left: testimonial -->
            <div class="col-lg-6 mb-4 mb-lg-0">
              <div class="plate">
                <div class="quote-card" aria-label="Client testimonial">
                  <span class="chip">What Clients Are Saying</span>
                  <p>
                    “Working with them gave us fresh creative direction and
                    helped us improve our social presence dramatically.”
                  </p>

                  <footer class="byline">
                    <div class="testimonial-img-box">
                      <img src="/builder/img/zigrow-team-images/1.png" alt="Priya Sharma" />
                    </div>
                    <div>
                      <strong>Priya Sharma</strong>
                      <p>Business Owner</p>
                    </div>
                  </footer>
                </div>
              </div>
            </div>

            <!-- Right: person image -->
            <div class="col-lg-6">
              <div class="person mb-0">
                <img
                src="/builder/img/zigrow-team-images/social-tech-reach-client.webp"
                  alt="Marketing professional smiling"
                />
                <span class="social-icon ig">
                <a href="#">

                  <i class="fa-brands fa-instagram" data-icon="instagram"></i></a>
                </span>
                <span class="social-icon fb">
                <a href="#">
                  <i class="fa-brands fa-facebook-f" data-icon="facebook"></i> </a>
                </span>
              </div>
            </div>
          </div>
        </div>

        <p class="tiny-note">
          Etiam porta libero sed eros posuere placerat morbi.
        </p>
      </div>
       <style>
      .py-6 {
        padding: 3rem 0;
      }
      /* :root {
        --primary-colors: #6d7efb;
        --secondary-colors: #7b8798;
        --territory-colors: #0f172a;
      } */

      /* SECTION WRAPPER */
      .zigrow-client-1 {
        position: relative;
        /* padding-block: 4rem 3.5rem; */
        background: repeating-linear-gradient(
            0deg,
            transparent 0 24px,
            rgba(15, 23, 42, 0.03) 24px 25px
          ),
          #ffffff;
        color: var(--territory-colors, #0f172a);
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
          sans-serif;
      }

      /* TOP LABEL + HEADING */
      .zigrow-client-1 .zigrow-client-1-head {
        text-align: center;
        display: grid;
        gap: 0.85rem;
        justify-items: center;
        margin-bottom: 2.75rem;
      }

      .zigrow-client-1 .zigrow-client-1-head .label {
        display: inline-grid;
        grid-auto-flow: column;
        align-items: center;
        gap: 0.5rem;
        padding: 0.35rem 0.9rem;
        border-radius: 999px;
        background: #f4f6fb;
        color: #3a4660;
        font-size: 0.8rem;
        font-weight: 700;
        letter-spacing: 0.03em;
        text-transform: uppercase;
        box-shadow: 0 10px 26px rgba(15, 23, 42, 0.06);
      }

      .zigrow-client-1 .zigrow-client-1-head .label i {
        color: var(--primary-colors, #6d7efb);
        font-size: 0.9rem;
      }

      .zigrow-client-1 .zigrow-client-1-head .title {
        font-weight: 900;
        font-size: clamp(1.9rem, 4.3vw, 2.7rem);
        letter-spacing: 0.01em;
        margin: 0;
        color: #0f172a;
      }

      .zigrow-client-1 .zigrow-client-1-head .title .accent {
        color: var(--primary-colors, #6d7efb);
      }

      .zigrow-client-1 .zigrow-client-1-head .sub {
        margin: 0.4rem 0 0;
        font-size: 0.98rem;
        color: var(--secondary-colors, #7b8798);
        max-width: 80ch;
      }

      /* FEATURES GRID (Bootstrap handles layout) */
      .zigrow-client-1 .features {
        margin: 2rem 0 4.5rem;
      }

      .zigrow-client-1 .f-card {
        position: relative;
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 1.5rem;
        align-items: flex-start;
        padding: 1.5rem 1.75rem;
        background: #f7f9ff;
        border-radius: 18px;
        border: 1px solid #e5ebff;
        box-shadow: 0 20px 50px rgba(15, 23, 42, 0.05);
        transition: transform 0.18s ease, box-shadow 0.18s ease,
          background-color 0.18s ease;
        height: 100%;
      }

      .zigrow-client-1 .f-card:hover {
        transform: translateY(-4px);
        background-color: #f2f5ff;
        box-shadow: 0 28px 70px rgba(15, 23, 42, 0.09);
      }

      .zigrow-client-1 .f-card .icon {
        width: 52px;
        height: 52px;
        border-radius: 18px;
        display: grid;
        place-items: center;
        background: #ffffff;
        border: 1px solid #e4e8ff;
        color: var(--primary-colors, #6d7efb);
        font-size: 1.25rem;
      }

      .zigrow-client-1 .f-card .f-title {
        margin: 0 0 0.4rem;
        font-size: 1.1rem;
        font-weight: 700;
        color: #0f172a;
      }

      .zigrow-client-1 .f-card .f-desc {
        margin: 0;
        font-size: 0.96rem;
        line-height: 1.7;
        color: var(--secondary-colors, #7b8798);
      }

      /* GREEN BADGE ON 1st CARD */
      .zigrow-client-1 .f-card .badge-pill {
        position: absolute;
        top: 0;
        right: 1.15rem;
        background: #16a34a;
        color: #fff;
        font-size: 0.7rem;
        font-weight: 700;
        padding: 0.25rem 0.7rem;
        border-radius: 0 0 5px 5px;
        box-shadow: 0 6px 20px rgba(22, 163, 74, 0.35);
        border: 1px solid rgba(22, 163, 74, 0.4);
      }

      @media (max-width: 768px) {
        .zigrow-client-1 .f-card {
          grid-template-columns: 1fr;
          padding: 1.1rem 1.2rem;
        }

        .zigrow-client-1 .f-card .badge-pill {
          position: static;
          display: inline-block;
          margin-top: 0.5rem;
        }
      }

      /* ARROW BETWEEN CARDS & TESTIMONIAL */
      .zigrow-client-1 .arrow-wrap {
        text-align: center;
        position: relative;
        height: 60px;
        margin-top: -1.75rem;
        margin-bottom: 1.75rem;
      }

      .zigrow-client-1 .arrow-wrap img {
        position: absolute;
        left: 15%;
        top: -20px;
        width: 110px;
        height: auto;
        max-width: 100%;
        object-fit: cover;
        transform: rotate(-180deg);
        filter: drop-shadow(0 8px 18px rgba(15, 23, 42, 0.25));
      }

      @media (max-width: 992px) {
        .zigrow-client-1 .arrow-wrap {
          display: none;
        }
      }

      /* STAGE (BOTTOM) */
      .zigrow-client-1 .stage {
        border-radius: 24px;
        border: 1px solid rgba(109, 126, 251, 0.3);
        background: radial-gradient(
            800px 520px at 95% -10%,
            rgba(109, 126, 251, 0.18),
            transparent 55%
          ),
          linear-gradient(180deg, #fbfcff 0%, #f4f2ff 100%);
        box-shadow: 0 24px 60px rgba(15, 23, 42, 0.08);
        padding: 1.75rem 1.75rem 0.4rem;
        overflow: hidden;
      }

      /* Left plate (layered look) */
      .zigrow-client-1 .plate {
        position: relative;
        border-radius: 24px;
        padding: 1.5rem;
        background: linear-gradient(180deg, #f6f3ff, #ece8ff);
        border: 1px solid rgba(109, 126, 251, 0.4);
        height: 100%;
      }

      .zigrow-client-1 .plate::before,
      .zigrow-client-1 .plate::after {
        content: "";
        position: absolute;
        inset: 14px -10px auto 18px;
        border-radius: 24px;
        background: rgba(255, 255, 255, 0.6);
        z-index: 0;
      }

      .zigrow-client-1 .plate::after {
        inset: 26px 12px auto 30px;
        opacity: 0.8;
      }

      .zigrow-client-1 .quote-card {
        position: relative;
        z-index: 1;
        background: #ffffff;
        border-radius: 18px 18px 0 0;
        border: 1px solid #e4e9ff;
        padding: 1.1rem 1.25rem 1.3rem;
        box-shadow: 0 18px 45px rgba(109, 126, 251, 0.25);
        display: grid;
        gap: 0.8rem;
      }

      .zigrow-client-1 .quote-card .chip {
        display: inline-block;
        width: fit-content;
        padding: 0.5rem 0.7rem;
        border-radius: 999px;
        background: #f0f3f9;
        color: #3b4860;
        font-size: 0.72rem;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.06em;
      }

      .zigrow-client-1 .quote-card p {
        margin: 0.8rem 0;
        font-size: 1.1rem;
        line-height: 1.5;
        color: #0f172a;
      }

      .zigrow-client-1 .byline {
        display: grid;
        grid-auto-flow: column;
        align-items: center;
        gap: 0.6rem;
        width: fit-content;
      }
      .zigrow-client-1 .testimonial-img-box {
        text-align: center;
        border-radius: 999px;
      }
      .zigrow-client-1 .byline img {
        width: 40px;
        height: 40px;
        max-width: 100%;
        max-height: 100%;
        border-radius: 999px;
        object-fit: cover;
      }

      .zigrow-client-1 .byline strong {
        font-size: 1rem;
        font-weight: 700;
        color: #0f172a;
      }

      .zigrow-client-1 .byline p {
        display: block;
        font-size: 0.9rem;
        color: var(--secondary-colors, #7b8798);
      }

      /* Right person block */
      .zigrow-client-1 .person {
        text-align: center;
        position: relative;
        display: grid;
        place-items: end center;
        height: 100%;
      }

      .zigrow-client-1 .person img {
        width: min(380px, 100%);
        height: auto;
        max-width: 100%;
        max-height: 100%;
        border-radius: 22px;
        object-fit: cover;
        filter: drop-shadow(0 22px 50px rgba(15, 23, 42, 0.3));
      }

      .zigrow-client-1 .person .social-icon {
        position: absolute;
        width: 46px;
        height: 46px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        color: #ffffff;
        font-size: 1.15rem;
        box-shadow: 0 18px 40px rgba(15, 23, 42, 0.3);
      }

      .zigrow-client-1 .person .social-icon.ig {
        background: #e1306c;
        left: 22%;
        top: 18%;
      }

      .zigrow-client-1 .person .social-icon.fb {
        background: #1877f2;
        right: 10%;
        bottom: 16%;
      }

      @media (max-width: 992px) {
        .zigrow-client-1 .stage {
          padding: 1.4rem 1.4rem 1rem;
        }

        .zigrow-client-1 .plate {
          margin-bottom: 1.25rem;
        }

        .zigrow-client-1 .person {
          padding-bottom: 0.4rem;
        }

        .zigrow-client-1 .person img {
          position: relative;
        }
      }
      @media (max-width: 576px) {
        .zigrow-client-1 .person .social-icon {
          display: none;
        }
      }

      /* FOOTNOTE */
      .zigrow-client-1 .tiny-note {
        margin-top: 1.3rem;
        font-size: 0.86rem;
        color: var(--secondary-colors, #7b8798);
        text-align: left;
      }
    </style>
    </section>`,
});
Vvveb.Blocks.add("bootstrap4/zigrow-client-2", {
    name: "Client-2",
    category: "client",
    image: "https://i.postimg.cc/cHGWfFCf/Clients-2.png",
    html: `    <section
      class="zigrow-client-2 py-6"
      id="zigrow-client-2"
      data-section="zigrow-client-2"
      aria-label="Client zigrow-client-2"
    >
      <div class="zigrow-client-2-bg"></div>
      <div class="zigrow-client-2-overlay"></div>

      <div class="container">
        <div class="zigrow-client-2-content">
          <div class="zigrow-client-2-top">
            <i class="bi bi-quote" data-icon="quote"></i>
            <p>Reviews From Our Happy Clients</p>
          </div>

          <h2 class="zigrow-client-2-title">
            We aim to deliver exceptional value through thoughtfully designed
            services that focus on quality
          </h2>

          <div class="zigrow-client-2-stars">
            <p class="reviewer">Ankit Singh</p>
            <div class="stars" aria-label="5 out of 5">
              <i class="fa-solid fa-star" data-icon="star"></i>
              <i class="fa-solid fa-star" data-icon="star"></i>
              <i class="fa-solid fa-star" data-icon="star"></i>
              <i class="fa-solid fa-star" data-icon="star"></i>
              <i class="fa-solid fa-star" data-icon="star"></i>
            </div>
          </div>
        </div>
      </div> <style>
      .py-6 {
        padding: 3rem 0;
      }
      .zigrow-client-2 {
        position: relative;
        text-align: center;
        padding: clamp(3rem, 6vw, 6rem) 0;
        color: #fff;
      }
     .zigrow-client-2 {
  position: relative;
  text-align: center;
  padding: clamp(3rem, 6vw, 6rem) 0;
  color: #fff;
  background-image: url(https://i.postimg.cc/5NQ0V3F7/Screenshot-2025-11-29-155907.png);
  background-size: cover;
  background-position: center;
}
      .zigrow-client-2 .zigrow-client-2-overlay {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.45);
        pointer-events: none;
      }
      .zigrow-client-2 .zigrow-client-2-content {
        position: relative;
        z-index: 1;
        max-width: 900px;
        margin: 0 auto;
        pointer-events: painted;
      }
      .zigrow-client-2 .zigrow-client-2-top i {
        font-size: 2.25rem;
        display: block;
        margin-bottom: 0.25rem;
      }
      .zigrow-client-2 .zigrow-client-2-title {
        font-size: clamp(1.5rem, 2vw + 1rem, 2.25rem);
        margin: 0.5rem 0 1rem;
        color: #fff;
      }
      .zigrow-client-2 .zigrow-client-2-stars .reviewer {
        color: #cbd5e1;
        margin-bottom: 0.25rem;
      }
      .zigrow-client-2 .zigrow-client-2-stars .stars i {
        color: #fbbf24;
      }
    </style>
    </section>`,
});

Vvveb.Blocks.add("bootstrap4/zigrow-client-3", {
    name: "Client-3",
    category: "client",
    image: "https://i.postimg.cc/cH7Shftn/Clients-3-(2).png",
    html: ` <section id="zigrow-client-3" data-section="zigrow-client-3" class="zigrow-client-3 py-6">
      <div class="container">
        <div class="row zigrow-client-3-wraper">
          <div class="col-12">
            <div class="quote-icon">
              <i class="fas fa-quote-left" data-icon="quote"></i>
            </div>
          </div>

          <div class="col-12">
             <p class="zigrow-client-3-text">
              Working with this team made the entire process feel simple and well managed. Their attention to detail, timely communication, and thoughtful approach helped bring my ideas to life with much more confidence.
            </p>
          </div>

          <div class="col-12">
            <div class="zigrow-client-3-author">
              <div class="author-image-box">
                <img  src="/builder/img/zigrow-team-images/1.png" alt="Manshi Kumari" />
              </div>
              <div class="author-info">
                <h6>Manshi Kumari</h6>
                <small>Freelancer</small>
              </div>
            </div>
          </div>
        </div>
      </div>
        <style>
      .py-6 {
        padding: 3rem 0;
      }

      .zigrow-client-3 {
        background-color: #f8f9fc;
        text-align: center;
      }

      .zigrow-client-3-wraper {
        align-items: center;
      }
      .quote-icon {
        font-size: 2rem;
        color: var(--secondary-colors, #ccc);
        margin-bottom: 1rem;
      }

      .zigrow-client-3-text {
        font-size: 1.2rem;
        font-style: italic;
        color: #1e3dd3;
        max-width: 700px;
        margin: 0 auto 2rem auto;
        line-height: 1.7;
      }

      /* -----------------------------
         AUTHOR SECTION (GRID ONLY)
      ------------------------------*/

      .zigrow-client-3-author {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        max-width: 320px;
        margin: 0 auto;
      }

      .zigrow-client-3-author .row {
        display: grid;
        grid-template-columns: auto 1fr;
        justify-content: center;
        align-items: center;
        column-gap: 12px;
      }

      /* Author Image */
      .author-image-box {
        text-align: center;
        width: 55px;
        height: 55px;
        border-radius: 50%;
        overflow: hidden;
      }

      .author-image-box img {
        width: 100%;
        height: 100%;
        max-width: 100%;
        max-height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }
      .author-info{
        text-align: center;
      }

      .author-info h6 {
        margin: 0;
        font-weight: 600;
        font-size: 1rem;
        text-align: left;
      }

      .author-info p {
        color: var(--secondary-colors, #777);
        font-size: 0.85rem;
        text-align: left;
        display: block;
      }

      /* Responsive on mobile (image on top, text below) */
      @media (max-width: 576px) {
        .zigrow-client-3-author .row {
          grid-template-columns: 1fr;
          row-gap: 10px;
          text-align: center;
        }
      }
    </style>
    </section>`,
});

// Faq Section Blocks
Vvveb.Blocks.add("bootstrap4/zigrow-faq-1", {
    name: "Faq-1",
    category: "faq",
    image: "https://i.postimg.cc/FRb4p0k3/faq.png",
    html: `    <section id="zigrow-faq-1" data-section="zigrow-faq-1" class="zigrow-faq-1 py-6">
      <div class="container">
        <div class="row align-items-start g-5">
          <div class="col-lg-5">
            <div class="faq-label">
              <span class="faq-label-dot"></span>
              <span>+ FAQ</span>
            </div>
 
            <h2 class="faq-title">
              Frequently Asked
              <span>Questions</span>
            </h2>

            <p class="faq-text">
              Get all the details about our product and pricing. Still have
              questions? Our team is always here to help.
            </p>
          </div>

          <div class="col-lg-7">
            <div class="faq-panel">
              <div class="accordion faq-accordion" id="faqAccordion1">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="faqHeading1-1">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1-1" aria-expanded="true" aria-controls="faq1-1">
                      Do I Need Any Technical Skills To Use The Platform?
                    </button>
                  </h2>
                  <div id="faq1-1" class="accordion-collapse collapse show" aria-labelledby="faqHeading1-1" data-bs-parent="#faqAccordion1">
                    <div class="accordion-body">
                      Not at all. Everything is designed to be beginner-friendly. You can set up your workspace, launch
                      projects, and manage your clients without any coding experience.
                    </div>
                  </div>
                </div>

                <div class="accordion-item">
                  <h2 class="accordion-header" id="faqHeading1-2">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq1-2" aria-expanded="false" aria-controls="faq1-2">
                      How Many Projects Can I Create?
                    </button>
                  </h2>
                  <div id="faq1-2" class="accordion-collapse collapse" aria-labelledby="faqHeading1-2" data-bs-parent="#faqAccordion1">
                    <div class="accordion-body">
                      You can create multiple projects based on your plan. Each project can have its own settings, assets, and analytics.
                    </div>
                  </div>
                </div>

                <div class="accordion-item">
                  <h2 class="accordion-header" id="faqHeading1-3">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq1-3" aria-expanded="false" aria-controls="faq1-3">
                      What Happens If I Exceed My Usage Limits?
                    </button>
                  </h2>
                  <div id="faq1-3" class="accordion-collapse collapse" aria-labelledby="faqHeading1-3" data-bs-parent="#faqAccordion1">
                    <div class="accordion-body">
                      We’ll notify you before you reach your limit and offer a smooth upgrade path, so your projects continue running without interruption.
                    </div>
                  </div>
                </div>

                <div class="accordion-item">
                  <h2 class="accordion-header" id="faqHeading1-4">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq1-4" aria-expanded="false" aria-controls="faq1-4">
                      Can I Collaborate With My Team?
                    </button>
                  </h2>
                  <div id="faq1-4" class="accordion-collapse collapse" aria-labelledby="faqHeading1-4" data-bs-parent="#faqAccordion1">
                    <div class="accordion-body">
                      Yes. Invite teammates, assign roles, and collaborate on projects in real time with clear permissions.
                    </div>
                  </div>
                </div>

                <div class="accordion-item">
                  <h2 class="accordion-header" id="faqHeading1-5">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq1-5" aria-expanded="false" aria-controls="faq1-5">
                      Is My Data Secure?
                    </button>
                  </h2>
                  <div id="faq1-5" class="accordion-collapse collapse" aria-labelledby="faqHeading1-5" data-bs-parent="#faqAccordion1">
                    <div class="accordion-body">
                      We use industry-standard encryption and regular backups to keep your data safe and secure at all times.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
         <style>
      .py-6{
        padding: 3rem 0;
      }

      .zigrow-faq-1 {
        padding-block: 4rem;
        background: radial-gradient(circle at top left, #f9fafb 0, #ffffff 50%);
      }

      .zigrow-faq-1 .faq-label {
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;
        padding: 0.25rem 0.9rem;
        border-radius: 999px;
        background: #ffffff;
        box-shadow: 0 14px 35px rgba(15, 23, 42, 0.08);
        font-size: 0.82rem;
        font-weight: 600;
        margin-bottom: 1.75rem;
      }

      .zigrow-faq-1 .faq-label-dot {
        width: 10px;
        height: 10px;
        border-radius: 999px;
        background: var(--primary-colors, #22c55e);
        box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.25);
      }

      .zigrow-faq-1 .faq-label span:last-child {
        color: #020617;
      }

      .zigrow-faq-1 .faq-title {
        font-size: clamp(2rem, 4vw, 2.8rem);
        font-weight: 900;
        color: #020617;
        line-height: 1.05;
        margin-bottom: 1rem;
      }

      .zigrow-faq-1 .faq-title span {
        display: block;
        color: var(--secondary-colors, #6b7280);
        font-weight: 800;
      }

      .zigrow-faq-1 .faq-text {
        max-width: 380px;
        font-size: 0.96rem;
        color: var(--secondary-colors, #6b7280);
        line-height: 1.7;
      }

      .zigrow-faq-1 .faq-panel {
        max-width: 640px;
        margin-left: auto;
      }

      .zigrow-faq-1 .faq-accordion {
        display: flex;
        flex-direction: column;
        gap: 0.9rem;
      }

      .zigrow-faq-1 .accordion-item {
        border-radius: 22px;
        border: 1px solid #eef1f4;
        background: #ffffff;
        box-shadow: 0 10px 28px rgba(15, 23, 42, 0.04);
        overflow: hidden;
      }

      .zigrow-faq-1 .accordion-button {
        background: #ffffff;
        color: #020617;
        font-size: 1.02rem;
        font-weight: 800;
        padding: 1.1rem 1.4rem;
        box-shadow: none;
      }

      .zigrow-faq-1 .accordion-button:not(.collapsed) {
        background: #e9f9ee;
        color: #020617;
      }

      .zigrow-faq-1 .accordion-button:focus {
        box-shadow: none;
        border-color: rgba(34, 197, 94, 0.4);
      }

      .zigrow-faq-1 .accordion-button::after {
        width: 34px;
        height: 34px;
        border-radius: 999px;
        background-color: #ffffff;
        background-position: center;
        border: 2px solid rgba(34, 197, 94, 0.4);
        box-shadow: 0 2px 10px rgba(34, 197, 94, 0.25);
      }

      .zigrow-faq-1 .accordion-body {
        padding: 0 1.4rem 1.2rem;
        font-size: 0.94rem;
        color: var(--secondary-colors, #6b7280);
        line-height: 1.7;
      }

      @media (max-width: 991.98px) {
        .zigrow-faq-1 .faq-panel {
          margin-top: 2.5rem;
          margin-left: 0;
        }
      }
    </style>
    </section>`,
});

Vvveb.Blocks.add("bootstrap4/zigrow-faq-2", {
    name: "Faq-2",
    category: "faq",
    image: "https://i.postimg.cc/MKcWPgc7/faq1.png",
    html: `
<section
  class="zigrow-faq-2 py-6"
  id="zigrow-faq-2"
  data-section="zigrow-faq-2"
>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <header class="zigrow-faq-2__header">
          <h2 class="zigrow-faq-2__title">Commonly Asked Questions</h2>
          <p class="zigrow-faq-2__subtitle">I am here to help!</p>
        </header>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="accordion zigrow-faq-2__list" id="faqAccordion2">
          <div class="accordion-item">
            <h2 class="accordion-header" id="faqHeading2-1">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2-1" aria-expanded="false" aria-controls="faq2-1">
                How often should I exercise?
              </button>
            </h2>
            <div id="faq2-1" class="accordion-collapse collapse" aria-labelledby="faqHeading2-1" data-bs-parent="#faqAccordion2">
              <div class="accordion-body">
                Most people do well with some form of movement every day and 3–5 focused workouts per week. Always adjust based on your energy, schedule, and recovery.
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header" id="faqHeading2-2">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2-2" aria-expanded="false" aria-controls="faq2-2">
                What's the best workout routine for weight loss?
              </button>
            </h2>
            <div id="faq2-2" class="accordion-collapse collapse" aria-labelledby="faqHeading2-2" data-bs-parent="#faqAccordion2">
              <div class="accordion-body">
                A mix of strength training and light-to-moderate cardio is ideal. Strength work keeps muscle while cardio increases calorie burn and heart health.
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header" id="faqHeading2-3">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2-3" aria-expanded="false" aria-controls="faq2-3">
                What should I eat before and after a workout?
              </button>
            </h2>
            <div id="faq2-3" class="accordion-collapse collapse" aria-labelledby="faqHeading2-3" data-bs-parent="#faqAccordion2">
              <div class="accordion-body">
                Before training, focus on light carbs and a little protein. Afterward, combine protein with carbs to support recovery and refill your energy stores.
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header" id="faqHeading2-4">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2-4" aria-expanded="false" aria-controls="faq2-4">
                How can I build muscle effectively?
              </button>
            </h2>
            <div id="faq2-4" class="accordion-collapse collapse" aria-labelledby="faqHeading2-4" data-bs-parent="#faqAccordion2">
              <div class="accordion-body">
                Aim for progressive overload (gradually lifting heavier or doing more reps), eat enough protein, and allow time for rest and sleep.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <style>
    .zigrow-faq-2 {
      background-color: #ffffff;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
        sans-serif;
      color: #111827;
    }
    .py-6 {
      padding: 3rem 0;
    }

    .zigrow-faq-2 .zigrow-faq-2__header {
      margin-bottom: 2rem;
    }

    .zigrow-faq-2 .zigrow-faq-2__title {
      margin: 0 0 0.4rem;
      font-size: 1.7rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      font-weight: 700;
    }

    .zigrow-faq-2 .zigrow-faq-2__subtitle {
      margin: 0;
      font-size: 0.95rem;
      color: #6b7280;
    }

    .zigrow-faq-2 .zigrow-faq-2__list {
      border-top: 1px solid #e5e7eb;
    }

    .zigrow-faq-2 .accordion-item {
      border: 0;
      border-bottom: 1px solid #e5e7eb;
      border-radius: 0;
      background: transparent;
    }

    .zigrow-faq-2 .accordion-button {
      background: transparent;
      color: #111827;
      padding: 0.9rem 0;
      font-size: 0.95rem;
      font-weight: 600;
      box-shadow: none;
    }

    .zigrow-faq-2 .accordion-button:not(.collapsed) {
      background: transparent;
      color: #111827;
    }

    .zigrow-faq-2 .accordion-button:focus {
      box-shadow: none;
    }

    .zigrow-faq-2 .accordion-button::after {
      transform-origin: center;
    }

    .zigrow-faq-2 .accordion-body {
      padding: 0 0 0.85rem;
      font-size: 0.9rem;
      color: #4b5563;
    }

    @media (max-width: 767.98px) {
      .zigrow-faq-2 {
        padding: 3rem 0;
      }

      .zigrow-faq-2 .zigrow-faq-2__title {
        font-size: 1.35rem;
      }

      .zigrow-faq-2 .accordion-button {
        font-size: 0.9rem;
      }
    }
  </style>
</section>
`,
});

Vvveb.Blocks.add("bootstrap4/zigrow-faq-3", {
    name: "Faq-3",
    category: "faq",
    image: "https://i.postimg.cc/BQ8qYR8c/faq2.png",
    html: `
<section
  class="zigrow-faq-3 py-6"
  data-section="zigrow-faq-3"
  id="zigrow-faq-3"
>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <header class="zigrow-faq-3__header">
          <h2 class="zigrow-faq-3__title">
            Frequently Asked<br />Questions
          </h2>
        </header>
      </div>
    </div>

    <div class="row">
      <div class="col-12 col-md-6">
        <div class="accordion zigrow-faq-3__accordion" id="faqAccordion3-left">
          <div class="accordion-item">
            <h2 class="accordion-header" id="faqHeading3-1">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3-1" aria-expanded="false" aria-controls="faq3-1">
                How do I book a photoshoot?
              </button>
            </h2>
            <div id="faq3-1" class="accordion-collapse collapse" aria-labelledby="faqHeading3-1" data-bs-parent="#faqAccordion3-left">
              <div class="accordion-body">
                You can book by filling out our online form with your preferred date, location, and style. We will confirm availability and send you a brief to finalize the booking.
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header" id="faqHeading3-2">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3-2" aria-expanded="false" aria-controls="faq3-2">
                Do you travel for destination sessions?
              </button>
            </h2>
            <div id="faq3-2" class="accordion-collapse collapse" aria-labelledby="faqHeading3-2" data-bs-parent="#faqAccordion3-left">
              <div class="accordion-body">
                Yes, we are available for destination shoots. Travel and stay requirements may apply depending on the location and schedule.
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header" id="faqHeading3-3">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3-3" aria-expanded="false" aria-controls="faq3-3">
                How long does it take to receive the final photos?
              </button>
            </h2>
            <div id="faq3-3" class="accordion-collapse collapse" aria-labelledby="faqHeading3-3" data-bs-parent="#faqAccordion3-left">
              <div class="accordion-body">
                Delivery timelines depend on the project, but most galleries are shared within 1 to 3 weeks after the shoot.
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header" id="faqHeading3-4">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3-4" aria-expanded="false" aria-controls="faq3-4">
                Can I choose the style or mood of the shoot?
              </button>
            </h2>
            <div id="faq3-4" class="accordion-collapse collapse" aria-labelledby="faqHeading3-4" data-bs-parent="#faqAccordion3-left">
              <div class="accordion-body">
                Absolutely. We align the styling, references, and mood with your vision before the shoot so the output matches your expectations.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-6">
        <div class="accordion zigrow-faq-3__accordion" id="faqAccordion3-right">
          <div class="accordion-item">
            <h2 class="accordion-header" id="faqHeading3-5">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3-5" aria-expanded="false" aria-controls="faq3-5">
                Do you provide raw photos as well?
              </button>
            </h2>
            <div id="faq3-5" class="accordion-collapse collapse" aria-labelledby="faqHeading3-5" data-bs-parent="#faqAccordion3-right">
              <div class="accordion-body">
                We deliver fully edited, high-resolution images. Raw files are not part of our standard packages but can be discussed if needed.
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header" id="faqHeading3-6">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3-6" aria-expanded="false" aria-controls="faq3-6">
                What are your prices and packages?
              </button>
            </h2>
            <div id="faq3-6" class="accordion-collapse collapse" aria-labelledby="faqHeading3-6" data-bs-parent="#faqAccordion3-right">
              <div class="accordion-body">
                We offer flexible packages based on duration, location, and deliverables. Share your requirements and we will send a custom quote.
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header" id="faqHeading3-7">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3-7" aria-expanded="false" aria-controls="faq3-7">
                Is a deposit required?
              </button>
            </h2>
            <div id="faq3-7" class="accordion-collapse collapse" aria-labelledby="faqHeading3-7" data-bs-parent="#faqAccordion3-right">
              <div class="accordion-body">
                Yes, a non-refundable deposit secures your date. The remaining balance is due on or before the day of the shoot.
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header" id="faqHeading3-8">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3-8" aria-expanded="false" aria-controls="faq3-8">
                How can I contact you quickly?
              </button>
            </h2>
            <div id="faq3-8" class="accordion-collapse collapse" aria-labelledby="faqHeading3-8" data-bs-parent="#faqAccordion3-right">
              <div class="accordion-body">
                You can reach us via WhatsApp, email, or the contact form on our website. We usually respond within one business day.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <style>
    .zigrow-faq-3 {
      background-color: #050506;
      color: #f9fafb;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
        sans-serif;
    }
    .py-6 {
      padding: 3rem 0;
    }
    .zigrow-faq-3 .zigrow-faq-3__header {
      margin-bottom: 2.5rem;
    }

    .zigrow-faq-3 .zigrow-faq-3__title {
      margin: 0;
      font-size: 2.4rem;
      line-height: 1.15;
      font-weight: 600;
    }

    .zigrow-faq-3 .zigrow-faq-3__accordion {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .zigrow-faq-3 .accordion-item {
      margin-bottom: 0;
      border: 0;
      border-radius: 22px;
      overflow: hidden;
      background: #1f1f23;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.55);
    }

    .zigrow-faq-3 .accordion-button {
      width: 100%;
      padding: 0.95rem 1.4rem;
      border-radius: 22px;
      background-color: #1f1f23;
      color: #f9fafb;
      font-size: 0.95rem;
      font-weight: 500;
      box-shadow: none;
    }

    .zigrow-faq-3 .accordion-button:not(.collapsed) {
      background-color: #1f1f23;
      color: #ffffff;
    }

    .zigrow-faq-3 .accordion-button:focus {
      box-shadow: none;
    }

    .zigrow-faq-3 .accordion-button::after {
      filter: brightness(0) saturate(100%) invert(53%) sepia(89%) saturate(3704%) hue-rotate(347deg) brightness(101%) contrast(102%);
    }

    .zigrow-faq-3 .accordion-body {
      padding: 0 1.4rem 1rem;
      font-size: 0.9rem;
      color: #d1d5db;
      background: #1f1f23;
    }

    @media (max-width: 991.98px) {
      .zigrow-faq-3 {
        padding: 3rem 0 3.5rem;
      }

      .zigrow-faq-3 .zigrow-faq-3__title {
        font-size: 2rem;
      }
    }

    @media (max-width: 575.98px) {
      .zigrow-faq-3 .zigrow-faq-3__title {
        font-size: 1.8rem;
      }

      .zigrow-faq-3 .accordion-button {
        padding: 0.9rem 1.1rem;
      }

      .zigrow-faq-3 .accordion-body {
        padding: 0 1.1rem 0.85rem;
      }
    }
  </style>
</section>
`,
});

// Hero Sections Blocks
Vvveb.Blocks.add("bootstrap4/zigrow-hero-1", {
    name: "Hero-1",
    category: "hero",
    image: "https://i.postimg.cc/h4CvTqLZ/hero1.png",
    html: `  <section id="zigorw-hero-1" data-section="zigorw-hero-1" class="zigrow-hero-1 py-6">
      <!-- Background Image -->
      <div class="bg-image"></div>

      <div class="container">
        <!-- Bootstrap grid; align-items-center for vertical centering on desktop -->
        <div class="row g-4 hero-container">
          <!-- Text Content -->
          <div class="col-12 col-lg-6 hero-left">
            <p class="hero-subhead mb-2">Meet Your Tutor</p>
            <h1 class="hero-head mb-3">Richard Smith</h1>
            <p class="hero-subpara mb-4 mx-auto mx-lg-0">
              Hi! I’m Richard, with over six years of tutoring experience. I’m
              passionate about making learning fun and engaging. My goal is to
              create an adventurous atmosphere through interactive activities
              and tailored lesson plans, inspiring a love for learning in all my
              students.
            </p>
            <a href="#contact" class="call-now-btn" data-btn="contact">
              <i class="bi bi-telephone" data-icon="phone"></i> Contact Me
            </a>
          </div>

          <!-- Image Content -->
          <div class="col-12 col-lg-6 hero-right">
            <div class="circle-bg"></div>

           <!-- Decorative Icons -->
            <img  src="/builder/img/zigrow-icon-images/zigrow-hero-1-hero icon-a.png" class="hero-deco deco-1" alt="" />
            <img  src="/builder/img/zigrow-icon-images/zigrow-hero-1-hero icon-a.png" class="hero-deco deco-2" alt="" />
            <img  src="/builder/img/zigrow-icon-images/zigrow-hero-1-hero icon-a.png" class="hero-deco deco-3" alt="" />

            <!-- Tutor Image -->
           <img
              src="/builder/img/zigrow-team-images/zigrow-hero-1-hero-2.webp"
              class="hero-img "
              alt="Richard Smith"
            />
            </div>
          </div>
        </div>
      </div>
        <style>
      .py-6 {
        padding: 3rem 0;
      }

      /* HERO BASE */
      .zigrow-hero-1 {
        position: relative;
        overflow: hidden;
      }

      /* Background image behind everything */
      .zigrow-hero-1 {
  position: relative;
  overflow: hidden;
  background: url("./images/hero-bg.png") repeat center center;
  background-size: contain;
}

      .zigrow-hero-1 .hero-container{
        align-items: center;
      }
      /* LEFT + RIGHT COLUMNS */
      .zigrow-hero-1 .hero-left {
        align-items: center;
      }

      .zigrow-hero-1 .hero-right {
        position: relative;
        text-align: center;
      }

      /* TYPOGRAPHY */
      .zigrow-hero-1 .hero-subhead {
        color: #000;
        font-size: 1.5rem;
        margin-bottom: 1rem;
      }

      .zigrow-hero-1 .hero-head {
        font-size: 3rem;
        font-weight: 400;
        color: #000;
        margin-bottom: 1.5rem;
      }

      .zigrow-hero-1 .hero-subpara {
        font-size: 1.05rem;
        color: rgba(0, 0, 0, 0.6);
        max-width: 550px;
        line-height: 1.7;
        margin-bottom: 1.75rem;
      }

      /* BUTTON */
      .zigrow-hero-1 .call-now-btn {
        background: var(--primary-colors, #000);
        color: #fff;
        padding: 0.75rem 1.5rem;
        border-radius: 50px;
        display: inline-block;
        text-decoration: none;
        font-weight: 600;
        transition: 0.3s;
      }

      .zigrow-hero-1 .call-now-btn i {
        margin-right: 0.5rem;
      }

      .zigrow-hero-1 .call-now-btn:hover {
        box-shadow: 0 0 20px var(--primary-colors, #000);
      }

      /* CIRCLE BEHIND IMAGE */
      .zigrow-hero-1 .circle-bg {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 550px;
        height: 550px;
        background-color: #fceecf;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        z-index: 1;
      }

      /* MAIN IMAGE */
      .zigrow-hero-1 .tutor-img-box {
        text-align: center;
        position: relative;
        z-index: 2;
        margin: 0 auto;
      }

      .zigrow-hero-1 .hero-img {
        max-width: 100%;
        max-height: 100%;
        width: 400px;
        object-fit: cover;
        zindex: 999;
        position: relative;
      }

      /* DECORATIVE ICONS */
      .zigrow-hero-1 .hero-deco {
        position: absolute;
        z-index: 0;
        width: 55px;
        height: auto;
      }

      .zigrow-hero-1 .hero-deco.deco-1 {
        top: 0%;
        left: 8%;
      }

      .zigrow-hero-1 .hero-deco.deco-2 {
        width: 155px;
        bottom: 16%;
        left: -7%;
      }

      .zigrow-hero-1 .hero-deco.deco-3 {
        width: 155px;
        top: 0%;
        right: 0%;
      }

      /* RESPONSIVE TWEAKS */

      /* Change background behaviour on smaller screens */
      @media (max-width: 1234px) {
        .zigrow-hero-1 .bg-image {
          background: url("./images/hero-bg.png") no-repeat center center;
          background-size: cover;
        }
        .zigrow-hero-1 .circle-bg {
          width: 400px;
          height: 400px;
        }
        .zigrow-hero-1 .hero-img {
          max-width: 320px;
        }
      }

      /* Tablet & below (stack via Bootstrap grid) */
      @media (max-width: 992px) {
        .zigrow-hero-1 .hero-left {
          text-align: center;
        }

        .zigrow-hero-1 .hero-subpara {
          margin-left: auto;
          margin-right: auto;
        }

        .zigrow-hero-1 .hero-img {
          max-width: 60%;
        }

        /* hide extra decorative icons on smaller screens */
        .zigrow-hero-1 .hero-deco {
          display: none;
        }
      }

      @media (max-width: 768px) {
        .zigrow-hero-1 {
          height: auto ;
        }

        .zigrow-hero-1 .hero-head {
          font-size: 2.2rem;
        }

        .zigrow-hero-1 .hero-subhead {
          font-size: 1.25rem;
        }

        .zigrow-hero-1 .hero-img {
          max-width: 220px;
        }

        .zigrow-hero-1 .circle-bg {
          width: 300px;
          height: 300px;
        }
      }
    </style>
    </section>`,
});

Vvveb.Blocks.add("bootstrap4/zigrow-hero-2", {
    name: "Hero-2",
    category: "hero",
    image: "https://i.postimg.cc/RVZRLfWK/Screenshot-2025-11-20-162300.png",
    html: `   <section id="zigrow-hero-2" data-section="zigrow-hero-2" class="zigrow-hero-2 py-6">
      <div class="container">
        <!-- Bootstrap grid instead of flex -->
        <div class="row zigrow-hero-2-wraper">
          <!-- Image Right on desktop, on top on mobile -->
          <div class="col-12 col-md-6 order-1 order-md-2 zigrow-hero-2-right">
            <div class="zigrow-hero-2-image-wrapper">
              <img src="/builder/img/zigrow-team-images/zigrow-hero-2-hero-2.webp" alt="Doctor" class="zigrow-hero-2-image" />
            </div>
          </div>

          <!-- Text Left on desktop, below image on mobile -->
          <div
            class="col-12 col-md-6 order-2 order-md-1 zigrow-hero-2-left content-container mt-4 mt-md-0"
          >
            <h1 class="zigrow-hero-2-title">
              Transform <br />Your Health,<br />One Meal at a Time
            </h1>
            <p class="zigrow-hero-2-text">
              Personalized diet plans to help you achieve your wellness goals.
            </p>
            <a href="#" class="zigrow-hero-2-btn" data-btn="hero-2">Book Now</a>
          </div>
        </div>
      </div>
         <style>
      .py-6 {
        padding: 3rem 0;
      }

      /* HERO BASE */
      .zigrow-hero-2 {
        background: url("/builder/img/zigrow-icon-images/zigrow-hero-2-hero-bg.png") no-repeat center center;
        background-size: cover;
        color: #fff;
      }
      .zigrow-hero-2 .zigrow-hero-2-wraper {
        align-items: center;
      }
      /* LEFT & RIGHT COLUMNS */
      .zigrow-hero-2 .zigrow-hero-2-left {
        /* default mobile: center */
        text-align: center;
      }

      .zigrow-hero-2 .zigrow-hero-2-right {
        text-align: center;
      }

      .zigrow-hero-2 .content-container {
        padding-left: 0;
      }

      /* TYPOGRAPHY */
      .zigrow-hero-2 .zigrow-hero-2-title {
        color: #fff;
        font-size: 2.5rem;
        line-height: 1.1;
      }

      .zigrow-hero-2 .zigrow-hero-2-text {
        font-size: 1.2rem;
        margin-top: 1rem;
        margin-bottom: 1.5rem;
      }

      /* BUTTON */
      .zigrow-hero-2 .zigrow-hero-2-btn {
        background-color: var(--primary-color, #1159f1);
        color: #fff;
        border-radius: 28px;
        padding: 0.8rem 1.5rem;
        outline: none;
        cursor: pointer;
        border: 0;
        transition: all 0.35s ease-in-out;
        box-shadow: 0 4px 12px rgba(66, 133, 244, 0.25);
        position: relative;
        overflow: hidden;
        letter-spacing: 1px;
        text-decoration: none;
        display: inline-block;
      }

      .zigrow-hero-2 .zigrow-hero-2-btn:hover {
        box-shadow: 0 0px 16px var(--primary-color, #1159f1);
      }

      /* IMAGE WRAPPER */
      .zigrow-hero-2 .zigrow-hero-2-image-wrapper {
        text-align: center;
        max-width: 850px;
        margin: 0 auto;
      }

      .zigrow-hero-2 .zigrow-hero-2-image {
        max-width: 100%;
        max-height: 100%;
        object-fit: cover;
      }

      /* RESPONSIVE TWEAKS */
      @media (min-width: 768px) {
        /* on md+ make text left aligned */
        .zigrow-hero-2 .zigrow-hero-2-left {
          text-align: left;
        }
      }

      @media (min-width: 1024px) {
        .zigrow-hero-2 .content-container {
          padding-left: 4rem;
        }

        .zigrow-hero-2 .zigrow-hero-2-title {
          font-size: 3.5rem;
        }
      }

      @media (min-width: 769px) and (max-width: 1023.98px) {
        .zigrow-hero-2 .zigrow-hero-2-title {
          font-size: 3.5rem;
        }
      }
    </style>
    </section>
  `,
});
Vvveb.Blocks.add("bootstrap4/zigrow-hero-3", {
    name: "Hero-3",
    category: "hero",
    image: "https://i.postimg.cc/bN0451gj/Screenshot-2025-11-20-153809.png",
    html: ` <section id="zigorw-hero-3" data-section="zigorw-hero-3" class="zigrow-hero-3 py-6">
      <div class="container">
        <!-- Bootstrap grid instead of flex -->
        <div class="row zigrow-hero-3-inner">
          <!-- Left Vertical Text (hidden on small screens) -->
          <div class="col-md-1 d-none d-md-block zigrow-hero-3-left">
            <div class="zigrow-hero-3-left-content">
              <p class="rotate-text-small">Designer</p>
              <div class="zigrow-hero-3-vertical-line"></div>
              <p class="rotate-text-small">2025</p>
            </div>
          </div>

          <!-- Center Text -->
          <div class="col-12 col-md-6 zigrow-hero-3-center">
            <h1 class="zigrow-hero-3-title">
              Freelancer, <span class="zigrow-hero-3-highlight">designer</span> and a<br />
              content<br />
              creator
            </h1>

            <!-- Social Icons -->
            <div class="zigrow-hero-3-social">
              <a href="#"><i class="bi bi-twitter" data-icon="twitter"></i></a>
              <a href="#"
                ><i class="bi bi-linkedin" data-icon="linkedin"></i
              ></a>
              <a href="#"><i class="bi bi-behance" data-icon="behance"></i></a>
            </div>
          </div>

          <!-- Right Image + Scroll -->
          <div class="col-12 col-md-5 zigrow-hero-3-right mt-4 mt-md-0">
            <div class="zigrow-hero-3-image-wrapper">
               <img
                src="/builder/img/zigrow-team-images/zigrow-hero-3-portfolio template hero.webp"
                alt="Profile"
                class="zigrow-hero-3-image"
              />
            </div>

            <a id="scrollDown" href="#about" class="zigrow-hero-3-scroll-link">
              Scroll Down <i class="bi bi-arrow-down" data-icon="arrow-down"></i>
            </a>
          </div>
        </div>
      </div>
       <style>
      .py-6 {
        padding: 3rem 0;
      }

      /* Wrapper – spacing only, no flex */
      .zigrow-hero-3 .zigrow-hero-3-inner {
        padding-top: 2rem;
        padding-bottom: 2rem;
        align-items: center;
      }

      /* LEFT VERTICAL TEXT */
      .zigrow-hero-3 .zigrow-hero-3-left {
        text-align: center;
      }

      .zigrow-hero-3 .zigrow-hero-3-left-content {
        display: inline-block;
      }

      .zigrow-hero-3 .rotate-text-small {
        writing-mode: vertical-rl;
        transform: rotate(180deg);
        font-size: 14px;
        letter-spacing: 0.08em;
        color: #1b2733;
        margin: 0;
      }

      .zigrow-hero-3 .zigrow-hero-3-vertical-line {
        width: 1px;
        height: 220px;
        background-color: #e0e0e0;
        margin: 1.2rem auto;
      }

      /* CENTER TEXT */
      .zigrow-hero-3 .zigrow-hero-3-center {
        max-width: 650px;
      }

      .zigrow-hero-3 .zigrow-hero-3-title {
        margin: 0;
        color: #20252b;
        font-weight: 400;
        line-height: 1.25;
        font-size: clamp(3.2rem, 6.4vw, 5rem);
      }

      .zigrow-hero-3 .zigrow-hero-3-highlight {
        color: var(--primary-colors, #ff6b35);
      }

      .zigrow-hero-3 .zigrow-hero-3-social {
        margin-top: 2.5rem;
      }

      .zigrow-hero-3 .zigrow-hero-3-social a {
        font-size: 1.75rem;
        color: #1b2733;
        margin-right: 2rem;
        text-decoration: none;
        display: inline-block;
        transition: 0.2s;
      }

      .zigrow-hero-3 .zigrow-hero-3-social a:last-child {
        margin-right: 0;
      }

      .zigrow-hero-3 .zigrow-hero-3-social a:hover {
        color: #98989b;
      }

      /* RIGHT IMAGE + SCROLL */
      .zigrow-hero-3 .zigrow-hero-3-right {
        text-align: center;
        /* align-items: center; */
      }

      .zigrow-hero-3 .zigrow-hero-3-image-wrapper {
        text-align: center;
        max-width: 360px;
        border-radius: 28px;
        margin: 0 auto;
      }

      .zigrow-hero-3 .zigrow-hero-3-image {
        max-width: 100%;
        max-height: 100%;
        object-fit: cover;
        width: 360px;
        border-radius: 28px;
      }

      .zigrow-hero-3 .zigrow-hero-3-scroll-link {
        display: block;
        margin-top: 1.2rem;
        font-size: 1rem;
        color: #3e4651;
        text-decoration: none;
      }

      .zigrow-hero-3 .zigrow-hero-3-scroll-link:hover {
        text-decoration: underline;
      }

      /* RESPONSIVE TWEAKS */
      @media (max-width: 768px) {
        .zigrow-hero-3 .zigrow-hero-3-center {
          max-width: 100%;
          margin-bottom: 2rem;
          text-align: center;
        }

        .zigrow-hero-3 .zigrow-hero-3-social {
          text-align: center;
        }
      }
    </style>
    </section>`,
});
Vvveb.Blocks.add("bootstrap4/zigrow-hero-4", {
    name: "Hero-4",
    category: "hero",
    image: "https://i.postimg.cc/ZK5cx3Wc/Screenshot-2025-11-20-162324.png",
    html: ` <section id="zigrow-hero-4" data-section="zigrow-hero-4" class="zigrow-hero-4 py-6">
      <div class="container">
        <!-- Bootstrap grid instead of flex -->
        <div class="row zigrow-hero-4-inner g-4">
          <!-- Left Column: Text -->
          <div class="col-12 col-lg-7 zigrow-hero-4-left">
            <!-- Icon -->
            <div class="zigrow-hero-4-left-icon">
              <img src="/builder/img/zigrow-icon-images/zigrow-hero-4-hero-icon-d.svg" alt="icon" />
            </div>

            <!-- Heading -->
            <h1 class="zigrow-hero-4-title font-montserrat">
              Boost Your <span class="text-purple">Business</span><br />
              <span class="zigrow-hero-4-subtitle">
                with Proven Digital Strategies
              </span>
            </h1>

            <!-- Description -->
            <p class="zigrow-hero-4-desc">
              Maximize your online presence with expert SEO, targeted ads, and
              high-converting content. Let’s create a strategy that drives real
              results for your business!
            </p>

            <!-- Buttons -->
            <div class="zigrow-hero-4-actions">
              <a class="primary-btn" href="tel:+91-9123456789" data-btn="hero-4">
                Book a FREE Consultation
              </a>
              <a class="secondary-btn" href="#our-services" data-btn="hero-4"> Learn More </a>
            </div>
          </div>

          <!-- Right Column: Overlapping Image Collage -->
          <div class="col-12 col-lg-5 zigrow-hero-4-right mt-4 mt-lg-0">
            <div class="zigrow-hero-4-collage">
              <!-- Image 1 -->
              <div class="zigrow-hero-4-img-box-right">
               <img
               src="/builder/img/zigrow-team-images/zigrow-hero-4-Digital Agency 1.webp"
                class="zigrow-hero-4-img zigrow-hero-4-img-main"
                alt="Digital Agency"
              />
              </div>
              <!-- Image 2 -->
              <div class="zigrow-hero-4-img-box-right">
               <img
                src="/builder/img/zigrow-team-images/zigrow-hero-4-Untitled design-6-2.webp"
                class="zigrow-hero-4-img zigrow-hero-4-img-2"
                alt="Marketing Visual 1"
              />
              </div>

              <!-- Image 3 -->
              <div class="zigrow-hero-4-img-box-right">
                 <img
              src="/builder/img/zigrow-team-images/zigrow-hero-4-Untitled design-7-2.webp"
                class="zigrow-hero-4-img zigrow-hero-4-img-3"
                alt="Marketing Visual 2"
              />
              </div>

              <!-- Top-right icon -->
             <div class="zigrow-hero-4-icon zigrow-hero-4-icon-top">
              <img  src="/builder/img/zigrow-icon-images/zigrow-hero-4-hero-icon-b.svg" alt="icon" />
              </div>

              <!-- Bottom-left icon -->
              <div class="zigrow-hero-4-icon zigrow-hero-4-icon-bottom">
                 <img src="/builder/img/zigrow-icon-images/zigrow-hero-4-hero-icon-a.svg" alt="icon" />
              </div>
            </div>
          </div>
        </div>
      </div> <style>
      .py-6 {
        padding: 3rem 0;
      }

      .zigrow-hero-4 {
        background-color: #ffffff;
        
      }

      .zigrow-hero-4 .text-purple {
        color: var(--primary-colors, #7e22ce);
      }

      /* We now use Bootstrap row/col for layout.
         zigrow-hero-4-inner is only for spacing, no flex. */
      .zigrow-hero-4 .zigrow-hero-4-inner {
        align-items: center;
        padding: 1rem 0;
      }

      /* BUTTONS */
      .zigrow-hero-4 .primary-btn {
        background: linear-gradient(
          135deg,
          var(
            --primary-colors,
            #6a0dad,
            rgb(76.935483871, 9.435483871, 125.564516129)
          )
        );
        color: white;
        border-radius: 5px;
        padding: 0.8rem 1.2rem;
        outline: none;
        border: 0;
        transition: all 0.35s ease-in-out;
        box-shadow: 0 4px 12px var(--primary-colors, rgba(106, 13, 173, 0.25));
        position: relative;
        overflow: hidden;
        text-decoration: none;
      }

      .zigrow-hero-4 .primary-btn:before {
        content: "";
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.15);
        transition: all 0.6s ease-in-out;
        transform: skewX(-20deg);
      }

      .zigrow-hero-4 .primary-btn:hover::before {
        left: 100%;
      }

      .zigrow-hero-4 .primary-btn:hover {
        transform: translateY(-4px) scale(1.03);
        box-shadow: 0 10px 25px var(--primary-colors, rgba(106, 13, 173, 0.4));
      }

      .zigrow-hero-4 .primary-btn:active {
        transform: scale(0.98);
        box-shadow: 0 6px 12px var(--primary-colors, rgba(106, 13, 173, 0.25));
      }

      .zigrow-hero-4 .secondary-btn {
        background: linear-gradient(135deg, white, rgb(229.5, 229.5, 229.5));
        color: black;
        border-radius: 5px;
        padding: 0.8rem 1.2rem;
        outline: none;
        border: 1px solid black;
        transition: all 0.35s ease-in-out;
        box-shadow: 0 4px 12px var(--primary-colors, rgba(106, 13, 173, 0.25));
        position: relative;
        overflow: hidden;
        text-decoration: none;
      }

      .zigrow-hero-4 .secondary-btn:before {
        content: "";
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.15);
        transition: all 0.6s ease-in-out;
        transform: skewX(-20deg);
      }

      .zigrow-hero-4 .secondary-btn:hover::before {
        left: 100%;
      }

      .zigrow-hero-4 .secondary-btn:hover {
        transform: translateY(-4px) scale(1.03);
        box-shadow: 0 10px 25px var(--primary-colors, rgba(106, 13, 173, 0.4));
      }

      .zigrow-hero-4 .secondary-btn:active {
        transform: scale(0.98);
        box-shadow: 0 6px 12px var(--primary-colors, rgba(106, 13, 173, 0.25));
      }

      /* LEFT COLUMN */
      .zigrow-hero-4 .zigrow-hero-4-left {
        position: relative;
        text-align: center;
      }

      @media (min-width: 992px) {
        .zigrow-hero-4 .zigrow-hero-4-left {
          text-align: left;
        }
      }

      .zigrow-hero-4 .zigrow-hero-4-left-icon {
        position: absolute;
        text-align: center;
        top: -6px;
        left: -12px;
        z-index: 5;
      }
      .zigrow-hero-4 .zigrow-hero-4-left-icon img {
        max-width: 100%;
        max-height: 100%;
        object-fit: cover;
      }
      @media (max-width: 992px) {
        .zigrow-hero-4 .zigrow-hero-4-left-icon {
          display: none;
        }
      }

      .zigrow-hero-4 .zigrow-hero-4-title {
        font-weight: 700;
        font-size: clamp(2.5rem, 6vw, 3.5rem);
        line-height: 1.15;
        margin: 0;
      }

      .zigrow-hero-4 .zigrow-hero-4-subtitle {
        display: block;
        font-weight: 400;
        color: #111827;
        margin-top: 0.5rem;
        font-size: clamp(1.6rem, 5vw, 2.8rem);
      }

      .zigrow-hero-4 .zigrow-hero-4-desc {
        margin-top: 0.75rem;
        font-size: 1.1rem;
        line-height: 1.5;
        color: var(--secondary-colors, #6b7280);
        max-width: 520px;
        margin-left: auto;
        margin-right: auto;
      }

      @media (min-width: 992px) {
        .zigrow-hero-4 .zigrow-hero-4-desc {
          text-align: left;
          margin-left: 0;
          margin-right: 0;
        }
      }

      /* BUTTON WRAPPER – no flex, uses inline-block + text-align */
      .zigrow-hero-4 .zigrow-hero-4-actions {
        margin-top: 1.5rem;
        text-align: center;
      }

      .zigrow-hero-4 .zigrow-hero-4-actions a {
        display: inline-block;
        margin: 0.35rem 0.6rem 0.35rem 0;
      }

      @media (min-width: 992px) {
        .zigrow-hero-4 .zigrow-hero-4-actions {
          text-align: left;
        }
      }

      /* RIGHT COLUMN */
      .zigrow-hero-4 .zigrow-hero-4-right {
        text-align: center;
      }

      .zigrow-hero-4 .zigrow-hero-4-collage {
        position: relative;
        width: 300px;
        height: 320px;
        margin: 0 auto;
      }

      .zigrow-hero-4 .zigrow-hero-4-img {
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(15, 23, 42, 0.18);
      }

      .zigrow-hero-4 .zigrow-hero-4-img-box-right{
        text-align: center;
      }
      .zigrow-hero-4 .zigrow-hero-4-img-box-right img{
        max-width: 100%;
        max-height: 100%;
        object-fit: cover;
      }
      .zigrow-hero-4 .zigrow-hero-4-img-main {
        position: absolute;
        top: 0;
        left: 0;
        width: 300px;
        z-index: 1;
      }

      .zigrow-hero-4 .zigrow-hero-4-img-2 {
        position: absolute;
        top: 160px;
        right: -70px;
        width: 150px;
        z-index: 2;
        /* display: none; */
      }

      .zigrow-hero-4 .zigrow-hero-4-img-3 {
        position: absolute;
        top: 150px;
        left: 10px;
        width: 182px;
        z-index: 1;
        /* display: none; */
      }

      .zigrow-hero-4 .zigrow-hero-4-icon {
        position: absolute;
        z-index: 5;
      }

      .zigrow-hero-4 .zigrow-hero-4-icon-top {
        text-align: center;
        top: 110px;
        right: -50px;
        box-shadow: 0 10px 25px rgba(15, 23, 42, 0.15);
        padding: 0.25rem;
        /* display: none; */
      }

      .zigrow-hero-4 .zigrow-hero-4-icon-bottom {
        text-align: center;
        bottom: 10px;
        left: -40px;
        padding: 0.5rem;
        /* display: none; */
      }

      @media (max-width: 992px) {
        
        .zigrow-hero-4 .zigrow-hero-4-icon-top,
        .zigrow-hero-4 .zigrow-hero-4-icon-bottom {
          display: none;
        }
      }

      /* MOBILE COLLAGE: no flex, just stacked & centered */
      @media (max-width: 991.98px) {
        .zigrow-hero-4 .zigrow-hero-4-collage {
          width: 100%;
          height: auto;
          text-align: center;
        }

        .zigrow-hero-4 .zigrow-hero-4-img-main {
          position: static;
          width: 100%;
          max-width: 320px;
          margin: 0 auto 1rem;
          display: block;
        }

        .zigrow-hero-4 .zigrow-hero-4-img-2,
        .zigrow-hero-4 .zigrow-hero-4-img-3 {
          position: static;
          width: 65%;
          max-width: 220px;
          margin: 0 auto 0.75rem;
          display: block;
        }
      }
    </style>
    </section>`,
});
Vvveb.Blocks.add("bootstrap4/zigrow-hero-5", {
    name: "Hero-5",
    category: "hero",
    image: "https://i.postimg.cc/WbC4Y6fn/hero5.png",
    html: `  <section id="zigrow-hero-5" data-section="zigrow-hero-5" class="zigrow-hero-5 py-6" aria-label="Hero">
      <div class="container">
        <!-- TOP: COPY AREA USING BOOTSTRAP GRID -->
        <div class="row copy-row">
          <div class="col-12 col-lg-6 copy-left">
            <p class="eyebrow">Hello There…</p>
            <h1 class="headline">
              I’m Sam. Your Design <br />Partner For new <br />
              Beautiful Ideas
              <span class="emoji" aria-hidden="true">🏀</span>
            </h1>
          </div>

          <div class="col-12 col-lg-6 copy-right">
            <p class="intro">
              <span class="ping" aria-hidden="true"></span>
              <span class="designer">A Freelance UI/UX Designer</span> based in Germany. I strive to
              build immersive and beautiful web applications through carefully
              crafted user-centric design.
            </p>
            <a href="#" class="cta" data-btn="hero-5">
              Contact Me
              <span aria-hidden="true"
                ><i class="fa-solid fa-arrow-right" data-icon="arrow-right"></i
              ></span>
            </a>
          </div>
        </div>

        <!-- BOTTOM: GALLERY GRID USING BOOTSTRAP ROW/COLS -->
        <div class="gallery">
          <div class="scroll-indicator" aria-hidden="true">
            <span>Scroll Down</span>
            <a class="dot" type="button" tabindex="-1">
              <i class="fa-solid fa-arrow-down" data-icon="arrow-down"></i>
            </a>
          </div>

          <div class="row img-row g-3 g-md-4">
            <div class="col-12 col-sm-6 col-lg-3">
              <div class="card-figure notch-left">
               <img  src="/builder/img/zigrow-hero-images/1.webp" alt="" />
              </div>
            </div>
            <div class="col-12 col-sm-6 col-lg-3">
              <div class="card-figure notch-2">
               <img  src="/builder/img/zigrow-hero-images/2.webp" alt="" />
              </div>
            </div>
            <div class="col-12 col-sm-6 col-lg-3">
              <div class="card-figure notch-3">
            <img  src="/builder/img/zigrow-hero-images/3.webp" alt="" />
              </div>
            </div>
            <div class="col-12 col-sm-6 col-lg-3">
              <div class="card-figure notch-right">
             <img  src="/builder/img/zigrow-hero-images/4.webp" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
       <style>
      .py-6 {
        padding: 3rem 0;
      }

      :root {
        /* --primary-colors: #9cf23a;
        --secondary-colors: #f5f5f5;
        --territory-colors: #0f0f10; */
        --grid: rgba(255, 255, 255, 0.06);
        --muted: #b9b9b9;
        --card: #171819;
        --radius-xl: 22px;
        --radius-2xl: 28px;
        --shadow-lg: 0 10px 30px rgba(0, 0, 0, 0.35);
        --header-h: 72px;
      }

      /* HERO BASE */
      .zigrow-hero-5 {
        background: radial-gradient(
            1200px 800px at 20% -10%,
            rgba(255, 255, 255, 0.06),
            transparent 60%
          ),
          var(--territory-colors, #0f0f10);
        color: var(--secondary-colors, #f5f5f5);
        padding-block: 3rem;
        position: relative;
        overflow: clip;
      }

      .zigrow-hero-5::before {
        content: "";
        position: absolute;
        inset: 0;
        background-image: linear-gradient(var(--grid) 1px, transparent 1px),
          linear-gradient(90deg, var(--grid) 1px, transparent 1px);
        background-size: 60px 60px, 60px 60px;
        -webkit-mask: linear-gradient(
          180deg,
          transparent 0,
          rgba(0, 0, 0, 0.5) 30%,
          rgba(0, 0, 0, 0.9) 100%
        );
        mask: linear-gradient(
          180deg,
          transparent 0,
          rgba(0, 0, 0, 0.5) 30%,
          rgba(0, 0, 0, 0.9) 100%
        );
        pointer-events: none;
      }

      /* TOP COPY ROW (Bootstrap handles layout) */
      .zigrow-hero-5 .copy-row {
        margin-bottom: 2.5rem;
      }

      .zigrow-hero-5 .copy-left {
        min-width: 0;
      }

      .zigrow-hero-5 .copy-right {
        max-width: 450px;
        margin-left: auto;
        text-align: end;
      }

      @media (max-width: 992px) {
        .zigrow-hero-5 .copy-right {
          text-align: center;
          /* max-width: 100%; */
          margin: 1.5rem auto 0rem;
        }
        .zigrow-hero-5 .copy-row {
          text-align: center;
        }
      }

      .zigrow-hero-5 .eyebrow {
        color: var(--muted);
        font-size: clamp(0.9rem, 1.2vw, 1rem);
        margin: 0 0 0.25rem 0;
      }

      .zigrow-hero-5 .headline {
        margin: 0 0 1rem 0;
        font-size: clamp(1.4rem, 6vw, 3rem);
        line-height: 1.05;
        font-weight: 700;
        letter-spacing: 0.2px;
        max-width: 28ch;
        word-wrap: break-word;
      }

      .zigrow-hero-5 .headline .emoji {
        filter: drop-shadow(0 6px 10px rgba(0, 0, 0, 0.35));
      }

      .zigrow-hero-5 .intro {
        color: var(--muted);
        max-width: 60ch;
        line-height: 1.6;
        margin: 0 0 1.25rem 0;
        position: relative;
        padding-left: 1.25rem;
      }

      .zigrow-hero-5 .intro .ping {
        position: absolute;
        left: 0;
        top: 0.45rem;
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 999px;
        background: var(--primary-colors, #9cf23a);
        box-shadow: 0 0 0 0 rgba(156, 242, 58, 0.6);
        animation: ping 2s infinite;
      }

      /* CTA BUTTON – no flex */
      .zigrow-hero-5 .cta {
        background: var(--primary-colors, #9cf23a);
        color: #0c0f08;
        text-decoration: none;
        padding: 0.9rem 2.15rem;
        border-radius: 20px;
        font-weight: 700;
        transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
        display: inline-block;
      }

      .zigrow-hero-5 .cta span {
        margin-left: 0.4rem;
      }

      .zigrow-hero-5 .cta:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px var(--primary-colors, rgba(156, 242, 58, 0.28));
        filter: saturate(1.1);
      }

      @media (max-width: 420px) {
        .zigrow-hero-5 .cta {
          padding: 0.8rem 1.5rem;
        }
      }

      /* GALLERY WRAPPER */
      .zigrow-hero-5 .gallery {
        width: 100%;
        position: relative;
        margin-top: 2rem;
      }

      /* IMAGE GRID USING BOOTSTRAP ROW/COLS */
      .zigrow-hero-5 .img-row {
        align-items: end;
      }

      .zigrow-hero-5 .img-row .card-figure {
        text-align: center;
        height: auto;
        background: var(--card);
        border-radius: var(--radius-xl);
        overflow: hidden;
        box-shadow: var(--shadow-lg);
        aspect-ratio: 4/5;
      }

      .zigrow-hero-5 .img-row .card-figure img {
        max-width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }

      /* Notch styles */
      .zigrow-hero-5 .img-row .notch-left {
        border-top-right-radius: 46px 46px;
        aspect-ratio: 4/6;
      }

      .zigrow-hero-5 .img-row .notch-right {
        border-top-left-radius: 46px 46px;
        aspect-ratio: 4/6;
      }

      .zigrow-hero-5 .img-row .notch-2 {
        border-top-right-radius: 46px 46px;
      }

      .zigrow-hero-5 .img-row .notch-3 {
        border-top-left-radius: 46px 46px;
      }

      @media (max-width: 992px) {
        .zigrow-hero-5 .img-row .card-figure {
          border-radius: var(--radius-xl);
          aspect-ratio: 4/5;
        }

        .zigrow-hero-5 .img-row .notch-left {
          border-top-left-radius: var(--radius-xl);
        }

        .zigrow-hero-5 .img-row .notch-right {
          border-top-right-radius: var(--radius-xl);
        }
      }

      /* SCROLL INDICATOR */
      .zigrow-hero-5 .scroll-indicator {
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        top: 1.75rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.6rem;
        color: var(--muted);
        font-size: 0.85rem;
      }

      .zigrow-hero-5 .scroll-indicator .dot {
        padding: 1.5rem 0.8rem;
        border-radius: 20px;
        border: 1px solid rgba(255, 255, 255, 0.12);
        background: #141414;
        color: #e6e6e6;
        display: grid;
        text-decoration: none;
        place-items: center;
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.35);
      }

      @media (max-width: 992px) {
        .zigrow-hero-5 .scroll-indicator {
          top: -1rem;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .zigrow-hero-5 .intro .ping {
          animation: none;
        }

        .zigrow-hero-5 .cta {
          transition: none;
        }
      }

      /* ANIMATIONS */
      @keyframes ping {
        0% {
          box-shadow: 0 0 0 0 rgba(156, 242, 58, 0.6);
        }
        70% {
          box-shadow: 0 0 0 12px rgba(156, 242, 58, 0);
        }
        100% {
          box-shadow: 0 0 0 0 rgba(156, 242, 58, 0);
        }
      }
    </style>
    </section>`,
});

// Pricing Blocks
Vvveb.Blocks.add("bootstrap4/zigrow-pricing-1", {
    name: "Pricing-1",
    category: "pricing",
    image: "https://i.postimg.cc/3xnV87PM/Screenshot-2025-11-20-153914.png",
    html: ` <section id="zigrow-pricing-1" data-section="zigrow-pricing-1" class="zigrow-pricing-1 py-6">
      <div class="container">
        <div class="section-heading mb-5">
          <p>Choose One Of Our</p>
          <h2>Membership Options</h2>
          <div class="outline"></div>
        </div>

        <div class="row g-4">
          <!-- Card 1 -->
          <div class="col-lg-4 col-md-6 col-sm-12 clonable-card">
            <div class="zigrow-pricing-1-card">
              <h4>Desk</h4>
              <h3>
                <span>₹3,750</span><sup><small>/ Month</small></sup>
              </h3>
              <p>Excepteur sint occaecat cup proident</p>
              <ul>
                <li>
                  <i class="bi bi-check-lg" data-icon="check"></i> 24/7 Access
                </li>
                <li>
                  <i class="bi bi-check-lg" data-icon="check"></i> Free WiFi
                </li>
              </ul>
              <a href="#" class="btn-join" data-btn="pricing-1">Join Now</a>
            </div>
          </div>

          <!-- Card 2 -->
          <div class="col-lg-4 col-md-6 col-sm-12 clonable-card">
            <div class="zigrow-pricing-1-card featured">
              <h4>Virtual</h4>
              <h3>
                <span>₹5,400</span><sup><small>/ Month</small></sup>
              </h3>
              <p>Excepteur sint occaecat cup proident</p>
              <ul>
                <li>
                  <i class="bi bi-check-lg" data-icon="check"></i> 24/7 Access
                </li>
                <li>
                  <i class="bi bi-check-lg" data-icon="check"></i> Free WiFi
                </li>
                <li>
                  <i class="bi bi-check-lg" data-icon="check"></i> Kitchen & Bar
                </li>
                <li>
                  <i class="bi bi-check-lg" data-icon="check"></i> All Area
                  Access
                </li>
              </ul>
              <a href="#" class="btn-join" data-btn="pricing-1">Join Now</a>
            </div>
          </div>

          <!-- Card 3 -->
          <div class="col-lg-4 col-md-6 col-sm-12 clonable-card">
            <div class="zigrow-pricing-1-card">
              <h4>Office</h4>
              <h3>
                <span>₹3,750</span><sup><small>/ Month</small></sup>
              </h3>
              <p>Excepteur sint occaecat cup proident.</p>
              <ul>
                <li>
                  <i class="bi bi-check-lg" data-icon="check"></i> 24/7 Access
                </li>
                <li>
                  <i class="bi bi-check-lg" data-icon="check"></i> Free WiFi
                </li>
                <li>
                  <i class="bi bi-check-lg" data-icon="check"></i> Kitchen & Bar
                </li>
                <li>
                  <i class="bi bi-check-lg" data-icon="check"></i> All Area
                  Access
                </li>
              </ul>
              <a href="#" class="btn-join" data-btn="pricing-1">Join Now</a>
            </div>
          </div>
        </div>
      </div>
        <style>
      .py-6{
        padding: 3rem 0;
      }
      .zigrow-pricing-1 {
        background-color: #f8f9fc;
      }
      .zigrow-pricing-1 .section-heading {
        text-align: center;
      }
      .zigrow-pricing-1 .section-heading .outline {
        background-color: var(--territory-colors, #a7a3a3);
        height: 2px;
        width: 50px;
        margin: 1rem auto;
      }
      .zigrow-pricing-1 .row {
        align-items: center;
      }
      @media (max-width: 992px) {
        .zigrow-pricing-1 .row {
          justify-content: center;
        }
      }
      .zigrow-pricing-1 .zigrow-pricing-1-card {
        background: url("../assets/image/card-bg.png") center/cover no-repeat;
        padding: 2rem;
        border-radius: 10px;
        text-align: center;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        height: 100%;
        min-height: 400px;
      }
      .zigrow-pricing-1 .zigrow-pricing-1-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
      }
      .zigrow-pricing-1 .zigrow-pricing-1-card h4 {
        margin-bottom: 15px;
        font-size: 1.25rem;
      }
      .zigrow-pricing-1 .zigrow-pricing-1-card h3 {
        margin-bottom: 10px;
        font-size: 1.8rem;
        color: #333;
      }
      .zigrow-pricing-1 .zigrow-pricing-1-card h3 span {
        color: var(--territory-colors, #e94ea1);
        font-weight: bold;
        font-size: 2rem;
      }
      .zigrow-pricing-1 .zigrow-pricing-1-card h3 small {
        font-size: 0.9rem;
        color: #666;
      }
      .zigrow-pricing-1 .zigrow-pricing-1-card p {
        font-size: 0.95rem;
        color: #666;
        margin-bottom: 20px;
      }
      .zigrow-pricing-1 .zigrow-pricing-1-card ul {
        list-style: none;
        padding: 0;
        margin-bottom: 20px;
      }
      .zigrow-pricing-1 .zigrow-pricing-1-card ul li {
        font-size: 0.95rem;
        color: #444;
        margin: 6px 0;
      }
      .zigrow-pricing-1 .zigrow-pricing-1-card .btn-join {
        display: inline-block;
        padding: 0.75rem 1.8rem;
        border-radius: 10rem;
        color: var(--primary-colors, #4b2fa3);
        border: 2px solid var(--primary-colors, #4b2fa3);
        font-size: 1rem;
        font-weight: 600;
        text-decoration: none;
        transition: all 0.3s;
        position: relative;
        overflow: hidden;
        z-index: 1;
      }
      .zigrow-pricing-1 .zigrow-pricing-1-card .btn-join:after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 10rem;
        z-index: -2;
      }
      .zigrow-pricing-1 .zigrow-pricing-1-card .btn-join:before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0%;
        height: 100%;
        background-color: var(
          --primary-colors,
          rgb(47.6785714286, 29.8785714286, 103.6214285714)
        );
        transition: all 0.3s;
        border-radius: 10rem;
        z-index: -1;
      }
      .zigrow-pricing-1 .zigrow-pricing-1-card .btn-join:hover {
        color: #fff;
      }
      .zigrow-pricing-1 .zigrow-pricing-1-card .btn-join:hover:before {
        width: 100%;
      }
      @media (min-width: 992px) {
        .zigrow-pricing-1 .featured {
          transform: scale(1.05);
          height: 500px;
          margin: 0 auto;
          z-index: 2;
          position: relative;
        }
      }
    </style>
    </section>`,
});

Vvveb.Blocks.add("bootstrap4/zigrow-pricing-2", {
    name: "Pricing-2",
    category: "pricing",
    image: "https://i.postimg.cc/fT6M65XB/pricing-1.png",
    html: `
  <section
      class="zigrow-pricing-2 py-6"
      data-section="zigrow-pricing-2"
      id="zigrow-pricing-2"
    >
      <div class="container pricing-inner">
        <!-- HEADER -->
        <div class="pricing-header">
          <div>
            <p class="pricing-eyebrow">Pricing Plan</p>
            <h2 class="pricing-title">JOIN TODAY</h2>
          </div>

          <div class="billing-toggle" aria-label="Billing period toggle">
            <a href="#" class="billing-btn active" data-billing="monthly" data-btn="pricing-2">
              Monthly
            </a>
            <a href="#" class="billing-btn" data-billing="yearly" data-btn="pricing-2">Yearly</a>
          </div>
        </div>

        <!-- CARDS -->
        <div class="row pricing-row">
          <!-- Card 1 -->
          <div class="col-12 col-md-4 clonable-card">
            <div class="pricing-card">
              <p class="pricing-label">Beginner Plan</p>

              <div class="pricing-price">
                <span class="currency">₹</span>
                <span class="amount" data-monthly="10" data-yearly="100"
                  >10</span
                >
                <span class="per">/mo</span>
              </div>

              <p class="pricing-subtitle">
                Ideal for individuals starting out with small projects and side
                ideas.
              </p>

              <ul class="pricing-features">
                <li>
                  <i
                    class="bi bi-check-circle-fill"
                    data-icon="feature-check"
                  ></i>
                  <span>Access to all core tools and basic support</span>
                </li>
                <li>
                  <i
                    class="bi bi-check-circle-fill"
                    data-icon="feature-check"
                  ></i>
                  <span>Create up to three active projects at a time</span>
                </li>
                <li>
                  <i
                    class="bi bi-check-circle-fill"
                    data-icon="feature-check"
                  ></i>
                  <span>Simple dashboard with essential analytics</span>
                </li>
              </ul>

              <a href="#" class="pricing-cta" data-btn="pricing-2">Choose Plan</a>
            </div>
          </div>

          <!-- Card 2 (Featured) -->
          <div class="col-12 col-md-4 clonable-card">
            <div class="pricing-card pricing-card--featured">
              <p class="pricing-label">Premium Plan</p>

              <div class="pricing-price">
                <span class="currency">₹</span>
                <span class="amount" data-monthly="15" data-yearly="150"
                  >15</span
                >
                <span class="per">/mo</span>
              </div>

              <p class="pricing-subtitle">
                Perfect for growing teams that need more power and flexibility
                every day.
              </p>

              <ul class="pricing-features">
                <li>
                  <i
                    class="bi bi-check-circle-fill"
                    data-icon="feature-check"
                  ></i>
                  <span
                    >Everything in Beginner plus advanced automation tools</span
                  >
                </li>
                <li>
                  <i
                    class="bi bi-check-circle-fill"
                    data-icon="feature-check"
                  ></i>
                  <span>Unlimited projects and shared workspaces</span>
                </li>
                <li>
                  <i
                    class="bi bi-check-circle-fill"
                    data-icon="feature-check"
                  ></i>
                  <span>Priority email support for faster resolutions</span>
                </li>
              </ul>

              <a href="#" class="pricing-cta" data-btn="pricing-2">Choose Plan</a>
            </div>
          </div>

          <!-- Card 3 -->
          <div class="col-12 col-md-4 clonable-card">
            <div class="pricing-card">
              <p class="pricing-label">Expert Plan</p>

              <div class="pricing-price">
                <span class="currency">₹</span>
                <span class="amount" data-monthly="20" data-yearly="200"
                  >20</span
                >
                <span class="per">/mo</span>
              </div>

              <p class="pricing-subtitle">
                Built for established businesses that need reliability and
                scale.
              </p>

              <ul class="pricing-features">
                <li>
                  <i
                    class="bi bi-check-circle-fill"
                    data-icon="feature-check"
                  ></i>
                  <span>Dedicated success manager and guided onboarding</span>
                </li>
                <li>
                  <i
                    class="bi bi-check-circle-fill"
                    data-icon="feature-check"
                  ></i>
                  <span>Custom limits and options tailored to your needs</span>
                </li>
                <li>
                  <i
                    class="bi bi-check-circle-fill"
                    data-icon="feature-check"
                  ></i>
                  <span>Early access to upcoming expert-only features</span>
                </li>
              </ul>

              <a href="#" class="pricing-cta" data-btn="pricing-2">Choose Plan</a>
            </div>
          </div>
        </div>
      </div>
       <style>
      body {
        margin: 0;
        
        background-color: #ffffff;
        color: #111111;
      }

      /* SECTION WRAPPER */
      .zigrow-pricing-2 {
        background-color: #ffffff;
      }
      .py-6 {
        padding: 3rem 0;
      }

      .pricing-inner {
        max-width: 1100px;
        margin: 0 auto;
      }

      /* HEADER */
      .pricing-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2.5rem;
        gap: 1.5rem;
      }

      .pricing-eyebrow {
        color: var(--secondary-colors, #999999);
        font-size: 0.9rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        margin: 0 0 0.35rem;
      }

      .pricing-title {
        font-size: 2.1rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        margin: 0;
      }

      /* Billing toggle */
      .billing-toggle {
        border: 1px solid #dddddd;
        border-radius: 3px;
        display: inline-flex;
        overflow: hidden;
      }

      .billing-btn {
        text-decoration: none;
        background-color: #ffffff;
        color: #000;
        border: none;
        padding: 0.5rem 1.25rem;
        font-size: 0.86rem;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        cursor: pointer;
        transition: background-color 0.15s ease, color 0.15s ease;
        white-space: nowrap;
      }

      .billing-btn + .billing-btn {
        border-left: 1px solid #dddddd;
      }

      .billing-btn.active {
        background-color: var(--primary-colors, #111111);
        color: #ffffff;
      }

      /* CARDS */
      .pricing-row {
        row-gap: 1.5rem;
      }

      .pricing-card {
        border: 1px solid #e6e6e6;
        background-color: #ffffff;
        padding: 1.75rem 1.75rem 1.5rem;
        display: flex;
        flex-direction: column;
        height: 100%;
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.03);
        /* NEW: smooth hover transition */
        transition: transform 0.2s ease, box-shadow 0.2s ease,
          border-color 0.2s ease;
      }

      /* NEW: hover effect for all cards */
      .pricing-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.12);
        border-color: #111111;
      }

      .pricing-card--featured {
        background-color: var(--primary-colors, #111111);
        color: #ffffff;
        border-color: #111111;
      }

      .pricing-card--featured .pricing-subtitle {
        color: #f2f2f2;
      }

      .pricing-card--featured .pricing-price,
      .pricing-card--featured .pricing-features li {
        color: #ffffff;
      }
      .pricing-card--featured .pricing-price,
      .pricing-card--featured .pricing-features i {
        color: #ffffff;
      }

      .pricing-card--featured .pricing-cta {
        background-color: #ffffff;
        color: var(--primary-colors, #000000);
      }

      .pricing-label {
        color: var(--secondary-colors, #888888);
        font-size: 0.78rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        margin-bottom: 0.6rem;
      }

      .pricing-card--featured .pricing-label {
        color: #f2f2f2;
      }

      .pricing-price {
        font-weight: 700;
        font-size: 2rem;
        margin-bottom: 0.4rem;
        display: flex;
        align-items: baseline;
        gap: 0.15rem;
      }

      .pricing-price .currency {
        font-size: 1.5rem;
      }

      .pricing-price .per {
        font-size: 0.9rem;
        font-weight: 500;
        color: #777777;
      }

      .pricing-card--featured .pricing-price .per {
        color: #f2f2f2;
      }

      .pricing-subtitle {
        font-size: 0.85rem;
        color: var(--secondary-colors, #999999);
        margin-bottom: 1.3rem;
        max-width: 14rem;
      }

      /* Features */
      .pricing-features {
        list-style: none;
        padding: 0;
        margin: 0 0 1.8rem;
        font-size: 0.9rem;
      }
      .pricing-features i {
        color: var(--primary-colors, #111111);
      }
      .pricing-features li {
        display: flex;
        align-items: center;
        margin-bottom: 0.55rem;
        color: #333333;
        gap: 0.45rem;
      }

      .pricing-features i {
        font-size: 0.95rem;
      }

      /* CTA button */
      .pricing-cta {
        text-align: center;
        margin-top: auto;
        padding: 0.75rem 1rem;
        border-radius: 0;
        border: none;
        text-decoration: none;
        background-color: var(--primary-colors, #111111);
        color: #ffffff;
        font-size: 0.95rem;
        font-weight: 500;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        cursor: pointer;
        transition: background-color 0.15s ease, color 0.15s ease;
        width: 100%;
      }

      /* RESPONSIVE */
      @media (max-width: 991.98px) {
        .zigrow-pricing-2 {
          padding: 3rem 0;
        }

        .pricing-header {
          flex-direction: column;
          align-items: flex-start;
        }
      }

      @media (max-width: 575.98px) {
        .zigrow-pricing-2 {
          padding: 2.5rem 0;
        }

        .pricing-title {
          font-size: 1.8rem;
        }

        .pricing-card {
          padding: 1.5rem 1.25rem 1.25rem;
        }
      }
    </style>
    <script>
      (function () {
        const toggleBtns = document.querySelectorAll(".billing-btn");
        const amounts = document.querySelectorAll(".pricing-price .amount");

        toggleBtns.forEach((btn) => {
          btn.addEventListener("click", () => {
            const billing = btn.getAttribute("data-billing");

            // Active state
            toggleBtns.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            // Update prices
            amounts.forEach((span) => {
              const value = span.getAttribute(
                billing === "yearly" ? "data-yearly" : "data-monthly"
              );
              if (value) span.textContent = value;
            });
          });
        });
      })();
    </script>
    </section>

`,
});

Vvveb.Blocks.add("bootstrap4/zigrow-pricing-3", {
    name: "Pricing-3",
    category: "pricing",
    image: "https://i.postimg.cc/7YpqpX7s/pricing-2.png",
    html: `   <section class="zigrow-pricing-3 py-6" id="zigrow-pricing-3" data-section="zigrow-pricing-3">
      <div class="container">
        <div class="zigrow-pricing-3__heading">
          <p class="zigrow-pricing-3__kicker">PRICING TABLE</p>
          <h2 class="zigrow-pricing-3__title">Subscribe to our Monthly Plans</h2>
          <p class="zigrow-pricing-3__subtext">
            Choose a plan that fits your household needs. Flexible monthly
            subscriptions, reliable doorstep delivery, and consistent quality
            you can trust every day.
          </p>
        </div>

        <div class="row g-4 zigrow-pricing-3__grid">
          <!-- Card 1 -->
          <div class="col-12 col-md-4 clonable-card">
            <div class="zigrow-pricing-3__card" tabindex="0">
              <p class="zigrow-pricing-3__plan">1 Bag</p>
              <p class="zigrow-pricing-3__price-row">
                <span class="zigrow-pricing-3__price">₹350</span>
                <span class="zigrow-pricing-3__per">/month</span>
              </p>
              <p class="zigrow-pricing-3__desc">
                Ideal for small families or light usage. Fresh supply delivered
                monthly with assured quality and easy renewals.
              </p>
              <a href="#book-now" class="zigrow-pricing-3__cta" data-btn="pricing-3">Book Now</a>
            </div>
          </div>

          <!-- Card 2 -->
          <div class="col-12 col-md-4 clonable-card">
            <div
              class="zigrow-pricing-3__card zigrow-pricing-3__card--featured is-active"
              tabindex="0"
            >
              <p class="zigrow-pricing-3__plan">5 Bag</p>
              <p class="zigrow-pricing-3__price-row">
                <span class="zigrow-pricing-3__price">₹650</span>
                <span class="zigrow-pricing-3__per">/month</span>
              </p>
              <p class="zigrow-pricing-3__desc">
                Our most popular plan. Perfect balance of value and quantity for
                growing households with regular monthly needs.
              </p>
              <a href="#book-now" class="zigrow-pricing-3__cta" data-btn="pricing-3">Book Now</a>
            </div>
          </div>

          <!-- Card 3 -->
          <div class="col-12 col-md-4 clonable-card">
            <div class="zigrow-pricing-3__card" tabindex="0">
              <p class="zigrow-pricing-3__plan">8 Bag</p>
              <p class="zigrow-pricing-3__price-row">
                <span class="zigrow-pricing-3__price">₹950</span>
                <span class="zigrow-pricing-3__per">/month</span>
              </p>
              <p class="zigrow-pricing-3__desc">
                Best suited for large families or bulk usage. Maximum savings
                with uninterrupted supply and priority support.
              </p>
              <a href="#book-now" class="zigrow-pricing-3__cta" data-btn="pricing-3">Book Now</a>
            </div>
          </div>
        </div>
      </div>
          <style>
      body {
        margin: 0;
        background: #ffffff;
        color: #0f172a;
      }

      /* =========================
         SECTION
      ========================== */
      .zigrow-pricing-3 {
        background: #ffffff;
      }
      .py-6 {
        padding: 3rem 0;
      }

      .zigrow-pricing-3 .zigrow-pricing-3__heading {
        text-align: center;
        margin-bottom: 2.25rem;
      }

      .zigrow-pricing-3 .zigrow-pricing-3__kicker {
        margin: 0 0 0.6rem;
        font-size: 0.75rem;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: var(--secondary-colors, #2f3b7c);
        font-weight: 700;
      }

      .zigrow-pricing-3 .zigrow-pricing-3__title {
        margin: 0;
        font-size: clamp(1.7rem, 3.2vw, 2.25rem);
        line-height: 1.15;
        font-weight: 800;
        color: #000;
      }

      .zigrow-pricing-3 .zigrow-pricing-3__subtext {
        margin: 0.85rem auto 0;
        max-width: 620px;
        font-size: 0.95rem;
        line-height: 1.6;
        color: #64748b;
      }

      /* =========================
         CARD
      ========================== */
      .zigrow-pricing-3 .zigrow-pricing-3__grid {
        margin-top: 0.5rem;
      }

      .zigrow-pricing-3 .zigrow-pricing-3__card {
        background: #ffffff;
        border: 1px solid #e6eaf2;
        border-radius: 12px;
        padding: 1.5rem 1.5rem 1.4rem;
        box-shadow: 0 8px 24px rgba(15, 23, 42, 0.05);
        height: 100%;
        transition: transform 0.2s ease, box-shadow 0.2s ease,
          border-color 0.2s ease;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }

      .zigrow-pricing-3 .zigrow-pricing-3__card:hover {
        transform: translateY(-4px);
        box-shadow: 0 14px 34px rgba(15, 23, 42, 0.08);
      }

      .zigrow-pricing-3 .zigrow-pricing-3__plan {
        margin: 0 0 0.35rem;
        font-size: 0.75rem;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        font-weight: 800;
        color: var(--secondary-colors, #64748b);
      }

      .zigrow-pricing-3 .zigrow-pricing-3__price-row {
        margin: 0;
      }

      .zigrow-pricing-3 .zigrow-pricing-3__price {
        font-size: 2rem;
        font-weight: 900;
        letter-spacing: -0.02em;
        color: #0f172a;
      }

      .zigrow-pricing-3 .zigrow-pricing-3__per {
        font-size: 0.85rem;
        color: var(--secondary-colors, #64748b);
        margin-left: 0.25rem;
        font-weight: 600;
      }

      .zigrow-pricing-3 .zigrow-pricing-3__desc {
        margin: 0.85rem 0 1.35rem;
        font-size: 0.92rem;
        line-height: 1.6;
        color: var(--secondary-colors, #64748b);
        max-width: 28rem;
      }

      /* CTA */
      .zigrow-pricing-3 .zigrow-pricing-3__cta {
        display: block;
        width: 100%;
        text-align: center;
        text-decoration: none;
        border-radius: 999px;
        padding: 0.85rem 1rem;
        background: var(--primary-colors, #4fadb8);
        color: #ffffff;
        font-weight: 800;
        font-size: 0.95rem;
        line-height: 1;
        cursor: pointer;
        box-shadow: 0 12px 22px rgba(79, 173, 184, 0.25);
        transition: filter 0.2s ease, transform 0.2s ease;
      }

      .zigrow-pricing-3 .zigrow-pricing-3__cta:hover {
        filter: brightness(0.96);
        transform: translateY(-1px);
      }

      .zigrow-pricing-3 .zigrow-pricing-3__cta:focus {
        outline: 3px solid rgba(79, 173, 184, 0.35);
        outline-offset: 3px;
      }

      /* FEATURED */
      .zigrow-pricing-3 .zigrow-pricing-3__card--featured {
        background: var(--primary-colors, #4fadb8);
        border-color: rgba(255, 255, 255, 0.25);
        box-shadow: 0 18px 44px rgba(15, 23, 42, 0.12);
      }

      .zigrow-pricing-3 .zigrow-pricing-3__card--featured .zigrow-pricing-3__plan,
      .zigrow-pricing-3 .zigrow-pricing-3__card--featured .zigrow-pricing-3__desc,
      .zigrow-pricing-3 .zigrow-pricing-3__card--featured .zigrow-pricing-3__per {
        color: rgba(255, 255, 255, 0.9);
      }

      .zigrow-pricing-3 .zigrow-pricing-3__card--featured .zigrow-pricing-3__price {
        color: #ffffff;
      }

      .zigrow-pricing-3 .zigrow-pricing-3__card--featured .zigrow-pricing-3__cta {
        background: #ffffff;
        color: #0f172a;
        box-shadow: 0 12px 22px rgba(15, 23, 42, 0.18);
      }

      /* ACTIVE */
      .zigrow-pricing-3 .zigrow-pricing-3__card.is-active {
        outline: 3px solid rgba(79, 173, 184, 0.35);
        outline-offset: 3px;
      }

      .zigrow-pricing-3 .zigrow-pricing-3__card--featured.is-active {
        outline-color: rgba(255, 255, 255, 0.6);
      }

      @media (max-width: 767.98px) {
        .zigrow-pricing-3 .zigrow-pricing-3__card {
          padding: 1.35rem 1.2rem 1.2rem;
        }
      }
    </style>
      <script>
      (function () {
        const cards = document.querySelectorAll(".zigrow-pricing-3__card");

        function setActive(card) {
          cards.forEach((c) => c.classList.remove("is-active"));
          card.classList.add("is-active");
        }

        cards.forEach((card) => {
          card.addEventListener("click", () => setActive(card));
          card.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setActive(card);
            }
          });
        });
      })();
    </script>
    </section>`,
});

Vvveb.Blocks.add("bootstrap4/zigrow-pricing-4", {
    name: "Pricing-4",
    category: "pricing",
    image: "https://i.postimg.cc/zX9q9pW2/pricing-3.png",
  html: `
<section
  class="zigrow-pricing-4 py-6"
  data-section="zigrow-pricing-4"
  id="zigrow-pricing-4"
>
  <div class="container">
    <div class="zigrow-pricing-4__heading">
      <h2 class="zigrow-pricing-4__title">Choose the Cleaning Plan That Fits Your Space</h2>
      <p class="zigrow-pricing-4__subtext">
        Pick a service package based on the size of your home and the level of cleaning support you need.
      </p>
    </div>

    <div class="row g-4">
      <!-- BASIC -->
      <div class="col-12 col-md-6 col-lg-4 clonable-card">
        <div
          class="zigrow-pricing-4__card is-active"
          data-plan="basic"
          tabindex="0"
        >
          <p class="zigrow-pricing-4__plan">
            <i
              class="bi bi-stars"
              data-icon="plan-spark"
              aria-hidden="true"
            ></i>
            BASIC CLEANING
          </p>

          <h3 class="zigrow-pricing-4__price">₹350</h3>
          <p class="zigrow-pricing-4__per">/service</p>

          <p class="zigrow-pricing-4__desc">
            A simple and affordable cleaning plan for routine upkeep in smaller homes.
          </p>

          <div class="zigrow-pricing-4__divider" aria-hidden="true"></div>

          <ul class="zigrow-pricing-4__list">
            <li>
              <i
                class="bi bi-check-circle"
                data-icon="check"
                aria-hidden="true"
              ></i>
              <p>Quick home assessment</p>
            </li>
            <li>
              <i
                class="bi bi-check-circle"
                data-icon="check"
                aria-hidden="true"
              ></i>
              <p>2 bedroom cleaning</p>
            </li>
            <li>
              <i
                class="bi bi-check-circle"
                data-icon="check"
                aria-hidden="true"
              ></i>
              <p>2 bathroom cleaning</p>
            </li>
            <li>
              <i
                class="bi bi-check-circle"
                data-icon="check"
                aria-hidden="true"
              ></i>
              <p>Living room dusting and mopping</p>
            </li>
            <li>
              <i
                class="bi bi-check-circle"
                data-icon="check"
                aria-hidden="true"
              ></i>
              <p>Service quality assurance</p>
            </li>
          </ul>

          <a class="zigrow-pricing-4__btn" type="button" href="#" data-btn="pricing-4">Book Now</a>
        </div>
      </div>

      <!-- PRO (FEATURED) -->
      <div class="col-12 col-md-6 col-lg-4 clonable-card">
        <div
          class="zigrow-pricing-4__card zigrow-pricing-4__card--featured"
          data-plan="pro"
          tabindex="0"
        >
          <p class="zigrow-pricing-4__plan">
            <i
              class="bi bi-stars"
              data-icon="plan-spark"
              aria-hidden="true"
            ></i>
            PRO CLEANING
          </p>

          <h3 class="zigrow-pricing-4__price">₹650</h3>
          <p class="zigrow-pricing-4__per">/service</p>

          <p class="zigrow-pricing-4__desc">
            A more complete cleaning package designed for medium to large homes that need extra care.
          </p>

          <div class="zigrow-pricing-4__divider" aria-hidden="true"></div>

          <ul class="zigrow-pricing-4__list">
            <li>
              <i
                class="bi bi-check-circle"
                data-icon="check"
                aria-hidden="true"
              ></i>
              <p>Detailed home assessment</p>
            </li>
            <li>
              <i
                class="bi bi-check-circle"
                data-icon="check"
                aria-hidden="true"
              ></i>
              <p>4 bedroom cleaning</p>
            </li>
            <li>
              <i
                class="bi bi-check-circle"
                data-icon="check"
                aria-hidden="true"
              ></i>
              <p>4 bathroom cleaning</p>
            </li>
            <li>
              <i
                class="bi bi-check-circle"
                data-icon="check"
                aria-hidden="true"
              ></i>
              <p>Kitchen and living area deep cleaning</p>
            </li>
            <li>
              <i
                class="bi bi-check-circle"
                data-icon="check"
                aria-hidden="true"
              ></i>
              <p>7 day service support</p>
            </li>
          </ul>

          <a class="zigrow-pricing-4__btn" type="button" href="#" data-btn="pricing-4">Book Now</a>
        </div>
      </div>

      <!-- DELUXE -->
      <div class="col-12 col-md-6 col-lg-4 clonable-card">
        <div class="zigrow-pricing-4__card" data-plan="deluxe" tabindex="0">
          <p class="zigrow-pricing-4__plan">
            <i
              class="bi bi-stars"
              data-icon="plan-spark"
              aria-hidden="true"
            ></i>
            DELUXE CLEANING
          </p>

          <h3 class="zigrow-pricing-4__price">₹950</h3>
          <p class="zigrow-pricing-4__per">/service</p>

          <p class="zigrow-pricing-4__desc">
            Our most complete plan for larger homes that need a more detailed and polished cleaning experience.
          </p>

          <div class="zigrow-pricing-4__divider" aria-hidden="true"></div>

          <ul class="zigrow-pricing-4__list">
            <li>
              <i
                class="bi bi-check-circle"
                data-icon="check"
                aria-hidden="true"
              ></i>
              <p>Priority home assessment</p>
            </li>
            <li>
              <i
                class="bi bi-check-circle"
                data-icon="check"
                aria-hidden="true"
              ></i>
              <p>5 bedroom cleaning</p>
            </li>
            <li>
              <i
                class="bi bi-check-circle"
                data-icon="check"
                aria-hidden="true"
              ></i>
              <p>5 bathroom cleaning</p>
            </li>
            <li>
              <i
                class="bi bi-check-circle"
                data-icon="check"
                aria-hidden="true"
              ></i>
              <p>Full kitchen, living room, and hallway cleaning</p>
            </li>
            <li>
              <i
                class="bi bi-check-circle"
                data-icon="check"
                aria-hidden="true"
              ></i>
              <p>7 day service guarantee</p>
            </li>
          </ul>

          <a class="zigrow-pricing-4__btn" type="button" href="#" data-btn="pricing-4">Book Now</a>
        </div>
      </div>
    </div>
  </div>

  <style>
    body {
      margin: 0;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
        sans-serif;
      background: #ffffff;
      color: #0f172a;
    }

    /* =========================
       SECTION
    ========================== */
    .zigrow-pricing-4 {
      background: #ffffff;
    }
    .py-6 {
      padding: 3rem 0;
    }
    .zigrow-pricing-4 .zigrow-pricing-4__heading {
      text-align: center;
      max-width: 820px;
      margin: 0 auto 2.25rem;
      padding: 0 0.75rem;
    }

    .zigrow-pricing-4 .zigrow-pricing-4__title {
      margin: 0;
      font-size: clamp(1.55rem, 3vw, 2.2rem);
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.02em;
    }

    .zigrow-pricing-4 .zigrow-pricing-4__subtext {
      margin: 0.75rem 0 0;
      color: var(--secondary-colors, #6b7280);
      font-size: 0.95rem;
      line-height: 1.6;
    }

    /* =========================
       CARDS
    ========================== */
    .zigrow-pricing-4 .zigrow-pricing-4__card {
      background: #ffffff;
      border-radius: 14px;
      padding: 1.55rem 1.45rem 1.4rem;
      border: 1px solid #eef0f4;
      box-shadow: 0 10px 28px rgba(15, 23, 42, 0.06);
      height: 100%;
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      position: relative;
      overflow: hidden;
    }

    .zigrow-pricing-4 .zigrow-pricing-4__card:hover {
      transform: translateY(-4px);
      box-shadow: 0 16px 36px rgba(15, 23, 42, 0.09);
    }

    .zigrow-pricing-4 .zigrow-pricing-4__card--featured {
      background: var(--primary-colors, #2f564a);
      border-color: rgba(255, 255, 255, 0.14);
    }

    .zigrow-pricing-4 .zigrow-pricing-4__plan {
      margin: 0;
      font-size: 0.78rem;
      font-weight: 800;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: #0f172a;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }

    .zigrow-pricing-4 .zigrow-pricing-4__plan i {
      font-size: 0.7rem;
      color: var(--territory-colors, #ffc700);
    }

    .zigrow-pricing-4 .zigrow-pricing-4__price {
      margin: 0.75rem 0 0;
      font-size: 2.1rem;
      font-weight: 900;
      letter-spacing: -0.02em;
      color: #0f172a;
    }

    .zigrow-pricing-4 .zigrow-pricing-4__per {
      margin: 0.2rem 0 0;
      font-size: 0.86rem;
      font-weight: 700;
      color: var(--secondary-colors, #6b7280);
    }

    .zigrow-pricing-4 .zigrow-pricing-4__desc {
      margin: 1rem 0 1.15rem;
      color: var(--secondary-colors, #6b7280);
      font-size: 0.93rem;
      line-height: 1.6;
    }

    .zigrow-pricing-4 .zigrow-pricing-4__divider {
      height: 1px;
      background: #eef0f4;
      margin: 1.1rem 0 1.1rem;
    }

    /* list */
    .zigrow-pricing-4 .zigrow-pricing-4__list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .zigrow-pricing-4 .zigrow-pricing-4__list li {
      margin: 0.65rem 0;
      color: #4b5563;
      font-size: 0.92rem;
      line-height: 1.35;
      display: flex;
      gap: 0.65rem;
      align-items: flex-start;
    }

    .zigrow-pricing-4 .zigrow-pricing-4__list li i {
      font-size: 1rem;
      line-height: 1.1;
      opacity: 0.85;
    }

    /* button */
    .zigrow-pricing-4 .zigrow-pricing-4__btn {
      width: 100%;
      border: 0;
      border-radius: 999px;
      padding: 0.85rem 1rem;
      font-weight: 900;
      font-size: 0.95rem;
      cursor: pointer;
      transition: transform 0.18s ease, filter 0.18s ease;
      background: var(--primary-colors, #2f564a);
      color: #ffffff;
      margin-top: 1.25rem;
    }

    .zigrow-pricing-4 .zigrow-pricing-4__btn:hover {
      transform: translateY(-1px);
      filter: brightness(0.98);
    }

    /* featured overrides */
    .zigrow-pricing-4
      .zigrow-pricing-4__card--featured
      .zigrow-pricing-4__plan,
    .zigrow-pricing-4
      .zigrow-pricing-4__card--featured
      .zigrow-pricing-4__price,
    .zigrow-pricing-4
      .zigrow-pricing-4__card--featured
      .zigrow-pricing-4__desc,
    .zigrow-pricing-4
      .zigrow-pricing-4__card--featured
      .zigrow-pricing-4__list
      li {
      color: rgba(255, 255, 255, 0.92);
    }

    .zigrow-pricing-4
      .zigrow-pricing-4__card--featured
      .zigrow-pricing-4__per {
      color: var(--territory-colors, #ffc700);
    }

    .zigrow-pricing-4
      .zigrow-pricing-4__card--featured
      .zigrow-pricing-4__divider {
      background: rgba(255, 255, 255, 0.18);
    }

    .zigrow-pricing-4
      .zigrow-pricing-4__card--featured
      .zigrow-pricing-4__btn {
      background: #ffffff;
      color: var(--primary-colors, #2f564a);
    }

    .zigrow-pricing-4
      .zigrow-pricing-4__card--featured
      .zigrow-pricing-4__list
      li
      i {
      opacity: 0.95;
    }

    /* responsive */
    @media (max-width: 767.98px) {
      .zigrow-pricing-4 {
        padding: 2.5rem 0;
      }
      .zigrow-pricing-4 .zigrow-pricing-4__card {
        padding: 1.35rem 1.2rem 1.15rem;
      }
    }
  </style>

  <!-- NOTE: Bootstrap Icons link should be loaded globally in <head>. -->
  <script>
    (function () {
      const cards = Array.from(
        document.querySelectorAll(".zigrow-pricing-4__card")
      );
      if (!cards.length) return;

      function setActive(card) {
        cards.forEach((c) => c.classList.remove("is-active"));
        card.classList.add("is-active");
      }

      cards.forEach((card) => {
        card.addEventListener("click", () => setActive(card));
        card.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setActive(card);
          }
        });

        const btn = card.querySelector(".zigrow-pricing-4__btn");
        if (btn) {
          btn.addEventListener("click", (e) => {
            e.stopPropagation();
            setActive(card);
          });
        }
      });
    })();
  </script>
</section>
`,
});

// Team Blocks
Vvveb.Blocks.add("bootstrap4/zigrow-team-1", {
    name: "Team-1",
    category: "team",
    image: "https://i.postimg.cc/4Nvj0pPz/Screenshot-2025-11-20-153848.png",
    html: `  <section
      id="zigrow-team-1"
      data-section="zigrow-team-1"
      class="zigrow-team-1 py-6"
    >
      <div class="container">
        <!-- Section Title -->
        <div class="section-title">
          <h6 class="section-subtitle">Testimonials</h6>
          <h2 class="section-heading">What Clients Think About Us</h2>
        </div>

        <!-- Testimonials Grid -->
        <div class="zigrow-team-1-grid py-4">
          <div class="row g-3">
            <div class="col-12 col-md-6 col-lg-4 clonable-card">
              <div class="testimonial-card">
                <div class="testimonial-icon">
                  <i class="bi bi-quote" data-icon="quote"></i>
                </div>
                <p class="testimonial-text">
                  Click edit button to change this text. Lorem ipsum dolor sit
                  amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
                  ullamcorper mattis, pulvinar dapibus leo.
                </p>
                <h4 class="testimonial-name">Aanand kumar</h4>
                <span class="testimonial-role">CEO & Founder Crix</span>
              </div>
            </div>

            <div class="col-12 col-md-6 col-lg-4 clonable-card">
              <div class="testimonial-card">
                <div class="testimonial-icon">
                  <i class="bi bi-quote" data-icon="quote"></i>
                </div>
                <p class="testimonial-text">
                  Click edit button to change this text. Lorem ipsum dolor sit
                  amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
                  ullamcorper mattis, pulvinar dapibus leo.
                </p>
                <h4 class="testimonial-name">Ankit singh</h4>
                <span class="testimonial-role">Director at Dynamic</span>
              </div>
            </div>

            <div class="col-12 col-md-6 col-lg-4 clonable-card">
              <div class="testimonial-card">
                <div class="testimonial-icon">
                  <i class="bi bi-quote" data-icon="quote"></i>
                </div>
                <p class="testimonial-text">
                  Click edit button to change this text. Lorem ipsum dolor sit
                  amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
                  ullamcorper mattis, pulvinar dapibus leo.
                </p>
                <h4 class="testimonial-name">Manish kumar</h4>
                <span class="testimonial-role">Director at Initech</span>
              </div>
            </div>
          </div>
        </div>
      </div>
          <style>
      .py-6 {
        padding: 3rem 0;
      }
      .zigrow-team-1 {
        background: #f2f4f7;
      }
      .zigrow-team-1 .section-title {
        text-align: center;
        margin-bottom: 2.5rem;
      }
      .zigrow-team-1 .section-title .section-subtitle {
        color: var(--primary-colors, #0056ff);
        font-size: 0.9rem;
        text-transform: uppercase;
        margin-bottom: 0.5rem;
        font-weight: 600;
      }
      .zigrow-team-1 .section-title .section-heading {
        font-size: 2rem;
        font-weight: 700;
        color: rgb(0, 0, 38);
      }
      .zigrow-team-1 .zigrow-team-1-grid {
        /* display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1.5rem; */
        margin-bottom: 3rem;
      }
      .zigrow-team-1 .zigrow-team-1-grid .testimonial-card {
        background: var(--primary-colors, #f2f4f7);
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      .zigrow-team-1 .zigrow-team-1-grid .testimonial-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
      }
      .zigrow-team-1 .zigrow-team-1-grid .testimonial-card .testimonial-icon i {
        font-size: 1.6rem;
        color: rgb(0, 0, 38);
        margin-bottom: 1rem;
      }
      .zigrow-team-1 .zigrow-team-1-grid .testimonial-card .testimonial-text {
        color: var(--secondary-colors, #555);
        font-size: 1rem;
        line-height: 1.6;
        margin-bottom: 1.5rem;
      }
      .zigrow-team-1 .zigrow-team-1-grid .testimonial-card .testimonial-name {
        font-size: 1.1rem;
        font-weight: 700;
        margin-bottom: 0.3rem;
      }
      .zigrow-team-1 .zigrow-team-1-grid .testimonial-card .testimonial-role {
        color: var(--secondary-colors, #777);
        font-size: 0.9rem;
      }
    </style>
    </section>`,
});

Vvveb.Blocks.add("bootstrap4/zigrow-team-2", {
    name: "Team-2",
    category: "team",
    image: "https://i.postimg.cc/xC3RtdfP/team-2.png",
    html: `    <section
      class="zigrow-team-2 py-6"
      data-section="zigrow-team-2"
      id="zigrow-team-2"
    >
      <div class="container">
        <p class="section-subtitle">WHAT YOU SAY</p>

        <div class="testimonial-card">
          <!-- Bootstrap grid controls layout -->
          <div class="row g-4 g-md-0">
            <!-- Image column -->
            <div class="col-12 col-md-4">
              <div class="testimonial-image h-100">
                 <img
              src="/builder/img/zigrow-icon-images/zigrow-team-2-design.jpg"
              alt="Parent and child"
            />
              </div>
            </div>

            <!-- Content column -->
            <div class="col-12 col-md-8">
              <div class="testimonial-content">
                <span class="quote-mark">“</span>
               <p class="testimonial-text">
                  Working with this team was a smooth and reassuring experience from start to finish. They understood exactly what we needed, communicated clearly at every step, and delivered results that truly made a difference for our business.
                </p>
                <p class="testimonial-author">Ramita jain</p>
              </div>
            </div>
          </div>
        </div>
      </div>
       <style>
      .py-6 {
        padding: 3rem 0;
      }

      .zigrow-team-2 {
        background-color: #fff;
      }

      .zigrow-team-2 .section-subtitle {
        font-size: 0.85rem;
        font-weight: 600;
        letter-spacing: 1px;
        color: var(--secondary-colors, #444);
        text-align: center;
        margin-bottom: 2rem;
      }

      /* Card wrapper – no flex here, Bootstrap handles layout inside */
      .zigrow-team-2 .testimonial-card {
        background-color: #fff;
        border: 2px solid var(--territory-colors, #c3ebf0);
        border-radius: 1rem;
        overflow: visible;
        max-width: 900px;
        margin: 0 auto;
      }

      .zigrow-team-2 .testimonial-image {
        text-align: center;
        position: relative;
        /* height: 100%; */
      }

      .zigrow-team-2 .testimonial-image img {
        max-width: 100%;
         max-height: 100%; 
        height: calc(100% + 50px);
        object-fit: cover;
        position: relative;
        top: -20px;
        border-radius: 1rem;
      }

      .zigrow-team-2 .testimonial-content {
        padding: 2rem;
      }

      @media (min-width: 992px) {
        .zigrow-team-2 .testimonial-content {
          padding: 5rem;
        }
      }

      .zigrow-team-2 .testimonial-content .quote-mark {
        font-size: 4rem;
        color: var(--primary-colors, #ff7f32);
        line-height: 0;
        display: block;
        margin-bottom: 0.5rem;
      }

      .zigrow-team-2 .testimonial-content .testimonial-text {
        font-size: 1.2rem;
        color: var(--secondary-colors, #595757);
        line-height: 1.6;
        margin-bottom: 1rem;
      }

      .zigrow-team-2 .testimonial-content .testimonial-author {
        font-weight: 700;
        color: #192b3f;
        margin: 0;
      }
    </style>
    </section>`,
});

Vvveb.Blocks.add("bootstrap4/zigrow-team-3", {
    name: "Team-3",
    category: "team",
    image: "https://i.postimg.cc/k4vcf5Jx/team-3.png",
    html: `   <section
      id="zigrow-team-3"
      data-section="zigrow-team-3"
      class="zigrow-team-3 py-6"
    >
      <div class="container">
        <div class="wrap">
          <div class="zigrow-team-3-heading">
            <h6>What Our Clients Say</h6>
            <h3>Testimonial</h3>
          </div>

          <!-- Bootstrap grid instead of CSS grid -->
          <div class="row g-3">
            <div class="col-12 col-md-6 clonable-card">
              <div class="zigrow-team-3-card">
                <div class="client-img-box">
                  <div class="client-img">
                     <img
                 src="/builder/img/zigrow-team-images/1.png"
                  alt="Anita Singh profile"
                />
                  </div>
                </div>
                <h5>Engineering Manager</h5>
                <h3>Anita Singh</h3>
                <p>
                  Outstanding experience — the team delivered exactly what we
                  needed with great attention to detail.
                </p>
              </div>
            </div>

            <div class="col-12 col-md-6 clonable-card">
              <div class="zigrow-team-3-card">
                <div class="client-img-box">
                  <div class="client-img">
                    <img
               src="/builder/img/zigrow-team-images/2.png"
                  alt="Amit Singh profile"
                />
                  </div>
                </div>
                <h5>Engineering Manager</h5>
                <h3>Amit Singh</h3>
                <p>
                  Highly professional and reliable. Their solutions helped us
                  streamline our entire workflow efficiently.
                </p>
              </div>
            </div>

            <div class="col-12 col-md-6 clonable-card">
              <div class="zigrow-team-3-card">
                <div class="client-img-box">
                  <div class="client-img">
                      <img
                  src="/builder/img/zigrow-team-images/3.png"
                  alt="Atul Kumar profile"
                />
                  </div>
                </div>
                <h5>Engineering Manager</h5>
                <h3>Atul Kumar</h3>
                <p>
                  Excellent service with strong execution. They understood our
                  requirements clearly and delivered confidently.
                </p>
              </div>
            </div>

            <div class="col-12 col-md-6 clonable-card">
              <div class="zigrow-team-3-card">
                <div class="client-img-box">
                  <div class="client-img">
                    <img
                  src="/builder/img/zigrow-team-images/4.png"
                  alt="Manish Kumar profile"
                />
                  </div>
                </div>
                <h5>Engineering Manager</h5>
                <h3>Manish Kumar</h3>
                <p>
                  Truly dependable and skilled. Their support helped us achieve
                  better performance across our projects.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
        <style>
      /* :root {
        --primary-colors: #feb909;
        --secondary-colors: #595f6b;
        --territory-colors: #1c2b45;
        --text-light: #ffffff;
      } */
      .py-6 {
        padding: 3rem 0;
      }
      .zigrow-team-3 {
        background: var(--text-light, #ffffff);
        color: var(--territory-colors,#1c2b45);
      }

      /* Heading */
      .zigrow-team-3 .zigrow-team-3-heading {
        text-align: center;
        padding-bottom: clamp(12px, 2vw, 20px);
      }

      .zigrow-team-3 .zigrow-team-3-heading h6 {
        font-size: clamp(12px, 1.4vw, 16px);
        color: var(--primary-colors, #feb909);
        text-transform: uppercase;
        letter-spacing: 1px;
        margin: 0 0 6px;
        opacity: 0.9;
      }

      .zigrow-team-3 .zigrow-team-3-heading h3 {
        font-size: clamp(20px, 3vw, 32px);
        font-weight: 800;
        color: rgb(43, 41, 41);
        margin: 0;
      }

      /* Card */
      .zigrow-team-3 .zigrow-team-3-card {
        text-align: start;
        background: var(--territory-colors,#1c2b45);
        color: #fff;
        border-bottom: 4px solid var(--primary-colors, #feb909);
        padding: clamp(16px, 2.5vw, 24px);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
        transition: transform 0.3s ease;
        border-radius: 0.5rem;
        height: 100%; /* so all cards match height in row */
      }

      .zigrow-team-3 .zigrow-team-3-card:hover {
        transform: translateY(-5px);
      }

      /* Image wrapper – separate div per image */
      .zigrow-team-3 .client-img-box {
        display: inline-block;
        /* align-items: start; */
      }

      .zigrow-team-3 .client-img {
        text-align: center;
        margin-bottom: 0.8rem;
        border-radius: 50%;
        align-items: start;
      }

      .zigrow-team-3 .client-img img {
        width: 80px;
        height: 80px;
        max-width: 100%;
        max-height: 100%;
        border-radius: 50%;
        object-fit: cover;
        border: 3px solid #ddd;
        cursor: pointer;
      }

      .zigrow-team-3 .zigrow-team-3-card h5 {
        font-size: clamp(14px, 1.6vw, 18px);
        margin: 1rem 0;
        color: var(--primary-colors, #feb909);
        font-weight: 700;
      }

      .zigrow-team-3 .zigrow-team-3-card h3 {
        font-size: clamp(16px, 2vw, 22px);
        font-weight: 800;
        margin: 1rem 0;
        color: #fff;
      }

      .zigrow-team-3 .zigrow-team-3-card p {
        font-size: clamp(13px, 1.6vw, 15px);
        margin: 0;
        line-height: 1.7;
        color: var(--text-light, #ffffff);
      }

      @media (max-width: 576px) {
        .zigrow-team-3 .zigrow-team-3-card {
          padding: 24px 16px;
        }
        .zigrow-team-3 .client-img img {
          width: 60px;
          height: 60px;
        }
      }
    </style>
    </section>`,
});

Vvveb.Blocks.add("bootstrap4/zigrow-team-4", {
    name: "Team-4",
    category: "team",
    image: "https://i.postimg.cc/hj1rpGDm/team-4.png",
    html: `    <section id="zigrow-team-4" data-section="zigrow-team-4" class="zigrow-team-4 py-6">
      <div class="container">
        <div class="brand-text row g-4">
          <div class="brand-heading col-12 col-md-7">
            <h6>our partners</h6>
            <h1>Brands & companies <br />we worked width.</h1>
          </div>
          <p class="col-12 col-md-5">
            From startups to established enterprises, trust our commitment we’ve
            collaborated with brands that trust our commitment to quality and
            trust our commitment innovation.
          </p>
        </div>

        <!-- ✅ Bootstrap grid for logos -->
        <div class="logo-box">
          <div class="row g-4 logo-box-container">
            <div class="col-6 col-sm-4 col-md-3 col-lg-2">
              <div class="logo-img-box">
                <img  src="/builder/img/zigrow-logo-images/1.svg" alt="logoipsum" />
              </div>
            </div>
            <div class="col-6 col-sm-4 col-md-3 col-lg-2">
              <div class="logo-img-box">
               <img  src="/builder/img/zigrow-logo-images/2.svg" alt="logoipsum" />
              </div>
            </div>
            <div class="col-6 col-sm-4 col-md-3 col-lg-2">
              <div class="logo-img-box">
              <img  src="/builder/img/zigrow-logo-images/1.svg" alt="logoipsum" />
              </div>
            </div>
            <div class="col-6 col-sm-4 col-md-3 col-lg-2">
              <div class="logo-img-box">
               <img  src="/builder/img/zigrow-logo-images/2.svg" alt="logoipsum" />
              </div>
            </div>
            <div class="col-6 col-sm-4 col-md-3 col-lg-2">
              <div class="logo-img-box">
             <img  src="/builder/img/zigrow-logo-images/1.svg" alt="logoipsum" />
              </div>
            </div>
          </div>
        </div>
      </div>
          <style>
      .py-6 {
        padding: 3rem 0;
      }

      .zigrow-team-4 .brand-text {
        align-items: center;
      }
      .zigrow-team-4 .brand-text .brand-heading h6 {
        text-transform: uppercase;
        color: var(--primary-colors, #facc15);
      }
      .zigrow-team-4 .brand-text .brand-heading h1 {
        font-size: 2.8rem;
        font-weight: 700;
      }
      .zigrow-team-4 .brand-text p {
        color: var(--secondary-colors, gray);
      }

      /* ✅ Removed flex from .logo-box; only spacing now */
      .zigrow-team-4 .logo-box {
        padding-top: 3rem;
        padding-bottom: 1rem;
      }
      .zigrow-team-4 .logo-box-container {
        justify-content: space-between;
      }

      /* ✅ New wrapper for each logo */
      .zigrow-team-4 .logo-img-box {
        text-align: center;
        max-width: 200px;
      }

      .zigrow-team-4 .logo-img-box img {
        max-width: 100%;
        max-height: 100%;
        object-fit: cover;
        cursor: pointer;
        /* display: inline-block; */
      }
    </style>
    </section>`,
});

Vvveb.Blocks.add("bootstrap4/zigrow-team-5", {
    name: "Team-5",
    category: "team",
    image: "https://i.postimg.cc/Jz1SCtYB/Screenshot-2025-11-20-153903.png",
    html: ` <section
      id="zigrow-team-5"
      data-section="zigrow-team-5"
      class="zigrow-team-5 py-6"
    >
      <div class="container">
        <div class="zigrow-team-5-grid">
          <!-- ⭐ Bootstrap row with spacing -->
          <div class="row g-4">
            <!-- Testimonial 1 -->
            <div class="col-12 col-md-6 col-lg-4 clonable-card">
              <div class="testimonial-card">
                <div class="testimonial-header">
                  <div class="stars">
                    <i class="bi bi-star-fill" data-icon="star"></i>
                    <i class="bi bi-star-fill" data-icon="star"></i>
                    <i class="bi bi-star-fill" data-icon="star"></i>
                    <i class="bi bi-star-fill" data-icon="star"></i>
                    <i class="bi bi-star-fill" data-icon="star"></i>
                  </div>
                  <div class="source"><p>G+</p></div>
                </div>
                <p>
                  “Sit cursus quam sagittis pellentesque iaculis mauris purus
                  tincidunt urna ullamcorper viverra aliquet aliquet donec non
                  molestie egestas cursus amet eu facilisi varius libero diam
                  pharetra odio pharetra at cras aliquam.”
                </p>
                <div class="testimonial-footer">
                  <div class="img-container">
                    <img src="/builder/img/zigrow-team-images/2.png" alt="Manish singh" />
                  </div>
                  <div>
                    <h4>Manish singh</h4>
                    <span>Lawyer</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Testimonial 2 -->
            <div class="col-12 col-md-6 col-lg-4 clonable-card">
              <div class="testimonial-card">
                <div class="testimonial-header">
                  <div class="stars">
                    <i class="bi bi-star-fill" data-icon="star"></i>
                    <i class="bi bi-star-fill" data-icon="star"></i>
                    <i class="bi bi-star-fill" data-icon="star"></i>
                    <i class="bi bi-star-fill" data-icon="star"></i>
                    <i class="bi bi-star-fill" data-icon="star"></i>
                  </div>
                  <div class="source"><p>G+</p></div>
                </div>
                <p>
                  “Nisl ac massa porttitor adipiscing pretium nec sit turpis in
                  adipiscing faucibus quam consectetur pellentesque et mi
                  molestie amet, et, platea facilisi malesuada vitae in
                  scelerisque elementum vestibulum accumsan at etiam vitae.”
                </p>
                <div class="testimonial-footer">
                  <div class="img-container">
                   <img src="/builder/img/zigrow-team-images/2.png" alt="Navnit singh" />
                  </div>
                  <div>
                    <h4>Navnit singh</h4>
                    <span>Mechanic</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Testimonial 3 -->
            <div class="col-12 col-md-6 col-lg-4 clonable-card">
              <div class="testimonial-card">
                <div class="testimonial-header">
                  <div class="stars">
                    <i class="bi bi-star-fill" data-icon="star"></i>
                    <i class="bi bi-star-fill" data-icon="star"></i>
                    <i class="bi bi-star-fill" data-icon="star"></i>
                    <i class="bi bi-star-fill" data-icon="star"></i>
                    <i class="bi bi-star-fill" data-icon="star"></i>
                  </div>
                  <div class="source"><p>G+</p></div>
                </div>
                <p>
                  “Tristique sed odio nunc ut morbi sit urna, vitae, sed
                  pellentesque massa, pellentesque lacinia sapien tempor enim
                  netus euismod tincidunt varius malesuada ornare morbi lorem
                  suspendisse non posuere penatibus tincidunt aliquam lorem.”
                </p>
                <div class="testimonial-footer">
                  <div class="img-container">
                   <img src="/builder/img/zigrow-team-images/1.png"  alt="Nicky" />
                  </div>
                  <div>
                    <h4>Nicky</h4>
                    <span>Dancer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- end row -->
        </div>
      </div>
       <style>
      .py-6 {
        padding: 3rem 0;
      }

      .zigrow-team-5 .testimonial-card {
        border: 2px solid var(--secondary-colors, #ddd);
        border-radius: 12px 12px 12px 0px;
        padding: 1.8rem;
        background: #fff;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        cursor: pointer;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      .zigrow-team-5 .testimonial-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
      }
      .zigrow-team-5 .testimonial-card .testimonial-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
      }
      .zigrow-team-5 .testimonial-card .testimonial-header .stars i {
        color: var(--primary-colors, #06d58d);
        font-size: 0.8rem;
      }
      .zigrow-team-5 .testimonial-card .testimonial-header .source p {
        font-size: 2.8rem;
        font-weight: 600;
        color: var(--secondary-colors, #d3d3d3);
      }
      .zigrow-team-5 .testimonial-card p {
        font-size: 1.1rem;
        line-height: 1.6;
        color: #333;
        font-weight: 500;
        margin-bottom: 1.5rem;
      }
      .zigrow-team-5 .testimonial-card .testimonial-footer {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }
      .zigrow-team-5 .testimonial-card .testimonial-footer .img-container {
        text-align: center;
        border-radius: 50%;
      }
      .zigrow-team-5 .testimonial-card .testimonial-footer .img-container img {
        width: 45px;
        height: 45px;
        max-width: 100%;
        max-height: 100%;
        border-radius: 50%;
        object-fit: cover;
      }
      .zigrow-team-5 .testimonial-card .testimonial-footer h4 {
        font-size: 1rem;
        font-weight: 600;
        margin: 0;
      }
      .zigrow-team-5 .testimonial-card .testimonial-footer span {
        font-size: 0.85rem;
        color: var(--secondary-colors, 0.777);
      }
    </style>
    </section>`,
});

// Products
Vvveb.Blocks.add("bootstrap4/zigrow-product-1", {
    name: "Product-1",
    category: "product",
    image: "https://i.postimg.cc/hPHKHMx6/product1.png",
    html: `  <section
      class="zigrow-product-1 py-6"
      id="zigrow-product-1"
      data-section="zigrow-product-1"
    >
      <div class="container">
        <!-- Heading -->
        <div class="row mb-4">
          <div class="col-12 col-lg-6">
            <div>
              <h2 class="shop-heading-small">SHOP</h2>
              <h2 class="shop-heading-big">OUR PRODUCTS</h2>
            </div>
          </div>
        </div>

        <div class="row g-3">
          <!-- Card 1 -->
          <div class="col-12 col-md-6 col-lg-4 clonable-card">
            <div class="product-card">
              <!-- Wrapped image -->
              <div class="product-img-wrapper">
                <img src="/builder/img/zigrow-product-images/zigrow-product-1-1.webp" alt="Office 1" alt="Casual Wear" />
              </div>

              <div class="product-overlay">
                <span class="product-title">Products name</span>
                <a href="#" class="product-btn" data-btn="product-1">
                  See all
                  <i class="bi bi-arrow-right" data-icon="arrow-right"></i>
                </a>
              </div>
            </div>
          </div>

          <!-- Card 2 -->
          <div class="col-12 col-md-6 col-lg-4 clonable-card">
            <div class="product-card">
              <div class="product-img-wrapper">
                <img src="/builder/img/zigrow-product-images/zigrow-product-1-2.webp" alt="Activewear" />
              </div>

              <div class="product-overlay">
                <span class="product-title">Products name</span>
                <a href="#" class="product-btn" data-btn="product-2">
                  See all
                  <i class="bi bi-arrow-right" data-icon="arrow-right"></i>
                </a>
              </div>
            </div>
          </div>

          <!-- Card 3 -->
          <div class="col-12 col-md-6 col-lg-4 clonable-card">
            <div class="product-card">
              <div class="product-img-wrapper">
                <img src="/builder/img/zigrow-product-images/zigrow-product-1-3.webp" alt="Formal Attire" />
              </div>

              <div class="product-overlay">
                <span class="product-title">Products name</span>
                <a href="#" class="product-btn" data-btn="product-3">
                  See all
                  <i class="bi bi-arrow-right" data-icon="arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
          <style>
      .zigrow-product-1 {
        background-color: #ffffff;
      }
      .py-6 {
        padding: 3rem 0;
      }

      .shop-heading-small {
        font-size: 2.5rem;
        font-weight: 900;
        line-height: 0.9;
        text-transform: uppercase;
        @media (max-width: 768px) {
          font-size: 2rem;
        }
      }

      .shop-heading-big {
        font-size: 3.5rem;
        font-weight: 900;
        line-height: 0.9;
        text-transform: uppercase;
        @media (max-width: 768px) {
          font-size: 2.5rem;
        }
      }

      .product-card {
        position: relative;
        overflow: hidden;
        /* border-radius: 12px; */
        /* min-height: 340px; */
        background-color: #f3f3f3;
      }

      /* New wrapper around images */
      .product-img-wrapper {
        text-align: center;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }

      .product-img-wrapper img {
        max-width: 100%;
        max-height: 100%;
        object-fit: cover;
        aspect-ratio: 4/5;
      }

      .product-overlay {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 1.5rem;
        color: #fff;
        background: linear-gradient(
          to top,
          rgba(0, 0, 0, 0.6),
          rgba(0, 0, 0, 0)
        );
      }

      .product-title {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 0.75rem;
      }

      .product-btn {
        display: inline-block;
        padding: 0.55rem 1.4rem;
        font-size: 0.95rem;
        border-radius: 999px;
        background: #fff;
        color: #000;
        font-weight: 600;
        text-decoration: none;
        transition: all 0.3s ease;
      }

      .product-btn i {
        transition: transform 0.3s ease;
      }

      .product-btn:hover {
        background-color: var(--primary-colors, rgb(222, 188, 52));
      }

      .product-btn:hover i {
        transform: translateX(4px);
      }

      @media (max-width: 575.98px) {
        .product-card {
          min-height: 320px;
        }
      }
    </style>
    </section>
  `,
});
Vvveb.Blocks.add("bootstrap4/zigrow-product-2", {
    name: "Product-2",
    category: "product",
    image: "https://i.postimg.cc/t4W9yPtB/product2.png",
    html: ` <section
      class="zigrow-product-2 py-6"
      id="zigrow-product-2"
      data-section="zigrow-product-2"
    >
      <div class="container">
        <!-- Heading -->
        <div class="row mb-4 mb-lg-5">
          <div class="col-12 col-lg-5">
            <h2 class="gear-heading">
              EXPLORE OUR<br />
              <span>SPORTS GEAR COLLECTION</span>
            </h2>
          </div>
        </div>

        <!-- Cards -->
        <div class="row gy-4 gx-0 gx-md-3">
          <!-- Card 1 -->
          <div class="col-12 col-sm-6 col-lg-3 clonable-card">
            <div class="gear-card gear-card-first">
              <div class="gear-img-wrapper">
                <img src="/builder/img/zigrow-product-images/zigrow-product-2-1.webp" alt="item-1" />
              </div>
              <p class="gear-label-bottom">Category-1</p>
            </div>
          </div>

          <!-- Card 2 -->
          <div class="col-12 col-sm-6 col-lg-3 clonable-card">
            <div class="gear-card">
              <p class="gear-label-top">Category-2</p>
              <div class="gear-img-wrapper">
                <img src="/builder/img/zigrow-product-images/zigrow-product-2-2.webp"  alt="item-2" />
              </div>
            </div>
          </div>

          <!-- Card 3 -->
          <div class="col-12 col-sm-6 col-lg-3 clonable-card">
            <div class="gear-card">
              <div class="gear-img-wrapper">
                <img src="/builder/img/zigrow-product-images/zigrow-product-2-3.webp"  alt="item-3" />
              </div>
              <p class="gear-label-bottom">Category-3</p>
            </div>
          </div>

          <!-- Card 4 -->
          <div class="col-12 col-sm-6 col-lg-3 clonable-card">
            <div class="gear-card gear-card-last">
              <p class="gear-label-top">Category-4</p>
              <div class="gear-img-wrapper">
                <img src="/builder/img/zigrow-product-images/zigrow-product-2-4.webp"  alt="item-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
        <style>
      /* =============================================================
       MAIN SECTION
    ============================================================= */
      .zigrow-product-2 {
        background-color: #ffffff;
      }
      .py-6 {
        padding: 3rem 0;
      }

      .zigrow-product-2 .gear-heading {
        font-weight: 700;
        font-size: 2.1rem;
        line-height: 1.1;
        text-transform: uppercase;
      }

      .zigrow-product-2 .gear-heading span {
        font-weight: 900;
      }

      @media (max-width: 767.98px) {
        .zigrow-product-2 .gear-heading {
          text-align: center;
          font-size: 1.8rem;
          margin-bottom: 1.75rem;
        }
      }

      /* =============================================================
       CARD WRAPPER
    ============================================================= */
      .gear-card {
        background-color: #ffffff;
        border-left: 2px solid #dcdcdc;
        border-right: 2px solid #dcdcdc;
        padding-bottom: 0.6rem;
        height: 100%;
      }

      /* remove extra borders for first and last card on desktop */
      @media (min-width: 992px) {
        .gear-card-first {
          border-left: 0;
        }
        .gear-card-last {
          border-right: 0;
        }
      }

      .gear-card .gear-img-wrapper {
        width: 100%;
        padding: 0.8rem;
        overflow: hidden;
        text-align: center;
      }

      .gear-card .gear-img-wrapper img {
        max-width: 100%;
        max-height: 100%;
        object-fit: cover;
      }

      .gear-card .gear-label-top,
      .gear-card .gear-label-bottom {
        font-size: 0.9rem;
        font-weight: 600;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        padding: 0.45rem 0.75rem;
        margin: 0;
      }

      .gear-card .gear-label-top {
        border-bottom: 2px solid #dcdcdc;
      }

      .gear-card .gear-label-bottom {
        border-top: 2px solid #dcdcdc;
      }
    </style>
    </section>`,
});
Vvveb.Blocks.add("bootstrap4/zigrow-product-3", {
    name: "Product-3",
    category: "product",
    image: "https://i.postimg.cc/GhZbZzGw/product3.png",
    html: `   <section
      class="zigrow-product-3 py-6"
      id="zigrow-product-3"
      data-section="zigrow-product-3"
    >
      <div class="container">
        <!-- Section Heading -->
        <div class="row">
          <div class="col-12 col-lg-6">
            <h2 class="section-title">
              Find the Perfect Piece for<br />
              Every Corner of Your Home
            </h2>
          </div>
        </div>

        <!-- Cards Row -->
        <div class="row gy-4">
          <!-- Card 1: Living Room -->
          <div class="col-12 col-md-6 clonable-card">
            <div class="room-card room-card-light">
              <div class="room-img">
                <img src="/builder/img/zigrow-product-images/zigrow-product-3-1.webp" alt="Living Room" />
              </div>

              <h3 class="room-title">Living Room</h3>
              <p class="room-text">
                Create a cozy gathering space with plush sofas, elegant
                sectionals, and statement tables.
              </p>

              <a href="#" class="room-cta">
                <i class="bi bi-arrow-up-right" data-icon="right-arrow"></i>
              </a>
            </div>
          </div>

          <!-- Card 2: Bedroom -->
          <div class="col-12 col-md-6 clonable-card">
            <div class="room-card room-card-dark">
              <h3 class="room-title">Bedroom</h3>
              <p class="room-text">
                Turn your bedroom into a peaceful sanctuary with luxurious beds
                and minimalist décor.
              </p>

              <div class="room-img">
                <img src="/builder/img/zigrow-product-images/zigrow-product-3-2.webp" alt="Bedroom" />
              </div>

              <a href="#" class="room-cta">
                <i class="bi bi-arrow-up-right" data-icon="right-arrow"></i>
              </a>
            </div>
          </div>

          <!-- Card 3: Dining Room -->
          <div class="col-12 col-md-6 clonable-card">
            <div class="room-card room-card-brown">
              <h3 class="room-title">Dining Room</h3>
              <p class="room-text">
                Bring people together with beautifully crafted dining tables,
                comfy chairs, and warm ambiance.
              </p>

              <div class="room-img">
                <img src="/builder/img/zigrow-product-images/zigrow-product-3-3.webp" alt="Dining Room" />
              </div>

              <a href="#" class="room-cta">
                <i class="bi bi-arrow-up-right" data-icon="right-arrow"></i>
              </a>
            </div>
          </div>

          <!-- Card 4: Home Office -->
          <div class="col-12 col-md-6 clonable-card">
            <div class="room-card room-card-light">
              <div class="room-img">
                <img src="/builder/img/zigrow-product-images/zigrow-product-3-4.webp" alt="Home Office" />
              </div>

              <h3 class="room-title">Home Office</h3>
              <p class="room-text">
                Boost productivity with ergonomic desks, stylish chairs, and
                organized workspace solutions.
              </p>

              <a href="#" class="room-cta">
                <i class="bi bi-arrow-up-right" data-icon="right-arrow"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
         <style>
      /* ===========================================
       SECTION BASE
    ============================================ */
      .zigrow-product-3 {
        background-color: #f5f3e8;
      }
      .py-6 {
        padding: 3rem 0;
      }

      .zigrow-product-3 .section-title {
        color: #1a1a1a;
        font-size: 2.5rem;
        font-weight: 700;
        line-height: 1.3;
        margin-bottom: 2.5rem;
        max-width: 550px;
      }

      @media (max-width: 767px) {
        .zigrow-product-3 .section-title {
          text-align: center;
          font-size: 2rem;
          margin: 0 auto 2rem;
        }
      }

      /* ===========================================
       CARD BASE
    ============================================ */
      .room-card {
        border-radius: 26px;
        padding: 1.8rem;
        height: 100%;
        overflow: hidden;
      }

      /* Light Card */
      .room-card-light {
        background-color: #ffffff;
        color: #1a1a1a;
      }

      /* Dark Green Card */
      .room-card-dark {
        background-color: var(--primary-colors, #0f4734);
        color: #ffffff;
      }

      /* Dark Brown Card (for Dining Room) */
      .room-card-brown {
        background-color: var(--territory-colors, #5b2c19);
        color: #ffffff;
      }

      /* ===========================================
       CARD INNER CONTENT
    ============================================ */
      .room-card .room-title {
        font-weight: 700;
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
      }

      .room-card .room-text {
        font-size: 0.95rem;
        line-height: 1.6;
        margin-bottom: 1.4rem;
      }

      .room-card .room-img {
        text-align: center;
        width: 100%;
        max-height: 300px;
        border-radius: 18px;
        overflow: hidden;
        margin-bottom: 1.4rem;
      }

      .room-card .room-img img {
        border-radius: 18px;
        max-width: 100%;
        height: auto;
        object-fit: cover;
        transition: all 0.3s ease;
        &:hover {
          transform: scale(1.05);
        }
      }

      .room-card .room-cta {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #d1f5da;
        color: var(--primary-colors, #0f4734);
        text-align: center;
        line-height: 40px;
        font-size: 1.1rem;
        text-decoration: none;
        display: inline-block;
      }

      .room-card-dark .room-cta,
      .room-card-brown .room-cta {
        background-color: #bbf7d0;
      }

      @media (max-width: 767px) {
        .room-card {
          max-width: 430px;
          margin-left: auto;
          margin-right: auto;
        }
      }
    </style>
    </section>
    `,
});
Vvveb.Blocks.add("bootstrap4/zigrow-product-4", {
    name: "Product-4",
    category: "product",
    image: "https://i.postimg.cc/P5YdhZz0/product4.png",
    html: `  <section
      class="zigrow-product-4 py-6"
      data-section="zigrow-product-4"
      id="zigrow-product-4"
    >
      <div class="container">
        <p class="section-label">POPULAR PRODUCTS</p>
        <h2 class="section-title">Best and Quality Products</h2>
        <p class="section-subtitle">
          Our mission is to deliver superior products and enhance customer
          lifestyles through quality and innovation.
        </p>

        <div class="row gy-4">
          <!-- PRODUCT 1 -->
          <div class="col-12 col-md-6 col-lg-4 clonable-card">
            <div class="product-card">
              <div class="product-img-box">
                <img src="/builder/img/zigrow-product-images/zigrow-product-4-1.webp" alt="Skincare Application" />
                <a href="#" class="product-add"
                  ><i class="bi bi-plus" data-icon="add"></i
                ></a>
              </div>

              <div class="product-body">
                <p class="product-rating">
                  <i class="bi bi-star-fill" data-icon="star"></i>
                  <i class="bi bi-star-fill" data-icon="star"></i>
                  <i class="bi bi-star-fill" data-icon="star"></i>
                  <i class="bi bi-star-fill" data-icon="star"></i>
                  <i class="bi bi-star-fill" data-icon="star"></i>
                  (12 reviews)
                </p>
                <h5 class="product-title">Skincare Application</h5>
                <p class="product-price">₹120</p>
              </div>

              <div class="product-actions">
                <a href="#" class="product-btn product-btn-dark" data-btn="product-1">
                  BUY NOW <i class="bi bi-arrow-right" data-icon="arrow"></i>
                </a>
                <a href="#" class="product-btn" data-btn="product-1">
                  QUICK VIEW <i class="bi bi-arrow-right" data-icon="arrow"></i>
                </a>
              </div>
            </div>
          </div>

          <!-- PRODUCT 2 -->
          <div class="col-12 col-md-6 col-lg-4 clonable-card">
            <div class="product-card">
              <div class="product-img-box">
                <img src="/builder/img/zigrow-product-images/zigrow-product-4-2.webp" alt="Skin Hydration" />
                <a href="#" class="product-add"
                  ><i class="bi bi-plus" data-icon="add"></i
                ></a>
              </div>

              <div class="product-body">
                <p class="product-rating">
                  <i class="bi bi-star-fill" data-icon="star"></i>
                  <i class="bi bi-star-fill" data-icon="star"></i>
                  <i class="bi bi-star-fill" data-icon="star"></i>
                  <i class="bi bi-star-fill" data-icon="star"></i>
                  <i class="bi bi-star-fill" data-icon="star"></i>
                  (12 reviews)
                </p>
                <h5 class="product-title">Skin Hydration</h5>
                <p class="product-price">₹220</p>
              </div>

              <div class="product-actions">
                <a href="#" class="product-btn product-btn-dark" data-btn="product-2">
                  BUY NOW <i class="bi bi-arrow-right" data-icon="arrow"></i>
                </a>
                <a href="#" class="product-btn" data-btn="product-2">
                  QUICK VIEW <i class="bi bi-arrow-right" data-icon="arrow"></i>
                </a>
              </div>
            </div>
          </div>

          <!-- PRODUCT 3 -->
          <div class="col-12 col-md-6 col-lg-4 clonable-card">
            <div class="product-card">
              <div class="product-img-box">
                <img src="/builder/img/zigrow-product-images/zigrow-product-4-3.webp" alt="Face Cream" />
                <a href="#" class="product-add"
                  ><i class="bi bi-plus" data-icon="add"></i
                ></a>
              </div>

              <div class="product-body">
                <p class="product-rating">
                  <i class="bi bi-star-fill" data-icon="star"></i>
                  <i class="bi bi-star-fill" data-icon="star"></i>
                  <i class="bi bi-star-fill" data-icon="star"></i>
                  <i class="bi bi-star-fill" data-icon="star"></i>
                  <i class="bi bi-star-fill" data-icon="star"></i>
                  (12 reviews)
                </p>
                <h5 class="product-title">Face Cream</h5>
                <p class="product-price">₹300</p>
              </div>

              <div class="product-actions">
                <a href="#" class="product-btn product-btn-dark" data-btn="product-3">
                  BUY NOW <i class="bi bi-arrow-right" data-icon="arrow"></i>
                </a>
                <a href="#" class="product-btn" data-btn="product-3">
                  QUICK VIEW <i class="bi bi-arrow-right" data-icon="arrow"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
         <style>
      /* ============================================================
   SECTION (Parent → Child)
============================================================ */
      .zigrow-product-4 {
        background: #ffffff;
        font-family: system-ui, sans-serif;
      }
      .py-6 {
        padding: 3rem 0;
      }

      .zigrow-product-4 .section-label {
        text-align: center;
        font-size: 0.85rem;
        font-weight: 600;
          color: var(--primary-colors, #666);
        letter-spacing: 0.15em;
        margin-bottom: 0.4rem;
      }

      .zigrow-product-4 .section-title {
        text-align: center;
        font-size: 2.2rem;
        font-weight: 700;
        margin-bottom: 0.6rem;
      }

      .zigrow-product-4 .section-subtitle {
        text-align: center;
        max-width: 650px;
        margin: 0 auto 2rem;
        font-size: 0.95rem;
        color: var(--secondary-colors, #666);
      }

      @media (max-width: 768px) {
        .zigrow-product-4 .section-title {
          font-size: 1.8rem;
        }
        .zigrow-product-4 .section-subtitle {
          padding: 0 1rem;
        }
      }

      /* ============================================================
   PRODUCT CARD (Parent)
============================================================ */
      .product-card {
        border: 2px solid #959494;
        background: #ffffff;
        position: relative;
        height: 100%;
      }

      /* ============================================================
   PRODUCT IMAGE GROUP (Parent → Child → Inner Child)
============================================================ */
      .product-card .product-img-box {
        text-align: center;
        width: 100%;
        aspect-ratio: 14/15;
        overflow: hidden;
        position: relative;
      }

      .product-card .product-img-box img {
        width: 100%;
        height: 100%;
        max-width: 100%;
        max-height: 100%;
        object-fit: cover;
      }

      .product-card .product-img-box .product-add {
        position: absolute;
        top: 12px;
        right: 12px;
        width: 28px;
        height: 28px;
        background: white;
        border: 1px solid #ddd;
        border-radius: 50%;
        line-height: 26px;
        text-align: center;
        font-size: 16px;
        cursor: pointer;
      }
      .product-card .product-img-box .product-add i{
        color: #111;
      }

      /* ============================================================
   PRODUCT CONTENT (Parent → Children)
============================================================ */
      .product-card .product-body {
        padding: 1rem 1.25rem; /* space for bottom buttons */
      }

      .product-card .product-body .product-rating {
        font-size: 0.9rem;
        margin-bottom: 6px;
      }

      .product-card .product-body .product-rating i {
        color: #f5a623;
      }

      .product-card .product-body .product-title {
        font-size: 1.1rem;
        font-weight: 600;
        margin-bottom: 4px;
      }

      .product-card .product-body .product-price {
        font-weight: 700;
        color: var(--primary-colors, #d1002f);
        margin-bottom: 4px;
      }

      /* ============================================================
   PRODUCT BUTTONS (Pinned Bottom)
============================================================ */
      .product-card .product-actions {
        /* padding: 0.75rem 1.25rem; */
        display: flex;
        justify-content: space-between;
        border-top: 1px solid #e6e6e6;
        background: #ffffff;
        @media (max-width: 768px) {
          flex-wrap: wrap;
        }
      }

      .product-card .product-actions .product-btn {
        display: inline-block;
        width: 100%;
        text-align: center;
        padding: 0.55rem 1.1rem;
        border: 1px solid #111;
        text-decoration: none;
        font-weight: 600;
        text-transform: uppercase;
        font-size: 0.85rem;
        color: #111;
        background: #fff;
        /* margin-right: 6px; */
      }

      .product-card .product-actions .product-btn-dark {
         background: var(--primary-colors, #111);
        color: #fff;
      }

      .product-card .product-actions .product-btn i {
        margin-left: 4px;
      }

      /* MOBILE BUTTON FIX */
      @media (max-width: 576px) {
        .product-card .product-actions {
          text-align: center;
        }
        .product-card .product-actions .product-btn {
          margin-bottom: 6px;
        }
      }
    </style>
    </section>`,
});

// Footer
Vvveb.Blocks.add("bootstrap4/zigrow-footer-1", {
    name: "footer-1",
    category: "footer",
    image: "https://i.postimg.cc/gkfGf4Rw/footer-1.png",
    html: `   <footer class="zigrow-footer-1 py-6" data-section="zigrow-footer-1" id="zigrow-footer-1">
      <div class="container">
        <!-- Top: Brand & Description -->
        <div class="row">
          <div class="col-12">
            <div class="zigrow-footer-1__top">
              <h2 class="zigrow-footer-1__brand" data-logo="footer">Willso.</h2>
              <p class="zigrow-footer-1__desc">
               We focus on the details so you don’t have to. Every visit includes a thorough clean, careful handling of your space, and consistent results you can count on. If something isn’t right, we’ll make it right.
              </p>

              <div class="zigrow-footer-1__socials">
                <a
                  href="#"
                  class="zigrow-footer-1__social-link zigrow-footer-1__social-link--facebook"
                  aria-label="Facebook"
                >
                  <i class="bi bi-facebook" data-icon="facebook"></i>
                </a>
                <a
                  href="#"
                  class="zigrow-footer-1__social-link zigrow-footer-1__social-link--twitter"
                  aria-label="Twitter / X"
                >
                  <i class="bi bi-twitter-x" data-icon="twitter"></i>
                </a>
                <a
                  href="#"
                  class="zigrow-footer-1__social-link zigrow-footer-1__social-link--linkedin"
                  aria-label="LinkedIn"
                >
                  <i class="bi bi-linkedin" data-icon="linkedin"></i>
                </a>
                <a
                  href="#"
                  class="zigrow-footer-1__social-link zigrow-footer-1__social-link--instagram"
                  aria-label="Instagram"
                >
                  <i class="bi bi-instagram" data-icon="instagram"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <hr class="zigrow-footer-1__divider" />

        <!-- Bottom Row -->
        <div class="row">
          <!-- Left: Copyright -->
          <div
            class="col-12 col-md-4 zigrow-footer-1__bottom-col zigrow-footer-1__bottom-col--left"
          >
            <p class="zigrow-footer-1__bottom-text">
         Copyright 2025 © <span>all right reserved</span>, Designed by
      <span>Zigrow</span>
            </p>
          </div>

          <!-- Center: Email -->
          <div
            class="col-12 col-md-4 zigrow-footer-1__bottom-col zigrow-footer-1__bottom-col--center"
          >
            <div class="zigrow-footer-1__info">
              <span class="zigrow-footer-1__info-icon">
                <i class="bi bi-envelope-fill" data-icon="email"></i>
              </span>
              <div class="zigrow-footer-1__info-texts">
                <p class="zigrow-footer-1__info-label"><span>Send Us Email</span></p>
                <p class="zigrow-footer-1__info-main">
                  <a href="mailto:info@yourmail.com">
                    yourname@domainname.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          <!-- Right: Location -->
          <div
            class="col-12 col-md-4 zigrow-footer-1__bottom-col zigrow-footer-1__bottom-col--right"
          >
            <div class="zigrow-footer-1__info">
              <span class="zigrow-footer-1__info-icon">
                <i class="bi bi-geo-alt-fill" data-icon="location"></i>
              </span>
              <div class="zigrow-footer-1__info-texts">
                <p class="zigrow-footer-1__info-label"><span>Our Location</span></p>
                <p class="zigrow-footer-1__info-main">
                  E-123, ABC Plaza, XYZ Street, New Delhi - 110077
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
        <style>
      /* =========================
       zigrow-footer-1 BASE
    ==========================*/
      .zigrow-footer-1 {
        background-color: #181818;
        color: #bdbdbd;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
          sans-serif;
      }
      .py-6{
        padding: 3rem 0;
      }

      .zigrow-footer-1 .zigrow-footer-1__top {
        text-align: center;
        margin-bottom: 2rem;
      }

      .zigrow-footer-1 .zigrow-footer-1__brand {
        font-size: 2rem;
        font-weight: 700;
        color: #ffffff;
        margin-bottom: 0.6rem;
      }

      .zigrow-footer-1 .zigrow-footer-1__desc {
        font-size: 0.9rem;
        max-width: 540px;
        margin: 0 auto;
        line-height: 1.6;
      }

      /* =========================
       SOCIAL ICONS
    ==========================*/
      .zigrow-footer-1 .zigrow-footer-1__socials {
        display: flex;
        justify-content: center;
        gap: 0.5rem;
        margin-top: 1.8rem;
        margin-bottom: 2.5rem;
      }

      .zigrow-footer-1 .zigrow-footer-1__social-link {
        width: 40px;
        height: 40px;
        border-radius: 4px;
        border: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        text-decoration: none;
        transition: transform 0.15s ease, box-shadow 0.15s ease;
      }

      .zigrow-footer-1 .zigrow-footer-1__social-link i {
        font-size: 1.1rem;
        color: #ffffff;
      }

      .zigrow-footer-1 .zigrow-footer-1__social-link--facebook {
        background-color: #008046;
      }

      .zigrow-footer-1 .zigrow-footer-1__social-link--twitter {
        background-color: #0a66c2;
      }

      .zigrow-footer-1 .zigrow-footer-1__social-link--linkedin {
        background-color: #d02e2e;
      }

      .zigrow-footer-1 .zigrow-footer-1__social-link--instagram {
        background-color: #ff8a00;
      }

      .zigrow-footer-1 .zigrow-footer-1__social-link:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 14px rgba(0, 0, 0, 0.35);
      }

      /* =========================
       DIVIDER
    ==========================*/
      .zigrow-footer-1 .zigrow-footer-1__divider {
        border: none;
        border-top: 1px solid #2a2a2a;
        margin: 0 auto 1.8rem;
        max-width: 780px;
      }

      /* =========================
       BOTTOM ROW
    ==========================*/
      .zigrow-footer-1 .zigrow-footer-1__bottom-col {
        margin-bottom: 1.2rem;
      }

      .zigrow-footer-1 .zigrow-footer-1__bottom-text {
        font-size: 0.78rem;
        color: #7a7a7a;
        text-align: center;
        margin: 0;
      }

      .zigrow-footer-1 .zigrow-footer-1__info {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
      }

      .zigrow-footer-1 .zigrow-footer-1__info-icon {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        /* border: 1px solid #ff8a00; */
        background-color: #2a2a2a;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        flex-shrink: 0;
      }

      .zigrow-footer-1 .zigrow-footer-1__info-icon i {
        font-size: 1rem;
      }

      .zigrow-footer-1 .zigrow-footer-1__info-texts {
        text-align: left;
      }

      .zigrow-footer-1 .zigrow-footer-1__info-label {
        font-size: 0.78rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: #a0a0a0;
        margin: 0 0 0.1rem;
      }
      .zigrow-footer-1 span {
        color: var(--primary-colors, #ff8a00);
      }

      .zigrow-footer-1 .zigrow-footer-1__info-main {
        font-size: 0.8rem;
        color: #eaeaea;
        margin: 0;
      }

      .zigrow-footer-1 .zigrow-footer-1__info-main a {
        color: #eaeaea;
        text-decoration: none;
      }

      .zigrow-footer-1 .zigrow-footer-1__info-main a:hover {
        text-decoration: underline;
      }

      /* =========================
       RESPONSIVE
    ==========================*/
      @media (min-width: 768px) {
        .zigrow-footer-1 .zigrow-footer-1__bottom-text {
          text-align: left;
        }

        .zigrow-footer-1 .zigrow-footer-1__bottom-col--right .zigrow-footer-1__info {
          justify-content: flex-end;
        }

        .zigrow-footer-1 .zigrow-footer-1__bottom-col--center .zigrow-footer-1__info {
          justify-content: center;
        }
      }

      @media (max-width: 767.98px) {
        .zigrow-footer-1 {
          padding: 2.5rem 0 2rem;
        }

        .zigrow-footer-1 .zigrow-footer-1__top {
          padding: 0 1rem;
        }

        .zigrow-footer-1 .zigrow-footer-1__info {
          align-items: flex-start;
        }
      }
    </style>
    </footer>`,
});

Vvveb.Blocks.add("bootstrap4/zigrow-footer-2", {
    name: "footer-2",
    category: "footer",
    image: "https://i.postimg.cc/KvdmdQLg/footer-2.png",
    html: `  <footer
      class="zigrow-footer-2-evnty py-6"
      data-section="zigrow-footer-2-evnty"
      id="zigrow-footer-2-evnty"
    >
      <div class="container">
        <!-- TOP ROW -->
        <div class="row zigrow-footer-2-evnty__top-row">
          <!-- Brand / description -->
          <div class="col-12 col-md-4">
            <div class="zigrow-footer-2-evnty__brand">
              <div class="zigrow-footer-2-evnty__logo"><p>N</p></div>
              <div class="zigrow-footer-2-evnty__brand-text">
                <h2 class="zigrow-footer-2-evnty__brand-name" data-logo="footer">Evnty</h2>
                <p class="zigrow-footer-2-evnty__brand-desc">
                  Curated events, creative studios, and stories that turn
                  everyday moments into experiences.
                </p>
              </div>
            </div>
          </div>

          <!-- Center navigation -->
          <div class="col-12 col-md-6">
            <nav class="zigrow-footer-2-evnty__nav" aria-label="zigrow-footer-2 navigation">
              <a href="#" class="zigrow-footer-2-evnty__nav-link">Studios</a>
              <a href="#" class="zigrow-footer-2-evnty__nav-link">Features</a>
              <a href="#" class="zigrow-footer-2-evnty__nav-link">News</a>
            </nav>
          </div>

          <!-- Social links (right column: block right, text left) -->
          <div class="col-12 col-md-2">
            <div class="zigrow-footer-2-evnty__social-wrapper">
              <div class="zigrow-footer-2-evnty__social">
                <a href="#" class="zigrow-footer-2-evnty__social-link">
                  <p>Twitter</p>
                </a>
                <a href="#" class="zigrow-footer-2-evnty__social-link">
                  <p>Youtube</p>
                </a>
                <a href="#" class="zigrow-footer-2-evnty__social-link">
                  <p>Instagram</p>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Divider -->
        <hr class="zigrow-footer-2-evnty__divider" />

        <!-- BOTTOM ROW -->
        <div class="row zigrow-footer-2-evnty__bottom-row">
          <div class="col-12 col-md-6">
            <p class="zigrow-footer-2-evnty__bottom-text"> Copyright 2025 © <span>all right reserved</span>, Designed by
            <span>Zigrow</span></p>
          </div>
          <div class="col-12 col-md-6">
            <p
              class="zigrow-footer-2-evnty__bottom-text zigrow-footer-2-evnty__bottom-text--right"
            >
            Privacy Policy
            </p>
          </div>
        </div>
      </div>
        <style>
      /* ====================================================
         EVNTY zigrow-footer-2
         (Bootstrap only for .container / .row / .col-*)
      =====================================================*/
      .zigrow-footer-2-evnty {
        background-color: #101623;
        color: #e5e7eb;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
          sans-serif;
        border-bottom: 1px solid #1f2933; /* bottom border */
      }
      .py-6 {
        padding: 3rem 0;
      }

      /* ---------- TOP ROW ---------- */
      .zigrow-footer-2-evnty .zigrow-footer-2-evnty__top-row {
        margin-bottom: 2rem;
      }

      /* Brand block */
      .zigrow-footer-2-evnty .zigrow-footer-2-evnty__brand {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        margin-bottom: 1.5rem;
      }

      .zigrow-footer-2-evnty .zigrow-footer-2-evnty__logo {
        text-align: center;
        width: 40px;
        height: 40px;
        border-radius: 999px;
        color: #101623;
        background: #ffffff;
      }
      .zigrow-footer-2-evnty .zigrow-footer-2-evnty__logo p {
        font-size: 1.5rem;
        font-weight: 700;
      }
      .zigrow-footer-2-evnty .zigrow-footer-2-evnty__brand-text {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }

      .zigrow-footer-2-evnty .zigrow-footer-2-evnty__brand-name {
        font-size: 1.35rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        margin: 0;
      }

      .zigrow-footer-2-evnty .zigrow-footer-2-evnty__brand-desc {
        margin: 0;
        font-size: 0.9rem;
        color: var(--secondary-colors, #9ca3af);
        line-height: 1.6;
        max-width: 260px;
      }

      /* Navigation links (center column) */
      .zigrow-footer-2-evnty .zigrow-footer-2-evnty__nav {
        display: flex;
        flex-wrap: wrap;
        gap: 1.5rem;
        justify-content: space-evenly;
        margin-bottom: 1.5rem;
      }

      .zigrow-footer-2-evnty .zigrow-footer-2-evnty__nav-link {
        font-size: 0.95rem;
        color: #e5e7eb;
        text-decoration: underline;
        text-underline-offset: 0.18em;
        cursor: pointer;
      }

      .zigrow-footer-2-evnty .zigrow-footer-2-evnty__nav-link:hover {
        color: #ffffff;
      }

      /* Social links (right column) */
      .zigrow-footer-2-evnty .zigrow-footer-2-evnty__social-wrapper {
        text-align: right; /* whole block sits toward the right */
      }

      .zigrow-footer-2-evnty .zigrow-footer-2-evnty__social {
        display: inline-flex; /* inline so wrapper alignment works */
        flex-direction: column;
        gap: 0.35rem;
        align-items: flex-start; /* text/items start from left inside block */
        margin-bottom: 1.5rem;
      }

      .zigrow-footer-2-evnty .zigrow-footer-2-evnty__social-link {
        font-size: 0.95rem;
        color: #e5e7eb;
        text-decoration: none;
      }

      .zigrow-footer-2-evnty .zigrow-footer-2-evnty__social-link p {
        margin: 0;
        text-align: left;
      }

      .zigrow-footer-2-evnty .zigrow-footer-2-evnty__social-link:hover {
        color: #ffffff;
      }

      /* Divider */
      .zigrow-footer-2-evnty .zigrow-footer-2-evnty__divider {
        border: none;
        border-top: 2px solid #a3a3a3;
        margin: 0 0 1.5rem;
      }

      /* ---------- BOTTOM ROW ---------- */
      .zigrow-footer-2-evnty .zigrow-footer-2-evnty__bottom-row {
        font-size: 0.9rem;
        color: #9ca3af;
      }

      .zigrow-footer-2-evnty .zigrow-footer-2-evnty__bottom-text {
        margin: 0.2rem 0;
      }

      .zigrow-footer-2-evnty .zigrow-footer-2-evnty__bottom-text--right {
        text-align: right;
      }

      /* ---------- RESPONSIVE ---------- */
      @media (max-width: 767.98px) {
        .zigrow-footer-2-evnty {
          padding: 2.5rem 0 2rem;
        }

        .zigrow-footer-2-evnty .zigrow-footer-2-evnty__brand {
          flex-wrap: wrap;
          margin-bottom: 1.8rem;
        }

        .zigrow-footer-2-evnty .zigrow-footer-2-evnty__brand-desc {
          max-width: none;
        }

        .zigrow-footer-2-evnty .zigrow-footer-2-evnty__nav {
          justify-content: flex-start;
        }

        .zigrow-footer-2-evnty .zigrow-footer-2-evnty__social-wrapper {
          text-align: left; /* on mobile keep it left */
        }

        .zigrow-footer-2-evnty .zigrow-footer-2-evnty__bottom-text--right {
          text-align: left;
          margin-top: 0.6rem;
        }
      }

      @media (min-width: 992px) {
        .zigrow-footer-2-evnty .zigrow-footer-2-evnty__nav {
          justify-content: center;
        }
      }
    </style>
    </footer>`,
});

Vvveb.Blocks.add("bootstrap4/zigrow-footer-3", {
    name: "footer-3",
    category: "footer",
    image: "https://i.postimg.cc/QxRjRS57/footer-3.png",
    html: `   <footer class="zigrow-footer-3 py-6">
      <div class="container">
        <!-- TOP HERO ROW -->
        <div class="row zigrow-footer-3__top-row">
          <!-- Left: headline + benefits -->
          <div class="col-12 col-lg-7">
            <div class="zigrow-footer-3__headline">
              <h1 class="zigrow-footer-3__headline-main">
                It's time to support zero pollution,
              </h1>
              <h2 class="zigrow-footer-3__headline-sub">with renewable resources</h2>
            </div>

            <div class="zigrow-footer-3__benefits">
              <div class="zigrow-footer-3__benefit">
                <i
                  class="bi bi-check-circle-fill zigrow-footer-3__benefit-icon"
                  data-icon="check"
                ></i>
                <p class="zigrow-footer-3__benefit-text">
                  Experienced for more than 10 years
                </p>
              </div>
              <div class="zigrow-footer-3__benefit">
                <i
                  class="bi bi-check-circle-fill zigrow-footer-3__benefit-icon"
                  data-icon="check"
                ></i>
                <p class="zigrow-footer-3__benefit-text">
                  Support for the latest technology
                </p>
              </div>
            </div>
          </div>

          <!-- Right: text + CTA -->
          <div class="col-12 col-lg-5">
            <div class="zigrow-footer-3__cta-panel">
              <p class="zigrow-footer-3__cta-text">
                By increasing the effectiveness and efficiency of electricity
                use, the use of renewable resources is very profitable for all
                industrial services.
              </p>
              <a href="#" class="zigrow-footer-3__cta-button" data-btn="footer-3">
                <p>Get in touch</p>
                <span class="zigrow-footer-3__cta-icon">
                  <i
                    class="bi bi-arrow-up-right"
                    data-icon="arrow-up-right"
                  ></i>
                </span>
              </a>
            </div>
          </div>
        </div>

        <!-- MIDDLE: brand / nav / socials -->
        <div class="row zigrow-footer-3__middle-row">
          <!-- Brand -->
          <div class="col-12 col-lg-3">
            <div class="zigrow-footer-3__brand" data-logo="footer">
              <span class="zigrow-footer-3__brand-icon">
                <i class="bi bi-plus-lg" data-icon="logo-plus"></i>
              </span>
              <h3 class="zigrow-footer-3__brand-name">logo</h3>
            </div>
          </div>

          <!-- Navigation -->
          <div class="col-12 col-lg-6">
            <nav class="zigrow-footer-3__nav" aria-label="Footer navigation">
              <a href="#" class="zigrow-footer-3__nav-link">
                <p>Home</p>
              </a>
              <a href="#" class="zigrow-footer-3__nav-link">
                <p>About Us</p>
              </a>
              <a href="#" class="zigrow-footer-3__nav-link">
                <p>Features</p>
              </a>
              <a href="#" class="zigrow-footer-3__nav-link">
                <p>Services</p>
              </a>
              <a href="#" class="zigrow-footer-3__nav-link">
                <p>Contact</p>
              </a>
            </nav>
          </div>

          <!-- Social icons -->
          <div class="col-12 col-lg-3">
            <div class="zigrow-footer-3__socials-wrapper">
              <div class="zigrow-footer-3__socials">
                <a href="#" class="zigrow-footer-3__social-link">
                  <i
                    class="bi bi-linkedin"
                    data-icon="linkedin"
                    aria-hidden="true"
                  ></i>
                </a>
                <a href="#" class="zigrow-footer-3__social-link">
                  <i
                    class="bi bi-twitter-x"
                    data-icon="x"
                    aria-hidden="true"
                  ></i>
                </a>
                <a href="#" class="zigrow-footer-3__social-link">
                  <i
                    class="bi bi-facebook"
                    data-icon="facebook"
                    aria-hidden="true"
                  ></i>
                </a>
                <a href="#" class="zigrow-footer-3__social-link">
                  <i
                    class="bi bi-instagram"
                    data-icon="instagram"
                    aria-hidden="true"
                  ></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Divider -->
        <hr class="zigrow-footer-3__divider" />

        <!-- BOTTOM ROW -->
        <div class="row zigrow-footer-3__bottom-row">
          <div class="col-12 col-md-6">
            <p class="zigrow-footer-3__bottom-text">
           Copyright 2025 © <span>all right reserved</span>, Designed by
    <span>Zigrow</span>
            </p>
          </div>
          <div class="col-12 col-md-6">
            <div class="zigrow-footer-3__bottom-links">
              <a href="#" class="zigrow-footer-3__bottom-link">
                <p>Terms of Service</p>
              </a>
              <a href="#" class="zigrow-footer-3__bottom-link">
                <p>Privacy Policy</p>
              </a>
            </div>
          </div>
        </div>
      </div>
        <style>
      /* ====================================================
         XURYA HERO + FOOTER SECTION
         (Bootstrap only for .container / .row / .col-*)
      =====================================================*/
      .zigrow-footer-3 {
        background-color: #020303;
        color: #f9fafb;
       
      }

      .py-6 {
        padding: 3rem 0;
      }

      /* ---------- TOP HERO ROW ---------- */
      .zigrow-footer-3 .zigrow-footer-3__top-row {
        margin-bottom: 5.5rem;
      }

      .zigrow-footer-3 .zigrow-footer-3__headline {
        margin-bottom: 2rem;
      }

      .zigrow-footer-3 .zigrow-footer-3__headline-main {
        font-size: 2.5rem;
        line-height: 1.15;
        font-weight: 600;
        letter-spacing: -0.03em;
        margin: 0 0 0.5rem;
      }

      .zigrow-footer-3 .zigrow-footer-3__headline-sub {
        font-size: 2.6rem;
        line-height: 1.1;
        font-weight: 500;
        letter-spacing: -0.04em;
        margin: 0;
        color: var(--secondary-colors, #e5e7eb);
      }

      .zigrow-footer-3 .zigrow-footer-3__benefits {
        display: flex;
        flex-wrap: wrap;
        gap: 1.75rem;
      }

      .zigrow-footer-3 .zigrow-footer-3__benefit {
        display: inline-flex;
        align-items: center;
        gap: 0.6rem;
      }

      .zigrow-footer-3 .zigrow-footer-3__benefit-icon {
        color: var(--primary-colors, #22c55e);
        font-size: 1.1rem;
      }

      .zigrow-footer-3 .zigrow-footer-3__benefit-text {
        margin: 0;
        font-size: 0.95rem;
        color: #e5e7eb;
      }

      /* Right side text + CTA */
      .zigrow-footer-3 .zigrow-footer-3__cta-panel {
        max-width: 420px;
        margin-left: auto;
      }

      .zigrow-footer-3 .zigrow-footer-3__cta-text {
        margin: 0 0 1.6rem;
        font-size: 0.98rem;
        line-height: 1.7;
        color: #d1d5db;
      }

      .zigrow-footer-3 .zigrow-footer-3__cta-button {
        display: inline-flex;
        align-items: center;
        gap: 0.55rem;
        padding: 0.75rem 1.7rem;
        border-radius: 999px;
           background-color: var(--primary-colors, #f9fafb);
        text-decoration: none;
        border: 1px solid var(--primary-colors, #f9fafb);
        transition: background-color 0.15s ease, transform 0.15s ease,
          box-shadow 0.15s ease;
      }

      .zigrow-footer-3 .zigrow-footer-3__cta-button p {
        margin: 0;
        font-size: 0.95rem;
        font-weight: 500;
        color: #020617;
      }

      .zigrow-footer-3 .zigrow-footer-3__cta-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      .zigrow-footer-3 .zigrow-footer-3__cta-icon i {
        font-size: 0.9rem;
        color: #020617;
      }

      .zigrow-footer-3 .zigrow-footer-3__cta-button:hover {
         background-color: var(--primary-colors, #22c55e);
    transform: translateY(-1px);
    box-shadow: 0 4px 20px var(--primary-colors, #22c55e);
      }

      /* ---------- MIDDLE NAV / BRAND / SOCIAL ---------- */
      .zigrow-footer-3 .zigrow-footer-3__middle-row {
        margin-top: 2.5rem; /* CHANGED: margin-top instead of margin-bottom */
        margin-bottom: 0; /* CHANGED */
        align-items: flex-end; /* align all three columns to bottom on wide screens */
      }

      .zigrow-footer-3 .zigrow-footer-3__brand {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        margin-bottom: 1.5rem;
      }

      .zigrow-footer-3 .zigrow-footer-3__brand-icon {
        width: 26px;
        height: 26px;
        border-radius: 8px;
        background-color: var(--primary-colors, #22c55e);
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      .zigrow-footer-3 .zigrow-footer-3__brand-icon i {
        font-size: 1rem;
        color: #020617;
      }

      .zigrow-footer-3 .zigrow-footer-3__brand-name {
        margin: 0;
        font-size: 1.05rem;
        font-weight: 500;
      }

      /* Nav */
      .zigrow-footer-3 .zigrow-footer-3__nav {
        display: flex;
        flex-wrap: wrap;
        gap: 1.8rem;
        justify-content: center;
        margin-bottom: 1.5rem;
        @media (max-width: 768px) {
          justify-content: start;
        }
      }

      .zigrow-footer-3 .zigrow-footer-3__nav-link {
        text-decoration: none;
      }

      .zigrow-footer-3 .zigrow-footer-3__nav-link p {
        margin: 0;
        font-size: 0.95rem;
        color: #e5e7eb;
      }

      .zigrow-footer-3 .zigrow-footer-3__nav-link p:hover {
        color: #ffffff;
      }

      /* Social icons */
      .zigrow-footer-3 .zigrow-footer-3__socials-wrapper {
        text-align: right;
      }

      .zigrow-footer-3 .zigrow-footer-3__socials {
        display: inline-flex;
        gap: 0.75rem;
      }

      .zigrow-footer-3 .zigrow-footer-3__social-link {
        width: 34px;
        height: 34px;
        border-radius: 999px;
        border: 1px solid #4b5563;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
      }

      .zigrow-footer-3 .zigrow-footer-3__social-link i {
        font-size: 0.9rem;
        color: #e5e7eb;
      }

      .zigrow-footer-3 .zigrow-footer-3__social-link:hover {
        border-color: #e5e7eb;
      }

      /* Divider */
      .zigrow-footer-3 .zigrow-footer-3__divider {
        border: none;
        border-top: 1px solid #111827;
        margin: 0 0 1.4rem;
      }

      /* ---------- BOTTOM ROW ---------- */
      .zigrow-footer-3 .zigrow-footer-3__bottom-row {
        font-size: 0.85rem;
        color: #9ca3af;
      }

      .zigrow-footer-3 .zigrow-footer-3__bottom-text {
        margin: 0.2rem 0;
      }

      .zigrow-footer-3 .zigrow-footer-3__bottom-links {
        display: flex;
        flex-wrap: wrap;
        gap: 1.4rem;
        justify-content: flex-end;
      }

      .zigrow-footer-3 .zigrow-footer-3__bottom-link {
        text-decoration: none;
      }

      .zigrow-footer-3 .zigrow-footer-3__bottom-link p {
        margin: 0;
        color: #d1d5db;
      }

      .zigrow-footer-3 .zigrow-footer-3__bottom-link p:hover {
        color: #ffffff;
      }

      /* ---------- RESPONSIVE ---------- */
      @media (max-width: 991.98px) {
        .zigrow-footer-3 {
          padding: 3rem 0 2.5rem;
        }

        .zigrow-footer-3 .zigrow-footer-3__headline-main {
          font-size: 2.3rem;
        }

        .zigrow-footer-3 .zigrow-footer-3__headline-sub {
          font-size: 2.1rem;
        }

        .zigrow-footer-3 .zigrow-footer-3__cta-panel {
          margin-top: 2rem;
          max-width: none;
        }

        .zigrow-footer-3 .zigrow-footer-3__brand {
          margin-bottom: 1rem;
        }

        .zigrow-footer-3 .zigrow-footer-3__socials-wrapper {
          text-align: left;
          margin-top: 1.2rem;
        }

        .zigrow-footer-3 .zigrow-footer-3__bottom-links {
          justify-content: flex-start;
          margin-top: 0.6rem;
        }

        /* On small screens we don't need bottom alignment */
        .zigrow-footer-3 .zigrow-footer-3__middle-row {
          align-items: flex-start;
        }
      }

      @media (max-width: 575.98px) {
        .zigrow-footer-3 .zigrow-footer-3__headline-main {
          font-size: 2rem;
        }

        .zigrow-footer-3 .zigrow-footer-3__headline-sub {
          font-size: 1.8rem;
        }

        .zigrow-footer-3 .zigrow-footer-3__benefits {
          gap: 1rem;
        }
      }
    </style>
    </footer>`,
});

// Parallax
Vvveb.Blocks.add("bootstrap4/zigrow-parallax-1", {
    name: "parallax-1",
    category: "parallax",
    image: "https://i.postimg.cc/MKhzhtR1/parallax-1.png",
    html: `  <section
      class="zigrow-parallax-1"
      id="zigrow-parallax-1"
      data-section="zigrow-parallax-1"
    >
      <!-- vertical label
      <div class="zigrow-parallax-1__side-label">
        <p>Style Options</p>
      </div> -->

      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="zigrow-parallax-1__inner">
              <div class="zigrow-parallax-1__content">
                <!-- full-width icon row, top aligned -->
                <a
                  href="tel:0753016572"
                  class="zigrow-parallax-1__phone-link zigrow-parallax-1__phone-link--icon"
                >
                  <div class="zigrow-parallax-1__icon-circle">
                    <i
                      class="bi bi-telephone-fill"
                      data-icon="phone-main"
                      aria-hidden="true"
                    ></i>
                  </div>
                </a>

                <!-- phone number -->
                <a href="tel:0753016572" class="zigrow-parallax-1__phone-link">
                  <div class="zigrow-parallax-1__phone-box">
                    <h2 class="zigrow-parallax-1__phone-text">+91-9123456789</h2>
                  </div>
                </a>

                <!-- email + address -->
                <div class="zigrow-parallax-1__info">
                  <!-- email -->
                  <div class="zigrow-parallax-1__info-block">
                    <div class="zigrow-parallax-1__info-icon">
                      <i
                        class="bi bi-envelope"
                        data-icon="email"
                        aria-hidden="true"
                      ></i>
                    </div>
                    <a
                      href="mailto:office@newave.com"
                      class="zigrow-parallax-1__info-link"
                    >
                      <p class="zigrow-parallax-1__info-text">
                        yourname@domainname.com
                      </p>
                    </a>
                  </div>

                  <!-- address -->
                  <div class="zigrow-parallax-1__info-block">
                    <div class="zigrow-parallax-1__info-icon">
                      <i
                        class="bi bi-geo-alt-fill"
                        data-icon="location"
                        aria-hidden="true"
                      ></i>
                    </div>
                    <a
                      href="#"
                      class="zigrow-parallax-1__info-link"
                      aria-label="Office address"
                    >
                      <p class="zigrow-parallax-1__info-text">
                        E-123, ABC Plaza, XYZ Street, New Delhi - 110077
                      </p>
                    </a>
                  </div>
                </div>
              </div>
              <!-- /content -->
            </div>
          </div>
        </div>
      </div>
         <style>
      /* ==========================================
         CITY CONTACT BANNER
         (Bootstrap only for grid)
      =========================================== */
      .zigrow-parallax-1 {
        position: relative;
        min-height: 90vh;
        color: #f9fafb;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
          sans-serif;
        background-image: linear-gradient(
            rgba(0, 0, 0, 0.55),
            rgba(0, 0, 0, 0.75)
          ),
          url("https://i.postimg.cc/QCyNwCMN/Screenshot-2025-12-12-163544.png");
        background-size: cover;
        background-position: center;
        overflow: hidden;
      }

      .zigrow-parallax-1 .zigrow-parallax-1__inner {
        min-height: 90vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      /* left vertical label */
      .zigrow-parallax-1 .zigrow-parallax-1__side-label {
        position: absolute;
        top: 50%;
        left: 0.5rem;
        transform: translateY(-50%) rotate(-90deg);
        transform-origin: left center;
      }

      .zigrow-parallax-1 .zigrow-parallax-1__side-label p {
        margin: 0;
        font-size: 0.65rem;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: #e5e7eb;
        background-color: rgba(0, 0, 0, 0.65);
        padding: 0.4rem 1rem;
        border-radius: 999px;
      }

      /* main centered content */
      .zigrow-parallax-1 .zigrow-parallax-1__content {
        text-align: center;
      }

      /* top round phone icon */
      .zigrow-parallax-1 .zigrow-parallax-1__icon-circle {
        display: inline-flex;
        width: 56px;
        height: 56px;
        border-radius: 999px;
        border: 2px solid #ffffff;
        align-items: center;
        justify-content: center;
        margin-bottom: 1.4rem;
        background-color: rgba(0, 0, 0, 0.4);
      }

      .zigrow-parallax-1 .zigrow-parallax-1__icon-circle i {
        font-size: 1.2rem;
        color: #ffffff;
      }

      /* phone links */
      .zigrow-parallax-1 .zigrow-parallax-1__phone-link {
        text-decoration: none;
      }

      /* icon row should be full width */
      .zigrow-parallax-1 .zigrow-parallax-1__phone-link--icon {
        display: block;
        width: 100%;
      }

      /* phone number box */
      .zigrow-parallax-1 .zigrow-parallax-1__phone-box {
        display: inline-block;
        margin-bottom: 1.4rem;
        padding: 0.9rem 2.6rem;
        background-color: rgba(255, 255, 255, 0.14);
        color: #ffffff;
      }

      .zigrow-parallax-1 .zigrow-parallax-1__phone-text {
        margin: 0;
        font-size: 2.2rem;
        font-weight: 500;
        letter-spacing: 0.12em;
      }

      /* email & address row */
      .zigrow-parallax-1 .zigrow-parallax-1__info {
        margin-top: 0.5rem;
      }

      .zigrow-parallax-1 .zigrow-parallax-1__info-block {
        margin-bottom: 0.4rem;
      }

      .zigrow-parallax-1 .zigrow-parallax-1__info-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 0.35rem;
      }

      .zigrow-parallax-1 .zigrow-parallax-1__info-icon i {
        font-size: 1rem;
        color: #ffffff;
      }

      .zigrow-parallax-1 .zigrow-parallax-1__info-link {
        text-decoration: none;
      }

      .zigrow-parallax-1 .zigrow-parallax-1__info-text {
        margin: 0;
        font-size: 0.85rem;
        color: #e5e7eb;
      }

      .zigrow-parallax-1
        .zigrow-parallax-1__info-link:hover
        .zigrow-parallax-1__info-text {
        color: #ffffff;
      }

      /* ---------- RESPONSIVE ---------- */
      @media (max-width: 767.98px) {
        .zigrow-parallax-1 {
          min-height: 60vh;
        }

        /* top-align content on phones */
        .zigrow-parallax-1 .zigrow-parallax-1__inner {
          justify-content: flex-start;
          padding-top: 3.5rem;
          padding-bottom: 3rem;
        }

        .zigrow-parallax-1 .zigrow-parallax-1__phone-text {
          font-size: 1.7rem;
          letter-spacing: 0.08em;
        }

        .zigrow-parallax-1 .zigrow-parallax-1__phone-box {
          padding: 0.7rem 1.8rem;
        }

        .zigrow-parallax-1 .zigrow-parallax-1__side-label {
          left: -1rem;
        }
      }

      @media (max-width: 575.98px) {
        .zigrow-parallax-1 .zigrow-parallax-1__phone-text {
          font-size: 1.5rem;
        }

        .zigrow-parallax-1 .zigrow-parallax-1__info-text {
          font-size: 0.8rem;
        }
      }
    </style>
    </section>`,
});

Vvveb.Blocks.add("bootstrap4/zigrow-parallax-2", {
    name: "parallax-2",
    category: "parallax",
    image: "https://i.postimg.cc/c4VdVTYQ/parallax-2.png",
    html: `    <section
      class="zigrow-parallax-2 py-6"
      id="zigrow-parallax-2"
      data-section="zigrow-parallax-2"
    >
      <!-- vertical label -->
      <!-- <div class="zigrow-parallax-2__side-label">
        <p>Style Options</p>
      </div> -->

      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="zigrow-parallax-2__inner">
              <div class="zigrow-parallax-2__content">
                <h2 class="zigrow-parallax-2__quote">
                  <i
                    class="bi bi-quote zigrow-parallax-2__quote-icon"
                    data-icon="quote-open"
                    aria-hidden="true"
                  ></i>
                  CREATIVITY IS ALLOWING YOURSELF TO MAKE MISTAKES
                  <br />
                  ART IS KNOWING WHICH ONES TO KEEP
                  <i
                    class="bi bi-quote zigrow-parallax-2__quote-icon zigrow-parallax-2__quote-icon--right"
                    data-icon="quote-close"
                    aria-hidden="true"
                  ></i>
                </h2>
                <p class="zigrow-parallax-2__author">– Rohit Singh –</p>
              </div>
            </div>
          </div>
        </div>
      </div>
          <style>
      /* ==========================================
         QUOTE BANNER
         (Bootstrap only for grid)
      =========================================== */
      .zigrow-parallax-2 {
        position: relative;
        min-height: 40vh;
        color: #f9fafb;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
          sans-serif;
        background-image: linear-gradient(
            rgba(0, 0, 0, 0.7),
            rgba(0, 0, 0, 0.7)
          ),
          url("https://i.postimg.cc/x8CT6Mng/Screenshot-2025-12-12-163612.png");
        background-size: cover;
        background-position: center;
        overflow: hidden;
      }
      .py-6 {
        padding: 3rem 0;
      }
      .zigrow-parallax-2 .zigrow-parallax-2__inner {
        min-height: 40vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      /* left vertical label */
      .zigrow-parallax-2 .zigrow-parallax-2__side-label {
        position: absolute;
        top: 50%;
        left: 0.5rem;
        transform: translateY(-50%) rotate(-90deg);
        transform-origin: left center;
      }

      .zigrow-parallax-2 .zigrow-parallax-2__side-label p {
        margin: 0;
        font-size: 0.65rem;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: #e5e7eb;
        background-color: rgba(0, 0, 0, 0.65);
        padding: 0.4rem 1rem;
        border-radius: 999px;
      }

      /* main quote content */
      .zigrow-parallax-2 .zigrow-parallax-2__content {
        text-align: center;
      }

      .zigrow-parallax-2 .zigrow-parallax-2__quote {
        margin: 0 0 0.9rem;
        font-size: 1.6rem;
        font-weight: 500;
        letter-spacing: 0.14em;
        text-transform: uppercase;
      }

      .zigrow-parallax-2 .zigrow-parallax-2__quote-icon {
        font-size: 1.4rem;
        vertical-align: middle;
        color: #f9fafb;
        margin: 0 0.35rem;
      }

      .zigrow-parallax-2 .zigrow-parallax-2__quote-icon--right {
        transform: scaleX(-1);
      }

      .zigrow-parallax-2 .zigrow-parallax-2__author {
        margin: 0;
        font-size: 0.85rem;
        color: #d1d5db;
      }

      /* ---------- RESPONSIVE ---------- */
      @media (max-width: 991.98px) {
        .zigrow-parallax-2 {
          padding: 3rem 0;
        }

        .zigrow-parallax-2 .zigrow-parallax-2__quote {
          font-size: 1.35rem;
          letter-spacing: 0.12em;
        }
      }

      @media (max-width: 575.98px) {
        .zigrow-parallax-2 .zigrow-parallax-2__quote {
          font-size: 1.05rem;
          letter-spacing: 0.08em;
        }

        .zigrow-parallax-2 .zigrow-parallax-2__author {
          font-size: 0.8rem;
        }

        .zigrow-parallax-2 .zigrow-parallax-2__side-label {
          left: -1rem;
        }
      }
    </style>
    </section>`,
});

// Design
Vvveb.Blocks.add("bootstrap4/zigrow-design-3", {
    name: "design-1",
    category: "design",
    image: "https://i.postimg.cc/vH1QqC1V/design-1.png",

    html: `  <section class="zigrow-design-3 py-6" id="zigrow-design-3" data-section="zigrow-design-3">
      <!-- floating stars with icons -->
      <span class="zigrow-design-3__star zigrow-design-3__star--left">
        <i class="bi bi-star-fill" data-icon="star-left"></i>
      </span>
      <span class="zigrow-design-3__star zigrow-design-3__star--right">
        <i class="bi bi-star-fill" data-icon="star-right"></i>
      </span>
      <span class="zigrow-design-3__star zigrow-design-3__star--mid">
        <i class="bi bi-star-fill" data-icon="star-mid"></i>
      </span>

      <div class="container">
        <!-- MAIN TEXT ROW -->
        <div class="row">
          <div class="col-12">
            <div class="zigrow-design-3__content">
              <h1 class="zigrow-design-3__headline-main">Christmas Sale</h1>
              <h2 class="zigrow-design-3__headline-sub">50% OFF</h2>
              <p class="zigrow-design-3__subtext">
                Use coupon at checkout to get discount. Sale ends 03.01
              </p>

              <div class="zigrow-design-3__coupon-wrapper">
                <a href="#" class="zigrow-design-3__coupon-link">
                  <div class="zigrow-design-3__coupon-icon">
                    <i class="bi bi-ticket-perforated" data-icon="coupon"></i>
                  </div>
                  <p>BYEBYE2025</p>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- CARDS ROW (PRODUCT PREVIEW STYLE) -->
        <div class="row zigrow-design-3__cards-row">
          <div class="col-12">
            <div class="zigrow-design-3__cards-wrapper">
              <!-- Card 1 -->
              <div class="zigrow-design-3__card zigrow-design-3__card--left">
                <div class="zigrow-design-3__card-image">
                  <img
                   src="/builder/img/zigrow-design-images/zigrow-design-1-1.webp"
                    alt="Laptop on desk"
                    class="zigrow-design-3__card-img"
                  />
                </div>
                <div class="zigrow-design-3__card-inner">
                  <p class="zigrow-design-3__card-text">Laptops & gadgets</p>
                </div>
              </div>

              <!-- Card 2 -->
              <div class="zigrow-design-3__card zigrow-design-3__card--mid">
                <div class="zigrow-design-3__card-image">
                  <img
                   src="/builder/img/zigrow-design-images/zigrow-design-1-2.webp"
                    alt="Colorful holiday bundle"
                    class="zigrow-design-3__card-img"
                  />
                </div>
                <div class="zigrow-design-3__card-inner">
                  <p class="zigrow-design-3__card-text">Holiday bundles</p>
                </div>
              </div>

              <!-- Card 3 -->
              <div class="zigrow-design-3__card zigrow-design-3__card--right">
                <div class="zigrow-design-3__card-image">
                  <img
                     src="/builder/img/zigrow-design-images/zigrow-design-1-3.webp"
                    alt="Accessories on table"
                    class="zigrow-design-3__card-img"
                  />
                </div>
                <div class="zigrow-design-3__card-inner">
                  <p class="zigrow-design-3__card-text">Colorful accessories</p>
                </div>
              </div>

              <!-- Card 4 -->
              <div class="zigrow-design-3__card zigrow-design-3__card--extra">
                <div class="zigrow-design-3__card-image">
                  <img
                   src="/builder/img/zigrow-design-images/zigrow-design-1-4.webp"
                    alt="Gift boxes"
                    class="zigrow-design-3__card-img"
                  />
                </div>
                <div class="zigrow-design-3__card-inner">
                  <p class="zigrow-design-3__card-text">Gift-ready deals</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>\
       <style>
      /* ====================================================
         CHRISTMAS SALE HERO
         (Bootstrap only for .container / .row / .col-*)
      =====================================================*/
      .zigrow-design-3 {
        min-height: 100vh;
        background: radial-gradient(
            circle at 20% 0%,
            rgba(255, 255, 255, 0.15),
            transparent 55%
          ),
          radial-gradient(
            circle at 80% 0%,
            rgba(255, 255, 255, 0.15),
            transparent 55%
          ),
          linear-gradient(
            90deg,
            #0e5b4e 0,
            #0f6756 8%,
            #074337 25%,
            #0e5b4e 50%,
            #074337 75%,
            #0f6756 92%,
            #0e5b4e 100%
          );
        background-size: cover;
        background-position: center;
        color: #fff7e6;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
          sans-serif;
        position: relative;
        overflow: hidden;
      }

      .py-6 {
        padding: 3rem 0;
      }

      /* Little floating stars */
      .zigrow-design-3 .zigrow-design-3__star {
        position: absolute;
        color: #ffe69c;
        font-size: 1.1rem;
      }

      .zigrow-design-3 .zigrow-design-3__star--left {
        top: 18%;
        left: 10%;
      }

      .zigrow-design-3 .zigrow-design-3__star--right {
        top: 10%;
        right: 12%;
      }

      .zigrow-design-3 .zigrow-design-3__star--mid {
        top: 40%;
        right: 6%;
      }

      /* ---------- MAIN CONTENT ---------- */
      .zigrow-design-3 .zigrow-design-3__content {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 1.2rem;
        margin-bottom: 3.5rem;
      }

      .zigrow-design-3 .zigrow-design-3__headline-main {
        font-size: 4rem;
        line-height: 1.1;
        font-weight: 600;
        letter-spacing: 0.02em;
        margin: 0;
        color: #ffe98a;
      }

      .zigrow-design-3 .zigrow-design-3__headline-sub {
        font-size: 3.4rem;
        line-height: 1.1;
        font-weight: 700;
        margin: 0;
        color: #ffe98a;
      }

      .zigrow-design-3 .zigrow-design-3__subtext {
        margin: 0.3rem 0 0;
        font-size: 0.95rem;
        color: var(--secondary-colors, #f4f4f4);
      }

      /* Coupon / CTA */
      .zigrow-design-3 .zigrow-design-3__coupon-wrapper {
        margin-top: 1.2rem;
        display: flex;
        justify-content: center;
      }

      .zigrow-design-3 .zigrow-design-3__coupon-link {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.75rem 2.3rem;
        border-radius: 999px;
        border: 1px dashed #ffe69c;
        background-color: rgba(0, 0, 0, 0.18);
        text-decoration: none;
        transition: background-color 0.15s ease, transform 0.15s ease,
          box-shadow 0.15s ease;
      }

      .zigrow-design-3 .zigrow-design-3__coupon-link p {
        margin: 0;
        font-size: 0.95rem;
        font-weight: 600;
        letter-spacing: 0.15em;
        color: #f4f4f4;
      }

      .zigrow-design-3 .zigrow-design-3__coupon-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      .zigrow-design-3 .zigrow-design-3__coupon-icon i {
        font-size: 0.9rem;
        color: #ffe69c;
      }

      .zigrow-design-3 .zigrow-design-3__coupon-link:hover {
        background-color: rgba(0, 0, 0, 0.35);
        transform: translateY(-1px);
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.55);
      }

      /* ---------- BOTTOM CARDS ROW ---------- */
      .zigrow-design-3 .zigrow-design-3__cards-row {
        margin-top: 1rem;
      }

      .zigrow-design-3 .zigrow-design-3__cards-wrapper {
        display: flex;
        justify-content: center;
        align-items: flex-end; /* align “bottom” nicely */
        gap: 1.5rem;
        flex-wrap: wrap;
      }

      .zigrow-design-3 .zigrow-design-3__card {
        text-align: center;
        width: 200px;
        height: 150px;
        border-radius: 18px;
        overflow: hidden;
        position: relative;
        background: #111827;
        box-shadow: 0 18px 35px rgba(0, 0, 0, 0.6);
        transform-origin: center bottom;
      }

      .zigrow-design-3 .zigrow-design-3__card-image {
        width: 100%;
        height: 100%;
        overflow: hidden;
      }

      .zigrow-design-3 .zigrow-design-3__card-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .zigrow-design-3 .zigrow-design-3__card-inner {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: flex-end;
        padding: 0.75rem;
        background: linear-gradient(
          to top,
          rgba(0, 0, 0, 0.65),
          transparent 45%
        );
      }

      .zigrow-design-3 .zigrow-design-3__card-text {
        margin: 0;
        font-size: 0.8rem;
        font-weight: 600;
        color: #f9fafb;
      }

      /* Fan-style rotations (desktop / tablet) */
      .zigrow-design-3 .zigrow-design-3__card--left {
        transform: rotate(-12deg) translateY(20px);
      }

      .zigrow-design-3 .zigrow-design-3__card--mid {
        transform: rotate(-4deg) translateY(10px);
      }

      .zigrow-design-3 .zigrow-design-3__card--right {
        transform: rotate(4deg) translateY(10px);
      }

      .zigrow-design-3 .zigrow-design-3__card--extra {
        transform: rotate(12deg) translateY(20px);
      }

      /* ---------- RESPONSIVE ---------- */
      @media (max-width: 991.98px) {
        .zigrow-design-3 {
          padding: 3rem 0 2.5rem;
        }

        .zigrow-design-3 .zigrow-design-3__headline-main {
          font-size: 2.4rem;
        }

        .zigrow-design-3 .zigrow-design-3__headline-sub {
          font-size: 2rem;
        }
      }

      @media (max-width: 575.98px) {
        .zigrow-design-3 .zigrow-design-3__headline-main {
          font-size: 2rem;
        }

        .zigrow-design-3 .zigrow-design-3__headline-sub {
          font-size: 1.7rem;
        }

        .zigrow-design-3 .zigrow-design-3__cards-wrapper {
          gap: 1rem;
        }

        .zigrow-design-3 .zigrow-design-3__card {
          width: 100%;
          max-width: 260px;
          height: 150px;
          margin: 0 auto;
        }

        /* On small screens, remove rotation so cards stack nicely */
        .zigrow-design-3 .zigrow-design-3__card--left,
        .zigrow-design-3 .zigrow-design-3__card--mid,
        .zigrow-design-3 .zigrow-design-3__card--right,
        .zigrow-design-3 .zigrow-design-3__card--extra {
          transform: translateY(0);
        }
      }
    </style>
    </section>`,
});
Vvveb.Blocks.add("bootstrap4/zigrow-design-2", {
    name: "design-2",
    category: "design",
    image: "https://i.postimg.cc/0268Wh67/design-2.png",
    html: ` <section class="zigrow-design-2 py-6" data-section="zigrow-design-2" id="zigrow-design-2">
      <!-- doodle icons -->
      <span class="zigrow-design-2__doodle zigrow-design-2__doodle--tl">
        <i class="bi bi-stars" data-icon="stars-tl"></i>
      </span>
      <span class="zigrow-design-2__doodle zigrow-design-2__doodle--tr">
        <i class="bi bi-bezier" data-icon="bezier-tr"></i>
      </span>
      <span class="zigrow-design-2__doodle zigrow-design-2__doodle--br">
        <i class="bi bi-stars" data-icon="stars-br"></i>
      </span>

      <div class="container">
        <div class="row zigrow-design-2__row">
          <!-- LEFT: EVENT IMAGE -->
          <div class="col-12 col-lg-6">
            <div class="zigrow-design-2__image-card">
              <div class="zigrow-design-2__image-inner">
                <img
                 src="/builder/img/zigrow-design-images/zigrow-design-2-1.webp"
                  alt="Conference audience"
                  class="zigrow-design-2__image"
                />
              </div>
            </div>
          </div>

          <!-- RIGHT: TEXT + STRIP -->
          <div class="col-12 col-lg-6">
            <div class="zigrow-design-2__content">
              <p class="zigrow-design-2__eyebrow">TechXperience 2025</p>

              <h1 class="zigrow-design-2__title-line">
                Fuel
                <span class="zigrow-design-2__title-highlight">Innovation</span>,
              </h1>
              <h1 class="zigrow-design-2__title-line">Spark Connection</h1>

              <p class="zigrow-design-2__description">
                Discover breakthrough ideas, connect with experts, and unlock
                the future of technology at the most immersive digital
                experience of the year.
              </p>

              <!-- TICKET STRIP -->
              <div class="zigrow-design-2__ticket-strip">
                <div class="zigrow-design-2__ticket-info">
                  <h3 class="zigrow-design-2__ticket-title">
                    Unleashing the Power of Change
                  </h3>

                  <div class="zigrow-design-2__meta-row">
                    <p class="zigrow-design-2__meta-item">
                      <i class="bi bi-calendar-event" data-icon="calendar"></i>
                      April 24, 2025
                    </p>
                    <p class="zigrow-design-2__meta-item">
                      <i class="bi bi-geo-alt" data-icon="location"></i>
                      Ballroom Extra Hotel
                    </p>
                  </div>
                </div>

                <div class="zigrow-design-2__ticket-cta">
                  <a href="#" class="zigrow-design-2__cta-link" data-btn="design-2">
                    <p>Get a Ticket</p>
                    <span>
                      <i class="bi bi-arrow-right" data-icon="arrow-right"></i>
                    </span>
                  </a>
                </div>
              </div>
              <!-- /ticket strip -->
            </div>
          </div>
        </div>
      </div>
          <style>
      /* ====================================================
         TECHXPERIENCE HERO
         (Bootstrap only for .container / .row / .col-*)
      =====================================================*/
      .zigrow-design-2 {
        min-height: 100vh;
        padding: 3.5rem 0;
        background: radial-gradient(
            circle at 10% 20%,
            rgba(186, 104, 255, 0.18),
            transparent 55%
          ),
          radial-gradient(
            circle at 90% 10%,
            rgba(255, 192, 203, 0.28),
            transparent 55%
          ),
          linear-gradient(135deg, #faf5ff 0, #ffffff 35%, #fde7ff 100%);
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
          sans-serif;
        color: #111827;
        position: relative;
        overflow: hidden;
      }

      .zigrow-design-2 .zigrow-design-2__row {
        display: flex; /* row is flex in BS, but we keep explicit for clarity */
        align-items: center;
      }

      /* doodle icons */
      .zigrow-design-2 .zigrow-design-2__doodle {
        position: absolute;
        color: var(--primary-colors, #d946ef);
        font-size: 1.6rem;
        opacity: 0.9;
      }

      .zigrow-design-2 .zigrow-design-2__doodle--tl {
        top: 12%;
        left: 3%;
      }

      .zigrow-design-2 .zigrow-design-2__doodle--br {
        bottom: 18%;
        right: 6%;
      }

      .zigrow-design-2 .zigrow-design-2__doodle--tr {
        top: 14%;
        right: 12%;
      }

      /* ---------- LEFT IMAGE CARD ---------- */
      .zigrow-design-2 .zigrow-design-2__image-card {
        text-align: center;
        border-radius: 32px;
        overflow: hidden;
        box-shadow: 0 24px 55px rgba(15, 23, 42, 0.28);
        background-color: #020617;
      }

      .zigrow-design-2 .zigrow-design-2__image-inner {
        text-align: center;
        width: 100%;
        height: 100%;
      }

      .zigrow-design-2 .zigrow-design-2__image {
        max-width: 100%;
        max-height: 100%;
        object-fit: cover;
      }

      /* ---------- RIGHT CONTENT ---------- */
      .zigrow-design-2 .zigrow-design-2__content {
        max-width: 520px;
        margin-left: auto;
      }

      .zigrow-design-2 .zigrow-design-2__eyebrow {
        margin: 0 0 0.75rem;
        font-size: 0.85rem;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: var(--primary-colors, #a855f7);
      }

      .zigrow-design-2 .zigrow-design-2__title-line {
        margin: 0;
        font-size: 2.8rem;
        line-height: 1.08;
      }

      .zigrow-design-2 .zigrow-design-2__title-highlight {
        color: var(--primary-colors, #ec4899);
      }

      .zigrow-design-2 .zigrow-design-2__description {
        margin: 1.2rem 0 1.8rem;
        font-size: 0.98rem;
        line-height: 1.7;
        color: #4b5563;
      }

      /* ---------- TICKET STRIP ---------- */
      .zigrow-design-2 .zigrow-design-2__ticket-strip {
        display: flex;
        align-items: stretch;
        gap: 1.4rem;
        padding: 1.4rem 1.6rem;
        border-radius: 999px;
        background: radial-gradient(
            circle at 0% 0%,
            rgba(236, 72, 153, 0.4),
            transparent 65%
          ),
          linear-gradient(90deg, #f9a8ff 0, #f973ff 35%, #a855f7 95%);
        box-shadow: 0 18px 36px rgba(236, 72, 153, 0.4);
        @media (max-width: 1200px) {
          border-radius: 28px;
          flex-direction: column;
          align-items: flex-start;
        }
      }

      .zigrow-design-2 .zigrow-design-2__ticket-info {
        flex: 1;
        color: #111827;
      }

      .zigrow-design-2 .zigrow-design-2__ticket-title {
        margin: 0 0 0.4rem;
        font-size: 1.05rem;
        font-weight: 600;
      }

      .zigrow-design-2 .zigrow-design-2__ticket-subtitle {
        margin: 0 0 0.7rem;
        font-size: 0.9rem;
      }

      .zigrow-design-2 .zigrow-design-2__meta-row {
        display: flex;
        flex-wrap: wrap;
        gap: 1.2rem;
      }

      .zigrow-design-2 .zigrow-design-2__meta-item {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        font-size: 0.82rem;
      }

      .zigrow-design-2 .zigrow-design-2__meta-item i {
        font-size: 0.9rem;
        color: #111827;
      }

      /* CTA LINK BUTTON */
      .zigrow-design-2 .zigrow-design-2__ticket-cta {
        display: flex;
        align-items: center;
      }

      .zigrow-design-2 .zigrow-design-2__cta-link {
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;
        padding: 0.9rem 1.8rem;
        border-radius: 999px;
        background-color: #111827;
        text-decoration: none;
      }

      .zigrow-design-2 .zigrow-design-2__cta-link p {
        margin: 0;
        font-size: 0.86rem;
        font-weight: 600;
        letter-spacing: 0.09em;
        text-transform: uppercase;
        color: #f9fafb;
      }

      .zigrow-design-2 .zigrow-design-2__cta-link span {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      .zigrow-design-2 .zigrow-design-2__cta-link span i {
        font-size: 1rem;
        color: #f9fafb;
      }

      .zigrow-design-2 .zigrow-design-2__cta-link:hover {
        background-color: #020617;
      }

      /* ---------- RESPONSIVE BREAKPOINTS ---------- */

      /* tablets & small laptops */
      @media (max-width: 1199.98px) {
        .zigrow-design-2 .zigrow-design-2__title-line {
          font-size: 2.4rem;
        }
      }

      /* <= 992px: stack content nicely, scale strip */
      @media (max-width: 991.98px) {
        .zigrow-design-2 {
          padding: 3rem 0;
          min-height: auto;
        }

        .zigrow-design-2 .zigrow-design-2__row {
          align-items: flex-start;
        }

        .zigrow-design-2 .zigrow-design-2__image-card {
          max-width: 560px;
          margin: 0 auto 2rem;
        }

        .zigrow-design-2 .zigrow-design-2__content {
          max-width: none;
          margin: 0 auto;
        }

        .zigrow-design-2 .zigrow-design-2__title-line {
          font-size: 2.3rem;
        }

        .zigrow-design-2 .zigrow-design-2__ticket-strip {
          border-radius: 28px;
          flex-direction: column;
          align-items: flex-start;
          @media (max-width: 1200px) {
            border-radius: 28px;
            flex-direction: column;
            align-items: flex-start;
          }
        }

        .zigrow-design-2 .zigrow-design-2__ticket-cta {
          width: 100%;
        }

        .zigrow-design-2 .zigrow-design-2__cta-link {
          width: 100%;
          justify-content: center;
        }
      }

      /* phones */
      @media (max-width: 575.98px) {
        .zigrow-design-2 {
          padding: 2.6rem 0;
        }

        .zigrow-design-2 .zigrow-design-2__title-line {
          font-size: 2rem;
        }

        .zigrow-design-2 .zigrow-design-2__description {
          font-size: 0.94rem;
          margin-bottom: 1.5rem;
        }

        .zigrow-design-2 .zigrow-design-2__ticket-strip {
          padding: 1.1rem 1.3rem;
        }

        .zigrow-design-2 .zigrow-design-2__meta-row {
          gap: 0.7rem;
        }

        .zigrow-design-2 .zigrow-design-2__doodle {
          font-size: 1.2rem;
        }

        .zigrow-design-2 .zigrow-design-2__doodle--tl,
        .zigrow-design-2 .zigrow-design-2__doodle--tr,
        .zigrow-design-2 .zigrow-design-2__doodle--br {
          display: none;
        }
      }
    </style>
    </section>`,
});
Vvveb.Blocks.add("bootstrap4/zigrow-design-1", {
    name: "design-3",
    category: "design",

    image: "https://i.postimg.cc/bNGzC4Gk/design-3.png",

    html: `
<section
  class="zigrow-design-1 py-6"
  data-section="zigrow-design-1"
  id="zigrow-design-1"
>
  <div class="zigrow-design-1__pink" aria-hidden="true"></div>

  <div class="container zigrow-design-1__container">
    <div class="zigrow-design-1__top">
      <div class="zigrow-design-1__soft-panel" aria-hidden="true"></div>

      <div class="row">
        <!-- LEFT -->
        <div class="col-12 col-lg-6">
          <div class="zigrow-design-1__left">
            <h2 class="zigrow-design-1__title">
              Innovate ideas for<br />
              your products &<br />
              Business
            </h2>
            <p class="zigrow-design-1__lead">
              Agency that build many amazing product to boost your business to
              next level.
            </p>
          </div>
        </div>

        <!-- RIGHT -->
        <div class="col-12 col-lg-6">
          <div class="zigrow-design-1__right">
            <div class="zigrow-design-1__right-head">
              <div class="zigrow-design-1__right-title-row">
                <h3 class="zigrow-design-1__right-title">Global partners</h3>

                <button
                  class="zigrow-design-1__spark-btn"
                  type="button"
                  aria-label="Spark"
                  data-icon="spark"
                >
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M12 2l1.6 6.2L20 10l-6.4 1.8L12 18l-1.6-6.2L4 10l6.4-1.8L12 2z"
                      fill="#111"
                    />
                  </svg>
                </button>
              </div>

              <div class="row zigrow-design-1__right-cols">
                <div class="col-12 col-sm-6">
                  <p class="zigrow-design-1__right-text">
                    Agency that build many amazing product to boost your business
                    to next level.
                  </p>
                </div>
                <div class="col-12 col-sm-6">
                  <p class="zigrow-design-1__right-text">
                    We are officially partner with world to best brands,
                    Subscribe to our new letter.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- BADGE -->
      <div class="zigrow-design-1__badge" aria-hidden="true">
        <div class="zigrow-design-1__badge-ring" data-rotate-ring>
          <svg viewBox="0 0 100 100">
            <defs>
              <path
                id="circlePath"
                d="M 50,50 m -34,0 a 34,34 0 1,1 68,0 a 34,34 0 1,1 -68,0"
              />
            </defs>
            <text font-size="8.6" fill="#fff" letter-spacing="1.5">
              <textPath href="#circlePath" startOffset="0%">
                subscribe to view collection • subscribe to view collection •
                subscribe to view collection •
              </textPath>
            </text>
          </svg>
        </div>
        <div class="zigrow-design-1__badge-center">
          <span class="zigrow-design-1__badge-flower"></span>
        </div>
      </div>
    </div>

    <!-- BOTTOM CARDS -->
    <div class="zigrow-design-1__bottom">
      <div class="row">
        <div class="col-12 col-md-4">
          <div class="zigrow-design-1__card zigrow-design-1__card--dark">
            <h3 class="zigrow-design-1__percent">28%</h3>
            <p class="zigrow-design-1__small">
              INVENTING THE<br />FUTURE OF<br />DESIGN
            </p>
          </div>
        </div>

        <div class="col-12 col-md-5">
          <div class="zigrow-design-1__card zigrow-design-1__card--soft">
            <button
              class="zigrow-design-1__spark-mini"
              type="button"
              aria-label="Spark"
              data-icon="spark"
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 2l1.6 6.2L20 10l-6.4 1.8L12 18l-1.6-6.2L4 10l6.4-1.8L12 2z"
                  fill="#111"
                />
              </svg>
            </button>

            <h3 class="zigrow-design-1__percent">55%</h3>
            <p class="zigrow-design-1__grow">Grow since las day</p>

            <div class="zigrow-design-1__avatars" aria-hidden="true">
              <span class="zigrow-design-1__avatar"></span>
              <span class="zigrow-design-1__avatar"></span>
              <span class="zigrow-design-1__avatar"></span>
              <span class="zigrow-design-1__avatar">+2</span>
            </div>

            <span class="zigrow-design-1__arrow" aria-hidden="true"></span>
          </div>
        </div>

        <div class="col-12 col-md-3 zigrow-design-1__spacer-col"></div>
      </div>
    </div>
  </div>

  <!-- RIGHT DECOR -->
  <div class="zigrow-design-1__decor" aria-hidden="true">
    <svg
      class="zigrow-design-1__arcs"
      viewBox="0 0 520 340"
      preserveAspectRatio="none"
    >
      <path
        d="M140 320 C140 190, 260 120, 380 120 C500 120, 620 190, 620 320"
        fill="none"
        stroke="rgba(0,0,0,0.65)"
        stroke-width="2"
      />
      <path
        d="M160 320 C160 205, 270 145, 380 145 C490 145, 600 205, 600 320"
        fill="none"
        stroke="rgba(0,0,0,0.55)"
        stroke-width="2"
      />
      <path
        d="M180 320 C180 220, 280 170, 380 170 C480 170, 580 220, 580 320"
        fill="none"
        stroke="rgba(0,0,0,0.45)"
        stroke-width="2"
      />
      <path
        d="M200 320 C200 235, 290 195, 380 195 C470 195, 560 235, 560 320"
        fill="none"
        stroke="rgba(0,0,0,0.35)"
        stroke-width="2"
      />
      <path
        d="M220 320 C220 250, 300 220, 380 220 C460 220, 540 250, 540 320"
        fill="none"
        stroke="rgba(0,0,0,0.25)"
        stroke-width="2"
      />
    </svg>

    <div class="zigrow-design-1__object-card"></div>
    <div class="zigrow-design-1__object" data-icon="3d-object"></div>
  </div>

  <style>
    body {
      margin: 0;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
        sans-serif;
      background: #0b0b0b;
    }

    .zigrow-design-1 {
      position: relative;
      overflow: hidden;
      background: #e7dbff;
    }
    .py-6 {
      padding: 3rem 0;
    }

    .zigrow-design-1::before,
    .zigrow-design-1::after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      width: 26px;
      background: #0b0b0b;
      z-index: 1;
    }
    .zigrow-design-1::before {
      left: 0;
    }
    .zigrow-design-1::after {
      right: 0;
    }

    .zigrow-design-1 .zigrow-design-1__pink {
      position: absolute;
      left: 26px;
      bottom: 0;
      width: 140px;
      height: 170px;
      background: #f39aa1;
      z-index: 1;
    }

    .zigrow-design-1 .zigrow-design-1__container {
      position: relative;
      z-index: 2;
      max-width: 1140px;
    }

    .zigrow-design-1 .zigrow-design-1__top {
      position: relative;
    }

    .zigrow-design-1 .zigrow-design-1__soft-panel {
      position: absolute;
      left: 0;
      top: 0.2rem;
      width: min(520px, 92%);
      height: 240px;
      background: rgba(255, 255, 255, 0.12);
      z-index: 0;
    }

    .zigrow-design-1 .zigrow-design-1__left,
    .zigrow-design-1 .zigrow-design-1__right {
      position: relative;
      z-index: 2;
      padding: 0.25rem 0;
    }

    .zigrow-design-1 .zigrow-design-1__title {
      font-size: clamp(2.1rem, 4.2vw, 3.2rem);
      line-height: 1.02;
      letter-spacing: -0.02em;
      font-weight: 800;
      margin: 0;
      color: #111;
    }

    .zigrow-design-1 .zigrow-design-1__lead {
      margin: 1.2rem 0 0;
      max-width: 360px;
      color: #2b2b2b;
      font-size: 0.98rem;
      line-height: 1.45;
    }

    .zigrow-design-1 .zigrow-design-1__right-head {
      position: relative;
      padding-left: 1.25rem;
    }

    .zigrow-design-1 .zigrow-design-1__right-head::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0.35rem;
      width: 1px;
      height: 78px;
      background: rgba(0, 0, 0, 0.35);
    }

    .zigrow-design-1 .zigrow-design-1__right-title-row {
      position: relative;
      padding-right: 54px;
    }

    .zigrow-design-1 .zigrow-design-1__right-title {
      margin: 0;
      font-size: 1.15rem;
      font-weight: 800;
      color: #111;
    }

    .zigrow-design-1 .zigrow-design-1__spark-btn {
      position: absolute;
      right: 0;
      top: -0.15rem;
      width: 42px;
      height: 42px;
      border: 0;
      border-radius: 999px;
      background: #fff;
      cursor: pointer;
      box-shadow: 0 10px 18px rgba(0, 0, 0, 0.12);
    }
    .zigrow-design-1 .zigrow-design-1__spark-btn svg {
      width: 18px;
      height: 18px;
    }

    .zigrow-design-1 .zigrow-design-1__right-cols {
      margin-top: 0.75rem;
    }

    .zigrow-design-1 .zigrow-design-1__right-text {
      margin: 0.75rem 0 0;
      color: #2b2b2b;
      font-size: 0.86rem;
      line-height: 1.45;
      max-width: 230px;
    }

    .zigrow-design-1 .zigrow-design-1__badge {
      position: absolute;
      left: 50%;
      top: 165px;
      transform: translateX(-50%);
      width: 98px;
      height: 98px;
      border-radius: 999px;
      background: black;
      box-shadow: none;
      z-index: 3;
    }

    .zigrow-design-1 .zigrow-design-1__badge-ring {
      position: absolute;
      inset: 0;
      display: block;
      transform: rotate(0deg);
    }
    .zigrow-design-1 .zigrow-design-1__badge-ring svg {
      width: 100%;
      height: 100%;
    }

    .zigrow-design-1 .zigrow-design-1__badge-center {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
    }

    .zigrow-design-1 .zigrow-design-1__badge-flower {
      width: 22px;
      height: 22px;
      display: inline-block;
      background: radial-gradient(circle at 50% 50%, #fff 0 22%, transparent 23%),
        conic-gradient(
          from 0deg,
          transparent 0 15deg,
          #fff 15deg 25deg,
          transparent 25deg 45deg,
          #fff 45deg 55deg,
          transparent 55deg 75deg,
          #fff 75deg 85deg,
          transparent 85deg 105deg,
          #fff 105deg 115deg,
          transparent 115deg 135deg,
          #fff 135deg 145deg,
          transparent 145deg 165deg,
          #fff 165deg 175deg,
          transparent 175deg 195deg,
          #fff 195deg 205deg,
          transparent 205deg 225deg,
          #fff 225deg 235deg,
          transparent 235deg 255deg,
          #fff 255deg 265deg,
          transparent 265deg 285deg,
          #fff 285deg 295deg,
          transparent 295deg 315deg,
          #fff 315deg 325deg,
          transparent 325deg 345deg,
          #fff 345deg 355deg,
          transparent 355deg 360deg
        );
      border-radius: 999px;
      opacity: 0.95;
    }

    .zigrow-design-1 .zigrow-design-1__bottom {
      margin-top: 2.4rem;
      position: relative;
      z-index: 2;
    }

    .zigrow-design-1 .zigrow-design-1__card {
      border-radius: 0;
      overflow: hidden;
      position: relative;
    }

    .zigrow-design-1 .zigrow-design-1__card--dark {
      background: #0f0f10;
      color: #fff;
      padding: 1.5rem 1.4rem;
      min-height: 155px;
    }

    .zigrow-design-1 .zigrow-design-1__percent {
      margin: 0;
      font-size: 2.6rem;
      font-weight: 800;
      letter-spacing: -0.02em;
    }

    .zigrow-design-1 .zigrow-design-1__small {
      margin: 0.55rem 0 0;
      font-size: 0.72rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      line-height: 1.35;
      opacity: 0.95;
      max-width: 170px;
    }

    .zigrow-design-1 .zigrow-design-1__card--soft {
      background: rgba(17, 17, 17, 0.06);
      color: #111;
      padding: 1.4rem 1.4rem 1.2rem;
      min-height: 155px;
    }

    .zigrow-design-1 .zigrow-design-1__spark-mini {
      position: absolute;
      right: 10px;
      top: -18px;
      width: 38px;
      height: 38px;
      border: 0;
      border-radius: 999px;
      background: #fff;
      cursor: pointer;
      box-shadow: 0 12px 18px rgba(0, 0, 0, 0.12);
    }
    .zigrow-design-1 .zigrow-design-1__spark-mini svg {
      width: 16px;
      height: 16px;
    }

    .zigrow-design-1 .zigrow-design-1__grow {
      margin: 0.5rem 0 0;
      font-size: 0.84rem;
      color: rgba(0, 0, 0, 0.7);
    }

    .zigrow-design-1 .zigrow-design-1__avatars {
      margin-top: 0.7rem;
      position: relative;
      height: 26px;
    }

    .zigrow-design-1 .zigrow-design-1__avatar {
      width: 26px;
      height: 26px;
      border-radius: 999px;
      border: 2px solid #e7dbff;
      position: absolute;
      top: 0;
      background: radial-gradient(circle at 30% 30%, #fff, #cfc7ff 55%, #9b8bff);
    }
    .zigrow-design-1 .zigrow-design-1__avatar:nth-child(1) {
      left: 0;
    }
    .zigrow-design-1 .zigrow-design-1__avatar:nth-child(2) {
      left: 16px;
    }
    .zigrow-design-1 .zigrow-design-1__avatar:nth-child(3) {
      left: 32px;
    }
    .zigrow-design-1 .zigrow-design-1__avatar:nth-child(4) {
      left: 48px;
      background: #0f0f10;
      color: #fff;
      display: grid;
      place-items: center;
      font-size: 0.75rem;
      border-color: #e7dbff;
    }

    .zigrow-design-1 .zigrow-design-1__arrow {
      position: absolute;
      right: 14px;
      bottom: 16px;
      width: 26px;
      height: 26px;
      border-radius: 999px;
      background: transparent;
      border: 1px solid rgba(0, 0, 0, 0.25);
    }
    .zigrow-design-1 .zigrow-design-1__arrow::before {
      content: "";
      position: absolute;
      left: 9px;
      top: 9px;
      width: 8px;
      height: 8px;
      border-right: 2px solid rgba(0, 0, 0, 0.7);
      border-top: 2px solid rgba(0, 0, 0, 0.7);
      transform: rotate(45deg);
    }

    .zigrow-design-1 .zigrow-design-1__decor {
      position: absolute;
      right: 60px;
      bottom: -18px;
      width: min(520px, 54vw);
      height: 340px;
      z-index: 1;
      pointer-events: none;
    }
    .zigrow-design-1 .zigrow-design-1__arcs {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      opacity: 0.9;
    }
    .zigrow-design-1 .zigrow-design-1__object-card {
      position: absolute;
      right: 70px;
      bottom: 28px;
      width: 180px;
      height: 180px;
      background: rgba(17, 17, 17, 0.06);
    }
    .zigrow-design-1 .zigrow-design-1__object {
      position: absolute;
      left: 50%;
      top: 55%;
      transform: translate(-50%, -50%);
      width: 96px;
      height: 96px;
      border-radius: 28px;
      background: radial-gradient(
          circle at 30% 25%,
          rgba(255, 255, 255, 0.6),
          rgba(255, 255, 255, 0) 42%
        ),
        radial-gradient(
          circle at 65% 70%,
          rgba(255, 255, 255, 0.15),
          rgba(0, 0, 0, 0) 45%
        ),
        linear-gradient(135deg, #0a0a0a, #262626);
      box-shadow: 0 26px 35px rgba(0, 0, 0, 0.35);
      filter: saturate(1.05);
      animation: blobFloat 3.4s ease-in-out infinite;
    }

    .zigrow-design-1 .zigrow-design-1__object::before,
    .zigrow-design-1 .zigrow-design-1__object::after {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: 28px;
      background: conic-gradient(
        from 0deg,
        rgba(255, 255, 255, 0.04),
        rgba(255, 255, 255, 0) 35%,
        rgba(255, 255, 255, 0.08) 55%,
        rgba(255, 255, 255, 0) 85%,
        rgba(255, 255, 255, 0.04)
      );
      mix-blend-mode: screen;
      opacity: 0.55;
    }
    .zigrow-design-1 .zigrow-design-1__object::after {
      inset: 8px;
      opacity: 0.35;
    }

    @keyframes blobFloat {
      0% {
        transform: translate(-50%, -50%) rotate(-4deg);
      }
      50% {
        transform: translate(-50%, -55%) rotate(6deg);
      }
      100% {
        transform: translate(-50%, -50%) rotate(-4deg);
      }
    }

    @media (max-width: 1199.98px) {
      .zigrow-design-1::before,
      .zigrow-design-1::after {
        display: none;
      }
      .zigrow-design-1 .zigrow-design-1__pink {
        display: none;
      }
    }

    @media (max-width: 767.98px) {
      .zigrow-design-1 {
        padding: 2.6rem 0 2.4rem;
      }

      .zigrow-design-1 .zigrow-design-1__badge {
        background-color: transparent;
      }

      .zigrow-design-1 .zigrow-design-1__soft-panel {
        display: none;
      }

      .zigrow-design-1 .zigrow-design-1__right-head {
        margin-top: 1.4rem;
        padding-left: 0;
      }

      .zigrow-design-1 .zigrow-design-1__right-head::before {
        display: none;
      }

      .zigrow-design-1 .zigrow-design-1__badge {
        position: static;
        transform: none;
        margin: 1.2rem auto 0;
      }

      .zigrow-design-1 .zigrow-design-1__decor {
        position: relative;
        right: auto;
        bottom: auto;
        width: 100%;
        height: 260px;
        margin-top: 1.2rem;
      }

      .zigrow-design-1 .zigrow-design-1__object-card {
        right: 14%;
        width: 160px;
        height: 160px;
      }

      .zigrow-design-1 .zigrow-design-1__right-text {
        max-width: none;
      }
    }

    @media (max-width: 575.98px) {
      .zigrow-design-1 .zigrow-design-1__spark-btn,
      .zigrow-design-1 .zigrow-design-1__spark-mini {
        display: none;
      }

      .zigrow-design-1 .zigrow-design-1__title {
        font-size: 1.9rem;
        line-height: 1.05;
      }

      .zigrow-design-1 .zigrow-design-1__lead {
        font-size: 0.95rem;
        margin-top: 0.85rem;
      }

      .zigrow-design-1 .zigrow-design-1__bottom {
        margin-top: 1.35rem;
      }

      .zigrow-design-1 .zigrow-design-1__card--soft {
        min-height: auto;
      }
    }
  </style>

  <script>
    (function () {
      const ring = document.querySelector("[data-rotate-ring]");
      if (!ring) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduceMotion) return;

      let angle = 0;
      function tick() {
        angle = (angle + 0.35) % 360;
        ring.style.transform = "rotate(" + angle + "deg)";
        requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    })();
  </script>
</section>
`,
});

// Service
Vvveb.Blocks.add("bootstrap4/zigrow-service-1", {
    name: "service-1",
    category: "service",
    image: "https://i.postimg.cc/GmGbrYJW/service-1.png",
    html: `   <section
      id="zigrow-service-1"
      data-section="zigrow-service-1"
      class="zigrow-service-1-section py-6"
    >
      <div class="container">
        <div class="row zigrow-service-1-inner">
          <!-- Left Column: Heading, Description, Image Grid -->
          <div class="col-12 col-lg-6">
            <h2 class="zigrow-service-1-title">Our Services</h2>
            <p class="zigrow-service-1-text">
              We provide data-driven digital marketing solutions designed to
              grow your business. From increasing website traffic with SEO to
              driving sales through PPC, we create strategies tailored to your
              goals. Our social media marketing helps build brand awareness, and
              content marketing establishes credibility. Plus, with analytics &
              conversion optimization, we ensure every campaign delivers
              measurable results.
            </p>

            <!-- Image grid -->
            <div class="row g-3 image-grid-row">
              <div class="col-sm-4 col-12 image-grid-col">
                <div class="image-wrapper-main">
                  <div class="purple-bg-box"></div>
                  <img
                    src="/builder/img/zigrow-service-images/zigrow-service-1-a.webp"
                    alt="Service 1"
                    class="service-image"
                  />
                </div>
              </div>
              <div class="col-sm-4 col-12 image-grid-col">
                <img
                  src="/builder/img/zigrow-service-images/zigrow-service-1-b.webp"
                  alt="Service 2"
                  class="service-image"
                />
              </div>
              <div class="col-sm-4 col-12 image-grid-col">
                <img
                src="/builder/img/zigrow-service-images/zigrow-service-1-c.webp"
                  alt="Service 3"
                  class="service-image"
                />
              </div>
            </div>
          </div>

          <!-- Right Column: Service List -->
          <div class="col-12 col-lg-6 service-list-column">
            <!-- Service 1 -->
            <div class="row service-item-row">
              <div class="col-2 col-md-1 service-item-icon-col">
                <div class="service-icon-box">
                  <img    src="/builder/img/zigrow-icon-images/zigrow-service-1-
                  service-icon-d.svg" alt="Social Icon" />
                </div>
              </div>
              <div class="col-10 col-md-11 service-item-text-col">
                <h5 class="service-title">Social Media Marketing</h5>
                <p class="service-text">
                  Engage and grow your audience with strategic content, ads, and
                  brand positioning across Facebook, Instagram, LinkedIn, and
                  more.
                </p>
              </div>
            </div>

            <!-- Service 2 -->
            <div class="row service-item-row">
              <div class="col-2 col-md-1 service-item-icon-col">
                <div class="service-icon-box">
                  <img src="/builder/img/zigrow-icon-images/zigrow-service-1-service-icon-b.svg" alt="Content Icon" />
                </div>
              </div>
              <div class="col-10 col-md-11 service-item-text-col">
                <h5 class="service-title">Content Marketing</h5>
                <p class="service-text">
                  Attract and convert customers with compelling blog posts,
                  website copy, case studies, guides, and email marketing
                  campaigns.
                </p>
              </div>
            </div>

            <!-- Service 3 -->
            <div class="row service-item-row">
              <div class="col-2 col-md-1 service-item-icon-col">
                <div class="service-icon-box">
                  <img src="/builder/img/zigrow-icon-images/zigrow-service-1-service-icon-c.svg" alt="SEO Icon" />
                </div>
              </div>
              <div class="col-10 col-md-11 service-item-text-col">
                <h5 class="service-title">SEO &amp; SEM Optimization</h5>
                <p class="service-text">
                  Boost your website's search engine rankings with expert
                  keyword strategies, on-page optimization, and high-quality
                  backlinks.
                </p>
              </div>
            </div>

            <!-- Service 4 -->
            <div class="row service-item-row">
              <div class="col-2 col-md-1 service-item-icon-col">
                <div class="service-icon-box">
                  <img src="/builder/img/zigrow-icon-images/zigrow-service-1-service-icon-a.svg" alt="PPC Icon" />
                </div>
              </div>
              <div class="col-10 col-md-11 service-item-text-col">
                <h5 class="service-title">PPC (Pay-Per-Click Advertising)</h5>
                <p class="service-text">
                  Maximize ROI with targeted Google Ads and social media
                  campaigns that drive high-quality traffic and conversions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
       <style>
      .zigrow-service-1-section {
        background-color: #f7f3fb;
      }
      .py-6 {
        padding: 3rem 0;
      }
      /* Inner wrapper */
      /* .zigrow-service-1-section .zigrow-service-1-inner {
      } */

      /* Typography */
      .zigrow-service-1-section .zigrow-service-1-title {
        font-family: "Montserrat", system-ui, -apple-system, BlinkMacSystemFont,
          "Segoe UI", sans-serif;
        font-size: 2rem;
        font-weight: 700;
        color: #000000;
        margin-bottom: 16px;
        text-align: center;
      }

      .zigrow-service-1-section .zigrow-service-1-text {
        font-size: 1.06rem;
        line-height: 1.6;
        color: var(--secondary-colors, #6c6c6c);
        margin-bottom: 32px;
        text-align: center;
      }

      @media (min-width: 768px) {
        .zigrow-service-1-section .zigrow-service-1-title,
        .zigrow-service-1-section .zigrow-service-1-text {
          text-align: left;
        }
      }

      /* Image grid */
      .zigrow-service-1-section .image-grid-row {
        margin-left: -8px;
        margin-right: -8px;
      }

      .zigrow-service-1-section .image-grid-col {
        border-radius: 8px;
        text-align: center;
        padding-left: 8px;
        padding-right: 8px;
      }

      .zigrow-service-1-section .image-wrapper-main {
        position: relative;
        height: 100%;
      }

      .zigrow-service-1-section .purple-bg-box {
        position: absolute;
        top: 10px;
        left: 10px;
        width: 100%;
        height: 100%;
        background-color: var(--primary-colors, #6a0dad);
        border-radius: 10px;
        transform: rotate(-5deg) translateX(-20px);
        z-index: 1;
        overflow: hidden;
      }

      .zigrow-service-1-section .service-image {
        max-width: 100%;
        max-height: 100%;
        border-radius: 8px;
        object-fit: cover;
        position: relative;
        z-index: 2;
      }

      @media (max-width: 767.98px) {
        .zigrow-service-1-section .purple-bg-box {
          display: none;
        }

        .zigrow-service-1-section .image-grid-row {
          margin-top: 16px;
        }
      }

      /* Right column – service list */
      .zigrow-service-1-section .service-list-column {
        margin-top: 32px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
      }

      @media (min-width: 992px) {
        .zigrow-service-1-section .service-list-column {
          margin-top: 0;
        }
      }

      .zigrow-service-1-section .service-item-row {
        margin-bottom: 24px;
      }

      /* .zigrow-service-1-section .service-item-icon-col {
      } */

      /* .zigrow-service-1-section .service-item-text-col {
      } */

      .zigrow-service-1-section .service-icon-box {
        text-align: center;
        width: 40px;
        height: 40px;
        background-color: var(--primary-colors, #6a0dad);
        border-radius: 8px;
        padding: 6px;
      }

      .zigrow-service-1-section .service-icon-box img {
        max-width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .zigrow-service-1-section .service-title {
        font-size: 1.15rem;
        font-weight: 600;
        margin: 0 0 6px;
        color: #111111;
      }

      .zigrow-service-1-section .service-text {
        font-size: 1.06rem;
        line-height: 1.5;
        color: var(--secondary-colors, #6c6c6c);
        margin: 0;
      }

      @media (min-width: 768px) {
        .zigrow-service-1-section .service-item-row {
          margin-bottom: 32px;
        }
      }
    </style>
    </section>`,
});
Vvveb.Blocks.add("bootstrap4/zigrow-service-2", {
    name: "service-2",
    category: "service",
    image: "https://i.postimg.cc/K8BmFLDS/service-2.png",
    html: `  <section
      id="zigrow-service-2"
      data-section="zigrow-service-2"
      class="zigrow-service-2 py-6"
    >
      <div class="container">
        <!-- Heading -->
        <div class="row">
          <div class="col-12">
            <div class="programs-heading">
              <h2 class="programs-title main-heading">
                Tailored Plans for Every Health Goal
              </h2>
              <p class="programs-subtitle muted">
                Your journey to better health starts with expert guidance.
              </p>
            </div>
          </div>
        </div>

        <!-- Cards -->
        <div class="row g-md-3 programs-row">
          <!-- Card 1 -->
          <div class="col-12 col-md-6 col-lg-4 clonable-card">
            <div class="program-card">
               <div class="icon">
            <i class="bi bi-fork-knife" aria-hidden="true"></i>
          </div>
              <h5>Personalized Meal Plans</h5>
              <p>
                Custom diet plans based on your goals, health conditions &
                preferences.
              </p>
            </div>
          </div>

          <!-- Card 2 -->
          <div class="col-12 col-md-6 col-lg-4 clonable-card">
            <div class="program-card">
              <div class="icon">
            <i class="bi bi-heart-pulse" aria-hidden="true"></i>
          </div>
              <h5>Lifestyle Coaching</h5>
              <p>Habit-building strategies for long-term success.</p>
            </div>
          </div>

          <!-- Card 3 -->
          <div class="col-12 col-md-6 col-lg-4 clonable-card">
            <div class="program-card">
             <div class="icon">
            <i class="bi bi-capsule-pill" aria-hidden="true"></i>
          </div>
              <h5>Supplement Guidance</h5>
              <p>Safe, research-backed supplement recommendations.</p>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <div class="row">
          <div class="col-12">
            <div class="programs-cta">
              <a href="#" class="programs-btn" data-btn="service-2">Start Your Journey</a>
            </div>
          </div>
        </div>

        <!-- Absolute Arrow -->
        <div class="arrow-img-box">
          <img
              src="/builder/img/zigrow-icon-images/zigrow-service-2-our-best-programs svg.png"
            alt="Arrow"
            class="programs-arrow"
          />
        </div>
      </div>
       <style>
      .zigrow-service-2 {
        background-color: #ffffff;
        position: relative;
        padding: 60px 0;
      }
      .py-6 {
        padding: 3rem 0;
      }
      /* Heading block */
      .zigrow-service-2 .programs-heading {
        text-align: center;
        margin-bottom: 24px;
        padding: 0 12px;
      }

      .zigrow-service-2 .programs-title {
        font-size: 2.2rem;
        font-weight: 700;
        margin-bottom: 10px;
      }

      .zigrow-service-2 .programs-subtitle {
        font-size: 1rem;
        color: var(--secondary-colors, #777777);
      }

      @media (min-width: 576px) {
        .zigrow-service-2 .programs-heading {
          margin-bottom: 40px;
        }

        .zigrow-service-2 .programs-title {
          font-size: 2.6rem;
        }

        .zigrow-service-2 .programs-subtitle {
          font-size: 1.05rem;
        }
      }

      @media (min-width: 992px) {
        .zigrow-service-2 .programs-title {
          font-size: 3rem;
        }

        .zigrow-service-2 .programs-subtitle {
          font-size: 1.2rem;
        }
      }

      /* Cards row */
      .zigrow-service-2 .programs-row > [class*="col-"] {
        margin-bottom: 24px;
      }

      @media (min-width: 768px) {
        .zigrow-service-2 .programs-row > [class*="col-"] {
          margin-bottom: 0;
        }
      }

      .zigrow-service-2 .program-card {
        background: #fafafa;
        border-radius: 25px;
        padding: 28px 22px;
        transition: all 0.3s ease;
        cursor: pointer;
        min-height: 16rem;
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
      }

      @media (min-width: 768px) {
        .zigrow-service-2 .program-card {
          padding: 35px 25px;
          min-height: 19rem;
        }
      }

      .zigrow-service-2 .program-card .icon {
        margin-bottom: 15px;
        background-color: var(--primary-colors, #34a853);
        color: #ffffff;
        border-radius: 16px;
        width: 55px;
        height: 55px;
        position: relative;

        /* Center icon perfectly */
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .zigrow-service-2 .program-card .icon i {
        font-size: 2rem;
      }

      .zigrow-service-2 .program-card h5 {
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: 10px;
        margin-top: 20px;
        color: #222222;
        transition: color 0.3s ease;
      }

      .zigrow-service-2 .program-card p {
        font-size: 0.98rem;
        color: var(--secondary-colors, #969696);
        transition: color 0.3s ease;
      }

      @media (min-width: 992px) {
        .zigrow-service-2 .program-card h5 {
          font-size: 1.4rem;
          margin-top: 25px;
        }

        .zigrow-service-2 .program-card p {
          font-size: 1rem;
        }
      }

      .zigrow-service-2 .program-card:hover {
        background: var(--primary-colors, #34a853);
        color: #ffffff;
      }

      .zigrow-service-2 .program-card:hover .icon {
        background-color: #ffffff;
        color: var(--primary-colors, #34a853);
      }

      .zigrow-service-2 .program-card:hover .icon i {
        color: var(--primary-colors, #34a853);
      }

      .zigrow-service-2 .program-card:hover h5,
      .zigrow-service-2 .program-card:hover p {
        color: #ffffff;
      }

      /* CTA button block */
      .zigrow-service-2 .programs-cta {
        margin-top: 32px;
        text-align: center;
      }

      @media (min-width: 768px) {
        .zigrow-service-2 .programs-cta {
          margin-top: 40px;
          text-align: right;
        }
      }

      .zigrow-service-2 .arrow-img-box {
        text-align: center;
      }
      .zigrow-service-2 .arrow-img-box img {
        max-width: 100%;
        max-height: 100%;
        object-fit: cover;
      }
      .zigrow-service-2 .programs-btn {
        display: inline-block;
        padding: 12px 26px;
        border-radius: 999px;
        background-color: var(--primary-colors, #34a853);
        color: #ffffff;
        text-decoration: none;
        font-weight: 500;
        font-size: 1rem;
        transition: background-color 0.3s ease, transform 0.2s ease,
          box-shadow 0.2s ease;
        box-shadow: 0 8px 18px rgba(52, 168, 83, 0.35);
      }

      .zigrow-service-2 .programs-btn:hover {
        background-color: #2f9448;
        transform: translateY(-1px);
        box-shadow: 0 10px 24px rgba(52, 168, 83, 0.45);
      }

      /* Arrow image */
      .zigrow-service-2 .programs-arrow {
        position: absolute;
        left: 15%;
        bottom: 5%;
        width: 120px;
        transform: rotate(10deg);
      }

      @media (max-width: 768px) {
        .zigrow-service-2 .programs-arrow {
          display: none;
        }
      }
    </style>
    </section>`,
});
Vvveb.Blocks.add("bootstrap4/zigrow-service-3", {
    name: "service-3",
    category: "service",
    image: "https://i.postimg.cc/zGKq5WFr/service-3.png",
    html: `
<section
  id="zigrow-service-3"
  data-section="zigrow-service-3"
  class="zigrow-service-3 py-6"
>
  <div class="container">
    <!-- Heading -->
    <div class="row service-heading">
      <div class="col-12">
        <h2 class="service-title">
          Professional Photography <br />
          Services
        </h2>
      </div>
    </div>

    <!-- Cards grid -->
    <div class="row service-row">
      <!-- Card 1 -->
      <div class="col-12 col-md-6 col-lg-4 clonable-card">
        <div class="service-card">
          <span class="left-border"></span>

          <div class="service-card-inner">
            <div class="row service-card-top">
              <div class="col-auto">
                <div class="card-icon">
                  <img
                    src="/builder/img/zigrow-icon-images/zigrow-service-3-zigrow-service-3 corporate-alt 1.svg"
                    alt="Corporate Shoots"
                  />
                </div>
              </div>
              <div class="col">
                <h5 class="card-title">Corporate Shoots</h5>
              </div>
            </div>

            <div class="service-card-middle">
              <p class="card-text">
                Polished headshots and brand images for teams, founders, and
                professionals—shot with consistent lighting and clean editing.
              </p>
            </div>

            <div class="service-card-bottom">
              <a href="#" class="card-link">Learn More</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Card 2 -->
      <div class="col-12 col-md-6 col-lg-4 clonable-card">
        <div class="service-card">
          <span class="left-border"></span>

          <div class="service-card-inner">
            <div class="row service-card-top">
              <div class="col-auto">
                <div class="card-icon">
                  <img
                    src="/builder/img/zigrow-icon-images/zigrow-service-3-zigrow-service-3 earth-americas 1.svg"
                    alt="Travel Photography"
                  />
                </div>
              </div>
              <div class="col">
                <h5 class="card-title">Travel Photography</h5>
              </div>
            </div>

            <div class="service-card-middle">
              <p class="card-text">
                Story-driven travel visuals—landscapes, culture, and details
                captured with a cinematic look for brands and creators.
              </p>
            </div>

            <div class="service-card-bottom">
              <a href="#" class="card-link">Learn More</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Card 3 -->
      <div class="col-12 col-md-6 col-lg-4 clonable-card">
        <div class="service-card">
          <span class="left-border"></span>

          <div class="service-card-inner">
            <div class="row service-card-top">
              <div class="col-auto">
                <div class="card-icon">
                  <img
                    src="/builder/img/zigrow-icon-images/zigrow-service-3-zigrow-service-3 theater-masks 1.svg"
                    alt="Portrait Sessions"
                  />
                </div>
              </div>
              <div class="col">
                <h5 class="card-title">Portrait Sessions</h5>
              </div>
            </div>

            <div class="service-card-middle">
              <p class="card-text">
                Personal portraits with natural direction—great for actors,
                creators, and anyone who wants confident, authentic images.
              </p>
            </div>

            <div class="service-card-bottom">
              <a href="#" class="card-link">Learn More</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Card 4 -->
      <div class="col-12 col-md-6 col-lg-4 clonable-card">
        <div class="service-card">
          <span class="left-border"></span>

          <div class="service-card-inner">
            <div class="row service-card-top">
              <div class="col-auto">
                <div class="card-icon">
                  <img
                    src="/builder/img/zigrow-icon-images/zigrow-service-3-zigrow-service-3 rings-wedding 1.svg"
                    alt="Wedding Shoots"
                  />
                </div>
              </div>
              <div class="col">
                <h5 class="card-title">Wedding Shoots</h5>
              </div>
            </div>

            <div class="service-card-middle">
              <p class="card-text">
                Candid moments and classic portraits—documenting your day with
                warm tones, true-to-life color, and timeless framing.
              </p>
            </div>

            <div class="service-card-bottom">
              <a href="#" class="card-link">Learn More</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Card 5 -->
      <div class="col-12 col-md-6 col-lg-4 clonable-card">
        <div class="service-card">
          <span class="left-border"></span>

          <div class="service-card-inner">
            <div class="row service-card-top">
              <div class="col-auto">
                <div class="card-icon">
                  <img
                    src="/builder/img/zigrow-icon-images/zigrow-service-3-zigrow-service-3 bags-shopping 1.svg"
                    alt="Product Photography"
                  />
                </div>
              </div>
              <div class="col">
                <h5 class="card-title">Product Photography</h5>
              </div>
            </div>

            <div class="service-card-middle">
              <p class="card-text">
                High-converting product shots for ecommerce—clean backgrounds,
                crisp details, and styled images that fit your brand.
              </p>
            </div>

            <div class="service-card-bottom">
              <a href="#" class="card-link">Learn More</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Card 6 -->
      <div class="col-12 col-md-6 col-lg-4 clonable-card">
        <div class="service-card">
          <span class="left-border"></span>

          <div class="service-card-inner">
            <div class="row service-card-top">
              <div class="col-auto">
                <div class="card-icon">
                  <img
                    src="/builder/img/zigrow-icon-images/zigrow-service-3-zigrow-service-3 dress 1.svg"
                    alt="Fashion Shoots"
                  />
                </div>
              </div>
              <div class="col">
                <h5 class="card-title">Fashion Shoots</h5>
              </div>
            </div>

            <div class="service-card-middle">
              <p class="card-text">
                Editorial-style fashion photography—posed and candid frames that
                highlight styling, texture, and movement for brands and models.
              </p>
            </div>

            <div class="service-card-bottom">
              <a href="#" class="card-link">Learn More</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <style>
    .zigrow-service-3 {
      background-color: #121212;
      color: #ffffff;
    }
    .py-6 {
      padding: 3rem 0;
    }

    .zigrow-service-3 .service-heading {
      margin-bottom: 32px;
    }

    .zigrow-service-3 .service-title {
      font-size: 2.4rem;
      font-weight: 600;
      line-height: 1.2;
      margin: 0;
      text-align: center;
    }

    @media (min-width: 768px) {
      .zigrow-service-3 .service-title {
        font-size: 3rem;
        text-align: left;
      }
      .zigrow-service-3 .service-heading {
        margin-bottom: 40px;
      }
    }

    .zigrow-service-3 .service-row > [class*="col-"] {
      margin-bottom: 24px;
    }
    @media (min-width: 768px) {
      .zigrow-service-3 .service-row > [class*="col-"] {
        margin-bottom: 32px;
      }
    }

    .zigrow-service-3 .service-card {
      background-color: #2c2c2f;
      border-radius: 1rem;
      transition: transform 0.3s ease, background 0.3s ease;
      height: 100%;
      cursor: pointer;
      padding: 20px 18px;
      position: relative;
    }
    @media (min-width: 768px) {
      .zigrow-service-3 .service-card {
        padding: 24px 20px;
      }
    }

    .zigrow-service-3 .service-card:hover {
      transform: translateY(-5px);
      background-color: #292929;
    }

    .zigrow-service-3 .left-border {
      position: absolute;
      top: 25%;
      left: 0;
      width: 0.2rem;
      height: 100px;
      background: var(--primary-colors, #ff6b35);
    }

    .zigrow-service-3 .service-card-top {
      margin-bottom: 12px;
    }

    .zigrow-service-3 .card-icon {
      text-align: center;
      width: 30px;
      height: 30px;
    }

    .zigrow-service-3 .card-icon img {
      max-width: 100%;
      max-height: 100%;
      object-fit: cover;
      filter: brightness(1.2);
      vertical-align: middle;
    }

    .zigrow-service-3 .card-title {
      font-size: 1.1rem;
      font-weight: 600;
      margin: 4px 0 0;
      color: #ffffff;
    }

    @media (min-width: 768px) {
      .zigrow-service-3 .card-title {
        font-size: 1.2rem;
      }
    }

    .zigrow-service-3 .card-text {
      font-size: 0.95rem;
      color: var(--secondary-colors, #b3b3b3);
      margin: 12px 0 0;
    }

    .zigrow-service-3 .card-link {
      display: inline-block;
      margin-top: 10px;
      font-size: 0.9rem;
      color: var(--primary-colors, #ff6b35);
      text-decoration: none;
    }

    .zigrow-service-3 .card-link:hover {
      text-decoration: underline;
    }

    .zigrow-service-3 .service-card-inner {
      height: 100%;
    }

    .zigrow-service-3 .service-card-bottom {
      margin-top: 10px;
    }

    @media (min-width: 992px) {
      .zigrow-service-3 .service-card {
        min-height: 215px;
      }
    }
  </style>

  <script>
    // NOTE: Your HTML currently doesn't include .mySwiper markup.
    // Keep this only if you're using Swiper somewhere else on the page.
    if (window.Swiper) {
      const swiper = new Swiper(".mySwiper", {
        spaceBetween: 30,
        pagination: { el: ".swiper-pagination", clickable: true },
        breakpoints: {
          0: { slidesPerView: 1, slidesPerGroup: 1, grid: { rows: 1 } },
          768: { slidesPerView: 2, slidesPerGroup: 2, grid: { rows: 2, fill: "row" } },
          1200: { slidesPerView: 3, slidesPerGroup: 3, grid: { rows: 2, fill: "row" } },
        },
      });
    }
  </script>
</section>
`,
});
Vvveb.Blocks.add("bootstrap4/zigrow-service-4", {
    name: "service-4",
    category: "service",
    image: "https://i.postimg.cc/htTKgx1K/service-4.png",
    html: `   <section id="zigrow-service-4" class="zigrow-service-4 py-6" data-section="zigrow-service-4">
      <div class="container">
        <h2 class="top-title">Tailored Tours for Every <br />Traveler</h2>

        <div class="row g-4 g-md-5">
          <!-- CARD 1 -->
          <div class="col-12 col-md-6 col-lg-4 clonable-card">
            <div class="tour-card">
              <span class="tour-label">Royal Heritage Walk</span>

              <div class="tour-image-wrapper">
                <img
                   src="/builder/img/zigrow-service-images/zigrow-service-4-top-categories e.webp"
                  alt="Royal Heritage Walk"
                  class="tour-image"
                />
              </div>

              <a href="#" class="arrow-btn">
                <i class="bi bi-arrow-right" data-icon="arrow"></i>
              </a>
            </div>
          </div>

          <!-- CARD 2 -->
          <div class="col-12 col-md-6 col-lg-4 clonable-card">
            <div class="tour-card">
              <span class="tour-label">Mountain Escape</span>

              <div class="tour-image-wrapper">
                <img
                    src="/builder/img/zigrow-service-images/zigrow-service-4-top-categories d.webp"
                  alt="Mountain Escape"
                  class="tour-image"
                />
              </div>

              <a href="#" class="arrow-btn">
                <i class="bi bi-arrow-right" data-icon="arrow"></i>
              </a>
            </div>
          </div>

          <!-- CARD 3 -->
          <div class="col-12 col-md-6 col-lg-4 clonable-card">
            <div class="tour-card">
              <span class="tour-label">Hidden City Gems</span>

              <div class="tour-image-wrapper">
                <img
                  src="/builder/img/zigrow-service-images/zigrow-service-4-top-categories c.webp"
                  alt="Hidden City Gems"
                  class="tour-image"
                />
              </div>

              <a href="#" class="arrow-btn">
                <i class="bi bi-arrow-right" data-icon="arrow"></i>
              </a>
            </div>
          </div>

          <!-- CARD 4 -->
          <div class="col-12 col-md-6 col-lg-4 clonable-card">
            <div class="tour-card">
              <span class="tour-label">Coastal Serenity</span>

              <div class="tour-image-wrapper">
                <img
                  src="/builder/img/zigrow-service-images/zigrow-service-4-top-categories b.webp"
                  alt="Coastal Serenity"
                  class="tour-image"
                />
              </div>

              <a href="#" class="arrow-btn">
                <i class="bi bi-arrow-right" data-icon="arrow"></i>
              </a>
            </div>
          </div>

          <!-- CARD 5 -->
          <div class="col-12 col-md-6 col-lg-4 clonable-card">
            <div class="tour-card">
              <span class="tour-label">Wildlife Safari</span>

              <div class="tour-image-wrapper">
                <img
                  src="/builder/img/zigrow-service-images/zigrow-service-4-top-categories a.webp"
                  alt="Wildlife Safari"
                  class="tour-image"
                />
              </div>

              <a href="#" class="arrow-btn">
                <i class="bi bi-arrow-right" data-icon="arrow"></i>
              </a>
            </div>
          </div>

          <!-- CARD 6 -->
          <div class="col-12 col-md-6 col-lg-4 clonable-card">
            <div class="tour-card">
              <span class="tour-label">Culinary &amp; Wine Tour</span>

              <div class="tour-image-wrapper">
                <img
                   src="/builder/img/zigrow-service-images/zigrow-service-4-top-categories f.webp"
                  alt="Culinary &amp; Wine Tour"
                  class="tour-image"
                />
              </div>

              <a href="#" class="arrow-btn">
                <i class="bi bi-arrow-right" data-icon="arrow"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
        <style>
      /* ===========================
   TOUR SECTION (PARENT)
=========================== */
      .zigrow-service-4 {
        background-color: #ffffff;
      }

      .py-6 {
        padding: 3rem 0;
      }

      /* Section heading */
      .zigrow-service-4 .top-title {
        font-size: 2.3rem;
        font-weight: 600;
        margin-bottom: 2.5rem;
        line-height: 1.2;
      }

      /* ===========================
   CARD WRAPPER
=========================== */
      .zigrow-service-4 .tour-card {
        position: relative;
        border-radius: 50px;
        overflow: hidden;
        box-shadow: 0 18px 40px rgba(0, 0, 0, 0.18);
        transition: box-shadow 0.3s ease;
        background: #ffffff;
      }

      /* Hover elevation */
      .zigrow-service-4 .tour-card-hover:hover {
        box-shadow: 0 24px 50px rgba(0, 0, 0, 0.22);
      }

      /* Optional wrapper (in your HTML) */
      .zigrow-service-4 .tour-card .tour-image-wrapper {
        text-align: center;
        width: 100%;
        overflow: hidden;
        border-radius: 40px;
      }

      /* ===========================
   IMAGE
=========================== */
      .zigrow-service-4 .tour-card .tour-image {
        max-width: 100%;
        max-height: 100%;
        height: 260px;
        object-fit: cover;
        border-radius: 40px;
        transition: transform 0.3s ease;
      }

      /* Image zoom on hover */
      .zigrow-service-4 .tour-card .tour-image:hover {
        transform: scale(1.05);
      }

      /* ===========================
   TITLE PILL
=========================== */
      .zigrow-service-4 .tour-card .tour-label {
        position: absolute;
        top: 16px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.7);
        color: #fff;
        padding: 8px 28px;
        border-radius: 999px;
        font-weight: 600;
        font-size: 0.98rem;
        width: 80%;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        z-index: 3;
      }

      /* ===========================
   WHITE CURVED CUT (BOTTOM RIGHT)
=========================== */
      .zigrow-service-4 .tour-card::after {
        content: "";
        position: absolute;
        right: 0;
        bottom: 0;
        width: 90px;
        height: 90px;
        /* background: #ffffff; */
        border-top-left-radius: 100%;
        border-bottom-right-radius: 0;
        z-index: 1;
      }

      /* ===========================
   ARROW BUTTON (ANCHOR)
=========================== */
      .zigrow-service-4 .tour-card .arrow-btn {
        position: absolute;
        right: 14px;
        bottom: 18px;
        width: 70px;
        height: 70px;
        border-radius: 50%;
        border: none;
        background: #000;
        color: #fff;
        text-decoration: none;
        font-size: 2rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3;
        transition: transform 0.25s ease;
      }

      /* icon inside arrow */
      .zigrow-service-4 .tour-card .arrow-btn i[data-icon="arrow"] {
        font-size: 1.9rem;
      }

      /* subtle move on hover */
      .zigrow-service-4 .tour-card .arrow-btn:hover {
        transform: translateX(2px);
      }

      /* focus state */
      .zigrow-service-4 .tour-card .arrow-btn:focus {
        outline: 2px solid #fff;
        outline-offset: 3px;
      }

      /* ===========================
   RESPONSIVE TWEAKS
=========================== */

      /* Laptops / small desktops (<= 1199px) */
      @media (max-width: 1199.98px) {
        .zigrow-service-4 .top-title {
          font-size: 2rem;
        }

        .zigrow-service-4 .tour-card .tour-image {
          height: 240px;
        }

        .zigrow-service-4 .tour-card .arrow-btn {
          width: 64px;
          height: 64px;
          bottom: 16px;
          right: 14px;
        }

        .zigrow-service-4 .tour-card::after {
          width: 85px;
          height: 85px;
        }
      }

      /* Tablets (<= 991px) – 2 columns by Bootstrap */
      @media (max-width: 991.98px) {
        .zigrow-service-4 .top-title {
          font-size: 1.9rem;
          margin-bottom: 2rem;
        }

        .zigrow-service-4 .tour-card .tour-image {
          height: 230px;
        }

        .zigrow-service-4 .tour-card .tour-label {
          font-size: 0.9rem;
          width: 85%;
        }

        .zigrow-service-4 .tour-card::after {
          width: 80px;
          height: 80px;
        }

        .zigrow-service-4 .tour-card .arrow-btn {
          width: 60px;
          height: 60px;
          bottom: 16px;
          right: 14px;
        }

        .zigrow-service-4 .tour-card .arrow-btn i[data-icon="arrow"] {
          font-size: 1.6rem;
        }
      }

      /* Mobiles (<= 767px) – 1 column by Bootstrap */
      @media (max-width: 767.98px) {
        .py-6 {
          padding: 2.5rem 0;
        }

        .zigrow-service-4 .top-title {
          font-size: 1.8rem;
        }

        .zigrow-service-4 .tour-card {
          border-radius: 40px;
        }

        .zigrow-service-4 .tour-card .tour-image {
          height: 220px;
        }

        .zigrow-service-4 .tour-card .tour-label {
          font-size: 0.88rem;
          padding: 6px 18px;
          width: 90%;
          white-space: normal;
        }

        .zigrow-service-4 .tour-card::after {
          width: 75px;
          height: 75px;
        }

        .zigrow-service-4 .tour-card .arrow-btn {
          width: 56px;
          height: 56px;
          right: 14px;
          bottom: 16px;
        }

        .zigrow-service-4 .tour-card .arrow-btn i[data-icon="arrow"] {
          font-size: 1.4rem;
        }
      }

      /* Extra small mobiles (<= 575px) */
      @media (max-width: 575.98px) {
        .zigrow-service-4 .top-title {
          font-size: 1.7rem;
          margin-bottom: 1.8rem;
        }

        .zigrow-service-4 .tour-card .tour-image {
          height: 210px;
        }

        .zigrow-service-4 .tour-card .tour-label {
          width: 92%;
        }
      }
    </style>
    </section>`,
});
