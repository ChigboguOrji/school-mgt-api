'use strict'
const Staff = require('./model')
const respondWith = require('../utils/respondwith')

class StaffCtl {
  async listAllStaff(req, res) {
    res.status(200).json(respondWith(200, 'staff listing', true, null))
  }

  async getStaffInfo(req, res) {
    res.status(200).json(respondWith(200, 'staff info', true, null))
  }

  async addNewMember() {
    res.status(201).json(respondWith(200, 'request successful', true, null))
  }

  async login() {
    res.status(200).json(respondWith(200, 'login successful', true, null))
  }
}

module.exports = new StaffCtl()