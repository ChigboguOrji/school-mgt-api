'use strict'
const envs = {
  dev: {
    port:    3000,
    url:     'mongodb://127.0.0.1:27017/mgtdev',
    envName: 'Development'
  },
  test: {
    port:    3001,
    url:     'mongodb://127.0.0.1:27017/mgtdev',
    envName: 'Test'
  },
  prod: {
    port:    process.env.PORT || 3000,
    url:     'mongodb://127.0.0.1:27017/mgtdev',
    envName: 'Production'
  }
}

process.argv.forEach(function(val) {
  const arg = val.split('=')
  if (arg.length > 0) {
    if (arg[0] === 'env') {
      const env = envs[arg[1]] ? envs[arg[1]] : envs['test']
      module.exports = env
    }
  }
})