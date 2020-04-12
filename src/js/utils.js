function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle(arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandom(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

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
export function arraySum (arr) {
  if(arr.length==0){
    return 0
  } else if(arr.length==1){
    return Number(arr[0])
  } else {
   return Number(arr[0]) + arraySum(arr.slice(1))
  }
}

// 深拷贝对象
export function deepCopy(obj){
  if(typeof obj != 'object'){
    return obj
  }
  var newobj = {}
  for ( var attr in obj) {
    newobj[attr] = deepCopy(obj[attr])
  }
  return newobj;
}

//获取cookie、
export function getCookie () {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)")
  if (arr = document.cookie.match(reg))
   return (arr[2])
  else
   return null
 }

// inArray
export function inArray(search, array){
  for(var i in array){
    if(array[i]==search){
      return true;
    }
  }
  return false;
}

 //设置cookie,增加到vue实例方便全局调用
export function setCookie (c_name, value, expiredays, path) {
  var exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + (path ? ";path=/" : `;path=${path}`)
}

 //删除cookie
export function delCookie (name) {
  var exp = new Date()
  exp.setTime(exp.getTime() - 1)
  var cval = getCookie(name)
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString()
}

//时间戳转字符串
// n=1 显示2011-05-23 15:54:26, n=2: 显示2011-05-23
export function timeToStr(timestamp,n){
  if(timestamp == undefined) return "-";
  var update = new Date(timestamp)
  var year   = update.getFullYear();
  var month  = (update.getMonth()+1<10)?('0'+(update.getMonth()+1)):(update.getMonth()+1);
  var day    = (update.getDate()<10)?('0'+update.getDate()):(update.getDate());
  var hour   = (update.getHours()<10)?('0'+update.getHours()):(update.getHours());
  var minute = (update.getMinutes()<10)?('0'+update.getMinutes()):(update.getMinutes());
  var second = (update.getSeconds()<10)?('0'+update.getSeconds()):(update.getSeconds());
  if(n === 1){
	  return (year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second);
	}else if(n === 2){
	  return (year+'-'+month+'-'+day);
	}else{
	  return 0;
	}
}


// 获得字符长度
export function getByteLen (val) {
  var len = 0
  for (var i = 0; i < val.length; i++) {
    var a = val.charAt(i)
    if (a.match(/[^\x00-\xff]/ig) != null) {
      len += 2
    } else {
      len += 1
    }
  }
  return len
 };

 // 日期格式化
 Date.prototype.Format = function(format){
  var o = {
    "M+" : this.getMonth()+1, //month
    "d+" : this.getDate(), //day
    "h+" : this.getHours(), //hour
    "m+" : this.getMinutes(), //minute
    "s+" : this.getSeconds(), //second
    "q+" : Math.floor((this.getMonth()+3)/3), //quarter
    "S" : this.getMilliseconds() //millisecond
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length))
  }
  for(var k in o) {
    if(new RegExp("("+ k +")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length))
    }
  }
  return format
}

// 最近n个月时间获取
export function getnMonthBefor (n) {
  var resultDate,year,month,date,hms
  var currDate = new Date()
  year = currDate.getFullYear()
  month = currDate.getMonth()+1
  date = currDate.getDate()
  hms = currDate.getHours() + ':' + (currDate.getMinutes() < 10 ? '0'+ currDate.getMinutes() : currDate.getMinutes()) + ':' + (currDate.getSeconds() < 10 ? '0'+currDate.getSeconds() : currDate.getSeconds())
  if (month <= n) {
    month += 12 - n
    year--
  } else {
    month -= n
  }
  month = (month < 10) ? ('0' + month) : month
  resultDate = year + '-'+month+'-'+date+' ' + hms
  return resultDate
}

// 获得密码强度
export function pwdIntensity (pwd) {
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
    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "/") + (bSecure ? "; secure" : "");
    return true;
  },
  removeItem: function (sKey, sPath, sDomain) {
    if (!sKey || !this.hasItem(sKey)) { return false; }
    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + ( sDomain ? "; domain=" + sDomain : "") + ( sPath ? "; path=" + sPath : "/");
    return true;
  },
  hasItem: function (sKey) {
    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
  },
  keys: /* optional method: you can safely remove it! */ function () {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
    return aKeys;
  }
};

export {docCookies};

// 获取相差多少天
export function getOffsetDays(time) {
  var today = new Date()
  today.setHours(0)
  today.setMinutes(0)
  today.setSeconds(0)
  today.setMilliseconds(0)
  var offsetTime = Math.abs(time - today);
  return Math.ceil(offsetTime / (3600 * 24 * 1e3));
}

export const int = (number) => {
  if (number === '') {
    return 0
  }
  return parseInt(number, 10)
}
export const innerWidth = (node) => {
  let width = node.clientWidth;
  const computedStyle = node.style
  width -= int(computedStyle.paddingLeft);
  width -= int(computedStyle.paddingRight);
  return width;
}

export const outerWidth = (node) => {
  let width = node.clientWidth;
  const computedStyle = node.style
  width += int(computedStyle.borderLeftWidth);
  width += int(computedStyle.borderRightWidth);
  return width;
}

export const innerHeight = (node) => {
  let height = node.clientHeight;
  const computedStyle = node.style
  height -= int(computedStyle.paddingTop);
  height -= int(computedStyle.paddingBottom);
  return height;
}

export const outerHeight = (node) => {
  let height = node.clientHeight;
  const computedStyle = node.style
  height += int(computedStyle.borderTopWidth);
  height += int(computedStyle.borderBottomWidth);
  return height;
}
export const parseBounds = (bounds) => {
  return {
    left: -bounds.left,
    top: -bounds.top,
    right: bounds.right,
    bottom: bounds.bottom
  }
}

export const isNumber = (things) => {
  return typeof things === 'number' ? true : false
}