import { $, $$, append, toggleShow } from '../../../utils/utils';

let canToggle = true;

export default function (AC) {
  AC.prototype._bindConsoleEvents = function () {
    this.consolePanel.addEventListener('click', ({
      target
    }) => {
      if (target.className === '__any_console-console-obj-prev-icon') {
        target = target.parentNode;
      }

      if (target.className === '__any_console-console-obj-prev') {
        let span = $('span', target);
        span.innerText = span.innerText === '▶' ? '▼' : '▶';
        toggleShow($('pre', target.parentNode));
      }
    });

    this.toggleBtn.addEventListener('click', () => {
      if (!canToggle) return;

      this.warpper.style.bottom = this.show ? '-100%' : 0;
      this.show = !this.show;
      canToggle = false;

      setTimeout(() => {
        canToggle = true;
      }, 300);
    });

    $('.__any_console-close-btn', this.warpper).addEventListener('click', () => {
      this.toggleBtn.click();
    });

    this.logsShowTypesBtnParent.addEventListener('click', e => {
      if (e.target.nodeName !== 'LI') return;
      this.logsShowTypesBtn.forEach(el => void(el.className = ''));
      e.target.className = 'active';

      this.consolePanel.innerHTML = '';

      let type = e.target.innerText.toLowerCase();
      append(this.consolePanel, ...this.logsClassify[type]);
      this.curShowConsoleType = type;
    });
  }
}