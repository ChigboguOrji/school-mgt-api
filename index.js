const mongoose = require('mongoose')
const app = require('express')()
const config = require('./configs/')

require('./configs/dbconfig')(mongoose, config)
require('./src/middlewares/preroute')(app)
app.get('/ping', (req, res) => res.sendStatus(200))
require('./src/middlewares/postroute')(app)

app.on('SIGTERM', function() {
  console.log('Terminating signal received...')
  mongoose.disconnect()
  server.close(function() {
    console.log('App terminated and server closed')
    process.exit(0)
  })
})

if (require.main === module) {
  app.listen(config.port, () => console.log('App live on ::', config.port))
}

module.exports = app