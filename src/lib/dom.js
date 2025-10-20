export const $  = (sel, el = document) => el.querySelector(sel);
export const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));
export const el = (tag, props = {}) => Object.assign(document.createElement(tag), props);

export const inFrag = (nodes) => {
  const frag = document.createDocumentFragment();
  nodes.forEach(n => frag.append(n));
  return frag;
};
