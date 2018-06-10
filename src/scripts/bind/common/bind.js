import { $, $$, asyncTask } from '../../../utils/utils';

let canToggle = true;
let canTogglePanel = true;

export default function(AC) {
  AC.prototype._bindCommonEvents = function() {
    /**
     * 面板的显示切换按钮
     */
    this.toggleBtn.addEventListener('click', () => {
      if (!canToggle) return;

      this.warpper.style.bottom = this.show ? '-100%' : 0;
      this.show = !this.show;
      canToggle = false;

      setTimeout(() => {
        canToggle = true;
      }, 300);
    });

    /**
     * 关闭按钮
     */
    $('.__any_console-close-btn', this.warpper).addEventListener('click', () => {
      this.toggleBtn.click();
    });

    /**
     * 切换面板
     */
    $('.__any_console-tab-wrapper', this.warpper).addEventListener('click', ({ target }) => {
      if (!canTogglePanel) return;
      if (target.nodeName !== 'LI') return;
      canTogglePanel = false;
      this.curTabBtn.className = '__any_console_tab_item';

      this.curTab = target.innerText;
      target.className = '__any_console_tab_item active';
      this.curTabBtn = target;

      this.curPanel.style.opacity = '0';
      let lastPanel = this.curPanel;
      setTimeout(() => {
        lastPanel.style.display = 'none';
        canTogglePanel = true;
      }, 300);

      this.curPanel = this.panels.find(panel => panel.className.includes(this.curTab.toLowerCase()));

      this.curPanel.style.display = 'block';
      asyncTask(() => {
        this.curPanel.style.opacity = '1';
      });
    });
  }
}
