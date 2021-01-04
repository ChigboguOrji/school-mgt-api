const http = require('http')
const mongoose = require('mongoose')
const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./config')
const server = express()
server.disable('x-powered-by')

// start database connection
mongoose
  .connect(config.DB.URI, config.DB.OPTIONS)
  .then(() => {
    console.log('---> Database connected')
  })
  .catch(() => {
    console.log('---> Database connection error')
    process.exit(1)
  })

// end database connection

// Requiring routes module
const studentroutes = require('./students/students.route')
const staffroutes = require('./staff/staff.route')
const resultroutes = require('./score/score.route')

// Enabling cors
const whitelist = ['https://sch-portal.netlify.com', 'http://localhost:3000']
server.use(
  cors({
    origin: function(origin, callback) {
      if (!origin) return callback(null, true)
      if (whitelist.indexOf(origin) === -1) {
        return callback(new Error('Request rejected by cors policy'))
      }
      return callback(null, true)
    },
    credentials:          true,
    optionsSuccessStatus: 200
  })
)

server.options('*', cors())

server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())

// Logging request when not in testing
if (process.env.NODE_ENV !== 'test') {
  server.use(logger('combined'))
}

// student routing
server.use('/student', studentroutes)

// staff routing
server.use('/staff', staffroutes)

// result checking
server.use('/result', resultroutes)

// Error handler
server.use((req, res, next) => {
  res.status(404).send('Not Found')
  // propagate error
  next()
})

server.use((err, req, res, next) => {
  res.status(500).send('Internal Server Error')
})

http
  .createServer(server)
  .listen(config.PORT, console.log('Server listening on port ' + config.PORT))

server.on('SIGTERM', function() {
  console.log('Server Terminating')
  server.close(function() {
    console.log('Server Terminated')
    process.exit(0)
  })
})

module.exports = server