import { ce } from '../../utils/utils';

// <div class="__any_console-console-panel-log-item">
//  <div class="__any_console-console-panel-log-item-msg">没有任何问题没有任何问题</div>
//  <div class="__any_console-console-panel-log-item-time">17:22</div>
// </div>

const TYPES = {
  log: '',
  error: ' __any_console-error',
  info: ' __any_console-info',
  warn: ' __any_console-warn',
  orderdo: ' __any_console-order-do',
  orderres: ' __any_console-order-res'
};

export default function(msg = '', type = 'log') {
  let item = ce('div');

  let date = new Date();
  alert(msg);
  item.className = `__any_console-console-panel-log-item${ TYPES[type] }`;
  item.innerHTML = `
    <div class="__any_console-console-panel-log-item-msg">${ msg }</div>
    <div class="__any_console-console-panel-log-item-time">${ date.getMinutes() + ':' + date.getSeconds() }</div>
  `;

  return item;
}