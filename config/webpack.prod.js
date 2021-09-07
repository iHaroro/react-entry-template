const { merge } = require('webpack-merge')
const base = require('./webpack.config')
const pordEnvs = require('./config/env.pord')

module.exports = merge(base, {
  mode: 'production',
  plugins: [
    // 向浏览器环境注入环境变量
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: pordEnvs.NODE_ENV,
        BASE_API: pordEnvs.BASE_API,
        BASE_PATH: pordEnvs.BASE_PATH,
      },
    }),
  ],
})
