const path = require('path')
const base = require('./webpack.config')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const WebpackBar = require('webpackbar')
const devEnvs = require('./config/env.dev')
const { isDev } = require('./utils')

module.exports = merge(base, {
  mode: 'development',
  devtool: 'source-map',
  stats: 'errors-only',
  plugins: [
    new WebpackBar(),
    // 向浏览器环境注入环境变量
    new webpack.DefinePlugin({
      'process.env': {
        IS_DEV: isDev,
        BASE_API: devEnvs.BASE_API,
      },
    }),
  ],
  devServer: {
    // open: ['demo'],
    historyApiFallback: true,
    // historyApiFallback: {
    //   rewrites: [
    //     { from: /^\/*.html/, to: '/*' },
    //   ],
    // },
    hot: true, // 热更新,
    port: 8000,
    client: {
      logging: 'none',
      progress: true,
      overlay: {
        errors: false,
        warnings: false,
      },
    },
    static: {
      directory: path.resolve(__dirname, '..', 'public'),
      publicPath: path.resolve(__dirname, '..', 'public'),
    },
    // proxy: {
    //   '/api': {
    //     target: 'localhost:1022',
    //     pathRewrite: { '^/api': '' },
    //   },
    // },
  },
})
