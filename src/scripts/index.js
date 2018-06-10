import { append, asyncTask } from '../utils/utils';

import initial from './init/init';
import initLog from './init/console/log';
import initError from './init/console/error';
import initWarn from './init/console/warn';
import initInfo from './init/console/info';
import initOrder from './init/console/order';

import createCommonElements from './createElement/createCommonElements';
import createConsoleElements from './createElement/console/createElement';

import bindCommonEvents from './bind/common/bind';
import bindConsoleEvents from './bind/console/bind';

import show from './show/show';

import initializeError from '../templates/error/init-error';

/**
 * 构造函数
 * @param {*} options 
 */
function AnyConsole(options) {
  if (!(this instanceof AnyConsole)) {
    append(document.body, initializeError());
    console.error('To initialize the AnyConsole you need use `new` keyword like `new AnyPage()`');
    return;
  }
  
  options = options || {};
  this._init(options);
}

initial(AnyConsole);

createCommonElements(AnyConsole);
createConsoleElements(AnyConsole);

// Console相关初始化
initLog(AnyConsole);
initError(AnyConsole);
initWarn(AnyConsole);
initInfo(AnyConsole);
initOrder(AnyConsole);

// 绑定事件
bindCommonEvents(AnyConsole);
bindConsoleEvents(AnyConsole);

// 显示
show(AnyConsole);

export default AnyConsole;
