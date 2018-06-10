import { setScrollToBottom, parseLog, append } from '../../../utils/utils';
import ConsoleItem from '../../../templates/console/item';

export default function(AC) {
  AC.prototype._initLog = function() {
    const log = console.log;
    console.log = (...logs) => {
      let parsedLogs = parseLog(logs);
  
      let item = ConsoleItem(parsedLogs.join(' '), 'log');
      if (this.curShowConsoleType === 'all' || this.curShowConsoleType === 'log') {
        append(this.consolePanel, item);
      }
      setScrollToBottom(this.consolePanel);
      this.logsClassify['log'].push(item);
      this.logsClassify['all'].push(item);
  
      log.apply(console, logs);
    }
  }
};
