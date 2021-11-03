/**
 * @description 请在这里修改你的开发配置
 */
const path = require('path')
const base = require('./webpack.config')
const { merge } = require('webpack-merge')
const WebpackBar = require('webpackbar')

module.exports = merge(base, {
  mode: 'development',
  devtool: 'source-map',
  stats: 'errors-only',
  plugins: [
    new WebpackBar(),
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
    port: 'auto',
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
