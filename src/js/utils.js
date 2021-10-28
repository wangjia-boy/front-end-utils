'use strict'

// 补零
function fillZero(val) {
  return val < 10 ? '0' + val : val
}
// 获取随机数
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/* string */

// 首字母大写
export function firstUpperCase(str) {
  return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
}
// 随机ID
export function randomID() {
  return Math.random().toString(36).substring(2)
}
// 随机生成颜色码
export function getRandomColor() {
  return '#' + (function (h) {
    return new Array(7 - h.length).join('0') + h
  })((Math.random() * 0x1000000 << 0).toString(16))
}
// uuid
export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = Math.random() * 16 | 0,
        v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}
// 获得字符长度
export function getByteLen(val) {
  let len = 0
  for (let i = 0, l = val.length; i < l; i++) {
    let a = val.charAt(i)
    if (a.match(/[^\x00-\xff]/ig) != null) {
      len += 2
    } else {
      len += 1
    }
  }
  return len
}
// 随机字符串生成
export function randomString(len) {
  len = len || 32;
  let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  let maxPos = $chars.length
  let str = ''
  for (let i = 0; i < len; i++) {
    str += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return str
}
// 驼峰转字符串
export function fromCamelCase(str, separator = ' ') {
  return str.replace(/([a-zd])([A-Z])/g, '$1' + separator + '$2')
  .replace(/([A-Z]+)([A-Z][a-zd]+)/g, '$1' + separator + '$2').toLowerCase()
}
// 字符串转驼峰
export function toCamelCase(str) {
  let s = str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g).map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase()).join('')
  return s.slice(0, 1).toLowerCase() + s.slice(1)
}

/* number */

