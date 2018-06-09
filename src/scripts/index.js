import WrapperDOM from '../templates/warpper';
import ConsoleItem from '../templates/console/item';
import ToggleBtn from '../templates/toggle-btn';
import { $, $$, append, object2tree, toggleShow, setScrollToBottom, parseLog } from '../utils/utils';

const body = document.body;

let canToggle = true;

export default class AnyConsole {
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
    }
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
    }

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
    }
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
    }
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

