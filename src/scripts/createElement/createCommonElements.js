import { $, $$ } from '../../utils/utils';
import WrapperDOM from '../../templates/warpper';
import ToggleBtn from '../../templates/toggle-btn';

export default function(AC) {
  AC.prototype._createCommonElement = function(curTab) {
    let [wrapper, curPanel, tabsBtn, curTabBtn, panels] = WrapperDOM(curTab);

    this.warpper = wrapper;
    this.curPanel = curPanel;
    this.tabsBtn = tabsBtn;
    this.curTabBtn = curTabBtn;
    this.panels = panels;
    
    this.consolePanel = $('.__any_console-console-panel-log-items', this.warpper);
    this.toggleBtn = ToggleBtn();
  }
}
