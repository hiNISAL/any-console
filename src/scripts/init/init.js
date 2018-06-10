export default function(AC) {
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
  }
}
