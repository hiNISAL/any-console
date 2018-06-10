import { ce } from '../../utils/utils';

export default function(text = 'To initialize the AnyConsole you need use `new` keyword like `new AnyPage()`. (Click To Hide)') {
  let div = ce('div');
  div.className = '__any_console-init-err';
  div.innerHTML = text;

  div.onclick = function() {
    div.style.display = 'none';
  };

  return div;
}