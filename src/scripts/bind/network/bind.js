import { $ } from "../../../utils/utils";

export default AC => {
  AC.prototype._bindNetworkEvents = function() {
    this.networkPanel.addEventListener('click', (e) => {
      if (e.target.className !== '__any_console-network-panel-item-response') return;

      if (e.target.style.overflow !== 'visible') {
        e.target.style.overflow = 'visible';
        e.target.style.maxHeight = '100%';
      } else {
        e.target.style.overflow = 'hidden';
        e.target.style.maxHeight = '35px';
      }

      
    });
  }
}