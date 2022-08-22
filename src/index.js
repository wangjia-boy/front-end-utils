import './css/base.styl'
import { typeJudge, timeFormat, arrayChunk, getRandomHexColor } from './js/utils.js'

console.log(typeJudge([1,2]))
console.log(timeFormat(1656345124534))
console.log(arrayChunk([2, 6, 87, 1, -1, 0, -876], 2))
console.log(getRandomHexColor())

new Vue({
  el: '#app',
  data: {
    transfromAddr: false
  }  
})
