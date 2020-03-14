const path = require('path')
const serve = require('rollup-plugin-serve')
const config = require('./rollup.config')
const PORT = 3000

config.map((conf, index) => {
  conf.sourcemap = true
  if (!index) {
    conf.plugins = [
      ...conf.plugins,
      ...[
        serve({
          port: PORT,
          contentBase: "./"
        })
      ]
    ]
  }
  return conf
})

module.exports = config
