import { setScrollToBottom, parseLog, append } from '../../../utils/utils';
import ConsoleItem from '../../../templates/console/item';

export default function(AC) {
  AC.prototype._initError = function() {
    const err = console.error;

    console.error = (...errs) => {
      let parsedLogs = parseLog(errs);

      let item = ConsoleItem(parsedLogs.join(' '), 'error');
      if (this.curShowConsoleType === 'all' || this.curShowConsoleType === 'error') {
        append(this.consolePanel, item);
      }
      setScrollToBottom(this.consolePanel);
      this.logsClassify['error'].push(item);
      this.logsClassify['all'].push(item);

      err.apply(console, errs);
    }

    /**
     * 拦截全局错误
     */
    window.addEventListener('error', ({ message, type, timeStamp, lineno, isTrusted }) => {

      console.error({
        message, type, isTrusted, lineno, timeStamp
      });
    });
  }
};
