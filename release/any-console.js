(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.AnyConsole = factory());
}(this, (function () { 'use strict';

  const $ = (selector, root = document) => {
    return root.querySelector(selector);
  };

  const $$ = (selector, root = document) => {
    return [...root.querySelectorAll(selector)];
  };

  const append = (parent, ...els) => {
    for (let el of els.values()) {
      parent.appendChild(el);
    }
  };

  const cutString = (str, len = 10) => {
    str = str.toString();
    let res = str.split('').splice(0, len).join('');
    if (res.length === len && str.length !== len) res += '...';
    return res;
  };

  const ce = (ele) => {
    return document.createElement(ele);
  };

  const formatObject = (obj) => {
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
  };

  const objectHTMLify = (obj, newObj) => {
    for (let [k, v] of Object.entries(obj)) {
      if (typeof v === 'object') {
        let key = `<span class="__any_console-console-obj-key">${ k }</span>`;
        newObj[key] = {};

        objectHTMLify(obj[k], newObj[key]);
        return;
      }

      newObj[`<span class="__any_console-console-obj-key">${ k }</span>`] = `<span class="__any_console-console-obj-value">${ v }</span>`;
    }
  };

  const object2tree = (obj) => {
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
  `;
    return stringify;
  };

  const toggleShow = (target, showType = 'block') => {
    if (target.style.display === 'none') {
      target.style.display = showType;
    } else {
      target.style.display = 'none';
    }
  };

  const setScrollToBottom = target => {
    target.scrollTop = target.scrollHeight;
  };

  const parseLog = logs => {
    let parsedLogs = [];
    for (let i of logs.values()) {
      if (typeof i === 'object') {
        i = object2tree(i);
      }
      parsedLogs.push(i);
    }
    return parsedLogs;
  };

  function WrapperDOM() {
    let warpper = ce('div');
    warpper.id = '__any_console-wrapper';
    warpper.innerHTML = `
    <div class="__any_console-tab">
      <header class="__any_console-header">
        <span class="__any_console-header-title">
          Any Console
        </span>
        <span class="__any_console-close-btn">
          ×
        </span>
        
      </header>
      <ul class="__any_console-tab-wrapper">
        <li class="__any_console_tab_item active">Console</l>
      </ul>
    </div>

    <div class="__any_console-panels">
      <div class="__any_console-console-panel">
        <ul class="__any_console-console-panel-filter">
          <li class="active">All</li>
          <li>Log</li>
          <li>Info</li>
          <li>Warn</li>
          <li>Error</li>
        </ul>
      <div class="__any_console-console-panel-log-items">
      
      </div>
      </div>
    </div>
  `;

    return warpper;
  }

  // <div class="__any_console-console-panel-log-item">
  //  <div class="__any_console-console-panel-log-item-msg">没有任何问题没有任何问题</div>
  //  <div class="__any_console-console-panel-log-item-time">17:22</div>
  // </div>

  const TYPES = {
    log: '',
    error: ' __any_console-error',
    info: ' __any_console-info',
    warn: ' __any_console-warn'
  };

  function ConsoleItem(msg = '', type = 'log') {
    let item = ce('div');

    let date = new Date();

    item.className = `__any_console-console-panel-log-item${ TYPES[type] }`;
    item.innerHTML = `
    <div class="__any_console-console-panel-log-item-msg">${ msg }</div>
    <div class="__any_console-console-panel-log-item-time">${ date.getMinutes() + ':' + date.getSeconds() }</div>
  `;

    return item;
  }

  function ToggleBtn() {
    let div = ce('div');
    div.className = '__any_console-toggle-btn';
    div.innerHTML = '<span>↹</span>';
    return div;
  }

  const body = document.body;

  let canToggle = true;

  class AnyConsole {
    constructor() {
      this._init();
    }

    _init() {
      this.warpper = null;  // 整个dom

      this.consolePanel = null; // console面板
      this.consoleItemsContainer = null; // console面板输出容器

      this.logsClassify = {log: [], error: [], info: [], warn: [], all: []};

      this._createElemnt();

      this.show = false; // 标记显示状态
      this.curShowConsoleType = 'all';

      this._initLog();
      this._initError();
      this._initInfo();
      this._initWarn();

      this._bind();
      this._show();
    }

    _createElemnt() {
      this.warpper = WrapperDOM();
      
      this.consolePanel = $('.__any_console-console-panel-log-items', this.warpper);

      this.toggleBtn = ToggleBtn();

      this.logsShowTypesBtnParent = $('.__any_console-console-panel-filter', this.warpper);
      this.logsShowTypesBtn = $$('li', this.logsShowTypesBtnParent);

    }

    _appendLog() {

    }

    _initLog() {
      const log = console.log;
      console.log = (...logs) => {
        let parsedLogs = parseLog(logs);

        let item = ConsoleItem(parsedLogs.join(' '), 'log');
        if (this.curShowConsoleType === 'all' || this.curShowConsoleType === 'log') {
          append(this.consolePanel, item);
        }
        setScrollToBottom(this.consolePanel);
        this.logsClassify['log'].push(item);
        this.logsClassify['all'].push(item);

        log.apply(console, logs);
      };
    }

    _initError() {
      const err = console.error;

      console.error = (...errs) => {
        let parsedLogs = parseLog(errs);

        let item = ConsoleItem(parsedLogs.join(' '), 'error');
        if (this.curShowConsoleType === 'all' || this.curShowConsoleType === 'error') {
          append(this.consolePanel, item);
        }
        setScrollToBottom(this.consolePanel);
        this.logsClassify['error'].push(item);
        this.logsClassify['all'].push(item);

        err.apply(console, errs);
      };

      /**
       * 拦截全局错误
       */
      window.addEventListener('error', ({ message, type, timeStamp, lineno, isTrusted }) => {

        console.error({
          message, type, isTrusted, lineno, timeStamp
        });
      });

    }

    _initInfo() {
      const info = console.info;

      console.info = (...infos) => {
        let parsedLogs = parseLog(infos);

        let item = ConsoleItem(parsedLogs.join(' '), 'info');
        if (this.curShowConsoleType === 'all' || this.curShowConsoleType === 'info') {
          append(this.consolePanel, item);
        }
        setScrollToBottom(this.consolePanel);
        this.logsClassify['info'].push(item);
        this.logsClassify['all'].push(item);

        info.apply(console, infos);
      };
    }

    _initWarn() {
      const warn = console.warn;

      console.warn = (...warns) => {
        let parsedLogs = parseLog(warns);

        let item = ConsoleItem(parsedLogs.join(' '), 'warn');
        if (this.curShowConsoleType === 'all' || this.curShowConsoleType === 'warn') {
          append(this.consolePanel, item);
        }
        setScrollToBottom(this.consolePanel);
        this.logsClassify['warn'].push(item);
        this.logsClassify['all'].push(item);

        warn.apply(console, warns);
      };
    }

    _bind() {
      this.consolePanel.addEventListener('click', ({ target }) => {
        if (target.className === '__any_console-console-obj-prev-icon') {
          target = target.parentNode;
        }

        if (target.className === '__any_console-console-obj-prev') {
          let span = $('span', target);
          span.innerText = span.innerText === '▶' ? '▼' : '▶';
          toggleShow($('pre', target.parentNode));
        }
      });
      
      this.toggleBtn.addEventListener('click', () => {
        if (!canToggle) return;

        this.warpper.style.bottom = this.show ? '-100%' : 0;
        this.show = !this.show;
        canToggle = false;

        setTimeout(() => {
          canToggle = true;
        }, 300);
      });

      $('.__any_console-close-btn', this.warpper).addEventListener('click', () => {
        this.toggleBtn.click();
      });

      this.logsShowTypesBtnParent.addEventListener('click', e => {
        if (e.target.nodeName !== 'LI') return;
        this.logsShowTypesBtn.forEach(el => void(el.className = ''));
        e.target.className = 'active';

        this.consolePanel.innerHTML = '';

        let type = e.target.innerText.toLowerCase();
        append(this.consolePanel, ...this.logsClassify[type]);
        this.curShowConsoleType = type;
      });
    }

    _show() {
      append(body, this.warpper, this.toggleBtn);
    }
  }

  function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css = "@charset \"UTF-8\";\n.__any_console-toggle-btn {\n  position: fixed;\n  line-height: 50px;\n  background: #2f78d8;\n  text-align: center;\n  color: #ffffff;\n  border-radius: 50%;\n  font-size: 20px;\n  width: 50px;\n  top: 20px;\n  right: 20px;\n  z-index: 1000;\n  cursor: pointer; }\n\n.__any_console-console-icon, #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-log-items .__any_console-error::before, #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-log-items .__any_console-info::before, #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-log-items .__any_console-warn::before {\n  display: block;\n  height: 15px;\n  width: 15px;\n  line-height: 13px;\n  margin-top: 2px;\n  margin-right: 5px;\n  text-align: center; }\n\n#__any_console-wrapper {\n  position: fixed;\n  bottom: -100%;\n  height: 80%;\n  width: 100%;\n  font-size: 10px;\n  background: #ffffff;\n  transition: all .3s; }\n  #__any_console-wrapper input, #__any_console-wrapper button {\n    outline: 0 none; }\n  #__any_console-wrapper .__any_console-tab .__any_console-header {\n    width: 100%;\n    line-height: 25px;\n    padding: 10px;\n    font-size: 2em;\n    background: #2367c0;\n    color: #ffffff; }\n    #__any_console-wrapper .__any_console-tab .__any_console-header .__any_console-close-btn {\n      font-size: 1.5em;\n      line-height: 25px;\n      float: right;\n      cursor: pointer;\n      margin-right: 20px; }\n  #__any_console-wrapper .__any_console-tab .__any_console-tab-wrapper {\n    list-style-type: none;\n    white-space: nowrap;\n    overflow-x: scroll;\n    border-bottom: 1px solid #d1d1d1; }\n    #__any_console-wrapper .__any_console-tab .__any_console-tab-wrapper::-webkit-scrollbar {\n      display: none; }\n    #__any_console-wrapper .__any_console-tab .__any_console-tab-wrapper .__any_console_tab_item.active {\n      background: #2f78d8;\n      color: #ffffff; }\n    #__any_console-wrapper .__any_console-tab .__any_console-tab-wrapper .__any_console_tab_item {\n      display: inline-block;\n      font-size: 1.5em;\n      padding: 5px 10px;\n      cursor: pointer; }\n  #__any_console-wrapper .__any_console-panels {\n    position: relative;\n    height: 100%;\n    width: 100%; }\n    #__any_console-wrapper .__any_console-panels .__any_console-order {\n      position: absolute;\n      bottom: -25px;\n      left: 0;\n      width: 100%;\n      height: 40px;\n      display: flex;\n      z-index: 10; }\n      #__any_console-wrapper .__any_console-panels .__any_console-order input {\n        flex: 1;\n        height: 40px;\n        border: 0 none;\n        border-top: 1px solid #2f78d8;\n        color: #000;\n        font-size: 1.6em;\n        padding: 0 5px;\n        box-sizing: border-box; }\n      #__any_console-wrapper .__any_console-panels .__any_console-order button {\n        width: 60px;\n        height: 40px;\n        background: #2f78d8;\n        color: #ffffff;\n        border-top: 1px solid #2f78d8; }\n    #__any_console-wrapper .__any_console-panels .__any_console-console-panel {\n      position: absolute;\n      width: 100%;\n      height: calc(100% - 31px - 45px - 25px); }\n      #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-filter {\n        height: 25px;\n        border-bottom: 1px solid #d1d1d1;\n        white-space: nowrap; }\n        #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-filter .active {\n          background: #f0f0f0; }\n        #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-filter li {\n          display: inline-block;\n          line-height: 25px;\n          padding: 0 10px;\n          cursor: pointer; }\n      #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-log-items {\n        position: absolute;\n        height: 100%;\n        width: 100%;\n        overflow-y: scroll; }\n        #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-log-items::-webkit-scrollbar {\n          display: none; }\n        #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-log-items .__any_console-console-panel-log-item {\n          display: flex;\n          word-break: break-all;\n          font-size: 1.3em;\n          border-bottom: 1px solid #d1d1d1;\n          padding: 10px 5px;\n          background: #ffffff; }\n          #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-log-items .__any_console-console-panel-log-item .__any_console-console-obj-prev {\n            font-weight: 700;\n            cursor: pointer;\n            user-select: none; }\n          #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-log-items .__any_console-console-panel-log-item .__any_console-console-obj-key {\n            color: #92278f;\n            font-weight: 900; }\n          #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-log-items .__any_console-console-panel-log-item .__any_console-console-obj-value {\n            color: #3ab54a;\n            font-weight: 900; }\n          #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-log-items .__any_console-console-panel-log-item:last-child {\n            margin-bottom: 40px; }\n          #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-log-items .__any_console-console-panel-log-item .__any_console-console-panel-log-item-msg {\n            flex: 1; }\n          #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-log-items .__any_console-console-panel-log-item .__any_console-console-panel-log-item-time {\n            width: 60px;\n            text-align: right; }\n        #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-log-items .__any_console-error {\n          background: #fff1f1;\n          color: #d33a3a;\n          border-bottom: 1px solid #d33a3a; }\n          #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-log-items .__any_console-error::before {\n            content: '×';\n            color: #d33a3a; }\n        #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-log-items .__any_console-info {\n          background: #e4fbff;\n          color: #2f78d8;\n          border-bottom: 1px solid #2f78d8; }\n          #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-log-items .__any_console-info::before {\n            content: '!';\n            color: #2f78d8;\n            line-height: 15px; }\n        #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-log-items .__any_console-warn {\n          background: #fffde9;\n          color: #c5a90b;\n          border-bottom: 1px solid #c5a90b; }\n          #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-log-items .__any_console-warn::before {\n            content: '?';\n            color: #c5a90b;\n            line-height: 15px; }\n";
  styleInject(css);

  return AnyConsole;

})));
