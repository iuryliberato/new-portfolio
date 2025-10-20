import { $, $$, el, inFrag } from "../lib/dom.js";
import { NAV_ITEMS } from "../data/nav.js";
import { DESKTOP_MIN_WIDTH } from "../config.js";

export function initNav() {
  const navUl      = $("#nav");
  const burger     = $("#burger");
  const mobileMenu = $("#mobile-menu");
  const mobileNav  = $("#mobile-nav");
  if (!navUl || !burger || !mobileMenu || !mobileNav) return;

  // Desktop nav
  navUl.append(
    inFrag(
      NAV_ITEMS.map(({ label, id }) => {
        const li = el("li");
        const a  = el("a", { className: "nav__link", href: `#${id}`, textContent: label });
        li.append(a);
        return li;
      })
    )
  );

  // Mobile nav
  mobileNav.append(
    inFrag(
      NAV_ITEMS.map(({ label, id }) => {
        const li = el("li");
        const a  = el("a", { href: `#${id}`, textContent: label });
        a.addEventListener("click", closeMenu);
        li.append(a);
        return li;
      })
    )
  );

  function openMenu() {
    burger.dataset.open = "true";
    burger.setAttribute("aria-expanded", "true");
    burger.setAttribute("aria-label", "Close menu");
    burger.textContent = "✖";
    mobileMenu.hidden = false;
    document.documentElement.style.overflow = "hidden";
  }
  function closeMenu() {
    delete burger.dataset.open;
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Open menu");
    burger.textContent = "☰";
    mobileMenu.hidden = true;
    document.documentElement.style.overflow = "";
  }
  function toggleMenu() {
    burger.dataset.open ? closeMenu() : openMenu();
  }

  burger.addEventListener("click", toggleMenu);
  mobileMenu.addEventListener("click", (e) => {
    if (e.target === mobileMenu) closeMenu();
  });
  window.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });
  window.addEventListener("resize", () => {
    if (window.innerWidth > DESKTOP_MIN_WIDTH) closeMenu();
  });

  // Active link (desktop + mobile)
  const allLinksById = new Map(NAV_ITEMS.map(({ id }) => [id, $$(`a[href="#${id}"]`)]));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const links = allLinksById.get(entry.target.id);
      if (!links?.length) return;
      if (entry.isIntersecting) {
        allLinksById.forEach(arr => arr.forEach(a => a.removeAttribute("aria-current")));
        links.forEach(a => a.setAttribute("aria-current", "true"));
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px", threshold: 0.01 });

  NAV_ITEMS.forEach(({ id }) => {
    const sec = document.getElementById(id);
    if (sec) observer.observe(sec);
  });
}
