import moduleTest from './js/module1'
import $ from 'jquery'
import pkg from './../package.json'
// import debug from 'debug'
import tracer from 'tracer'

let logger = tracer.console()

logger.log('hello');  
logger.trace('hello', 'world');  
logger.debug('hello %s',  'world', 123);  
logger.info('hello %s %d',  'world', 123, {foo:'bar'});  
logger.warn('hello %s %d %j', 'world', 123, {foo:'bar'});  
logger.error('hello %s %d %j', 'world', 123, {foo:'bar'}, [1, 2, 3, 4], Object);

// import './css/index.scss'
import './css/home.styl'

$('#app').text(pkg.name)

// const log = debug('[webui]:log')
// debug.enable('*')
// log(pkg)

const arr1 = [1,2,1]
const arr2 = [3,4,5]
console.log([...arr1, ...arr2])

async function init () {
  let data = await moduleTest()
  console.log(data)
}

init()
