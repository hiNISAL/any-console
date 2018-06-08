
export default class AnyConsole {
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
    }
  }

  _initError() {
    const err = console.error;

    console.error = function(...errs) {
      console.log(errs);

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
