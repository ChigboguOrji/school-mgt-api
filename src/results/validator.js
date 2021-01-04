'use strict'
const {body, param, validationResult} = require('express-validator')
const CException = require('../middlewares/exception')

class ResultValidator {
  async newResultEntry(req, res, next) {
    await param('reg_no').exists().not().isEmpty().isString().run(req)
    await body('class_id').exists().not().isEmpty().isString().run(req)
    await body('session_id').exists().not().isEmpty().isString().run(req)
    await body('term_id').exists().not().isEmpty().isString().run(req)
    await body('subjects').exists().not().isEmpty().run(req)

    const hasError = validationResult(req)
    if (!hasError.isEmpty()) {
      return next(new CException(400, 'invalid entry'))
    }
    next()
  }
}

module.exports = new ResultValidator()