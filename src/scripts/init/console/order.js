import ConsoleItem from '../../../templates/console/item';
import { append, setScrollToBottom } from '../../../utils/utils';

export default function(AC) {
  AC.prototype._doOrder = function(order) {
    append(this.consolePanel, ConsoleItem(order, 'orderdo'));
    let res;
    try {
      res = eval.call(window, order);
      append(this.consolePanel, ConsoleItem(res, 'orderres'))
    } catch(e) {
      console.error(e.message);
    }

    setScrollToBottom(this.consolePanel);
  }
}