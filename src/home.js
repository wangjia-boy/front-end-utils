import moduleTest from './js/module1'

console.log('hoem page hhhhh')

async function init () {
  let data = await moduleTest()
  console.log(data)
}

init()