// 千分位数字
export function thousands(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
// 匹配整数
export function isInteger(val) {
  return /^(-|\+)?\d+$/.test(val)
}

/* array */

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
// 求数组最大值
export function arrayMax(arr) {
  return Math.max(...arr)
}
// 求数组最小值
export function arrayMin(arr) {
  return Math.min(...arr)
}
// 数组切割
export function arrayChunk(arr, size) {
  return Array.from({length: Math.ceil(arr.length / size)}, (v, i) => arr.slice(i * size, i * size + size))
}
// 过滤数组中false值
export function arrayCompact(arr) {
  return arr.filter(Boolean)
}
// 计算数组中值的出现次数
export function arrayCountOccurrences(arr, value) {
  return arr.reduce((a, v) => v === value ? a + 1 : a + 0, 0)
}
// 深度拼合数组
export function deepFlatten(arr) {
  return [].concat(...arr.map(v => Array.isArray(v) ? deepFlatten(v) : v))
}
// 返回两个数组间的差异
export function arrayDiff(a, b) {
  const s = new Set(b)
  return a.filter(v => !s.has(v))
}
// 初始化指定范围内的数字数组
export function initArrayWithRange(end, start = 0) {
  return Array.from({length: end - start + 1}).map((v, i) => i + start)
}

/* date */

// 时间转毫秒数
export function getTime(time) {
  return +new Date(`2001/01/01 ${time}`) - +new Date('2001/01/01 00:00:00')
}
// 毫秒数转时间
export function getMSFormat(ms) {
  if (ms >= 1000) {
    let total = ms / 1000 // 总秒数
      , day = parseInt(total / (24 * 60 * 60)) //计算整数天数
      , afterDay = total - day * 24 * 60 * 60 //取得算出天数后剩余的秒数
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
  return new Date(year, month, 0).getDate()
}
// 获取某月某日是周几
export function getWeekends(year, month, i) {
  return new Date(year, month - 1, i).getDay()
}
// 时间戳转字符串
export function timeToStr(timestamp, type = 'time') {
  if (!timestamp) return '-'
  let dt = new Date(timestamp)
    , year = dt.getFullYear()
    , month = fillZero(dt.getMonth() + 1)
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
  let startTime = new Date(Date.parse(startDate.replace(/-/g, '/'))).getTime()
    , endTime = new Date(Date.parse(endDate.replace(/-/g, '/'))).getTime()
    , dates = Math.abs((startTime - endTime)) / (1000 * 60 * 60 * 24)
  return dates
}
// 时间戳转化为多久前
export function timeFormat(timestamp) {
  let mistiming = Math.round((Date.now() - timestamp) / 1000)
    , arrr = ['年', '个月', '星期', '天', '小时', '分钟', '秒']
    , arrn = [31536000, 2592000, 604800, 86400, 3600, 60, 1]
  for (let i = 0; i < arrn.length; i++) {
    let inm = Math.floor(mistiming / arrn[i])
    if (inm != 0) {
      return inm + arrr[i] + '前'
    }
  }
}
// 倒计时
export function getCountDown(date) {
  let ms = (Date.parse(date)) - (new Date().getTime())
  if (ms >= 0) {
    return {
      'dd': Math.floor(ms / (1000 * 60 * 60 * 24)),
      'hh': fillZero(Math.floor(ms / (1000 * 60 * 60)) % 24),
      'mm': fillZero(Math.floor(ms / (1000 * 60)) % 60),
      'ss': fillZero(Math.floor(ms / 1000) % 60)
    };
  } else {
    return false
  }
}
// 日期格式化
Date.prototype.Format = function (format) {
  let o = {
    'M+': this.getMonth() + 1, // month
    'd+': this.getDate(), // day
    'h+': this.getHours(), // hour
    'm+': this.getMinutes(), // minute
    's+': this.getSeconds(), // second
    'q+': Math.floor((this.getMonth() + 3) / 3), // quarter
    'S': this.getMilliseconds() // millisecond
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return format
}

/* dom */

// 获取窗口可视范围的高度
export function getClientHeight() {
  let clientHeight = 0, doc = document
  if (doc.body.clientHeight && doc.documentElement.clientHeight) {
    clientHeight = (doc.body.clientHeight < doc.documentElement.clientHeight) ? doc.body.clientHeight : doc.documentElement.clientHeight
  } else {
    clientHeight = (doc.body.clientHeight > doc.documentElement.clientHeight) ? doc.body.clientHeight : doc.documentElement.clientHeight
  }
  return clientHeight
}
// 获取滚动条距顶部高度
export function getScrollTop() {
  return document.documentElement.scrollTop || document.body.scrollTop
}
// 设置滚动条距顶部高度
export function setScrollTop(y) {
  window.scrollTo(0, y)
}
// 获取当前滚动条位置
export function getScrollPosition() {
  let win = window
  return {
    x: win.pageXOffset !== undefined ? win.pageXOffset : win.scrollLeft,
    y: win.pageYOffset !== undefined ? win.pageYOffset : win.scrollTop
  }
}
// 滚动到指定元素区域
export function smoothScroll(element) {
  document.querySelector(element).scrollIntoView({
    behavior: 'smooth'
  })
}
// 平滑滚动到页面顶部
export function scrollToTop() {
  const top = document.documentElement.scrollTop || document.body.scrollTop
  if (top > 0) {
    window.requestAnimationFrame(scrollToTop)
    window.scrollTo(0, top - top / 8)
  }
}
// 判断元素是否在视口中
export function elementIsVisibleInViewport(el) {
  const { top, left, bottom, right } = el.getBoundingClientRect()
  const { innerHeight, innerWidth } = window
  return ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) && ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
}

// 多继承
export function mix(...mixins) {
  function copyProperties(target, source) {
    for (let key of Reflect.ownKeys(source)) {
      if (key !== 'constructor'
        && key !== 'prototype'
        && key !== 'name'
      ) {
        let desc = Object.getOwnPropertyDescriptor(source, key)
        Object.defineProperty(target, key, desc)
      }
    }
  }

  class Mix {
    constructor() {
      for (let mixin of mixins) {
        copyProperties(this, new mixin()) // 拷贝实例属性
      }
    }
  }

  for (let mixin of mixins) {
    copyProperties(Mix, mixin) // 拷贝静态属性
    copyProperties(Mix.prototype, mixin.prototype) // 拷贝原型属性
  }

  return Mix
}
// 订阅发布
let pubsub = (function () {
  let clientList = {}
  let listen,
    trigger,
    remove
  listen = function (key, fn) {
    if (!clientList[key]) {
      clientList[key] = []
    }
    clientList[key].push(fn)
  }

  trigger = function () {
    let key = [].shift.call(arguments)
    let fns = clientList[key]

    if (!fns || fns.length === 0) {
      return false
    }

    for (let i = 0, fn; fn = fns[i++];) {
      fn.apply(this, arguments)
    }
  }

  remove = function (key, fn) {
    let fns = clientList[key]
    // key对应的消息么有被人订阅
    if (!fns) {
      return false
    }
    // 没有传入fn(具体的回调函数), 表示取消key对应的所有订阅
    if (!fn) {
      fns && (fns.length = 0)
    } else {
      // 反向遍历
      for (let i = fns.length - 1; i >= 0; i--) {
        let _fn = fns[i]
        if (_fn === fn) {
          // 删除订阅回调函数
          fns.splice(i, 1)
        }
      }
    }
  }

  return { listen, trigger, remove }
}())
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
// 获取hash
export function getHash(name, url = window.location.hash) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  let r = url.substr(1).match(reg)
  return r !== null ? unescape(r[2]) : null
}
// 获取参数
export function getParams(name, url = window.location.search) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  let r = url.substr(1).match(reg)
  return r !== null ? unescape(r[2]) : null
}
// 返回url参数对象
export function getParameters(url) {
  return url.match(/([^?=&]+)(=([^&]*))/g).reduce((a, v) => (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1), a), {})
}
// 拼接参数
export function setParams(url, param) {
  let args = ''
    , link = ''
  for (let key in param) {
    args += '&' + key + '=' + param[key]
  }
  link = url + '?' + args.substr(1)
  return link.replace(' ', '')
}
// sleep
export function sleep(delay) {
  return new Promise((resolve, reject) => setTimeout(resolve, delay))
}
// 防抖
export function debounce(func, delay) {
  let timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
// 从对象中选取对应的键值对
export function pick(obj, arr) {
  return arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {})
}
// 深拷贝对象
export function deepCopy(values) {
  let copy
  if (null == values || 'object' != typeof values) {
    return values
  }

  if (values instanceof Date) {
    copy = new Date()
    copy.setTime(values.getTime())
    return copy
  }

  if (values instanceof Array) {
    copy = []
    for (let i = 0, len = values.length; i < len; i++) {
      copy[i] = deepClone(values[i])
    }
    return copy
  }

  if (values instanceof Object) {
    copy = {}
    for (let attr in values) {
      if (values.hasOwnProperty(attr)) copy[attr] = deepClone(values[attr])
    }
    return copy
  }
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
  if (/[`_~!@#$%^&;.*()-+=|"':,?]/.test(pwd)) {
    intensity++
  }
  return intensity
}
// 转文字大小字节到KB,MB,GB并保留两位小数
export function formatFileSize(fileSize) {
  let size
  if (fileSize < 1024) {
    return fileSize + 'B'
  } else if (fileSize < (1024 * 1024)) {
    size = fileSize / 1024
    size = size.toFixed(2)
    return size + 'KB'
  } else if (fileSize < (1024 * 1024 * 1024)) {
    size = fileSize / (1024 * 1024)
    size = size.toFixed(2)
    return size + 'MB'
  } else {
    size = fileSize / (1024 * 1024 * 1024)
    size = size.toFixed(2)
    return size + 'GB'
  }
}
// 根据身份证获取年龄
export function IdCard(card) {
  let _dt = new Date()
    , month = _dt.getMonth() + 1
    , day = _dt.getDate()
    , age = _dt.getFullYear() - card.substring(6, 10) - 1;
  if (card.substring(10, 12) < month || card.substring(10, 12) == month && card.substring(12, 14) <= day) {
    age++
  }
  return age
}
// 复制字符串到剪切板
export function copyToClipboard(str) {
  const doc = document
    , el = doc.createElement('textarea')
  el.value = str
  el.setAttribute('readonly', '')
  el.style.position = 'absolute'
  el.style.left = '-9999px'
  el.style.top = '-9999px'
  doc.body.appendChild(el)
  const selected = doc.getSelection().rangeCount > 0 ? doc.getSelection().getRangeAt(0) : false
  el.select()
  doc.execCommand('copy')
  doc.body.removeChild(el)
  if (selected) {
    doc.getSelection().removeAllRanges()
    doc.getSelection().addRange(selected)
  }
}
// 判断数据类型
export function typeJudge(val, type) {
  const dataType = Object.prototype.toString.call(val).replace(/\[object (\w+)\]/, '$1').toLowerCase()
  return type ? dataType === type : dataType
}
// 数字转大写人名币
export function toCHS(num) {
  if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(num)) {
    return '非法数字'
  }
  let unit = '千百拾亿千百拾万千百拾元角分',
    str = ''
  num += '00'
  let p = num.indexOf('.')
  if (p >= 0) {
    num = num.substring(0, p) + num.substr(p + 1, 2)
  }
  unit = unit.substr(unit.length - num.length)
  for (let i = 0; i < num.length; i++) {
    str += '零壹贰叁肆伍陆柒捌玖'.charAt(num.charAt(i)) + unit.charAt(i)
  }
  return str.replace(/零(千|百|拾|角)/g, '零').replace(/(零)+/g, '零').replace(/零(万|亿|元)/g, '$1').replace(/(亿)万|壹(拾)/g, '$1$2').replace(/^元零?|零分/g, '').replace(/元$/g, '元整')
}
// 链异步函数
/*
chainAsync([
  next => { console.log('0'); setTimeout(next, 1000); },
  next => { console.log('1'); setTimeout(next, 1000); },
  next => { console.log('2'); }
])
*/
export function chainAsync(fns) {
  let curr = 0
  const next = () => fns[curr++](next)
  next()
}
// 转义html
export function escapeHTML(str) {
  return str.replace(
    /[&<>'"]/g,
    tag =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
  )
}
// 图片转base64
export function imgToBase64(img, callback) {
  let reader = new FileReader()
  reader.addEventListener('load', () => {
    callback(reader.result)
    reader = null
  })
  reader.readAsDataURL(img)
}
// 根据生成图标
export function drawLogo(text, font = '72px Arial') {
  let canvas = document.createElement('canvas')
  let context = canvas.getContext('2d')
  context.font = font
  let width = context.measureText(text).width
  if (width < 200) {
    width = 200
  } else {
    width = width + 30
  }
  canvas.width = width
  canvas.height = width
  context.fillStyle = '#eef4ff'
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.font = font
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.fillStyle = '#0054fe'
  context.fillText(text, canvas.width / 2, canvas.height / 2)
  let dataUrl = canvas.toDataURL('image/png')
  return dataUrl
}

let cookies = {
  getItem: function (sKey) {
    if (!sKey) {
      return null
    }
    return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null
  },
  setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
      return false
    }
    let sExpires = ''
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + vEnd
          break
        case String:
          sExpires = '; expires=' + vEnd
          break
        case Date:
          sExpires = '; expires=' + vEnd.toUTCString()
          break
      }
    }
    document.cookie = encodeURIComponent(sKey) + '=' + encodeURIComponent(sValue) + sExpires + (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '') + (bSecure ? '; secure' : '')
    return true
  },
  removeItem: function (sKey, sPath, sDomain) {
    if (!this.hasItem(sKey)) {
      return false
    }
    document.cookie = encodeURIComponent(sKey) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '')
    return true
  },
  hasItem: function (sKey) {
    if (!sKey) {
      return false
    }
    return (new RegExp('(?:^|;\\s*)' + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=')).test(document.cookie)
  },
  keys: function () {
    let aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:\=[^;]*)?;\s*/)
    for (let nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) {
      aKeys[nIdx] = decodeURIComponent(aKeys[nIdx])
    }
    return aKeys
  }
}

console.obj = function (...args) {
  let newArgs = args.map((item) => {
      if (Object.prototype.toString.call(item) === '[object Object]' || Array.isArray(item)) {
          return deepClone(item)
      } else {
          return item
      }
  })
  console.log(...newArgs)
}

console.str = function (...args) {
  let newArgs = args.map((item) => {
      try {
          let obj = JSON.stringify(item)
          return obj
      } catch(e) {
          return item
      }
  })
  console.log(...newArgs)
}

export {
  fillZero, getRandom, cookies
}
