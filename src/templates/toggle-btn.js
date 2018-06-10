import { ce } from '../utils/utils';
import { toggle } from '../icons/icons';

export default function() {
  let div = ce('div');
  div.className = '__any_console-toggle-btn';
  div.innerHTML = `<img src="${ toggle }">`;
  return div;
}