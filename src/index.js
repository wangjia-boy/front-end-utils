import './css/base.styl'
import { typeJudge } from './js/utils.js'
import { Base64 } from './js/utils/function'

console.log(Base64.encode('wj123456'))

new Vue({
  el: '#root',
  data: {
    list: []
  },
  methods: {
    input(e) {
      let val3 = e.target.value
      if (val3.length === 6) {
        this.list.push(val3)
        e.target.value = ''
      }
    }
  }
})
