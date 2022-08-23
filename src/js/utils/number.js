// 获取随机数
export function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
// 千分位数字
export function thousands(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
// 匹配整数
export function isInteger(val) {
  return /^(-|\+)?\d+$/.test(val)
}