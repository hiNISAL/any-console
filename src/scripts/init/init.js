export default function(AC) {
  AC.prototype._init = function({ defaultPanel = 'console' }) {
    this.warpper = null;  // 整个dom

    this.consolePanel = null; // console面板
    this.consoleItemsContainer = null; // console面板输出容器
    this.orderInput = null; // 控制台命令的输入框
    this.curPanel = null; // 当前显示的面板
    this.tabsBtn = null; // 面板切换按钮
    this.curTabBtn = null; // 当前选中面板对应的按钮
    this.panels = null; // 所有面板
  
    this.logsClassify = {log: [], error: [], info: [], warn: [], all: []};

    this.curTab = defaultPanel;
  
    this._createCommonElement(this.curTab);
    this._createConsoleElement();

    // 初始化console面板相关方法
    this._initLog();
    this._initError();
    this._initInfo();
    this._initWarn();

    // 初始化network面板相关方法
    this._listenAJAX();

    this._bindCommonEvents();
    this._bindConsoleEvents();
    
    this._show();
  
    this.show = false; // 标记显示状态
    this.curShowConsoleType = 'all';

    // this.toggleBtn.click();
  }
}
