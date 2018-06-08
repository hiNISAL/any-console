import WrapperDOM from '../templates/warpper';
import ConsoleItem from '../templates/console/item';
import { $, $$, append, object2tree, toggleShow, setScrollToBottom, parseLog } from '../utils/utils';

const body = document.body;

export default class AnyConsole {
  constructor() {
    this._init();
  }

  _init() {
    this.warpper = null;  // 整个dom

    this.consolePanel = null; // console面板
    this.consoleItemsContainer = null; // console面板输出容器

    this.logsClassify = {log: [], error: [], info: [], warn: []};

    this._createElemnt();

    this._initLog();
    this._initError();
    this._initInfo();
    this._initWarn();

    this._bind();
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
      let parsedLogs = parseLog(logs);

      let item = ConsoleItem(parsedLogs.join(' '), 'log');
      append(this.consolePanel, item);
      setScrollToBottom(this.consolePanel);
      this.logsClassify['log'].push(item);

      log.apply(console, logs);
    }
  }

  _initError() {
    const err = console.error;

    console.error = (...errs) => {
      let parsedLogs = parseLog(errs);

      let item = ConsoleItem(parsedLogs.join(' '), 'error');
      append(this.consolePanel, item);
      setScrollToBottom(this.consolePanel);
      this.logsClassify['error'].push(item);

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
      append(this.consolePanel, item);
      setScrollToBottom(this.consolePanel);
      this.logsClassify['info'].push(item);

      info.apply(console, infos);
    }
  }

  _initWarn() {
    const warn = console.warn;

    console.warn = (...warns) => {
      let parsedLogs = parseLog(warns);

      let item = ConsoleItem(parsedLogs.join(' '), 'warn');
      append(this.consolePanel, item);
      setScrollToBottom(this.consolePanel);
      this.logsClassify['warn'].push(item);

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
  }
}

