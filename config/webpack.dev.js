const path = require('path')
const base = require('./webpack.config')
const { merge } = require('webpack-merge')

module.exports = merge(base, {
  mode: 'development',
  devtool: 'inline-source-map',
  stats: 'errors-only',
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
        errors: true,
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
