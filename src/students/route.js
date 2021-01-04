const express = require('express')
const router = express.Router()
const controller = require('./controller')

// getting the list of students in a class
router.get('/', controller.getStudents)

// getting a particular student info
router.get('/:regno', controller.getStudent)

// adding a student
router.post('/', controller.postStudent)

module.exports = router