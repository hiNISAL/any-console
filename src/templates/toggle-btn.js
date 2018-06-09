import { ce } from '../utils/utils';

export default function() {
  let div = ce('div');
  div.className = '__any_console-toggle-btn';
  div.innerHTML = '<span>↹</span>';
  return div;
}