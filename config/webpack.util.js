const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 入口配置
function setPageEntry () {
  const files = glob.sync('./src/pages/**/index.jsx')
  const entry = {}
  files.forEach(file => {
    const ret = file.match(/^\.\/src\/pages\/(\S*)\/index\.jsx$/)
    if (ret) {
      entry[ret[1]] = {
        import: file,
        dependOn: 'react_vendors',
      }
    }
  })
  entry['react_vendors'] = {
    import: ['react', 'react-dom'],
    filename: '_common/[name].js',
  }

  return entry
}

// 获取默认模板HTML
function getTemplate (name) {
  const files = glob.sync(`./src/pages/${name}/index.html`)
  if (files.length > 0) {
    return files[0]
  }
  return './public/template.html'
}

// 设置HTML入口plugin
function setHtmlWebpackPlugin () {
  const files = glob.sync('./src/pages/**/index.jsx')
  const options = []
  files.forEach(file => {
    const ret = file.match(/^\.\/src\/pages\/(\S*)\/index\.jsx$/)
    if (ret) {
      const name = ret[1]
      options.push(new HtmlWebpackPlugin({
        filename: `${name}/index.html`,
        template: getTemplate(name),
        chunks: ['react_vendors', name, '[name]/index.css'],
        favicon: path.resolve(__dirname, '../public/favicon.ico'),
      }))
    }
  })
  return options
}

module.exports = {
  setPageEntry,
  setHtmlWebpackPlugin,
}
