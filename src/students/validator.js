'use strict'
const {body, param, validationResult} = require('express-validator')
const CException = require('../middlewares/exception')

class StudentValidator {
  async valEnroll(req, res, next) {
    await body('first_name').exists().not().isEmpty().isString().run(req)
    await body('last_name').exists().not().isEmpty().isString().run(req)
    await body('admitted_to').exists().not().isEmpty().isString().run(req)
    await body('cur_class').exists().not().isEmpty().isString().run(req)

    const hasError = validationResult(req)
    if (!hasError.isEmpty()) {
      return next(new CException(400, 'invalid entries in enrollment form'))
    }
    next()
  }

  async valGetOne(req, res, next) {
    await param('reg_no').exists().not().isEmpty().run(req)

    const hasError = validationResult(req)
    if (!hasError.isEmpty()) {
      return next(new CException(400, 'invalid entries'))
    }
    next()
  }
}

module.exports = new StudentValidator()