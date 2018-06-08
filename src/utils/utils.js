export const $ = (selector, root = document) => {
  return root.querySelector(selector);
}

export const $$ = (selector, root = document) => {
  return [...root.querySelectorAll(selector)];
}

export const append = (parent, ...els) => {
  for (let el of els.values()) {
    parent.appendChild(el);
  }
}

export const ce = (ele) => {
  return document.createElement('ele');
}

export const formatObject = (obj) => {
  for (let [k, v] of Object.entries(obj)) {
    if (typeof v === 'object') {
      formatObject(obj[k]);
    }

    if (typeof v === 'function') {
      obj[k] = `function`
    }

    if (v === null) {
      obj[k] = 'null';
    }

    if (v === undefined) {
      obj[k] = 'undefined';
    }

  }
}

export const objectHTMLify = (obj) => {

}

export const object2tree = (obj) => {
  formatObject(obj);
}
