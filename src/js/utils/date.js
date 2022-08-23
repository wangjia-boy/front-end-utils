import { fillZero } from './string'

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
