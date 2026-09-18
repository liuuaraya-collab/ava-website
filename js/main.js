/**
 * AVA Executive Services — Site JavaScript
 */
(function () {
  "use strict";

  /* Mobile navigation */
  const toggle = document.querySelector(".nav__toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  if (toggle && mobileMenu) {
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      mobileMenu.classList.toggle("is-open", !expanded);
      document.body.style.overflow = !expanded ? "hidden" : "";
    });
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        toggle.setAttribute("aria-expanded", "false");
        mobileMenu.classList.remove("is-open");
        document.body.style.overflow = "";
      });
    });
  }

  /* Active nav link */
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  document.querySelectorAll(".nav__links a, .mobile-menu a").forEach((a) => {
    const href = a.getAttribute("href");
    if (!href) return;
    const clean = href.replace(/\/$/, "");
    if (clean === path || (path.endsWith(clean) && clean !== "/")) {
      a.classList.add("active");
    }
  });

  /* Consultation form — send via email or WhatsApp */
  const form = document.getElementById("consultation-form");
  const AVA_EMAIL = "ava.executives@gmail.com";
  const AVA_WHATSAPP = "66936151939";

  function getFormData(form) {
    const data = new FormData(form);
    return {
      name: (data.get("name") || "").toString().trim(),
      email: (data.get("email") || "").toString().trim(),
      phone: (data.get("phone") || "").toString().trim(),
      nationality: (data.get("nationality") || "").toString().trim(),
      location: (data.get("location") || "").toString().trim(),
      service: (data.get("service") || "").toString().trim(),
      message: (data.get("message") || "").toString().trim(),
      contact_method: (data.get("contact_method") || "").toString().trim(),
      preferred_date: (data.get("preferred_date") || "").toString().trim(),
    };
  }

  function validateForm(form) {
    const successEl = form.querySelector(".form-success");
    const errorEl = form.querySelector(".form-error");
    successEl?.classList.remove("is-visible");
    errorEl?.classList.remove("is-visible");

    const required = form.querySelectorAll("[required]");
    let valid = true;
    required.forEach((field) => {
      if (!field.value.trim()) {
        valid = false;
        field.style.borderColor = "#ef4444";
      } else {
        field.style.borderColor = "";
      }
    });
    if (!valid) {
      if (errorEl) {
        errorEl.textContent = "Please complete all required fields.";
        errorEl.classList.add("is-visible");
      }
      return false;
    }

    const email = form.querySelector('[name="email"]');
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      if (errorEl) {
        errorEl.textContent = "Please enter a valid email address.";
        errorEl.classList.add("is-visible");
      }
      email.style.borderColor = "#ef4444";
      return false;
    }
    return true;
  }

  function buildMessageBody(d) {
    return [
      "New consultation request from AVA website",
      "",
      "Name: " + d.name,
      "Email: " + d.email,
      "Phone / WhatsApp: " + (d.phone || "—"),
      "Nationality: " + (d.nationality || "—"),
      "Current location: " + (d.location || "—"),
      "Service required: " + (d.service || "—"),
      "Preferred contact method: " + (d.contact_method || "—"),
      "Preferred consultation date: " + (d.preferred_date || "—"),
      "",
      "Message:",
      d.message || "—",
    ].join("\n");
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validateForm(form)) return;

      const d = getFormData(form);
      const subject = encodeURIComponent("AVA Consultation Request — " + d.name);
      const body = encodeURIComponent(buildMessageBody(d));
      window.location.href = "mailto:" + AVA_EMAIL + "?subject=" + subject + "&body=" + body;

      const successEl = form.querySelector(".form-success");
      if (successEl) {
        successEl.textContent =
          "Your email app should open with the request ready to send. If it does not, please email us directly.";
        successEl.classList.add("is-visible");
      }
    });

    const waBtn = document.getElementById("whatsapp-submit");
    if (waBtn) {
      waBtn.addEventListener("click", () => {
        if (!validateForm(form)) return;
        const d = getFormData(form);
        const text = encodeURIComponent(buildMessageBody(d));
        window.open("https://wa.me/" + AVA_WHATSAPP + "?text=" + text, "_blank", "noopener");
      });
    }
  }

  /* Subtle reveal on scroll */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));

  /* Current year in footer */
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
})();