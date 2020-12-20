const path = require('path')
// const serve = require('rollup-plugin-serve')
const browserSync = require('rollup-plugin-browsersync')
const config = require('./rollup.config')
const PORT = 3000

config.map((conf, index) => {
  conf.sourcemap = true
  if (!index) {
    conf.plugins = [
      ...conf.plugins,
      ...[
        browserSync({
          server: './',
          watch: true
        })
        // serve({
        //   open: true,
        //   port: PORT,
        //   contentBase: "./"
        // })
      ]
    ]
  }
  return conf
})

module.exports = config
