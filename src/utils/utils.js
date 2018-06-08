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

export const cutString = (str, len = 10) => {
  str = str.toString();
  let res = str.split('').splice(0, len).join('');
  if (res.length === len && str.length !== len) res += '...';
  return res;
}

export const ce = (ele) => {
  return document.createElement(ele);
}

export const formatObject = (obj) => {
  for (let [k, v] of Object.entries(obj)) {
    if (typeof v === 'object') {
      formatObject(obj[k]);
    }

    if (typeof v === 'function') {
      obj[k] = cutString(obj[k], 30);
    }

    if (v === null) {
      obj[k] = 'null';
    }

    if (v === undefined) {
      obj[k] = 'undefined';
    }
  }
}

export const objectHTMLify = (obj, newObj) => {
  for (let [k, v] of Object.entries(obj)) {
    if (typeof v === 'object') {
      let key = `<span class="__any_console-console-obj-key">${ k }</span>`;
      newObj[key] = {};

      objectHTMLify(obj[k], newObj[key]);
      return;
    }

    newObj[`<span class="__any_console-console-obj-key">${ k }</span>`] = `<span class="__any_console-console-obj-value">${ v }</span>`;
  }
}

export const object2tree = (obj) => {
  formatObject(obj);

  let newObj = {};
  objectHTMLify(obj, newObj);

  let stringify = JSON.stringify(newObj, null, 2);

  stringify = stringify.replace(/\\"/g, '');

  stringify = `
    <div class="__any_console-console-obj-prev">
      <span class="__any_console-console-obj-prev-icon">▶</span> Object ${ cutString(JSON.stringify(obj), 15) }
    </div>
    <pre style="display: none;">${stringify}</pre>
  `
  return stringify;
}

export const toggleShow = (target, showType = 'block') => {
  if (target.style.display === 'none') {
    target.style.display = showType;
  } else {
    target.style.display = 'none';
  }
}

export const setScrollToBottom = target => {
  target.scrollTop = target.scrollHeight;
}

export const parseLog = logs => {
  let parsedLogs = [];
  for (let i of logs.values()) {
    if (typeof i === 'object') {
      i = object2tree(i);
    }
    parsedLogs.push(i);
  }
  return parsedLogs;
}
