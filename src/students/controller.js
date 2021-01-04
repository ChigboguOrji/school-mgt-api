const Student = require('./model')
const respondWith = require('../utils/respondwith')

class StudentCtl {
  async enroll(req, res, next) {
    res.status(201).json(respondWith(201, 'enrollment successful', true, null))
  }

  async getAllStudent(req, res, next) {
    res.status(200).json(respondWith(200, 'student listing', true, null))
  }

  async getStudent() {
    res.status(200).json(respondWith(200, 'student info', true, null))
  }
}

module.exports = new StudentCtl()