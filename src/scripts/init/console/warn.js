import { setScrollToBottom, parseLog, append } from '../../../utils/utils';
import ConsoleItem from '../../../templates/console/item';

export default function(AC) {
  AC.prototype._initWarn = function() {
    const warn = console.warn;

    console.warn = (...warns) => {
      let parsedLogs = parseLog(warns);

      let item = ConsoleItem(parsedLogs.join(' '), 'warn');
      if (this.curShowConsoleType === 'all' || this.curShowConsoleType === 'warn') {
        append(this.consolePanel, item);
      }
      setScrollToBottom(this.consolePanel);
      this.logsClassify['warn'].push(item);
      this.logsClassify['all'].push(item);

      warn.apply(console, warns);
    }
  }
};
