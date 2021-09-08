const path = require('path')
const base = require('./webpack.config')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const devEnvs = require('./config/env.dev')

module.exports = merge(base, {
  mode: 'development',
  devtool: 'inline-source-map',
  stats: 'errors-only',
  plugins: [
    // 向浏览器环境注入环境变量
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: devEnvs.NODE_ENV,
        BASE_API: devEnvs.BASE_API,
        BASE_PATH: devEnvs.BASE_PATH,
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
    //     target: 'http://localhost:3000',
    //     pathRewrite: { '^/api': '' },
    //   },
    // },
  },
})
