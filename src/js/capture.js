// 1、try catch 中的 catch 错误捕获 
// 可以在 webpack 打包时候，使用 AST 方式解析并在 catch 中插入日志上报代码
// 2、error 事件
window.addEventListener('error', event => {
  // console.log(event)
  let data = {} // 此处与上面的 onerror 会重复事件 
  let { colno, lineno, message, filename, error } = event //不一定所有浏览器都支持 colno 参数 

  data.message = message
  data.filename = filename
  data.line = lineno
  data.col = colno
  data.error = error

  console.log('addEventListener error 捕获阶段>>>异常：', data)
}, true)

// 3、unhandledrejection 
window.addEventListener('unhandledrejection', function (e) {
  e.preventDefault(); 
  // 阻止异常向上抛出 
  console.log('promise 异常 unhandledrejection ：', e)
}, true)


// // 4、errorHandler 
// Vue.config.errorHandler = function (err, vm, info) {
//   // vm 为抛出异常的 Vue 实例 
//   // info 为 Vue 特定的错误信息，比如错误所在的生命周期钩子 
//   let {
//     message, // 异常信息 
//     name, // 异常名称 
//     script, // 异常脚本url 
//     line, // 异常行号 
//     column, // 异常列号
//     stack // 异常堆栈信息 
//   } = err
//   console.log('2、vue errorHandler :>> ', err, vm, info)
// }