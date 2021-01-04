'use strict'
const {body, param, validationResult} = require('express-validator')
const CException = require('../middlewares/exception')

class StaffValidator {
  async valNewMember(req, res, next) {
    await body('first_name').exists().not().isEmpty().isString().run(req)
    await body('last_name').exists().not().isEmpty().isString().run(req)
    await body('gender').isString().run(req)

    const hasError = validationResult(req)
    if (!hasError.isEmpty()) {
      return next(new CException(400, 'can not process request'))
    }
    next()
  }

  async valGetStaff(req, res, next) {
    await param('staff_id').exists().not().isEmpty().isString().run(req)

    const hasError = validationResult(req)
    if (!hasError.isEmpty()) {
      return next(new CException(400, 'can not process request'))
    }
    next()
  }

  async valLogin(req, res, next) {
    await body('password').exists().not().isEmpty().isString().run(req)
    await body('email').exists().not().isEmpty().isString().run(req)

    const hasError = validationResult(req)
    if (!hasError.isEmpty()) {
      return next(new CException(400, 'can not process request'))
    }
    next()
  }
}

module.exports = new StaffValidator()