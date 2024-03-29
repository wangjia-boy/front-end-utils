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
export function deepClone(values) {
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
// 复制字符串到剪切板
export function copyToClipboard2(text) {
  return navigator.clipboard.writeText(text)
}
// 获取用户选择的文本
export function getSelectionText() {
  return window.getSelection().toString()
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
// 检查用户的设备是否处于深色模式
export function isDarkMode() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
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
// await函数catch捕获
export function awaitWrap(promise) {
  return promise
    .then(data => [null, data])
    .catch(err => [err, null])
}
// base64转blob
export function dataURLtoBlob(dataUrl) {
  var arr = dataUrl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime })
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
// base64编解码
let Base64 = {
  encode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      function toSolidBytes(match, p1) {
        return String.fromCharCode('0x' + p1)
      }))
  },
  decode(str) {
    return decodeURIComponent(atob(str).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
  }
}

export {
  pubsub, autoHide, Base64
}
