const respondWith = require('../utils/respondwith')

module.exports = (app) => {
  app.use('*', (req, res) => {
    res.status(404).json(respondWith(404, 'Not Found', false, null))
  })

  app.use((err, req, res, next) => {
    switch (err.name) {
    case 'CException':
      res.status(err.status).json(respondWith(err.status, err.message, false, null))
      break
    default:
      res.status(500).json(respondWith(500, 'Internal Server Error', false, null))
    }
  })
  return app
}