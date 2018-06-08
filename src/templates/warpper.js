import { ce } from '../utils/utils';

export default function() {
  let warpper = ce('div');

  warpper.innerHTML = `
    <div id="__any_console-wrapper">
      <div class="__any_console-tab">
        <header class="__any_console-header">
          <span class="__any_console-header-title">
            Any Console
          </span>
          <span class="__any_console-close-btn">
            ×
          </span>
          
        </header>
        <ul class="__any_console-tab-wrapper">
          <li class="__any_console_tab_item active">Console</l>
          <li class="__any_console_tab_item">Network</li>
          <li class="__any_console_tab_item">Cookie</li>
          <li class="__any_console_tab_item">LocalStorage</li>
          <li class="__any_console_tab_item">SessionStorage</li>
        </ul>
      </div>

      <div class="__any_console-panels">
        <div class="__any_console-console-panel">
          <div class="__any_console-order">
            <input type="text">
            <button>确定</button>
          </div>
        <div class="__any_console-console-panel-log-items">
        
        </div>
        </div>
      </div>
    </div>
  `;

  return warpper;
};