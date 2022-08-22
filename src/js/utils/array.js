import { getRandom } from './number'

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
