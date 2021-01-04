const router = require('express').Router()
const ctler = require('./controller')
const val = require('./validator')

// getting a particular student info
router.get('/info/:reg_no', val.valGetOne, ctler.getStudent)

// getting the list of students in a class
router.get('/', ctler.getAllStudent)

// adding a student
router.post('/enroll', val.valEnroll, ctler.enroll)

module.exports = router