const express = require('express')
const router = express.Router()
const ctler = require('./controller')
const val = require('./validator')

router.get('/info/:staff_id', val.valGetStaff, ctler.getStaffInfo)

router.get('/', ctler.listAllStaff)

router.post('/login', val.valLogin, ctler.login)

router.post('/member', val.valNewMember, ctler.addNewMember)

module.exports = router