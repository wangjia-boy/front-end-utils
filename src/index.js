import './css/base.styl'
import { typeJudge } from './js/utils.js'
import { Base64 } from './js/utils/function'
import { getParameters, setParams, parseUrlParams, buildUrlParams } from './js/utils/string'

console.log(Base64.encode('wj123456'))
console.log(parseUrlParams('http://example.com/?name=Alice&age=25&url=http://example.com/page?param=value'))
const obj = {
  name: 'Alice',
  age: 25,
  url: 'http://example.com/page?param=value'
};

console.log(buildUrlParams(obj))

console.log(getParameters('http://example.com/?name=Alice&age=25&url=http://example.com/page?param=value'))
console.log(setParams('/url', obj))

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
