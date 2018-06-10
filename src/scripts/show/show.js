import { append } from '../../utils/utils';

export default function(AC) {
  AC.prototype._show = function() {
    append(document.body, this.warpper, this.toggleBtn);
  }
}
