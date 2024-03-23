/**
 * @description 请在这里修改你的开发配置
 */
const path = require('path')
const base = require('./webpack.config')
const { merge } = require('webpack-merge')
const WebpackBar = require('webpackbar')

module.exports = merge(base, {
  mode: 'development', // 开发模式
  devtool: 'source-map', // 生成 source-map 文件
  stats: 'errors-only', // 只在发生错误时输出
  plugins: [
    new WebpackBar(), // 编译进度条
  ],
  devServer: {
    // open: ['demo'],
    compress: false, // 是否启用 gzip 压缩
    historyApiFallback: true, // 任意的 404 响应都可能需要被替代为 index.html
    hot: true, // 启用 webpack 的模块热替换特性
    port: 'auto', // 端口号
    client: {
      reconnect: true, // 自动重连
      logging: 'none', // 日志级别
      progress: true, // 显示打包进度
      overlay: { // 显示错误覆盖层
        errors: false, // 错误时是否显示
        warnings: false, // 警告时是否显示
      },
    },
    static: { // 静态资源配置
      directory: path.resolve(__dirname, './', 'public'), // 静态资源目录
      publicPath: path.resolve(__dirname, './', 'public'), // 静态资源公共路径
    },
    // proxy: {
    //   '/api': {
    //     target: 'localhost:1022',
    //     pathRewrite: { '^/api': '' },
    //   },
    // },
  },
})
