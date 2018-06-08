(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.AnyConsole = factory());
}(this, (function () { 'use strict';

  const $ = (selector, root = document) => {
    return root.querySelector(selector);
  };

  const append = (parent, ...els) => {
    for (let el of els.values()) {
      parent.appendChild(el);
    }
  };

  const ce = (ele) => {
    return document.createElement('ele');
  };

  function WrapperDOM() {
    let warpper = ce('div');

    warpper.innerHTML = `
    <div id="__any_console-wrapper">
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
          <li class="__any_console_tab_item">Network</li>
          <li class="__any_console_tab_item">Cookie</li>
          <li class="__any_console_tab_item">LocalStorage</li>
          <li class="__any_console_tab_item">SessionStorage</li>
        </ul>
      </div>

      <div class="__any_console-panels">
        <div class="__any_console-console-panel">
          <div class="__any_console-order">
            <input type="text">
            <button>确定</button>
          </div>
        <div class="__any_console-console-panel-log-items">
        
        </div>
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

  const body = document.body;

  class AnyConsole {
    constructor() {
      this._init();
    }

    _init() {
      this.warpper = null;  // 整个dom

      this.consolePanel = null; // console面板
      this.consoleItemsContainer = null; // console面板输出容器

      this._createElemnt();

      this._initLog();
      this._initError();
      this._initInfo();
    }

    _createElemnt() {
      this.warpper = WrapperDOM();
      
      this.consolePanel = $('.__any_console-console-panel-log-items', this.warpper);

      append(body, this.warpper);
    }

    _appendLog() {

    }

    _initLog() {
      const log = console.log;
      console.log = (...logs) => {

        for (let i of logs.values()) {
          append(this.consolePanel, ConsoleItem(i, 'log'));
        }

        log.apply(console, logs);
      };
    }

    _initError() {
      const err = console.error;

      console.error = (...errs) => {
        for (let i of errs.values()) {
          append(this.consolePanel, ConsoleItem(i, 'error'));
        }
        err.apply(console, errs);
      };

      /**
       * 拦截全局错误
       */
      window.addEventListener('error', (err, url, line) => {

      });

    }

    _initInfo() {
      const info = console.info;

      console.info = function(...infos) {
        document.body.appendChild(document.createElement('hr'));

        info.apply(console, infos);
      };
    }

    _initWarn() {
      const warn = console.warn;

      console.warn = function(...warns) {
        document.body.appendChild(document.createElement('hr'));
        
        warn.apply(console, warns);
      };
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

  var css = "@charset \"UTF-8\";\n.__any_console-console-icon, #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-log-items .__any_console-error::before, #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-log-items .__any_console-info::before, #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-log-items .__any_console-warn::before {\n  display: block;\n  height: 15px;\n  width: 15px;\n  line-height: 13px;\n  margin-top: 2px;\n  margin-right: 5px;\n  text-align: center; }\n\n#__any_console-wrapper {\n  position: fixed;\n  bottom: 0;\n  height: 70%;\n  width: 100%;\n  font-size: 10px;\n  background: #ffffff; }\n  #__any_console-wrapper input, #__any_console-wrapper button {\n    outline: 0 none; }\n  #__any_console-wrapper .__any_console-tab .__any_console-header {\n    width: 100%;\n    line-height: 25px;\n    padding: 10px;\n    font-size: 2em;\n    background: #2367c0;\n    color: #ffffff; }\n    #__any_console-wrapper .__any_console-tab .__any_console-header .__any_console-close-btn {\n      font-size: 1.5em;\n      line-height: 25px;\n      float: right;\n      cursor: pointer;\n      margin-right: 20px; }\n  #__any_console-wrapper .__any_console-tab .__any_console-tab-wrapper {\n    list-style-type: none;\n    white-space: nowrap;\n    overflow-x: scroll;\n    border-bottom: 1px solid #d1d1d1; }\n    #__any_console-wrapper .__any_console-tab .__any_console-tab-wrapper::-webkit-scrollbar {\n      display: none; }\n    #__any_console-wrapper .__any_console-tab .__any_console-tab-wrapper .__any_console_tab_item.active {\n      background: #2f78d8;\n      color: #ffffff; }\n    #__any_console-wrapper .__any_console-tab .__any_console-tab-wrapper .__any_console_tab_item {\n      display: inline-block;\n      font-size: 1.5em;\n      padding: 5px 10px;\n      cursor: pointer; }\n  #__any_console-wrapper .__any_console-panels {\n    position: relative;\n    height: 100%;\n    width: 100%; }\n    #__any_console-wrapper .__any_console-panels .__any_console-order {\n      position: absolute;\n      bottom: 0;\n      left: 0;\n      width: 100%;\n      height: 40px;\n      display: flex;\n      z-index: 10; }\n      #__any_console-wrapper .__any_console-panels .__any_console-order input {\n        flex: 1;\n        height: 40px;\n        border: 0 none;\n        border-top: 1px solid #2f78d8;\n        color: #000;\n        font-size: 1.6em;\n        padding: 0 5px;\n        box-sizing: border-box; }\n      #__any_console-wrapper .__any_console-panels .__any_console-order button {\n        width: 60px;\n        height: 40px;\n        background: #2f78d8;\n        color: #ffffff;\n        border-top: 1px solid #2f78d8; }\n    #__any_console-wrapper .__any_console-panels .__any_console-console-panel {\n      position: absolute;\n      width: 100%;\n      height: calc(100% - 31px - 45px); }\n      #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-log-items {\n        position: absolute;\n        height: 100%;\n        width: 100%;\n        overflow-y: scroll; }\n        #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-log-items .__any_console-console-panel-log-item {\n          display: flex;\n          word-break: break-all;\n          font-size: 1.3em;\n          border-bottom: 1px solid #d1d1d1;\n          padding: 10px 5px;\n          background: #ffffff; }\n          #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-log-items .__any_console-console-panel-log-item:last-child {\n            margin-bottom: 40px; }\n          #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-log-items .__any_console-console-panel-log-item .__any_console-console-panel-log-item-msg {\n            flex: 1; }\n          #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-log-items .__any_console-console-panel-log-item .__any_console-console-panel-log-item-time {\n            width: 60px;\n            text-align: right; }\n        #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-log-items .__any_console-error {\n          background: #fff1f1;\n          color: #d33a3a;\n          border-bottom: 1px solid #d33a3a; }\n          #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-log-items .__any_console-error::before {\n            content: '×';\n            color: #d33a3a; }\n        #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-log-items .__any_console-info {\n          background: #e4fbff;\n          color: #2f78d8;\n          border-bottom: 1px solid #2f78d8; }\n          #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-log-items .__any_console-info::before {\n            content: '!';\n            color: #2f78d8;\n            line-height: 15px; }\n        #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-log-items .__any_console-warn {\n          background: #fffde9;\n          color: #c5a90b;\n          border-bottom: 1px solid #c5a90b; }\n          #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-log-items .__any_console-warn::before {\n            content: '?';\n            color: #c5a90b;\n            line-height: 15px; }\n";
  styleInject(css);

  return AnyConsole;

})));
