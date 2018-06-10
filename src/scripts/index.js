import initial from './init/init';
import createElement from './createElement/createElement';
import initLog from './init/console/log';
import initError from './init/console/error';
import initWarn from './init/console/warn';
import initInfo from './init/console/info';

import bindConsoleEvents from './bind/console/bind';

import show from './show/show';

/**
 * 构造函数
 * @param {*} options 
 */
function AnyConsole(options) {
  this._init(options);
}

initial(AnyConsole);
createElement(AnyConsole);

// Console相关初始化
initLog(AnyConsole);
initError(AnyConsole);
initWarn(AnyConsole);
initInfo(AnyConsole);

// 绑定事件
bindConsoleEvents(AnyConsole);

// 显示
show(AnyConsole);

export default AnyConsole;
