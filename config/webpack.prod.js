const { merge } = require('webpack-merge')
const webpack = require('webpack')
const base = require('./webpack.base')

module.exports = merge(base, {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
  ],
})
