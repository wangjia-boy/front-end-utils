import './css/base.styl'
import { typeJudge, timeFormat, arrayChunk, getRandomHexColor,copyToClipboard2 } from './js/utils.js'

console.log(typeJudge([1,2]))
console.log(timeFormat(1656345124534))
console.log(arrayChunk([2, 6, 87, 1, -1, 0, -876], 2))
console.log(getRandomHexColor())
console.log(new Date().Format('yyyy-MM-dd hh:mm:ss'))

window.onload = function() {
  let btn = document.querySelector('#btn')
  btn.onclick = function() {
    console.log(123)
    copyToClipboard2('asd123zxc')
  }
}

new Vue({
  el: '#app',
  data: {
    transfromAddr: false
  }  
})
