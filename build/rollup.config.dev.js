const path = require('path')
// const serve = require('rollup-plugin-serve')
const browserSync = require('rollup-plugin-browsersync')
const config = require('./rollup.config')

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
        //   port: 3000,
        //   contentBase: "./"
        // })
      ]
    ]
  }
  return conf
})

module.exports = config
