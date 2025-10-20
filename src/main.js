import { initNav } from "./modules/nav.js";
import { initTechTags } from "./modules/tech.js";
import { initProjects } from "./modules/projects.js";
import { initRevealOnce, initTypingEffect } from "./modules/effects.js";
import { initEmailJsContact } from "./modules/contact.js";

window.addEventListener("DOMContentLoaded", () => {
  initNav();
  initTechTags();
  initProjects();
  initRevealOnce();
  initTypingEffect();
  initEmailJsContact();
});
