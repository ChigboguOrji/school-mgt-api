const express = require('express')
const router = express.Router()
const ctler = require('./controller')
const val = require('./validator')

// get candidate result
router.get('/result/:reg_no', ctler.getResultEntry)

router.post('/', val.newResultEntry, ctler.addResultEntry)

// delete a result record
router.delete('/entry/:entry_id', ctler.delResultEntry)

// update a result record
router.patch('/entry/:entry_id', ctler.updateResultEntry)

module.exports = router