'use strict'
/* 多继承 */
export function mix(...mixins) {

  function copyProperties(target, source) {
    for (let key of Reflect.ownKeys(source)) {
      if ( key !== 'constructor'
        && key !== 'prototype'
        && key !== 'name'
      ) {
        let desc = Object.getOwnPropertyDescriptor(source, key);
        Object.defineProperty(target, key, desc);
      }
    }
  }

  class Mix {
    constructor() {
      for (let mixin of mixins) {
        copyProperties(this, new mixin()); // 拷贝实例属性
      }
    }
  }

  for (let mixin of mixins) {
    copyProperties(Mix, mixin); // 拷贝静态属性
    copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
  }

  return Mix;
}

/* 订阅发布 */
let pubsub = (function() {
  let clientList = {};
  let listen,
      trigger,
      remove;
  listen = function(key, fn) {
    if (!clientList[key]) {
      clientList[key] = [];
    }
    clientList[key].push(fn);
  };

  trigger = function() {
    let key = [].shift.call(arguments);
    let fns = clientList[key];

    if (!fns || fns.length === 0) {
      return false;
    }

    for (let i = 0, fn; fn = fns[i++];) {
      fn.apply(this, arguments);
    }
  };

  remove = function(key, fn) {
    let fns = clientList[key];
    // key对应的消息么有被人订阅
    if (!fns) {
      return false;
    }
    // 没有传入fn(具体的回调函数), 表示取消key对应的所有订阅
    if (!fn) {
      fns && (fns.length = 0);
    } else {
      // 反向遍历
      for (let i = fns.length - 1; i >= 0; i--) {
        let _fn = fns[i];
        if (_fn === fn) {
          // 删除订阅回调函数
          fns.splice(i, 1);
        }
      }
    }
  };

  return { listen, trigger, remove }
}());

/* 无按键倒计时 */
let autoHide = (function () {
  let autoHideMS = 0
    , timer = null
    , ms = 0
    , callback = null
    , doc = document
  let _autoHide = () => {
    timer = setInterval(() => {
      autoHideMS -= 1e3
      if (autoHideMS <= 0) {
        clearInterval(timer)
        _remove()
        callback instanceof Function && callback()
      }
    }, 1e3)
  }

  let _keydown = () => {
    if (autoHideMS > 0) {
      autoHideMS = ms
      clearInterval(timer)
    }
  }

  let _keyup = () => {
    _autoHide()
  }

  let _remove = () => {
    doc.removeEventListener('keydown', _keydown)
    doc.removeEventListener('keyup', _keyup)
  }

  let start = function (_ms = 5e3, _callback) {
    ms = _ms
    autoHideMS = _ms
    callback = _callback
    doc.addEventListener('keydown', _keydown)
    doc.addEventListener('keyup', _keyup)
  }

  let remove = function () {
    clearInterval(timer)
    _remove()
  }

  return { start, remove }
}())

