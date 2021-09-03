const path = require('path')

module.exports = {
  isDev: process.env.NODE_ENV === 'development',
  PAGES_PATH: path.resolve(__dirname, '../src/pages'), // 页面多入口编译目录
  TEMP_HTML_PATH: path.resolve(__dirname, '../public/template.html'), // 默认HTML模板路径
}
