'use strict';
const Student = require('../students/model')
const Result = require('./model')

class ResultCtl {
  async getResultEntry(req, res) {
     res.status(200).json(respondWith(200, 'success', true, null))
  }
  
  async addResultEntry(req, res) {
    res.status(201).json(respondWith(201, 'success', true, null))
  }

  async delResultEntry(req, res) {
    res.status(204).json(respondWith(204, 'deleted entry', true, null))
  }

  async updateResultEntry(req, res) {
    res.status(201).json(respondWith(201, 'updated entry', true, null))
  }
}

module.exports = new ResultCtl()