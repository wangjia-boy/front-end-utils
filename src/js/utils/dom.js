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
