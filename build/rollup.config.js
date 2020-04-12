const path = require('path')
const babel  = require('rollup-plugin-babel')
const nodeRosolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const nodeGlobals = require('rollup-plugin-node-globals')
const builtins = require('rollup-plugin-node-builtins')
const json = require('rollup-plugin-json')
const postcss = require('rollup-plugin-postcss')

const sass = require('node-sass')
const stylus = require('stylus')

const resolve = function (filePath) {
  return path.join(__dirname, '..', filePath)
}

const babelOptions = {
  "presets": ["@babel/preset-env"],
  "plugins": ["transform-object-rest-spread"]
}

const sass2css = function (context, payload) {
  return new Promise((resolve, reject) => {
    sass.render({file: context}, (err, result) => {
      !err ? resolve(result) : reject(err)
    })
  })
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
      sourcemap: true,
      globals: {
        jquery: 'jQuery'
      }
    },
    external: ['jquery'],
    paths: {
      jquery: 'https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js'
    },
    plugins: [
      nodeRosolve(),
      builtins(),
      commonjs(),
      nodeGlobals(),
      json(),
      postcss({
        extract: true,
        minimize: process.env.NODE_ENV === 'production',
        extensions: ['css', 'stylus'],
        process: stylus2css
      }),
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
      nodeRosolve(),
      builtins(),
      commonjs(),
      nodeGlobals(),
      json(),
      postcss({
        extract: true,
        minimize: process.env.NODE_ENV === 'production',
        extensions: ['css', 'stylus'],
        process: stylus2css
      }),
      babel(babelOptions)
    ]
  }
]
