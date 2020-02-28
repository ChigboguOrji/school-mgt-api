const express = require("express");
const router = express.Router();
const controller = require("./staff.controller");

router.get("/", controller.getStaffList);

//  `/staff/id/${teacher.staffId}/name${teacher.name}/pwd/${teacher.password}`
// /id/:id/usrname/:usrname/pwd/:pwd
router.get("/:id/:usrname/:pwd", controller.getStaff);

router.post("/", controller.postAddStaff);

module.exports = router;
