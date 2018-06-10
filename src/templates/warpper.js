import { ce, $$ } from '../utils/utils';
import { close } from '../icons/icons';

export default function(curTab) {
  let warpper = ce('div');
  warpper.id = '__any_console-wrapper';
  warpper.innerHTML = `
    <div class="__any_console-tab">
      <header class="__any_console-header">
        <span class="__any_console-header-title">
          Any Console
        </span>
        <span class="__any_console-close-btn">
          <img src="${ close }">
        </span>
        
        
      </header>
      <ul class="__any_console-tab-wrapper">
        <li class="__any_console_tab_item">Console</li>
        <li class="__any_console_tab_item">Network</li>
        <li class="__any_console_tab_item">Cookie</li>
        <li class="__any_console_tab_item">LocalStorage</li>
        <li class="__any_console_tab_item">SessionStorage</li>
      </ul>
    </div>

    <div class="__any_console-panels">
      <div class="__any_console_panel __any_console-console-panel">
        <ul class="__any_console-console-panel-filter">
          <li class="active">All</li>
          <li>Log</li>
          <li>Info</li>
          <li>Warn</li>
          <li>Error</li>
        </ul>

        <div class="__any_console-order">
          <input type="text">
          <button class="__any_console-send-order">确定</button>
          <button class="__any_console-clear-console">清空</button>
        </div>
        <div class="__any_console-console-panel-log-items">
        
        </div>
      </div>

      <div class="__any_console_panel __any_console-network-panel">

      </div>

      <div class="__any_console_panel __any_console-cookie-panel">

      </div>

      <div class="__any_console_panel __any_console-localstorage-panel">

      </div>

      <div class="__any_console-sessionstorage-panel">

      </div>
    </div>
  `;

  let panels = $$('.__any_console_panel', warpper);

  let curTabEl = panels.find(panel => panel.className.includes(curTab.toLowerCase()));

  let tabsBtn = $$('.__any_console-tab-wrapper li', warpper);

  let curTabBtnEl = tabsBtn.find(btn => btn.innerText.toLowerCase().includes(curTab.toLowerCase()));
  curTabBtnEl.className = '__any_console_tab_item active';

  return [warpper, curTabEl, tabsBtn, curTabBtnEl, panels];
};
