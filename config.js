process.argv.forEach(function(val) {
  const arg = val.split('=')
  if (arg.length > 0) {
    if (arg[0] === 'env') {
      const env = require('./' + arg[1] + '.json')
      module.exports = env
    }
  }
})