import moduleTest from './js/module1'
import $ from 'jquery'
import pkg from './../package.json'

import './css/index.styl'

$('body').text(pkg.name)

console.log(pkg)

const arr1 = [1,2]
const arr2 = [3,4,5]
console.log([...arr1, ...arr2])

async function init () {
  let data = await moduleTest()
  console.log(data)
}

init()
