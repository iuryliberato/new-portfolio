import { EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID } from "../config.js";

export function initEmailJsContact() {
  if (!window.emailjs) {
    console.warn("EmailJS SDK not loaded – check your <script src=...> tag in <head>.");
    return;
  }

  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

  const form   = document.getElementById("contact-form");
  const btn    = document.getElementById("send-btn");
  const status = document.getElementById("form-status");
  if (!form || !btn || !status) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // honeypot
    const honey = form.querySelector('input[name="company"]');
    if (honey && honey.value.trim() !== "") {
      status.textContent = "Thanks! We'll be in touch.";
      form.reset();
      return;
    }

    const original = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Sending…";
    status.textContent = "";

    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form);
      status.textContent = "Message sent! I’ll get back to you soon.";
      btn.textContent = "Sent";
      form.reset();
    } catch (err) {
      console.error(err);
      status.textContent = "Something went wrong. Please try again or email me directly.";
      btn.textContent = original;
    } finally {
      btn.disabled = false;
    }
  });
}
