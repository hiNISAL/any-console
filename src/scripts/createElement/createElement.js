import { $, $$ } from '../../utils/utils';
import ToggleBtn from '../../templates/toggle-btn';
import WrapperDOM from '../../templates/warpper';

export default function(AC) {
  AC.prototype._createElement = function() {
    this.warpper = WrapperDOM();
    
    this.consolePanel = $('.__any_console-console-panel-log-items', this.warpper);

    this.toggleBtn = ToggleBtn();

    this.logsShowTypesBtnParent = $('.__any_console-console-panel-filter', this.warpper);
    this.logsShowTypesBtn = $$('li', this.logsShowTypesBtnParent);

    this.orderInput = $('.__any_console-order input', this.warpper);
  }
}
