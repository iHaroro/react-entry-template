/**
 * @description 请在这里修改你的生产配置
 */
const { merge } = require('webpack-merge')
const base = require('./webpack.config')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin') // 对CSS进行压缩插件
const TerserPlugin = require('terser-webpack-plugin')

module.exports = merge(base, {
  mode: 'production',
  optimization: {
    usedExports: true, // 去除未使用的导出内容等无用代码
    minimize: true, // 压缩代码
    concatenateModules: true, // 合并模块
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        parallel: true,
        extractComments: false,
      }),
    ],
    runtimeChunk: {
      name: 'manifest',
    },
    splitChunks: {
      chunks: 'async',
      minSize: 30000, // 生成 chunk 的最小体积（以 bytes 为单位）
      minChunks: 1, // 拆分前必须共享模块的最小 chunks 数
      maxAsyncRequests: 5, // 按需加载时的最大并行请求数
      maxInitialRequests: 3, // 入口点的最大并行请求数
    },
  },
})
