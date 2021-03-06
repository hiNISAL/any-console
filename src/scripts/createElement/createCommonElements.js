import { $, $$ } from '../../utils/utils';
import WrapperDOM from '../../templates/warpper';
import ToggleBtn from '../../templates/toggle-btn';

export default function(AC) {
  AC.prototype._createCommonElement = function(curTab, toggleBtnStyle) {
    let [wrapper, curPanel, tabsBtn, curTabBtn, panels] = WrapperDOM(curTab);

    this.warpper = wrapper;
    this.curPanel = curPanel;
    this.tabsBtn = tabsBtn;
    this.curTabBtn = curTabBtn;
    this.panels = panels;
    
    this.consolePanel = $('.__any_console-console-panel-log-items', this.warpper);
    this.networkPanel = $('.__any_console-network-panel', this.warpper);

    this.toggleBtn = ToggleBtn();

    for (let [k, v] of Object.entries(toggleBtnStyle)) {
      this.toggleBtn.style[k] = v;
    }
  }
}
