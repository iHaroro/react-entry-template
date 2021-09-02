const { merge } = require('webpack-merge')
const base = require('./webpack.base')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = merge(base, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new OptimizeCssAssetsWebpackPlugin({
        cssProcessorOptions: {
          safe: true,
          discardComments: { removeAll: true }, // 对CSS文件中注释的处理：移除注释
        },
      }),
    ],
  },
})
