const express = require("express");
const router = express.Router();
const controller = require("./score.controller");

// get candidate result
router.get(
  "/result/:pin/:regno/:classId/:sessionId/:termId",
  controller.getResultEntry
);

// delete a result record
router.get(
  "/delete/:regno/:classId/:sessionId/:termId",
  controller.deleteResultEntry
);

// update a result record
router.post(
  "/update/:regno/:classId/:sessionId/:termId",
  controller.updateResultEntry
);

module.exports = router;
