import { ce, $ } from "../../utils/utils";

export default ({ method, url, response, status }) => {
  let div = ce('div');

  div.className = '__any_console-network-panel-item';

  div.innerHTML = `
    <div class="__any_console-network-panel-item-base-info">
      <span>URL</span>
      <span>${ url }</span>
    </div>
    <div class="__any_console-network-panel-item-base-info">
      <span>METHOD</span>
      <span>${ method }</span>
    </div>
    <div class="__any_console-network-panel-item-base-info">
      <span>STATUS</span>
      <span>${ status }</span>
    </div>
    <div class="__any_console-network-panel-item-response">
    </div>
  `;

  $('.__any_console-network-panel-item-response', div).innerText = response;

  return div;
};