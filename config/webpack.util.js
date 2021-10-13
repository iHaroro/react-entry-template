const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { isDev, PAGES_PATH, TEMP_HTML_PATH } = require('./utils')

// 开发环境需要编译的模块， 空数组则全部遍历编译
// 取值为src/pages/[name]/...路径中的name
const devPages = []
// const devPages = ['web', 'wechat']
// const devPages = ['web', 'wechat', 'tiktok']

// 通用依赖
const COMMON_VENDORS = ['react', 'react-dom']
const COMMON_VENDORS_FILENAME = 'vendors'

/**
 * @function 获取入口文件html，js
 * @param {string} type 'html'|'js'
 * @param {string?} entryName 入口名称（模块名），不传默认获取全部模块对应类型（type）的文件数组
 * @returns {array} 文件数组
 **/
const getEntryFileByType = (type, entryName) => glob.sync(`${PAGES_PATH}/${entryName || '*'}/index.${type}*`)

/**
 * @function 根据URL获取入口名称
 * @param {string} path 路径
 * @returns {string} 人口名称
 **/
const pathMatchEntryName = path => {
  const match = path.match(/\/src\/pages\/(\S*)\/index\.[\w]+/)
  return match.length ? match[1] : null
}

/**
 * @function 创建HtmlWebpackPlugin
 * @param {string} entryName 入口名称
 * @param {string} templateFile html模板名称
 * @returns {any}
 **/
const createHtmlPlugin = (entryName, templateFile) => new HtmlWebpackPlugin({
  // filename: `${entryName}/index.html`, // 生成的html模板文件名
  filename: `${entryName}.html`, // 生成的html模板文件名
  template: templateFile || TEMP_HTML_PATH, // 模板html路径
  publicPath: '../',
  chunks: [
    COMMON_VENDORS_FILENAME,
    entryName,
    '[name]/index.css',
  ],
  favicon: path.resolve(__dirname, '../public/favicon.ico'),
})

function getCommonEntryOption (entryFile) {
  let option = {
    import: entryFile,
  }
  COMMON_VENDORS.length && (option.dependOn = COMMON_VENDORS_FILENAME)
  return option
}

// 获取入口配置
function getPageEntry () {
  let entry = {}
  if (isDev && devPages.length) { // 开发环境，按需编译
    devPages.forEach(entryName => {
      const entryFile = getEntryFileByType('js', entryName)[0]
      entry[entryName] = getCommonEntryOption(entryFile)
    })
  } else { // 默认编译全部
    const allEntryFiles = getEntryFileByType('js')
    allEntryFiles.forEach(entryFile => {
      const entryName = pathMatchEntryName(entryFile)
      entry[entryName] = getCommonEntryOption(entryFile)
    })
  }
  // 添加react公共依赖
  entry[COMMON_VENDORS_FILENAME] = {
    import: COMMON_VENDORS,
    filename: 'js/[name].js',
  }
  return entry
}

// 获取HTML模板创建
const getHtmlPluginEntry = () => {
  const htmlPlugins = []
  if (isDev && devPages.length) { // 开发环境，按需编译
    devPages.forEach(entryName => {
      const entryFile = getEntryFileByType('html', entryName)[0]
      htmlPlugins.push(createHtmlPlugin(entryName, entryFile))
    })
  } else {  // 默认编译全部
    const allEntryFiles = getEntryFileByType('js')
    allEntryFiles.forEach(entryFile => {
      const entryName = pathMatchEntryName(entryFile)
      const entryTemplate = getEntryFileByType('html', entryName)[0]
      entryName && htmlPlugins.push(createHtmlPlugin(entryName, entryTemplate))
    })
  }
  return htmlPlugins
}

module.exports = {
  getPageEntry,
  getHtmlPluginEntry,
}
