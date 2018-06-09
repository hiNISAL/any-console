import { ce } from '../utils/utils';

export default function() {
  let warpper = ce('div');
  warpper.id = '__any_console-wrapper';
  warpper.innerHTML = `
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
      </ul>
    </div>

    <div class="__any_console-panels">
      <div class="__any_console-console-panel">
        <ul class="__any_console-console-panel-filter">
          <li class="active">All</li>
          <li>Log</li>
          <li>Info</li>
          <li>Warn</li>
          <li>Error</li>
        </ul>
      <div class="__any_console-console-panel-log-items">
      
      </div>
      </div>
    </div>
  `;

  return warpper;
};