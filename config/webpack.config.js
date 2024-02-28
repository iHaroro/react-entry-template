const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { getPageEntry, getHtmlPluginEntry } = require('./utils/entryUtils')
const { IS_DEV } = require('./utils/constants')
const { BASE_CONFIG_ENV } = require('./config')

module.exports = {
  entry: getPageEntry,
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name]/index.[chunkhash].js', // filename 指列在 entry 中，打包后输出的文件的名称
    chunkFilename: '[name]/[name].[chunkhash].js', // chunkFilename 指未列在 entry 中，却又需要被打包出来的文件的名称
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
        enforce: 'pre',
        loader: 'eslint-loader',
        include: /src/,
      },
      {
        test: /\.(jsx|js)?$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.(png|jpg|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'img/[name].[hash:7].[ext]',
            esModule: false,
          },
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'video/[name].[hash:7].[ext]',
            esModule: false,
          },
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'font/[name].[hash:7].[ext]',
            esModule: false,
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    ...getHtmlPluginEntry(),
    // 向浏览器环境注入环境变量
    new MiniCssExtractPlugin({
      filename: '[name]/index.[contenthash].css',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        IS_DEV, // 非正式环境都认为开发环境，一般用于vConsole等调试工具的初始化判断，便于非正式环境调试
        ...BASE_CONFIG_ENV,
      },
    }),
    new CopyPlugin({
      patterns: [
        {
          // For github pages
          from: path.resolve(__dirname, '../README.md'),
          to: path.resolve(__dirname, '../dist/README.md'),
          force: true,
        },
      ],
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, '..', 'src'),
    },
  },
}
