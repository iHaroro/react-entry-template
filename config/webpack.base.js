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
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          'style-loader',
          'postcss-loader',
          'sass-loader',
          {
            // 这行的意思是引入加载器 sass-resources-loader
            loader: 'sass-resources-loader',
            options: {
              // 这里是需要引入全局的资源文件，它可以是一个字符串或者是一个数组， 通常用数组去代替。
              resources: ['./src/assets/style/reset.scss'],
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
