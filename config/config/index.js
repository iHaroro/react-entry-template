let ENV_CONFIG = {}

if (process.env.NODE_ENV === 'development') {
  ENV_CONFIG = require('./env.dev')
} else if (process.env.NODE_ENV === 'test') {
  ENV_CONFIG = require('./env.test')
} else if (process.env.NODE_ENV === 'production') {
  ENV_CONFIG = require('./env.pord')
}

module.exports = {
  ENV_CONFIG,
}
