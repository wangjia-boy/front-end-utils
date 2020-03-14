const path = require('path')
const babel  = require('rollup-plugin-babel')
const nodeRosolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const json = require('rollup-plugin-json')
const postcss = require('rollup-plugin-postcss')
const stylus = require('rollup-plugin-stylus')

const resolve = function (filePath) {
  return path.join(__dirname, '..', filePath)
}

const babelOptions = {
  "presets": ["@babel/preset-env"],
  "plugins": ["transform-object-rest-spread"]
}

const stylus2css = function (context, payload) {
  return new Promise((resolve, reject) => {
    stylus.render({file: context}, (err, result) => {
      !err ? resolve(result) : reject(err)
    })
  })
}

module.exports = [
  {
    input: resolve('src/index.js'),
    output: {
      file: resolve('dist/index.js'),
      format: 'umd',
      sourcemap: true
    },
    plugins: [
      nodeRosolve(),
      commonjs(),
      json(),
      babel(babelOptions)
    ]
  },
  {
    input: resolve('src/home.js'),
    output: {
      file: resolve('dist/home.js'),
      format: 'umd',
      sourcemap: true
    },
    plugins: [
      postcss({
        extract: true,
        minimize: process.env.NODE_ENV === 'production',
        extensions: ['css', 'styl'],
        process: stylus2css
      }),
      babel(babelOptions)
    ]
  }
]
