(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.AnyConsole = factory());
}(this, (function () { 'use strict';

  class AnyConsole {
    constructor() {
      this._init();
    }

    _init() {
      this._consolePanel = null;

      this._initLog();
      this._initError();
      this._initInfo();
    }

    _createElemnt() {
      // console panel
      this._consolePanel = document.createElement('div');

    }

    _appendLog() {

    }

    _initLog() {
      const log = console.log;
      console.log = function(...logs) {
        document.body.appendChild(document.createElement('hr'));

        for (let i of logs.values()) {

        }

        log.apply(console, logs);
      };
    }

    _initError() {
      const err = console.error;

      console.error = function(...errs) {
        console.log(errs);

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

  var css = "#__any_console-wrapper {\n  position: fixed;\n  bottom: 0;\n  height: 70%;\n  width: 100%;\n  font-size: 10px;\n  background: #ffffff; }\n  #__any_console-wrapper .__any_console-header {\n    width: 100%;\n    line-height: 30px;\n    padding: 10px;\n    font-size: 2em;\n    background: #2367c0;\n    color: #ffffff; }\n    #__any_console-wrapper .__any_console-header .__any_console-close-btn {\n      font-size: 1.5em;\n      line-height: 30px;\n      float: right;\n      cursor: pointer;\n      margin-right: 20px; }\n  #__any_console-wrapper .__any_console-tab-wrapper {\n    list-style-type: none;\n    white-space: nowrap;\n    overflow-x: scroll;\n    border-bottom: 1px solid #d1d1d1; }\n    #__any_console-wrapper .__any_console-tab-wrapper::-webkit-scrollbar {\n      display: none; }\n    #__any_console-wrapper .__any_console-tab-wrapper .__any_console_tab_item.active {\n      background: #2f78d8;\n      color: #ffffff; }\n    #__any_console-wrapper .__any_console-tab-wrapper .__any_console_tab_item {\n      display: inline-block;\n      font-size: 1.5em;\n      padding: 5px 10px;\n      cursor: pointer; }\n";
  styleInject(css);

  return AnyConsole;

})));
