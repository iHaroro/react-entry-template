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
  },
})
