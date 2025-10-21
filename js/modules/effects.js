import { $$ } from "../lib/dom.js";

export function initRevealOnce() {
  const obs = new IntersectionObserver((entries, o) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("show");
        o.unobserve(e.target);
      }
    });
  }, { threshold: 0.2, rootMargin: "0px 0px -10% 0px" });

  $$(".reveal").forEach(n => obs.observe(n));
}

export function initTypingEffect() {
  const span = document.getElementById("type-target");
  if (!span) return;

  const text = span.dataset.text || span.textContent || "";
  if (!text) return;

  // accessibility: prevent double-reading while typing
  span.setAttribute("aria-label", text);
  span.textContent = "";
  span.classList.add("cursor");

  let i = 0;
  const speed = 65;
  const timer = setInterval(() => {
    span.textContent = text.slice(0, ++i);
    if (i >= text.length) clearInterval(timer);
  }, speed);
}
