const { merge } = require('webpack-merge')
const base = require('./webpack.base')

module.exports = merge(base, {
  mode: 'development',
  devtool: 'inline-source-map',
  stats: 'errors-only',
  devServer: {
    open: ['demo'],
    historyApiFallback: true,
    hot: true, // 热更新,
    port: 'auto',
    client: {
      logging: 'none',
      progress: true,
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3000',
    //     pathRewrite: { '^/api': '' },
    //   },
    // },
  },
})
