import { setScrollToBottom, parseLog, append } from '../../../utils/utils';
import ConsoleItem from '../../../templates/console/item';

export default function(AC) {
  AC.prototype._initInfo = function() {
    const info = console.info;

    console.info = (...infos) => {
      let parsedLogs = parseLog(infos);

      let item = ConsoleItem(parsedLogs.join(' '), 'info');
      if (this.curShowConsoleType === 'all' || this.curShowConsoleType === 'info') {
        append(this.consolePanel, item);
      }
      setScrollToBottom(this.consolePanel);
      this.logsClassify['info'].push(item);
      this.logsClassify['all'].push(item);

      info.apply(console, infos);
    }
  }
};
