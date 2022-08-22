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
// 随机生成颜色码
export function getRandomHexColor() {
  return '#' + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, '0')
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
  let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /** 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1 **/
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
