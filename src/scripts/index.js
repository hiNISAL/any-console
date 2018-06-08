import WrapperDOM from '../templates/warpper';
import ConsoleItem from '../templates/console/item';
import { $, $$, append } from '../utils/utils';

const body = document.body;

export default class AnyConsole {
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
    }
  }

  _initError() {
    const err = console.error;

    console.error = (...errs) => {
      for (let i of errs.values()) {
        append(this.consolePanel, ConsoleItem(i, 'error'));
      }
      err.apply(console, errs);
    }

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
    }
  }

  _initWarn() {
    const warn = console.warn;

    console.warn = function(...warns) {
      document.body.appendChild(document.createElement('hr'));
      
      warn.apply(console, warns);
    }
  }
}

