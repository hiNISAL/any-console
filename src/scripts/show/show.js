import { append, asyncTask } from '../../utils/utils';

export default function(AC) {
  AC.prototype._show = function() {
    append(document.body, this.warpper, this.toggleBtn);

    this.curPanel.style.display = 'block';
    asyncTask(() => {
      this.curPanel.style.opacity = '1';
    });
  }
}
