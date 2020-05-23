'use strict'

// 多继承
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
// 订阅发布
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
// 无按键
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

  let start = function(_ms = 5e3, _callback) {
    ms = _ms
    autoHideMS = _ms
    callback = _callback
    doc.addEventListener('keydown', _keydown)
    doc.addEventListener('keyup', _keyup)
  }

  let remove = function() {
    clearInterval(timer)
    _remove()
  }

  return { start, remove }
}())
// 获取hash
export function getHash(name, url = window.location.hash) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  let r = url.substr(1).match(reg);
  return r !== null ? unescape(r[2]) : null
}
// 获取参数
export function getParams(name, url = window.location.search) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  let r = url.substr(1).match(reg);
  return r !== null ? unescape(r[2]) : null
}
// url拼接参数
export function setURL(url, param) {
  var args = link = "";
  for(var key in param){
    args += '&' + key + "=" + param[key];
  }
  link = url + "?" + args.substr(1);
  return link.replace(' ','');
}
// 首字母大写
export function firstUpperCase(str) {
  return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
}
// 补零
function fillZero(val) {
  return val < 10 ? '0' + val : val
}
// sleep
export function sleep(delay) {
  return new Promise((resolve, reject) => setTimeout(resolve, delay))
}
// 时间转毫秒数
export function getTime(time) {
  return +new Date(`2001/01/01 ${time}`) - +new Date('2001/01/01 00:00:00')
}
// 毫秒数转时间
export function getMSFormat(ms) {
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
// 获取某月的天数
export function getDays(year, month) {
  return new Date(year, month, 0).getDate();
}
// 获取某月某日是周几
export function getWeekends(year, month, i) {
  return new Date(year, month - 1, i).getDay();
}
// 倒计时
export function getCountDown(date) {
  var ms = (Date.parse(date)) - (new Date().getTime());
  if (ms >= 0) {
    return {
      "dd": Math.floor(ms / (1000 * 60 * 60 * 24)),
      "hh": fillZero(Math.floor(ms / (1000 * 60 * 60)) % 24),
      "mm": fillZero(Math.floor(ms / (1000 * 60)) % 60),
      "ss": fillZero(Math.floor(ms / 1000) % 60)
    };
  } else {
    return false;
  }
}
// 随机ID
export function randomID() {
  return Math.random().toString(36).substring(2)
}
// 千分位数字
export function thousands(num) {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
// 获取随机数
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
// 随机生成颜色码
export function getRandomColor() {
  return '#' + (function(h) {
    return new Array(7 - h.length).join("0") + h;
  })((Math.random() * 0x1000000 << 0).toString(16));
}
// 数组乱序
export function shuffle(arr) {
  let _arr = arr.slice()
  for (let i = 0, l = _arr.length; i < l; i++) {
    let j = getRandom(0, i), t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}
// 防抖
export function debounce(func, delay) {
  let timer
  return function(...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
// 数组求和
export function arraySum(arr) {
  if (!arr.length) {
    return 0
  } else if (arr.length === 1) {
    return arr[0] - 0
  } else {
   return arr[0] - 0 + arraySum(arr.slice(1))
  }
}
// 深拷贝对象
export function deepCopy(obj) {
  if(typeof obj != 'object'){
    return obj
  }
  let newobj = {}
  for (let attr in obj) {
    newobj[attr] = deepCopy(obj[attr])
  }
  return newobj
}
// 时间戳转字符串
export function timeToStr(timestamp, type = 'time') {
  if(!timestamp) return '-'
  let dt = new Date(timestamp)
    , year = dt.getFullYear()
    , month = fillZero(dt.getMonth() +1)
    , day = fillZero(dt.getDate())
    , hour = fillZero(dt.getHours())
    , minute = fillZero(dt.getMinutes())
    , second = fillZero(dt.getSeconds())
  if (type === 'time') {
	  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
	} else if (type === 'date') {
	  return `${year}-${month}-${day}`
	}
}
// 计算两个日期之间相差天数，xxxx-xx-xx格式
export function dateDiff(startDate, endDate) {
  let startTime = new Date(Date.parse(startDate.replace(/-/g, "/"))).getTime()
    , endTime = new Date(Date.parse(endDate.replace(/-/g, "/"))).getTime()
    , dates = Math.abs((startTime - endTime)) / (1000 * 60 * 60 * 24);     
  return dates;
}
// 获得字符长度
export function getByteLen (val) {
  var len = 0
  for (var i = 0, l = val.length; i < l; i++) {
    var a = val.charAt(i)
    if (a.match(/[^\x00-\xff]/ig) != null) {
      len += 2
    } else {
      len += 1
    }
  }
  return len
}
// 日期格式化
Date.prototype.Format = function(format) {
  var o = {
    'M+' : this.getMonth()+1, // month
    'd+' : this.getDate(), // day
    'h+' : this.getHours(), // hour
    'm+' : this.getMinutes(), // minute
    's+' : this.getSeconds(), // second
    'q+' : Math.floor((this.getMonth() + 3) / 3), // quarter
    'S' : this.getMilliseconds() // millisecond
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for(var k in o) {
    if(new RegExp('('+ k +')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ('00'+ o[k]).substr(('' + o[k]).length))
    }
  }
  return format
}
// 获得密码强度
export function pwdIntensity(pwd) {
  let intensity = 0
  if (pwd.length < 6 || pwd.length > 32) {
    return intensity
  }
  if (/[a-z]/.test(pwd)) {
    intensity++
  }
  if (/[A-Z]/.test(pwd)) {
    intensity++
  }
  if (/[0-9]/.test(pwd)) {
    intensity++
  }
  if (/[`_~!@#$%^&;.*()-+=|"':,?]/.test(pwd)){
    intensity++
  }
  return intensity
}
// 随机字符串生成
export function randomString(len) {
  len = len || 32;
  var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  var maxPos = $chars.length;
  var str = '';
  for (var i = 0; i < len; i++) {
    str += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return str;
}

var docCookies = {
  getItem: function (sKey) {
    if (!sKey) { return null; }
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  },
  setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
    var sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
          sExpires = "; expires=" + vEnd.toUTCString();
          break;
      }
    }
    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    return true;
  },
  removeItem: function (sKey, sPath, sDomain) {
    if (!this.hasItem(sKey)) { return false; }
    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
    return true;
  },
  hasItem: function (sKey) {
    if (!sKey) { return false; }
    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
  },
  keys: function () {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
    return aKeys;
  }
}

export {
  fillZero, getRandom, docCookies
}
