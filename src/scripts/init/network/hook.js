import AnyXHR from './any-xhr';
import AJAXInfo from '../../../templates/network/ajax-info';
import { append } from '../../../utils/utils';

export default function (AC) {
  AC.prototype._listenAJAX = function () {

    let hooks = new AnyXHR();
    let _this = this;

    hooks
      .add('open', function([type, url]) {
        this.requestInfo = { type, url };
      })
      .add('onload', function() {
        const data = Object.assign({}, this.requestInfo, {status: this.status, response: this.responseText});
          console.log(data);
        let div = AJAXInfo(data);

        append(_this.networkPanel, div);
      });



  }
}