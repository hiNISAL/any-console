import { $, $$ } from '../../../utils/utils';

let canToggle = true;

export default function(AC) {
  AC.prototype._bindCommonEvents = function() {
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
  }
}
