const path = require('path')
const webpack = require('webpack')
const WebpackBar = require('webpackbar')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { setPageEntry, setHtmlWebpackPlugin } = require('./webpack.util')

// console.log('entry', setPageEntry())
// console.log('html plugins', setHtmlWebpackPlugin())
// process.exit()

module.exports = {
  entry: setPageEntry,
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name]/index.js',
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          /**
           * loader 是从右到左执行，顺序不能颠倒
           * 1. 最先执行 sass-loader ，将 sass 文件转为css
           * 2. css-loader 将转换后的css文件转为 js模块
           * 3. style-loader 将 css 插入到HTML中的<style>标签中
           */
          // 'style-loader', // 将 JS 字符串生成为 style 节点
          MiniCssExtractPlugin.loader, // 不可与style-loader同时使用
          {
            loader: 'css-loader', // 将 CSS 转化成 CommonJS 模块
            options: {
              importLoaders: 2,
            },
          },
          'postcss-loader', // 处理兼容，px2rem等
          'sass-loader', // 将 Sass 编译成 CSS
          {
            // 全局sass资源
            loader: 'sass-resources-loader',
            options: {
              resources: [
                path.resolve(__dirname, '../', 'src/assets/styles/global.scss'),
              ],
            },
          },
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new WebpackBar(),
    ...setHtmlWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]/index.css',
    }),
    // 向浏览器环境注入环境变量
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `'${process.env.NODE_ENV}'`,
      },
    }),
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
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': path.join(__dirname, '..', 'src'),
      process: 'process/browser',
    },
  },
}