/* 设置localStorage */
export function setlS (key, val) {
  if (key) {
    try {
      let _mtkStorage = JSON.parse(localStorage.getItem('MTK_STORAGE') || '{}')
      _mtkStorage[key] = val
      localStorage.setItem('MTK_STORAGE', JSON.stringify(_mtkStorage))
    } catch (e) {
      console.error('set localStorage fail : ' + JSON.stringify(e))
    }
  } else {
    console.error('Please enter localStorage set key')
  }
}
/* 读取localStorage */
export function getlS (key) {
  if (key) {
    try {
      let _mtkStorage = JSON.parse(localStorage.getItem('MTK_STORAGE') || '{}')
      return _mtkStorage.hasOwnProperty(key) ? _mtkStorage[key] : null
    } catch (e) {
      console.error('get localStorage fail : ' + JSON.stringify(e))
    }
  } else {
    console.error('Please enter localStorage get key')
    return null
  }
}
/* 删除localStorage */
export function removelS (key) {
  if (key) {
    try {
      let _mtkStorage = JSON.parse(localStorage.getItem('MTK_STORAGE') || '{}')
      if (_mtkStorage.hasOwnProperty(key)) {
        delete _mtkStorage[key]
        localStorage.setItem('MTK_STORAGE', JSON.stringify(_mtkStorage))
      }
    } catch (e) {
      console.error('remove localStorage fail : ' + JSON.stringify(e))
    }
  } else {
    console.error('Please enter localStorage remove key')
  }
}
/* 设置sessionStorage */
export function setsS (key, val) {
  if (key) {
    try {
      let _mtkStorage = JSON.parse(sessionStorage.getItem('MTK_STORAGE') || '{}')
      _mtkStorage[key] = val
      sessionStorage.setItem('MTK_STORAGE', JSON.stringify(_mtkStorage))
    } catch (e) {
      console.error('set sessionStorage fail : ' + JSON.stringify(e))
    }
  } else {
    console.error('Please enter sessionStorage set key')
  }
}
/* 读取sessionStorage */
export function getsS (key) {
  if (key) {
    try {
      let _mtkStorage = JSON.parse(sessionStorage.getItem('MTK_STORAGE') || '{}')
      return _mtkStorage.hasOwnProperty(key) ? _mtkStorage[key] : null
    } catch (e) {
      console.error('get sessionStorage fail : ' + JSON.stringify(e))
    }
  } else {
    console.error('Please enter sessionStorage get key')
    return null
  }
}
/* 删除sesssionStorage */
export function removesS (key) {
  if (key) {
    try {
      let _mtkStorage = JSON.parse(sessionStorage.getItem('MTK_STORAGE') || '{}')
      if (_mtkStorage.hasOwnProperty(key)) {
        delete _mtkStorage[key]
        sessionStorage.setItem('MTK_STORAGE', JSON.stringify(_mtkStorage))
      }
    } catch (e) {
      console.error('remove sessionStorage fail : ' + JSON.stringify(e))
    }
  } else {
    console.error('Please enter sessionStorage remove key')
  }
}
/* 获取hash */
export function getHash (name, url = window.location.hash) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  let r = url.substr(1).match(reg);
  return r !== null ? unescape(r[2]) : null
}
/* 获取参数 */
export function getParams (name, url = window.location.search) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  let r = url.substr(1).match(reg);
  return r !== null ? unescape(r[2]) : null
}
/* 首字母大写 */
export function firstUpperCase(str) {
  return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
}
/* 补零 */
function fillZero (val) {
  return val < 10 ? '0' + val : val
}
/* sleep */
export function sleep (delay) {
  return new Promise((resolve, reject) => setTimeout(resolve, delay))
}
/* 时间转毫秒数 */
export function getTime (time) {
  return +new Date(`2001/01/01 ${time}`) - +new Date('2001/01/01 00:00:00')
}
/* 毫秒数转时间 */
export function getMSFormat (ms) {
  if (ms >= 1000) {
    let total = ms / 1000 // 总秒数
      , day = parseInt(total / (24 * 60 * 60)) //计算整数天数
      , afterDay = total- day * 24 * 60 * 60 //取得算出天数后剩余的秒数
      , hour = parseInt(afterDay / (60 * 60)) //计算整数小时数
      , afterHour = total - day * 24 * 60 * 60 - hour * 60 * 60 //取得算出小时数后剩余的秒数
      , min = parseInt(afterHour / 60) //计算整数分
      , afterMin = Math.floor(total - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60) //取得算出分后剩余的秒数
      , hh = 0
    if (day) {
      hh = day * 24
    }
    hh += hour
    return `${fillZero(hh)}:${fillZero(min)}:${fillZero(afterMin)}`
  } else {
    return `00:00:00`
  }
}
/* 是否是PC平台，只针对window/mac */
export function isPC () {
  return /Win32|MacIntel|MacPPC/.test(navigator.platform)
}
/* 随机ID */
export function randomID () {
  return Math.random().toString(36).substring(2)
}

export {
  pubsub, autoHide, fillZero
}
