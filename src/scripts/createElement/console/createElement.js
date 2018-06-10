import { $, $$ } from '../../../utils/utils';

export default function(AC) {
  AC.prototype._createConsoleElement = function(curTab) {
    this.logsShowTypesBtnParent = $('.__any_console-console-panel-filter', this.warpper);
    this.logsShowTypesBtn = $$('li', this.logsShowTypesBtnParent);

    this.orderInput = $('.__any_console-order input', this.warpper);

    
  }
}
