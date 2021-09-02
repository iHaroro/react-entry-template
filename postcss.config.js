const autoprefixer = require('autoprefixer')
const px2rem = require('postcss-plugin-px2rem')

module.exports = {
  plugins: [
    autoprefixer,
    px2rem({
      'rootValue': 75,
      'exclude': /node_modules|folder_name/i,
    }),
  ],
}
