(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.AnyConsole = factory());
}(this, (function () { 'use strict';

  function initial(AC) {
    AC.prototype._init = function(options) {
      this.warpper = null;  // 整个dom

      this.consolePanel = null; // console面板
      this.consoleItemsContainer = null; // console面板输出容器
    
      this.logsClassify = {log: [], error: [], info: [], warn: [], all: []};
    
      this._createElement();

      this._initLog();
      this._initError();
      this._initInfo();
      this._initWarn();

      this._bindConsoleEvents();
      
      this._show();
    
      this.show = false; // 标记显示状态
      this.curShowConsoleType = 'all';
    };
  }

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

  const close = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAOm0lEQVR4Xu2dW8hnVRnGn9fSMZOiqCwoLDJKogMFKckomAgONDMxkBrNEDRjF05EOdZF5Fh5UThWpN44VqaGJBmpYIN0sIbKLvRCBY2ERIMJFE9YWplvrJn1xX++vv/sd6299trr8Gz4rv7vOv3e9ezjWs8n4EECJLCUgJANCZDAcgIUCGcHCRyBAAXC6UECFAjnAAnEEeAVJI4bS3VCgALpJNEcZhwBCiSOG0t1QoAC6STRHGYcAQokjhtLdUKAAukk0RxmHAEKJI4bS3VCgALpJNEcZhwBCiSOG0t1QoAC6STRHGYcAQokjhtLdUKAAukk0RxmHAEKJI4bS3VCgALpJNEcZhwBCiSOG0t1QoAC6STRHGYcAQokjhtLdUKAAukk0RxmHAEKJI4bS3VCgALpJNEcZhwBCiSOG0t1QoAC6STRHGYcAQokjhtLdUKAAukk0RxmHAEKJI4bS3VCgALpJNEcZhwBCiSOG0t1QoAC6STRHGYcgaIEoqofALADwIkAHgVwnYjcHTc0liqRgKp+DMBGACcAeBDAHhE5UGJfXZ+KEYiqfgLAj9YA9QUR+XapANkvOwFV3Qtg+6oSTwPYICJ/sNeUL7IIgajquwE8cIRhXyQi38qHhS2lJqCqPwDwqSX1/g3AySLixFLUUYpAdgO4dIDMThG5uih67IyJgKpe42+djxS/SURuM1WYMagUgbhbK3eLNXRsF5HvDQXx93IIqOpVAC409KjIu4RSBHIZgC8bICqA80TkZkMsQ2YmoKqXA9hl7AavIMtAqerbAPwJwNEGmP8BsEVEbjXEMmQmAqpquW1e6d1jAE4SkX/N1N2lzRZxBXG9U1V3pnFnHOtR5BnH2vmW41T1Ivf6NmCM54jIvoD4bKHFCMSLJOSS7M427vXgL7PRYkODBFTVPW+45w7L4W6Zt4nIjZbgOWKKEogXyZUAdhphvADgbBHZb4xn2IQEVNV943DfOqzHDhG51ho8R1xxAvEisbwWXOH1DwBnisgf5wDINg8RUNVPArg+4ONzFa/tixSIB+5gbzVOwOcAnCEi9xrjGZaQgKp+HMBNAI4yVrtLRK4wxs4aVrJAXN8c9HONhJ4BsF5E7jfGMywBAVXdBOAWAC8zVrdbRL5mjJ09rFiB+KuIOyM5+JuNpJ4EcJqIPGSMZ9gIAqr6EQDu7dPLjdW4hYkXG2OLCCtaIF4k7szkliBsMBJ7HMCHReRhYzzDIgio6noAdwI41lj8KhH5rDG2mLDiBeJF4j4g3gHgLCM5t3zaieQRYzzDAgio6ikAfgXgOGOxvSJygTG2qLAqBOJFsg7AXQBONRJ0X2edSP5qjGeYgYDfs/MbAMcbwl3IDSKyzRhbXFg1AvEieSUAl5wPGkn+xYvELafmMZKAqr4HgPvm9GpjVT8GcL6IuA+CVR5VCcSL5FU+Se81Ev+zF8kTxniGrUFAVd8F4HcAXmsE9DO/Zu4lY3yRYdUJxIvkNT5ZJxupuq2dp4rIs8Z4hi0QUNWTAPwewOuNYNzz4kYRcQtLqz6qFIgXyet80t5hzMA9/mPi343xDDv0hfytnvObjEB+4dfI/dsYX3RYtQLxInmjT55bLm85nAGEW5byvCW49xhVfbPn+xYji9/6tXH/NMYXH1a1QLxIuk/iFLNMVXnyCVhYNkUOktXZ+21AMpC+IlUNvX29z78Iae72tforyMrk6PlBMqVAVDXmBYhb3vNUyn6UUlczAvG3W12+ikw1mVSVr9BXwWxKIF4k3X3MSiEQVeVH2DVANicQLxJnYdrNcoixAlHVV/i1VVzG0/oVZOGZpJsFdWMEoqpuIaj7dnG6sZ6uFoI2eQVZEEkXS7KNE/v/wlSVWwkG4DUtEH+75Tb1uKUPxxgnUnWbeozjOixMVbkZzQCueYF4kZwD4PaAbaGXiMjXDfyqDFFVbmc2Zq4LgXiRNGssYMz1/8JUlYYYRmjdCMSLpElrGmOuD4YZndZXquzeUqkrgfgJEmputrVk579AcdCULwRYK2uxAsfszqIh9phuw4/bFVe1o3yg0zptXf2k6u4KsvAKOMRguWpH+UCn9Rf9Zqefh554WozvViD+divEor/KiRPotF71iWAKgXYtEC+SZh3lA28l+c+J1lBY9wLxImnu4bVFp/UprhBDdVIgnlBLrz9bdVofmsxT/E6BLFBt4QNay07rUwhgqE4K5HCBVL0Eo3Wn9aHJPMXvFMgqqrUu4lNVt97MmXw367Q+hQCG6qRA1iBU2zJw77Tu9nRYVyxX6bQ+NJmn+J0CWUK1lo1EPTmtTyGAoTopkCMQKn0ram9O60OTeYrfKZABqqWaGfTotD6FAIbqpECGCB1aIl6UHU6vTuuGVCUPoUCMSCMN1ZI7ytMgz5iwRGEUSADICEvOpI7ytFgNSFaiUAokEORcps50Wg9MVKJwCiQCZO7JOpcoI9A0V4QCiUxprtuduW/rIvE0U4wCGZHKqR+YS3kxMAJR9UUpkJEpnOqVa2mvlkdiqrY4BZIgdak/2pX6cTIBquqqoEASpSzVso/Sl7ckwlVNNRRIwlSNXTioqusA3Emn9YRJGVkVBTIS4Orifum5m+THGqs+uPTcL7HfB+AsY7nH/f8FfNgYz7AIAhRIBLShIqrqHOXdZLduXroCwNsBbB6q2//+JAD3fwEfMsYzLJIABRIJbqhYxPbXoSpXfn8GwHoRud9agHHxBCiQeHaDJSMMFIbqfA7AGSJy71Agf09DgAJJw3FpLREWPMvq6t5pfeJUrVk9BZKBeoSJ2+pevQDgbBHZn6G7bGKBAAWSaToE2oAu9opO65lytFYzFEhG+IFG0q5nzkz6oyJCp/WMeVpsigLJCJ4CyQg7UVMUSCKQQ9XwFmuIUJm/UyAZ8sKH9AyQJ2qCApkI7Eq1fM07MeCJq6dAJgTMD4UTws1UNQUyEWguNZkIbOZqKZAJgEc4rXOx4gR5SFElBZKC4kIdfiXvHaFO67U5yifGVmx1FEjC1PgNU3cF7AXZKyIXLDzQHw3A/RuD043dOuD3hDxijGdYIAEKJBDYsnBuuU0EsrBqKJAECaFpQwKIhVZBgYxMTGG2P6eIyFMjh8TiCwQokBHToUDjuPv8bsNnRwyLRSmQ8XOA1qPjGdZQA68gEVmieXUEtEqLUCCBiZvLaT23KAOxNBtOgQSkdm6n9Vy3dQFImg+lQIwpjnBan+SBeeoXA0Yc3YRRIIZURzqtT/bKdapXywYU3YVQIAMpL9VpPfXHye5mvnHAFMgRQJXutJ5qeYtxrnQZRoEsSXstTutjHeW7nPUBg6ZA1oClqm5VrVuyXoXTuneUd6uAjzHm/qCjvDG26zAKZFX6VfUoALcD2GCcGUU4rUds0tojIhcbx9htGAWykHpVdTxuAnCucUYU5bQesc33KyJymXGsXYZRIIcL5HoAW40zoUin9QijiJ0icrVxzN2FUSA+5ap6DYAdxhlQtNN6hNXQDhG51jj2rsIoEACqeiWAncbMV+G0HmhWpwC2iciNRgbdhHUvEFW9HMAuY8arcloPtDt9CcD5InKzkUUXYV0LRFW/CuASY6ZfBLCxNqf1QMNs5ya/RURuNTJpPqxbgfQ0cVT1UgC7jbO5yhOBcWzBYV0KpMdbj5ZvJYNnfUCB7gTS88Nriy8jAuZ6VGhXAuHrz4Nv7Jp5nR014wMLdSOQiA9ou0TEeeY2d6hq9R9EcyWlC4FwCcbh06n2JTW5xOHaaV4gXMS39nTyizJvAbDZOOGKWJRp7GuysKYFEuu0noxu4RV5R/l9tSzrnwNnswLxeyTujHVanyMZc7RZy8awOdg0e4vlt6LuB3CcEewNIrLNGNtcWOlbi+cE3twVhGYGcdMp0pziQyLyRFyLdZRqSiC0wxk36SLsjR4EcFrLjvLNCISGauPEsVK6FIO8NKMZX0sTAqEl5/iJsFjD3BaraUczrrbqBUJT53ETYFnpuUy6pxlNfK1VC4RJjE+8pSRPPhV/SedtgGWKj4/p/fa1yisIHyTHT/yQGnp+AVKdQPgqMmRqp4vt9RV6VQLhx6x0Ez6mph4/wlYjEC6HiJnS6cv05ihfhUC4oC79RB9TY0+O8sULpDan9TETr6ayvTjKFy0Qv1/httqc1mua6GP62sNmtGIF4reF/jRgx1tRTutjJl5NZVvfzlyyQGgsUIlSIgwxqnGUL1IgtKapRBkL3WzVUqk4gdDcrD5xrPS4RVO+ogRCe8x6xbEgkgsBXGUcSfGO8sUIJNBM2vF3TuvufwnyKIyAqn4JwDcCurWhVNf8IgTil1U/DGCdASot+g2Q5g4JdJR/DMA7ReT5ufu9uv1SBOL+R4f7Xx1DR/GX5KEB9PR74C3zJhFx37yKOkoRyA/dvwAzkPm0iHzfEMeQQgioqnsecc8lQ8fnROS7Q0G5fy9FIF8E8M2BwfMfTeaeHYnaM762P1NEfp2oyWTVlCKQEwC4Z5Djl4ysmg9LyTLTWEUDjvIPAHifiLhb6KKOIgTiiKjqFgA/WYPO50XkO0VRY2eiCKjqXgDbVxV+2nkDi8g9UZVOXKgYgXiRvB/AZwCcCOBRANeJyN0TM2D1GQmoqnOTd39vAOCM5/aIyIGMXQhqqiiBBPWcwSSQgQAFkgEym6iXAAVSb+7Y8wwEKJAMkNlEvQQokHpzx55nIECBZIDMJuolQIHUmzv2PAMBCiQDZDZRLwEKpN7csecZCFAgGSCziXoJUCD15o49z0CAAskAmU3US4ACqTd37HkGAhRIBshsol4CFEi9uWPPMxCgQDJAZhP1EqBA6s0de56BAAWSATKbqJcABVJv7tjzDAQokAyQ2US9BCiQenPHnmcgQIFkgMwm6iVAgdSbO/Y8AwEKJANkNlEvAQqk3tyx5xkIUCAZILOJeglQIPXmjj3PQIACyQCZTdRLgAKpN3fseQYCFEgGyGyiXgIUSL25Y88zEKBAMkBmE/USoEDqzR17noHAfwF20LIU9od8+gAAAABJRU5ErkJggg==';

  const toggle = 'data:image/png;base64,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';

  function ToggleBtn() {
    let div = ce('div');
    div.className = '__any_console-toggle-btn';
    div.innerHTML = `<img src="${ toggle }">`;
    return div;
  }

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
          <img src="${ close }">
        </span>
        
        
      </header>
      <ul class="__any_console-tab-wrapper">
        <li class="__any_console_tab_item active">Console</li>
        <li class="__any_console_tab_item">Network</li>
        <li class="__any_console_tab_item">Cookie</li>
        <li class="__any_console_tab_item">LocalStorage</li>
        <li class="__any_console_tab_item">SessionStorage</li>
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

      <div class="__any_console-order">
        <input type="text">
        <button class="__any_console-send-order">确定</button>
        <button class="__any_console-clear-console">清空</button>
      </div>
      <div class="__any_console-console-panel-log-items">
      
      </div>
      </div>
    </div>
  `;

    return warpper;
  }

  function createElement(AC) {
    AC.prototype._createElement = function() {
      this.warpper = WrapperDOM();
      
      this.consolePanel = $('.__any_console-console-panel-log-items', this.warpper);

      this.toggleBtn = ToggleBtn();

      this.logsShowTypesBtnParent = $('.__any_console-console-panel-filter', this.warpper);
      this.logsShowTypesBtn = $$('li', this.logsShowTypesBtnParent);
    };
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

  function initLog(AC) {
    AC.prototype._initLog = function() {
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
    };
  }

  function initError(AC) {
    AC.prototype._initError = function() {
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
    };
  }

  function initWarn(AC) {
    AC.prototype._initWarn = function() {
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
    };
  }

  function initInfo(AC) {
    AC.prototype._initInfo = function() {
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
    };
  }

  let canToggle = true;

  function bindConsoleEvents (AC) {
    AC.prototype._bindConsoleEvents = function () {
      this.consolePanel.addEventListener('click', ({
        target
      }) => {
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
    };
  }

  function show(AC) {
    AC.prototype._show = function() {
      append(document.body, this.warpper, this.toggleBtn);
    };
  }

  /**
   * 构造函数
   * @param {*} options 
   */
  function AnyConsole(options) {
    this._init(options);
  }

  initial(AnyConsole);
  createElement(AnyConsole);

  // Console相关初始化
  initLog(AnyConsole);
  initError(AnyConsole);
  initWarn(AnyConsole);
  initInfo(AnyConsole);

  // 绑定事件
  bindConsoleEvents(AnyConsole);

  // 显示
  show(AnyConsole);

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

  var css = "@charset \"UTF-8\";\n.__any_console-toggle-btn {\n  position: fixed;\n  background: #2f78d8;\n  text-align: center;\n  color: #ffffff;\n  border-radius: 50%;\n  font-size: 20px;\n  width: 50px;\n  height: 50px;\n  top: 20px;\n  right: 20px;\n  z-index: 1000;\n  cursor: pointer; }\n  .__any_console-toggle-btn:active {\n    background: #2367c0; }\n  .__any_console-toggle-btn img {\n    margin-top: 8px;\n    width: 30px;\n    height: 30px; }\n\n.__any_console-console-icon, #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-log-items .__any_console-error::before, #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-log-items .__any_console-info::before, #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-log-items .__any_console-warn::before, #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-log-items .__any_console-order::before, #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-log-items .__any_console-order-res::before {\n  display: block;\n  height: 15px;\n  width: 15px;\n  line-height: 13px;\n  margin-top: 2px;\n  margin-right: 5px;\n  text-align: center; }\n\n#__any_console-wrapper {\n  position: fixed;\n  bottom: -100%;\n  left: 0;\n  height: 80%;\n  width: 100%;\n  font-size: 10px;\n  background: #ffffff;\n  transition: all .3s; }\n  #__any_console-wrapper * {\n    padding: 0;\n    margin: 0; }\n  #__any_console-wrapper input, #__any_console-wrapper button {\n    outline: 0 none; }\n  #__any_console-wrapper .__any_console-tab .__any_console-header {\n    width: 100%;\n    line-height: 25px;\n    padding: 10px;\n    font-size: 2em;\n    background: #2367c0;\n    color: #ffffff; }\n    #__any_console-wrapper .__any_console-tab .__any_console-header .__any_console-close-btn {\n      float: right;\n      cursor: pointer;\n      margin-right: 20px; }\n      #__any_console-wrapper .__any_console-tab .__any_console-header .__any_console-close-btn img {\n        width: 25px;\n        height: 25px; }\n  #__any_console-wrapper .__any_console-tab .__any_console-tab-wrapper {\n    list-style-type: none;\n    white-space: nowrap;\n    overflow-x: scroll;\n    border-bottom: 1px solid #d1d1d1; }\n    #__any_console-wrapper .__any_console-tab .__any_console-tab-wrapper::-webkit-scrollbar {\n      display: none; }\n    #__any_console-wrapper .__any_console-tab .__any_console-tab-wrapper .__any_console_tab_item.active {\n      background: #2f78d8;\n      color: #ffffff; }\n    #__any_console-wrapper .__any_console-tab .__any_console-tab-wrapper .__any_console_tab_item {\n      display: inline-block;\n      font-size: 1.5em;\n      padding: 5px 10px;\n      cursor: pointer; }\n  #__any_console-wrapper .__any_console-panels {\n    position: relative;\n    height: 100%;\n    width: 100%; }\n    #__any_console-wrapper .__any_console-panels .__any_console-order {\n      position: absolute;\n      bottom: -25px;\n      left: 0;\n      width: 100%;\n      height: 40px;\n      display: flex;\n      z-index: 10; }\n      #__any_console-wrapper .__any_console-panels .__any_console-order input {\n        flex: 1;\n        height: 40px;\n        border: 0 none;\n        border-top: 1px solid #2f78d8;\n        color: #000;\n        font-size: 1.6em;\n        padding: 0 5px;\n        box-sizing: border-box; }\n      #__any_console-wrapper .__any_console-panels .__any_console-order button {\n        width: 60px;\n        height: 40px;\n        background: #2f78d8;\n        color: #ffffff;\n        border: 0 none;\n        border-top: 1px solid #2f78d8; }\n        #__any_console-wrapper .__any_console-panels .__any_console-order button:active {\n          background: #2367c0; }\n    #__any_console-wrapper .__any_console-panels .__any_console-console-panel {\n      position: absolute;\n      width: 100%;\n      height: calc(100% - 31px - 45px - 25px); }\n      #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-filter {\n        height: 25px;\n        border-bottom: 1px solid #d1d1d1;\n        white-space: nowrap; }\n        #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-filter .active {\n          background: #f0f0f0; }\n        #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-filter li {\n          display: inline-block;\n          line-height: 25px;\n          padding: 0 10px;\n          cursor: pointer; }\n      #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-log-items {\n        position: absolute;\n        height: 100%;\n        width: 100%;\n        overflow-y: scroll; }\n        #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-log-items::-webkit-scrollbar {\n          display: none; }\n        #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-log-items .__any_console-console-panel-log-item {\n          display: flex;\n          word-break: break-all;\n          font-size: 1.3em;\n          border-bottom: 1px solid #d1d1d1;\n          padding: 10px 5px;\n          background: #ffffff; }\n          #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-log-items .__any_console-console-panel-log-item .__any_console-console-obj-prev {\n            font-weight: 700;\n            cursor: pointer;\n            user-select: none; }\n          #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-log-items .__any_console-console-panel-log-item .__any_console-console-obj-key {\n            color: #92278f;\n            font-weight: 900; }\n          #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-log-items .__any_console-console-panel-log-item .__any_console-console-obj-value {\n            color: #3ab54a;\n            font-weight: 900; }\n          #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-log-items .__any_console-console-panel-log-item:last-child {\n            margin-bottom: 40px; }\n          #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-log-items .__any_console-console-panel-log-item .__any_console-console-panel-log-item-msg {\n            flex: 1; }\n          #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-log-items .__any_console-console-panel-log-item .__any_console-console-panel-log-item-time {\n            width: 60px;\n            text-align: right; }\n        #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-log-items .__any_console-error {\n          background: #fff1f1;\n          color: #d33a3a;\n          border-bottom: 1px solid #d33a3a; }\n          #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-log-items .__any_console-error::before {\n            content: '×';\n            color: #d33a3a; }\n        #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-log-items .__any_console-info {\n          background: #e4fbff;\n          color: #2f78d8;\n          border-bottom: 1px solid #2f78d8; }\n          #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-log-items .__any_console-info::before {\n            content: '!';\n            color: #2f78d8;\n            line-height: 15px; }\n        #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-log-items .__any_console-warn {\n          background: #fffde9;\n          color: #c5a90b;\n          border-bottom: 1px solid #c5a90b; }\n          #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-log-items .__any_console-warn::before {\n            content: '?';\n            color: #c5a90b;\n            line-height: 15px; }\n        #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-log-items .__any_console-order::before {\n          content: '>';\n          line-height: 15px; }\n        #__any_console-wrapper .__any_console-panels .__any_console-console-panel .__any_console-console-panel-log-items .__any_console-order-res::before {\n          content: '<';\n          line-height: 15px; }\n";
  styleInject(css);

  return AnyConsole;

})));
