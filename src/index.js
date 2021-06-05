import './css/base.styl'
import { arrayMax, arrayMin, arrayChunk } from './js/utils'

console.log(arrayMax([2, 6, 87, 1, -1, 0, -876]))
console.log(arrayMin([2, 6, 87, 1, -1, 0, -876]))
console.log(arrayChunk([2, 6, 87, 1, -1, 0, -876], 2))

new Vue({
  el: '#app',
  data: {
    transfromAddr: false
  }  
})
