const express = require('express')
const router = express.Router()
const controller = require('./controller')

// get candidate result
router.get('/result/:pin/:regno/:classId/:sessionId/:termId', controller.entry)

// delete a result record
router.delete('/:regno/:classId/:sessionId/:termId', controller.deleteEntry)

// update a result record
router.patch(
  '/update/:regno/:classId/:sessionId/:termId',
  controller.updateEntry
)

module.exports = router