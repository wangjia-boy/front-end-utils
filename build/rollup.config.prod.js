const { uglify } = require('rollup-plugin-uglify')
const config = require('./rollup.config')

config.map((conf, index) => {
  conf.output.sourcemap = false
  conf.plugins = [
    ...conf.plugins,
    ...[
      uglify()
    ]
  ]
  return conf
})

module.exports = config
