const autoprefixer = require('autoprefixer')
const px2remExclude = require('postcss-px2rem-exclude')

module.exports = {
  plugins: [
    autoprefixer,
    // px2remExclude({
    //   'remUnit': 75,
    //   'exclude': /node_modules|folder_name/i,
    // }),
  ],
}
