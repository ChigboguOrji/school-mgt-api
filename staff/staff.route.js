const express = require("express");
const router = express.Router();
const controller = require("./staff.controller");

router.get("/", controller.listAll);

router.get("/:userid/:username/:password", controller.staff);

router.post("/login", controller.login);

router.post("/", controller.addToList);

// router.post("/ban-user")
// router.delete("/user")
// router.patch("/user")
module.exports = router;
