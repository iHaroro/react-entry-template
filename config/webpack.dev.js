const { merge } = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')
const base = require('./webpack.base')

module.exports = merge(base, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    open: false, // 自动打开browser
    contentBase: path.join(__dirname, './dist'),
    historyApiFallback: true,
    inline: true, // 实时刷新
    hot: true, // 热更新,
    port: 8000,
    quiet: true, // 关闭启动编译log
    overlay: true, // Error 提示
  },
})
