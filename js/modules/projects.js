import { $, el, inFrag } from "../lib/dom.js";
import { PROJECTS } from "../data/projects.js";

export function initProjects() {
  const grid = $("#projects-grid");
  if (!grid) return;

  grid.textContent = "";
  const cards = PROJECTS.map(({ title, desc, video, live, git, tags = [] }) => {
    const card = el("article", { className: "card reveal" });

    if (video) {
      const media = el("div", { className: "card__media" });
      const vid = el("video", { src: video, controls: true, preload: "metadata", playsInline: true });
      media.append(vid);
      card.append(media);
    }

    const h3 = el("h3");
    if (live) {
      h3.append(el("a", {
        href: live, target: "_blank", rel: "noopener noreferrer",
        textContent: title, "aria-label": `Open live demo for ${title}`
      }));
    } else {
      h3.textContent = title;
    }
    card.append(h3);

    if (desc) card.append(el("p", { textContent: desc }));

    if (Array.isArray(tags) && tags.length) {
      const wrap = el("div", { className: "badges" });
      wrap.append(inFrag(tags.map(t => el("span", { className: "badge", textContent: t }))));
      card.append(wrap);
    }

    if (live || git) {
      const btns = el("div", { className: "btns" });
      if (live) btns.append(el("a", {
        href: live, target: "_blank", rel: "noopener noreferrer",
        className: "btn btn--accent", textContent: "Live Demo",
        "aria-label": `Open live demo for ${title}`
      }));
      if (git) btns.append(el("a", {
        href: git, target: "_blank", rel: "noopener noreferrer",
        className: "btn btn--outline", textContent: "GitHub",
        "aria-label": `Open GitHub repository for ${title}`
      }));
      card.append(btns);
    }

    return card;
  });

  grid.append(inFrag(cards));
}
