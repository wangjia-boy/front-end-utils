import moduleTest from './js/module1'

async function init () {
  let data = await moduleTest()
  console.log(data)
}

init()
