const webpack = require('webpack')
const { merge } = require('webpack-merge')
const base = require('./webpack.config')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin') // 对CSS进行压缩插件
const TerserPlugin = require("terser-webpack-plugin");
const pordEnvs = require('./config/env.pord')
const { isDev } = require('./utils')

module.exports = merge(base, {
  mode: 'production',
  plugins: [
    // 向浏览器环境注入环境变量
    new webpack.DefinePlugin({
      'process.env': {
        IS_DEV: isDev,
        BASE_API: pordEnvs.BASE_API,
      },
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        parallel: true,
        extractComments: false,
      }),
    ],
  },
})
