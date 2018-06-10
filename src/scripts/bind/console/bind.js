import { $, $$, append, toggleShow } from '../../../utils/utils';

export default function (AC) {
  AC.prototype._bindConsoleEvents = function () {
    /**
     * 用于展开收起输出的对象
     */
    this.consolePanel.addEventListener('click', ({ target }) => {
      if (target.className === '__any_console-console-obj-prev-icon') {
        target = target.parentNode;
      }

      if (target.className === '__any_console-console-obj-prev') {
        let span = $('span', target);
        span.innerText = span.innerText === '▶' ? '▼' : '▶';
        toggleShow($('pre', target.parentNode));
      }
    });

    /**
     * 切换当前显示的分类
     */
    this.logsShowTypesBtnParent.addEventListener('click', e => {
      if (e.target.nodeName !== 'LI') return;
      this.logsShowTypesBtn.forEach(el => void(el.className = ''));
      e.target.className = 'active';

      this.consolePanel.innerHTML = '';

      let type = e.target.innerText.toLowerCase();
      append(this.consolePanel, ...this.logsClassify[type]);
      this.curShowConsoleType = type;
    });

    /**
     * 执行命令
     */
    $('.__any_console-order .__any_console-send-order', this.warpper).addEventListener('click', () => {
      if (this.orderInput.value === '') return;

      if ((this.orderInput.value === 'clear' || this.orderInput.value === 'clear()') && (!window.clear)) {
        $('.__any_console-order .__any_console-clear-console', this.warpper).click();
        this.orderInput.value = '';
        return;
      }

      this._doOrder(this.orderInput.value);
      this.orderInput.value = '';
    });

    /**
     * 清空日志
     */
    $('.__any_console-order .__any_console-clear-console', this.warpper).addEventListener('click', () => {
      this.logsClassify = {log: [], error: [], info: [], warn: [], all: []};
      this.consolePanel.innerHTML = '';
    });
  }
}