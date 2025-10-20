import { $, el, inFrag } from "../lib/dom.js";
import { TECH } from "../data/tech.js";

export function initTechTags() {
  const wrap = $("#tech-tags");
  if (!wrap) return;

  wrap.append(
    inFrag(
      TECH.map(({ name, icon }) => {
        const card = el("div", { className: "tag reveal", title: name });
        const img  = el("img", { src: icon, alt: `${name} logo`, loading: "lazy" });
        const p    = el("p", { textContent: name });
        card.append(img, p);
        return card;
      })
    )
  );
}
