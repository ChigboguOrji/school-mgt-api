const express = require('express')
const logger = require('morgan')
const cors = require('cors')

module.exports = (app) => {
  app.use(logger('dev'))
  app.use(express.json({limit: '1kb'}))
  app.use(express.urlencoded({extended: false}))
  app.disable('x-powered-by', true)
  const whitelist = ['https://sch-portal.com', 'http://localhost:3000']
  app.use(
    cors({
      origin: function(origin, callback) {
        if (!origin) return callback(null, true)
        if (!whitelist.includes(origin)) {
          return callback(new Error('Request rejected by cors policy'))
        }
        return callback(null, true)
      },
      credentials:          true,
      optionsSuccessStatus: 200
    })
  )

  app.options('*', cors())

  app.use('/students', require('../students/route'))
  app.use('/staff', require('../staff/route'))
  app.use('/scores', require('../scores/route'))

  return app
}